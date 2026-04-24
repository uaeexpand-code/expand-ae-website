import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hidden, setHidden] = useState(true);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Dot follows cursor instantly
  const dotX = useSpring(mouseX, { damping: 30, stiffness: 900, mass: 0.3 });
  const dotY = useSpring(mouseY, { damping: 30, stiffness: 900, mass: 0.3 });

  // Ring lags slightly behind
  const ringX = useSpring(mouseX, { damping: 28, stiffness: 180, mass: 0.8 });
  const ringY = useSpring(mouseY, { damping: 28, stiffness: 180, mass: 0.8 });

  useEffect(() => {
    // Only show on fine-pointer (mouse) devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (hidden) setHidden(false);
    };

    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    // Attach hover listeners via event delegation
    const onHoverIn = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("a, button, [role='button'], .cursor-pointer, input, textarea, select, label")) {
        setHovered(true);
      }
    };
    const onHoverOut = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("a, button, [role='button'], .cursor-pointer, input, textarea, select, label")) {
        setHovered(false);
      }
    };

    document.addEventListener("mouseover", onHoverIn);
    document.addEventListener("mouseout", onHoverOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onHoverIn);
      document.removeEventListener("mouseout", onHoverOut);
    };
  }, [hidden]);

  if (isTouch) return null;

  const ringSize = hovered ? 44 : clicking ? 20 : 32;
  const dotSize = hovered ? 4 : clicking ? 3 : 5;

  return (
    <>
      {/* Outer ring — lags behind */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: ringSize,
          height: ringSize,
          border: hovered
            ? "1.5px solid rgba(99,102,241,0.7)"
            : "1.5px solid rgba(255,255,255,0.25)",
          opacity: hidden ? 0 : 1,
          transition: "width 0.18s cubic-bezier(0.25,1,0.5,1), height 0.18s cubic-bezier(0.25,1,0.5,1), border-color 0.18s, opacity 0.15s",
        }}
      />

      {/* Inner dot — near-instant */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: dotSize,
          height: dotSize,
          background: hovered ? "#6366f1" : "rgba(255,255,255,0.95)",
          opacity: hidden ? 0 : 1,
          transition: "width 0.12s cubic-bezier(0.25,1,0.5,1), height 0.12s cubic-bezier(0.25,1,0.5,1), background 0.15s, opacity 0.15s",
        }}
      />
    </>
  );
}
