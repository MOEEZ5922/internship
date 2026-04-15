# **Frontend Architecture: Role-Based UI & Metric Mapping**

**Objective:** To define a clean, role-based interface for the dashboard. We need to ensure that users only see the specific metrics they need to take action. This prevents alert fatigue for clinicians and survey fatigue for patients.

### **1\. The Physician View: The "Exception-Based" Clinical Drill-Down**

**The Goal:** Physicians are the final safety gate. We want to protect their time by hiding routine mechanical issues and focusing their dashboard entirely on clinical escalations and physiological trends.

**The UI Structure (How it's displayed):**

* **\[UPDATED\] Exception-Based Inbox:** The main screen is split into two main tabs to balance emergency cases with routine check-ins:  
  * *Tab 1: Urgent Actions* highlights critical Risk 8+ patients and complex AHI alerts. *(Note: Lack of usage has been shifted to the Technician queue).*  
  * *Tab 2: Annual Reviews* serves as a separate queue for stable, low-risk patients due for their mandatory yearly visit.  
* **System-Generated Pathway Reports (Escalation Workflows):** For critical escalations, the UI generates comprehensive pathway reports rather than isolated charts. This single report UI structure provides the full biometric and behavioral context to power two distinct physician-only workflows:  
  * *Complex AHI (APPEL IAH):* An escalation module for severe AHI flow issues, allowing the physician to make clinical therapy decisions.  
  * *Alternative Therapy Authorization:* An escalation module for patients completely abandoning therapy, allowing the physician to officially authorize alternative treatments explicitly Mandibular Advancement Devices (MAD) or Hypoglossal Nerve Stimulation (HNS).  
* **\[NEW\] Intervention Viability Log:** This historical log allows the physician to explicitly review and evaluate the success or failure of all past technical interventions before they authorize a new alternative therapy.  
* **Behavioral & Psychological History:** A dedicated section inside the patient's file using a dropdown menu. The doctor can select a category (like Fatigue or Sleepiness) to instantly view the patient's past survey scores without cluttering the main screen.

**The Exact Metrics (What they see):**

* **Global Patient Context:** Basic demographic and timeline data anchored at the top of the profile, including Gender, Birthdate, Therapy Start Date, End Date (used to determine current Therapy Status) and Mask Type.  
* **Therapy Transition History:** Specifically surfacing the cancellationreason data to show internal therapy shifts, physician changes, or program cancellations.  
* **\[UPDATED\] Primary Filter (Inclusion Rules):** The Urgent inbox uses "OR" logic. A patient is pulled into this main view if they meet either of these criteria:  
  1. Their Overall Risk Score hits 8 or higher.  
  2. They trigger a complex APPEL IAH alert.  
* **Physiological Metrics:** Heart Rate Variability (HRV), Oxygen Desaturation Index (ODI), Cheyne-Stokes Respiration (CSR) duration, SpO2, and the Obstructive Apnea Index (OAI).  
* **\[UPDATED\] Behavioral Context:** The full set of 6 standardized surveys (PSQI, ISI, ESS, FSS, SF-36, BDI). *The UI dynamically adapts to display the distinct, unique scoring ranges and rubrics for each individual survey.*

### **2\. The Technician View: The Unified Priority Queue & Visit Prep**

**The Goal:** Technicians are the front-line problem solvers. Their dashboard is designed like a tactical dispatch system to help them fix physical barriers to therapy as efficiently as possible.

**The UI Structure (How it's displayed):**

* **\[UPDATED\] The Unified Priority Queue:** The daily task list is sorted by **Dropout Probability** and **Severe Lack of Usage**. This ensures the queue captures "High-Risk Adherents" (those about to drop out despite high usage), "Attempters" (those struggling with 2-4 hours of use), and "Non-Adherents" (those severely lacking usage at under 2 hours). It also displays their Postal Code to assist with geographic routing for home visits.  
* **Action Badges & Intervention Tracking:** Every patient in the queue has a visual tag indicating the required intervention channel. This maps directly to operational data (jobtype, status, and technicianId).  
* **\[NEW\] Device Logistics Tracker:** A dedicated module for technicians to strictly log the physical dispatch (deployment) and removal of devices and hardware for the patient.  
* **The Visit Prep Card:** Before calling or heading to a patient's home, the technician clicks a summary card that details the exact mechanical failure, lists the physical equipment to bring, and explicitly displays the Current Mask Type and Last Mask Change Date.  
* **Post-Visit Monitoring Log:** A section capturing the follow-up surveys (QuestionnaireId, questiontext, answervalue). *Crucial Note: Monitoring surveys are strictly locked to this Technician View and are never pushed to the Patient app.*

**The Exact Metrics (What they see):**

* **\[UPDATED\] Primary Filter:** **Dropout Probability** OR **Severe Lack of Usage / Therapy Abandonment**.  
* **Mechanical Metrics:** Mask Leakage Rates (50th, 95th, Maximum percentiles), basic AHI, Mask Type, and Mask Change Date.  
* **Usage Metrics:** CPAP Total Usage Hours per night.  
* **Patient Context:** Therapy Start Date (to contextualize how long they've had the machine) and Postal Code.

### **3\. The Patient View: The "Zero-Friction" Feed & The Survey Split**

**The Goal:** The patient interface needs to feel supportive and transparent. We want to encourage daily use, solve minor issues automatically, and collect necessary feedback to prevent "Effectful Dropouts" (quitting due to intolerance or lack of improvement).

**The UI Structure (How it's displayed):**

* **The "Next Step" Card:** A prominent banner right at the top of the mobile screen acting as a clear prompt telling the patient exactly what to do next.  
* **\[NEW\] Patient Self-Reporting Tool:** A dedicated support module allowing the patient to actively report mask issues, discomfort, or therapy resistance. This feature utilizes a dual-routing data system:  
  * Actionable Alert: The patient's report triggers an alert in the Technician's Priority Queue for immediate intervention.  
  * AI Data Feed: The reported symptoms are simultaneously fed into the system's AI framework as behavioral feedback to dynamically update the patient's Dropout Probability risk score.  
* **Visual Progress:** We use simple visuals, like closing activity rings, rather than intimidating medical charts to show their daily adherence and therapy phase progress.  
* **Auto-Triggered Video Help:** If the machine logs a minor mechanical issue, the app automatically pushes a quick, bite-sized "How to fix your mask" training video to the top of the patient's screen.  
* **The "Survey Split":** Since intolerance is a major reason patients quit, we split feedback collection into two distinct UI features to prevent survey fatigue:  
  * *Micro-Surveys:* Quick, one-tap pop-ups triggered by machine data.  
  * *Milestone Wizards:* For the longer clinical forms, we use a clean "one-question-per-screen" wizard that only appears at specific intervals.

**The Exact Metrics (What they see):**

* **Simplified Adherence:** Daily usage summaries (hours slept) and consecutive usage streaks.  
* **Medical Questionnaires (Milestones):** The required clinical surveys (PSQI, ISI, ESS, FSS, SF-36, BDI), which are spaced out between the 1-week and 3-month marks. *(Reminder: Monitoring surveys are excluded from this view).*

