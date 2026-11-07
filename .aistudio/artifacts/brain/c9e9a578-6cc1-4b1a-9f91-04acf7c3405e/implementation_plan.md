# NammaFix-AI: Bengaluru Civic Infrastructure Platform

An intelligent civic issue reporting, geospatial ward routing, and verified resolution platform for Bengaluru, empowering citizens and BBMP officials with AI-driven before/after validation to eliminate ghost resolutions.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural and UX choices have been confirmed for the NammaFix-AI platform:
> - **Confirmed Scope**: Focus on 7 major Bengaluru pilot wards (Koramangala, Indiranagar, Whitefield, Jayanagar, MG Road/CBD, Hebbal, Malleshwaram) with realistic ward metadata and officials.
> - **Confirmed Verification**: Strict AI Before/After photo comparison with human auditor sign-off to prevent ghost resolutions.
> - **Confirmed Gamification**: Civic points, badges (e.g. Namma Rakshaka), and monthly BBMP citizen awards.

---

## 1. Overview & Core Concept

### What It Does
NammaFix-AI enables citizens of Bengaluru to report civic infrastructure issues (potholes, uncollected garbage, streetlight failures, water leaks, open drains) with precise geolocation and photo evidence. Five simulated AI agents process the reports (Vision Analysis, Duplicate Detection, Priority Assessment, Department Routing, Follow-up Auditor) and route them to BBMP ward engineers.

### Target Audience & Persona
- **Citizens (Namma Citizens)**: Everyday residents looking for a transparent, fast track to get civic problems fixed in their neighborhood.
- **BBMP Ward Engineers & Zonal Commissioners**: Municipal officials managing work orders, dispatching field crews, and uploading resolution photos.
- **AI Auditors / Civic Watchdogs**: Verifying that resolved complaints actually show fixed infrastructure rather than false closures.

### Key Value
- **Zero Ghost Resolutions**: Automated Gemini Vision AI comparison between initial citizen reports and closure evidence.
- **Accountability & Transparency**: Real-time tracking across 7 key Bengaluru zones and wards with resolution SLAs.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Interactive Geospatial Feed & Map**: Users view reported issues on an interactive Bengaluru map and filter by category, ward, or status (Reported, AI Verified, In Progress, Resolved).
2. **AI-Powered Report Flow**: Citizens upload/select a photo, input landmark/address, select category and ward, and instantly run AI Verification and auto-routing.
3. **Upvoting & Community Engagement**: Citizens upvote pressing issues to boost priority and comment on progress.
4. **BBMP Action Portal (Official View)**: Municipal officers review incoming AI-verified tickets, update work statuses (Dispatched, In Progress), and upload "After" completion photos.
5. **Ward Analytics & Leaderboard**: Track ward performance (resolution rate, average days) and top civic contributors.

### Visual Identity & Theme
- **Aesthetic Direction**: Clean, authoritative, utilitarian civic SaaS dashboard tailored for Bengaluru municipal administration (Bangalore Orange, Amber accent, Deep Slate, and crisp white card surfaces).
- **Color Palette**: 
  - Dominant Neutral: `#F8FAFC` (Slate 50) canvas with `#0F172A` (Slate 900) headers.
  - Accent: `#F97316` (Orange 500) and `#F59E0B` (Amber 500) for civic calls to action and verification badges.
  - Semantic Status: Emerald for resolved, Amber for in-progress, Crimson for emergency priorities.
- **Typography**: `Plus Jakarta Sans` for clean headings and UI chrome, paired with `JetBrains Mono` / `tabular-nums` for issue IDs, dates, and coordinates.
- **Component Styling**: Single-elevation flat cards with subtle 1px borders (`border border-slate-200`), generous 16px+ padding, zero pill-badge sandwiches, clean unboxed metadata with `·` separators.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Simulated AI Agents vs External API Latency**
  - *Chosen Approach*: Robust simulated AI agents with realistic processing delays (Gemini Vision confidence scoring, duplicate cluster detection, priority escalation).
  - *Why*: Ensures instant reliability and snappy UX in the browser preview while accurately modeling production agentic workflows.
- **Decision 2: Local State Persistence with Mock Seeding**
  - *Chosen Approach*: React state initialized with comprehensive Bengaluru mock issues and wards, supporting full CRUD (reporting, upvoting, status updates, commenting).
  - *Why*: Provides an immersive, fully interactive experience immediately upon opening without requiring external DB bootstrapping.

---

## 4. Technical Architecture & Data Strategy

### Architecture & Component Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                       NammaFix-AI App                       │
│  (React 18 SPA + Tailwind CSS + Lucide Icons + Confetti)    │
└──────────────────────────────┬──────────────────────────────┘
                               │
       ┌───────────────────────┼───────────────────────┐
       ▼                       ▼                       ▼
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│  Civic Feed  │       │  Ward Map &  │       │ BBMP Action  │
│  & Filtering │       │ Geospatial   │       │ Portal & AI  │
│              │       │ Inspector    │       │ Ghost Check  │
└──────────────┘       └──────────────┘       └──────────────┘
       │                       │                       │
       └───────────────────────┼───────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    Shared App State & Mock Store            │
│         (Issues, Wards, Leaderboard, Comments, Filter)      │
└─────────────────────────────────────────────────────────────┘
```

### Data Model & State
- **Issue Entity**: ID, title, description, category, ward, address, lat, lng, photoUrl, afterPhotoUrl, status, priority, upvotes, aiConfidence, aiSummary, reportedBy, createdAt, estimatedDays, assignedOfficial, comments.
- **WardInfo Entity**: Name, zone, totalIssues, resolvedIssues, avgResolutionDays, officialInCharge.
- **LeaderboardUser Entity**: ID, name, ward, points, reportsCount, verifiedCount, badge.

### Interactive Component & State Mapping
- **Report Modal**: Controlled form inputs with category selector, ward dropdown, photo picker, and simulated Gemini Vision AI validation trigger.
- **Feed & Filters**: Client-side filtering by search query, category, ward, and status tab.
- **Detail Modal**: Interactive issue viewer displaying AI summary, before/after photos, comment thread with role badges (Citizen, BBMP Official, AI Auditor), and upvote counter.
- **BBMP Admin Portal**: Official workflow to advance issue status (Reported -> In Progress -> Resolved -> Closed & Verified with AI audit).
