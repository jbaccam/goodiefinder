import { motion } from 'framer-motion';
import { Cat, MapPin } from 'lucide-react';

export function Header() {
  return (
    <header className="py-8 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-4"
      >
        {/* Logo with cute cat */}
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="bg-lavender p-3 rounded-2xl shadow-soft"
          >
            <Cat className="w-8 h-8 text-cream" />
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold text-text-primary">
            Iowa Dev Jobs
          </h1>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-text-secondary text-lg flex items-center gap-2"
        >
          <MapPin className="w-4 h-4 text-dusty-pink" />
          <span>Tech jobs in Iowa</span>
        </motion.p>

        {/* Decorative paw prints */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="flex gap-2 text-lavender-light text-xs"
        >
          <span>^..^</span>
        </motion.div>
      </motion.div>
    </header>
  );
}
