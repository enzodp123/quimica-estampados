import { getCarouselTarget } from "./product-carousel";

export function initBrandCarousels() {
  document.querySelectorAll<HTMLElement>("[data-brand-carousel]").forEach((carousel) => {
    if (carousel.dataset.autoplayReady) return;
    const track = carousel.querySelector<HTMLElement>("[data-product-track]");
    const pause = carousel.querySelector<HTMLButtonElement>("[data-brand-pause]");
    const symbol = pause?.querySelector<HTMLElement>("[data-brand-pause-symbol]");
    if (!track || !pause || !symbol || !track.children.length) return;

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
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 40rem)");
    let paused = motion.matches;
    let hovered = false;
    let touching = false;
    let visible = false;
    let interacting = false;
    let interactionTimer = 0;
    let frame = 0;
    let previousTime = 0;
    let position = track.scrollLeft;
    let cycleWidth = copies[0].offsetLeft - originals[0].offsetLeft;

    const canRun = () => {
      const focus = document.activeElement;
      const focused = focus !== pause && focus !== null && carousel.contains(focus);
      return !paused && !hovered && !touching && !focused && !interacting && visible && !document.hidden && cycleWidth > 0;
    };
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
    const allowManualScroll = () => {
      interacting = true;
      clearTimeout(interactionTimer);
      syncAnimation();
      interactionTimer = window.setTimeout(() => { interacting = false; syncAnimation(); }, 1200);
    };
    const updatePause = () => {
      pause.setAttribute("aria-pressed", String(paused));
      pause.setAttribute("aria-label", paused ? "Reanudar carrusel de marcas" : "Pausar carrusel de marcas");
      symbol.textContent = paused ? "▶" : "Ⅱ";
      syncAnimation();
    };
    pause.hidden = false;
    updatePause();
    pause.addEventListener("click", () => { paused = !paused; updatePause(); }, options);
    motion.addEventListener("change", () => { paused = motion.matches; updatePause(); }, options);
    carousel.addEventListener("pointerenter", (event) => { if (event.pointerType === "mouse") hovered = true; syncAnimation(); }, options);
    carousel.addEventListener("pointerleave", () => { hovered = false; syncAnimation(); }, options);
    carousel.addEventListener("pointerdown", () => { touching = true; syncAnimation(); }, options);
    const endTouch = () => { if (touching) { touching = false; allowManualScroll(); } };
    window.addEventListener("pointerup", endTouch, options);
    window.addEventListener("pointercancel", endTouch, options);
    track.addEventListener("wheel", allowManualScroll, { ...options, passive: true });
    track.addEventListener("keydown", (event) => {
      if (event.target !== track || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      allowManualScroll();
      const maximum = Math.max(0, track.scrollWidth - track.clientWidth);
      const positions = [...originals, ...copies].map((item) => item.offsetLeft - originals[0].offsetLeft);
      const left = event.key === "Home" ? 0 : event.key === "End" ? maximum
        : getCarouselTarget(positions, track.scrollLeft, maximum, event.key === "ArrowLeft" ? -1 : 1);
      track.scrollTo({ left, behavior: motion.matches ? "instant" : "smooth" });
    }, options);
    carousel.addEventListener("focusin", syncAnimation, options);
    carousel.addEventListener("focusout", () => queueMicrotask(syncAnimation), options);
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
      clearTimeout(interactionTimer);
      observer.disconnect();
      resizeObserver.disconnect();
      events.abort();
      copies.forEach((copy) => copy.remove());
      delete carousel.dataset.autoplayReady;
    }, { once: true });
  });
}
