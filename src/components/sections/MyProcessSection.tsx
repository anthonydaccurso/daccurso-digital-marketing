import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Code, Settings, Rocket, Globe, Layers } from 'lucide-react';

const wordpressPath = [
  {
    title: 'Design',
    description:
      'I design directly in WordPress or Figma, using pre-built components and custom CSS to achieve pixel-perfect responsiveness. Every layout is optimized for Elementor performance and SEO hierarchy.',
    icon: <Settings className="w-5 h-5 text-blue-400" />
  },
  {
    title: 'Develop',
    description:
      'I integrate dynamic content, schema, caching, and custom PHP functions. The focus is on speed, structure, and modular reusability across pages and locations.',
    icon: <Code className="w-5 h-5 text-blue-400" />
  },
  {
    title: 'Deploy & Refine',
    description:
      'Sites are deployed via WP Engine or Namecheap, with ongoing refinement through WP Rocket, Perfmatters, and structured-data validation to ensure top-tier performance and SEO compliance.',
    icon: <Rocket className="w-5 h-5 text-blue-400" />
  }
];

const customPath = [
  {
    title: 'Design',
    description:
      'I create Figma prototypes and translate them into Tailwind + Framer Motion interfaces. Each component is purpose-built for clarity, speed, and storytelling.',
    icon: <Settings className="w-5 h-5 text-purple-400" />
  },
  {
    title: 'Develop',
    description:
      'Using React, TypeScript, and Supabase, I build scalable front-ends and secure, serverless APIs. Code is modular, documented, and optimized for Lighthouse and Core Web Vitals.',
    icon: <Code className="w-5 h-5 text-purple-400" />
  },
  {
    title: 'Deploy & Refine',
    description:
      'Final builds ship via Netlify or Vercel with CI/CD, edge functions, and analytics. Continuous improvement focuses on bundle reduction, lazy-loading, and motion balance.',
    icon: <Rocket className="w-5 h-5 text-purple-400" />
  }
];

const MyProcessSection: React.FC = () => {
  return (
    <section id="my-process" className="relative py-24 bg-slate-950 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[url('/stars-bg.svg')] bg-cover bg-center" />

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
          My Process
        </h2>
        <p className="text-center text-slate-300 max-w-3xl mx-auto mb-16">
          Every collaboration begins the same way — by discovering the story behind your brand.  
          From there, I branch into one of two specialized build paths: WordPress or Custom.  
          Each has its own design-development-deployment cycle, built for speed, quality, and scalability.
        </p>

        {/* Discover Node */}
        <motion.div
          className="relative flex flex-col items-center mb-20"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-slate-800/50 border border-blue-500 rounded-xl p-6 w-full sm:w-2/3 text-center">
            <Lightbulb className="w-6 h-6 text-blue-400 mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">Discover</h3>
            <p className="text-slate-400">
              Every build starts with research and strategy — defining your goals, audience, and visual direction before choosing the right platform.
            </p>
          </div>

          {/* Split Lines */}
          <div className="h-12 w-px bg-gradient-to-b from-blue-500 to-transparent mt-4" />
          <div className="relative flex w-full justify-center">
            <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-blue-500 to-purple-500 opacity-40" />
          </div>
        </motion.div>

        {/* Split Paths */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 relative">
          {/* WordPress Path */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6 relative"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-xs uppercase tracking-wide px-3 py-1 rounded-full">
              WordPress Path
            </div>
            {wordpressPath.map((step, i) => (
              <div key={i} className="mt-8">
                <div className="flex items-center gap-3 mb-2">
                  {step.icon}
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                </div>
                <p className="text-slate-400 leading-relaxed">{step.description}</p>
                {i < wordpressPath.length - 1 && (
                  <div className="h-6 w-px bg-blue-500/30 mx-auto my-4" />
                )}
              </div>
            ))}
          </motion.div>

          {/* Custom Path */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6 relative"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-xs uppercase tracking-wide px-3 py-1 rounded-full">
              Custom Path
            </div>
            {customPath.map((step, i) => (
              <div key={i} className="mt-8">
                <div className="flex items-center gap-3 mb-2">
                  {step.icon}
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                </div>
                <p className="text-slate-400 leading-relaxed">{step.description}</p>
                {i < customPath.length - 1 && (
                  <div className="h-6 w-px bg-purple-500/30 mx-auto my-4" />
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
          <h2 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Behind the Build
          </h2>
          <p className="text-center text-slate-300 max-w-3xl mx-auto mb-14">
            Both paths use different toolchains, but the same foundation — structure, performance, and adaptability.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">WordPress Stack</h3>
              <ul className="space-y-2 text-slate-400">
                <li>• Elementor, Hello Theme, WP Bakery</li>
                <li>• Custom PHP Functions & Dynamic Tags</li>
                <li>• Schema Pro, Yoast SEO, WP Rocket, Perfmatters</li>
                <li>• WP Engine, Namecheap, Cloudflare CDN</li>
              </ul>
            </div>

            <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-purple-400">Custom Stack</h3>
              <ul className="space-y-2 text-slate-400">
                <li>• React, TypeScript, Vite, Supabase</li>
                <li>• Tailwind CSS, Framer Motion, Three.js</li>
                <li>• Netlify Edge Functions, n8n, Firecrawl</li>
                <li>• GitHub CI/CD, Lighthouse Optimization</li>
              </ul>
            </div>
          </div>

          <p className="text-center text-slate-400 mt-12 italic">
            “Two paths, one philosophy — build smart, perform faster, and design with purpose.”
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default MyProcessSection;