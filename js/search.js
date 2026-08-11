// Las busquedas se van a basar en el nombre de art., id y descripción

const Search = {
  term: "",

  setTerm(term) {
    this.term = term.trim().toLowerCase();
    window.dispatchEvent(new CustomEvent("catalog:changed"));
  },

  // Producto coincide con el término actual?
  matches(product) {
    if (!this.term) return true;

    const haystack = [
      product.name,
      product.id,
      product.description || "",
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(this.term);
  },
};
