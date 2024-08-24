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

export const fetchCartList = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/cart/list/`,
    {
      method: "get",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${token}`,
      },
    }
  );
  const data = await res.json();
  return data;
};
