import { useEffect, useRef } from 'react';

// Llama a `onFrame` como máximo una vez por cuadro al hacer scroll o cambiar el tamaño de la ventana,
// y una vez al montar. Útil para animaciones que leen la posición del scroll.
export function useScrollFrame(onFrame) {
  const cb = useRef(onFrame);
  cb.current = onFrame;

  useEffect(() => {
    let ticking = false;
    const run = () => { ticking = false; cb.current(); };
    const request = () => { if (!ticking) { ticking = true; requestAnimationFrame(run); } };
    addEventListener('scroll', request, { passive: true });
    addEventListener('resize', request);
    run();
    return () => {
      removeEventListener('scroll', request);
      removeEventListener('resize', request);
    };
  }, []);
}
