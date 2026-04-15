# Week 1 Research Report: Dashboard Functional Requirements

## Clinical Logic, Risk Models, and User Personas

This document outlines the core functional requirements for the CPAP Adherence Dashboard, derived from the foundational PhD research (CBMS, DASA, and BHI papers).

---

### 1. Core Dashboard Visualizations & Logic

The dashboard must serve as a Clinical Decision Support System (CDSS) by visualizing four primary AI-driven outputs:

#### A. Patient Risk (Weekly Composite Score)

* **The Scale:** A unified risk score ranging from **0 to 8 or greater**.
* **Thresholds & UI Triggers:**
  * **0–2 (Low Risk):** Green indicator. Normal monitoring.
  * **3–4 (Moderate Risk):** Yellow indicator. Triggers "Monitoring Enhancements" for Technicians.
  * **5–7 (High Risk):** Orange indicator. Triggers "Automated Medical Procedures" (system-level alerts).
  * **8+ (Critical Risk):** Red indicator. Demands **Immediate Physician Attention**.
* **Logic Source:** The score is a fusion of CPAP telemetry (Usage, AHI, Leak) and digital biomarkers (HRV instability).

#### B. Dropout Prediction

* **Mechanism:** Tracking patient movement between **6 refined profiles**:
  1. Adherent - Low Risk
  2. Adherent - High Risk
  3. Attempters - High Priority
  4. Attempters - Low Priority
  5. Non-Adherent
  6. Unknown
* **Early Warning System:** The UI must flag "Early Instability" within the first **7–14 days** of therapy. A move from an *Adherent* cluster to an *Attempter* cluster triggers a dropout prediction alert.

#### C. Intervention Recommendations (Next-Best Action)

* **Taxonomy:** The dashboard must suggest actions from an **8-type taxonomy**:
  1. *Educational:* Training on CPAP benefits.
  2. *Technical:* Fixing mask leaks or pressure settings.
  3. *Behavioral:* Adjusting sleep habits.
  4. *Motivational:* Nudges to increase usage.
  5. *Supportive:* Emotional or clinical support.
  6. *Escalation:* Moving to physician-led care.
  7. *Structured Follow-up:* Scheduled check-ins.
  8. *Administrative:* Equipment logistics.
* **Delivery Modes:** Suggestions must include the channel: **Visit, Call, or SMS**.
* **Efficacy Tracking:** The UI must display the impact of these interventions using a **7-day symmetric window** (comparing metrics 7 days before vs. 7 days after).

#### D. Therapy Phases

* **The Journey:** The dashboard must visually track the patient through **4 distinct phases**:
  1. **New:** Initial onboarding and baseline setting.
  2. **Adherent:** Stable therapy maintenance.
  3. **Attempting:** Unstable usage requiring active intervention.
  4. **Non-Adherent:** Therapy disengagement/recovery phase.

---

### 2. User Role Definitions & Operational Deep Dives

The dashboard provides three distinct interfaces, each built to support a specific clinical and operational workflow:

#### A. The Physician (Clinical Validator)
**Primary Objective:** Safety oversight and diagnostic validation for the most critical patients.

*   **Operational Deep Dive:**
    *   **Final Safety Gate:** Acts as the definitive decision-maker for patients reaching the **Critical Risk threshold (8+)**.
    *   **Pathological Validation:** Differentiates between technical noise (e.g., mask leak) and true **Physiological Deterioration** (e.g., HRV instability signaling autonomic strain).
    *   **Therapy Titration Authority:** Holds "Override" power over AI-suggested changes, ensuring automated titration (MDP model) aligns with clinical judgment.
*   **Exact UI Features & Dashboard Focus:**
    *   **Critical Patient Filter:** A view exclusively filtered for patients with a Risk Score of **8 or higher**.
    *   **Deep-Dive Physiological Charts:** High-detail charts showing pathology-induced changes, specifically HRV drops and ODI fluctuations.
    *   **Full Pattern Sheet:** A comprehensive view showing all data streams, escalation timelines, and intervention history with outcomes.
    *   **Clinical Validation Interface:** A module containing the AI's recommendation history alongside an **"Override Log"** for approving, modifying, or rejecting therapy changes.

#### B. The Technician (Operational Manager / Homecare Provider)
**Primary Objective:** Daily patient management and eliminating technical barriers to adherence.

*   **Operational Deep Dive:**
    *   **Pre-emptive Troubleshooting:** Uses "Mechanism Flags" to arrive at a patient contact (visit/call) already knowing the likely fix (e.g., bringing a specific mask type for a mouth leak).
    *   **Intervention Lifecycle:** Executes and logs the **8-Type Taxonomy** (Educational, Technical, etc.), transforming AI recommendations into real-world actions.
    *   **Metric Stewardship:** Focuses exclusively on improving "Adjustable" parameters: **Leak %** and **Usage Duration**.
*   **Exact UI Features & Dashboard Focus:**
    *   **Patient Priority List:** A queue of patients ordered by urgency (ranking Moderate to High risk).
    *   **Visit Preparation Card:** A specific UI card showing the patient's risk tier, dropout probability, recommended action, and **mask/equipment suggestions based on mechanism flags**.
    *   **Technical Metrics View:** Charts strictly focused on "Adjustable" parameters: Leak % evolution and a **7-day usage bar chart**.
    *   **Intervention Queue:** A task list for logging which of the 8 intervention types were performed and recording the outcomes.

#### C. The Patient (End-User)
**Primary Objective:** Engagement, self-reporting, and long-term adherence motivation.

*   **Operational Deep Dive:**
    *   **Daily Adherence Ownership:** Responsible for maintaining "Compliance Streaks," moving from "Attempting" phases into stable "Maintenance."
    *   **Subjective Data Feedback:** Provides the human context (via PROMs) that telemetry misses, such as daytime sleepiness or quality of life.
    *   **Autonomous Problem Solving:** Engages with **Targeted Coaching** (triggered videos) to resolve minor issues like mask fit without professional intervention.
*   **Exact UI Features & Dashboard Focus:**
    *   **Mobile-Optimized Interface:** Built for seamless operation on mobile devices (participatory design).
    *   **Therapy Progress Module:** Simplified progress bars and gamified **"Streak" counters** explaining progress in simple language.
    *   **Video Guidance Engine:** Interface receiving targeted coaching videos triggered by risk flags (e.g., "Mask Fit" video for high leak). Includes a play button and a **post-video feedback prompt** (star rating + "was this helpful").
    *   **Medical Survey Input:** Form-based interface for submitting self-reported surveys (ESS, FSS, PSQI).

---

### 3. Clinical Validation Articles (External Evidence)

To support the dashboard framework, external clinical research confirms the efficacy of the proposed multi-role, telemedicine-based approach and provides specific architectural/logic constraints.

| Paper Name               | Link                                                              | Key Dashboard Takeaway                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :----------------------- | :---------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Aalaei et al. (2022)** | [PMC9235202](https://pmc.ncbi.nlm.nih.gov/articles/PMC9235202/)   | **UX & App Architecture:** Uses a **participatory design** approach to validate the 3-portal architecture (Patient, Tech, Doctor). Dictates strict UI constraints for older demographics (large fonts, simple navigation, "store-and-forward" offline survey capabilities). Emphasizes that the system must provide immediate contextual feedback (e.g., auto-triggering educational content or implied video guidance when a mask leak is logged).                      |
| **Svaža et al. (2024)**  | [PMC10856483](https://pmc.ncbi.nlm.nih.gov/articles/PMC10856483/) | **AI Decision Engine Validation:** Validates the use of Clinical Decision Support Systems (CDSS) powered by **Markov Decision Processes (MDP)**. Although the study applies this AI to oxygen/BiPAP titration, it clinically proves the exact mathematical architecture our dashboard uses: continuously tracking patient states (via biomarkers like SpO2 and Apnea) to safely and automatically trigger a "Next-Best Action" without requiring manual human guesswork. |

---

### Summary of Source Attribution

* **Logic & Phases:** Derived from *CBMS_yasaman.pdf*.
* **Taxonomy & Windows:** Derived from *DASA-Paper-Final.pdf*.
* **Refined Profiles:** Derived from *BHI-2024295868.pdf*.
* **UX & Architecture:** Derived from *Aalaei et al. (2022)*.
* **AI Decision Logic:** Derived from *Svaža et al. (2024)*.
