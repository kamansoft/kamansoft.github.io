import { useCallback, useEffect, useState } from "react";

/** Becomes true once the element scrolls into view (plays once). Callback ref works with late-rendered nodes. */
export const useInView = <T extends Element = HTMLDivElement>(threshold = 0.25) => {
  const [node, setNode] = useState<T | null>(null);
  const [inView, setInView] = useState(false);
  const ref = useCallback((el: T | null) => setNode(el), []);
  useEffect(() => {
    if (!node || inView) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(node);
    return () => obs.disconnect();
  }, [node, inView, threshold]);
  return { ref, inView };
};

/** 0..1 progress of an element passing through the middle band of the viewport. */
export const useScrollProgress = <T extends Element = HTMLElement>() => {
  const [node, setNode] = useState<T | null>(null);
  const [progress, setProgress] = useState(0);
  const ref = useCallback((el: T | null) => setNode(el), []);
  useEffect(() => {
    if (!node) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = node.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85, end = vh * 0.35;
      const p = (start - r.top) / (start - end + r.height * 0.6);
      setProgress(Math.max(0, Math.min(1, p)));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(frame); };
  }, [node]);
  return { ref, progress };
};
