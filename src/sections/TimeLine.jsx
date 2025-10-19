import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';

import { timeline } from '../data';
import TimelineItem from './../components/TimelineItem';

const Timeline = () => {
  return (
    <section id="timeline" className="py-20 px-10 md:px-20 bg-background dark:bg-background border-t dark:border-secondary/50 min-h-screen scroll-mt-10 md:scroll-mt-0 scroll-smooth">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-4xl md:text-4xl font-bold text-center mb-12 text-primary dark:text-primary">
          Timeline
        </h2>

        <div className="relative border-l-3 border-secondary dark:border-secondary/60 w-full">
          {timeline.map((item, index) => (
            <TimelineItem item={item} key={index}/>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Timeline;
