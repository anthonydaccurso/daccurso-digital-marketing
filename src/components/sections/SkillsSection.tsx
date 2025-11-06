import React, { memo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const skillCategories = [
  {
    name: "SEO & Analytics",
    color: "#86b5ec", 
    skills: ["Google Analytics 4", "Google Search Console", "Semrush", "Ahrefs", "Google Admin"]
  },
  {
    name: "Design Tools", 
    color: "#5899e8",
    skills: ["Canva", "Figma", "WordPress", "Google Web Designer", "Adobe Creative Suite", "Visio", "Responsive Design"]
  },
  {
    name: "Marketing Tools",
    color: "#4b80e1",
    skills: ["HubSpot", "Brandwatch", "Power BI", "CapCut", "Google Suite", "Microsoft Office", "Social Media"]
  },
  {
    name: "Development",
    color: "#3e66da",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node", "n8n", "Vite", "Firecrawl", "React.js", "Tailwind CSS", "WordPress", "cPanel"]
  }
];

const SkillCategory = memo(({ category, index }) => {
  const categoryRef = useRef(null);
  const isInView = useInView(categoryRef, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={categoryRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="w-full"
    >
      <h3
        className="text-xl font-semibold mb-4"
        style={{ color: category.color }}
      >
        {category.name}
      </h3>
      <div className="flex flex-wrap gap-3">
        {category.skills.map((skill) => (
          <span
            key={skill}
            className="px-4 py-2 rounded-lg text-white text-sm md:text-base font-medium"
            style={{ backgroundColor: `${category.color}30` }}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
});

function SkillsSection() {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.1 });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-[#1a2f5c]/50 rounded-2xl p-6 sm:p-8 md:p-12 w-full mx-auto"
    >
      <Helmet>
        <title>My Skills | Daccurso Digital Marketing</title>
        <meta
          name="description"
          content="Explore Anthony Daccurso's technical and marketing expertise across SEO, analytics, design, and development — from React and Tailwind to Semrush and GA4."
        />
        <link rel="canonical" href="https://anthonydaccurso.com/my-skills/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://anthonydaccurso.com/my-skills/" />
        <meta property="og:title" content="My Skills | Daccurso Digital Marketing" />
        <meta
          property="og:description"
          content="SEO, analytics, web design, and development skills by Anthony Daccurso — combining creativity and performance optimization."
        />
        <meta
          property="og:image"
          content="https://bvevrurqtidadhfsuoee.supabase.co/storage/v1/object/public/media/ddm-apple-touch-icon.png"
        />
        <meta property="og:site_name" content="Daccurso Digital Marketing" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="My Skills | Daccurso Digital Marketing" />
        <meta
          name="twitter:description"
          content="Explore my toolkit: React, Tailwind, WordPress, Semrush, GA4, and more — powering efficient digital solutions."
        />
        <meta
          name="twitter:image"
          content="https://bvevrurqtidadhfsuoee.supabase.co/storage/v1/object/public/media/ddm-apple-touch-icon.png"
        />

        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "DefinedTermSet",
            "name": "Skills and Expertise",
            "description": "SEO, analytics, and web development skills mastered by Anthony Daccurso.",
            "hasDefinedTerm": [
              { "@type": "DefinedTerm", "name": "SEO & Analytics", "termCode": ["Google Analytics 4", "Google Search Console", "Semrush", "Ahrefs", "Google Admin"] },
              { "@type": "DefinedTerm", "name": "Marketing Tools", "termCode": ["HubSpot", "Brandwatch", "Power BI", "CapCut", "Google Suite", "Microsoft Office", "Social Media"] },
              { "@type": "DefinedTerm", "name": "Design Tools", "termCode": ["Canva", "Figma", "WordPress", "Google Web Designer", "Adobe Creative Suite", "Visio", "Responsive Design"] },
              { "@type": "DefinedTerm", "name": "Development", "termCode": ["HTML", "CSS", "JavaScript", "React", "React.js", "Node", "n8n", "Vite", "Firecrawl", "Tailwind CSS", "WordPress", "cPanel"] }
            ]
          }
          `}
        </script>
      </Helmet>

      <motion.h2
        ref={titleRef}
        initial={{ opacity: 0, y: -30 }}
        animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent mb-8 text-center"
      >
        My Skills
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillCategories.map((category, index) => (
          <SkillCategory key={category.name} category={category} index={index} />
        ))}
      </div>
    </motion.div>
  );
}

export default SkillsSection;