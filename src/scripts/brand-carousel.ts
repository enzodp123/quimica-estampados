export function initBrandCarousels() {
  document.querySelectorAll<HTMLElement>("[data-brand-carousel]").forEach((carousel) => {
    if (carousel.dataset.autoplayReady) return;
    const track = carousel.querySelector<HTMLElement>("[data-product-track]");
    if (!track || !track.children.length) return;

    // La copia visual une el final con el inicio; la lista accesible mantiene 32 marcas.
    const originals = Array.from(track.children) as HTMLElement[];
    const copies = originals.map((item) => {
      const copy = item.cloneNode(true) as HTMLElement;
      copy.dataset.brandLoopCopy = "true";
      copy.setAttribute("aria-hidden", "true");
      copy.querySelectorAll("img").forEach((img) => { img.alt = ""; });
      return copy;
    });
    track.append(...copies);
    carousel.dataset.autoplayReady = "true";

    const events = new AbortController();
    const options = { signal: events.signal };
    const mobile = window.matchMedia("(max-width: 40rem)");
    let visible = false;
    let frame = 0;
    let previousTime = 0;
    let position = track.scrollLeft;
    let cycleWidth = copies[0].offsetLeft - originals[0].offsetLeft;

    const canRun = () => visible && !document.hidden && cycleWidth > 0;
    const animate = (time: number) => {
      frame = 0;
      if (!canRun()) { previousTime = 0; return; }
      if (previousTime === 0) position = track.scrollLeft;
      else {
        const elapsed = Math.min(time - previousTime, 64) / 1000;
        const pixelsPerSecond = mobile.matches ? 56 : 72;
        position = (position + elapsed * pixelsPerSecond) % cycleWidth;
        track.scrollTo({ left: position, behavior: "instant" });
      }
      previousTime = time;
      frame = requestAnimationFrame(animate);
    };
    const syncAnimation = () => {
      if (canRun()) {
        if (!frame) { previousTime = 0; frame = requestAnimationFrame(animate); }
      } else {
        cancelAnimationFrame(frame);
        frame = 0;
        previousTime = 0;
      }
    };
    document.addEventListener("visibilitychange", syncAnimation, options);

    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; syncAnimation(); });
    observer.observe(carousel);
    const resizeObserver = new ResizeObserver(() => {
      cycleWidth = copies[0].offsetLeft - originals[0].offsetLeft;
      previousTime = 0;
      syncAnimation();
    });
    resizeObserver.observe(track);

    document.addEventListener("astro:before-swap", () => {
      visible = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      events.abort();
      copies.forEach((copy) => copy.remove());
      delete carousel.dataset.autoplayReady;
    }, { once: true });
  });
}
