import { motion } from "framer-motion";

export default function HeroParagraph({ text, delay = 0, className = "" }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`text-lg md:text-xl text-muted-foreground leading-relaxed ${className}`.trim()}
    >
      {text}
    </motion.p>
  );
}
