import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import posts from '../../posts/postsData';

export default function BlogIndex() {
  return (
    <>
      <Helmet>
        <title>Career Tips & Insights | Daccurso Digital Marketing</title>
        <meta
          name="description"
          content="Expert career advice, resume tips, interview strategies, and professional development insights from Anthony Daccurso."
        />
        <link rel="canonical" href="https://anthonydaccurso.com/blog" />
        <meta property="og:title" content="Career Tips & Insights | Daccurso Digital Marketing" />
        <meta
          property="og:description"
          content="Expert career advice, resume tips, interview strategies, and professional development insights."
        />
        <meta property="og:url" content="https://anthonydaccurso.com/blog" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-[#0d2242] px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-white">
            Career Tips & Insights
          </h1>
          <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Professional advice and strategies to help you advance your career, from crafting the perfect resume to acing interviews.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="border border-gray-700 rounded-lg p-6 hover:border-[#234499] transition-all duration-300 bg-[#1a2d4d] hover:bg-[#1f3355]"
              >
                <h2 className="text-2xl font-semibold mb-2 text-white">
                  {post.title}
                </h2>
                <time className="text-sm text-gray-400 mb-3 block">{post.date}</time>
                <p className="text-gray-300 mb-4 leading-relaxed">{post.excerpt}</p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center text-[#234499] font-semibold hover:text-[#2d5ac4] transition-colors"
                >
                  Read More
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/"
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
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
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
