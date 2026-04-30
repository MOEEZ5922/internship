# Front-End Functional Design Document
## SleepCare Platform — Linde Homecare France

**Author:** Moeez Ahmed
**Date:** April 29, 2026
**Status:** Week 1 Deliverable
**Backend API:** https://cpap-backend.onrender.com/docs

---

## 1. Project Setup Summary

| Item | Status | Detail |
|:---|:---|:---|
| **Framework** | ✅ Done | React 18 + TypeScript |
| **Build Tool** | ✅ Done | Vite 6.3.5 |
| **Styling** | ✅ Done | TailwindCSS 4.1.12 |
| **Routing** | ✅ Done | React Router 7.13.0 |
| **Charts** | ✅ Done | Recharts 2.15.2 |
| **Icons** | ✅ Done | Lucide React 0.487.0 |
| **Git** | ⬜ To Do | Initialize repository |
| **GitHub Actions** | ⬜ To Do | Configure CI/CD pipeline |
| **API Connection** | ⬜ To Do | Replace mockData.ts with live fetch calls to Siamak's API |

---

## 2. Screen Logic & Navigation Architecture

### 2.1 Entry Point: Role Selector (`/`)
The application opens to a role selection screen offering three portals. Each portal has its own layout, navigation sidebar, and patient sub-routes.

```
/ ─── Role Selector
├── /physician ─── Physician Layout
│   ├── (index) ─── Exception Inbox (Home)
│   ├── /directory ─── Patient Directory
│   ├── /help ─── Help & Resources
│   └── /patient/:id ─── Patient Detail Layout
│       ├── (index) ─── Clinical Summary
│       ├── /trends ─── CPAP Usage Trends
│       ├── /biomarkers ─── Biomarker Monitoring
│       ├── /interventions ─── Intervention Cockpit
│       ├── /surveys ─── Survey Review
│       └── /ai-analysis ─── AI Weekly Analysis
│
├── /technician ─── Technician Layout
│   ├── (index) ─── Workbench (Home)
│   ├── /inventory ─── Equipment Inventory
│   ├── /help ─── Help & Resources
│   └── /patient/:id ─── Patient Detail Layout
│       ├── (index) ─── Technical Summary
│       ├── /trends ─── CPAP Usage Trends
│       ├── /interventions ─── Intervention Cockpit
│       ├── /surveys ─── Monitoring Desk
│       ├── /biomarkers ─── Biomarker Monitoring
│       ├── /ai-analysis ─── AI Weekly Analysis
│       └── /devices ─── Biomarker Device Management
│
└── /patient ─── Patient Layout
    ├── (index) ─── Home (Engagement Hub)
    ├── /cpap ─── My CPAP Data
    ├── /interventions ─── My Care Plan
    ├── /surveys ─── My Surveys
    ├── /videos ─── Coaching Videos
    └── /help ─── Help & Support Tickets
```

### 2.2 Screen Logic Per Portal

#### Physician Portal
| Screen | Logic | Primary Data Source |
|:---|:---|:---|
| **Exception Inbox** | Master-detail layout. Left pane: two tabs (Urgent AI Escalations, Annual Reviews). Right pane: embedded `SummaryContent` for the selected patient. Click "Full Patient View" to navigate into patient sub-routes. | `GET /api/v1/physician/queue` |
| **Patient Summary** | Clinical cockpit: demographics, risk score, therapy status, CPAP snapshot, biomarker summary, recent interventions. | `GET /api/v1/patient/{id}/summary` |
| **CPAP Trends** | AHI trend chart, usage history bar chart, pressure settings, leak percentile, streak count, mask info. | `GET /api/v1/patient/{id}/trends/cpap` |
| **Biomarkers** | Dropdown selector for 7 biomarker channels (ODI, HRV, SpO₂, RVO, OAI, Deep Sleep, BP). Each shows source hardware, current value, 30-day average, status, and time-series chart. AI pathway summary banner at top. | `GET /api/v1/patient/{id}/biomarkers` |
| **Surveys** | Dropdown selector for 6 surveys (ESS, PSQI, ISI, FSS, SF-36, BDI). Shows score, threshold, risk badge, itemized responses, and interpretive clinical note. Below: technician field connectivity logs (read-only). | `GET /api/v1/patient/{id}/surveys` |
| **Interventions** | Unified evidence log table (date, action, outcome, actor). Pathway toggle: Complex AHI (clinical order modal) or MAD/HNS Transition (radio select + authorization rationale + digital seal submit). | `GET /api/v1/patient/{id}/interventions` |
| **AI Analysis** | 4 KPI cards (risk score, predicted dropout, AI confidence, therapy phase). Dynamic cluster assignment visualization. 7-day rolling area chart. Risk factor breakdown with directional bars. "Next Best Action" dark panel. | `GET /api/v1/patient/{id}/analysis/weekly` |

#### Technician Portal
| Screen | Logic | Primary Data Source |
|:---|:---|:---|
| **Workbench Home** | Two tabs. **Events tab:** Master-detail for AI-flagged events (Mask Leak, Usage Drop, Missed Nights, Equipment Alert, Patient Self-Report). Each event shows severity, evidence, AI note, and Validate/Dismiss controls. Dismiss requires mandatory reason text. **Queue tab:** Retention queue sorted by dropout risk, with `VisitPrepCard` detail pane showing patient context, biomarker snapshot, intervention history, and monitoring surveys. | `GET /api/v1/technician/events` + `GET /api/v1/technician/queue` |
| **Devices** | Grid of 5 biomarker device cards (Hexoskin, Masimo, Somno-Art, Withings BPM Core, Withings ScanWatch). Each shows: connection status, battery, last sync, assigned date. Actions: Unpair, Diagnostic. Bottom: Hardware Integrity Sync status panel. | `GET /api/v1/patient/{id}/devices` |
| **Shared Views** | Same Biomarkers, Surveys, Interventions, AI Analysis as Physician. The Surveys view adds "Start New Observation" button (modal: Mask Comfort & Fit, Hardware Integrity, Hygiene Review, Environment Audit). The Interventions view shows "Log New Intervention" button (modal: Equipment Dispatch, Remote Call, Home Visit, Pressure Adjust). | Same endpoints |

#### Patient Portal
| Screen | Logic | Primary Data Source |
|:---|:---|:---|
| **Home** | Priority Task banner (AI-triggered video for mask leak). Persistent survey reminder with progress bar. "Daily Pulse" micro-survey (Good/Okay/Bad). Sleep progress rings (hours + streak). Weekly summary card. Equipment delivery tracker with step indicators. Motivational tip card. | Multiple endpoints |
| **CPAP** | Simplified view of usage trends for patient consumption. | `GET /api/v1/patient/{id}/trends/cpap` |
| **Surveys** | Active survey with question-by-question flow. | `GET /api/v1/patient/{id}/surveys` |
| **Videos** | Progress bar (watched/total). "Recommended for You" section (high-relevance, trigger-based). Category filter (Mask & Equipment, Tips, Maintenance, Understanding Data, Lifestyle). Video cards with thumbnail, play, watch status, and star rating. | `GET /api/v1/patient/{id}/videos` |
| **Help** | Support ticket submission (issue type dropdown + details). | `POST /api/v1/patient/{id}/support/ticket` |

---

## 3. Component Inventory

### 3.1 Layouts (5 files)
| Component | File | Purpose |
|:---|:---|:---|
| `PhysicianLayout` | `layouts/PhysicianLayout.tsx` | Sidebar nav + outlet for physician portal |
| `TechnicianLayout` | `layouts/TechnicianLayout.tsx` | Sidebar nav + outlet for technician portal |
| `PatientLayout` | `layouts/PatientLayout.tsx` | Bottom tab nav + outlet for patient portal |
| `PhysicianPatientLayout` | `layouts/PhysicianPatientLayout.tsx` | Sub-nav tabs (Summary/Trends/Biomarkers/etc.) for physician patient detail |
| `TechnicianPatientLayout` | `layouts/TechnicianPatientLayout.tsx` | Sub-nav tabs for technician patient detail |

### 3.2 Shared Views (4 files)
| Component | File | Used By |
|:---|:---|:---|
| `UniversalBiomarkers` | `pages/shared/UniversalBiomarkers.tsx` | Physician + Technician |
| `UniversalSurveys` | `pages/shared/UniversalSurveys.tsx` | Physician + Technician |
| `UniversalInterventions` | `pages/shared/UniversalInterventions.tsx` | Physician + Technician |
| `UniversalAIAnalysis` | `pages/shared/UniversalAIAnalysis.tsx` | Physician + Technician |

### 3.3 Reusable Components (2 files + ui library)
| Component | File | Purpose |
|:---|:---|:---|
| `SummaryContent` | `components/SummaryContent.tsx` | Embeddable patient summary card (used in Exception Inbox + Event Triage detail) |
| `VisitPrepCard` | `components/VisitPrepCard.tsx` | Technician queue detail: patient context, biomarker snapshot, intervention history |

### 3.4 Page Components (17 files)
| Portal | Pages |
|:---|:---|
| **Physician** (5) | `Home.tsx`, `Summary.tsx`, `CPAP.tsx`, `Directory.tsx`, `Help.tsx` |
| **Technician** (6) | `Home.tsx`, `Summary.tsx`, `CPAP.tsx`, `Devices.tsx`, `Inventory.tsx`, `Help.tsx` |
| **Patient** (6) | `Home.tsx`, `CPAP.tsx`, `Surveys.tsx`, `Videos.tsx`, `Interventions.tsx`, `Help.tsx` |

### 3.5 Data Layer (1 file — to be replaced)
| File | Purpose | Replacement |
|:---|:---|:---|
| `data/mockData.ts` | Local mock data for all views | Replace with `fetch()` calls to `https://cpap-backend.onrender.com/api/v1/...` |

---

## 4. API Parity Matrix: Frontend vs. Siamak's Backend

Every endpoint in Siamak's backend has a corresponding frontend consumer. Here is the full mapping:

### 4.1 GET Endpoints

| Backend Endpoint | Frontend Consumer | Status |
|:---|:---|:---|
| `GET /api/v1/patients` | `PhysicianDirectory` | ✅ Matched |
| `GET /api/v1/patient/{id}/summary` | `SummaryContent`, `PhysicianSummary`, `TechnicianSummary` | ✅ Matched |
| `GET /api/v1/physician/queue` | `PhysicianHome` (Exception Inbox) | ✅ Matched |
| `GET /api/v1/technician/queue` | `TechnicianHome` (Retention Queue tab) | ✅ Matched |
| `GET /api/v1/technician/events` | `TechnicianHome` (Events tab) | ✅ Matched |
| `GET /api/v1/patient/{id}/trends/cpap` | `PhysicianCPAP`, `TechnicianCPAP`, `PatientCPAP` | ✅ Matched |
| `GET /api/v1/patient/{id}/biomarkers` | `UniversalBiomarkers` | ✅ Matched |
| `GET /api/v1/patient/{id}/devices` | `TechnicianDevices` | ✅ Matched |
| `GET /api/v1/patient/{id}/interventions` | `UniversalInterventions`, `PatientInterventions` | ✅ Matched |
| `GET /api/v1/patient/{id}/surveys` | `UniversalSurveys`, `PatientSurveys` | ✅ Matched |
| `GET /api/v1/patient/{id}/analysis/weekly` | `UniversalAIAnalysis` | ✅ Matched |
| `GET /api/v1/patient/{id}/videos` | `PatientVideos` | ✅ Matched |
| `GET /api/v1/patient/{id}/authorizations` | `UniversalInterventions` (MAD/HNS pathway) | ✅ Matched |

### 4.2 POST Endpoints

| Backend Endpoint | Frontend Consumer | Status |
|:---|:---|:---|
| `POST /api/v1/technician/events/{event_id}/triage` | `TechnicianHome` (Validate/Dismiss buttons) | ✅ Matched |
| `POST /api/v1/patient/{id}/surveys/monitoring` | `UniversalSurveys` (Technician: "Start New Observation" modal) | ✅ Matched |
| `POST /api/v1/patient/{id}/interventions` | `UniversalInterventions` (Physician: Clinical Order / Technician: Log Intervention) | ✅ Matched |
| `POST /api/v1/patient/{id}/authorizations` | `UniversalInterventions` (Physician: "Authorize Treatment Transition") | ✅ Matched |
| `POST /api/v1/patient/{id}/videos/{video_id}/interaction` | `PatientVideos` (Watch + Rate buttons) | ✅ Matched |
| `POST /api/v1/patient/{id}/surveys/{survey_id}/submit` | `PatientSurveys` | ✅ Matched |
| `POST /api/v1/patient/{id}/support/ticket` | `PatientHelp` | ✅ Matched |

**Result: 100% endpoint parity between frontend design and backend API.**

---

## 5. Remaining Tasks for Presentation

| # | Task | Priority | Effort |
|:---|:---|:---|:---|
| 1 | **Initialize Git repository** and push to GitHub | High | 15 min |
| 2 | **Create GitHub Actions workflow** for build validation on push | High | 15 min |
| 3 | **Create `api.ts` service layer** to replace `mockData.ts` with fetch calls to `https://cpap-backend.onrender.com` | High | 1–2 hrs |
| 4 | Test live API responses match expected component props | Medium | 30 min |

---

## 6. Tech Stack Summary (For Slides)

```
React 18 + TypeScript
Vite 6.3 (Build)
TailwindCSS 4.1 (Styling)
React Router 7.x (Navigation)
Recharts 2.x (Data Visualization)
Lucide React (Iconography)
Radix UI (Accessible Primitives)
─────────────────────────────
Backend: FastAPI (Python)
Host: Render.com
API: REST (OpenAPI 3.1)
```
