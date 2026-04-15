**MOEEZ- Weekly Task Plan**

**Phase 1-Weeks 1–5: Requirements & Design**

| Week | Task |
| :---: | :---: |
| **1** | Read PhD papers. Understand what the dashboard must show: patient risk, dropout prediction, intervention recommendations, and therapy phases. Understand the 3 user roles: physician, technician, patient |
| **2** | Discussion with Yasaman: Physician \= deep patient data. Technician \= risk level before visit, visit preparation. Patient \= video guidance \+ therapy progress |
| **3** | Design wireframes for the 3 role homepages and all tabs: CPAP, Biomarkers, Interventions, Medical Surveys, AI Weekly State, Coaching Videos, Help |
| **4** | Review with Yasaman. Get approval. Align with Siamak on API contracts, agree on what data each tab receives, and in what format |
| **5** | Finalize screen logic and component inventory. Set up a React \+ TypeScript \+ TailwindCSS project. Configure Git \+ GitHub Actions. Connect to Siamak's mock API. Deliver: Front-end functional design document |

**Phase 2 \- Weeks 6–13: Core Development**

| Week | Task |
| :---: | :---: |
| **6** | Build CPAP Tab: 7-day usage bar chart, AHI trend, leak % evolution, compliance streak counter, data gap alert banner |
| **7** | Build Digital Biomarkers Tab: HRV trend, ODI evolution, SpO2 timeline, per-source availability indicator (Withings/Hexoskin/Somno-Art), quality flag (dim chart when source is missing) |
| **8** | Build Interventions Tab: intervention timeline (type × delivery mode), Δusage before/after each intervention, sequence chain display (last 3 interventions), pending interventions counter |
| **9** | Build Medical Surveys Tab: PSQI/ESS/FSS/SF-36/BDI score history, survey completion calendar, overdue survey warning, "using previous survey from \[date\]" indicator when no new one received |
| **10** | Build AI Weekly State panel (visible on all tabs): risk tier badge (green/orange/red/critical), fused score gauge, day-to-dropout counter, active flags (leak instability / usage decay / residual burden), confidence level, phase label (onboarding/optimization/maintenance) |
| **11** | Build action recommendation card: proposed action type, delivery mode, reassessment window. Add clinician gate buttons: Accept / Modify / Reject with reason code input |
| **12** | Build Reporting Tab: cohort table sortable by risk tier and dropout probability, adherence statistics at 30/60/90 days, intervention effectiveness summary |
| **13** | Build Coaching Videos Tab: per-patient video delivery status, trigger category, watch-through rate, star rating, time from trigger to delivery. **Full working prototype demo**  |

**Phase 3 \- Weeks 14–18: AI Output Integration**

| Week | Task |
| :---: | :---: |
| **14** | Build Physician view: full patient pattern sheet showing all streams, intervention history with outcomes, escalation timeline, AI recommendation history with override log.  |
| **15** | Build Technician view: visit preparation card showing risk tier, dropout probability, recommended action, mask/equipment suggestion based on mechanism flags. Patient priority list ordered by urgency |
| **16** | Build evidence-insufficient alert: when confidence is low → show which streams are missing, days since last survey, "request sensing" button that sends PROM request to patient |
| **17** | Build AI model lifecycle panel shows status of all models (active/needs retraining), current performance score vs threshold, drift indicator, last retrained date |
| **18** | Build Patient-facing view (mobile-optimized): therapy progress in simple language, pending video notification with play button, post-video feedback prompt (star rating \+ "was this helpful?") |

**Phase 4 \- Weeks 19–21: UI/UX Validation**

| Week | Task |
| :---: | :---: |
| **19** | Usability testing session with Yasaman and Linde technicians. Key questions: "Does the visit preparation card change how you prepare?" / "Is this more useful than Genius?" Document all feedback |
| **20** | Fix issues from feedback: label clarity, information hierarchy, action button placement, and chart readability. Accessibility improvements: WCAG compliance, color contrast |
| **21** | Performance tuning: lazy loading, component caching, API response optimization. Full integration test with Siamak's real backend |

**Phase 5 \- Weeks 22–24: Documentation & Final Report**

| Week | Task |
| :---: | :---: |
| **22** | Write front-end documentation: module descriptions, component structure, visualization design decisions, API integration logic, deployment guide |
| **23** | Write internship final report \+ prepare scientific poster |
| **24** | Finalize PPT presentation following university guidelines. Submit. |

