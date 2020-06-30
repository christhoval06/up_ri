export const numberFormat = (number, n, x, s, c) => {
  let num = number.toString().replace(",", "");

  if (isNaN(Number(num))) return null;

  const re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\D" : "$") + ")";
  num = Number(num).toFixed(Math.max(0, ~~n));
  return (c ? num.replace(".", c) : num).replace(new RegExp(re, "g"), "$&" + s);
};
