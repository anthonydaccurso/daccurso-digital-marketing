import CurrencyCalculator from '../components/CurrencyCalculator';
import { Helmet } from 'react-helmet-async';

export default function CurrencyArbitragePage() {
  return (
    <div className="min-h-screen bg-[#0a1628] py-12 px-4">
      <Helmet>
        <title>Currency Arbitrage Calculator | Daccurso Digital Marketing</title>
        <meta name="description" content="Real-time currency arbitrage opportunities and calculations." />
      </Helmet>
      <main className="max-w-7xl mx-auto">
        <CurrencyCalculator />
      </main>
    </div>
  );
}