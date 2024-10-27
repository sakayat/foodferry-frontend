export const currencyFormat = (price) => {
  const currency = new Intl.NumberFormat("en-BD", {
    style: "decimal",
    currency: "BDT",
  });
  return `TK ${currency.format(price)}`;
};
