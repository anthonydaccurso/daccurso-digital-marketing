import ETFGainsPredictor from '../components/ETFGainsPredictor';
import { Helmet } from 'react-helmet-async';

export default function ETFGainsPredictorPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] py-12 px-4">
      <Helmet>
        <title>ETF Gains Predictor | Daccurso Digital Marketing</title>
        <meta name="description" content="Personalized ETF investment projections and gains calculator." />
      </Helmet>
      <main className="max-w-7xl mx-auto">
        <ETFGainsPredictor />
      </main>
    </div>
  );
}