
export enum JobType {
  PART_TIME = 'Part-time',
  FLEXIBLE = 'Flexible hours',
  REMOTE = 'Remote work',
  CONSULTING = 'Consulting/Advisory',
  MENTORSHIP = 'Mentorship'
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: JobType;
  description: string;
  postedAt: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  authorRole: string;
  content: string;
  likes: number;
  comments: number;
  date: string;
}

export interface UserProfile {
  name: string;
  age: string;
  location: string;
  about: string;
  experience: string[];
  skills: string[];
  availability: string;
}
