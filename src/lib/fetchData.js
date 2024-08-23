export const fetchFoodItems = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/foods/`
  );
  const data = await res.json();
  return data;
};
