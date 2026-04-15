# 📋 Discussion Guide: Role-Based UI Architecture & Data Strategy

**Meeting Objective:** To align the clinical requirements of the CPAP dashboard with practical, human-centered UI/UX design. We aim to implement "Progressive Disclosure" to ensure each stakeholder sees only the data required for their specific role, preventing survey and data fatigue.

---

### 1. The Physician View: Clinical Governance & High-Risk Oversight
**The Concept:** Physicians act as the final safety gate. To prevent alert fatigue, they should not see routine technical issues; they focus on pathological trends and critical physiological deterioration.

*   **UI Execution (Progressive Disclosure):**
    *   **The Critical Queue:** The default view is filtered strictly to patients with a **Risk Score of 8+ (Critical)**.
    *   **Deep Physiological Insights:** Clicking a patient expands the view to show "Non-Adjustable" metrics: **HRV instability** and **ODI (Oxygen Desaturation Index)** fluctuations.
    *   **AI Reasoning Summary:** A plain-text explanation of *why* the AI flagged the patient (e.g., *"HRV drop detected alongside increased AHI, suggesting autonomic strain rather than technical leak"*).
    *   **The Override Interface:** A module to officially Approve, Modify, or Reject the AI's suggested therapy titration (MDP model).
*   **Question for Yasaman:** *"Should we strictly limit the default view to '8+ Critical' patients, or do you require a secondary 'Watchlist' for 'High Risk' (5-7) patients who are trending upward?"*

---

### 2. The Technician View: Tactical Execution & Adjustable Metrics
**The Concept:** Technicians are the front-line "mechanics." They focus on removing technical barriers to adherence (Leak % and Usage Duration) using the 8-type intervention taxonomy.

*   **UI Execution (Prioritized Task Queue):**
    *   **Priority Ranking:** A list of patients in the **Moderate (3-4)** to **High (5-7)** risk tiers, prioritized by "Dropout Probability" (e.g., patients in the 'Attempter' cluster).
    *   **The Visit Preparation Card:** Before a call or visit, the UI displays:
        1.  **Mechanism Flag:** (e.g., "Mouth Leak detected").
        2.  **Required Tooling:** (e.g., "Bring Full-Face Mask, Size M").
        3.  **Suggested Action:** One of the 8 Taxonomy types (e.g., *Technical* or *Educational*).
    *   **The 7-Day Symmetric Window:** A specialized chart comparing usage 7 days before vs. 7 days after an intervention to prove efficacy.
*   **Question for Yasaman:** *"For the Mechanism Flags, can we confirm the backend will provide specific mask/equipment suggestions so the Technician arrives at the home already prepared with the correct gear?"*

---

### 3. The Patient View: Engagement & The Survey Split
**The Concept:** Patients need a mobile-first, gamified experience. We must protect their time by splitting surveys into "Micro" (monitoring) and "Milestone" (medical) formats.

*   **UI Execution:**
    *   **The "Streak" Dashboard:** Simple progress bars showing usage streaks and phase movement (e.g., moving from "Attempting" to "Adherent").
    *   **The Video Guidance Engine:** If a "Mechanism Flag" (like a leak) is detected, the app pushes a **60-second instructional video** to resolve the issue autonomously.
    *   **The Survey Split:**
        *   **Monitoring Micro-Surveys:** Single-question pop-ups triggered by AI flags (e.g., *"We noticed a leak; did you wake up with a dry mouth?"*).
        *   **Medical Milestone Wizard:** Low-frequency clinical baselines (ESS, PSQI, SF-36) delivered one question at a time with large tap targets.
*   **Question for Yasaman:** *"For the 'Medical Surveys', what is the exact milestone frequency you require (e.g., Day 0, Day 30, Day 90)? Also, should the Micro-Surveys be strictly triggered by telemetry flags, or should there be a random sampling component?"*

---

### 4. Bottom-Up Alignment (Data Reality Check)
**The Concept:** Ensuring the UI matches the actual data streams available from the hardware and backend.

*   **Question for Siamak:** *"As I finalize the wireframes for the Physician's HRV charts and the Technician's Mechanism Flags, are the current hardware sensors and backend API fully capable of providing these specific data points reliably and in near-real-time?"*
