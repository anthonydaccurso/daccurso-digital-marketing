import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

function AboutMeSection() {
  return (
    <div className="w-full">
      <Helmet>
        <title>Anthony Daccurso | Daccurso Digital Marketing</title>
        <meta
          name="description"
          content="I'm Anthony Daccurso, a Digital Marketing & SEO Specialist passionate about web design, performance optimization, and helping businesses grow their digital presence."
        />
        <link rel="canonical" href="https://anthonydaccurso.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://anthonydaccurso.com/" />
        <meta property="og:title" content="Anthony Daccurso | Daccurso Digital Marketing" />
        <meta
          property="og:description"
          content="Portfolio of Anthony Daccurso — Digital Marketing & Web Development Specialist helping brands improve SEO, performance, and design impact."
        />
        <meta
          property="og:image"
          content="https://bvevrurqtidadhfsuoee.supabase.co/storage/v1/object/public/media/anthony-daccurso-fcp.webp"
        />
        <meta property="og:site_name" content="Anthony Daccurso Portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Anthony Daccurso | Daccurso Digital Marketing" />
        <meta
          name="twitter:description"
          content="Explore my work in web design, SEO, and marketing strategy — building digital experiences that perform."
        />
        <meta
          name="twitter:image"
          content="https://bvevrurqtidadhfsuoee.supabase.co/storage/v1/object/public/media/anthony-daccurso-fcp.webp"
        />

        <link
          rel="preload"
          as="image"
          href="https://bvevrurqtidadhfsuoee.supabase.co/storage/v1/object/public/media/anthony-daccurso-fcp.webp?width=600&quality=80&format=webp&resize=cover"
          imagesizes="(max-width: 768px) 100vw, 600px"
          fetchpriority="high"
        />

        <script type="application/ld+json">
{`
{
  "@context": "https://schema.org",
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
  ],
  "description": "I'm Anthony Daccurso, a Digital Marketing & SEO Specialist passionate about web design, performance optimization, and helping businesses grow their digital presence.",
  "knowsAbout": [
    "Search Engine Optimization (SEO)",
    "Web Development",
    "Digital Marketing",
    "React.js",
    "Content Strategy",
    "Analytics"
  ],
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "The College of New Jersey (TCNJ)",
    "sameAs": "https://tcnj.edu/"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Freehold",
    "addressRegion": "NJ",
    "postalCode": "07728",
    "addressCountry": "US"
  },
  "headline": "About Me"
}
`}
        </script>
      </Helmet>

      <div className="bg-[#1a2f5c]/50 rounded-2xl p-6 sm:p-8 md:p-12 w-full mx-auto">
        <div className="flex flex-col md:flex-row gap-5 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full md:w-1/3 aspect-square rounded-xl overflow-hidden shadow-2xl"
          >
            <img
              src="https://bvevrurqtidadhfsuoee.supabase.co/storage/v1/object/public/media/anthony-daccurso-fcp.webp?width=600&quality=80&format=webp&resize=cover"
              srcSet="
                https://bvevrurqtidadhfsuoee.supabase.co/storage/v1/object/public/media/anthony-daccurso-fcp.webp?width=600&quality=80&format=webp&resize=cover 1x,
                https://bvevrurqtidadhfsuoee.supabase.co/storage/v1/object/public/media/anthony-daccurso-fcp.webp?width=800&quality=80&format=webp&resize=cover 2x
              "
              alt="Anthony Daccurso"
              width="400"
              height="400"
              loading="eager"
              fetchpriority="high"
              decoding="async"
              className="w-full h-full object-cover brightness-40"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full md:w-2/3 space-y-6"
          >
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              About Me
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className="text-lg md:text-xl leading-relaxed text-gray-300"
            >
              I'm Anthony Daccurso, a Digital Marketing & SEO Specialist at Custom Pool Pros, and a graduate from TCNJ with a B.S. in Marketing and a minor in Information Systems & Technology. I specialize in digital marketing and web development, where I have taken on many relevant and important tasks at Custom Pool Pros. 
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className="text-lg md:text-xl leading-relaxed text-gray-300"
            >
              My journey in digital marketing and web development has driven me to complete both work and personal projects that enable me to enhance my skills. I aim to strengthen my expertise as I advance in my career and consistently create deliverables of the highest possible quality. 
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AboutMeSection;