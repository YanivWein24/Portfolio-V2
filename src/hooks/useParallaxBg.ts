import { useState, useEffect, useRef } from "react";
import { useSpring } from "@react-spring/web";

interface ParallaxBgOptions {
  speed1?: number;
  speed2?: number;
}

export default function useParallaxBg({
  speed1 = 0.25,
  speed2 = -0.18
}: ParallaxBgOptions = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [relativeY, setRelativeY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      setRelativeY(center);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const blob1Spring = useSpring({
    transform: `translateY(${relativeY * speed1}px)`,
    config: { mass: 1, tension: 80, friction: 26 }
  });

  const blob2Spring = useSpring({
    transform: `translateY(${relativeY * speed2}px)`,
    config: { mass: 1, tension: 60, friction: 22 }
  });

  return { sectionRef, blob1Spring, blob2Spring };
}
