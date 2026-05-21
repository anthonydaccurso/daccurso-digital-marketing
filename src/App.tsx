import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { Mail, Linkedin, FileText, Folders, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import ParticleBackground from './components/ParticleBackground';
import SocialMediaPopup from './components/SocialMediaPopup';
import CardCanvas from './components/CardCanvas';
import AskAntChat from './components/AskAntChat';
import { askAnt } from './pages/api/ask-ant.ts';
import AboutMeSection from './components/sections/AboutMeSection';
import MyProcessSection from './components/sections/MyProcessSection';
import ProjectsSection from './components/sections/ProjectsSection';
import LiveToolsSection from './components/sections/LiveToolsSection';
import ServicesSection from './components/sections/ServicesSection';
import SkillsSection from './components/sections/SkillsSection';
import BlogSection from './components/sections/BlogSection';
import ContactSection from './components/sections/ContactSection';

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

const mobileSections = [
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

function App() {
  const [activeSection, setActiveSection] = useState<Section>('About Me');
  const [isPWA, setIsPWA] = useState(false);
  const [showSocialPopup, setShowSocialPopup] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [isCardMounted, setIsCardMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'How can I help you?' }]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowCard(true);
      setTimeout(() => setIsCardMounted(true), 0);
    }, 0);
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
    
    // Check for tool-specific routes first
    const toolRoutes: { [key: string]: string } = {
      'live-tools/news-analyzer': 'news-analyzer',
      'live-tools/etf-health-predictor': 'etf-predictor',
      'live-tools/etf-gains-predictor': 'etf-gains',
      'live-tools/currency-arbitrage': 'currency-arbitrage'
    };
    
    if (toolRoutes[path]) {
      setActiveSection('Live Tools');
      setActiveTool(toolRoutes[path]);
      return;
    }
    
    // Handle general live-tools route
    if (path === 'live-tools') {
      setActiveSection('Live Tools');
      setActiveTool('news-analyzer'); // Default tool
      return;
    }
    
    // Handle other sections
    if (path === '' || path === 'about-me') {
      setActiveSection('About Me');
      if (path === 'about-me') {
        window.history.replaceState({}, '', '/');
      }
    } else if (path === 'blog') {
      setActiveSection('Blog');
    } else {
      const sectionFromUrl = sections.find(
        (section) => section.toLowerCase().replace(/\s+/g, '-') === path
      );
      if (sectionFromUrl) setActiveSection(sectionFromUrl);
    }
    
    if (window.matchMedia('(display-mode: standalone)').matches) setIsPWA(true);
  }, []);

  const handleNameClick = useCallback(() => {
    if (window.innerWidth <= 768 || window.matchMedia('(display-mode: standalone)').matches) {
      window.location.reload();
    }
  }, []);

  const handleSectionChange = useCallback((section: Section) => {
    if (section === 'Social') {
      setShowSocialPopup(true);
    } else {
      setActiveSection(section);
      
      if (section === 'About Me') {
        window.history.pushState({}, '', '/');
        setActiveTool(null);
      } else if (section === 'Blog') {
        window.history.pushState({}, '', '/blog');
        setActiveTool(null);
      } else if (section === 'Live Tools') {
        // Default to news-analyzer when clicking Live Tools
        setActiveTool('news-analyzer');
        window.history.pushState({}, '', '/live-tools/news-analyzer');
      } else {
        const slug = section.toLowerCase().replace(/\s+/g, '-');
        const path = `/${slug}`;
        window.history.pushState({}, '', path);
        setActiveTool(null);
      }
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
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const getCanonicalUrl = () => {
    const baseUrl = 'https://anthonydaccurso.com';
    if (activeSection === 'My Projects') return `${baseUrl}/my-projects`;
    if (activeSection === 'Live Tools') {
      if (activeTool) {
        const toolPaths: { [key: string]: string } = {
          'news-analyzer': '/live-tools/news-analyzer',
          'etf-predictor': '/live-tools/etf-health-predictor',
          'etf-gains': '/live-tools/etf-gains-predictor',
          'currency-arbitrage': '/live-tools/currency-arbitrage'
        };
        return `${baseUrl}${toolPaths[activeTool]}`;
      }
      return `${baseUrl}/live-tools`;
    }
    if (activeSection === 'My Services') return `${baseUrl}/my-services`;
    if (activeSection === 'My Skills') return `${baseUrl}/my-skills`;
    if (activeSection === 'Contact Me') return `${baseUrl}/contact-me`;
    if (activeSection === 'Blog') return `${baseUrl}/blog`;
    if (activeSection === 'My Process') return `${baseUrl}/my-process`;
    return baseUrl;
  };

  return (
    <div
      className={`min-h-screen bg-[#0d2242] text-white relative ${
        isPWA ? 'pt-[0px] pb-[0px]' : ''
      }`}
    >

      <ParticleBackground />

      {/* Card Container - Desktop Only */}
      {!isMobile && (
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-20">
          <div className="sticky top-[120px] right-[calc((100vw-960px)/2-218px)] w-[400px] h-[120px] ml-auto mr-[calc((100vw-960px)/2-224px)] pointer-events-auto">
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="bg-[#0d2242] w-[290px] h-[120px] rounded-xl animate-pulse" />
                </div>
              }
            >
              {showCard && <CardCanvas />}
            </Suspense>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 md:px-16 pt-[30px] md:pt-[60px] pb-[60px] md:pb-[80px] relative z-10">
        {/* Mobile Card */}
        {isMobile && (
          <div className="absolute left-1/2 transform -translate-x-1/2 top-[480px] w-[352px] h-[120px] z-20">
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="bg-[#0d2242] w-[330px] h-[120px] rounded-xl animate-pulse" />
                </div>
              }
            >
              {showCard && <CardCanvas />}
            </Suspense>
          </div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-[18px] md:mb-[18px] text-left inline-block bg-gradient-to-r from-white via-blue-400 to-blue-700 bg-clip-text text-transparent cursor-pointer pb-1 pt-[0px] z-[50] relative"
          onClick={handleNameClick}
        >
          Daccurso Digital Marketing
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 italic"
        >
          <span className="block md:hidden text-[16px]">Digital Marketing & Web Development</span>
          <span className="hidden md:block text-[19px]">
            Digital Marketing & Web Development
          </span>
        </motion.p>

        {/* NAVIGATION BUTTONS */}
        <div
          className={`${
            isMobile
              ? 'flex flex-wrap gap-4 mt-9 mb-[220px] md:mb-12 relative z-10'
              : 'mt-9 mb-[220px] md:mb-12 relative z-10'
          }`}
        >
          {!isMobile ? (
            <div className="flex flex-col gap-4">
              {/* Row 1 */}
              <div className="flex gap-4">
                {['About Me', 'My Process', 'My Projects', 'My Services'].map((section) => (
                  <motion.button
                    key={section}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSectionChange(section as Section)}
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

              {/* Row 2 */}
              <div className="flex gap-4">
                {['Live Tools', 'My Skills', 'Contact Me', 'Blog'].map((section) => (
                  <motion.button
                    key={section}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSectionChange(section as Section)}
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
            </div>
          ) : (
            mobileSections.map((section) => (
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
            ))
          )}
        </div>

        <Suspense
          fallback={<div className="w-full h-32 bg-[#0d2242] rounded-xl animate-pulse" />}
        >
          {activeSection === 'About Me' && <AboutMeSection />}
          {activeSection === 'My Process' && <MyProcessSection />}
          {activeSection === 'My Projects' && <ProjectsSection />}
          {activeSection === 'Live Tools' && <LiveToolsSection activeTool={activeTool} setActiveTool={setActiveTool} />}
          {activeSection === 'My Services' && <ServicesSection />}
          {activeSection === 'My Skills' && <SkillsSection />}
          {activeSection === 'Blog' && <BlogSection />}
          {activeSection === 'Contact Me' && <ContactSection />}
        </Suspense>
      </div>

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

export default App;