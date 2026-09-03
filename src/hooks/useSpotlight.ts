import { useRef, useState } from 'react';
import type { MouseEvent } from 'react';

export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [pos, setPos] = useState({ x: -400, y: -400 });

  const onMouseMove = (e: MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  return { ref, pos, onMouseMove };
}
