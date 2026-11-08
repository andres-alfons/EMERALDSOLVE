import { useEffect, useRef, useState } from 'react';
import { clamp } from '../lib/format';

// Anima un número hacia `target` (ease-out, ~420 ms), redondeando a miles mientras se mueve.
export function useAnimatedNumber(target, reduce) {
  const [shown, setShown] = useState(target);
  const current = useRef(target);

  useEffect(() => {
    if (reduce) { current.current = target; setShown(target); return; }
    const from = current.current, t0 = performance.now();
    let raf = 0;
    const step = (now) => {
      const k = clamp((now - t0) / 420, 0, 1), e = 1 - Math.pow(1 - k, 3);
      current.current = from + (target - from) * e;
      setShown(k < 1 ? Math.round(current.current / 1000) * 1000 : target);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, reduce]);

  return shown;
}
