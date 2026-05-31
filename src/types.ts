export type ActiveTab =
  | 'overview'
  | 'compliance'
  | 'matching'
  | 'policy'
  | 'monitoring'
  | 'experts'
  | 'learning'
  | 'events'
  | 'global';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export interface Expert {
  id: string;
  name: string;
  title: string;
  avatar: string;
  tags: string[];
  online: boolean;
  score: number;
  consultationCount: number;
  introduction: string;
}

export interface MatchingPost {
  id: string;
  type: 'supply' | 'demand';
  title: string;
  company: string;
  industry: string;
  budget?: string;
  details: string;
  contact: string;
  date: string;
  tags: string[];
}

export interface Policy {
  id: string;
  title: string;
  department: string;
  publishDate: string;
  dueDate: string;
  level: '国家级' | '省级' | '市级';
  category: '税收优惠' | '资金扶持' | '科技创新' | '人才引进' | '合规治理';
  summary: string;
  subsidyEstimate: string;
  conditions: string[];
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  progress: number;
  totalHours: number;
  completedHours: number;
  category: string;
  lessons: string[];
}

export interface EventItem {
  id: string;
  title: string;
  organizer: string;
  date: string;
  time: string;
  location: string;
  price: string;
  tags: string[];
  participants: number;
}
