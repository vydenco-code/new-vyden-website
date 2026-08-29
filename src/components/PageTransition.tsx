import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PageTransition() {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const handler = () => {
      gsap.timeline()
        .to(el, { scaleY: 1, duration: 0.32, ease: "expo.inOut", transformOrigin: "top" })
        .to(el, { scaleY: 0, duration: 0.32, ease: "expo.inOut", transformOrigin: "bottom", delay: 0.08 });
    };

    window.addEventListener("route-change", handler as EventListener);
    return () => window.removeEventListener("route-change", handler as EventListener);
  }, []);

  return (
    <div
      ref={elRef}
      className="fixed inset-0 bg-[#0d1e33] scale-y-0 will-change-transform z-[90] flex items-center justify-center pointer-events-none"
      style={{ transformOrigin: "top" }}
    >
      <img src="/vyden-v-white.svg" alt="" aria-hidden="true" className="h-16 w-auto opacity-80" width="100" height="76" decoding="async" />
    </div>
  );
}
