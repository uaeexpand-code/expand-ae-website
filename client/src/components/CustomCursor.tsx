import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);

  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  const trailConfig = { damping: 35, stiffness: 200, mass: 1 };
  const trailX = useSpring(cursorX, trailConfig);
  const trailY = useSpring(cursorY, trailConfig);

  useEffect(() => {
    // Only show on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onEnterLink = () => setHovered(true);
    const onLeaveLink = () => setHovered(false);
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    const links = document.querySelectorAll("a, button, [role='button'], .cursor-pointer");
    links.forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      {/* Trail ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-white/20"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovered ? 48 : 32,
          height: hovered ? 48 : 32,
          borderColor: hovered ? "rgba(193,53,132,0.6)" : "rgba(255,255,255,0.2)",
          transition: "width 0.2s, height 0.2s, border-color 0.2s",
          opacity: hidden ? 0 : 1,
        }}
      />
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovered ? 6 : 5,
          height: hovered ? 6 : 5,
          background: hovered
            ? "linear-gradient(135deg, #833ab4, #f77737)"
            : "rgba(255,255,255,0.9)",
          transition: "width 0.15s, height 0.15s",
          opacity: hidden ? 0 : 1,
        }}
      />
    </>
  );
}
