import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calculator, BarChart3, Target, Globe } from 'lucide-react';
import CurrencyCalculator from '../CurrencyCalculator';
import ETFHealthPredictor from '../ETFHealthPredictor';
import ETFGainsPredictor from '../ETFGainsPredictor';
import NewsAnalyzer from '../NewsAnalyzer';
import { Helmet } from 'react-helmet-async';

const tools = [
  {
    id: 'news-analyzer',
    name: 'News & Sentiment Analyzer',
    icon: Globe,
    component: NewsAnalyzer,
    description: 'Global market sentiment and news',
    slug: 'news-analyzer',
    title: 'News & Sentiment Analyzer',
    metaDescription: 'Real-time financial news analysis and market sentiment tracking with AI-powered insights — global markets, trending assets, and sentiment analysis.'
  },
  {
    id: 'etf-predictor',
    name: 'ETF Health Predictor',
    icon: BarChart3,
    component: ETFHealthPredictor,
    description: 'AI-powered ETF predictions',
    slug: 'etf-health-predictor',
    title: 'ETF Health Predictor',
    metaDescription: 'AI-powered ETF analysis and predictions — real-time market data, technical indicators, and investment recommendations for 15+ major ETFs.'
  },
  {
    id: 'etf-gains',
    name: 'ETF Gains Predictor',
    icon: Target,
    component: ETFGainsPredictor,
    description: 'Personalized investment projections',
    slug: 'etf-gains-predictor',
    title: 'ETF Gains Predictor',
    metaDescription: 'Calculate personalized ETF investment projections with dollar-cost averaging — track portfolio growth, retirement planning, and realistic return estimates.'
  },
  {
    id: 'currency-arbitrage',
    name: 'Currency Arbitrage',
    icon: TrendingUp,
    component: CurrencyCalculator,
    description: 'Real-time arbitrage opportunities',
    slug: 'currency-arbitrage',
    title: 'Currency Arbitrage Calculator',
    metaDescription: 'Real-time currency arbitrage calculator with live exchange rates — identify profitable trading opportunities across 20+ global currencies.'
  }
];

interface LiveToolsSectionProps {
  activeTool?: string | null;
  setActiveTool?: (tool: string) => void;
}

function LiveToolsSection({ activeTool: propActiveTool, setActiveTool: propSetActiveTool }: LiveToolsSectionProps) {
  const [localActiveTool, setLocalActiveTool] = useState('news-analyzer');
  
  // Use prop if provided, otherwise use local state
  const activeTool = propActiveTool !== undefined && propActiveTool !== null ? propActiveTool : localActiveTool;
  const setActiveTool = propSetActiveTool || setLocalActiveTool;

  useEffect(() => {
    // Set default if no active tool
    if (!activeTool) {
      setActiveTool('news-analyzer');
    }
  }, [activeTool, setActiveTool]);

  const handleToolChange = (toolId: string) => {
    setActiveTool(toolId);
    
    // Update URL when tool changes
    const tool = tools.find(t => t.id === toolId);
    if (tool) {
      window.history.pushState({}, '', `/live-tools/${tool.slug}`);
    }
  };

  const ActiveComponent = tools.find(tool => tool.id === activeTool)?.component;
  const activeToolData = tools.find(tool => tool.id === activeTool);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-[#1a2f5c]/50 rounded-2xl p-6 sm:p-8 md:p-12 w-full mx-auto"
    >
      <Helmet>
        <title>{activeToolData?.title || 'Live Tools'} | Daccurso Digital Marketing</title>
        <meta
          name="description"
          content={activeToolData?.metaDescription || 'Real-time tools for investment and financial analysis — including ETF predictions, currency arbitrage, and news sentiment tracking by Daccurso Digital Marketing.'}
        />
        <link rel="canonical" href={`https://anthonydaccurso.com/live-tools/${activeToolData?.slug || ''}`} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://anthonydaccurso.com/live-tools/${activeToolData?.slug || ''}`} />
        <meta property="og:title" content={`${activeToolData?.title || 'Live Tools'} | Daccurso Digital Marketing`} />
        <meta
          property="og:description"
          content={activeToolData?.metaDescription || 'Interactive investment and market tools built with React and Supabase — ETF predictors, news analyzers, and arbitrage calculators.'}
        />
        <meta
          property="og:image"
          content="https://bvevrurqtidadhfsuoee.supabase.co/storage/v1/object/public/media/ddm-apple-touch-icon.png"
        />
        <meta property="og:site_name" content="Daccurso Digital Marketing" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${activeToolData?.title || 'Live Tools'} | Daccurso Digital Marketing`} />
        <meta
          name="twitter:description"
          content={activeToolData?.metaDescription || 'Try AI-powered ETF predictors, currency arbitrage calculators, and sentiment analyzers — built by Daccurso Digital Marketing.'}
        />
        <meta
          name="twitter:image"
          content="https://bvevrurqtidadhfsuoee.supabase.co/storage/v1/object/public/media/ddm-apple-touch-icon.png"
        />

        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "${activeToolData?.title || 'Live Tools'}",
            "url": "https://anthonydaccurso.com/live-tools/${activeToolData?.slug || ''}",
            "applicationCategory": "Finance",
            "operatingSystem": "All",
            "creator": {
              "@type": "Person",
              "name": "Anthony Daccurso",
              "url": "https://anthonydaccurso.com"
            },
            "description": "${activeToolData?.metaDescription || 'Interactive financial analysis tools'}",
            "featureList": [
              "ETF Health Predictor",
              "ETF Gains Predictor",
              "Currency Arbitrage Calculator",
              "News & Sentiment Analyzer"
            ]
          }
          `}
        </script>
      </Helmet>

      <motion.h1
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent mb-8"
      >
        {activeToolData?.title || 'Live Tools'}
      </motion.h1>

      {/* Tool Selector - Optimized for single row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 lg:gap-4 mb-8">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <motion.button
              key={tool.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleToolChange(tool.id)}
              className={`flex flex-col lg:flex-row items-center gap-2 lg:gap-3 px-3 lg:px-6 py-3 lg:py-4 rounded-xl transition-all duration-300 text-center lg:text-left ${
                activeTool === tool.id
                  ? 'bg-blue-600/30 border border-blue-500/50 text-white shadow-lg'
                  : 'bg-[#0d2242] border border-blue-500/20 text-gray-300 hover:bg-blue-500/10 hover:border-blue-500/30'
              }`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${activeTool === tool.id ? 'text-blue-400' : 'text-gray-400'}`} />
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-m lg:text-base truncate">{tool.name}</div>
                <div className="text-[12px] text-gray-400 block truncate">{tool.description}</div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Active Tool Component */}
      <motion.div
        key={activeTool}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {ActiveComponent && <ActiveComponent />}
      </motion.div>
    </motion.div>
  );
}

export default LiveToolsSection;