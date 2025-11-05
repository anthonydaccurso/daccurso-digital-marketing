import React from "react";
import { motion } from "framer-motion";
import {
  Lightbulb,
  Search,
  ClipboardList,
  Settings,
  Layout,
  Code,
  Rocket,
  Database,
  Gauge,
} from "lucide-react";

/** shared fade-up used across your site */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay },
  viewport: { once: true },
});

/** perfectly centered, grid-safe connectors (no overlap, no float) */
const HLine = () => <div className="h-px w-full bg-blue-300/40" />;
const VLine = ({ h = 16 }: { h?: number }) => (
  <div style={{ height: h }} className="w-px bg-blue-300/40" />
);
const YSplit = () => (
  <div className="relative w-full h-10">
    {/* stem */}
    <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-4 bg-blue-300/40" />
    {/* branches */}
    <div className="absolute left-1/2 bottom-0 -translate-x-[2px] origin-top-left rotate-[-33deg] h-px w-[92px] bg-blue-300/40" />
    <div className="absolute left-1/2 bottom-0 translate-x-[2px] origin-top-right rotate-[33deg] h-px w-[92px] bg-blue-300/40" />
  </div>
);

const MyProcessSection: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1a2f5c]/50 rounded-2xl p-6 sm:p-8 md:p-12 w-full mx-auto text-white"
    >
      {/* ------------------------------------------------------------------ */}
      {/* Header */}
      {/* ------------------------------------------------------------------ */}
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-white mb-8 text-center"
      >
        My Process
      </motion.h2>

      <p className="text-center text-gray-300 max-w-3xl mx-auto mb-8">
        Every collaboration begins with discovery — understanding your goals,
        market, and brand identity. From there, projects branch into two
        specialized paths: <span className="text-blue-300 font-semibold">WordPress</span> or{" "}
        <span className="text-blue-300 font-semibold">Custom Development</span>. Each follows a
        refined design → develop → deploy cycle focused on clarity, performance, and longevity.
      </p>

      {/* ------------------------------------------------------------------ */}
      {/* Discover */}
      {/* ------------------------------------------------------------------ */}
      <motion.div
        {...fadeUp()}
        className="bg-[#1a2f5c] border border-slate-700 rounded-xl p-6 shadow-md text-center"
      >
        <Lightbulb className="w-8 h-8 text-blue-300 mx-auto mb-3" />
        <h3 className="text-3xl font-semibold mb-2">Discover</h3>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Discovery is about precision — identifying your audience, refining goals, and defining a
          clear creative direction. I dive into market research, UX trends, and competitor analysis
          before any design work begins.
        </p>
      </motion.div>

      {/* vertical connector below Discover */}
      <div className="flex justify-center my-6">
        <VLine h={20} />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Research / Strategy / Planning */}
      {/* ------------------------------------------------------------------ */}
      <div className="grid grid-cols-3 gap-6 items-stretch">
        {[
          {
            icon: <Search className="w-6 h-6 text-blue-300 mb-2" />,
            title: "Research",
            text: "Analyze competitors, trends, and audiences to uncover opportunities and define benchmarks.",
          },
          {
            icon: <ClipboardList className="w-6 h-6 text-blue-300 mb-2" />,
            title: "Strategy",
            text: "Map out brand tone, structure, and user pathways aligned with business objectives.",
          },
          {
            icon: <Settings className="w-6 h-6 text-blue-300 mb-2" />,
            title: "Planning",
            text: "Define deliverables, milestones, and technical stack for a seamless workflow before execution.",
          },
        ].map((b, i) => (
          <motion.div
            key={b.title}
            {...fadeUp(i * 0.08)}
            className="bg-[#1a2f5c] border border-slate-700 rounded-xl p-6 shadow-md text-center"
          >
            {b.icon}
            <h4 className="text-lg font-semibold mb-2">{b.title}</h4>
            <p className="text-gray-300 text-sm">{b.text}</p>
          </motion.div>
        ))}
      </div>

      {/* horizontal connectors strictly BETWEEN the 3 boxes */}
      <div className="grid grid-cols-5 items-center my-6">
        <div />
        <HLine />
        <div />
        <HLine />
        <div />
      </div>

      {/* Y split from Planning to two columns */}
      <div className="flex justify-center mb-8">
        <YSplit />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Split Paths */}
      {/* ------------------------------------------------------------------ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-6xl mx-auto">
        {/* WordPress */}
        <div className="flex flex-col items-center gap-6">
          <h3 className="text-3xl font-semibold text-white">WordPress Path</h3>

          {/* WP: Design */}
          <motion.div
            {...fadeUp(0)}
            className="bg-[#1a2f5c] border border-slate-700 rounded-xl p-6 shadow-md text-center w-full"
          >
            <Layout className="w-6 h-6 text-blue-300 mb-2" />
            <h4 className="text-lg font-semibold mb-2">Design</h4>
            <p className="text-gray-300 text-sm">
              Design directly within WordPress or Figma using Elementor and custom CSS for responsive
              layouts. Each section is structured for performance and SEO readability.
            </p>
          </motion.div>

          {/* vertical connector */}
          <VLine />

          {/* WP: Develop */}
          <motion.div
            {...fadeUp(0.06)}
            className="bg-[#1a2f5c] border border-slate-700 rounded-xl p-6 shadow-md text-center w-full"
          >
            <Code className="w-6 h-6 text-blue-300 mb-2" />
            <h4 className="text-lg font-semibold mb-2">Develop</h4>
            <p className="text-gray-300 text-sm">
              Implement dynamic templates, schema markup, and lightweight PHP functions. Every
              feature focuses on maintainability and loading speed.
            </p>
          </motion.div>

          {/* vertical connector */}
          <VLine />

          {/* WP: Deploy */}
          <motion.div
            {...fadeUp(0.12)}
            className="bg-[#1a2f5c] border border-slate-700 rounded-xl p-6 shadow-md text-center w-full"
          >
            <Rocket className="w-6 h-6 text-blue-300 mb-2" />
            <h4 className="text-lg font-semibold mb-2">Deploy & Refine</h4>
            <p className="text-gray-300 text-sm">
              Launch through WP Engine or Namecheap with Cloudflare CDN. Tune caching, optimize
              media, and validate structured data post-launch.
            </p>
          </motion.div>
        </div>

        {/* Custom */}
        <div className="flex flex-col items-center gap-6">
          <h3 className="text-3xl font-semibold text-white">Custom Path</h3>

          {/* Custom: Design */}
          <motion.div
            {...fadeUp(0)}
            className="bg-[#1a2f5c] border border-slate-700 rounded-xl p-6 shadow-md text-center w-full"
          >
            <Layout className="w-6 h-6 text-blue-300 mb-2" />
            <h4 className="text-lg font-semibold mb-2">Design</h4>
            <p className="text-gray-300 text-sm">
              Create detailed wireframes and interactive prototypes in Figma before translating them
              to Tailwind + Framer Motion components.
            </p>
          </motion.div>

          {/* vertical connector */}
          <VLine />

          {/* Custom: Develop */}
          <motion.div
            {...fadeUp(0.06)}
            className="bg-[#1a2f5c] border border-slate-700 rounded-xl p-6 shadow-md text-center w-full"
          >
            <Code className="w-6 h-6 text-blue-300 mb-2" />
            <h4 className="text-lg font-semibold mb-2">Develop</h4>
            <p className="text-gray-300 text-sm">
              Build modular React + TypeScript applications with Supabase backends. Focus on
              scalability, clean architecture, and accessibility.
            </p>
          </motion.div>

          {/* vertical connector */}
          <VLine />

          {/* Custom: Deploy */}
          <motion.div
            {...fadeUp(0.12)}
            className="bg-[#1a2f5c] border border-slate-700 rounded-xl p-6 shadow-md text-center w-full"
          >
            <Rocket className="w-6 h-6 text-blue-300 mb-2" />
            <h4 className="text-lg font-semibold mb-2">Deploy & Refine</h4>
            <p className="text-gray-300 text-sm">
              Deploy on Netlify or Vercel using edge functions and CI/CD. Analyze metrics, refine UX,
              and evolve features continuously.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Behind the Build */}
      {/* ------------------------------------------------------------------ */}
      <motion.h2
        {...fadeUp()}
        className="text-3xl md:text-4xl font-bold text-white mb-8 text-center"
      >
        Behind the Build
      </motion.h2>

      <p className="text-center text-gray-300 max-w-3xl mx-auto mb-8">
        Each build is powered by a consistent philosophy — structure, speed, and scalability —
        supported by the right stack and ongoing optimization.
      </p>

      {/* stacks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {[
          {
            title: "WordPress Build Stack",
            list: [
              "Elementor Pro, Hello Theme, WP Bakery",
              "Yoast SEO, Schema Pro, WP Rocket",
              "Perfmatters, Cloudflare CDN",
              "WP Engine, Namecheap, cPanel",
            ],
          },
          {
            title: "Custom Build Stack",
            list: [
              "React, TypeScript, Tailwind CSS",
              "Framer Motion, Supabase, n8n",
              "Netlify Edge Functions, Firecrawl",
              "GitHub Actions, Lighthouse, GA4",
            ],
          },
        ].map((s, i) => (
          <motion.div
            key={s.title}
            {...fadeUp(i * 0.08)}
            className="bg-[#1a2f5c] border border-slate-700 rounded-xl p-6 shadow-md"
          >
            <h3 className="text-xl font-semibold text-blue-300 mb-3">{s.title}</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              {s.list.map((li) => (
                <li key={li}>• {li}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* optimization row */}
      <div className="grid grid-cols-3 gap-6 items-stretch">
        {[
          {
            icon: <Database className="w-6 h-6 text-blue-300 mb-2" />,
            title: "Automation & Data",
            text: "Workflow automations link Supabase, Notion, and analytics for faster insights and content updates.",
          },
          {
            icon: <Gauge className="w-6 h-6 text-blue-300 mb-2" />,
            title: "Optimization Loop",
            text: "Regular audits with Lighthouse, PageSpeed, and Search Console keep all builds performing above 95%.",
          },
          {
            icon: <Settings className="w-6 h-6 text-blue-300 mb-2" />,
            title: "Maintenance Flow",
            text: "Ongoing updates, plugin management, and version tracking ensure long-term stability and security.",
          },
        ].map((b, i) => (
          <motion.div
            key={b.title}
            {...fadeUp(i * 0.08)}
            className="bg-[#1a2f5c] border border-slate-700 rounded-xl p-6 shadow-md text-center"
          >
            {b.icon}
            <h4 className="font-semibold text-blue-300 mb-1">{b.title}</h4>
            <p className="text-gray-300 text-sm">{b.text}</p>
          </motion.div>
        ))}
      </div>

      {/* horizontal connectors strictly between the 3 bottom boxes */}
      <div className="grid grid-cols-5 items-center my-6">
        <div />
        <HLine />
        <div />
        <HLine />
        <div />
      </div>

      <p className="text-center text-gray-300 mt-8 italic">
        “Every pixel and line of code serves a purpose — built with precision, measured by
        performance.”
      </p>
    </motion.section>
  );
};

export default MyProcessSection;