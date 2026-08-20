import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

function SolutionCTA({ title, color = '#ea580c' }) {
  return (
    <section className="py-20 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <motion.div 
          className="relative overflow-hidden rounded-3xl p-8 sm:p-12 md:p-16 text-center border bg-gradient-to-b from-slate-50 to-white shadow-xl shadow-slate-200/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ borderColor: `${color}30` }}
        >
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-zinc-950 leading-tight mb-4">
              Ready to automate your {title.toLowerCase()} workflows?
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mb-8 font-normal">
              Start building in minutes. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <motion.a 
                href="https://app.workflowmitra.com/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-white font-bold text-base shadow-lg transition-all"
                style={{ backgroundColor: color }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Get Started Free</span>
                <ArrowRight size={18} />
              </motion.a>
              <motion.a 
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white text-zinc-900 font-bold text-base border border-slate-200 hover:bg-slate-50 transition-all shadow-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Book a Demo</span>
              </motion.a>
            </div>
          </div>
          <div 
            className="absolute inset-0 pointer-events-none opacity-40 blur-3xl rounded-full -top-1/2" 
            style={{ backgroundColor: `${color}15` }} 
          />
        </motion.div>
      </div>
    </section>
  )
}

export default SolutionCTA
