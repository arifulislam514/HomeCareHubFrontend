import React, { useEffect, useMemo, useState } from "react";
import {
  UploadCloud,
  X,
  DollarSign,
  Tag,
  Image as ImageIcon,
  Type,
  AlignLeft,
} from "lucide-react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import authApiClient from "../../services/auth-api-client";

/* ---------------- UI helpers (unchanged look) ---------------- */

const Card = ({ title, icon, children }) => (
  <div className="bg-white rounded-2xl shadow-sm">
    <div className="p-6 border-b border-gray-200 flex items-center gap-3">
      {icon}
      <h3 className="text-lg font-bold text-[#083d41]">{title}</h3>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  icon,
}) => (
  <div>
    <label className="block text-sm font-bold text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
        {icon}
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-green-300 focus:border-green-500 transition"
      />
    </div>
  </div>
);

/* ---------------- Data helpers ---------------- */

const formatPrice = (n) =>
  (Number.isFinite(Number(n)) ? Number(n) : 0).toFixed(2);

const resolveBaseAware = (p) => {
  const base = authApiClient?.defaults?.baseURL || "";
  // if base already ends with /api/v1, strip duplicated prefix
  return /\/api\/v1\/?$/i.test(base) ? p.replace("/api/v1", "") : p;
};

/** Pick a working endpoint among candidates (first that returns 2xx). */
const tryEndpoints = async (candidates, options = {}) => {
  for (const url of candidates) {
    try {
      const res = await authApiClient.request({ url, ...options });
      if (res?.status >= 200 && res?.status < 300) {
        return { url, data: res.data };
      }
    } catch {
      // try next
    }
  }
  throw new Error("No matching endpoint responded successfully.");
};

/** Map backend product -> form shape */
const mapIn = (p) => {
  const name = p?.name ?? p?.title ?? "Product";
  const description = p?.description ?? p?.details ?? "";
  const priceRaw = p?.price_with_tax ?? p?.priceWithTax ?? p?.price ?? 0;
  const saleRaw =
    p?.sale_price_with_tax ??
    p?.salePriceWithTax ??
    p?.sale_price ??
    p?.discount_price ??
    null;

  // images: array of urls, or single string
  let images = [];
  if (Array.isArray(p?.images)) {
    images = p.images.map((im) => (typeof im === "string" ? im : im?.url)).filter(Boolean);
  } else if (p?.image) {
    images = [p.image];
  }

  return {
    name,
    description,
    price: formatPrice(priceRaw),
    salePrice: saleRaw != null ? formatPrice(saleRaw) : "",
    images,
  };
};

/** Map form -> backend payload (JSON). We PATCH/POST only fields we changed. */
const mapOutJson = (form) => {
  const payload = {
    // send common field variants; server will ignore extras
    name: form.name,
    title: form.name,
    description: form.description,
    details: form.description,

    price: Number(form.price || 0),
    price_with_tax: Number(form.price || 0),

    sale_price:
      form.salePrice !== "" ? Number(form.salePrice) : null,
    sale_price_with_tax:
      form.salePrice !== "" ? Number(form.salePrice) : null,
  };
  return payload;
};

/* ---------------- Component ---------------- */

const ProductEditPage = () => {
  const { id: routeIdParam } = useParams(); // 'new' or an id
  const navigate = useNavigate();
  const location = useLocation();

  // infer collection type from path
  const inferredType = location.pathname.includes("/admin/services")
    ? "services"
    : "products";

  const isCreate = !routeIdParam || routeIdParam === "new";
  const [loading, setLoading] = useState(!isCreate); // only load when editing
  const [saving, setSaving] = useState(false);
  const [productId, setProductId] = useState(isCreate ? null : routeIdParam);
  const [collectionType, setCollectionType] = useState(inferredType); // 'products' | 'services'
  const [endpointBase, setEndpointBase] = useState(null); // '/products/' or '/services/'

  // form state
  const [name, setName] = useState(isCreate ? "" : "Premium Cleaning Kit");
  const [description, setDescription] = useState(
    isCreate
      ? ""
      : "A complete kit with eco-friendly solutions for a sparkling clean home. Includes multi-surface cleaner, glass cleaner, and microfiber cloths."
  );
  const [price, setPrice] = useState(isCreate ? "" : "49.99");
  const [salePrice, setSalePrice] = useState(isCreate ? "" : "39.99");

  // images
  const [existingUrls, setExistingUrls] = useState(
    isCreate
      ? []
      : [
          "https://placehold.co/600x600/083d41/ffffff?text=Image+1",
          "https://placehold.co/600x600/22c55e/ffffff?text=Image+2",
          "https://placehold.co/600x600/eab308/ffffff?text=Image+3",
        ]
  );
  const [newFiles, setNewFiles] = useState([]); // [{file, preview}]

  const allImages = useMemo(
    () => [
      ...existingUrls.map((u) => ({ type: "url", value: u })),
      ...newFiles.map((f) => ({ type: "file", value: f.preview })),
    ],
    [existingUrls, newFiles]
  );

  const removeImage = (index) => {
    const current = allImages;
    const target = current[index];
    if (!target) return;
    if (target.type === "url") {
      setExistingUrls((prev) => prev.filter((u, i) => i !== index));
    } else {
      const urlCount = existingUrls.length;
      const fileIdx = index - urlCount;
      setNewFiles((prev) => prev.filter((_, i) => i !== fileIdx));
    }
  };

  const handleFileChoose = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const prepared = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setNewFiles((prev) => [...prev, ...prepared]);
    e.target.value = "";
  };

  // Resolve collection base once (products/services) and load detail if editing
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        // prefer the inferred collection first
        const preferProducts = collectionType === "products";
        const listCandidates = [
          preferProducts ? resolveBaseAware("/api/v1/products/") : resolveBaseAware("/api/v1/services/"),
          preferProducts ? "/products/" : "/services/",
          // fallbacks (the other collection, just in case)
          preferProducts ? resolveBaseAware("/api/v1/services/") : resolveBaseAware("/api/v1/products/"),
          preferProducts ? "/services/" : "/products/",
        ];

        // find a working list endpoint
        let baseFound = null;
        try {
          const { url } = await tryEndpoints(listCandidates, {
            method: "GET",
            params: { page_size: 1 },
          });
          baseFound = url.endsWith("/") ? url : `${url}/`;
        } catch {
          // nothing responded; leave null base
          return;
        }
        if (cancelled) return;
        setEndpointBase(baseFound);

        // finalize the actual collection type we got
        setCollectionType(baseFound.toLowerCase().includes("/services/") ? "services" : "products");

        // if creating, no need to fetch details
        if (isCreate) return;

        // EDIT MODE: load detail
        if (!productId) return;
        setLoading(true);

        const detailCandidates = [
          `${baseFound}${productId}/`,
          `${baseFound}${productId}`,
        ];

        const { data: product } = await tryEndpoints(detailCandidates, { method: "GET" });
        if (cancelled || !product) return;

        const mapped = mapIn(product);
        setName(mapped.name);
        setDescription(mapped.description);
        setPrice(mapped.price);
        setSalePrice(mapped.salePrice);
        setExistingUrls(mapped.images);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionType, isCreate, productId]);

  const uploadImagesIfAny = async (base, id) => {
    if (!newFiles.length) return true;

    const form = new FormData();
    newFiles.forEach((nf) => form.append("images", nf.file)); // adjust field name if needed

    const uploadCandidates = [
      `${base}${id}/`,           // same endpoint accepts multipart PATCH
      `${base}${id}/images/`,    // separate images endpoint
      `${base}${id}/upload/`,    // another common pattern
    ];

    for (const ep of uploadCandidates) {
      try {
        await authApiClient.patch(ep, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return true;
      } catch {
        // try next
      }
    }

    // fallback: try PUT multipart
    try {
      await authApiClient.put(`${base}${id}/`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return true;
    } catch {
      return false;
    }
  };

  const handleSave = async () => {
    if (!endpointBase) {
      alert("Endpoint not available yet.");
      return;
    }

    try {
      setSaving(true);
      const payload = mapOutJson({ name, description, price, salePrice });

      if (isCreate) {
        // CREATE
        const { data: created } = await authApiClient.post(endpointBase, payload);
        const newId = String(created?.id || created?.pk || created?.uuid || "").trim();
        if (!newId) {
          alert("Created, but could not determine new item id.");
          setSaving(false);
          return;
        }

        // Optional images upload after create
        await uploadImagesIfAny(endpointBase, newId);

        alert("Product created successfully.");
        // go to its edit page
        navigate(`/admin/${collectionType}/${newId}/edit`, { replace: true });
        return;
      } else {
        // EDIT
        if (!productId) {
          alert("No product found to save.");
          return;
        }

        await authApiClient.patch(`${endpointBase}${productId}/`, payload);

        // Optional images upload after patch
        await uploadImagesIfAny(endpointBase, productId);

        alert("Product saved successfully.");
        // stay on page
      }
    } catch (e) {
      alert("Failed to save product. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <header className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-[#083d41]">
            {isCreate ? "Create Product" : "Edit Product"}
          </h2>
          <p className="text-gray-500 mt-1">
            {isCreate
              ? "Add a new product with details, pricing, and media."
              : "Update product details, pricing, and media."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="text-gray-600 font-semibold hover:bg-gray-100 py-2 px-4 rounded-lg transition-colors"
            onClick={() => navigate(-1)}
            disabled={saving}
          >
            Discard
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-sm hover:shadow-md disabled:opacity-60"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? (isCreate ? "Creating..." : "Saving...") : (isCreate ? "Create Product" : "Save Changes")}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Core Details */}
        <div className="lg:col-span-2 space-y-8">
          <Card
            title="General Information"
            icon={<Type size={20} className="text-gray-500" />}
          >
            <div className="space-y-6">
              <InputField
                label="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Eco-Friendly Surface Cleaner"
                icon={<Tag size={16} />}
              />
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Description
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute top-4 left-0 flex items-center pl-4 text-gray-400">
                    <AlignLeft size={16} />
                  </div>
                  <textarea
                    rows="6"
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-green-300 focus:border-green-500 transition"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card
            title="Pricing"
            icon={<DollarSign size={20} className="text-gray-500" />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value.replace(/[^\d.]/g, ""))}
                placeholder="0.00"
                icon={<DollarSign size={16} />}
              />
              <InputField
                label="Price (On Sale)"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value.replace(/[^\d.]/g, ""))}
                placeholder="0.00"
                icon={<DollarSign size={16} />}
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Prices will be saved with exactly two decimal places.
            </p>
          </Card>
        </div>

        {/* Right Column: Media & Organization */}
        <div className="lg:col-span-1 space-y-8">
          <Card
            title="Product Media"
            icon={<ImageIcon size={20} className="text-gray-500" />}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {allImages.map((img, index) => (
                  <div
                    key={index}
                    className="relative group aspect-square rounded-lg overflow-hidden"
                  >
                    <img
                      src={img.value}
                      alt={`Product thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => removeImage(index)}
                        className="text-white bg-red-500/80 rounded-full p-1.5 hover:bg-red-500"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-8 h-8 mb-2 text-gray-500" />
                    <p className="mb-1 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      SVG, PNG, JPG (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChoose}
                  />
                </label>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {loading && !isCreate && (
        <div className="fixed inset-x-0 bottom-6 mx-auto w-max bg-white border border-gray-200 shadow-sm rounded-full px-4 py-2 text-sm text-gray-600">
          Loading product…
        </div>
      )}
    </div>
  );
};

export default ProductEditPage;
