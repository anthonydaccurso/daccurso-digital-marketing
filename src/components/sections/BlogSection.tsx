import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import posts from '../../posts/postsData';

function BlogSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1a2f5c]/50 rounded-2xl p-6 sm:p-8 md:p-12 w-full mx-auto"
    >
      <Helmet>
        <title>Blog | Anthony Daccurso</title>
        <meta
          name="description"
          content="Articles and tutorials by Anthony Daccurso on web design, SEO, digital marketing, and tech. Learn strategies and insights for modern digital growth."
        />
        <link rel="canonical" href="https://anthonydaccurso.com/blog/" />
        <meta property="og:type" content="blog" />
        <meta property="og:url" content="https://anthonydaccurso.com/blog/" />
        <meta property="og:title" content="Blog | Anthony Daccurso" />
        <meta
          property="og:description"
          content="Read guides, tutorials, and insights from Anthony Daccurso on SEO, marketing, and web development trends."
        />
        <meta
          property="og:image"
          content="https://bvevrurqtidadhfsuoee.supabase.co/storage/v1/object/public/media/apple-touch-icon.png"
        />
        <meta property="og:site_name" content="Anthony Daccurso" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog | Anthony Daccurso" />
        <meta
          name="twitter:description"
          content="Web design and marketing tutorials by Anthony Daccurso — practical strategies for SEO and digital performance."
        />
        <meta
          name="twitter:image"
          content="https://bvevrurqtidadhfsuoee.supabase.co/storage/v1/object/public/media/apple-touch-icon.png"
        />
        <script type="application/ld+json">
  {`
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Anthony Daccurso Blog",
    "url": "https://anthonydaccurso.com/blog",
    "author": {
      "@type": "Person",
      "name": "Anthony Daccurso",
      "url": "https://anthonydaccurso.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Anthony Daccurso",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bvevrurqtidadhfsuoee.supabase.co/storage/v1/object/public/media/apple-touch-icon.png"
      }
    },
    "description": "Web design, SEO, and marketing insights by Anthony Daccurso.",
    "inLanguage": "en-US"
  }
  `}
        </script>
      </Helmet>
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold mb-8"
        style={{
          background: 'linear-gradient(to right, white, rgb(191, 219, 254), rgb(96, 165, 250))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Blog
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#1a2f5c] rounded-xl p-6 hover:bg-[#1a2f5c]/70 transition-all duration-300"
          >
            <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent mb-3">{post.title}</h3>
            <p className="text-sm text-gray-400 mb-3">{post.date}</p>
            <p className="text-gray-300 text-base leading-relaxed mb-4">{post.excerpt}</p>
            <Link
              to={`/blog/${post.slug}`}
              className="text-blue-400 font-semibold hover:text-blue-300 transition-colors inline-flex items-center gap-2"
            >
              Read More →
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default BlogSection;