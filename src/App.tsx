import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

// Icons & Components
import { Mail, Linkedin, FileText, Folders, ArrowUpRight } from 'lucide-react';
import ParticleBackground from './components/ParticleBackground';
import SocialMediaPopup from './components/SocialMediaPopup';
import CardCanvas from './components/CardCanvas';
import AskAntChat from './components/AskAntChat';
import { askAnt } from './pages/api/ask-ant.ts';

// Sections
import AboutMeSection from './components/sections/AboutMeSection';
import MyProcessSection from './components/sections/MyProcessSection';
import ProjectsSection from './components/sections/ProjectsSection';
import LiveToolsSection from './components/sections/LiveToolsSection';
import ServicesSection from './components/sections/ServicesSection';
import SkillsSection from './components/sections/SkillsSection';
import BlogSection from './components/sections/BlogSection';
import ContactSection from './components/sections/ContactSection';

// Live Tool Pages
import NewsAnalyzerPage from './pages/NewsAnalyzerPage';
import ETFHealthPredictorPage from './pages/ETFHealthPredictorPage';
import ETFGainsPredictorPage from './pages/ETFGainsPredictorPage';
import CurrencyArbitragePage from './pages/CurrencyArbitragePage';

const sections = [
  'About Me',
  'My Process',
  'My Projects',
  'My Services',
  'Live Tools',
  'My Skills',
  'Contact Me',
  'Blog',
] as const;

type Section = typeof sections[number];

function MainApp() {
  const [activeSection, setActiveSection] = useState<Section>('About Me');
  const [isPWA, setIsPWA] = useState(false);
  const [showSocialPopup, setShowSocialPopup] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'How can I help you?' }]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowCard(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const path = window.location.pathname.substring(1);
    if (path === '' || path === 'about-me') setActiveSection('About Me');
    else if (path === 'blog') setActiveSection('Blog');
    else {
      const sectionFromUrl = sections.find(
        (section) => section.toLowerCase().replace(/\s+/g, '-') === path
      );
      if (sectionFromUrl) setActiveSection(sectionFromUrl);
    }
    if (window.matchMedia('(display-mode: standalone)').matches) setIsPWA(true);
  }, []);

  const handleSectionChange = useCallback((section: Section) => {
    setActiveSection(section);
    const slug = section.toLowerCase().replace(/\s+/g, '-');
    const path = section === 'About Me' ? '/' : `/${slug}`;
    window.history.pushState({}, '', path);
  }, []);

  const handleNameClick = useCallback(() => {
    if (window.innerWidth <= 768 || window.matchMedia('(display-mode: standalone)').matches) {
      window.location.reload();
    }
  }, []);

  const sendMessage = async (msg: string) => {
    setLoading(true);
    setError(false);
    const userMsg = { role: 'user', content: msg };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    try {
      const reply = await askAnt(msg);
      const assistantMsg = { role: 'assistant', content: reply };
      setMessages([...updatedMessages, assistantMsg]);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen bg-[#0d2242] text-white relative ${
        isPWA ? 'pt-[0px] pb-[0px]' : ''
      }`}
    >
      <ParticleBackground />

      {/* Card - Desktop */}
      {!isMobile && (
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-20">
          <div className="sticky top-[120px] right-[calc((100vw-960px)/2-218px)] w-[400px] h-[120px] ml-auto mr-[calc((100vw-960px)/2-224px)] pointer-events-auto">
            <Suspense fallback={<div className="bg-[#0d2242] w-[290px] h-[120px] rounded-xl animate-pulse" />}>
              {showCard && <CardCanvas />}
            </Suspense>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="container mx-auto px-4 md:px-16 pt-[30px] md:pt-[60px] pb-[80px] relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-[18px] bg-gradient-to-r from-white via-blue-400 to-blue-700 bg-clip-text text-transparent cursor-pointer"
          onClick={handleNameClick}
        >
          Daccurso Digital Marketing
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-300 italic">
          <span className="block md:hidden text-[16px]">Digital Marketing & Web Development</span>
          <span className="hidden md:block text-[19px]">Digital Marketing & Web Development</span>
        </motion.p>

        {/* Nav */}
        <div className="flex flex-wrap gap-4 mt-9 mb-[220px] md:mb-12">
          {sections.map((section) => (
            <motion.button
              key={section}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSectionChange(section)}
              className={`px-[23px] py-3 rounded-lg font-semibold transition-colors duration-300 ${
                activeSection === section
                  ? 'bg-[#1c336f] text-white'
                  : 'bg-[#1c336f] text-gray-300 hover:bg-blue-500/20'
              }`}
            >
              {section}
            </motion.button>
          ))}
        </div>

        {/* Sections */}
        <Suspense fallback={<div className="w-full h-32 bg-[#0d2242] rounded-xl animate-pulse" />}>
          {activeSection === 'About Me' && <AboutMeSection />}
          {activeSection === 'My Process' && <MyProcessSection />}
          {activeSection === 'My Projects' && <ProjectsSection />}
          {activeSection === 'Live Tools' && <LiveToolsSection />}
          {activeSection === 'My Services' && <ServicesSection />}
          {activeSection === 'My Skills' && <SkillsSection />}
          {activeSection === 'Blog' && <BlogSection />}
          {activeSection === 'Contact Me' && <ContactSection />}
        </Suspense>
      </div>

      {/* Popups */}
      <SocialMediaPopup isOpen={showSocialPopup} onClose={() => setShowSocialPopup(false)} />
      <AskAntChat
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        messages={messages}
        onSend={sendMessage}
        error={error}
        loading={loading}
      />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/live-tools/news-analyzer" element={<NewsAnalyzerPage />} />
        <Route path="/live-tools/etf-health" element={<ETFHealthPredictorPage />} />
        <Route path="/live-tools/etf-gains" element={<ETFGainsPredictorPage />} />
        <Route path="/live-tools/currency-arbitrage" element={<CurrencyArbitragePage />} />
        <Route path="*" element={<MainApp />} /> {/* fallback route */}
      </Routes>
    </Router>
  );
}