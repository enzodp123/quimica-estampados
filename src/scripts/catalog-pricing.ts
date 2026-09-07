import { describeCatalogSelection, findCatalogPrice, formatCatalogPrice, getCatalogTotal, type CatalogProduct } from "../data/pricing";

export function initCatalogPricing() {
  document.querySelectorAll<HTMLElement>("[data-catalog-pricing]").forEach((root) => {
    if (root.dataset.pricingReady) return;
    root.dataset.pricingReady = "true";
    const catalog: CatalogProduct = JSON.parse(root.dataset.catalog ?? "{}");
    const dimensions = root.querySelectorAll<HTMLFieldSetElement>("[data-price-dimension]");
    const updateText = (selector: string, value: string, hideEmpty = false) => {
      root.querySelectorAll<HTMLElement>(selector).forEach((node) => {
        node.textContent = value;
        if (hideEmpty) node.hidden = !value;
      });
    };
    const sync = () => {
      const selected: Record<string, string> = {};
      dimensions.forEach((dimension) => {
        const select = dimension.querySelector<HTMLSelectElement>("[data-price-select]");
        const active = dimension.querySelector<HTMLButtonElement>('[data-price-choice][aria-pressed="true"]');
        let value = select?.value ?? active?.dataset.priceChoice;
        const custom = dimension.querySelector<HTMLInputElement>("[data-custom-quantity]");
        if (value === "consultar" && custom?.value) value = `x${custom.value}`;
        if (value) selected[dimension.dataset.priceDimension!] = value;
      });
      const entry = root.dataset.consultOnly === "true" ? undefined : findCatalogPrice(catalog, selected);
      const selectionLabel = describeCatalogSelection(catalog, selected);
      const amount = formatCatalogPrice(entry);
      const total = getCatalogTotal(entry);
      updateText("[data-product-price]", amount);
      updateText("[data-price-label]", `${total ? "Total" : "Precio"} · ${selectionLabel}`);
      updateText("[data-price-kind]", total ? "total" : "", true);
      updateText("[data-product-installments]", entry?.installments ?? "", true);
      updateText("[data-price-note]", entry?.note ?? "", true);
      const quantity = catalog.variants.find(({ key }) => key === "quantity")?.options.find(({ value }) => value === selected.quantity);
      updateText("[data-quantity-label]", quantity?.label ?? "Consultar");
      root.querySelectorAll<HTMLAnchorElement>("[data-price-contact]").forEach((contact) => {
        const requested = selected.quantity?.startsWith("x") ? ` Cantidad: ${selected.quantity.slice(1)}.` : "";
        const url = new URL(contact.href);
        url.searchParams.set("text", `Hola, quisiera consultar por ${contact.dataset.productTitle}. ${selectionLabel}.${requested} Precio: ${amount}.`);
        contact.href = url.toString();
      });
    };
    dimensions.forEach((dimension) => {
      const buttons = dimension.querySelectorAll<HTMLButtonElement>("[data-price-choice]");
      buttons.forEach((button) => button.addEventListener("click", () => {
        buttons.forEach((other) => {
          other.classList.toggle("is-active", other === button);
          other.setAttribute("aria-pressed", String(other === button));
        });
        const customLabel = dimension.querySelector<HTMLElement>("[data-custom-quantity-label]");
        if (customLabel) customLabel.hidden = button.dataset.priceChoice !== "consultar";
        sync();
      }));
      dimension.querySelector("[data-custom-quantity]")?.addEventListener("input", sync);
      dimension.querySelector("[data-price-select]")?.addEventListener("change", sync);
    });
  });
}
