import { motion } from "framer-motion";

const WordReveal = ({ text, className = "" }) => {
  const words = text.split(" ");

  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.5,
      },
    }),
  };

  return (
    <span className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          custom={index}
          variants={wordVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

export default WordReveal;
