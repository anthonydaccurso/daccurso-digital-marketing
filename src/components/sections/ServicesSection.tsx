import React, { memo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const services = [
  {
    id: 'custom-website-development-package',
    title: "Custom Website Development Package",
    price: 1499.99,
    description: "Custom website development from scratch including responsive design, SEO optimization, and content strategy.",
    features: [
      "Custom Design & Development",
      "Mobile Responsive",
      "SEO Optimization",
      "Content Strategy",
      "Contact for Add-ons",
      "Pay per Website"
    ],
    gumroadUrl: "https://anthonydaccurso.gumroad.com/l/custom-website-development-package"
  },
  {
    id: 'custom-website-redesign-package',
    title: "Custom Website Redesign Package",
    price: 999.99,
    description: "Transform your existing website with a modern design, improved functionality, and better user experience.",
    features: [
      "Modern UI/UX Updates",
      "Performance Optimization",
      "Content Restructuring",
      "SEO Enhancements",
      "Contact for Add-ons",
      "Pay per Website"
    ],
    gumroadUrl: "https://anthonydaccurso.gumroad.com/l/custom-website-redesign-package"
  },
  {
    id: 'hosting-and-database-support',
    title: "Hosting and Database Support",
    price: 249.99,
    description: "Professional hosting setup, database management, and security monitoring for optimal website performance.",
    features: [
      "Server Configuration",
      "Database Management",
      "Security Setup",
      "Performance Monitoring",
      "Contact for Add-ons",
      "Pay per Month"
    ],
    gumroadUrl: "https://anthonydaccurso.gumroad.com/l/hosting-and-database-support"
  },
  {
    id: 'wordpress-development-package',
    title: "WordPress Development Package",
    price: 999.99,
    description: "Complete WordPress website development including responsive design, SEO enhancements, and performance optimization.",
    features: [
      "WordPress Design",
      "Mobile Responsive",
      "SEO enhancements",
      "Performance Optimization",
      "Contact for Add-ons",
      "Pay per Website"
    ],
    gumroadUrl: "https://anthonydaccurso.gumroad.com/l/wordpress-development-package"
  },
  {
    id: 'wordpress-redesign-package',
    title: "WordPress Redesign Package",
    price: 749.99,
    description: "Revive your existing WordPress website with a modern design, improved functionality, and better user experience.",
    features: [
      "Modern UI/UX Updates",
      "Performance Optimization",
      "Content Restructuring",
      "SEO Enhancements",
      "Contact for Add-ons",
      "Pay per Website"
    ],
    gumroadUrl: "https://anthonydaccurso.gumroad.com/l/wordpress-redesign-package"
  },
  {
    id: 'social-media-branding-and-content',
    title: "Social Media Branding and Content",
    price: 249.99,
    description: "Personalized Branding and Content Creation for engaging social media content tailored to your brand.",
    features: [
      "Custom Graphics",
      "Hashtag Research",
      "Performance Tracking",
      "2 Posts per Week",
      "Contact for Add-ons",
      "Pay per Month"
    ],
    gumroadUrl: "https://anthonydaccurso.gumroad.com/l/social-media-branding-and-content"
  }
] as const;

const ServiceCard = memo(({ service, index }: { service: typeof services[number]; index: number }) => {
  const [isLoading, setIsLoading] = useState(false);
  const cardRef = useRef(null);
  const isInView = index === 0 ? true : useInView(cardRef, { once: true, amount: 0.2 });

  const handlePurchase = () => {
    window.open(service.gumroadUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7 }}
      className="bg-[#1a2f5c] rounded-xl p-6 flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
      <div className="text-3xl font-bold text-blue-400 mb-4">
        ${service.price}
      </div>
      <p className="text-gray-300 mb-6">{service.description}</p>
      <div className="flex-grow">
        <ul className="space-y-2 mb-6">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-300">
              <span className="mr-2 text-blue-400">•</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={handlePurchase}
        disabled={isLoading}
        className={`w-full py-3 bg-blue-700/20 text-blue-300 rounded-lg font-semibold hover:bg-blue-500/40 transition-colors duration-300 flex items-center justify-center gap-2 ${
          isLoading ? 'opacity-75 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-blue-300 border-t-transparent rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5 text-blue-300" />
            Purchase Now
          </>
        )}
      </button>
    </motion.div>
  );
});

function ServicesSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1a2f5c]/50 rounded-2xl p-6 sm:p-8 md:p-12 w-full mx-auto"
    >
      <Helmet>
        <title>My Services | Daccurso Digital Marketing</title>
        <meta
          name="description"
          content="Explore my professional digital services including web design, SEO optimization, WordPress development, hosting, and social media branding."
        />
        <link rel="canonical" href="https://anthonydaccurso.com/my-services/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://anthonydaccurso.com/my-services/" />
        <meta property="og:title" content="My Services | Daccurso Digital Marketing" />
        <meta
          property="og:description"
          content="Custom website design, SEO optimization, and social media branding services by Anthony Daccurso."
        />
        <meta
          property="og:image"
          content="https://bvevrurqtidadhfsuoee.supabase.co/storage/v1/object/public/media/ddm-apple-touch-icon.png"
        />
        <meta property="og:site_name" content="Daccurso Digital Marketing" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="My Services | Daccurso Digital Marketing" />
        <meta
          name="twitter:description"
          content="Explore professional web design, SEO, and hosting services to elevate your online presence."
        />
        <meta
          name="twitter:image"
          content="https://bvevrurqtidadhfsuoee.supabase.co/storage/v1/object/public/media/ddm-apple-touch-icon.png"
        />
        <script type="application/ld+json">
{`
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Daccurso Digital Marketing",
  "url": "https://anthonydaccurso.com",
  "logo": "https://bvevrurqtidadhfsuoee.supabase.co/storage/v1/object/public/media/ddm-apple-touch-icon.png",
  "description": "Professional web design, SEO, and digital marketing services tailored for small businesses, startups, and creators.",
  "founder": {
    "@type": "Person",
    "name": "Anthony Daccurso",
    "jobTitle": "Digital Marketing & Web Development Specialist"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-732-299-3529",
    "contactType": "Customer Support",
    "areaServed": "US"
  },
  "sameAs": [
    "https://www.linkedin.com/in/anthony-daccurso/",
    "https://github.com/anthonydaccurso",
    "https://www.instagram.com/daccursodigitalmarketing",
    "https://www.tiktok.com/@daccursodigitalmarketing"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Digital Marketing Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Custom Website Development Package",
          "description": "Full website development from scratch including responsive design, SEO optimization, and content strategy.",
          "offers": { "@type": "Offer", "price": "1499.99", "priceCurrency": "USD" }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Custom Website Redesign Package",
          "description": "Transform your existing website with a modern redesign, improved performance, and enhanced SEO.",
          "offers": { "@type": "Offer", "price": "999.99", "priceCurrency": "USD" }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Hosting and Database Support",
          "description": "Professional hosting setup, database management, and performance monitoring for optimal uptime and security.",
          "offers": { "@type": "Offer", "price": "249.99", "priceCurrency": "USD" }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "WordPress Development Package",
          "description": "Complete WordPress website development with responsive design, SEO enhancements, and performance optimization.",
          "offers": { "@type": "Offer", "price": "999.99", "priceCurrency": "USD" }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "WordPress Redesign Package",
          "description": "Modernize your WordPress website with UI/UX updates, performance improvements, and SEO restructuring.",
          "offers": { "@type": "Offer", "price": "749.99", "priceCurrency": "USD" }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Social Media Branding and Content",
          "description": "Personalized social media branding, custom graphics, and content creation for consistent online presence.",
          "offers": { "@type": "Offer", "price": "249.99", "priceCurrency": "USD" }
        }
      }
    ]
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Freehold",
    "addressRegion": "NJ",
    "postalCode": "07728",
    "addressCountry": "US"
  }
}
`}
</script>
      </Helmet>

      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent mb-8"
      >
        My Services
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </motion.div>
  );
}

export default ServicesSection;