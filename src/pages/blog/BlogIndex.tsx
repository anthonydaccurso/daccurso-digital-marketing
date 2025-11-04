import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import posts from '../../posts/postsData';

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-[#0d2242] text-white relative">
      <Helmet>
        <title>Career Tips & Insights | Daccurso Digital Marketing</title>
        <meta name="description" content="Expert career advice, tips, and insights for professionals and graduates." />
        <link rel="canonical" href="https://anthonydaccurso.com/blog" />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Career Tips & Insights
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="border border-gray-700 rounded-lg p-6 hover:bg-[#1c1c1c] transition-colors"
            >
              <h2 className="text-2xl font-semibold mb-3 text-[#234499]">
                {post.title}
              </h2>
              <p className="text-gray-300 mb-4">{post.excerpt}</p>
              <Link
                to={`/blog/${post.slug}`}
                className="text-[#234499] font-semibold hover:underline"
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
