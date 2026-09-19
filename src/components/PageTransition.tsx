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
    return { axis: "x", coverOrigin: "right", revealOrigin: "left" };
  }
  if (path.startsWith("/contact")) {
    return { axis: "y", coverOrigin: "bottom", revealOrigin: "top" };
  }
  return { axis: "y", coverOrigin: "top", revealOrigin: "bottom" };
}

function labelFor(path: string): string {
  if (/^\/work\/[\w-]+$/.test(path)) return "CASE STUDY";
  if (path === "/work") return "OUR WORK";
  if (path === "/services") return "SERVICES";
  if (path === "/software") return "SOFTWARE";
  if (path === "/about") return "ABOUT US";
  if (path === "/contact") return "CONTACT";
  return "VYDEN CO.";
}

export default function PageTransition() {
  const elRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const vRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    const label = labelRef.current;
    const v = vRef.current;
    if (!el || !label) return;

    const handler = (e: Event) => {
      const path = (e as CustomEvent<{ path?: string }>).detail?.path ?? "/";
      const { axis, coverOrigin, revealOrigin } = curtainFor(path);
      const cover = axis === "y" ? { scaleY: 1 } : { scaleX: 1 };
      const reveal = axis === "y" ? { scaleY: 0 } : { scaleX: 0 };
      label.textContent = labelFor(path);

      gsap.killTweensOf([el, label, v]);
      const tl = gsap.timeline()
        .set(el, { transformOrigin: coverOrigin, scaleX: axis === "x" ? 0 : 1, scaleY: axis === "y" ? 0 : 1 })
        .set(label, { opacity: 0, y: 18 })
        .set(v, { scale: 0.4, opacity: 0 })
        .to(el, { ...cover, duration: 0.32, ease: "expo.inOut" })
        .to(label, { opacity: 1, y: 0, duration: 0.28, ease: "expo.out" }, 0.18);
      // V logo pulse: fades in, scales up slightly, then fades out — never overflows
      if (v) {
        tl.to(v, { opacity: 0.8, scale: 1, duration: 0.25, ease: "expo.out" }, 0.2)
          .to(v, { opacity: 0, scale: 1.4, duration: 0.2, ease: "expo.in" }, 0.45);
      }
      tl.to(label, { opacity: 0, y: -12, duration: 0.2, ease: "expo.in" }, 0.52)
        .to(el, { ...reveal, duration: 0.32, ease: "expo.inOut", transformOrigin: revealOrigin, delay: 0.08 });
    };

    window.addEventListener("route-change", handler as EventListener);
    return () => window.removeEventListener("route-change", handler as EventListener);
  }, []);

  return (
    <div
      ref={elRef}
      className="fixed inset-0 bg-[#0d1e33] scale-y-0 will-change-transform z-[90] flex flex-col items-center justify-center gap-5 pointer-events-none overflow-hidden"
      style={{ transformOrigin: "top" }}
    >
      <div ref={vRef} className="will-change-transform">
        <img src="/vyden-v-white.svg" alt="" aria-hidden="true" className="h-14 w-auto" width="72" height="56" decoding="async" />
      </div>
      <span ref={labelRef} className="font-serif text-4xl md:text-6xl font-light text-white tracking-tight opacity-0">
        VYDEN CO.
      </span>
      <span className="block w-16 h-[2px] bg-gold" aria-hidden="true" />
    </div>
  );
}
