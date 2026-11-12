// Descuento global.
// usar: { tipo: "porcentaje", valor: 10 }   o   null
const GLOBAL_DISCOUNT = null;

const Pricing = {
  // Devuelve { original, final, hasDiscount, label } para un producto
  get(product) {
    const original = product.price;
    const d = "descuento" in product ? product.descuento : GLOBAL_DISCOUNT;

    if (!d || typeof d.valor !== "number") {
      return { original, final: original, hasDiscount: false, label: "" };
    }

    let final = original;
    if (d.tipo === "porcentaje") final = original * (1 - d.valor / 100);
    else if (d.tipo === "monto") final = original - d.valor;
    else if (d.tipo === "precio") final = d.valor;

    final = Math.round(final);

    // Si el descuento es invalido o no baja el precio, se ignora
    if (final <= 0 || final >= original) {
      return { original, final: original, hasDiscount: false, label: "" };
    }

    const pct = Math.round((1 - final / original) * 100);
    const label = d.tipo === "porcentaje" ? `-${d.valor}%` : `-${pct}%`;
    return { original, final, hasDiscount: true, label };
  },
};