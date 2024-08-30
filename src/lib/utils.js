export const currencyFormat = (price) => {
  const currency = new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
  });
  return currency.format(price);
};
