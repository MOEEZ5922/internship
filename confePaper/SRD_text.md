SleepCare: A Role-Based Clinical Dashboard for
Personalized CPAP Therapy with Multi-Source
Digital Biomarker Integration
Moeez Ahmed Mohammad Moloudi Yasaman Kakaei Siahkal
Univ Lumi`ere Lyon 2, INSA Lyon,
Universit´e Lyon 1,
Universit ´e Jean Monnet Saint-Etienne,
DISP UR4570, Lyon, France
Universit´e Toulouse Capitole,
Toulouse, France
Univ Lumi`ere Lyon 2,
INSA Lyon,
Universit´e Lyon 1,
Universit ´e Jean Monnet Saint-Etienne,
DISP UR4570, Lyon, France
Univ Lumi`ere Lyon 2, INSA Lyon,
Universit´e Lyon 1,
Universit ´e Jean Monnet Saint-Etienne,
DISP UR4570, Lyon, France
Linde HomeCare France,
Bourg-en-Bresse, France
Olivier Grasset Nejib Moalla
Linde HomeCare France,
Bourg-en-Bresse, France
olivier.grasset@linde.com
Univ Lumi`ere Lyon 2, INSA Lyon,
Universit´e Lyon 1,
Universit ´e Jean Monnet Saint-Etienne,
DISP UR4570, Lyon, France
Abstract—Continuous Positive Airway Pressure (CPAP) remains
the gold standard treatment for Obstructive Sleep Apnea (OSA),
yet 46–83% of patients fail to achieve adequate adherence
within the first year. OSA affects 17–34% of middle-aged adults
and carries serious cardiovascular consequences. This paper
presents SleepCare, a role-based clinical dashboard architecture
developed to support over 40,000 patients across France. The
system integrates CPAP telemetry from six data sources, digital
biomarkers, intervention logs, and patient-reported outcomes
through a contract-first backend API. It generates a shared weekly
patient state consumed by three distinct role-specific portals for
the physician, technician, and patient, enabling synchronized
views and AI-assisted triage while preserving consistent data
access across all roles. The framework is evaluated against
four system-level research questions concerning real-time data
parity, predictive biomarker visualization, dynamic clustering
support, and event-driven intervention workflows. The SleepCare
framework demonstrates that a unified weekly patient state and
role-specific interfaces can reduce operational latency and facilitate
proactive, personalized therapy adjustment.
Index Terms—Obstructive sleep apnea, CPAP adherence,
clinical dashboard, digital biomarkers, telemonitoring, role-based
interface, decision support.
I. INTRODUCTION
Obstructive Sleep Apnea is a prevalent chronic disorder
associated with cardiovascular and neurocognitive morbidity,
and Continuous Positive Airway Pressure remains the standard
treatment for moderate to severe OSA when clinical criteria are
met [6]. Long-term adherence remains a major challenge, with
non-adherence frequently linked to discomfort, low perceived
benefit, fragmented follow-up, and delayed intervention after
problems emerge [1], [11]. Despite advances in connected
devices, many homecare workflows still depend on retrospective
compliance thresholds, often centered on four hours per night,
which can delay the identification of deteriorating patterns [3],
[12].
The core problem in addressing these delays is architectural
fragmentation. Clinically relevant information is often scattered
across CPAP exports, spreadsheets, survey systems, and vendor
platforms, forcing each stakeholder to reconstruct only a partial
view of the patient [3]. This fragmentation creates operational
latency in identifying and responding to risk, inconsistent
interpretation of adherence and biomarker trends, and missed
opportunities for early intervention.
To address these gaps, this paper presents the SleepCare
architecture, which unifies CPAP telemetry, wearable biomark-
ers, survey responses, and clinical actions into a shared weekly
patient representation exposed through a REST API. Drawing
on evidence that dashboards improve care processes when
designed for timely, workflow-aligned access [2], the system
pursues five objectives.
First, it designs a contract-first backend that ingests het-
erogeneous data without discarding source fidelity. Second,
it constructs a weekly patient-state representation suitable
for both dashboard display and AI-assisted triage [3], [4].
Third, it builds role-specific interfaces that preserve a single
source of truth while tailoring views and actions to physicians,
technicians, and patients [2]. Fourth, it implements a Human-in-
the-Loop triage framework in which algorithmic prioritization
supports, rather than replaces, clinical decisions [4]. Fifth,

-- 1 of 6 --

it encodes intervention tracking as part of the architecture,
enabling systematic evaluation of follow-up outcomes relative
to physiological and behavioral trends [3].
By achieving these objectives, the system moves beyond
basic data visualization to operationalize personalized follow-
up. The resulting framework is intended to reduce information
asymmetry among stakeholders, shorten reaction times, and
provide a scalable foundation for integrating future medical
IoT devices into adaptive OSA care pathways [5].
II. RELATED WORK
Recent adherence literature shows that successful CPAP
management requires not only device use but also structured
support that addresses technical failures, behavioral barriers,
and evolving symptom patterns over time [1], [6], [11].
Behavioral and self-management interventions have long been
recognized as promising ways to improve CPAP uptake and
sustained use, particularly when they are integrated into routine
care rather than delivered as isolated educational events [11],
[12].
Telemonitoring interventions that combine early follow-up,
remote troubleshooting, and behavioral support have shown
improvements in adherence and shorter time to intervention,
especially during the critical early treatment period [8], [9].
A randomized trial of telemonitoring in CPAP-treated pa-
tients reported a shorter delay to first intervention and better
early compliance in the telemonitoring arm [8]. More recent
randomized evidence also showed that digitally generated
personalized education and feedback can substantially improve
CPAP adherence over 90 days compared with usual care [7].
Reviews of telehealth-supported CPAP management similarly
conclude that remote monitoring and digitally mediated follow-
up can support adherence when they are integrated with clinical
workflows rather than used as stand-alone technical tools [9].
At the same time, research on dashboards demonstrates
that these tools are most useful when they reduce cognitive
load, present role-relevant information, and are integrated
into existing workflows [2]. Dashboard systems that expose
near-real-time performance indicators can improve process
adherence and support better care coordination, provided the
interface design remains actionable and clinically aligned [2].
These findings directly motivate the use of a shared weekly
patient state, exception-based physician review, and role-
specific views in SleepCare.
Recent OSA telemonitoring research has increasingly incor-
porated multi-modal wearable devices to capture physiological
signals beyond standard CPAP metrics. Chest-worn garments
enable continuous cardiac and respiratory monitoring, providing
signals such as HRV and respiratory effort variability that com-
plement device-reported usage data. Spot-check pulse oximeters
extend this picture by delivering SpO2 and ODI measurements.
Automated sleep staging systems further contribute per-session
sleep architecture reports from ambulatory recordings. Together,
these sources supply the multi-channel physiological evidence
that static compliance thresholds alone cannot capture [5].
Device classes and measured variables are summarized in
Table I.
A 2024 study on CPAP adherence improvement introduced
an approach that combines CPAP machine data, structured
patient feedback, and intervention logic to improve adher-
ence through patient clustering and targeted feedback [3].
Follow-up work extended this line by incorporating digital
biomarkers such as HRV, ODI, and related physiological
indicators into clustering-based monitoring and adaptive OSA
care pathways [4], [5]. These studies focus primarily on
modeling, clustering, and intervention logic. The present paper
addresses the complementary problem of software architecture,
showing how these concepts can be operationalized in a real
homecare setting through multi-source ingestion, unified weekly
aggregation, and synchronized interfaces.
Additional evidence from integrated care models supports
the value of coordinated, end-to-end sleep apnea pathways. A
recent study comparing a clinically integrated sleep apnea care
model with the traditional pathway found substantially higher
patient satisfaction across the care journey [10]. This aligns with
the SleepCare design philosophy, in which patient experience,
technical support, and clinical oversight are coordinated within
a single platform rather than separated across disconnected
systems.
Taken together, the literature supports four design principles
that guide SleepCare: shared patient-state representations,
role-specific dashboards, tight coupling of telemetry and
intervention history, and human-in-the-loop triage rather than
fully autonomous decision making [2], [3], [4], [5], [7], [8].
III. SYSTEM ARCHITECTURE AND METHODOLOGY
A. System Overview
SleepCare is designed as a five-layer clinical telemonitoring
architecture serving OSA patients managed by Linde Homecare
France. As illustrated in Fig. 1, the system is organized into a
Data Integration Layer responsible for ingesting heterogeneous
device and biomarker data, a Database Layer persisting
clinical records across 16 structured tables, a Persistence
Layer managing data access through a contract-first ORM, a
Business Layer encompassing the weekly aggregation pipeline,
AI risk-scoring logic, and REST API, and a Presentation Layer
delivering role-specific views to physicians, technicians, and
patients. The following subsections describe each component
in the order data flows, from raw source ingestion through
clinical decision support. A use-case diagram summarizing
interactions between physicians, technicians, patients, and the
AI risk model is presented in Fig. 2.
B. Multi-Source Data Layer
Clinically relevant CPAP telemetry and biomarkers originate
from multiple heterogeneous sources with differing formats,
collection frequencies, and reliability characteristics. As shown
in Table I, the platform integrates data from six origins
mapped to ten database tables. These include nightly CPAP
device exports from the Linde Medical Database (LMD), daily

-- 2 of 6 --

Fig. 1. SleepCare five-layer architecture diagram.
Fig. 2. SleepCare use-case diagram showing interactions between Physician,
Technician, Patient, and AI Risk Model.
wearable signals from Withings ScanWatch and BPM Core, per-
session respiratory and cardiac biomarkers from Hexoskin, spot-
check SpO2 and ODI measurements from Masimo MightySat,
per-session sleep staging reports from Somno-Art, and validated
clinical survey instruments including BDI, ESS, PSQI, ISI,
FSS, and SF-36. To manage variability in completeness, a
two-table pattern is applied where appropriate: a primary table
stores validated, normalized fields while a companion raw
table preserves the full parsed payload as JSONB, ensuring
source-specific fields are retained until their clinical utility is
confirmed.
TABLE I
DATA SOURCES AND CORRESPONDING DATABASE TABLES
Origin Key Tables Purpose
LMD /
Linde
db cpap,
db interventions,
db surveys monitoring
CPAP therapy and opera-
tional follow-up
Withings db withings watch,
db withings bpm core
Wearable and cardiovascu-
lar signals
Hexoskin db hexoskin Physiological and sleep
biomarkers
Somno-Art db somnoart,
db somnoart raw
Sleep analysis and raw
payload
Masimo db masimo Pulse-oximetry measure-
ments
Surveys db surveys medical Patient-reported outcomes
C. Contract-First Database Design
Before implementation, all 16 database table schemas were
defined and validated against real source files provided by
Linde Homecare France, including device export CSVs and
clinical monitoring spreadsheets. Each field was traced to
a confirmed data source. Fields without a confirmed origin
were removed, and fields of uncertain clinical relevance
were preserved in the raw payload column. This contract-
first approach ensured clinically relevant fields were retained,
reduced post-deployment schema churn, and produced a stable
API contract that allowed frontend and AI development to
proceed in parallel [5].
D. Weekly Aggregation Pipeline
A nightly aggregation job processes source tables and pro-
duces one row per patient per week in db_patient_week.
For each 7-day window anchored to the patient’s therapy
start date, the pipeline computes average and minimum CPAP
usage hours, the number of nights below the 4-hour adherence
threshold, week-over-week deltas for usage and AHI, HRV,
SpO2, and sleep efficiency summaries where available, survey
completion status, the most recent BDI score, and explicit
missingness flags for absent data sources. For partial first
weeks, data are prorated to capture early adherence trends
without penalizing mid-week starts. Missingness is encoded
as a clinical feature rather than imputed, because the absence
of data can carry independent clinical significance [5]. The
weekly row is the unified input to downstream components:
the AI risk layer, dashboard portals, and intervention-logging
system.
E. AI-Assisted Triage and Patient Profiles
The AI triage layer reads the weekly state and writes back
a composite risk classification and patient profile, including a
risk tier, dropout probability, and an action proposal [5]. The
system refines adherence stratification into six profiles using
iterative clustering on features including weekly mean usage,
nights below 4 hours, HRV trends, SpO2 nadir, leak rates, and

-- 3 of 6 --

recent BDI scores [4], [5]. This allows the system to distinguish
adherent patients with physiological deterioration, early-stage
patients needing urgent support, and patients with insufficient
data to be classified. Mapping patients to profiles enables the
dynamic triggering of targeted interventions. The six profiles
and recommended actions appear in Table II.
TABLE II
SIX PATIENT RISK PROFILES AND INTERVENTION STRATEGY
Profile Usage Intervention Strategy
Adherent –
Low Risk
≥4h/night Stable physiology and behavior.
Low-intensity monitoring only.
Adherent –
High Risk
≥4h/night Physiological deterioration detected.
Proactive therapy optimization.
Attempters –
High Priority
2–
4h/night
Critical early stage. Urgent targeted
interventions to prevent dropout.
Attempters –
Low Priority
2–
4h/night
Inconsistent but stable. Motivational
nudges to transition to full adher-
ence.
Non-Adherent <2h/night Highest dropout risk. Immediate
high-effort intervention or physician
alert.
Unknown No data Insufficient telemetry, surveys, or
biomarker data. Outreach and data-
collection priority.
F. Intervention Taxonomy and Effort Levels
An 8-type intervention taxonomy maps actions to three
channels (Visit, Call, and SMS or App) and five operational
effort levels [3], [4]. Effort Level A comprises low-intensity
remote notifications for compliance and motivation. Effort
Level B covers personalized phone or video calls to address
behavioral or leakage issues. Effort Level C involves in-person
technical interventions. A Special level triggers physician col-
laboration for severe AHI or persistent non-response. A Support
level covers equipment dispatch for hardware replacement.
Intervention efficacy is measured via a symmetric 7-day window
comparing nightly CPAP usage before and after each logged
action; this window balances time to observe behavioral change
against short-term noise in nightly values [3]. The full taxonomy
and delivery channels are detailed in Table III.
G. REST API and Separation of Concerns
The backend exposes over 31 REST endpoints organized
in nine router groups covering patients, CPAP sessions,
therapy history, biomarkers, surveys, interventions, weekly
state, devices, and dashboard aggregations. The API contract
was delivered to frontend developers prior to backend im-
plementation, enabling parallel development. The architecture
enforces separation of concerns across all layers and is designed
to support Role-Based Access Control (RBAC) and audit
logging for clinical governance and data traceability [2]. The
Data Integration Layer ingests raw data; the Database Layer
persists records; the Persistence Layer manages data access
via SQLAlchemy; the Business Layer applies aggregation, AI
TABLE III
8-TYPE INTERVENTION TAXONOMY WITH DELIVERY CHANNELS
Effort Type Channel Clinical Purpose
A Educational SMS / App Low-effort notification about
compliance or equipment.
A Motivational SMS / App Nudges for mid-range risk and
plateauing usage.
B Behavioral Call Personalized call to address
compliance or leakage.
B Supportive Call Contact to address emotional
barriers to therapy.
C Technical Visit In-person troubleshooting of
masks and devices.
C Structured
Follow-up
Visit / Call Verify impact of prior action
within 7-day window.
Special Escalation Call Physician collaboration for se-
vere AHI or non-response.
Support Administrative Shipping Remote dispatch of equipment
and hardware replacements.
scoring, and routing; and the Presentation Layer consumes
the resulting state exclusively via the API. This arrangement
ensures consistent views across portals and permits independent
updates to ingestion, AI, or frontend components.
H. Physician Portal
The physician portal receives escalation-ready patients from
the API and presents an exception-based inbox to minimize
cognitive load [2]. When a patient’s composite risk score
crosses a critical threshold or a complex AHI alert appears, the
patient is queued for urgent review, as shown in Fig. 3. The
deep-dive context view loads biomarkers, intervention history,
surveys, and AI outputs [5]. Before authorizing alternative
therapies such as MAD or HNS, the physician verifies that
the technician has exhausted applicable interventions. The
authorization is logged to the database, operationalizing the
human-in-the-loop principle: the AI flags, the technician acts,
and the physician validates.
Fig. 3. Physician escalation workflow sequence diagram.

-- 4 of 6 --

I. Technician Portal
The technician portal presents patients ranked by dropout
probability and deterioration signals via a priority queue, as
shown in Fig. 4. A Visit Prep Card generated from real-time
API data provides mask type, leakage rates, device change
history, and pending triage events [3]. After performing an
intervention, technicians log type and channel, triggering the
automatic 7-day efficacy window in the AI layer. The portal
also surfaces dual-routed patient self-reports directly to the
technician queue in real time.
Fig. 4. Technician dispatch workflow sequence diagram.
J. Patient Portal
The patient portal is a mobile-first interface consuming the
weekly state and presenting a Next Step Card with immediate
recommended actions and visual progress rings for 30-day
usage, as shown in Fig. 5. Patient-reported issues create support
tickets routed simultaneously to the technician queue and the
AI framework, updating dropout probability without manual
escalation [3]. The AI layer detects mechanical flags and
triggers contextual educational recommendations. Long clinical
surveys are delivered through milestone wizards to reduce
burden while preserving validated scales [2].
IV. VALIDATION STRATEGY AND EXPECTED
CONTRIBUTIONS
This work is evaluated primarily at the system and workflow
levels rather than through a completed clinical outcomes trial.
The validation strategy focuses on whether the proposed archi-
tecture can reliably unify heterogeneous data, preserve parity
across role-specific interfaces, and support timely, coordinated
follow-up in a real homecare setting.
Three complementary validation dimensions are considered.
Structural validation examines whether the contract-first back-
end, ingestion logic, and weekly aggregation pipeline maintain
a consistent patient state across the physician, technician, and
patient portals [5]. Operational validation examines whether
the dashboard design and intervention workflow improve the
timeliness, traceability, and coordination of follow-up actions
Fig. 5. Patient self-report and dual-routing workflow sequence diagram.
across stakeholders [3]. Methodological validation examines
whether the platform provides a reliable substrate for future
assessment of clustering models, digital biomarkers, and AI-
assisted prioritization under real-world data conditions [3], [4],
[5].
The expected contributions are threefold. First, the paper
presents a concrete software architecture for personalized CPAP
follow-up under real homecare constraints, combining multi-
source telemetry, intervention history, and patient-reported
information within a unified backend pipeline [5]. Second, it
translates recent work on integrated feedback systems, digital
biomarkers, and adaptive OSA monitoring into an operational
dashboard framework usable across physician, technician, and
patient roles [3], [4], [5]. Third, it provides a reusable design
pattern connecting raw medical-device integration, weekly
patient-state aggregation, AI-assisted triage, and role-based
clinical interfaces within a single telemonitoring platform [2].
V. CONCLUSION
This paper presents SleepCare as a role-based clinical
dashboard architecture for personalized CPAP therapy that
centers on backend-frontend parity, multi-source integration,
and AI-assisted workflow support. The framework is grounded
in established adherence literature and recent work on adaptive
OSA management, but its main contribution is not a final-
ized predictive model; it is a scalable engineering structure
that can support earlier intervention, reduced information
asymmetry, and more coherent follow-up in homecare OSA
management [3], [4], [5].
The architecture demonstrates how a unified weekly pa-
tient state, built from heterogeneous CPAP telemetry, digital
biomarkers, intervention logs, and patient-reported outcomes,
can be exposed through role-specific portals while preserving a
single source of truth. The design supports synchronized views
and human-in-the-loop triage, enabling coordinated decision-
making without bypassing clinical judgment.
Future work includes usability testing with technicians and
physicians, longitudinal evaluation of clustering performance

-- 5 of 6 --

and biomarker-driven adaptation, and integration with national
or institutional CPAP registries to assess the impact of the
architecture at scale [5].
ACKNOWLEDGMENT
This paper presents results developed in collaboration
between Linde Homecare France and the University Lumi `ere
Lyon 2, DISP Lab. The content reflects an R&D initiative
promoted by Linde Homecare France. Responsibility for the
information and views expressed in this paper lies entirely with
the authors.
REFERENCES
[1] T. E. Weaver and R. R. Grunstein, “Adherence to continuous pos-
itive airway pressure therapy: the challenge to effective treatment,”
Proc. Am. Thorac. Soc., vol. 5, no. 2, pp. 173–178, Feb. 2008, doi:
10.1513/pats.200708-119MG.
[2] D. Dowding, R. Randell, P. Gardner, G. Fitzpatrick, P. Dykes, J. Favela,
S. Hamer, Z. Whitewood-Moores, N. Hardiker, E. Borycki, and L. Cur-
rie, “Dashboards for improving patient care: review of the literature,”
Int. J. Med. Inform., vol. 84, no. 2, pp. 87–100, Feb. 2015, doi:
10.1016/j.ijmedinf.2014.10.001.
[3] Y. Kakaei Siahkal, N. Moalla, A. Sekhari, T. Wang, and O. Grasset,
“CPAP adherence improvement for OSA patients through integrated
feedback systems,” in Proc. IEEE Int. Conf. Biomed. Health Inform.
(BHI), 2024, pp. 1–8.
[4] Y. Kakaei Siahkal, N. Moalla, A. Seklouli-Sekhari, T. Wang, and O. Gras-
set, “Integrating digital biomarkers with feedback-driven clustering for
optimized CPAP adherence in OSA management,” in Proc. IEEE Int.
Symp. Signal Image Technol. Internet-Based Syst. (SKIMA), 2025.
[5] Y. Kakaei Siahkal, N. Moalla, A. Seklouli-Sekhari, T. Wang, and
O. Grasset, “Dynamic portfolio for personalized CPAP treatment: adaptive
digital biomarker-driven strategies across the OSA care pathway,” in
Proc. IEEE Int. Symp. Comput.-Based Med. Syst. (CBMS), 2025, doi:
10.1109/CBMS65348.2025.00194.
[6] L. J. Epstein, D. Kristo, P. J. Strollo Jr., N. Friedman, A. Malhotra,
S. P. Patil, K. Ramar, R. Rogers, R. J. Schwab, E. M. Weaver, and
M. D. Weinstein, “Clinical guideline for the evaluation, management
and long-term care of obstructive sleep apnea in adults,” J. Clin. Sleep
Med., vol. 5, no. 3, pp. 263–276, Jun. 2009.
[7] J. Lacroix, J. Tatousek, N. Den Teuling, T. Visser, C. Wells, P. Wylie,
R. Rosenberg, and R. Bogan, “Effectiveness of an intervention providing
digitally generated personalized feedback and education on adherence to
CPAP: randomized controlled trial,” J. Med. Internet Res., vol. 25, Art.
no. e40193, May 2023, doi: 10.2196/40193.
[8] F. Hoet, W. Libert, C. Sanida, A. Art, M. A. Aubert, and V. Rodenstein,
“Telemonitoring in continuous positive airway pressure-treated patients im-
proves delay to first intervention and early compliance: a randomized trial,”
Sleep Med., vol. 39, pp. 77–83, 2017, doi: 10.1016/j.sleep.2017.08.016.
[9] B. K. S. Thong, G. X. Y. Loh, J. J. Lim, C. J. L. Lee, S. N. Ting, H. P.
Li, and Q. Y. Li, “Telehealth technology application in enhancing CPAP
adherence in OSA patients: a review of current evidence,” Front. Med.,
vol. 9, Art. no. 877765, May 2022, doi: 10.3389/fmed.2022.877765.
[10] G. D. Salinas, W. Cerenzia, B. Coleman, F. Thorndike, S. Edington, and
H. Riney, “Patient satisfaction with a clinically integrated sleep apnea
care model vs. the current sleep care paradigm,” Front. Sleep, vol. 3,
Art. no. 1534441, Jan. 2025, doi: 10.3389/frsle.2024.1534441.
[11] A. M. Sawyer, N. S. Gooneratne, C. L. Marcus, D. Ofer, K. C. Richards,
and T. E. Weaver, “A systematic review of CPAP adherence across age
groups: clinical and empiric insights for developing CPAP adherence
interventions,” Sleep Med. Rev., vol. 15, no. 6, pp. 343–356, Dec. 2011,
doi: 10.1016/j.smrv.2011.01.003.
[12] C. J. Stepnowsky, J. J. Palau, A. L. Gifford, and S. Ancoli-Israel, “A self-
management approach to improving continuous positive airway pressure
adherence and outcomes,” Behav. Sleep Med., vol. 5, no. 2, pp. 131–146,
2007, doi: 10.1080/15402000701190622.

-- 6 of 6 --

