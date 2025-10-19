import { ArrowUp } from 'lucide-react';
import { portfolioInfo } from '../data';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-background dark:bg-background text-center py-6 border-t-2 dark:border-secondary/50 relative z-0">
      <p className="text-base text-primary dark:text-primary">
        © {new Date().getFullYear()} {portfolioInfo.fullName}. All rights reserved.
      </p>

      <button
        onClick={scrollToTop}
        className="absolute right-4 md:right-8 bottom-4 hover:bg-accent hover:dark:bg-accent text-white p-3 rounded-full shadow-lg hover:scale-105 bg-secondary dark:bg-secondary transition-transform border border-secondary/30 dark:border-secondary/30
        cursor-pointer"
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;
