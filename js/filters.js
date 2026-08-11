const Filters = {
  category: "todas",
  colors: new Set(),

  setCategory(categoryId) {
    this.category = categoryId;
    window.dispatchEvent(new CustomEvent("catalog:changed"));
  },

  toggleColor(color) {
    if (this.colors.has(color)) {
      this.colors.delete(color);
    } else {
      this.colors.add(color);
    }
    window.dispatchEvent(new CustomEvent("catalog:changed"));
  },

  clear() {
    this.category = "todas";
    this.colors.clear();
    window.dispatchEvent(new CustomEvent("catalog:changed"));
  },

  hasActiveFilters() {
    return this.category !== "todas" || this.colors.size > 0;
  },

  // Evalúa si producto pasa los filtros activos
  matches(product) {  
    const categoryOk = this.category === "todas" || product.category === this.category;
    const colorsOk =
      this.colors.size === 0 ||
      product.colors.some((color) => this.colors.has(color));

    return categoryOk && colorsOk;
  },

  // Pinta los chips de categoría dentro de #category-nav.
  renderCategoryChips() {
    const nav = document.getElementById("category-nav");
    nav.innerHTML = "";

    CATEGORIES.forEach((cat) => {
      const chip = document.createElement("button");
      chip.className = "chip" + (cat.id === this.category ? " active" : "");
      chip.type = "button";
      chip.textContent = cat.label;
      chip.setAttribute("aria-pressed", cat.id === this.category);

      chip.addEventListener("click", () => {
        this.setCategory(cat.id);
        this.renderCategoryChips();
      });

      nav.appendChild(chip);
    });
  },

  // Pinta los chips de color dentro de #color-filters.
  renderColorChips() {
    const wrap = document.getElementById("color-filters");
    wrap.innerHTML = "";

    Object.keys(COLOR_HEX).forEach((color) => {
      const chip = document.createElement("button");
      const isActive = this.colors.has(color);
      chip.className = "chip" + (isActive ? " active" : "");
      chip.type = "button";
      chip.setAttribute("aria-pressed", isActive);

      const dot = document.createElement("span");
      dot.className = "color-dot";
      dot.style.background = COLOR_HEX[color];
      dot.style.borderColor = color === "Blanco" ? "#e5d5d5" : "transparent";

      chip.appendChild(dot);
      chip.append(color);

      chip.addEventListener("click", () => {
        this.toggleColor(color);
        this.renderColorChips();
      });

      wrap.appendChild(chip);
    });
  },
};
