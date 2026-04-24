import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
}

export default function TiltCard({ children, className = "", maxTilt = 12, glare = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (py - 0.5) * -maxTilt,
      y: (px - 0.5) * maxTilt,
    });
    setGlarePos({ x: px * 100, y: py * 100 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: hovered ? 1.02 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.5 }}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      className={`relative ${className}`}
    >
      {children}
      {/* Glare overlay */}
      {glare && hovered && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
            zIndex: 10,
          }}
        />
      )}
    </motion.div>
  );
}
