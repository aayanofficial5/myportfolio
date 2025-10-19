import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

export const CTAButton = ({ text, link, icon: Icon, download = false, onClick }) => {
  const ref = useRef(null);
  const [ripples, setRipples] = useState([]);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) / 4;
    const offsetY = (e.clientY - centerY) / 4;
    x.set(Math.max(-8, Math.min(8, offsetX)));
    y.set(Math.max(-8, Math.min(8, offsetY)));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const rippleX = e.clientX - rect.left;
    const rippleY = e.clientY - rect.top;
    const newRipple = { x: rippleX, y: rippleY, id: Date.now() };
    setRipples([...ripples, newRipple]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
    
    // Call onClick handler if provided
    if (onClick) {
      onClick(e);
    }
  };

  const Component = onClick ? motion.button : motion.a;
  const componentProps = onClick 
    ? { type: "button" } 
    : { href: link, download: download };

  return (
    <Component
      ref={ref}
      {...componentProps}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center gap-3 border-2 dark:border-accent border-secondary text-primary dark:text-primary px-6 py-3 rounded-lg font-medium shadow-md transition-all w-fit hover:bg-secondary hover:border-secondary hover:text-white ease-in relative overflow-hidden"
    >
      {text}
      {Icon && <Icon size={20} />}
      
      {/* Ripple Effect */}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full bg-white/50 pointer-events-none"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
            }}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 20, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </Component>
  );
};
