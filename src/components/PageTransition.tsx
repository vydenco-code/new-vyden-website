import { useEffect, useRef } from "react";
import gsap from "gsap";

type Axis = "y" | "x";

interface Curtain {
  axis: Axis;
  coverOrigin: string;
  revealOrigin: string;
}

// Curtain direction per destination route.
function curtainFor(path: string): Curtain {
  if (path.startsWith("/work")) {
    // Wipe in from the right, out to the left.
    return { axis: "x", coverOrigin: "right", revealOrigin: "left" };
  }
  if (path.startsWith("/contact")) {
    // Rise from the bottom, exit through the top.
    return { axis: "y", coverOrigin: "bottom", revealOrigin: "top" };
  }
  // Default: drop from the top, exit through the bottom.
  return { axis: "y", coverOrigin: "top", revealOrigin: "bottom" };
}

export default function PageTransition() {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const handler = (e: Event) => {
      const path = (e as CustomEvent<{ path?: string }>).detail?.path ?? "/";
      const { axis, coverOrigin, revealOrigin } = curtainFor(path);
      const cover = axis === "y" ? { scaleY: 1 } : { scaleX: 1 };
      const reveal = axis === "y" ? { scaleY: 0 } : { scaleX: 0 };

      gsap.killTweensOf(el);
      gsap.timeline()
        .set(el, { transformOrigin: coverOrigin, scaleX: axis === "x" ? 0 : 1, scaleY: axis === "y" ? 0 : 1 })
        .to(el, { ...cover, duration: 0.32, ease: "expo.inOut" })
        .to(el, { ...reveal, duration: 0.32, ease: "expo.inOut", transformOrigin: revealOrigin, delay: 0.08 });
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
