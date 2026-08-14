const UI = {
  elements: {},

  cacheElements() {
    this.elements = {
      grid: document.getElementById("product-grid"),
      emptyState: document.getElementById("empty-state"),
      resultsCount: document.getElementById("results-count"),
      cartItems: document.getElementById("cart-items"),
      cartEmpty: document.getElementById("cart-empty"),
      cartFooter: document.getElementById("cart-footer"),
      cartTotal: document.getElementById("cart-total"),
      cartCount: document.getElementById("cart-count"),
      cartPanel: document.getElementById("cart-panel"),
      cartOverlay: document.getElementById("cart-overlay"),
    };
  },

  // Crea un puntito de color para tarjetas y detalle de producto
  buildColorDot(colorName) {
    const dot = document.createElement("span");
    dot.className = "color-dot";
    dot.title = colorName;
    dot.style.background = COLOR_HEX[colorName] || "#ccc";
    if (colorName === "Blanco") dot.style.borderColor = "#e5d5d5";
    return dot;
  },

  /* Construye el elemento DOM de una tarjeta de producto. */
  buildProductCard(product) {
    const card = document.createElement("article");
    card.className = "product-card";

    const media = document.createElement("div");
    media.className = "product-media";

    const tag = document.createElement("span");
    tag.className = "product-category-tag";
    tag.textContent = product.categoryLabel;

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    img.loading = "lazy";

    media.append(tag, img);

    const info = document.createElement("div");
    info.className = "product-info";

    const id = document.createElement("span");
    id.className = "product-id";
    id.textContent = `Cód. ${product.id}`;

    const name = document.createElement("h3");
    name.className = "product-name";
    name.textContent = product.name;

    const colorsWrap = document.createElement("div");
    colorsWrap.className = "product-colors";
    product.colors.forEach((color) => colorsWrap.appendChild(this.buildColorDot(color)));

    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = WhatsApp.formatPrice(product.price);

    const addBtn = document.createElement("button");
    addBtn.className = "add-to-cart-btn";
    addBtn.type = "button";
    addBtn.textContent = "Agregar al carrito";
    addBtn.addEventListener("click", () => {
      Cart.addItem(product);
      addBtn.textContent = "¡Agregado! ✧";
      addBtn.classList.add("added");
      setTimeout(() => {
        addBtn.textContent = "Agregar al carrito";
        addBtn.classList.remove("added");
      }, 1100);
    });

    info.append(id, name, colorsWrap, price, addBtn);
    card.append(media, info);
    return card;
  },

  /* Combina búsqueda y filtros para redibujar el grid de productos, el catálogo */
  renderProductGrid() {
    const filtered = PRODUCTS.filter(
      (product) => Search.matches(product) && Filters.matches(product)
    );

    this.elements.grid.innerHTML = "";
    filtered.forEach((product) => {
      this.elements.grid.appendChild(this.buildProductCard(product));
    });

    const total = PRODUCTS.length;
    this.elements.resultsCount.textContent =
      filtered.length === total
        ? `${total} productos`
        : `${filtered.length} de ${total} productos`;

    this.elements.emptyState.hidden = filtered.length > 0;
    this.elements.grid.hidden = filtered.length === 0;
  },

  /* Redibuja el contenido del panel del carrito. */
  renderCart() {
    const items = Cart.items;
    this.elements.cartItems.innerHTML = "";

    const isEmpty = items.length === 0;
    this.elements.cartEmpty.hidden = !isEmpty;
    this.elements.cartFooter.style.display = isEmpty ? "none" : "flex";

    items.forEach((item) => {
      this.elements.cartItems.appendChild(this.buildCartRow(item));
    });

    this.elements.cartTotal.textContent = WhatsApp.formatPrice(Cart.getTotal());
    this.elements.cartCount.textContent = Cart.getItemCount();
  },

  buildCartRow(item) {
    const row = document.createElement("div");
    row.className = "cart-item";

    const media = document.createElement("div");
    media.className = "cart-item-media";
    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.name;
    media.appendChild(img);

    const info = document.createElement("div");
    info.className = "cart-item-info";

    const name = document.createElement("p");
    name.className = "cart-item-name";
    name.textContent = item.name;

    const price = document.createElement("p");
    price.className = "cart-item-price";
    price.textContent = `${WhatsApp.formatPrice(item.price)} c/u`;

    const qtyControl = document.createElement("div");
    qtyControl.className = "qty-control";

    const minusBtn = document.createElement("button");
    minusBtn.className = "qty-btn";
    minusBtn.type = "button";
    minusBtn.textContent = "–";
    minusBtn.setAttribute("aria-label", `Restar unidad a ${item.name}`);
    minusBtn.addEventListener("click", () => Cart.decrement(item.id));

    const qtyValue = document.createElement("span");
    qtyValue.className = "qty-value";
    qtyValue.textContent = item.quantity;

    const plusBtn = document.createElement("button");
    plusBtn.className = "qty-btn";
    plusBtn.type = "button";
    plusBtn.textContent = "+";
    plusBtn.setAttribute("aria-label", `Sumar unidad a ${item.name}`);
    plusBtn.addEventListener("click", () => Cart.increment(item.id));

    qtyControl.append(minusBtn, qtyValue, plusBtn);
    info.append(name, price, qtyControl);

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-item-btn";
    removeBtn.type = "button";
    removeBtn.textContent = "Quitar";
    removeBtn.addEventListener("click", () => Cart.removeItem(item.id));

    row.append(media, info, removeBtn);
    return row;
  },

  openCart() {
    this.elements.cartPanel.classList.add("open");
    this.elements.cartOverlay.classList.add("visible");
  },

  closeCart() {
    this.elements.cartPanel.classList.remove("open");
    this.elements.cartOverlay.classList.remove("visible");
  },

  toggleFiltersPanel() {
    const panel = document.getElementById("filters-panel");
    const toggle = document.getElementById("filters-toggle");
    const isOpen = panel.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen);
  },
};
