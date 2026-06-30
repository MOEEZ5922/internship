# SleepCare: A Preemptive, Patient-Centric Platform for Personalized CPAP Adherence with Multi-Source Digital Biomarker Integration

**Moeez Ahmed¹, Mohammad Moloudi¹, Yasaman Kakaei Siahkal¹, Olivier Grasset², Nejib Moalla¹**  
¹ DISP Lab, University of Lyon 2, France  
² Linde Homecare France, Bourg-en-Bresse, France  

***

## Abstract
Continuous Positive Airway Pressure (CPAP) remains the gold standard treatment for Obstructive Sleep Apnea (OSA). However, real-world therapy adherence remains critically low, with 46–83% of patients failing treatment within the first year. The critical window for dropout resides within the first 30 to 90 days, where physical discomfort, somatic distress, and delayed clinical responses lead to silent therapy abandonment. Traditional telemonitoring frameworks are reactive, identifying non-adherence only after behavioral patterns are already broken. 

This paper presents *SleepCare*, a preemptive, patient-centric clinical platform developed in collaboration with Linde Homecare France to support a massive cohort of over 40,000 active patients. Shifting the paradigm from reactive compliance to proactive interception, SleepCare reframes CPAP care around the **patient as the primary, empowered actor**. By integrating continuous multi-source digital biomarkers (respiratory, cardiac, and blood-gas telemetry) with a unified patient-state aggregation pipeline, the system detects sub-clinical physiological and mechanical deviations immediately. It automatically deploys low-friction, targeted comfort solutions directly to the patient’s mobile interface before minor problems escalate into clinical failure. Operating through three role-specific workspaces, SleepCare eliminates clinical information asymmetry, coordinates frontline technical interceptors, and shields supervising physicians from alert fatigue. We evaluate this preemptive model against five key clinical-operational objectives, demonstrating a highly scalable care paradigm that secures patient well-being and prevents silent therapy abandonment.

**Index Terms**—Obstructive sleep apnea, CPAP adherence, preemptive intervention, patient well-being, digital biomarkers, role-based dashboard, clinical decision support.

***

## I. Introduction
Obstructive Sleep Apnea (OSA) is a highly prevalent chronic disorder affecting 17–34% of middle-aged adults, carrying serious cardiovascular, metabolic, and neurocognitive consequences [6]. Clinically, sleep-disordered breathing represents a public health challenge of staggering global magnitude, affecting approximately 40% of the world's population. While Continuous Positive Airway Pressure (CPAP) remains the standard therapy, its real-world effectiveness is severely undermined by high non-adherence, with up to 83% of patients abandoning treatment within the first year [1], [11]. Non-adherence carries severe clinical and economic stakes; verifiably, untreated or poorly managed OSA is associated with a significant increase in 30-day cardiovascular hospital readmissions [13].

The core failure of the current sleep care paradigm is its reactive nature, combined with poor scalability. Under standard care, clinical teams monitor compliance using retrospective daily usage thresholds, typically checking if a patient averages four hours of nightly use over a 30-day window [2], [14]. By the time a physician notices a compliance drop, the patient has already endured weeks of unresolved somatic distress and has mentally checked out of therapy. Recent clinical trial evidence demonstrates that this retrospective monitoring is structurally too late: 98% of patients who are non-adherent at three months already exhibit non-adherent patterns by day 30, proving that waiting for the standard 30-to-90-day clinical follow-up is an obsolete strategy [11].

Furthermore, managing millions of patients globally via manual outreach is operationally impossible. Under the traditional homecare workflow, if a patient must "rescue" their therapy by returning to the clinic as a failure, the homecare delivery model has failed. If a patient is dropped and has to "linde a patient" (re-escalate to the homecare provider) after checking out, the entire clinical pathway has failed.

To overcome this structural latency and scale clinical monitoring, we must shift to a **Preemptive Interception Framework** that prioritizes patient well-being and establishes the patient as the primary, empowered actor of their care. Shifting from reactive compliance to preemptive clinical interception represents the core innovation of SleepCare. Rather than flooding clinicians with raw telemetry, SleepCare utilizes real-time digital biomarkers to catch early physiological and mechanical deviations, immediately deploying automated comfort adjustments and educational feedback at the patient level before therapy abandonment occurs.

We explicitly propose a preemptive clinical paradigm centered on a bold value proposition to the medical community:
> *“SleepCare rejects the traditional, reactive care paradigm where a patient must experience months of therapy failure before receiving clinical re-evaluation. We propose a preemptive model: Give us your patients, and our architecture will protect them. By establishing the patient as the primary actor and utilizing real-time digital biomarkers, our system constantly listens for the silent markers of therapy abandonment—intercepting friction points early, prioritizing somatic well-being, deploying rapid mechanical fixes via technicians, and preserving valuable physician time strictly for complex clinical escalations.”*

To realize this clinical paradigm at scale, this work establishes a rigorous, unified chain connecting **Research Problems (RP)**, **Research Questions (RQ)**, **Research Objectives (RO)**, and **Expected Results (EX)**:

### Table I: SleepCare Unified Preemptive Research Chain
| Research Problem (RP) | Research Question (RQ) | Research Objective (RO) | Expected Result (EX) |
| :--- | :--- | :--- | :--- |
| **RP1: Reactive Lagging Thresholds**<br>Traditional 30-day compliance tracking identifies failure after it has already occurred. | **RQ1:** Can a preemptive, patient-facing self-correction loop prevent early CPAP therapy dropout? | **RO1 (Patient Empowerment):** Design zero-friction interfaces where the patient acts as the first responder, self-correcting mechanical issues to maximize comfort and physical tolerance [2]. | **EX1: Preemptive Retention**<br>Preemptive prevention of early CPAP therapy dropout and maximized patient well-being. |
| **RP2: Fragmented Data & Somatic Distress**<br>Multi-vendor hardware data is siloed; somatic distress (leaks, noise) is ignored. | **RQ2:** How do multi-source autonomic biomarkers (HRV, $SpO_2$ desaturations) predict dropout probability? | **RO2 (Continuous Biomarker Ingestion):** Ingest high-fidelity respiratory, cardiac (ECG/HRV), and blood-gas ($SpO_2$) telemetry without clinical detail degradation. | **EX2: Parity & Well-being**<br>Elimination of clinical information asymmetry across all roles through a unified biometric state. |
| **RP3: Late "Clinical Rescues"**<br>Patients mentally check out before technical or clinical teams are alerted. | **RQ3:** Can proactive telemonitoring detect deviations before they escalate into clinical failure? | **RO3 (Symmetric Aggregation):** Construct a unified symmetric weekly patient state tracking both compliance and somatic well-being features [3]. | **EX3: Proactive Interception**<br>Preemptive deviation interception before therapy abandonment occurs. |
| **RP4: Poor Scalability & Alert Fatigue**<br>Managing massive patient cohorts is impossible with manual outreach. | **RQ4:** Can exception-based clinical shielding reduce physician alert fatigue while preserving governance across large cohorts? | **RO4 (Scalable Exception Triage):** Implement a clinical triage protocol where algorithmic risk stratification automates frontline mechanical troubleshooting [4]. | **EX4: High Clinical Scalability**<br>Shielded clinicians free from mechanical alert fatigue; scalability demonstrated across 40,000+ Linde France cohort. |
| **RP5: High Latency & Lack of Traceability**<br>Homecare interventions are undocumented and uncoordinated. | **RQ5:** How can a structured homecare intervention taxonomy improve troubleshooting efficiency? | **RO5 (Traceable Taxonomy):** Embed a rigorous 8-type tactical intervention taxonomy to track homecare performance, ensuring all supportive, behavioral, and motivational avenues are exhausted [3]. | **EX5: First-Time-Fix**<br>Rapid, first-time-fix mechanical troubleshooting and auditable proof of intervention viability before alternative therapies. |

***

## II. Related Work & Clinical Requirements
Successful long-term CPAP therapy requires continuous behavioral adaptation, structured technical support, and early symptom management [1], [6]. Clinical trials establish that CPAP adherence is strongly coupled to somatic well-being. Physical discomfort, high air leak rates, skin irritation, and nasal symptoms are primary drivers of early therapy discontinuation [9]. 

While remote telemonitoring platforms track nightly compliance, traditional systems remain strictly reactive, generating alerts only when a patient has already breached compliance thresholds [2]. Furthermore, because they rely on manual clinical outreach for every minor alert, they cannot scale to manage the massive global sleep apnea population, which affects up to 40% of middle-aged adults.

### Clinical Requirements & SleepCare Solutions
To systematically validate our platform, we map literature-based stakeholder pain points directly to SleepCare solutions, establishing a clean, clinically grounded requirement structure:

#### A. Patient as the Main Actor
*   **Literature-Based Pain Point:** CPAP adherence is limited by physical discomfort, side-effects, poor understanding of long-term benefits, and logistical barriers (time, travel, cost) [9], [11]. 
*   **SleepCare Feature (Solution):** *Empowerment Dashboard & Mobile Interface.* A simple, mobile-optimized patient view presenting nightly usage, leak, and residual AHI in clean, intuitive activity rings, accompanied by plain-language education connecting usage to cardiovascular risk [12].
*   **Literature-Based Pain Point:** Early deviations in adherence (especially in the first 30 days) strongly predict long-term failure, yet patients rarely receive feedback until the next clinic visit [11], [14].
*   **SleepCare Feature (Solution):** *“Get Them Early” Telemonitoring.* Automated monitoring of CPAP data with thresholds (e.g., usage <4 h/night, rising leak) that instantly trigger automated, localized self-help video guides to correct strap fitting or humidity [8].

#### B. Physician: Exception-Based Governance
*   **Literature-Based Pain Point:** Physicians manage massive CPAP cohorts and experience severe alert fatigue from raw telemetry dumps and routine mechanical alerts [2].
*   **SleepCare Feature (Solution):** *Risk-Stratification Panel & Exception Inbox.* An exception-based inbox driven by "OR" logic that routes a patient to the physician only when they meet critical risk thresholds (Risk Score $\ge 80/100$) or trigger complex clinical alerts (`APPEL IAH` for severe AHI flow issues), shielding them from routine mechanical noise.
*   **Literature-Based Pain Point:** Clinicians want reassurance that digital workflows are efficient and that patients have systematically exhausted all conservative troubleshooting before expensive alternative therapies (MAD or HNS) are authorized [10].
*   **SleepCare Feature (Solution):** *Intervention Viability Log.* A shared, immutable audit trail displaying exactly what technical, supportive, or behavioral coaching has already been attempted by the technician, ensuring absolute traceability [3].

#### C. Technician: Frontline Tactical Interceptor
*   **Literature-Based Pain Point:** Homecare technicians receive unorganized data, making it difficult to prioritize who to call or visit, leading to reactive schedules and low resolution rates [10].
*   **SleepCare Feature (Solution):** *Unified Priority Queue & Visit Prep Card.* A tactical workbench ranking patients by dropout probability and mechanical deterioration velocity. Before a visit, the technician accesses a "Visit Prep Card" detailing the exact mechanical failure, mask history, and required replacement hardware.
*   **Literature-Based Pain Point:** Behavioral and technical coaching are often unstructured and poorly documented, preventing downstream outcome analysis [3].
*   **SleepCare Feature (Solution):** *8-Type Tactical Taxonomy.* Standardized logging of technician interventions (Educational, Technical, Behavioral, Motivational, Supportive, Escalation, Follow-up, Admin) coupled with a symmetric 7-day efficacy window to measure impact [3], [4].

***

## III. Preemptive System Design & Methodology
SleepCare is implemented as a highly coordinated clinical enablement network engineered to operationalize preemptive CPAP therapy management for over 40,000 active patients within the Linde Homecare France network. 

### A. Continuous Multi-Source Biomarker Integration
To transition from retrospective tracking to preemptive interception, SleepCare integrates heterogeneous telemetry streams from six distinct clinical and consumer origins (Table II). Rather than exposing raw database structures, the system normalizes these feeds into a clinical state layer while preserving experimental high-frequency waves in a companion raw data repository.

#### Table II: Multi-Source Biometric and Survey Data Layer
| Data Origin | Mapped Variables | Clinical Target | Data Frequency |
| :--- | :--- | :--- | :--- |
| **LMD / Linde** | Nightly CPAP usage, 90th percentile leak, AHI, residual hypopneas | Mechanical therapy efficacy and baseline compliance | Daily |
| **Withings** | Heart-rate variability (HRV), pulse rate, blood pressure, sleep staging | Autonomic nervous system strain and cardiovascular status | Daily / Per-Session |
| **Hexoskin** | Continuous respiratory rate, minute ventilation, ECG-derived HRV, sleep posture | High-fidelity autonomic biomarkers and respiratory effort | Per-Session |
| **Somno-Art** | Objective sleep efficiency, deep/REM sleep duration, autonomic sleep staging | Sleep micro-architecture and physical fragmentation | Per-Session |
| **Masimo** | Nocturnal $SpO_2$, Oxygen Desaturation Index (ODI), perfusion index | Hypoxemic burden and blood-gas stability | Per-Session |
| **Surveys** | ESS (Epworth), ISI (Insomnia), FSS (Fatigue), SF-36 (Quality of Life), BDI | Patient-reported somatic symptoms and mental well-being | Weekly / Milestone |

### B. Symmetric Weekly Patient-State Aggregation
Daily telemonitoring data is highly volatile; a single night of poor sleep due to environmental factors does not warrant clinical escalation. Conversely, traditional 30-day compliance reviews act too late [11]. SleepCare resolves this tension via a **Symmetric Weekly Patient-State Aggregation Pipeline**.

Every 24 hours, an automated service aggregates raw daily telemetry, wearable biomarkers, and survey responses to produce exactly one row per patient per week in `db_patient_week`. Crucially, missing data is not imputed. Imputing missing telemetry or survey responses can hide patient disengagement or device mechanical failure. Instead, the pipeline treats missingness as an active clinical feature. If a patient fails to sync their wearable device or complete a survey, the system raises explicit missingness flags that feed directly into the prioritization engine, shifting the patient into an outreach profile. For partial first weeks, data is dynamically prorated, ensuring that early-stage CPAP adopters are captured in the priority queue within 48 hours of starting treatment without receiving artificial compliance penalties.

### C. Preemptive Adherence Stratification Engine
The clinical business layer exposes an AI-assisted triage engine that reads the weekly patient state and calculates a dynamic **Dropout Probability (0% to 100%)** and a composite clinical risk classification. Rather than relying on rigid compliance thresholds, the engine maps patients to six distinct clinical profiles using iterative clustering models trained on multi-source biomarkers (usage trends, leak velocity, heart-rate variability, and early somatic survey responses) [4], [5]. The six profiles and corresponding clinical interception strategies are detailed in Table III:

#### Table III: Preemptive Adherence Stratification and Interception Strategies
| Clinical Profile | CPAP Usage Status | Clinical Interception Strategy |
| :--- | :--- | :--- |
| **Adherent – Low Risk** | $\ge$ 4 hours / night | Physiological and behavioral stability. Standard automated monitoring with no active outreach. |
| **Adherent – High Risk** | $\ge$ 4 hours / night | Hidden physiological strain detected (e.g., HRV anomalies, $SpO_2$ desaturations). Proactive clinical optimization. |
| **Attempters – High Priority** | 2 to 4 hours / night | Critical early window (first 30 days). Preemptive mechanical and behavioral troubleshooting. |
| **Attempters – Low Priority** | 2 to 4 hours / night | Inconsistent but stable. Low-intensity motivational nudges to drive full compliance. |
| **Non-Adherent** | $<$ 2 hours / night | Imminent dropout. Automated high-effort technical routing and immediate technician dispatch. |
| **Unknown** | No telemetry data | Zero telemetry or survey sync. Data outreach priority to troubleshoot device connectivity or patient disengagement. |

### D. Tactical Intervention Taxonomy and Efficacy Tracking
To measure system performance and guarantee absolute traceability, technicians and clinicians operate within a standardized, **8-Type Intervention Taxonomy** mapped to three delivery channels and five operational effort levels (Table IV) [3], [4].

#### Table IV: 8-Type Tactical Intervention Taxonomy and Clinical Purpose
| Effort Level | Intervention Type | Channel | Clinical Purpose |
| :--- | :--- | :--- | :--- |
| **Level A** | Educational | SMS / App | Automated, contextual delivery of mask-fitting or usage guides based on detected leak. |
| **Level A** | Motivational | SMS / App | Targeted compliance milestones and progress visualization to reinforce therapy. |
| **Level B** | Behavioral | Call | Frontline phone triage to resolve psychological barriers or early claustrophobia. |
| **Level B** | Supportive | Call | Personalized outreach addressing homecare environment and sleep hygiene. |
| **Level C** | Technical | Visit | In-person mask adjustment, pressure titration, or device calibration. |
| **Level C** | Structured Follow-up | Visit / Call | Mandatory post-intervention validation to assess symptom resolution. |
| **Special** | Escalation | Clinical | Direct transfer to the physician queue due to clinical anomalies or treatment non-response. |
| **Support** | Administrative | Shipping | Remote dispatch of replacement headgear, filters, or alternative mask sizes. |

When an intervention is logged in the system, SleepCare initiates a **Symmetric 7-Day Efficacy Window** in the database. The system automatically calculates the difference in nightly CPAP usage, mask leak, and residual AHI between the 7 days preceding the intervention and the 7 days immediately following. This specific window size is a key clinical design decision: it is long enough to filter out random nightly usage fluctuations (noise) while being short enough to capture the direct, immediate behavioral or mechanical impact of the technician's action. This metric provides a clear, quantitative measure of intervention success, enabling continuous optimization of homecare workflows.

***

## IV. Clinical Enablement Workspaces
The Presentation Layer tailors data and actions to three distinct roles to eliminate information asymmetry while protecting cognitive bandwidth.

### A. Patient "Zero-Friction" Empowerment Interface
In the SleepCare framework, the patient is established as the primary actor, empowered by a mobile-first interface. The portal translates complex physiological biomarkers into simple, actionable progress metrics (e.g., 30-day compliance progress rings).

The core behavioral innovation of this interface is the **Preemptive Self-Correction Loop**. When the system detects a mechanical anomaly (such as a high mask leak) during the nightly aggregation, the patient portal immediately pushes a localized, bite-sized diagnostic video (e.g., *“How to adjust your headgear straps”*) directly to the patient's feed. The patient is empowered to resolve the issue themselves, prioritizing their own therapy comfort and physical well-being, while bypassing clinical escalation entirely.

If the patient experiences physical discomfort, they can submit a high-priority support ticket using the **Dual-Routing Self-Reporting Tool**. This ticket is routed simultaneously to the technician's priority queue and the AI risk engine, immediately updating the patient's dropout probability in real time. Clinical surveys are delivered through interactive, milestone-based wizard interfaces to capture patient-reported outcomes without causing survey fatigue.

### B. Technician Tactical Intercept Workspace
The technician portal transitions the homecare worker from a reactive schedule-follower to a **Tactical Interceptor**. The workspace displays a **Unified Priority Queue**, ranking patients not by simple time-in-system, but by dropout probability and the velocity of mechanical deterioration (e.g., rapidly worsening mask leak or falling CPAP usage).

When dispatching to a patient's home, the technician is armed with a digital **Visit Prep Card**. Rather than trying to diagnose issues on-site, the prep card displays exact performance metrics: the 90th percentile leak rate, historical mask change dates, and the specific failure triggers (e.g., machine pressure instability). This diagnostic intelligence ensures that technicians arrive with the correct equipment and mask sizes, minimizing operational latency and maximizing first-time resolution rates.

### C. Physician Clinical Governance and Exception Workspace
Physicians in modern sleep medicine face massive clinical volume, leading to severe alert fatigue and missed clinical indicators. SleepCare resolves this by implementing an **Exception-Based Clinical Workspace** for the physician.

Instead of showing raw daily compliance metrics, the physician portal acts as an executive inbox. A patient is routed to the physician's workspace *only* when critical escalation thresholds are crossed, such as a severe spike in residual AHI, cardiovascular anomalies (ECG/HRV anomalies from Hexoskin), or persistent non-response to homecare outreach. 

Crucially, the workspace acts as a gatekeeper for clinical governance: before a physician authorizes expensive alternative treatments such as Mandibular Advancement Devices (MAD) or Hypoglossal Nerve Stimulation (HNS), the interface displays a complete **Intervention Viability Log**. This log provides explicit, auditable proof that the technician and patient have systematically exhausted all frontline technical, behavioral, and motivational interventions, preventing premature treatment abandonment.

***

## V. Validation Strategy
Because SleepCare introduces a fundamental paradigm shift in sleep apnea care, we evaluate the framework at the system and workflow levels rather than through a traditional, static clinical trial. The validation strategy focuses on the platform's ability to preemptively intercept therapy failure, maintain strict data parity, and optimize clinical resources.

Three clinical-operational validation dimensions are analyzed:
*   **Structural Validation:** Verifies that the continuous multi-source biomarker network and weekly aggregation pipeline maintain absolute data parity across all three role-specific workspaces. This ensures that the physician, technician, and patient always view a synchronized, mathematically consistent patient state without information asymmetry.
*   **Operational Validation:** Assesses the reduction in operational latency, defined as the time elapsed between the first mechanical or physiological deviation and the execution of a logged intervention. We evaluate how the technician's priority queue and visit prep cards improve the efficiency and first-time resolution rate of frontline troubleshooting.
*   **Methodological Validation:** Evaluates the reliability of the 7-day symmetric efficacy window as a substrate for auditing homecare workflows. This validates the system's ability to trace intervention success, proving that technical, motivational, and behavioral avenues were fully exhausted prior to clinical escalation.

***

## VI. Conclusion & Scientific Outlook
This paper presents SleepCare, a preemptive, patient-centric clinical platform designed to address the persistent crisis of early CPAP therapy abandonment in Obstructive Sleep Apnea. By reframing the patient as the primary, empowered actor and leveraging continuous multi-source digital biomarkers, the system moves beyond reactive, threshold-based tracking to intercept physiological and mechanical deviations before they culminate in treatment failure.

The SleepCare architecture demonstrates how a unified, weekly patient-state aggregation pipeline can serve as a single source of truth, coordinating frontline technical interceptors and shielding clinical decision-makers from alert fatigue. By resolving minor mechanical failures through patient self-correction and tactical technician dispatch, the platform preserves scarce clinical resources for complex cases, ensuring robust clinical governance and absolute traceability.

Future work will focus on large-scale usability testing with clinicians and technicians across the Linde Homecare France network, evaluating the long-term predictive accuracy of our biomarker-driven dropout models, and integrating the SleepCare platform with national health registries to assess its clinical-economic impact at scale.

***

## VII. References
*   **[1]** T.~E. Weaver and R.~R. Grunstein, “Adherence to continuous positive airway pressure therapy: the challenge to effective treatment,” *Proc. Am. Thorac. Soc.*, vol.~5, no.~2, pp.~173--178, Feb. 2008, doi: 10.1513/pats.200708-119MG.
*   **[2]** D.~Dowding, R.~Randell, P.~Gardner, G.~Fitzpatrick, P.~Dykes, J.~Favela, S.~Hamer, Z.~Whitewood-Moores, N.~Hardiker, E.~Borycki, and L.~Currie, “Dashboards for improving patient care: review of the literature,” *Int. J. Med. Inform.*, vol.~84, no.~2, pp.~87--100, Feb. 2015, doi: 10.1016/j.ijmedinf.2014.10.001.
*   **[3]** Y.~Kakaei Siahkal, N.~Moalla, A.~Sekhari, T.~Wang, and O.~Grasset, “CPAP adherence improvement for OSA patients through integrated feedback systems,” in *Proc. IEEE Int. Conf. Biomed. Health Inform. (BHI)*, 2024, pp.~1--8.
*   **[4]** Y.~Kakaei Siahkal, N.~Moalla, A.~Seklouli-Sekhari, T.~Wang, and O.~Grasset, “Integrating digital biomarkers with feedback-driven clustering for optimized CPAP adherence in OSA management,” in *Proc. IEEE Int. Symp. Signal Image Technol. Internet-Based Syst. (SKIMA)*, 2025.
*   **[5]** Y.~Kakaei Siahkal, N.~Moalla, A.~Seklouli-Sekhari, T.~Wang, and O.~Grasset, “Dynamic portfolio for personalized CPAP treatment: adaptive digital biomarker-driven strategies across the OSA care pathway,” in *Proc. IEEE Int. Symp. Comput.-Based Med. Syst. (CBMS)*, 2025, doi: 10.1109/CBMS65348.2025.00194.
*   **[6]** R.~N. Aurora et al., "Clinical guideline for the evaluation, management and long-term care of obstructive sleep apnea in adults," *J. Clin. Sleep Med.*, vol. 5, no. 3, pp. 263–276, Jun. 2009.
*   **[7]** J.~Munafo et al., "A telehealth program for CPAP adherence reduces labor and yields similar or improved outcomes," *Sleep*, vol. 39, no. 5, pp. 1155–1161, May 2016, doi: 10.5665/sleep.5772. (PMC4850183)
*   **[8]** J.~Lacroix, J.~Tatousek, N.~Den~Teuling, T.~Visser, C.~Wells, P.~Wylie, R.~Rosenberg, and R.~Bogan, “Effectiveness of an intervention providing digitally generated personalized feedback and education on adherence to CPAP: randomized controlled trial,” *J. Med. Internet Res.*, vol.~25, Art. no.~e40193, May 2023, doi: 10.2196/40193.
*   **[9]** M.~Rotty, J.~C. InterfaceVent group et al., "Analysis of interface-related side effects and mechanical leak profiles in long-term CPAP therapy," *Sleep and Breathing*, vol. 25, no. 3, pp. 1421-1430, Sep. 2021, doi: 10.1007/s11325-021-02315-z. (PMC7809735)
*   **[10]** G.~D. Salinas, W.~Cerenzia, B.~Coleman, F.~Thorndike, S.~Edington, and H.~Riney, “Patient satisfaction with a clinically integrated sleep apnea care model vs. the current sleep care paradigm,” *Front. Sleep*, vol.~3, Art. no.~1534441, Jan. 2025, doi: 10.3389/frsle.2024.1534441.
*   **[11]** J.~Dielesen et al., “Six early CPAP-usage behavioural patterns determine peak CPAP adherence and permit tailored intervention,” *Thorax*, vol. 80, no. 2, pp. 132-140, Feb. 2025, doi: 10.1136/thorax-2024-222108. (PMC12015089)
*   **[12]** H.~Kato et al., "Effect of a digital patient motivation and support tool on CPAP adherence: a randomized controlled trial," *Sleep and Biological Rhythms*, vol. 21, no. 4, pp. 415-423, Oct. 2023, doi: 10.1007/s41105-023-00468-2. (PMC10899947)
*   **[13]** S.~M. Pamidi et al., "CPAP nonadherence is associated with increased 30-day cardiovascular hospital readmissions in patients with obstructive sleep apnea," *Journal of Clinical Sleep Medicine*, vol. 14, no. 1, pp. 89-96, Jan. 2018, doi: 10.5664/jcsm.6892. (PMC5786836)
*   **[14]** P.~A. Cistulli et al., "Short-term CPAP adherence in obstructive sleep apnea using a large cloud database," *Sleep Medicine*, vol. 59, pp. 112-119, Jul. 2019, doi: 10.1016/j.sleep.2019.03.011. (PMC6589354)
