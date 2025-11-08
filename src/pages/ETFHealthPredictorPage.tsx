import ETFHealthPredictor from '../components/ETFHealthPredictor';
import { Helmet } from 'react-helmet-async';

export default function ETFHealthPredictorPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] py-12 px-4">
      <Helmet>
        <title>ETF Health Predictor | Daccurso Digital Marketing</title>
        <meta name="description" content="AI-powered ETF health predictions and analysis." />
      </Helmet>
      <main className="max-w-7xl mx-auto">
        <ETFHealthPredictor />
      </main>
    </div>
  );
}