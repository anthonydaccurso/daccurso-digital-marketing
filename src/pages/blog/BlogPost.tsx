import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import posts from '../../posts/postsData';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0d2242] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <p className="text-gray-300 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 bg-[#234499] text-white rounded-lg hover:bg-[#2d5ac4] transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const canonicalUrl = `https://anthonydaccurso.com/blog/${post.slug}`;

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'Anthony Daccurso',
      url: 'https://anthonydaccurso.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Daccurso Digital Marketing',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bvevrurqtidadhfsuoee.supabase.co/storage/v1/object/public/media/ddm-apple-touch-icon.png',
      },
    },
    description: post.excerpt,
    url: canonicalUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | Daccurso Digital Marketing</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content="Anthony Daccurso" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <script type="application/ld+json">
          {JSON.stringify(blogPostingSchema)}
        </script>
      </Helmet>

      <article className="min-h-screen bg-[#0d2242] px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Blog
          </Link>

          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white leading-tight">
              {post.title}
            </h1>
            <time className="text-gray-400 text-lg">{post.date}</time>
          </header>

          <div className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold text-white mt-8 mb-4">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold text-white mt-6 mb-3">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="text-gray-300 leading-relaxed mb-4">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2">{children}</ol>
                ),
                li: ({ children }) => <li className="ml-4">{children}</li>,
                strong: ({ children }) => (
                  <strong className="font-semibold text-white">{children}</strong>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-[#234499] hover:text-[#2d5ac4] underline transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-[#234499] pl-4 italic text-gray-400 my-6">
                    {children}
                  </blockquote>
                ),
                code: ({ children }) => (
                  <code className="bg-gray-800 text-gray-200 px-2 py-1 rounded text-sm">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto mb-4">
                    {children}
                  </pre>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          <footer className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <Link
                to="/blog"
                className="inline-flex items-center text-[#234499] hover:text-[#2d5ac4] font-semibold transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                More Articles
              </Link>
            </div>
          </footer>
        </div>
      </article>
    </>
  );
}
