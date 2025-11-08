import NewsAnalyzer from '../components/NewsAnalyzer';
import { Helmet } from 'react-helmet-async';

export default function NewsAnalyzerPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] py-12 px-4">
      <Helmet>
        <title>News & Sentiment Analyzer | Daccurso Digital Marketing</title>
        <meta name="description" content="Real-time global market sentiment and news analysis tool." />
      </Helmet>
      <main className="max-w-7xl mx-auto">
        <NewsAnalyzer />
      </main>
    </div>
  );
}