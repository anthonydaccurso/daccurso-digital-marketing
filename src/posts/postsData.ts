import technicalSEO from './technical-seo-guide.md?raw';
import webPerformance from './web-performance-optimization.md?raw';
import contentStrategy from './content-marketing-strategy.md?raw';
import responsiveDesign from './responsive-web-design.md?raw';

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

const posts: Post[] = [
  {
    slug: 'technical-seo-guide-2025',
    title: 'Technical SEO Guide: Boost Your Rankings in 2025',
    date: '2025-11-04',
    excerpt: 'Master technical SEO fundamentals including site speed, Core Web Vitals, structured data, and crawlability to improve search rankings.',
    content: technicalSEO,
  },
  {
    slug: 'web-performance-optimization',
    title: 'Web Performance Optimization: Essential Techniques',
    date: '2025-11-03',
    excerpt: 'Learn proven strategies to optimize your website performance, reduce load times, and improve user experience with modern best practices.',
    content: webPerformance,
  },
  {
    slug: 'content-marketing-strategy',
    title: 'Building an Effective Content Marketing Strategy',
    date: '2025-11-02',
    excerpt: 'Discover how to create compelling content that drives traffic, engages audiences, and converts visitors into customers.',
    content: contentStrategy,
  },
  {
    slug: 'responsive-web-design-best-practices',
    title: 'Responsive Web Design: Best Practices for 2025',
    date: '2025-11-01',
    excerpt: 'Essential responsive design principles and mobile-first strategies to create websites that look perfect on every device.',
    content: responsiveDesign,
  },
];

export default posts;
