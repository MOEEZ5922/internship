# Evaluating Digital Biomarker Implementation in Personalized CPAP Therapy via a Role-Based Clinical Dashboard Architecture

**Moeez Ahmed¹, Yasaman Kakaei Siahkal¹, Siamak**  
¹ DISP Lab, University of Lyon 2, France

## Abstract
Obstructive Sleep Apnea (OSA) affects 17–34% of middle-aged adults and carries serious cardiovascular consequences. Continuous Positive Airway Pressure (CPAP) remains the gold standard treatment, yet 46–83% of patients fail to achieve adequate adherence within the first year. This paper presents *SleepCare*, a role-based clinical dashboard architecture developed in collaboration with Linde Homecare France that integrates CPAP telemetry from six vendor platforms, digital biomarkers, intervention logs, and patient-reported outcomes through a contract-first backend API. The system generates a shared weekly patient state consumed by three distinct React/TypeScript portals—physician, technician, and patient—enabling synchronized views and AI-assisted triage without information asymmetry across roles [2]. We validate the framework against four research questions concerning real-time data parity, predictive biomarker visualization, dynamic clustering, and event-driven intervention workflows. 

**Index Terms**—Obstructive sleep apnea, CPAP adherence, clinical dashboard, digital biomarkers, telemonitoring, role-based interface, decision support.

## I. Introduction
Obstructive Sleep Apnea is a prevalent chronic disorder associated with cardiovascular and neurocognitive morbidity, and Continuous Positive Airway Pressure remains the standard treatment for moderate to severe OSA when clinical criteria are met [6]. Long-term adherence remains a major challenge, with nonadherence frequently linked to discomfort, low perceived benefit, fragmented follow-up, and delayed intervention after problems emerge [1]. Despite advances in connected devices, many homecare workflows still depend on retrospective compliance thresholds, often centered on four hours per night, which can delay identification of deteriorating patterns [3]. 

The *SleepCare* architecture addresses these gaps by unifying CPAP telemetry, wearable biomarkers, survey responses, and clinical actions into a shared weekly patient representation exposed through a REST API. The system is designed to [2]: 
- Eliminate information asymmetry between physicians, technicians, and patients.
- Support AI‑assisted prioritization without bypassing clinical judgment.
- Operationalize personalized follow‑up through explicit workflow design.
- Enable scalable integration of future medical IoT devices [5]. 

## II. Related Work
Recent adherence literature shows that successful CPAP management requires not only the device but also structured support that addresses technical failures, behavioral barriers, and symptom evolution over time [1], [6]. Telemonitoring interventions combining early follow‑up and behavioral support consistently improve nightly usage compared with standard care [3]. At the same time, dashboard research demonstrates that clinician‑facing tools are most effective when they reduce cognitive load, present role‑relevant information, and align with existing workflows [2]. 

More recent work by Kakaei Siahkal and colleagues provides a close foundation for the present system. The BHI 2024 paper on integrated feedback systems illustrates how CPAP data and structured intervention logic can jointly improve adherence [3]. The SKIMA 2025 and CBMS 2025 manuscripts extend this line toward digital biomarkers, clustering, and adaptive OSA care pathways, supplying a research basis for personalized monitoring and multi‑source feature integration [4], [5]. These contributions, however, focus on modeling and clinical outcomes; the present paper supplies the software architecture that operationalizes them end‑to‑end under real homecare constraints. 

## III. Research Problems and Objectives
The core problem is architectural fragmentation: clinically relevant information is scattered across CPAP exports, spreadsheets, survey systems, and vendor platforms, forcing each stakeholder to reconstruct a partial patient picture [3]. This fragmentation creates: 
- Operational latency in identifying and responding to risk.
- Inconsistent interpretation of adherence and biomarker trends.
- Missed opportunities for early intervention.

To address these issues, the work pursues five objectives:
- **Obj1:** Design a contract‑first backend that ingests heterogeneous data without discarding source fidelity.  
- **Obj2:** Construct a weekly patient‑state representation suitable for both dashboard display and AI‑assisted triage [3], [4]. 
- **Obj3:** Build role‑specific interfaces that preserve a single source of truth while tailoring views and actions to physicians, technicians, and patients [2]. 
- **Obj4:** Implement a Human‑in‑the‑Loop triage framework in which algorithmic prioritization supports, rather than replaces, clinical decisions [4]. 
- **Obj5:** Encode intervention tracking as part of the architecture, enabling systematic evaluation of follow‑up outcomes relative to physiological and behavioral trends [3]. 

## IV. System Architecture and Methodology
### A. System Overview
*SleepCare* is a full‑stack telemonitoring architecture ingesting heterogeneous therapy and biomarker data into structured storage, then aggregating them into a weekly patient representation exposed via REST API to three role‑specific portals and an AI‑assisted risk layer. The architecture reflects a collaboration with Linde Homecare France, in which the same underlying patient state underlies physician review, technician dispatch, and patient engagement, despite differing interface layouts and workflows [5]. 

### B. Contract‑First Backend Design
The backend follows a contract‑first strategy: schemas are defined directly from Linde Homecare export files and clinical monitoring spreadsheets before implementation, enabling interface and API definition in parallel with backend development. This is critical because vendor exports differ in format, granularity, and completeness, and some fields are operationally available before their clinical significance is fully established [5]. Validated fields are normalized into structured tables, while uncertain or source‑specific payload elements are preserved in separate JSONB‑backed raw tables, reducing the risk of premature data loss. 

### C. Multi‑Source Data Layer
The platform integrates data from six main origins, each mapped to one or more database tables:

| Source | Key Tables | Purpose |
| --- | --- | --- |
| LMD / Linde Homecare | `db_cpap`, `db_interventions`, `db_surveys_monitoring` | Core therapy and operational follow‑up |
| Withings | `db_withings_watch`, `db_withings_bpm_core` | Wearable and cardiovascular‑related signals |
| Hexoskin | `db_hexoskin` | Physiological and sleep‑related biomarkers |
| Somno‑Art | `db_somnoart`, `db_somnoart_raw` | Ambulatory sleep‑analysis data and raw payload |
| Masimo | `db_masimo` | Pulse‑oximetry and related measurements |
| Clinical surveys | `db_surveys_medical` | Patient‑reported outcomes and clinical scales |

This design supports the coexistence of validated structured fields (e.g., CPAP usage, intervention timestamps) alongside vendor‑specific raw measurements that may later become clinically informative [5]. 

### D. Weekly Aggregation Pipeline
To bridge raw longitudinal signals and actionable decision support, the system introduces a nightly aggregation job that produces one record per patient per week in `db_patient_week`. Each weekly row aggregates: 
- Average and minimum CPAP usage, nights below the four‑hour threshold, and related AHI‑driven indicators.
- Trends in heart‑rate variability (HRV), peripheral oxygen saturation (SpO₂), and sleep‑efficiency estimates.
- Completion status for clinical and quality‑of‑life surveys (e.g., symptom scores, adherence ratings).
- Intervention counts and types during the window.
- Week‑over‑week deltas and explicit indicators of missingness, treated as clinically meaningful rather than imputed values [5]. 

This weekly state is not only a visualization convenience; it is the integration unit through which the dashboard, escalation logic, and AI‑assisted prioritization remain synchronized and auditable [2]. 

### E. REST API and Separation of Concerns
The backend exposes domain‑specific endpoints organized under nine router groups: patients, CPAP sessions, biomarkers, surveys, interventions, weekly state, devices, dashboard aggregations, and auxiliary utilities. The design enforces a strict separation of concerns: 
- The ingestion layer writes raw or normalized data to persistence.
- The aggregation pipeline reads raw tables and writes weekly state.
- The AI layer reads the weekly state and writes structured risk outputs back.
- The frontend consumes state and risk data solely through the API, never directly accessing lower‑level tables or raw payloads [5]. 

This separation preserves parity across role‑specific interfaces and supports auditability when the same patient is viewed by multiple stakeholders [2]. 

## V. Role‑Based Clinical Dashboard Design
### A. Physician Portal
The physician interface is implemented as an exception‑based dashboard that minimizes cognitive load by surfacing only patients who require clinical attention [2]. Instead of exposing all telemetry detail, it highlights: 
- Patients for whom AI‑based escalation thresholds are triggered (e.g., high composite risk or AHI‑based alerts).
- Interventions attempted over recent weeks and whether symptom or usage metrics improved.
- Summary trends in CPAP usage, AHI‑related indices, and relevant biomarker availability [5]. 

By limiting the physician’s view to curated escalations and supporting evidence, the portal aligns with research showing that dashboards are most effective when they prioritize actionability over data volume [2]. 

### B. Technician Portal
The technician interface focuses on operational follow‑up, troubleshooting, and workflow prioritization. It reflects the practical reality that many adherence barriers arise from mask discomfort, equipment issues, and uncompleted follow‑up rather than isolated clinical events [1]. The portal supports: 
- A priority queue in which patients are ordered by risk profile and recent deterioration signals.
- *Visit Prep Cards* detailing specific mechanical failures, such as mask leaks, power issues, or connectivity losses.
- A *Device Logistics Tracker* that links patients to device‑serial numbers and replacement schedules.
- An internal 8‑type intervention taxonomy that structures technician actions (described below) [3]. 

This technician view operationalizes the idea that much of adherence support is tactical and workflow‑driven rather than purely clinical decision‑making. 

### C. Patient Portal
The patient interface emphasizes simplicity, low‑friction reporting, and guided next steps. It does not aim to expose aggregated biomarkers or model internals but instead supports: 
- Visual progress cards showing usage and symptom trends.
- Milestone‑guided surveys and symptom checks.
- A *Next Step Card* that recommends concrete actions, such as mask fitting adjustment, device check, or follow‑up request [2]. 

Self‑reported signals feed immediately back into the backend, enabling technicians and clinicians to respond to emerging issues inside the same workflow [3]. This design follows patient‑centered decision‑support principles, which emphasize that effective digital tools must account for user burden and communication timing within care pathways [3]. 

## VI. AI‑Assisted Triage, Profiles, and Intervention Taxonomy
### A. Weekly Composite Risk Score and Profiles
At the heart of the system is an AI‑assisted triage layer that reads the weekly patient state and writes a *Weekly Composite Risk Score (0–8+)* and associated patient profile [4]. The scoring mechanism builds directly on clustering and adaptive‑strategy work in the OSA domain, but the present paper treats it as an implementation‑oriented construct rather than a finalized, externally validated clinical model [3], [4], [5]. The six detailed profiles are: 

| Profile | Risk Range | Primary Action |
| --- | --- | --- |
| Adherent Low Risk | 0–2 | Standard monitoring |
| Adherent High Risk | 3 | Enhanced monitoring |
| Attempting High Priority | 4–5 | Technician visit within 7 days |
| Attempting Low Priority | 6 | Technicians schedule contact |
| Non‑Adherent | 7–8+ | Physician review and alternative‑therapy evaluation |
| Unknown | Insufficient data | Data‑collection and outreach priority |

Internal thresholds then drive UI logic programmatically:
- **Risk 0–2:** Standard monitoring, with periodic dashboard review.
- **Risk 3–4:** *Monitoring Enhancements* in the technician view, including increased survey frequency and device checks.
- **Risk 5–7:** *Automated Procedures* at the system level, such as pre‑populated reminder templates and rescheduling logic.
- **Risk 8+:** *Immediate Physician Attention* in the exception‑based physician inbox, requiring explicit acknowledgement and documentation [2]. 

Efficacy is tracked via a 7‑day symmetric window comparing metrics before and after an intervention is logged, aligning with common longitudinal evaluation designs in adherence research [3]. 

### B. 8‑Type Intervention Taxonomy
To structure follow‑up actions and enable systematic analysis, technicians operate within an 8‑type intervention taxonomy embodied in the dashboard:

| Intervention Type | Purpose | Example Triggers |
| --- | --- | --- |
| Educational | Teach CPAP use, mask care, and adherence rationale | New patient, suspicious usage patterns |
| Technical | Troubleshoot masks, devices, connectivity | High mask leak, volatility in CPAP data |
| Behavioral | Support habit formation and sleep hygiene | Inconsistent usage, irregular patterns |
| Motivational | Reinforce benefits, set goals, visualize progress | Mid‑range risk, plateauing use |
| Supportive | Provide emotional and social support | Self‑reported distress, family‑related issues |
| Escalation | Trigger physician review or alternative‑therapy discussion | Persistent high risk, non‑response to support |
| Follow‑up | Verify impact of prior actions | 7‑day window after any intervention |
| Administrative | Scheduling, documentation, and compliance reporting | All workflow events, visit closures |

This taxonomy appears in the technician view as a structured checklist and forms the basis for intervention logging and post‑hoc analysis, helping the system document not only *what* was done but *why* and *when* [3]. 

## VII. Validation Strategy and Expected Contributions
Because the present work is centered on architecture and workflow design, validation is framed primarily at the system level rather than as a completed clinical‑outcomes trial. The validation dimensions are: 

- **Structural Validation:** Whether the contract‑first backend and aggregation pipeline maintain consistent state across all three role‑specific frontends and whether the weekly patient representation aligns with the AI layer inputs and outputs [5]. 
- **Operational Validation:** Whether the dashboard logic improves timeliness and coordination of follow‑up such as technician preparation, escalation review, and patient feedback handling [3]. 
- **Methodological Validation:** Whether the platform provides a reliable substrate for future evaluation of clustering models, intervention‑type effectiveness, and biomarker‑driven adaptation [3], [4], [5]. 

The expected contributions are threefold:
- First, a concrete software‑engineering architecture for personalized CPAP follow‑up under real homecare constraints, integrating multi‑vendor telemetry with Linde Homecare workflows [5]. 
- Second, a translation of integrated‑feedback and digital‑biomarker research into an operational dashboard workflow that can be implemented across roles rather than studied only at the model level [3], [4], [5]. 
- Third, a reusable design pattern for combining raw medical‑device integration, weekly state aggregation, AI‑assisted prioritization, and role‑based interface design within a single clinical platform [2]. 

## VIII. Conclusion
This paper presents *SleepCare* as a role‑based clinical dashboard architecture for personalized CPAP therapy that centers on backend‑frontend parity, multi‑source integration, and AI‑assisted workflow support. The framework is grounded in established adherence literature and recent studies on adaptive OSA management, but its main contribution is not a finalized predictive model; it is a scalable engineering structure that can underpin earlier intervention, reduced information asymmetry, and more coherent follow‑up for homecare OSA management [3], [4], [5]. Future work includes usability testing with technicians, longitudinal evaluation of clustering performance, and integration with national or institutional CPAP registries to assess the impact of the architecture at scale [5]. 

***

## Figure Placeholders
**Figure 1. Use Case Diagram**  
*Insert a use‑case diagram showing the three primary actors—Physician, Technician, and Patient—and their interactions with the main system features: monitoring review, intervention logging, self‑reporting, escalation handling, and weekly state consultation.*

**Figure 2. Sequence Diagram: Patient Self‑Report Workflow**  
*Insert a sequence diagram illustrating patient self‑reporting of discomfort or usage issues, submission via the API, update of the technician priority queue, and recalculation of the AI risk score.*

**Figure 3. Sequence Diagram: Weekly Aggregation and Risk Scoring**  
*Insert a sequence diagram depicting the flow from raw source ingestion through database persistence, the nightly aggregation job, AI risk scoring, and frontend dashboard refresh for all roles.*

**Figure 4. Sequence Diagram: Physician Escalation Workflow**  
*Insert a sequence diagram showing the steps from threshold crossing and risk escalation, through exception‑inbox update, physician review, intervention decision, and intervention logging in the system.*

***

## References
[1] T. E. Weaver and R. R. Grunstein, “Adherence to continuous positive airway pressure therapy: the challenge to effective treatment,” *Proc. Am. Thorac. Soc.*, vol. 5, no. 2, pp. 173–178, Feb. 2008.
[2] D. Dowding et al., “Dashboards for improving patient care: review of the literature,” *Int. J. Med. Inform.*, vol. 84, no. 2, pp. 87–100, Feb. 2015.
[3] Y. Kakaei Siahkal, N. Moalla, A. Sekhari, T. Wang, and O. Grasset, “CPAP adherence improvement for OSA patients through integrated feedback systems,” in *Proc. IEEE Int. Conf. Biomed. Health Inform. (BHI)*, 2024, pp. 1–8.
[4] Y. Kakaei Siahkal, N. Moalla, A. Seklouli‑Sekhari, T. Wang, and O. Grasset, “Integrating digital biomarkers with feedback‑driven clustering for optimized CPAP adherence in OSA management,” in *Proc. IEEE Int. Symp. Signal Image Technol. Internet‑Based Syst. (SKIMA)*, 2025.
[5] Y. Kakaei Siahkal, N. Moalla, A. Seklouli‑Sekhari, T. Wang, and O. Grasset, “Dynamic portfolio for personalized CPAP treatment: adaptive digital biomarker‑driven strategies across the OSA care pathway,” in *Proc. IEEE Int. Symp. Comput.-Based Med. Syst. (CBMS)*, 2025 [Online]. Available: https://hal.science/hal-05082782.
[6] R. N. Aurora et al., "Clinical guideline for the evaluation, management and long-term care of obstructive sleep apnea in adults," *J. Clin. Sleep Med.*, vol. 5, no. 3, pp. 263–276, Jun. 2009.
