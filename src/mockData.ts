import { Issue, WardInfo, LeaderboardUser } from './types';

export const BENGALURU_WARDS: WardInfo[] = [
  { name: 'Koramangala (Ward 151)', zone: 'South Zone', totalIssues: 34, resolvedIssues: 29, avgResolutionDays: 3.2, officialInCharge: 'Rajesh Kumar (BESCOM/BBMP)' },
  { name: 'Indiranagar (Ward 80)', zone: 'East Zone', totalIssues: 42, resolvedIssues: 38, avgResolutionDays: 2.8, officialInCharge: 'Sridevi Rao (BBMP)' },
  { name: 'Whitefield (Ward 84)', zone: 'Mahadevapura Zone', totalIssues: 68, resolvedIssues: 45, avgResolutionDays: 5.1, officialInCharge: 'Anand Murthy (BWSSB)' },
  { name: 'Jayanagar (Ward 169)', zone: 'South Zone', totalIssues: 19, resolvedIssues: 18, avgResolutionDays: 2.1, officialInCharge: 'Manjunath Swamy (BBMP)' },
  { name: 'MG Road / CBD (Ward 111)', zone: 'West Zone', totalIssues: 25, resolvedIssues: 24, avgResolutionDays: 1.9, officialInCharge: 'Priya Sharma (BBMP Central)' },
  { name: 'Hebbal (Ward 20)', zone: 'Yelahanka Zone', totalIssues: 31, resolvedIssues: 22, avgResolutionDays: 4.4, officialInCharge: 'K. N. Gowda (BBMP)' },
  { name: 'Malleshwaram (Ward 65)', zone: 'West Zone', totalIssues: 15, resolvedIssues: 15, avgResolutionDays: 2.0, officialInCharge: 'Vinayak Hegde (BBMP)' },
];

export const INITIAL_ISSUES: Issue[] = [
  {
    id: 'NF-8492',
    title: 'Massive crater near Sony World Junction',
    description: 'A 3-foot wide pothole filled with rainwater after last night thunder shower. Causing bike skidding and severe traffic jam.',
    category: 'Pothole',
    ward: 'Koramangala (Ward 151)',
    locationAddress: '80 Feet Road, Near Sony World Signal, Koramangala',
    lat: 12.9352,
    lng: 77.6245,
    photoUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f8?auto=format&fit=crop&w=800&q=80',
    status: 'In Progress',
    priority: 'Emergency',
    upvotes: 142,
    aiConfidence: 0.98,
    aiSummary: 'High severity pothole detected via computer vision. Confirmed hazard to two-wheelers. Assigned to South Zone Asphalt Team.',
    reportedBy: 'Kiran Patil',
    createdAt: '2026-11-04T10:30:00Z',
    estimatedDays: 2,
    assignedOfficial: 'Rajesh Kumar',
    comments: [
      { id: 'c1', author: 'Rajesh Kumar', role: 'BBMP Official', text: 'Asphalt patching truck dispatched. Will be fixed by tomorrow morning.', createdAt: '2026-11-04T12:00:00Z' },
      { id: 'c2', author: 'Suresh Menon', role: 'Citizen', text: 'Thank you! Two scooters already slipped here yesterday.', createdAt: '2026-11-04T12:30:00Z' }
    ]
  },
  {
    id: 'NF-7381',
    title: 'Uncollected garbage heap blocking footpath',
    description: 'Commercial waste and plastic bags piled up near 100ft road junction for 4 days. Stray dogs tearing bags apart.',
    category: 'Garbage Dump',
    ward: 'Indiranagar (Ward 80)',
    locationAddress: '12th Main Rd, HAL 2nd Stage, Indiranagar',
    lat: 12.9716,
    lng: 77.6412,
    photoUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
    status: 'AI Verified',
    priority: 'High',
    upvotes: 98,
    aiConfidence: 0.95,
    aiSummary: 'Image verified as organic and inorganic municipal waste accumulation. Health hazard level: Moderate-High.',
    reportedBy: 'Deepika Ramesh',
    createdAt: '2026-11-05T08:15:00Z',
    estimatedDays: 1,
    assignedOfficial: 'Sridevi Rao',
    comments: [
      { id: 'c3', author: 'Sridevi Rao', role: 'BBMP Official', text: 'Compactor vehicle route updated to pick up this spot today at 2 PM.', createdAt: '2026-11-05T09:00:00Z' }
    ]
  },
  {
    id: 'NF-6290',
    title: 'Non-functional streetlights on Outer Ring Road service lane',
    description: 'Four consecutive smart poles are completely dark creating a dark spot prone to chain-snatching.',
    category: 'Streetlight Failure',
    ward: 'Whitefield (Ward 84)',
    locationAddress: 'ITPL Main Rd, near Ascendas Park Square Mall',
    lat: 12.9855,
    lng: 77.7402,
    photoUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80',
    status: 'Reported',
    priority: 'Medium',
    upvotes: 64,
    aiConfidence: 0.91,
    aiSummary: 'Low luminance detected in geo-tagged photo. BESCOM maintenance ticket auto-generated.',
    reportedBy: 'Vikramaditya',
    createdAt: '2026-11-05T19:45:00Z',
    estimatedDays: 3,
    assignedOfficial: 'Anand Murthy',
    comments: []
  },
  {
    id: 'NF-5104',
    title: 'Drinking water pipeline leakage wasting thousands of litres',
    description: 'BWSSB supply pipe joint has cracked, water gushing onto the asphalt creating artificial stream.',
    category: 'Water Leakage',
    ward: 'Jayanagar (Ward 169)',
    locationAddress: '4th Block, 9th Main, Jayanagar',
    lat: 12.9250,
    lng: 77.5838,
    photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f86f6?auto=format&fit=crop&w=800&q=80',
    status: 'Resolved (Pending AI Check)',
    priority: 'High',
    upvotes: 115,
    aiConfidence: 0.97,
    aiSummary: 'Water flow detected. BWSSB emergency valve shut-off recommended.',
    reportedBy: 'Meenakshi Iyer',
    createdAt: '2026-11-03T14:20:00Z',
    afterPhotoUrl: 'https://images.unsplash.com/photo-1584467735811-62862d3a334c?auto=format&fit=crop&w=800&q=80',
    estimatedDays: 1,
    assignedOfficial: 'Manjunath Swamy',
    comments: [
      { id: 'c4', author: 'Manjunath Swamy', role: 'BBMP Official', text: 'Pipe clamp replaced and road restored.', createdAt: '2026-11-04T16:00:00Z' },
      { id: 'c5', author: 'AI Auditor', role: 'AI Auditor', text: 'Awaiting AI visual comparison of before/after photos to prevent ghost resolution.', createdAt: '2026-11-04T16:05:00Z' }
    ]
  },
  {
    id: 'NF-4192',
    title: 'Open storm water drain without concrete slab cover',
    description: 'Dangerous open drain gap right outside apartment gate. Toddler safety risk.',
    category: 'Drainage Overflow',
    ward: 'Hebbal (Ward 20)',
    locationAddress: 'Outer Ring Road, near Hebbal Flyover',
    lat: 13.0358,
    lng: 77.5970,
    photoUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    status: 'Closed & Verified',
    priority: 'Emergency',
    upvotes: 189,
    aiConfidence: 0.99,
    aiSummary: 'High danger uncovered Rajakaluve drain edge. Immediate barricading and slab placement ordered.',
    reportedBy: 'Sanjay Hebbar',
    createdAt: '2026-11-01T09:00:00Z',
    afterPhotoUrl: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=800&q=80',
    estimatedDays: 2,
    assignedOfficial: 'K. N. Gowda',
    comments: [
      { id: 'c6', author: 'AI Auditor', role: 'AI Auditor', text: 'AI comparison confirmed precast concrete slab installed. Resolution verified.', createdAt: '2026-11-02T18:00:00Z' }
    ]
  }
];

export const LEADERBOARD: LeaderboardUser[] = [
  { id: 'u1', name: 'Sanjay Hebbar', ward: 'Hebbal (Ward 20)', points: 1450, reportsCount: 28, verifiedCount: 26, badge: 'Namma Rakshaka 🛡️' },
  { id: 'u2', name: 'Kiran Patil', ward: 'Koramangala (Ward 151)', points: 1280, reportsCount: 22, verifiedCount: 20, badge: 'Civic Champion ⭐' },
  { id: 'u3', name: 'Meenakshi Iyer', ward: 'Jayanagar (Ward 169)', points: 950, reportsCount: 17, verifiedCount: 16, badge: 'Active Citizen 🚲' },
  { id: 'u4', name: 'Deepika Ramesh', ward: 'Indiranagar (Ward 80)', points: 820, reportsCount: 14, verifiedCount: 13, badge: 'Active Citizen 🚲' },
  { id: 'u5', name: 'Vikramaditya', ward: 'Whitefield (Ward 84)', points: 710, reportsCount: 12, verifiedCount: 11, badge: 'Spotter 🔍' },
];
