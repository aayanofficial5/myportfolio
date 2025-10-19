import { motion } from 'framer-motion';

export const CTAButton = ({ text, link, icon: Icon, download = false }) => {
  return (
    <motion.a
      href={link}
      download={download}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center gap-3 border-2 dark:border-accent border-secondary text-primary dark:text-primary px-6 py-3 rounded-lg font-medium shadow-md transition-all w-fit hover:bg-secondary hover:border-secondary hover:text-white ease-in"
    >
      {text}
      {Icon && <Icon size={20} />}
    </motion.a>
  );
};
