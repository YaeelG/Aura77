document.addEventListener("DOMContentLoaded", () => {
	// Año actual, del footer
  document.getElementById("fecha").textContent = new Date().getFullYear();

  UI.cacheElements(); // Evitamos usar document.getElementById(...) para buscar un elemento del DOM, referenciando directamente el elemento. Buscar en el DOM cada vez que redibuja algo es más lento.
  Cart.init(); //Se lee lo que haya guardado el carrito en localStorage, en caso de que el cliente cierre y vuelva abrir la pestaña. 
  
  // Generar botones de categoría y de color dinamicamente
  Filters.renderCategoryChips(); 
  Filters.renderColorChips(); 
  
  UI.renderProductGrid(); // Dibuja las tarjetas de productos
  UI.renderCart(); // Dibuja el contenido del panel lateral del carrito

  // Búsqueda de producto
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", (e) => Search.setTerm(e.target.value));

  // Panel filtros
  document.getElementById("filters-toggle").addEventListener("click", () => {
    UI.toggleFiltersPanel();
  });

  document.getElementById("clear-filters").addEventListener("click", () => {
    Filters.clear();
    Filters.renderCategoryChips();
    Filters.renderColorChips();
  });

  // Abrir y cerrar carrito
  document.getElementById("cart-toggle").addEventListener("click", () => UI.openCart());
  document.getElementById("cart-close").addEventListener("click", () => UI.closeCart());
  document.getElementById("cart-overlay").addEventListener("click", () => UI.closeCart());

  document.getElementById("clear-cart-btn").addEventListener("click", () => {
    if (confirm("¿Vaciar todo el carrito?")) {
      Cart.clear();
    }
  });

  // Enviar pedido por WhatsApp 
  document.getElementById("checkout-btn").addEventListener("click", () => {
    WhatsApp.sendOrder(Cart.items);
  });

  // Cambios de catálogo al aplicar filtros
  window.addEventListener("catalog:changed", () => UI.renderProductGrid());

  // Actualikzar carrito
  window.addEventListener("cart:updated", () => UI.renderCart());
});
