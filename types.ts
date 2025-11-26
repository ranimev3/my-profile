export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  status: 'Live' | 'In Progress' | 'Prototype';
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'Frontend' | 'Backend' | 'Design' | 'Core';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  type: 'github' | 'guest' | 'admin';
}

export interface ForumPost {
  id: string;
  author: User;
  content: string;
  timestamp: number;
  likes: number;
}

export enum Section {
  HERO = 'hero',
  ABOUT = 'about',
  SKILLS = 'skills',
  PROJECTS = 'projects',
  FORUM = 'forum',
  CONTACT = 'contact',
}