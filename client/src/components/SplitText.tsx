import { motion } from "framer-motion";

interface Props {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export default function SplitText({ text, className = "", delay = 0, stagger = 0.025, once = true }: Props) {
  const words = text.split(" ");

  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once }}
            transition={{
              duration: 0.55,
              delay: delay + wi * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
