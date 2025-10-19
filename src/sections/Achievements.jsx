import { motion } from "framer-motion";
import { achievements } from "../data";

const Achievements = () => {
  return (
    <section
      id="achievements"
      className="bg-accent dark:bg-accent min-h-screen w-full flex justify-center border-t dark:border-secondary/50 py-10 px-10 md:px-20 scroll-mt-10 md:scroll-mt-0 scroll-smooth"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl w-full flex flex-col items-center gap-12"
      >
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-4xl md:text-4xl font-extrabold text-primary dark:text-primary tracking-tight">
            Achievements
          </h2>
          <p className="text-lg md:text-lg text-primary dark:text-primary opacity-70 text-center max-w-2xl leading-relaxed">
            Explore some of my key milestones, certifications, and recognitions
            that reflect my commitment to continuous learning and excellence in
            technology.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 w-full">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.04,
                boxShadow: "1px 1px 3px 5px rgba(0,0,0,0.12)",
              }}
              className="flex flex-col items-center gap-3 py-8 px-6 bg-secondary/70 border border-background rounded-2xl shadow-lg flex-1 min-w-[230px] max-w-xs transition-all duration-200"
            >
              <div className="mb-2">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.logo?<img
                    src={item.logo}
                    alt="Postman Certification Badge"
                    className="w-40 h-40 md:w-50 md:h-50"
                  />:(<div className="w-37 h-37 md:w-50 md:h-50">{item.icon}</div>)}
                </a>
              </div>
              <div className="">
              <h4 className="text-lg text-center md:text-xl font-bold text-primary dark:text-primary mb-1">
                {item.title}
              </h4>
              <p className="text-sm md:text-base text-primary/80 text-center leading-relaxed">
                {item.description}
              </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Achievements;
