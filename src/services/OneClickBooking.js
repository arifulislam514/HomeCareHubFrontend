import authApiClient from "./auth-api-client";
import { useNavigate } from "react-router-dom";

export default function useOneClickBooking() {
  const navigate = useNavigate();

  const fetchCartId = async () => {
    try {
      const { data } = await authApiClient.post("/carts/", {}); // idempotent on server
      sessionStorage.setItem("cart_id", data.id);
      return data.id;
    } catch {
      const { data } = await authApiClient.get("/carts/me/");
      sessionStorage.setItem("cart_id", data.id);
      return data.id;
    }
  };

  const ensureCartId = async () => {
    const cached = sessionStorage.getItem("cart_id");
    if (!cached) return fetchCartId();
    try {
      await authApiClient.get(`/carts/${cached}/`);
      return cached;
    } catch {
      return fetchCartId();
    }
  };

  const addToCart = async (cartId, productId, quantity = 1) => {
    return authApiClient.post(`/carts/${cartId}/items/`, {
      product_id: productId,
      quantity,
    });
  };

  const bookNow = async (productId, quantity = 1) => {
    let cartId = await ensureCartId();
    try {
      await addToCart(cartId, productId, quantity);
    } catch (err) {
      if (err?.response?.status >= 400) {
        cartId = await fetchCartId();
        await addToCart(cartId, productId, quantity);
      } else {
        throw err;
      }
    }
    navigate("/checkout");
  };

  return { bookNow };
}
