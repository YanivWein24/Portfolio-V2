import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

export default function useSectionParallax(
  bgRange: [string, string] = ["-35%", "35%"]
) {
  const ref = useRef<HTMLElement>(null);

  // Background decoration parallax — full visibility range
  const { scrollYProgress: bgProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const bgY = useTransform(bgProgress, [0, 1], bgRange);

  // Content parallax — slows content as section exits upward (same as Hero)
  const { scrollYProgress: exitProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const contentY = useTransform(exitProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(exitProgress, [0.75, 1], [1, 0]);

  return { ref, bgY, contentY, contentOpacity };
}
