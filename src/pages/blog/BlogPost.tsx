import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import ParticleBackground from '../../components/ParticleBackground';
import posts from '../../posts/postsData';

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0d2242] text-white relative">
        <ParticleBackground />
        <div className="container mx-auto px-4 md:px-16 pt-[30px] md:pt-[60px] pb-[60px] md:pb-[80px] relative z-10 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-blue-400 to-blue-700 bg-clip-text text-transparent">Post not found</h1>
            <a href="/" className="text-blue-400 hover:text-blue-300 transition-colors text-lg">← Back to Home</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d2242] text-white relative">
      <Helmet>
        <title>{post.title} | Daccurso Digital Marketing</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://anthonydaccurso.com/blog/${post.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            datePublished: post.date,
            author: {
              "@type": "Person",
              name: "Anthony Daccurso"
            },
            publisher: {
              "@type": "Organization",
              name: "Daccurso Digital Marketing",
              logo: {
                "@type": "ImageObject",
                url: "https://anthonydaccurso.com/favicon.svg"
              }
            },
            description: post.excerpt,
            url: `https://anthonydaccurso.com/blog/${post.slug}`
          })}
        </script>
      </Helmet>

      <ParticleBackground />

      <div className="container mx-auto px-4 md:px-16 pt-[30px] md:pt-[60px] pb-[60px] md:pb-[80px] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <a href="/" className="text-blue-400 hover:text-blue-300 transition-colors text-lg">
            ← Back to Home
          </a>
        </motion.div>

        <div className="bg-[#1a2f5c]/50 rounded-2xl p-6 md:p-12 w-full mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent"
          >
            {post.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-sm md:text-base mb-8"
          >
            {post.date}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-white">{children}</h1>,
                h2: ({ children }) => <h2 className="text-xl md:text-2xl font-bold mt-6 mb-3 text-white">{children}</h2>,
                h3: ({ children }) => <h3 className="text-lg md:text-xl font-semibold mt-5 mb-2 bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">{children}</h3>,
                p: ({ children }) => <p className="text-gray-300 mb-4 text-lg leading-relaxed">{children}</p>,
                ul: ({ children }) => <ul className="list-disc pl-6 mb-6 text-gray-300 space-y-2">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-6 mb-6 text-gray-300 space-y-2">{children}</ol>,
                li: ({ children }) => <li className="text-gray-300 text-lg">{children}</li>,
                strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                blockquote: ({ children }) => <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-400 my-6 bg-[#1c336f]/30 py-3 rounded-r">{children}</blockquote>,
                a: ({ href, children }) => <a href={href} className="text-blue-400 hover:text-blue-300 underline transition-colors">{children}</a>,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
