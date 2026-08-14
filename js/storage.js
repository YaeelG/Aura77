// Este maneja el acceso a localstorage

const STORAGE_KEY = "aura77_cart_v1";

const Storage = {
  // Leer el carrito guardado
  getCart() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.warn("No se pudo leer el carrito guardado:", err);
      return [];
    }
  },

  // Guardar carrito completo
  saveCart(cartItems) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (err) {
      console.warn("No se pudo guardar el carrito:", err);
    }
  },

// Limpiar carrito
  clearCart() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.warn("No se pudo vaciar el carrito guardado:", err);
    }
  },
};
