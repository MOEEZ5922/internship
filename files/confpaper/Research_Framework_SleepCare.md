# Research Framework: The SleepCare Platform

This document outlines the core scientific structure of your paper for the **SIME 2026 Conference**, as requested by your supervisor.

## 1. Research Mind Map

```mermaid
graph LR
    Root((The SleepCare Platform))
    
    Idea(Research Idea)
    Root --- Idea
    Idea --- I1[Multimodal Fusion]
    Idea --- I2[AI Personalization]
    Idea --- I3[Truth Architecture]
    
    Question(Research Question)
    Root --- Question
    Question --- Q1["How does AI improve<br/>CPAP adherence?"]
    
    Objectives(Research Objectives)
    Root --- Objectives
    Objectives --- O1[1. API Contracts]
    Objectives --- O2[2. Biomarkers]
    Objectives --- O3[3. AI Clustering]
    Objectives --- O4[4. Risk Alerts]
    Objectives --- O5[5. Video Coaching]
    
    Value(Scientific Value)
    Root --- Value
    Value --- V1[No Information Asymmetry]
    Value --- V2[Precision Medicine]
    Value --- V3[Proactive Care]
    
    Method(Methodology)
    Root --- Method
    Method --- M1[Truth API Layer]
    Method --- M2[Weekly AI Engine]
    Method --- M3[Human-in-the-Loop]
    
    Outcomes(Expected Outcomes)
    Root --- Outcomes
    Outcomes --- E1[Higher Adherence]
    Outcomes --- E2[Unified Workflows]
    Outcomes --- E3[Automated Risk Mitigation]
    
    style Root fill:#0A1128,color:#fff
    style Idea fill:#2D9596,color:#fff
    style Question fill:#E76F51,color:#fff
    style Objectives fill:#F4A261,color:#fff
    style Value fill:#6A994E,color:#fff
    style Method fill:#2A9D8F,color:#fff
    style Outcomes fill:#264653,color:#fff
```

## 2. Formal Research Question
**RQ:** *To what extent does a multimodal integration architecture—unifying device trends, physiological biomarkers (SpO₂, HRV, ODI), patient-reported surveys, and educational video coaching—improve the precision of AI-driven risk stratification and therapy adherence in CPAP patients?*

## 3. Scientific Research Objectives
1.  **Architecture Development:** Design and implement a "Universal Truth" API that synchronizes heterogeneous data streams (Hardware, Wearables, and Surveys) into a single weekly analysis state.
2.  **Biomarker Analysis:** Quantify the predictive power of multi-sensor physiological data (from Hexoskin, Masimo, and Somno-Art) in identifying early signs of therapy discomfort or physiological distress.
3.  **Dynamic Stratification:** Develop and evaluate an AI clustering model that dynamically categorizes patients into four clinical clusters (*Adherent, Attempting, Struggling, Dropout*) based on evolving data patterns.
4.  **Operational Validation:** Validate a real-time "Technician Priority Queue" that uses AI-driven risk scores to enable proactive rather than reactive clinical interventions.
5.  **Engagement Evaluation:** Measure the efficacy of educational video interventions as a trigger-based clinical tool for improving long-term patient compliance.

## 4. Problem Statement & Motivation
*   **The Problem:** Current CPAP therapy suffers from a "Data Silo" problem where device usage, patient feelings, and physiological vitals are stored in separate, unlinked systems.
*   **The Result:** High therapy dropout rates (30-50%) because clinical teams detect issues too late.
*   **The Innovation:** The SleepCare platform closes this loop by providing a unified "Clinical Cockpit" for both Physicians and Technicians, powered by an AI engine that looks at the *whole* patient, not just the machine.

---

> [!TIP]
> **Presentation Tip:** When presenting this to your supervisor, highlight that your mind map covers both the **Technical Engineering** (API contracts/Architecture) and the **Clinical Science** (Adherence/Biomarkers). This balance is what SIME 2026 looks for.
