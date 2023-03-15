/**
 * Ordena um array de objetos usando a chave especificada
 */
// @ts-expect-error TS(2551): Property 'sortBy' does not exist on type 'any[]'. ... Remove this comment to see the full error message
if (!Array.prototype.sortBy) {
  Object.defineProperty(Array.prototype, "sortBy", {
    value: function (key: string, order = "asc") {
      return [].concat(this).sort(
        // @ts-expect-error TS(2345): Argument of type '(a: never, b: never) => boolean'... Remove this comment to see the full error message
        order === "desc" ? (a, b) => a[key] < b[key] : (a, b) => a[key] > b[key]
      );
    },
  });
}

/**
 * Retorna o último elemento do array
 */
// @ts-expect-error TS(2339): Property 'last' does not exist on type 'any[]'.
if (!Array.prototype.last) {
  Object.defineProperty(Array.prototype, "last", {
    value: function () {
      return this[this.length - 1];
    },
  });
}

function darkenColor(color: string, amount: number): string {
  // Convert hex color to rgb
  let r = parseInt(color.substring(1, 2), 16);
  let g = parseInt(color.substring(3, 2), 16);
  let b = parseInt(color.substring(5, 2), 16);

  // Calculate darker rgb values
  r = Math.round(r * (1 - amount / 100));
  g = Math.round(g * (1 - amount / 100));
  b = Math.round(b * (1 - amount / 100));

  // Convert darker rgb values to hex
  color = "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);

  return color;
}

function componentToHex(c: number): string {
  let hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
