const WHATSAPP_NUMBER = "543775515076";

const WhatsApp = {
  // Formatea un número como precio en pesos, ej: 15000 -> $15.000
  formatPrice(amount) {
    return "$" + amount.toLocaleString("es-AR");
  },

  // Construye el texto completo del pedido en base al carrito. 
  buildMessage(cartItems) {
    const lines = ["Hola Aura77.", "Quiero realizar el siguiente pedido.", ""];
		
		// Agregar PRoductos  cargados al mensaje
    cartItems.forEach((item) => {
      const subtotal = item.price * item.quantity;
      lines.push(item.name);
      lines.push(`ID: ${item.id}`);
      lines.push(`Cantidad: ${item.quantity}`);
      lines.push(`Precio unitario: ${this.formatPrice(item.price)}`);
      lines.push(`Subtotal: ${this.formatPrice(subtotal)}`);
      lines.push(" ");
    });

		// Agregar Total al mensaje
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    lines.push("-------------------------")
    lines.push(`TOTAL: ${this.formatPrice(total)}`);
    lines.push("Muchas gracias.");

    return lines.join("\n");
  },

  // Abre WhatsApp con el mensaje del pedido
  sendOrder(cartItems) {
    if (!cartItems.length) return;

    const message = this.buildMessage(cartItems);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener");
  },
};
