const token = localStorage.getItem("authToken");

export const fetchFoodItems = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/foods/`
  );
  const data = await res.json();
  return data;
};

export const fetchFoodDetails = async (slug) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/food-details/${slug}/`
  );
  const data = await res.json();
  return data;
};

export const addToCart = async ({ slug, quantity }) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/cart/add-to-cart/${slug}/`,
    {
      method: "post",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ quantity }),
    }
  );
  const data = await res.json();
  return data;
};


