import { motion } from "framer-motion";

interface Props {
  color1?: string;
  color2?: string;
  size?: number;
  className?: string;
  duration?: number;
}

const PATHS = [
  "M60,0 C80,10 100,30 90,60 C80,90 50,100 30,90 C10,80 0,50 10,30 C20,10 40,-10 60,0Z",
  "M55,5 C78,0 105,25 95,55 C85,85 55,105 28,95 C0,85 -5,55 8,28 C21,0 32,10 55,5Z",
  "M65,-5 C90,5 110,35 98,65 C86,95 55,108 25,98 C-5,88 -8,58 5,30 C18,2 40,-15 65,-5Z",
  "M50,2 C75,8 102,28 92,58 C82,88 52,102 22,92 C-8,82 -2,52 10,25 C22,-2 25,-4 50,2Z",
];

export default function MorphingBlob({
  color1 = "#833ab4",
  color2 = "#f77737",
  size = 600,
  className = "",
  duration = 8,
}: Props) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{ duration: duration * 5, repeat: Infinity, ease: "linear" }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <radialGradient id={`blob-grad-${color1.replace("#", "")}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color1} stopOpacity="0.6" />
            <stop offset="100%" stopColor={color2} stopOpacity="0.1" />
          </radialGradient>
        </defs>
        <motion.path
          fill={`url(#blob-grad-${color1.replace("#", "")})`}
          animate={{ d: PATHS }}
          transition={{
            duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      </svg>
    </motion.div>
  );
}
