# Frontend Component Specification: Master Dashboard Blueprint

This document serves as the primary technical specification for the Dashboarding project, bridging the gap between clinical research and React component implementation.

---

## 0. Global UI Strategy: Progressive Disclosure
To prevent data fatigue, the interface follows a "Progressive Disclosure" model. Stakeholders are presented with critical summaries by default, with high-density data accessible only through intentional drill-downs.

### A. The Global "AI Weekly State" Panel
This persistent panel (sidebar or top-bar) appears on all patient-centric tabs to provide immediate context:
*   **Risk Tier Badge:** Dynamic color coding (`Green`: 0-2, `Yellow`: 3-4, `Orange`: 5-7, `Red`: 8+).
*   **Fused Score Gauge:** A radial gauge showing the composite 0–8+ score.
*   **Phase Label:** Current therapy stage (`Onboarding`, `Optimization`, or `Maintenance`).
*   **Day-to-Dropout Counter:** A "T-minus" style countdown for patients flagged with high dropout probability.
*   **Active Flags:** Text-based chips for specific alerts (`Leak Instability`, `Usage Decay`, `Residual Burden`).
*   **Confidence Indicator:** A percentage or "High/Med/Low" badge reflecting the reliability of the current flags.

---

## 1. The Physician View: Clinical Governance & Oversight
**UX Goal:** High-stakes decision support; focus on "Non-Adjustable" physiological deterioration.

*   **Key Components:**
    *   **The Critical Queue:** Default landing page filtered strictly to patients with Risk Score **8+**.
    *   **Medical Procedure Signature:** A secure UI module for physicians to digitally "sign off" on titration changes.
    *   **The Override Interface:** A table-based log for `Approve`, `Modify`, or `Reject` actions on suggested therapy changes, including a `Reason Code` dropdown.
    *   **Deep-Dive Pattern Sheet:** A full-screen view overlaying **HRV instability** and **ODI (Oxygen Desaturation Index)** fluctuations (Source: **Masimo/Hexoskin**).
    *   **Evidence-Insufficient Alert:** A banner that appears when confidence is low, featuring a `Request Sensing` button to prompt the patient for a new survey or device sync.

---

## 2. The Technician View: Tactical Dispatch & Logistics
**UX Goal:** Operational readiness; eliminating technical barriers (Leak & Usage).

*   **Key Components:**
    *   **Visit Preparation Card:** A high-impact briefing card for home visits:
        *   **Mechanism Flag:** Bold text (e.g., *"Mouth Leak Detected"*).
        *   **Logistics Check:** Icon-driven list (e.g., `[Mask Icon] Bring Full-Face Mask, Size M`).
        *   **Dropout Probability Badge:** (e.g., *"85% Probability of Dropout"*).
    *   **Intervention Timeline:** A sequence chain display showing the **last 3 interventions** and a `Pending Interventions` counter.
    *   **7-Day Symmetric Window Chart:** A mirrored bar chart comparing the 7 days *before* an intervention to the 7 days *after* to prove technical efficacy.
    *   **Cohort Reporting Table:** A sortable table of all assigned patients, filterable by the **6 Refined Profiles** (e.g., *Attempter - High Priority*).

---

## 3. The Patient View: Mobile-First Engagement
**UX Goal:** Accessibility for older demographics; motivation through gamification.

*   **Accessibility Standards (Aalaei et al., 2022):**
    *   **Large Typography:** Minimum 18px body text; high-contrast color palettes (WCAG AA).
    *   **Simple Navigation:** Bottom-tab bar with maximum 4 icons; no nested menus.
    *   **Store-and-Forward Logic:** UI must support "Offline Mode" for surveys, with a `Sync Pending` indicator.

*   **Key Components:**
    *   **Activity Rings:** Visual "Streaks" that fill as the patient nears the 4-hour daily usage goal.
    *   **Video Guidance Engine:** An inline player for **60-second instructional videos** triggered by telemetry flags (e.g., a "Mask Fit" video). Features a `Was this helpful?` star-rating prompt post-watch.
    *   **The Survey Split:**
        *   **Micro-Surveys:** 1-tap "Toast" cards (e.g., *"Dry mouth today?"* `[Yes/No]`).
        *   **Medical Milestone Wizard:** A multi-step wizard for complex forms (SF-36, BDI) delivered at specific intervals (**Day 0, 30, 90**). Features `One Question Per Screen` and a `Previous Data` indicator (e.g., *"Using response from Jan 1st"*).

---

## 4. Tab-Specific Metric Requirements
*   **CPAP Tab:** Includes a `Data Gap Alert Banner` for nights where the machine was not used.
*   **Digital Biomarkers Tab:** Features a `Per-Source Availability Indicator` (Withings vs. Hexoskin) and a `Quality Flag` that dims charts if data is noisy.
*   **Reporting Tab:** Summary view of `Intervention Effectiveness` (Δusage) across the entire patient cohort.
