import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Code, Settings, Rocket } from 'lucide-react';

const wordpressPath = [
  {
    title: 'Design',
    description:
      'Design directly in WordPress or Figma using pre-built components and custom CSS for pixel-perfect responsiveness. Optimized for Elementor performance and SEO.',
    icon: <Settings className="w-5 h-5 text-blue-400" />
  },
  {
    title: 'Develop',
    description:
      'Integrate dynamic content, schema, caching, and custom PHP functions. Focus on speed, structure, and reusable layouts across site sections.',
    icon: <Code className="w-5 h-5 text-blue-400" />
  },
  {
    title: 'Deploy & Refine',
    description:
      'Deploy via WP Engine or Namecheap with CDN caching and security hardening. Continuous refinement through WP Rocket, Perfmatters, and Lighthouse audits.',
    icon: <Rocket className="w-5 h-5 text-blue-400" />
  }
];

const customPath = [
  {
    title: 'Design',
    description:
      'Create modern, motion-rich interfaces in Figma and Tailwind. Every visual is guided by hierarchy, usability, and performance.',
    icon: <Settings className="w-5 h-5 text-blue-400" />
  },
  {
    title: 'Develop',
    description:
      'Build scalable frontends with React, TypeScript, and Supabase. Code is modular, efficient, and optimized for Core Web Vitals.',
    icon: <Code className="w-5 h-5 text-blue-400" />
  },
  {
    title: 'Deploy & Refine',
    description:
      'Deploy through Netlify with CI/CD, edge functions, and bundle analysis. Optimize continuously for load time, accessibility, and UX polish.',
    icon: <Rocket className="w-5 h-5 text-blue-400" />
  }
];

const MyProcessSection: React.FC = () => {
  return (
    <section id="my-process" className="relative py-24 text-white">
      <div className="absolute inset-0 opacity-10 bg-[url('/stars-bg.svg')] bg-cover bg-center" />

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center mb-4 text-white">
          My Process
        </h2>
        <p className="text-center text-slate-300 max-w-3xl mx-auto mb-16">
          Every collaboration begins the same way — discovering the story behind your brand.
          From there, the process branches into one of two specialized build paths: WordPress or Custom.
          Each follows a full design → develop → deploy workflow, built for clarity, speed, and scalability.
        </p>

        {/* Discover Node */}
        <motion.div
          className="relative flex flex-col items-center mb-20"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6 w-full sm:w-2/3 text-center">
            <Lightbulb className="w-6 h-6 text-blue-400 mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2 text-white">Discover</h3>
            <p className="text-slate-400">
              Every build starts with research and strategy — defining your goals, audience,
              and visual direction before choosing the right platform.
            </p>
          </div>

          {/* Split line */}
          <div className="h-12 w-px bg-blue-500/30 mt-4" />
          <div className="relative flex w-full justify-center">
            <div className="absolute left-0 right-0 top-1/2 h-px bg-blue-500/30" />
          </div>
        </motion.div>

        {/* Split Paths */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 relative">
          {/* WordPress Path */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6 relative"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-700 text-xs uppercase tracking-wide px-3 py-1 rounded-full">
              WordPress Path
            </div>
            {wordpressPath.map((step, i) => (
              <div key={i} className="mt-8">
                <div className="flex items-center gap-3 mb-2">
                  {step.icon}
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                </div>
                <p className="text-slate-400 leading-relaxed">{step.description}</p>
                {i < wordpressPath.length - 1 && (
                  <div className="h-6 w-px bg-blue-500/20 mx-auto my-4" />
                )}
              </div>
            ))}
          </motion.div>

          {/* Custom Path */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6 relative"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-700 text-xs uppercase tracking-wide px-3 py-1 rounded-full">
              Custom Path
            </div>
            {customPath.map((step, i) => (
              <div key={i} className="mt-8">
                <div className="flex items-center gap-3 mb-2">
                  {step.icon}
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                </div>
                <p className="text-slate-400 leading-relaxed">{step.description}</p>
                {i < customPath.length - 1 && (
                  <div className="h-6 w-px bg-blue-500/20 mx-auto my-4" />
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Behind the Build */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <h2 className="text-4xl font-bold text-center mb-4 text-white">
            Behind the Build
          </h2>
          <p className="text-center text-slate-300 max-w-3xl mx-auto mb-14">
            Both paths rely on different tools, but share the same principles — efficiency, structure, and performance.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">WordPress Stack</h3>
              <ul className="space-y-2 text-slate-400">
                <li>• Elementor, Hello Theme</li>
                <li>• Custom PHP Functions & Dynamic Tags</li>
                <li>• Schema Pro, Yoast, WP Rocket</li>
                <li>• WP Engine, Namecheap, Cloudflare CDN</li>
              </ul>
            </div>

            <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Custom Stack</h3>
              <ul className="space-y-2 text-slate-400">
                <li>• React, TypeScript, Vite, Supabase</li>
                <li>• Tailwind CSS, Framer Motion</li>
                <li>• Netlify Edge Functions, n8n</li>
                <li>• GitHub CI/CD, Lighthouse Optimization</li>
              </ul>
            </div>
          </div>

          <p className="text-center text-slate-400 mt-12 italic">
            “Two paths, one goal — to build digital experiences that are fast, functional, and future-ready.”
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default MyProcessSection;