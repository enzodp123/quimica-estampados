const tolerance = 2;

export const getCarouselTarget = (positions: number[], current: number, maximum: number, direction: -1 | 1): number => {
  const target = direction === 1
    ? positions.find((position) => position > current + tolerance) ?? maximum
    : positions.findLast((position) => position < current - tolerance) ?? 0;
  return Math.max(0, Math.min(target, maximum));
};

export function initProductCarousels(scope: ParentNode = document) {
  scope.querySelectorAll<HTMLElement>("[data-product-carousel]").forEach((carousel) => {
    if (carousel.dataset.carouselReady) return;
    const track = carousel.querySelector<HTMLElement>("[data-product-track]");
    const previous = carousel.querySelector<HTMLButtonElement>("[data-carousel-previous]");
    const next = carousel.querySelector<HTMLButtonElement>("[data-carousel-next]");
    const controls = carousel.querySelector<HTMLElement>("[data-carousel-controls]");
    if (!track || !previous || !next || !controls) return;
    carousel.dataset.carouselReady = "true";

    const maximum = () => Math.max(0, track.scrollWidth - track.clientWidth);
    const updateControls = () => {
      previous.disabled = track.scrollLeft <= tolerance;
      next.disabled = track.scrollLeft >= maximum() - tolerance;
      controls.hidden = maximum() <= tolerance;
    };
    const scrollTo = (left: number) => track.scrollTo({
      left,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
    const move = (direction: -1 | 1) => {
      const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-product-card]"));
      const start = cards[0]?.offsetLeft ?? 0;
      const positions = cards.map((card) => card.offsetLeft - start);
      scrollTo(getCarouselTarget(positions, track.scrollLeft, maximum(), direction));
    };

    previous.addEventListener("click", () => move(-1));
    next.addEventListener("click", () => move(1));
    track.addEventListener("scroll", updateControls, { passive: true });
    track.addEventListener("keydown", (event) => {
      if (event.target !== track) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        move(event.key === "ArrowLeft" ? -1 : 1);
      } else if (event.key === "Home" || event.key === "End") {
        event.preventDefault();
        scrollTo(event.key === "Home" ? 0 : maximum());
      }
    });
    const observer = new ResizeObserver(updateControls);
    observer.observe(track);
    document.addEventListener("astro:before-swap", () => observer.disconnect(), { once: true });
    updateControls();
  });
}
