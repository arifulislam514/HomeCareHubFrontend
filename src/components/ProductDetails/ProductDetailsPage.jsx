import React, { useEffect, useState } from "react";
import { Star, ShoppingCart, Truck } from "lucide-react";
import { useParams } from "react-router-dom";
import apiClient from "../../services/api-client";
import authApiClient from "../../services/auth-api-client";
import useOneClickBooking from "../../services/OneClickBooking";

/* ---------------- helpers ---------------- */

const fixBase = (path) => {
  const base = apiClient?.defaults?.baseURL || "";
  // if base already ends with /api/v1, strip it from the path we pass
  return /\/api\/v1\/?$/i.test(base) ? path.replace("/api/v1", "") : path;
};

const toTwo = (n) => (Number.isFinite(Number(n)) ? Number(n) : 0).toFixed(2);

const mapIn = (p = {}) => {
  const name = p.name ?? p.title ?? "Product";
  const description = p.description ?? p.details ?? "";

  const priceRaw =
    p.price_with_tax ?? p.priceWithTax ?? p.total_price ?? p.price ?? 0;
  const saleRaw =
    p.sale_price_with_tax ??
    p.salePriceWithTax ??
    p.discount_price ??
    p.sale_price ??
    null;

  const category = p.category ?? p.category_name ?? "General";
  const tags =
    (Array.isArray(p.tags) && p.tags) ||
    (typeof p.tags === "string" ? p.tags.split(",").map((t) => t.trim()) : []);

  let images = [];
  if (Array.isArray(p.images)) {
    images = p.images
      .map((im) => {
        if (typeof im === "string") return im;
        return im?.url || im?.image || null;
      })
      .filter(Boolean);
  } else if (p.image) {
    images = [p.image];
  }
  if (images.length === 0) {
    images = [
      "https://placehold.co/600x600/083d41/ffffff?text=Main",
      "https://placehold.co/600x600/22c55e/ffffff?text=Side",
      "https://placehold.co/600x600/eab308/ffffff?text=In+Use",
      "https://placehold.co/600x600/f97316/ffffff?text=Kit",
    ];
  }

  return {
    name,
    description,
    price: toTwo(priceRaw),
    salePrice: saleRaw != null ? toTwo(saleRaw) : toTwo(priceRaw),
    rating: 0,
    reviewCount: 0,
    images,
    category,
    tags,
    inStock: Boolean(p.in_stock ?? p.available ?? p.stock > 0 ?? true),
  };
};

/* ---------------- component ---------------- */

const PAGE_SIZE = 5;

const ProductDetailsPage = () => {
  const { id } = useParams();
  const productId = Number(id);
  const { bookNow } = useOneClickBooking();

  // product
  const [loading, setLoading] = useState(true);
  const [prod, setProd] = useState(() => mapIn());
  const [mainImage, setMainImage] = useState(null);

  // booking
  const [quantity] = useState(1);
  const [booking, setBooking] = useState(false);
  const [bookError, setBookError] = useState(null);

  // me (current user)
  const [me, setMe] = useState(null);

  // reviews
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const pageCount = Math.max(1, Math.ceil(count / PAGE_SIZE));

  // create review form
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");

  // edit/delete state
  const [editingId, setEditingId] = useState(null);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState("");
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [rowError, setRowError] = useState(null);

  // Keep main image in sync
  useEffect(() => {
    if (prod.images && prod.images.length && !mainImage) {
      setMainImage(prod.images[0]);
    }
  }, [prod.images, mainImage]);

  // Fetch product (once per id)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const productCandidates = [
          fixBase(`/api/v1/products/${id}/`),
          fixBase(`/products/${id}/`),
        ];
        for (const url of productCandidates) {
          try {
            const res = await apiClient.get(url);
            if (!cancelled && res?.data) {
              const mapped = mapIn(res.data);
              setProd((prev) => ({ ...prev, ...mapped }));
              if (mapped.images?.length) setMainImage(mapped.images[0]);
              break;
            }
          } catch {
            // try next candidate
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  // Fetch current user (to enable edit/delete on own reviews)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await authApiClient.get(fixBase("/api/v1/users/me/"));
        if (!cancelled) setMe(res?.data || null);
      } catch {
        if (!cancelled) setMe(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const displayName = (u = {}) => {
    const first = (u.first_name || "").trim();
    if (first) return first;
    if (u.email) return u.email; // or u.email.split("@")[0]
    return "User";
  };

  // Fetch reviews (paginated) whenever id/page changes
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setReviewsLoading(true);
        setReviewsError(null);

        const reviewCandidates = [
          fixBase(`/api/v1/products/${id}/reviews/`),
          fixBase(`/products/${id}/reviews/`),
        ];

        let pageData = { items: [], count: 0 };
        for (const url of reviewCandidates) {
          try {
            const res = await apiClient.get(url, {
              params: { page, page_size: PAGE_SIZE },
            });

            if (Array.isArray(res?.data)) {
              pageData = {
                items: res.data.slice(0, PAGE_SIZE),
                count: res.data.length,
              };
              break;
            } else if (res?.data?.results) {
              pageData = {
                items: res.data.results || [],
                count: Number(res.data.count || 0),
              };
              break;
            }
          } catch {
            // try next candidate
          }
        }

        if (!cancelled) {
          setReviews(pageData.items);
          setCount(pageData.count);

          // quick page-average to show something
          const localAvg = pageData.items.length
            ? Math.round(
                (pageData.items.reduce(
                  (a, r) => a + Number(r.ratings || 0),
                  0
                ) /
                  pageData.items.length) *
                  10
              ) / 10
            : 0;

          setProd((prev) => ({
            ...prev,
            rating: localAvg,
            reviewCount: pageData.count || pageData.items.length,
          }));
        }
      } catch (e) {
        if (!cancelled) setReviewsError(e?.message || "Failed to load reviews");
      } finally {
        if (!cancelled) setReviewsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id, page]);

  const handleBook = async () => {
    try {
      setBookError(null);
      setBooking(true);
      await bookNow(productId, 1);
    } catch (e) {
      const msg =
        e?.response?.data?.error ||
        e?.response?.data?.detail ||
        e?.message ||
        "Something went wrong";
      setBookError(msg);
    } finally {
      setBooking(false);
    }
  };

  // Create review
  const submitReview = async (e) => {
    e.preventDefault();
    if (!newRating || newRating < 1 || newRating > 5) {
      setFormError("Please select a rating between 1 and 5.");
      return;
    }
    if (!newComment.trim()) {
      setFormError("Please write a short comment.");
      return;
    }
    try {
      setFormError(null);
      setSubmitting(true);
      const candidates = [
        fixBase(`/api/v1/products/${id}/reviews/`),
        fixBase(`/products/${id}/reviews/`),
      ];
      let ok = false;
      for (const url of candidates) {
        try {
          await authApiClient.post(url, {
            ratings: newRating,
            comment: newComment.trim(),
          });
          ok = true;
          break;
        } catch (err) {
          // try next candidate
          if (err?.response?.data?.detail) setFormError(err.response.data.detail);
        }
      }
      if (!ok) throw new Error(formError || "Failed to submit review.");

      // reset and refresh
      setNewRating(0);
      setNewComment("");
      setPage(1); // refresh list to show newest
    } catch (err) {
      setFormError(err?.message || "Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  // Edit review
  const openEdit = (rev) => {
    setRowError(null);
    setEditingId(rev.id);
    setEditRating(rev.ratings);
    setEditComment(rev.comment || "");
  };
  const cancelEdit = () => {
    setEditingId(null);
    setEditRating(0);
    setEditComment("");
    setRowError(null);
  };
  const submitEdit = async () => {
    if (!editingId) return;
    if (editRating < 1 || editRating > 5) {
      setRowError("Rating must be 1–5.");
      return;
    }
    try {
      setEditSubmitting(true);
      setRowError(null);
      const url = fixBase(`/api/v1/products/${id}/reviews/${editingId}/`);
      await authApiClient.patch(url, { ratings: editRating, comment: editComment });
      cancelEdit();
      // refresh current page
      setPage((p) => p);
    } catch (e) {
      const msg =
        e?.response?.data?.detail || e?.message || "Failed to update review.";
      setRowError(msg);
    } finally {
      setEditSubmitting(false);
    }
  };

  // Delete review
  const deleteReview = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      const url = fixBase(`/api/v1/products/${id}/reviews/${reviewId}/`);
      await authApiClient.delete(url);
      // reload current page
      setPage((p) => p);
    } catch (e) {
      const msg =
        e?.response?.data?.detail || e?.message || "Failed to delete review.";
      setReviewsError(msg);
    }
  };

  // Helpers
  const fullStars = Math.floor(prod.rating || 0);
  const canPrev = page > 1;
  const canNext = page < pageCount;

  return (
    <div className="font-sans bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {(loading || reviewsLoading) && (
          <div className="mt-6 mx-auto w-max bg-white border border-gray-200 shadow-sm rounded-full px-4 py-2 text-sm text-gray-600">
            Loading product…
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl shadow-sm overflow-hidden flex items-center justify-center p-4">
              {loading ? (
                <div className="w-full h-full bg-gray-100 animate-pulse rounded-xl" />
              ) : (
                <img
                  src={mainImage}
                  alt="Main product"
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {(prod.images || []).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(img)}
                  className={`aspect-square bg-white rounded-xl overflow-hidden p-1 transition ring-2 ${
                    mainImage === img
                      ? "ring-green-500"
                      : "ring-transparent hover:ring-green-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="space-y-6">
            <div>
              <span className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                {prod.category}
              </span>
              <h1 className="text-4xl font-bold text-[#083d41] mt-2">
                {prod.name}
              </h1>

              {/* Dynamic rating + count */}
              <div className="flex items-center gap-4 mt-3 text-sm">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < fullStars
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-gray-600">
                  {Number(prod.rating || 0).toFixed(1)} ({prod.reviewCount}{" "}
                  {prod.reviewCount === 1 ? "review" : "reviews"})
                </span>
              </div>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">
              {prod.description}
            </p>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-green-500">
                ${prod.salePrice}
              </span>
              {Number(prod.salePrice) < Number(prod.price) && (
                <span className="text-2xl font-medium text-gray-400 line-through">
                  ${prod.price}
                </span>
              )}
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-5">
              <button
                onClick={handleBook}
                disabled={booking}
                className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl transition-transform transform hover:scale-[1.02] shadow-lg hover:shadow-green-500/30"
              >
                <ShoppingCart size={22} />
                <span>{booking ? "Processing..." : "Book Service"}</span>
              </button>

              {bookError && (
                <p className="text-red-600 text-sm text-center">{bookError}</p>
              )}
            </div>

            <div className="border-t pt-6 space-y-8">
              <div className="flex items-center gap-3 text-gray-600">
                <Truck size={20} />
                <span className="font-medium">
                  Free shipping on orders over $50
                </span>
              </div>

              {/* === Write a review === */}
              <div className="bg-white p-5 rounded-2xl shadow-sm">
                <h2 className="text-lg font-semibold text-[#083d41] mb-3">
                  Write a review
                </h2>
                <form onSubmit={submitReview} className="space-y-3">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setNewRating(n)}
                        className="p-1"
                        aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
                        title={`Rate ${n}`}
                      >
                        <Star
                          size={22}
                          className={`${
                            n <= newRating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-sm text-gray-600 ml-2">
                      {newRating || "Select rating"}
                    </span>
                  </div>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                    placeholder="Share your experience…"
                    className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  {formError && (
                    <p className="text-sm text-red-600">{formError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 rounded-xl bg-[#083d41] text-white font-semibold hover:opacity-95 disabled:opacity-60"
                  >
                    {submitting ? "Submitting…" : "Post review"}
                  </button>
                </form>
              </div>

              {/* === Reviews list === */}
              <div className="bg-white p-5 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold text-[#083d41]">
                    Reviews
                  </h2>
                  <span className="text-sm text-gray-500">
                    {count} {count === 1 ? "review" : "reviews"} • Page {page} of{" "}
                    {pageCount}
                  </span>
                </div>

                {reviewsError && (
                  <p className="text-sm text-red-600 mb-3">{reviewsError}</p>
                )}

                {!reviewsLoading && reviews.length === 0 && (
                  <p className="text-sm text-gray-600">No reviews yet.</p>
                )}

                <ul className="space-y-4">
                  {reviews.map((r) => {
                    const isMine = me && r?.user?.id === me?.id;
                    const isEditing = editingId === r.id;
                    return (
                      <li key={r.id} className="text-sm text-gray-700">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {displayName(r.user)}
                            </span>
                            <span className="text-yellow-500">
                              {"★".repeat(r.ratings)}
                              {"☆".repeat(5 - r.ratings)}
                            </span>
                          </div>

                          {isMine && !isEditing && (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => openEdit(r)}
                                className="px-2 py-1 rounded-md border border-gray-200 text-xs hover:bg-gray-50"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteReview(r.id)}
                                className="px-2 py-1 rounded-md border border-red-200 text-xs text-red-600 hover:bg-red-50"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>

                        {!isEditing ? (
                          <p className="text-gray-600 mt-1">{r.comment}</p>
                        ) : (
                          <div className="mt-2 rounded-lg border border-gray-200 p-3 bg-gray-50">
                            <div className="flex items-center gap-2 mb-2">
                              {[1, 2, 3, 4, 5].map((n) => (
                                <button
                                  key={n}
                                  type="button"
                                  onClick={() => setEditRating(n)}
                                  className="p-0.5"
                                  title={`Rate ${n}`}
                                >
                                  <Star
                                    size={18}
                                    className={
                                      n <= editRating
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-300"
                                    }
                                  />
                                </button>
                              ))}
                              <span className="text-xs text-gray-500 ml-1">
                                {editRating || "Select rating"}
                              </span>
                            </div>

                            <textarea
                              value={editComment}
                              onChange={(e) => setEditComment(e.target.value)}
                              rows={3}
                              className="w-full border border-gray-300 bg-white rounded-md p-2 text-sm"
                              placeholder="Update your comment…"
                            />

                            {rowError && (
                              <p className="text-xs text-red-600 mt-1">
                                {rowError}
                              </p>
                            )}

                            <div className="mt-2 flex items-center gap-2">
                              <button
                                onClick={submitEdit}
                                disabled={editSubmitting}
                                className="px-3 py-1.5 rounded-md bg-[#083d41] text-white text-xs disabled:opacity-60"
                              >
                                {editSubmitting ? "Saving…" : "Save"}
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="px-3 py-1.5 rounded-md border border-gray-200 text-xs"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>

                {pageCount > 1 && (
                  <div className="mt-5 flex items-center justify-between">
                    <button
                      onClick={() => canPrev && setPage((p) => p - 1)}
                      disabled={!canPrev}
                      className="px-4 py-2 rounded-lg border border-gray-200 text-sm disabled:opacity-50"
                    >
                      Previous
                    </button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: pageCount })
                        .slice(0, 7)
                        .map((_, i) => {
                          const n = i + 1;
                          return (
                            <button
                              key={n}
                              onClick={() => setPage(n)}
                              className={`px-3 py-1 rounded-md text-sm ${
                                n === page
                                  ? "bg-green-500 text-white"
                                  : "border border-gray-200"
                              }`}
                            >
                              {n}
                            </button>
                          );
                        })}
                      {pageCount > 7 && (
                        <span className="px-2 text-gray-500 text-sm">…</span>
                      )}
                    </div>

                    <button
                      onClick={() => canNext && setPage((p) => p + 1)}
                      disabled={!canNext}
                      className="px-4 py-2 rounded-lg border border-gray-200 text-sm disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>

            {!!(prod.tags || []).length && (
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-gray-800">Tags:</span>
                {prod.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;