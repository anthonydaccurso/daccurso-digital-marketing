import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Helmet } from 'react-helmet-async';
import posts from '../../posts/postsData';

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0d2242] text-white p-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post not found</h1>
          <a href="/blog" className="text-[#234499] hover:underline">← Back to blog</a>
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

      <div className="max-w-3xl mx-auto px-4 py-20">
        <a href="/blog" className="text-[#234499] hover:underline mb-6 inline-block">
          ← Back to blog
        </a>
        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
        <p className="text-gray-400 mb-10">{post.date}</p>
        <div className="prose prose-invert prose-lg max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-white">{children}</h1>,
              h2: ({ children }) => <h2 className="text-2xl font-bold mt-6 mb-3 text-white">{children}</h2>,
              h3: ({ children }) => <h3 className="text-xl font-semibold mt-5 mb-2 text-white">{children}</h3>,
              p: ({ children }) => <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>,
              ul: ({ children }) => <ul className="list-disc pl-6 mb-4 text-gray-300 space-y-2">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 text-gray-300 space-y-2">{children}</ol>,
              li: ({ children }) => <li className="text-gray-300">{children}</li>,
              strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
              blockquote: ({ children }) => <blockquote className="border-l-4 border-[#234499] pl-4 italic text-gray-400 my-4">{children}</blockquote>,
              a: ({ href, children }) => <a href={href} className="text-[#234499] hover:underline">{children}</a>,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
