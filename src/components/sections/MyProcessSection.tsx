import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Code, Settings, Rocket, Search, Layout, ClipboardList, Database, Gauge } from 'lucide-react';

const wordpressPath = [
  {
    title: 'Design',
    description:
      'Design directly within WordPress or Figma, using Elementor and custom CSS for responsive layouts. Each section is structured for performance and SEO readability.',
    icon: <Layout className="w-5 h-5 text-blue-400" />
  },
  {
    title: 'Develop',
    description:
      'Implement dynamic templates, schema markup, and lightweight PHP functions. Every feature focuses on maintainability and loading speed.',
    icon: <Code className="w-5 h-5 text-blue-400" />
  },
  {
    title: 'Deploy & Refine',
    description:
      'Launch through WP Engine or Namecheap with Cloudflare CDN. Tune caching, optimize media, and validate structured data post-launch.',
    icon: <Rocket className="w-5 h-5 text-blue-400" />
  }
];

const customPath = [
  {
    title: 'Design',
    description:
      'Create detailed wireframes and interactive prototypes in Figma before translating them to Tailwind + Framer Motion components.',
    icon: <Layout className="w-5 h-5 text-blue-400" />
  },
  {
    title: 'Develop',
    description:
      'Build modular React + TypeScript applications with Supabase backends. Focus on scalability, clean architecture, and accessibility.',
    icon: <Code className="w-5 h-5 text-blue-400" />
  },
  {
    title: 'Deploy & Refine',
    description:
      'Deploy on Netlify or Vercel using edge functions, automated builds, and continuous integration. Analyze metrics, refine UX, and evolve features.',
    icon: <Rocket className="w-5 h-5 text-blue-400" />
  }
];

const MyProcessSection: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1a2f5c]/50 rounded-2xl p-6 sm:p-8 md:p-12 w-full mx-auto text-white"
    >
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent mb-8 text-center"
      >
        My Process
      </motion.h2>

      <p className="text-center text-gray-300 max-w-3xl mx-auto mb-12">
        Every collaboration begins with discovery — understanding your goals, market, and brand identity.
        From there, projects branch into two specialized paths: <span className="text-blue-300 font-semibold">WordPress</span> or <span className="text-blue-300 font-semibold">Custom Development</span>.
        Each follows a refined design → develop → deploy cycle focused on clarity, performance, and longevity.
      </p>

      {/* Discover Expanded */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="bg-[#1a2f5c] border border-slate-700 rounded-xl p-6 mb-16 text-center shadow-lg"
      >
        <div className="flex flex-col items-center">
          <Lightbulb className="w-8 h-8 text-blue-400 mb-3" />
          <h3 className="text-2xl font-semibold mb-2">Discover</h3>
          <p className="text-gray-300 max-w-2xl">
            Discovery is about precision — identifying your audience, refining goals, and defining a clear creative direction.
            I dive into market research, UX trends, and competitor analysis before any design work begins.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          <div className="bg-[#1a2f5c]/60 border border-slate-700 rounded-lg p-4">
            <Search className="w-5 h-5 text-blue-400 mb-2" />
            <h4 className="font-semibold text-blue-300 mb-1">Research</h4>
            <p className="text-gray-300 text-sm">
              Analyze competitors, trends, and audiences to uncover opportunities and define benchmarks.
            </p>
          </div>
          <div className="bg-[#1a2f5c]/60 border border-slate-700 rounded-lg p-4">
            <ClipboardList className="w-5 h-5 text-blue-400 mb-2" />
            <h4 className="font-semibold text-blue-300 mb-1">Strategy</h4>
            <p className="text-gray-300 text-sm">
              Map out brand tone, structure, and user pathways aligned with business objectives.
            </p>
          </div>
          <div className="bg-[#1a2f5c]/60 border border-slate-700 rounded-lg p-4">
            <Settings className="w-5 h-5 text-blue-400 mb-2" />
            <h4 className="font-semibold text-blue-300 mb-1">Planning</h4>
            <p className="text-gray-300 text-sm">
              Define deliverables, milestones, and technical stack for a seamless workflow before execution.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Flow Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* WordPress */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#1a2f5c] border border-slate-700 rounded-xl p-6 shadow-lg relative"
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-700 text-xs uppercase tracking-wide px-3 py-1 rounded-full">
            WordPress Path
          </div>
          {wordpressPath.map((step, i) => (
            <div key={i} className="mt-8">
              <div className="flex items-center gap-3 mb-2">
                {step.icon}
                <h4 className="text-lg font-semibold text-white">{step.title}</h4>
              </div>
              <p className="text-gray-300 leading-relaxed">{step.description}</p>
              {i < wordpressPath.length - 1 && <div className="h-6 w-px bg-blue-500/20 mx-auto my-4" />}
            </div>
          ))}
        </motion.div>

        {/* Custom */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#1a2f5c] border border-slate-700 rounded-xl p-6 shadow-lg relative"
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-700 text-xs uppercase tracking-wide px-3 py-1 rounded-full">
            Custom Path
          </div>
          {customPath.map((step, i) => (
            <div key={i} className="mt-8">
              <div className="flex items-center gap-3 mb-2">
                {step.icon}
                <h4 className="text-lg font-semibold text-white">{step.title}</h4>
              </div>
              <p className="text-gray-300 leading-relaxed">{step.description}</p>
              {i < customPath.length - 1 && <div className="h-6 w-px bg-blue-500/20 mx-auto my-4" />}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Behind the Build Expanded */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent mb-8 text-center">
          Behind the Build
        </h2>
        <p className="text-center text-gray-300 max-w-3xl mx-auto mb-12">
          Every project uses a unique mix of design systems, automation tools, and optimization workflows — tailored for reliability and growth.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#1a2f5c] border border-slate-700 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-300">WordPress Build Stack</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Elementor Pro, Hello Theme, WP Bakery</li>
              <li>• Yoast SEO, Schema Pro, WP Rocket</li>
              <li>• Perfmatters, Cloudflare CDN</li>
              <li>• WP Engine, Namecheap, cPanel</li>
              <li>• Backup, Security, and Audit Automations</li>
            </ul>
          </div>

          <div className="bg-[#1a2f5c] border border-slate-700 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-300">Custom Build Stack</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• React, TypeScript, Tailwind CSS</li>
              <li>• Framer Motion, Supabase, n8n</li>
              <li>• Netlify Edge Functions, Firecrawl</li>
              <li>• GitHub Actions, Lighthouse, GA4</li>
              <li>• PageSpeed & Schema Validation Loops</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[#1a2f5c]/60 border border-slate-700 rounded-lg p-5 text-center">
            <Database className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <h4 className="font-semibold text-blue-300 mb-1">Automation & Data</h4>
            <p className="text-gray-300 text-sm">
              Workflow automations link Supabase, Notion, and analytics for faster insights and content updates.
            </p>
          </div>
          <div className="bg-[#1a2f5c]/60 border border-slate-700 rounded-lg p-5 text-center">
            <Gauge className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <h4 className="font-semibold text-blue-300 mb-1">Optimization Loop</h4>
            <p className="text-gray-300 text-sm">
              Regular audits using Lighthouse, PageSpeed, and Search Console keep all builds running above 95%.
            </p>
          </div>
          <div className="bg-[#1a2f5c]/60 border border-slate-700 rounded-lg p-5 text-center">
            <Settings className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <h4 className="font-semibold text-blue-300 mb-1">Maintenance Flow</h4>
            <p className="text-gray-300 text-sm">
              Ongoing updates, plugin management, and version tracking ensure every project stays secure and efficient.
            </p>
          </div>
        </div>

        <p className="text-center text-gray-300 mt-12 italic">
          “Every pixel and line of code serves a purpose — built with precision, measured by performance.”
        </p>
      </motion.div>
    </motion.div>
  );
};

export default MyProcessSection;