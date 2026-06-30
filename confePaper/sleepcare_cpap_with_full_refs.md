SleepCare: A Preemptive, Patient-Centric Platform for Proactive CPAP Adherence Management

Moeez Ahmed, Mohammad Moloudi, Yasaman Kakaei Siahkal, Olivier Grasset, Nejib Moalla

Abstract

Continuous positive airway pressure (CPAP) is the standard treatment for obstructive sleep apnea (OSA), yet a substantial proportion of patients fail to achieve adequate long-term adherence in routine care. Most current follow-up pathways are reactive: problems are often discovered only when patients return after therapy has already failed. SleepCare is a preemptive, patient-centric CPAP adherence platform co-developed with a large homecare provider. The system treats the patient as the main actor and is designed to get patients early by continuously monitoring multi-source CPAP telemetry and patient-reported outcomes, detecting deviations as soon as they appear, and proposing targeted actions for the patient, technician and physician. SleepCare unifies data from multiple device and survey sources into a shared weekly patient state that is exposed through three role-based portals, preserving a single source of truth while tailoring information and workflows to each stakeholder. This paper describes the clinical motivation, stakeholder requirements, methodology and system design of SleepCare, and outlines how the platform can support proactive, scalable CPAP adherence management in real-world homecare settings.

Keywords

Obstructive sleep apnea; CPAP adherence; telemonitoring; patient empowerment; clinical dashboard; role-based interface; decision support.

1 Introduction

Obstructive sleep apnea (OSA) is a common chronic disorder associated with cardiovascular and neurocognitive morbidity [6]. Continuous positive airway pressure (CPAP) remains the standard treatment for moderate-to-severe OSA when appropriate clinical criteria are met [6]. However, long-term adherence is a persistent challenge, with many patients failing to meet conventional adherence thresholds such as four hours of use per night on most nights of the week [1], [11].

In many homecare pathways, the management of CPAP adherence is reactive. Patients typically receive device set-up and initial education, and are then followed at fixed intervals or only when they or their physician request help. Even when CPAP devices are connected and telemonitoring platforms are available, clinical action is often driven by retrospective compliance summaries, so deteriorating patterns in usage, leak or symptoms may be recognised only after several weeks or months [1], [11].

In such a reactive model, if a patient has to return because therapy has clearly failed, the system has already missed the opportunity to prevent that failure. Many adherence problems are visible early, for example in the first weeks of therapy, but current workflows do not systematically act at that moment [1], [11].

Telehealth interventions that combine early follow-up, remote troubleshooting and structured behavioural support have shown that earlier intervention can improve CPAP use compared with usual care [7]–[9], [12]. At the same time, existing telemonitoring solutions often remain device-centred. They focus on delivering data and alerts to clinicians rather than empowering patients as primary actors and coordinating actions across technicians and physicians [2], [9].

In this context, SleepCare has been designed as a preemptive, patient-centric CPAP adherence platform. The core idea is to detect deviations as soon as they appear, propose targeted solutions immediately and coordinate patient, technician and physician actions so that many problems are addressed before they escalate into complete therapy failure. Rather than adding another data viewer, SleepCare structures CPAP care as a proactive loop around a unified weekly patient state and three role-based portals [3]–[5].

2 Clinical background and stakeholder needs

CPAP adherence is limited by a combination of technical, behavioural and organisational factors. On the patient side, mask discomfort, nasal symptoms, feelings of claustrophobia, dry mouth, noise and low perceived benefit have all been linked to early dropout [1], [11]. Socioeconomic constraints, travel distance and competing life demands can further reduce the likelihood of sustained use [11].

On the service side, limited time, fragmented information systems and increasing patient volumes make it difficult to identify which patients need help at a given moment. Information about device usage, symptoms, comorbidities and past interventions may be distributed across separate portals, spreadsheets and clinical notes, so each stakeholder sees only part of the picture [3], [5], [10].

Telehealth programmes have demonstrated that remote monitoring, structured education and early contact can improve adherence in the first months of therapy [7]–[9]. They also show that success depends on integrating telemonitoring into existing clinical workflows and clearly defining who acts when a problem is detected [9], [10].

SleepCare is built around three stakeholder roles: patient, technician and physician. The patient is explicitly treated as the main actor who is given direct access to meaningful data and self-management guidance. The technician is the first responder for technical and many behavioural issues. The physician focuses on escalation, clinical optimisation and long-term decisions such as alternative therapies [3]–[6], [10].

3 System overview: from data to preemptive action

SleepCare ingests CPAP telemetry, wearable signals, physiological biomarkers and validated clinical surveys that are already available in the homecare environment [3]–[5]. These data arrive at different frequencies and with varying completeness. Rather than exposing raw time series to each user, the platform aggregates them into a unified weekly patient state [3], [5].

For each patient and seven-day window, the weekly state summarises usage, nights below the adherence threshold, leak, residual events and available biomarker and survey information, while encoding missing data explicitly. This representation is the single internal view consumed by the decision-support layer and the three portals [3], [5].

Using this weekly state, SleepCare assigns each patient to a small number of risk profiles that capture both behavioural and physiological patterns. Profiles distinguish, for example, adherent low-risk patients, adherent but physiologically unstable patients, high-priority attempters, inconsistent users and clearly non-adherent cases [4], [5]. When a patient moves into a higher-risk profile or when key indicators deteriorate, the system flags this as a deviation and generates a set of recommended actions tailored to each role [3]–[5].

4 Methodology

4.1 Design objectives

The methodological approach behind SleepCare is driven by five design objectives. First, the platform should treat the patient as the main actor by providing a clear, actionable view of their own therapy and by enabling self-correction wherever possible [4], [7], [12]. Second, it should detect deviations in adherence, leak and symptoms early and translate them into concrete interventions rather than passive alerts [7]–[9]. Third, it should provide role-specific but consistent views for patients, technicians and physicians so that each stakeholder can act within their scope without losing sight of the shared situation [2], [3], [10]. Fourth, it should unify heterogeneous device and survey data into a stable internal representation that can support both dashboards and decision-support models [2], [3]–[5]. Fifth, it should encode intervention history in a way that makes it possible to evaluate which patterns of action are effective under real-world conditions [3]–[5].

4.2 Data sources and weekly aggregation

The initial implementation of SleepCare integrates data from six existing sources in the homecare setting: nightly CPAP device telemetry from the provider database; wearable signals such as heart rate and activity from connected consumer devices; high-resolution physiological measurements from chest-worn garments; spot-check pulse oximetry; automated sleep staging reports; and validated clinical surveys such as sleepiness and mood scales [3]–[5]. All devices and instruments were already in routine use before the platform was introduced.

A background aggregation process generates one weekly record per patient by combining all available measurements within a seven-day window. This weekly record includes descriptive statistics for CPAP usage and leak, counts of nights below the adherence threshold, summaries of available physiological parameters and flags indicating which sources are missing [3], [5]. For patients starting therapy mid-week, the first window is prorated so that early patterns are still captured. No imputation is performed for missing data at this stage; absence of data is treated as a feature in its own right [3], [5].

4.3 Risk profiling and deviation rules

Based on the weekly state, the platform assigns each patient to a discrete risk profile. Profiles are defined using a combination of simple rules and clustering on features such as mean nightly usage, frequency of short nights, leak levels and the presence of concerning symptom or biomarker patterns [4], [5]. Profiles are chosen to reflect familiar clinical categories such as clearly adherent, at risk of dropout, non-adherent and physiologically unstable despite good usage [1], [6], [11].

Deviation rules operate on changes in profile and on specific thresholds. When a patient moves from an adherent to an at-risk profile, or when physiological indicators worsen despite stable usage, the system marks a deviation event. This event triggers generation of role-specific recommendations, such as self-management advice in the patient portal, a troubleshooting task in the technician worklist or an escalation item in the physician inbox [3]–[5].

4.4 Research objectives and expected results

The methodological framework is also expressed in terms of research objectives and expected results. The first objective is to implement a patient empowerment interface that enables patients to act early on emerging problems; the corresponding expected result is a reduction in early therapy dropout and perceived loss of control [4], [7], [12]. The second objective is to implement preemptive deviation detection; the expected result is a shorter time from deviation onset to first intervention compared with existing reactive workflows [7]–[9]. The third objective is to provide role-specific actionable views for clinicians and technicians; the expected result is maintained or improved adherence without an increase in physician workload [2], [9], [10]. The fourth objective is to unify multi-source data into a consistent weekly state; the expected result is a reduction in information asymmetry between stakeholders [2], [3]–[5]. The fifth objective is to encode intervention history with clear time windows; the expected result is the ability to retrospectively analyse which intervention patterns are most effective [3]–[5].

5 Stakeholder requirements and SleepCare features

5.1 Patient as main actor

Patients need to understand what their CPAP device is doing, how much they are actually using it and how this relates to symptom control and long-term health [1], [6], [11]. They also need timely, low-friction support when they experience discomfort, side-effects or practical problems, and they benefit from ongoing encouragement and feedback rather than a single educational session at therapy initiation [1], [11], [12].

SleepCare responds to these needs through a patient empowerment portal. The portal shows nightly usage, leak and residual events in simple graphics, links these trends to symptom scores and offers tailored educational content about risks and benefits. When the system detects a deviation, such as a drop in usage or persistent leak, the portal presents concrete suggestions and, when appropriate, encourages the patient to request technician support. Automated messages provide low-intensity coaching aligned with the patient profile, while leaving room for human contact when automated support is not sufficient [4], [7], [12].

5.2 Technician and nurse

Technicians and nurses often manage large cohorts of CPAP users and must decide which patients to contact first. They need to prioritise outreach, troubleshoot mask and device issues in a structured way and document their actions so that physicians can easily see what has been tried [1], [11].

In SleepCare, technicians receive an exception-based worklist that lists only those patients whose weekly state or self-reports indicate actionable problems. For each patient, a preparation card summarises device history, recent trends and previous interventions. A structured intervention taxonomy guides the choice of educational, behavioural, technical and escalation actions, and each action is logged in a consistent way. This design allows technicians to resolve many issues early, while creating a clear history that supports later clinical decisions [3]–[5], [10].

5.3 Physician

Physicians overseeing CPAP therapy require concise, clinically meaningful summaries. They need to recognise non-adherence and residual disease quickly, decide when to adjust therapy and when to consider alternative treatments, all under significant time constraints [6].

The physician portal in SleepCare provides an escalation-only inbox. Patients appear when composite risk scores, symptom reports or technician findings meet criteria that warrant medical review. For each escalated case, the portal presents a compact view of adherence, symptoms, biomarker trends when available and intervention history. This supports focused decisions, while routine problems continue to be handled at the patient and technician levels [3]–[5], [10].

6 Validation strategy and expected effects

At the time of writing, SleepCare has been designed and implemented in collaboration with a large homecare provider, but full clinical outcome data are not yet available. The initial validation strategy therefore focuses on structural and operational performance rather than completed trials [3]–[5].

Structural validation examines whether heterogeneous device and survey data are correctly ingested, mapped and aggregated into a weekly patient state that remains consistent across all portals. This includes checks that all fields correspond to real device or survey outputs, that missingness is handled explicitly and that computed risk profiles and deviation flags are reproducible from stored data [3], [5].

Operational validation examines whether the platform supports more timely and coordinated actions than existing reactive workflows. Key indicators include the time from a deviation in usage or leak to the first platform-mediated intervention, the proportion of contacts initiated by the system versus by patient complaints or fixed schedules and the completeness of intervention logs from the perspective of physicians [7]–[9], [10].

Based on the design and the supporting literature, three main clinical effects are expected. First, the combination of patient empowerment, early deviation detection and structured technician follow-up should reduce early dropout from therapy [1], [7]–[9], [11], [12]. Second, for adherent patients who remain symptomatic or physiologically unstable, the platform should support earlier recognition and optimisation of treatment [3]–[6], [10]. Third, by routing routine issues to patient self-management and technician interventions and escalating only selected cases, SleepCare should maintain or improve adherence without increasing physician workload [2], [9], [10].

7 Discussion

SleepCare differs from many existing CPAP telemonitoring solutions in that it is explicitly preemptive and patient-centric. Rather than treating telemonitoring as a way to generate more data for clinicians, the platform structures care around a proactive loop in which deviations are detected early and concrete actions are proposed for each role [4], [7]–[9], [12].

The unified weekly patient state allows all stakeholders to work from the same picture of the patient, while role-based portals filter this information into views and workflows that match day-to-day practice. From a clinical perspective, this design responds directly to known failure modes of current care, including delayed recognition of problems, fragmented responsibilities and the lack of structured intervention history [1], [6], [11]. From a systems perspective, the architecture provides a stable substrate for integrating future biomarkers and decision-support algorithms without disrupting established workflows [2]–[5], [10].

The present work has limitations. It describes an implemented framework and its expected effects, but does not yet provide prospective outcome data. In addition, the current implementation is tied to the devices and organisational context of a single homecare provider, and adaptation to other settings will require alignment with local infrastructure and care pathways [3]–[5], [10].

8 Conclusion

This paper has presented SleepCare as a preemptive, patient-centric platform for proactive CPAP adherence management. The system treats the patient as the main actor, detects deviations early and coordinates targeted actions by patients, technicians and physicians before problems escalate into full therapy failure.

By unifying multi-source data into a weekly patient state and exposing this state through three role-based portals, SleepCare aims to reduce information asymmetry, shorten reaction times and support scalable, clinically meaningful follow-up. Future work will include usability studies, quantitative evaluation of time-to-intervention and adherence outcomes and comparative studies against standard care in different organisational contexts.

References

[1] T. E. Weaver and R. R. Grunstein, "Adherence to continuous positive airway pressure therapy: the challenge to effective treatment," Proc. Am. Thorac. Soc., vol. 5, no. 2, pp. 173–178, Feb. 2008, doi: 10.1513/pats.200708-119MG.

[2] D. Dowding, R. Randell, P. Gardner, G. Fitzpatrick, P. Dykes, J. Favela, S. Hamer, Z. Whitewood-Moores, N. Hardiker, E. Borycki, and L. Currie, "Dashboards for improving patient care: review of the literature," Int. J. Med. Inform., vol. 84, no. 2, pp. 87–100, Feb. 2015, doi: 10.1016/j.ijmedinf.2014.10.001.

[3] Y. Kakaei Siahkal, N. Moalla, A. Sekhari, T. Wang, and O. Grasset, "CPAP adherence improvement for OSA patients through integrated feedback systems," in Proc. IEEE Int. Conf. Biomed. Health Inform. (BHI), 2024, pp. 1–8.

[4] Y. Kakaei Siahkal, N. Moalla, A. Seklouli-Sekhari, T. Wang, and O. Grasset, "Integrating digital biomarkers with feedback-driven clustering for optimized CPAP adherence in OSA management," in Proc. IEEE Int. Symp. Signal Image Technol. Internet-Based Syst. (SKIMA), 2025.

[5] Y. Kakaei Siahkal, N. Moalla, A. Seklouli-Sekhari, T. Wang, and O. Grasset, "Dynamic portfolio for personalized CPAP treatment: adaptive digital biomarker-driven strategies across the OSA care pathway," in Proc. IEEE Int. Symp. Comput.-Based Med. Syst. (CBMS), 2025, doi: 10.1109/CBMS65348.2025.00194.

[6] L. J. Epstein, D. Kristo, P. J. Strollo Jr., N. Friedman, A. Malhotra, S. P. Patil, K. Ramar, R. Rogers, R. J. Schwab, E. M. Weaver, and M. D. Weinstein, "Clinical guideline for the evaluation, management and long-term care of obstructive sleep apnea in adults," J. Clin. Sleep Med., vol. 5, no. 3, pp. 263–276, Jun. 2009.

[7] J. Lacroix, J. Tatousek, N. Den Teuling, T. Visser, C. Wells, P. Wylie, R. Rosenberg, and R. Bogan, "Effectiveness of an intervention providing digitally generated personalized feedback and education on adherence to CPAP: randomized controlled trial," J. Med. Internet Res., vol. 25, Art. no. e40193, May 2023, doi: 10.2196/40193.

[8] F. Hoet, W. Libert, C. Sanida, A. Art, M. A. Aubert, and V. Rodenstein, "Telemonitoring in continuous positive airway pressure-treated patients improves delay to first intervention and early compliance: a randomized trial," Sleep Med., vol. 39, pp. 77–83, 2017, doi: 10.1016/j.sleep.2017.08.016.

[9] B. K. S. Thong, G. X. Y. Loh, J. J. Lim, C. J. L. Lee, S. N. Ting, H. P. Li, and Q. Y. Li, "Telehealth technology application in enhancing CPAP adherence in OSA patients: a review of current evidence," Front. Med., vol. 9, Art. no. 877765, May 2022, doi: 10.3389/fmed.2022.877765.

[10] G. D. Salinas, W. Cerenzia, B. Coleman, F. Thorndike, S. Edington, and H. Riney, "Patient satisfaction with a clinically integrated sleep apnea care model vs. the current sleep care paradigm," Front. Sleep, vol. 3, Art. no. 1534441, Jan. 2025, doi: 10.3389/frsle.2024.1534441.

[11] A. M. Sawyer, N. S. Gooneratne, C. L. Marcus, D. Ofer, K. C. Richards, and T. E. Weaver, "A systematic review of CPAP adherence across age groups: clinical and empiric insights for developing CPAP adherence interventions," Sleep Med. Rev., vol. 15, no. 6, pp. 343–356, Dec. 2011, doi: 10.1016/j.smrv.2011.01.003.

[12] C. J. Stepnowsky, J. J. Palau, A. L. Gifford, and S. Ancoli-Israel, "A self-management approach to improving continuous positive airway pressure adherence and outcomes," Behav. Sleep Med., vol. 5, no. 2, pp. 131–146, 2007, doi: 10.1080/15402000701190622.

