import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
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

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay },
  viewport: { once: true },
});

const ArrowDown = ({ long = false }: { long?: boolean }) => (
  <div
    className={`text-blue-300 text-3xl text-center ${long ? "my-3" : "my-2"}`}
    style={{ lineHeight: "1.2em", letterSpacing: "0.05em" }}
  >
    <span style={{ display: "inline-block", transform: "scaleY(1.6)" }}>↓</span>
  </div>
);

const MyProcessSection: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1a2f5c]/50 rounded-2xl p-6 sm:p-8 md:p-12 w-full mx-auto text-white"
    >
      <Helmet>
        <title>My Process | Anthony Daccurso</title>
        <meta
          name="description"
          content="Explore my streamlined web design and development process — from discovery and strategy to deployment and optimization — blending creativity, SEO, and performance."
        />
        <link rel="canonical" href="https://anthonydaccurso.com/my-process" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://anthonydaccurso.com/my-process" />
        <meta
          property="og:title"
          content="My Process | Anthony Daccurso"
        />
        <meta
          property="og:description"
          content="A refined design → develop → deploy framework focused on clarity, speed, and scalability. Learn how each project phase transforms strategy into results."
        />
        <meta
          property="og:image"
          content="https://bvevrurqtidadhfsuoee.supabase.co/storage/v1/object/public/media/anthony-daccurso-fcp.webp"
        />
        <meta property="og:site_name" content="Anthony Daccurso Portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="My Process | Anthony Daccurso"
        />
        <meta
          name="twitter:description"
          content="See how I plan, build, and optimize every project with modern design, SEO, and performance-driven workflows."
        />
        <meta
          name="twitter:image"
          content="https://bvevrurqtidadhfsuoee.supabase.co/storage/v1/object/public/media/anthony-daccurso-fcp.webp"
        />
        <script type="application/ld+json">
{`
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "My Process",
  "url": "https://anthonydaccurso.com/my-process",
  "description": "Explore Anthony Daccurso’s professional workflow for web design, SEO, and development — combining structure, performance, and design clarity.",
  "author": {
    "@type": "Person",
    "name": "Anthony Daccurso",
    "url": "https://anthonydaccurso.com",
    "image": "https://bvevrurqtidadhfsuoee.supabase.co/storage/v1/object/public/media/anthony-daccurso-fcp.webp",
    "jobTitle": "Digital Marketing & Web Development Specialist",
    "worksFor": {
      "@type": "Organization",
      "name": "Custom Pool Pros"
    },
    "sameAs": [
      "https://www.linkedin.com/in/anthony-daccurso/",
      "https://github.com/anthonydaccurso",
      "https://www.instagram.com/daccursodigitalmarketing",
      "https://www.tiktok.com/@daccursodigitalmarketing"
    ]
  },
  "mainEntity": {
    "@type": "ItemList",
    "name": "My Web Design & Development Process",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Discover Phase",
        "description": "Research, strategy, and audience analysis to shape design direction."
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "WordPress Path",
        "description": "SEO-friendly builds using Elementor, schema markup, and caching."
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Custom Path",
        "description": "Modern React + Supabase builds with performance-first architecture."
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Optimization & Maintenance",
        "description": "Post-launch analytics, refinements, and client support."
      }
    ]
  }
}
`}
        </script>
      </Helmet>

      <motion.h2
        {...fadeUp()}
        className="text-3xl md:text-4xl font-bold text-white mb-6 text-center"
      >
        My Process
      </motion.h2>

      <motion.p
        {...fadeUp(0.1)}
        className="text-center text-gray-300 max-w-3xl mx-auto mb-8"
      >
        Every collaboration begins with discovery: understanding your goals,
        market, and brand identity. From there, projects branch into two
        specialized paths:{" "}
        <span className="text-blue-300 font-semibold">WordPress</span> or{" "}
        <span className="text-blue-300 font-semibold">Custom Development</span>. Each
        follows a refined design → develop → deploy cycle focused on clarity,
        performance, and longevity.
      </motion.p>

      <motion.div
        {...fadeUp()}
        className="bg-[#1a2f5c] border border-slate-700 rounded-xl p-6 shadow-md text-center"
      >
        <Lightbulb className="w-8 h-8 text-blue-300 mx-auto mb-3" />
        <h3 className="text-3xl font-semibold mb-2">Discover</h3>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Precisely identifying your audience, refining
          goals, and defining a clear creative direction. I dive into market
          research, UX trends, and competitor analysis before any design work
          begins.
        </p>
      </motion.div>

      <ArrowDown long />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-stretch mb-6">
        {[
          {
            icon: <Search className="w-6 h-6 text-blue-300 mb-2 mx-auto" />,
            title: "Research",
            text: "Analyze competitors, trends, and audiences to uncover opportunities and define benchmarks.",
          },
          {
            icon: <ClipboardList className="w-6 h-6 text-blue-300 mb-2 mx-auto" />,
            title: "Strategy",
            text: "Map out brand tone, structure, and user pathways aligned with business objectives.",
          },
          {
            icon: <Settings className="w-6 h-6 text-blue-300 mb-2 mx-auto" />,
            title: "Planning",
            text: "Define deliverables, milestones, and technical stack for a seamless workflow before execution.",
          },
        ].map((step, i) => (
          <motion.div
            key={i}
            {...fadeUp(i * 0.1)}
            className="bg-[#1a2f5c] border border-slate-700 rounded-xl p-6 shadow-md text-center"
          >
            {step.icon}
            <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
            <p className="text-gray-300 text-sm">{step.text}</p>
          </motion.div>
        ))}
      </div>

      <ArrowDown />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4 max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-6">
          <h3 className="text-3xl font-semibold text-white mt-2">WordPress Path</h3>

          {[
            {
              icon: <Layout className="w-6 h-6 text-blue-300 mb-2 mx-auto" />,
              title: "Design",
              text: "Design directly within WordPress using Elementor and custom CSS for responsive layouts. Sections are structured for performance and SEO.",
            },
            {
              icon: <Code className="w-6 h-6 text-blue-300 mb-2 mx-auto" />,
              title: "Develop",
              text: "Implement dynamic templates, schema markup, and lightweight PHP functions. Every feature focuses on maintainability and loading speed.",
            },
            {
              icon: <Rocket className="w-6 h-6 text-blue-300 mb-2 mx-auto" />,
              title: "Deploy & Refine",
              text: "Launch through WP Engine or Namecheap with Cloudflare CDN. Tune caching, optimize media, and validate structured data post-launch.",
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              {...fadeUp(i * 0.1)}
              className="bg-[#1a2f5c] border border-slate-700 rounded-xl p-6 shadow-md text-center w-full"
            >
              {step.icon}
              <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
              <p className="text-gray-300 text-sm">{step.text}</p>
            </motion.div>
          ))}
          <ArrowDown long />
        </div>

        <div className="flex flex-col items-center gap-6">
          <h3 className="text-3xl font-semibold text-white mt-2">Custom Path</h3>

          {[
            {
              icon: <Layout className="w-6 h-6 text-blue-300 mb-2 mx-auto" />,
              title: "Design",
              text: "Create detailed wireframes and interactive prototypes in Figma before translating them to Tailwind + Framer Motion components.",
            },
            {
              icon: <Code className="w-6 h-6 text-blue-300 mb-2 mx-auto" />,
              title: "Develop",
              text: "Build modular React + TypeScript applications with Supabase backends. Focus on scalability, clean architecture, and accessibility.",
            },
            {
              icon: <Rocket className="w-6 h-6 text-blue-300 mb-2 mx-auto" />,
              title: "Deploy & Refine",
              text: "Deploy on Netlify or Vercel using edge functions and CI/CD. Analyze metrics, refine UX, and evolve features continuously for client support.",
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              {...fadeUp(i * 0.1)}
              className="bg-[#1a2f5c] border border-slate-700 rounded-xl p-6 shadow-md text-center w-full"
            >
              {step.icon}
              <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
              <p className="text-gray-300 text-sm">{step.text}</p>
            </motion.div>
          ))}
          <ArrowDown long />
        </div>
      </div>

      <motion.h2
        {...fadeUp()}
        className="text-3xl font-semibold text-white mb-2 text-center mt-0"
      >
        Behind the Build
      </motion.h2>

      <p className="text-center text-gray-300 max-w-3xl mx-auto mb-6">
        Each build is powered by a consistent philosophy — structure, speed, and
        scalability — supported by the right stack and ongoing optimization.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4 max-w-5xl mx-auto">
        {[
          {
            icon: <Code className="w-6 h-6 text-blue-300 mb-3 mx-auto" />,
            title: "WordPress Build Stack",
            list: [
              "Elementor Pro, Hello Theme, WP Bakery",
              "Yoast SEO, Schema Pro, WP Rocket",
              "Perfmatters, Cloudflare CDN",
              "WP Engine, Namecheap, cPanel",
            ],
          },
          {
            icon: <Rocket className="w-6 h-6 text-blue-300 mb-3 mx-auto" />,
            title: "Custom Build Stack",
            list: [
              "React, TypeScript, Tailwind CSS",
              "Framer Motion, Supabase, n8n",
              "Netlify Edge Functions, Firecrawl",
              "GitHub Actions, Lighthouse, GA4",
            ],
          },
        ].map((stack, i) => (
          <motion.div
            key={i}
            {...fadeUp(i * 0.1)}
            className="bg-[#1a2f5c] border border-slate-700 rounded-xl p-6 shadow-md text-center flex flex-col items-center"
          >
            {stack.icon}
            <h3 className="text-lg font-semibold text-white mb-3">
              {stack.title}
            </h3>
            <ul className="text-gray-300 text-sm text-center max-w-sm leading-relaxed space-y-1.5">
              {stack.list.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <ArrowDown />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-stretch mb-10">
        {[
          {
            icon: <Database className="w-6 h-6 text-blue-300 mb-2 mx-auto" />,
            title: "Automation & Data",
            text: "Workflow automations link Supabase, Notion, and analytics for faster insights and content updates.",
          },
          {
            icon: <Gauge className="w-6 h-6 text-blue-300 mb-2 mx-auto" />,
            title: "Optimization Loop",
            text: "Regular audits with PageSpeed and Search Console keep all builds performing above 90%.",
          },
          {
            icon: <Settings className="w-6 h-6 text-blue-300 mb-2 mx-auto" />,
            title: "Maintenance Flow",
            text: "Ongoing updates, plugin management, and version tracking ensure long-term stability and security.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            {...fadeUp(i * 0.1)}
            className="bg-[#1a2f5c] border border-slate-700 rounded-xl p-6 shadow-md text-center flex flex-col items-center justify-center"
          >
            {item.icon}
            <h4 className="text-lg font-semibold text-white mb-1">{item.title}</h4>
            <p className="text-gray-300 text-sm">{item.text}</p>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-gray-300 mt-0 md:mt-10 italic">
        'A designer knows he has achieved perfection not when there is nothing left to add, but when there is nothing left to take away' - Antonie De-Saint
      </p>
    </motion.section>
  );
};

export default MyProcessSection;