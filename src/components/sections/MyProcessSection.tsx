import React from 'react';
import { motion } from 'framer-motion';
import { Code, Settings, Rocket, Lightbulb, Zap } from 'lucide-react';

const processSteps = [
  {
    icon: <Lightbulb className="w-6 h-6 text-blue-400" />,
    title: 'Discover',
    description:
      'Every successful project begins with understanding — your brand, audience, goals, and what makes your business unique. I research competitors, gather inspiration, and define the digital strategy that shapes the entire build.'
  },
  {
    icon: <Settings className="w-6 h-6 text-blue-400" />,
    title: 'Design',
    description:
      'Using Figma and Tailwind prototypes, I translate strategy into visuals that balance creativity with clarity. The goal: designs that not only look stunning, but also guide users naturally toward conversion or engagement.'
  },
  {
    icon: <Code className="w-6 h-6 text-blue-400" />,
    title: 'Develop',
    description:
      'Once design is approved, I hand-craft the build in React + TypeScript. Clean, modular components ensure maintainability and performance. Every animation, hover, and scroll effect is intentional — optimized for user flow and speed.'
  },
  {
    icon: <Rocket className="w-6 h-6 text-blue-400" />,
    title: 'Deploy & Refine',
    description:
      'After testing on multiple devices, I deploy to Netlify or Vercel with CDN caching, minified bundles, and Supabase-backed APIs. Post-launch, I track metrics (LCP, CLS, conversions) and continuously refine for performance and UX.'
  }
];

const techStack = [
  { name: 'Frontend', tools: 'React, TypeScript, Vite' },
  { name: 'Styling', tools: 'Tailwind CSS, Framer Motion' },
  { name: 'Backend & Database', tools: 'Supabase (auth, storage, functions)' },
  { name: 'Hosting & CI/CD', tools: 'Netlify with edge functions and analytics' },
  { name: 'Design & Planning', tools: 'Figma, Notion, Miro, GitHub Projects' },
  { name: 'Optimization', tools: 'PageSpeed Insights, Lighthouse, Perfmatters' }
];

const MyProcessSection: React.FC = () => {
  return (
    <section id="my-process" className="relative py-24 bg-gradient-to-b from-slate-900 to-slate-950 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('/stars-bg.svg')] bg-cover bg-center" />

      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
          My Process
        </h2>
        <p className="text-center text-slate-300 max-w-3xl mx-auto mb-12">
          Every project I take on follows a structured, creative flow that bridges design intuition and technical precision.
          From discovery to deployment, each stage builds on the last — ensuring results that are strategic, fast, and visually engaging.
        </p>

        {/* Process Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-20">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition-all"
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center gap-3 mb-3">
                {step.icon}
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
              </div>
              <p className="text-slate-400 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Behind the Build */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Behind the Build
          </h2>
          <p className="text-center text-slate-300 max-w-3xl mx-auto mb-12">
            Daccurso Digital Marketing was built with a modern, performance-first stack — combining the creativity of design
            tools with the precision of scalable frontend development. Every element is modular, animated, and optimized for speed.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {techStack.map((tech, index) => (
              <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 hover:border-blue-500 transition">
                <h4 className="text-lg font-semibold text-white mb-1">{tech.name}</h4>
                <p className="text-slate-400">{tech.tools}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-400 mt-12 italic">
            “My process blends creativity, precision, and performance — ensuring every build isn’t just visually stunning, but
            engineered to perform.”
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default MyProcessSection;