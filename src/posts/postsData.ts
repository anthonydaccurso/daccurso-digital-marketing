import resumeTips from './resume-tips.md?raw';
import interviewSecrets from './interview-secrets.md?raw';
import choosingCareerPaths from './choosing-career-paths.md?raw';

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

const posts: Post[] = [
  {
    slug: 'how-to-write-a-resume',
    title: 'How to Write a Resume That Stands Out',
    date: '2025-11-04',
    excerpt: 'Learn how to create a standout resume with real-world hiring manager insights.',
    content: resumeTips,
  },
  {
    slug: 'interview-tips-for-grads',
    title: 'Interview Tips for New Graduates',
    date: '2025-11-03',
    excerpt: 'Practical advice to nail your interviews and impress any employer.',
    content: interviewSecrets,
  },
  {
    slug: 'choosing-a-career-path',
    title: 'Choosing the Right Career Path',
    date: '2025-11-01',
    excerpt: 'Find your ideal career direction using proven goal-setting frameworks.',
    content: choosingCareerPaths,
  },
];

export default posts;
