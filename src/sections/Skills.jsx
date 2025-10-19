import { motion } from 'framer-motion';
import LanguageIcon from '../components/LanguageIcon';
import { skills } from '../data';
import SkillCard from '../components/SkillCard';
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

    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-8 max-w-[90vw] relative pt-8">

      {skills.map((language, index) => (
        <SkillCard language={language} key={index} />
      ))}
    </div>
  </motion.div>
</section>

  );
};

export default Skills;