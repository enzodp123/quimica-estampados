export function initHeroProducts() {
  document.querySelectorAll<HTMLElement>("[data-hero-products]").forEach((carousel) => {
    if (carousel.dataset.ready) return;
    carousel.dataset.ready = "true";
    const items = Array.from(carousel.querySelectorAll<HTMLElement>("[data-hero-product]"));
    let center = 1;
    let timer = 0;
    let visible = false;
    let disposed = false;
    const events = new AbortController();
    const silhouettes = new Map<HTMLImageElement, { left: number; right: number }>();

    // Measure opaque pixels, so transparent padding does not make a garment shrink.
    const measure = (image: HTMLImageElement) => {
      if (silhouettes.has(image) || !image.naturalWidth) return;
      const canvas = document.createElement("canvas");
      canvas.width = 160;
      canvas.height = 160;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) return;
      try {
        context.drawImage(image, 0, 0, 160, 160);
        const { data } = context.getImageData(0, 0, 160, 160);
        let left = 160;
        let right = 0;
        for (let y = 0; y < 160; y++) {
          for (let x = 0; x < 160; x++) {
            if (data[(y * 160 + x) * 4 + 3] > 8) {
              left = Math.min(left, x);
              right = Math.max(right, x + 1);
            }
          }
        }
        silhouettes.set(image, left < right
          ? { left: left / 160, right: right / 160 } : { left: 0, right: 1 });
      } catch {
        silhouettes.set(image, { left: 0, right: 1 });
      }
    };

    const fitProducts = () => {
      const width = carousel.clientWidth;
      const height = carousel.clientHeight;
      if (!width || !height) return;
      const indices = [(center - 1 + items.length) % items.length, center, (center + 1) % items.length];
      const positions = [0.1288, 0.5, 0.8712];
      const scales = [0.48, 1, 0.48];
      const extents = indices.map((index) => {
        const image = items[index].querySelector("img")!;
        const bounds = silhouettes.get(image) ?? { left: 0, right: 1 };
        const renderedWidth = Math.min(width * 0.64, height * (image.naturalWidth / image.naturalHeight || 1));
        return { left: (0.5 - bounds.left) * renderedWidth, right: (bounds.right - 0.5) * renderedWidth };
      });
      // Only reduce a pair that collides, by the exact factor needed for its gap.
      for (let index = 0; index < 2; index++) {
        const available = (positions[index + 1] - positions[index]) * width - 8;
        const occupied = extents[index].right * scales[index] + extents[index + 1].left * scales[index + 1];
        if (occupied > available) {
          const factor = Math.max(0, available / occupied);
          scales[index] *= factor;
          scales[index + 1] *= factor;
        }
      }
      indices.forEach((index, slot) => items[index].style.setProperty("--product-scale", String(scales[slot])));
    };

    const prepare = async (index: number) => {
      const image = items[index]?.querySelector("img");
      if (!image) return;
      image.loading = "eager";
      await image.decode().catch(() => {});
      measure(image);
    };
    const schedule = () => {
      clearTimeout(timer);
      if (disposed || !visible || document.hidden || items.length < 3) return;
      void prepare((center + 2) % items.length);
      timer = window.setTimeout(async () => {
        const next = (center + 1) % items.length;
        await prepare((next + 1) % items.length);
        if (disposed || !visible || document.hidden) return;
        center = next;
        fitProducts();
        items.forEach((item, index) => {
          item.dataset.position = index === center ? "center"
            : index === (center - 1 + items.length) % items.length ? "left"
            : index === (center + 1) % items.length ? "right" : "hidden";
        });
        schedule();
      }, 3200);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      schedule();
    });
    observer.observe(carousel);
    void Promise.all([0, 1, 2].map(prepare)).then(() => { if (!disposed) fitProducts(); });
    const resizeObserver = new ResizeObserver(fitProducts);
    resizeObserver.observe(carousel);
    document.addEventListener("visibilitychange", schedule, { signal: events.signal });
    document.addEventListener("astro:before-swap", () => {
      disposed = true;
      clearTimeout(timer);
      observer.disconnect();
      resizeObserver.disconnect();
      events.abort();
      delete carousel.dataset.ready;
    }, { once: true });
  });
}
