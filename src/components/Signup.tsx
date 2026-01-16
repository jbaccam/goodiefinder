import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export function Signup() {

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="mt-8 mb-10"
    >
      <div className="bg-warm-white rounded-3xl p-6 sm:p-8 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-lavender">
              <Mail className="w-5 h-5" />
              <span className="text-sm uppercase tracking-widest text-lavender-dark">Daily updates</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-text-primary mt-2">
              Get Iowa dev jobs in your inbox
            </h2>
            <p className="text-text-secondary mt-2 max-w-lg">
              A short daily digest of the newest Iowa tech roles. Unsubscribe anytime with one click.
            </p>
          </div>
          <div className="hidden sm:flex items-center text-2xl text-lavender-light">~(^.^)~</div>
        </div>

        <div className="rounded-2xl bg-cream border border-cream-dark p-4 sm:p-5">
          <form
            action="https://buttondown.com/api/emails/embed-subscribe/eggarowls"
            method="post"
            className="flex flex-col sm:flex-row sm:items-center gap-3"
          >
            <label htmlFor="bd-email" className="text-sm font-medium text-text-secondary">
              Enter your email
            </label>
            <input
              type="email"
              name="email"
              id="bd-email"
              placeholder="you@domain.com"
              required
              className="flex-1 bg-warm-white border-2 border-cream-dark rounded-full px-4 py-3 text-text-primary
                         placeholder:text-text-muted focus:outline-none focus:border-lavender-light"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-lavender text-cream rounded-full font-semibold shadow-soft
                         hover:bg-lavender-dark transition-colors"
            >
              Subscribe
            </button>
            <input type="hidden" name="tag" value="iowa-dev-jobs" />
          </form>
          <p className="text-xs text-text-muted mt-3">
            Powered by <a href="https://buttondown.com/refer/eggarowls" target="_blank" rel="noreferrer" className="text-lavender-dark">Buttondown</a>.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
