export default function Spotlight({ x, y }: { x: number; y: number }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-[5] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{
        background: `radial-gradient(220px circle at ${x}px ${y}px, rgba(201,169,110,0.14), transparent 70%)`,
      }}
    />
  );
}
