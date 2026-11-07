export type IssueCategory = 
  | 'Pothole' 
  | 'Garbage Dump' 
  | 'Streetlight Failure' 
  | 'Water Leakage' 
  | 'Stray Animals' 
  | 'Broken Footpath' 
  | 'Drainage Overflow';

export type IssueStatus = 'Reported' | 'AI Verified' | 'Dispatched' | 'In Progress' | 'Resolved (Pending AI Check)' | 'Closed & Verified';

export type IssuePriority = 'Low' | 'Medium' | 'High' | 'Emergency';

export interface Comment {
  id: string;
  author: string;
  role: 'Citizen' | 'BBMP Official' | 'AI Auditor';
  text: string;
  createdAt: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  ward: string;
  locationAddress: string;
  lat: number;
  lng: number;
  photoUrl: string;
  afterPhotoUrl?: string; // For AI ghost resolution check
  status: IssueStatus;
  priority: IssuePriority;
  upvotes: number;
  aiConfidence: number;
  aiSummary: string;
  reportedBy: string;
  createdAt: string;
  comments: Comment[];
  estimatedDays: number;
  assignedOfficial?: string;
}

export interface WardInfo {
  name: string;
  zone: string;
  totalIssues: number;
  resolvedIssues: number;
  avgResolutionDays: number;
  officialInCharge: string;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  ward: string;
  points: number;
  reportsCount: number;
  verifiedCount: number;
  badge: string;
}
