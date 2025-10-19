import { motion } from 'framer-motion';
import LanguageIcon from '../components/LanguageIcon';
import { skills } from '../data';
import SkillCard from '../components/SkillCard';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Skills = () => {
  return (
    <section
  id="skills"
  className="flex flex-col items-center bg-background dark:bg-background py-20 px-10 md:px-20 w-full border-t dark:border-secondary/50 min-h-screen scroll-mt-10 md:scroll-mt-0 scroll-smooth"
>
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="max-w-6xl flex flex-col items-center"
  >
    <h2 className="text-4xl md:text-4xl font-bold text-center text-primary dark:text-primary mb-8">
      Skills
    </h2>

    <motion.div 
      className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-8 max-w-[90vw] relative pt-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      {skills.map((language, index) => (
        <SkillCard language={language} key={index} variants={itemVariants} />
      ))}
    </motion.div>
  </motion.div>
</section>

  );
};

export default Skills;