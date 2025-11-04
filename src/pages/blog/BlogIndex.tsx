import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import ParticleBackground from '../../components/ParticleBackground';
import posts from '../../posts/postsData';

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-[#0d2242] text-white relative">
      <Helmet>
        <title>Career Tips & Insights | Daccurso Digital Marketing</title>
        <meta name="description" content="Expert career advice, tips, and insights for professionals and graduates." />
        <link rel="canonical" href="https://anthonydaccurso.com/blog" />
      </Helmet>

      <ParticleBackground />

      <div className="container mx-auto px-4 md:px-16 pt-[30px] md:pt-[60px] pb-[60px] md:pb-[80px] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <a href="/" className="text-blue-400 hover:text-blue-300 transition-colors text-lg">← Back to Home</a>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-[18px] md:mb-[18px] text-left bg-gradient-to-r from-white via-blue-400 to-blue-700 bg-clip-text text-transparent pb-1"
        >
          Career Tips & Insights
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 italic mb-12 text-[16px] md:text-[19px]"
        >
          Expert advice for your professional journey
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1a2f5c]/50 rounded-2xl p-6 md:p-8 hover:bg-[#1a2f5c]/70 transition-all duration-300"
            >
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent mb-4">
                {post.title}
              </h2>
              <p className="text-gray-300 mb-4 text-lg leading-relaxed">{post.excerpt}</p>
              <p className="text-gray-400 text-sm mb-4">{post.date}</p>
              <Link
                to={`/blog/${post.slug}`}
                className="text-blue-400 font-semibold hover:text-blue-300 transition-colors text-lg inline-flex items-center gap-2"
              >
                Read More →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
