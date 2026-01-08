
import React from 'react';
import { Job, JobType, CommunityPost } from './types';

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Business Mentor',
    company: 'SME Connect',
    location: 'Remote',
    type: JobType.MENTORSHIP,
    description: 'Help small business owners navigate growth challenges using your decades of experience.',
    postedAt: '2 days ago'
  },
  {
    id: '2',
    title: 'Customer Experience Advisor',
    company: 'BlueRiver Solutions',
    location: 'Austin, TX (Hybrid)',
    type: JobType.PART_TIME,
    description: 'Provide high-quality support and guidance to customers. Flexible schedule for mature professionals.',
    postedAt: '1 week ago'
  },
  {
    id: '3',
    title: 'Part-time Accountant',
    company: 'Green Valley Non-profit',
    location: 'Local / Remote',
    type: JobType.FLEXIBLE,
    description: 'Manage accounts for a local community organization. 10 hours per week.',
    postedAt: '3 days ago'
  },
  {
    id: '4',
    title: 'Advisory Board Member',
    company: 'TechStart Inc.',
    location: 'New York, NY',
    type: JobType.CONSULTING,
    description: 'Share your wisdom on corporate strategy and governance on a quarterly basis.',
    postedAt: '5 days ago'
  }
];

export const MOCK_POSTS: CommunityPost[] = [
  {
    id: '1',
    author: 'Sarah Jenkins',
    authorRole: 'Retired Educator',
    content: "Just started my first consulting gig at 62! I was nervous about the tech, but my life experience has been my greatest asset. Don't let anyone tell you otherwise.",
    likes: 42,
    comments: 12,
    date: 'Today'
  },
  {
    id: '2',
    author: 'Robert Chen',
    authorRole: 'Former Project Manager',
    content: "I've spent 30 years in logistics. Today I shared some tips with a young startup founder. It felt wonderful to give back and feel relevant.",
    likes: 85,
    comments: 15,
    date: 'Yesterday'
  }
];

export const THEME = {
  primary: 'bg-blue-600',
  primaryHover: 'hover:bg-blue-700',
  secondary: 'bg-green-600',
  bgSoft: 'bg-gray-50',
  textMain: 'text-gray-900',
  textMuted: 'text-gray-600',
  cardBg: 'bg-white',
  border: 'border-gray-200'
};
