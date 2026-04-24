import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  strength?: number;
}

export default function MagneticButton({
  children,
  className = "",
  style,
  href,
  target,
  rel,
  onClick,
  strength = 0.35,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    });
  };

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  const Tag = href ? "a" : "button";

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <motion.div
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.5 }}
      >
        <Tag
          href={href}
          target={target}
          rel={rel}
          onClick={onClick}
          className={className}
          style={style}
        >
          {children}
        </Tag>
      </motion.div>
    </div>
  );
}
