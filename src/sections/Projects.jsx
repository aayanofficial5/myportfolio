import { motion } from 'framer-motion';

import { projects } from '../data';
import ProjectCard from '../components/ProjectCard';
import WordReveal from '../components/WordReveal';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-10 md:px-20 bg-accent dark:bg-accent border-t dark:border-secondary/50 min-h-screen scroll-mt-10 md:scroll-mt-0 scroll-smooth">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl md:text-4xl font-bold text-center mb-12 text-primary dark:text-primary">
          <WordReveal text="Projects" />
        </h2>

        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project, index) => (
          <ProjectCard project={project} key={index} variants={itemVariants} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;
