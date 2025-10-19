import React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

const TimelineItem = ({ item, variants }) => {
  return (
    <motion.div 
      variants={variants}
      className="mb-12 ml-6 flex items-center group"
    >
      <span className="absolute -left-5 bg-secondary rounded-full pt-1.5 px-1.5">
        {item.type === "work" ? (
          <button title="Work">
            <Briefcase className="text-primary ml-0.5 mt-0.5 w-5.5 h-5.5" />
          </button>
        ) : (
          <button title="Education">
            <GraduationCap className="text-primary w-6 h-6" />
          </button>
        )}
      </span>
      <div className="bg-accent dark:bg-accent p-6 rounded-xl shadow-md w-full hover:shadow-lg transition-all duration-200">
        <h3 className="font-semibold text-xl text-primary dark:text-primary opacity-90 mb-1">
          {item.title}
        </h3>
        <p className="text-sm text-primary dark:text-primary opacity-60 mb-3">
          {item.date}
        </p>
        <p className="text-base text-gray-700 dark:text-ternary opacity-70 leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};

export default TimelineItem;
