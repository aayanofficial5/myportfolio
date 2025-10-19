import { motion, useScroll, useTransform } from "framer-motion";
import { CTAButton } from "../components/CTAButton";
import profile from "../assets/images/profile.png";
import { IoMdDownload } from "react-icons/io";
import { portfolioInfo } from "../data";
import { FaLaptop } from "react-icons/fa";
import WordReveal from "../components/WordReveal";
import ResumePreviewModal from "../components/ResumePreviewModal";
import { useRef, useState } from "react";

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
  const sectionRef = useRef(null);
  const { scrollY } = useScroll();
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  
  // Parallax transforms
  const backgroundY = useTransform(scrollY, [0, 500], [0, 250]); // 0.5x speed
  const imageY = useTransform(scrollY, [0, 500], [0, 150]); // 0.3x speed

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-[100vh] flex flex-col-reverse md:flex-row md:items-center justify-evenly p-6 md:p-24 bg-background dark:bg-background relative overflow-hidden"
    >
      {/* Parallax Background Layer */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-purple-50 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/20 -z-10"
      />
      
      <div className="">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-8 md:max-w-[40vw]"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-primary dark:text-primary">
            <WordReveal text="Hi, I'm" />
            {" "}
            <span className="text-secondary">
              <WordReveal text={portfolioInfo.fullName} />
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xl text-primary dark:text-primary leading-relaxed"
          >
            {portfolioInfo.description}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            <CTAButton link="#projects" text="View Projects" icon={FaLaptop} />
            <CTAButton
              onClick={() => setIsResumeModalOpen(true)}
              icon={IoMdDownload}
              text="Download Resume"
            />
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        style={{ y: imageY }}
        className="flex justify-center"
      >
        <motion.img
          src={profile}
          alt="profile"
          className="rounded-full w-60 h-60 md:w-80 md:h-80 object-cover shadow-xl border-10 dark:border-accent"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        />
      </motion.div>

      {/* Resume Preview Modal */}
      <ResumePreviewModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        pdfUrl="/LatestResume.pdf"
      />
    </section>
  );
};

export default Hero;
