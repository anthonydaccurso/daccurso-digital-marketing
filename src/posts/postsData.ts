import matter from 'gray-matter';
import resumeTips from './resume-tips.md?raw';
import interviewSecrets from './interview-secrets.md?raw';
import choosingCareerPaths from './choosing-career-paths.md?raw';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

function parsePost(slug: string, rawContent: string): BlogPost {
  const { data, content } = matter(rawContent);
  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || new Date().toISOString().split('T')[0],
    excerpt: data.excerpt || '',
    content,
  };
}

const posts: BlogPost[] = [
  parsePost('how-to-write-a-resume', resumeTips),
  parsePost('interview-tips-for-grads', interviewSecrets),
  parsePost('choosing-a-career-path', choosingCareerPaths),
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export default posts;
