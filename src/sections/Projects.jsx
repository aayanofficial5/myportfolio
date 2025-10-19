import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

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
  // Extract all unique tags from projects
  const allTags = [...new Set(projects.flatMap(p => p.tags))];
  const [selectedFilters, setSelectedFilters] = useState(['All']);

  // Filter projects based on selected filters
  const filteredProjects = selectedFilters.includes('All') 
    ? projects 
    : projects.filter(p => p.tags.some(tag => selectedFilters.includes(tag)));

  const handleFilterClick = (tag) => {
    if (tag === 'All') {
      setSelectedFilters(['All']);
    } else {
      if (selectedFilters.includes(tag)) {
        // Remove filter if already selected
        const newFilters = selectedFilters.filter(f => f !== tag);
        setSelectedFilters(newFilters.length === 0 ? ['All'] : newFilters);
      } else {
        // Add filter and remove 'All'
        setSelectedFilters([...selectedFilters.filter(f => f !== 'All'), tag]);
      }
    }
  };

  return (
    <section id="projects" className="py-20 px-10 md:px-20 bg-accent dark:bg-accent border-t dark:border-secondary/50 min-h-screen scroll-mt-10 md:scroll-mt-0 scroll-smooth">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl md:text-4xl font-bold text-center mb-8 text-primary dark:text-primary">
          <WordReveal text="Projects" />
        </h2>

        {/* Filter Chips */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 mb-10 justify-center"
        >
          {/* All Filter */}
          <button
            onClick={() => handleFilterClick('All')}
            className={`px-4 py-2 rounded-full border-2 cursor-pointer transition-all duration-200 hover:scale-105 ${
              selectedFilters.includes('All')
                ? 'bg-secondary text-white border-secondary shadow-md'
                : 'bg-transparent text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-secondary'
            }`}
          >
            All ({projects.length})
          </button>

          {/* Tech Filter Chips */}
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleFilterClick(tag)}
              className={`px-4 py-2 rounded-full border-2 cursor-pointer transition-all duration-200 hover:scale-105 capitalize ${
                selectedFilters.includes(tag)
                  ? 'bg-secondary text-white border-secondary shadow-md'
                  : 'bg-transparent text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-secondary'
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid with AnimatePresence */}
        {filteredProjects.length > 0 ? (
          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            key={selectedFilters.join(',')}
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <ProjectCard 
                  project={project} 
                  key={project.title} 
                  variants={itemVariants} 
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          // Empty State
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="text-center py-16"
          >
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              No projects found with selected technologies
            </p>
            <button
              onClick={() => setSelectedFilters(['All'])}
              className="px-6 py-3 rounded-lg border-2 border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-200 font-medium"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default Projects;
