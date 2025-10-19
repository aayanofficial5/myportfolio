import { motion } from 'framer-motion';

import { projects } from '../data';
import ProjectCard from '../components/ProjectCard';
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
          Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
          <ProjectCard project={project} key={index}/>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
