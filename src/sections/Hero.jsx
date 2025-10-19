import { motion } from "framer-motion";
import { CTAButton } from "../components/CTAButton";
import profile from "../assets/images/profile.png";
import { IoMdDownload } from "react-icons/io";
import { portfolioInfo } from "../data";
import { FaLaptop } from "react-icons/fa";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const fadedItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 0.8, y: 0 },
};

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-[100vh] flex flex-col-reverse md:flex-row md:items-center justify-evenly p-6 md:p-20 bg-background dark:bg-background"
    >
      <div className="">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6 md:max-w-[40vw]"
        >
          <motion.h1
            variants={item}
            className="text-5xl md:text-6xl font-bold text-primary dark:text-primary"
          >
            Hi, I'm{" "}
            <span className="text-secondary">{portfolioInfo.fullName}</span>
          </motion.h1>
          <motion.p
            variants={fadedItem}
            className="text-xl text-primary dark:text-primary leading-relaxed"
          >
            {portfolioInfo.description}
          </motion.p>

          <motion.div variants={item} className="flex flex-col gap-3">
            <CTAButton link="#projects" text="View Projects" icon={FaLaptop} />
            <CTAButton
              link="/LatestResume.pdf"
              download={true}
              icon={IoMdDownload}
              text="Download Resume"
            />
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        variants={item}
        initial="hidden"
        animate="show"
        className="flex justify-center"
      >
        <motion.img
          src={profile}
          alt="profile"
          className="rounded-full w-55 h-55 md:w-72 md:h-72 object-cover shadow-md border-10 dark:border-accent"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
