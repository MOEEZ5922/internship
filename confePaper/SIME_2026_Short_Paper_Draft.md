# Evaluating Digital Biomarker Implementation in Personalized CPAP Therapy via a Role-Based Clinical Dashboard Architecture

**Moeez Ahmed¹, Yasaman Kakaei Siahkal¹, Siamak (Backend Collaboration)**
¹ DISP Lab, University of Lyon 2, France

## Abstract
Obstructive Sleep Apnea (OSA) is widely treated with Continuous Positive Airway Pressure (CPAP) therapy, yet dropout rates remain high due to delayed interventions and isolated patient monitoring. This work-in-progress paper proposes *SleepCare*, a novel software engineering architecture that integrates digital biomarkers and CPAP telemetry into a unified "Universal Truth" API. By establishing strict frontend-backend parity, the system is designed to eliminate information asymmetry across Physicians, Technicians, and Patients [2]. Building on recent work that highlights the need for integrated feedback systems [3] and adaptive strategies across the OSA care pathway [5], our proposed architecture features an AI-driven risk engine calculating a proprietary Weekly Composite Risk Score to stratify patients into 6 behavioral profiles. We present the system design and UI metric mappings as a methodological framework to bridge the gap between complex multi-vendor hardware data and real-time clinical decision-making.

## 1. Introduction
Obstructive Sleep Apnea (OSA) affects a significant proportion of the adult population and is associated with serious cardiovascular, metabolic, and cognitive consequences [4]. Continuous Positive Airway Pressure (CPAP) remains the gold standard treatment for moderate to severe OSA [6], yet real-world adherence remains critically low — with 30 to 50 percent of patients discontinuing therapy within the first year, primarily due to discomfort, low perceived benefit, and insufficient personalized support [1], [5].

Current homecare management relies on retrospective compliance metrics — typically a threshold of four hours of nightly use — which detect non-adherence only after clinical deterioration has already occurred [3]. This reactive approach fails to account for the heterogeneity of patient profiles, therapy phases, and the rich physiological signals now available through connected devices. Prior work on this patient population has demonstrated that integrating CPAP telemetry with patient-reported outcomes and intervention logs can produce a 2.4-fold improvement in device usage when personalized interventions are applied [3].

Addressing this gap requires a system capable of unifying fragmented data streams across multiple stakeholders — physicians, technicians, and patients — into a shared clinical representation that supports proactive, role-appropriate decision-making. This paper presents such a system: a role-based clinical dashboard for CPAP therapy management, built on a contract-first backend architecture and a three-portal frontend interface. The backend aggregates heterogeneous telemonitoring data into a unified weekly patient state that feeds both an AI risk-scoring layer [5] and role-specific dashboard views. The result is a platform designed to reduce information asymmetry, enable proactive intervention, and support personalized CPAP therapy management at scale.

## 2. System Architecture & Methodology
The proposed framework relies on a decoupled, API-first architecture designed to ingest and display high-frequency health data synchronously. It acts as a structural implementation of adaptive CPAP care pathways.

### A. Backend Architecture and Data Layer Design
CPAP therapy management requires integrating heterogeneous data streams — nightly device telemetry, physiological biomarkers, clinical interventions, and patient-reported outcomes — into a unified representation accessible to all stakeholders. The backend is responsible for ingesting data from multiple heterogeneous sources, persisting it in a structured relational database, and exposing it through a REST API consumed by a three-portal clinical dashboard and an AI risk-scoring layer [5].

*Contract-First Database Design:* Prior to any implementation, all database table schemas were defined and validated against real source files provided by Linde Homecare France. Fields with no confirmed data source were removed, while fields of uncertain clinical relevance were preserved in a dedicated raw payload column, ensuring no data is permanently lost before its utility is confirmed. This contract-first approach minimized structural modifications after implementation and allowed the API contract to be delivered to the frontend developer before backend implementation was complete.

*Multi-Source Data Architecture:* The platform ingests data from six distinct origins, mapped to nine database tables: LMD (Linde Homecare France), Withings, Hexoskin, Somno-Art, Masimo, and clinical surveys. To manage variability in data completeness across device sources, a two-table pattern is applied where appropriate: a primary table stores validated and normalized fields, while a companion raw table preserves the full parsed payload as a JSONB column.

*Weekly Aggregation Pipeline:* To bridge raw device data and the AI risk-scoring layer, a nightly aggregation job is designed to process all available source tables and produce one row per patient per week (`db_patient_week`). For each 7-day window, the pipeline computes weekly summaries from each available source — including average and minimum CPAP usage, AHI trend, HRV, SpO₂, sleep efficiency, and survey completion status. Week-over-week deltas are computed to capture deterioration trends. Missingness is represented explicitly rather than imputed, as absent data carries clinical significance. The resulting weekly row serves as the unified input to the AI risk-scoring framework described in [5].

*REST API and Separation of Concerns:* The backend exposes a REST API organized into nine router groups. The architecture follows a strict separation of concerns: the backend ingests and stores raw data, the aggregation pipeline produces the weekly state, the AI layer reads features and writes risk outputs back, and the frontend consumes the completed data exclusively through the API. No component accesses another component's data directly.

### B. Full-Stack Role-Based UI Architecture
To address the cognitive load issues often found in medical dashboards [2], the frontend (React/TypeScript) consumes the API to render three distinct portals:
1. **Physician Exception-Based Inbox:** Designed to protect physician time by surfacing only critical escalations. The UI uses "OR" logic to surface patients who trigger a complex AHI (APPEL IAH) alert or reach a critical AI Risk Score. It includes an *Intervention Viability Log* to review past failures before authorizing alternative therapies like Mandibular Advancement Devices (MAD) or Hypoglossal Nerve Stimulation (HNS).
2. **Technician Unified Priority Queue:** A tactical dispatch system prioritizing patients in "Attempting" profiles. It features a *Visit Prep Card* detailing exact mechanical failures and a *Device Logistics Tracker*. Within this view, technicians manage an internal 8-Type Intervention Taxonomy (Educational, Technical, Behavioral, Motivational, Supportive, Escalation, Follow-up, Admin).
3. **Patient "Zero-Friction" Mobile Interface:** Features a *Next Step Card* and visual progress metrics. It utilizes a **Dual-Routing mechanism** for self-reporting, simultaneously alerting technicians and feeding the AI risk model to recalculate dropout probability.

## 3. AI-Assisted Triage & Profile Clustering
To prevent "black-box" clinical decisions, the architecture integrates a Human-in-the-Loop (HITL) AI framework. Building on the clustering concepts introduced in [3], [4], the backend AI risk engine dynamically calculates a *Weekly Composite Risk Score (0-8+)* to cluster patients into **6 detailed profiles** (Adherent Low/High Risk, Attempting High/Low Priority, Non-Adherent, Unknown). 
Internal alert thresholds dictate UI behavior:
*   **Risk 0–2 (Low):** Standard monitoring.
*   **Risk 3–4 (Moderate):** Trigger *Monitoring Enhancements* in the Technician View.
*   **Risk 5–7 (High):** Trigger *Automated Medical Procedures* (System Level).
*   **Risk 8+ (Critical):** Demand *Immediate Physician Attention* in the Physician View.

Efficacy is tracked within the dashboard using a 7-day symmetric window comparing therapy metrics before and after an intervention is logged.

## 4. Expected Contributions & Conclusion
As a work-in-progress, the system is validated by design. The architectural blueprint resolves the siloed nature of current monitoring tools like Genius. By proposing strict API contracts, a 6-profile clustering mechanism, and an 8-type intervention taxonomy, the framework guarantees that all stakeholders view identical, real-time metrics. Future work involves usability testing with clinical technicians to quantify improvements in "Visit Prep" efficiency and adherence outcomes.

## 5. References
[1] T. E. Weaver and R. R. Grunstein, "Adherence to continuous positive airway pressure therapy: the challenge to effective treatment," *Proc. Amer. Thorac. Soc.*, vol. 5, no. 2, pp. 173–178, Feb. 2008.
[2] D. Dowding, J. A. Merrill, D. Russell, P. Peerson, and M. Keenan, "Dashboards for improving patient care: review of the literature," *Int. J. Med. Inform.*, vol. 84, no. 2, pp. 87–100, Feb. 2015.
[3] Y. Kakaei Siahkal, N. Moalla, A. Sekhari, T. Wang, and O. Grasset, "CPAP adherence improvement for OSA patients through integrated feedback systems," in *Proc. IEEE Int. Conf. Biomed. Health Inform. (BHI)*, 2024, pp. 1–8.
[4] Y. Kakaei Siahkal, N. Moalla, A. Seklouli-Sekhari, T. Wang, and O. Grasset, "Integrating digital biomarkers with feedback-driven clustering for optimized CPAP adherence in OSA management," in *Proc. IEEE Int. Symp. Signal Image Technol. Internet-Based Syst. (SKIMA)*, 2025, pp. 1–8.
[5] Y. Kakaei Siahkal, N. Moalla, A. Seklouli-Sekhari, T. Wang, and O. Grasset, "Dynamic portfolio for personalized CPAP treatment: Adaptive digital biomarker-driven strategies across the OSA care pathway," in *Proc. IEEE Int. Symp. Comput.-Based Med. Syst. (CBMS)*, 2025 [Online]. Available: https://hal.science/hal-05082782.
[6] R. N. Aurora et al., "Clinical guideline for the evaluation, management and long-term care of obstructive sleep apnea in adults," *J. Clin. Sleep Med.*, vol. 5, no. 3, pp. 263–276, Jun. 2009.
