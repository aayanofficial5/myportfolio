import { motion } from "framer-motion";
import LanguageIcon from "./LanguageIcon";

const SkillCard = ({ language }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center gap-3 p-4 rounded-xl text-center cursor-pointer group backdrop-blur-lg bg-white/70 dark:bg-gray-800/50 border border-white/20 dark:border-white/10 shadow-lg"
    >
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg p-2">
        <LanguageIcon language={language} />
      </div>
      <p className="text-base font-medium text-gray-900 dark:text-gray-100">{language.name}</p>

      {/* Tooltip */}
      <div
        className="group-hover:block hidden absolute top-full 
              dark:bg-accent dark:text-primary bg-background/95 backdrop-blur-lg p-3 rounded-lg shadow-lg border border-white/20 dark:border-white/10 w-48 text-sm 
                opacity-0 
                group-hover:opacity-100 transition-opacity duration-200"
      >
        <p>{language.desc}</p>
      </div>
    </motion.div>
  );
};

export default SkillCard;
