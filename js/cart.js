const Cart = {
  items: [],

  init() {
    this.items = Storage.getCart();
    this._notify();
  },

	// Actualiza precios de lo guardado en localStorage con los precios/descuentos actuales.
  // Quita productos que ya no existen en el catalogo.
  _syncWithCatalog() {
    this.items = this.items
      .map((item) => {
        const product = PRODUCTS.find((p) => p.id === item.id);
        if (!product) return null;
        const { final, original } = Pricing.get(product);
        return { ...item, name: product.name, image: product.image, price: final, originalPrice: original };
      })
      .filter(Boolean);
    Storage.saveCart(this.items);
  },
 

 
  // Agrega un producto al carrito.
  addItem(product) {    
    const existing = this.items.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      const { final, original } = Pricing.get(product);
      this.items.push({
        id: product.id,
        name: product.name,
        price: final,
        originalPrice: original,
        image: product.image,
        quantity: 1,
      });
    }
    
    this._persist();
  },

  increment(productId) {
    const item = this.items.find((i) => i.id === productId);
    if (item) {
      item.quantity += 1;
      this._persist();
    }
  },

  decrement(productId) {
    const item = this.items.find((i) => i.id === productId);
    if (!item) return;

    item.quantity -= 1;
    if (item.quantity <= 0) {
      this.removeItem(productId);
      return;
    }
    this._persist();
  },

  removeItem(productId) {
    this.items = this.items.filter((i) => i.id !== productId);
    this._persist();
  },

  clear() {
    this.items = [];
    Storage.clearCart();
    this._notify();
  },

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  },

  isEmpty() {
    return this.items.length === 0;
  },
  
  // Guarda en localStorage y le avisa a la UI.
  _persist() {
    Storage.saveCart(this.items);
    this._notify();
  },

  _notify() {
    window.dispatchEvent(new CustomEvent("cart:updated", { detail: { items: this.items } }));
  },
};
