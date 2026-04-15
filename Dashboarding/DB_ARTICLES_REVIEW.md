# Literature Review: DB Articles (Device-Based Research)
## Dashboard Data Sources & Clinical Validation

This document categorizes the research papers found in the `DB articles` folder, focusing on the hardware and algorithms that provide data for the dashboard.

---

### 1. Sleep Analysis & Somno-Art
These papers justify how the dashboard can show sleep stages (REM, Deep, Light) without a full hospital PSG setup.

| Paper Name | Key Questions Answered | Relevance | Methodology/Notes |
| :--- | :--- | :--- | :--- |
| **Validation of Somno-Art Software, a novel approach** | How does the dashboard show sleep stages at home? Is it accurate for OSA patients? | **High** | Validates that Somno-Art can identify **REM, Deep, and Light sleep** using only heart rate and movement data. |
| **Somno-Art Software identifies pathology-induced changes...** | Is Somno-Art as good as hospital PSG for patients with OSA or Insomnia? | **High** | Confirms the software is sensitive enough to detect **clinical pathology** (apnea events) in a home setting. |
| **Poster_WS_2019_Apnea.pdf** | Can Somno-Art detect specific apnea events? | **Medium** | Provides visual evidence (posters) of apnea detection accuracy, useful for designing **Alert UIs**. |

---

### 2. Wearable Biomarkers & Hexoskin (Smart Shirts)
These papers explain the "Digital Biomarker" layer of the dashboard (HRV, Respiratory Rate).

| Paper Name | Key Questions Answered | Relevance | Methodology/Notes |
| :--- | :--- | :--- | :--- |
| **Journal of Sleep Research (Pion‐Massicotte)...** | Can a "biometric shirt" (Hexoskin) accurately classify sleep stages? | **High** | Uses Hexoskin’s **ECG and Respiratory sensors** to estimate sleep patterns. Crucial for the "Patient View." |
| **Sensors - Enhanced Breathing Pattern Detection...** | How accurately can Hexoskin detect complex breathing patterns? | **High** | Details the "flow reversal" and "breathing rate" algorithms. This is the logic for **Breathing Trend** graphs. |
| **Applied Ergonomics (1-s2.0-S0003...046-main.pdf)** | Can smart shirts reliably track heart rate and HRV during stress? | **Medium** | Shows Hexoskin is valid for tracking **physiological stress** (HRV). Explains the "Biomarker" data source. |

---

### 3. Vital Sign Monitoring & Masimo
These papers cover clinical-grade sensors for oxygen (SpO2) and respiration (RRa).

| Paper Name | Key Questions Answered | Relevance | Methodology/Notes |
| :--- | :--- | :--- | :--- |
| **McGrath - J Patient Saf (2021)...** | Does continuous monitoring actually save lives in homecare? | **High** | Provides the **clinical "Why"** for the Physician's dashboard (reducing mortality through early detection). |
| **Pediatric Anesthesia (Patino)...** | How accurate is "acoustic" respiration monitoring (RRa)? | **Medium** | Explains the tech for tracking **Respiration Rate (RR)** using sound. Relevant for real-time breathing alerts. |

---

### 4. Consumer Wearables & Smartwatches
These papers address the use of consumer-grade devices (Withings, etc.) in the project.

| Paper Name | Key Questions Answered | Relevance | Methodology/Notes |
| :--- | :--- | :--- | :--- |
| **Remote Monitoring of Vital and Activity Parameters...** | Can consumer wearables (Withings) be used for medical monitoring? | **Medium** | Validates the use of **Withings Steel HR** for heart rate and activity. Relevant for low-risk monitoring views. |
| **Smartwatches in healthcare medicine assistance...** | What is the general state of smartwatch accuracy in medicine? | **Low** | General overview of the industry; useful for context but not for specific dashboard logic. |

---

### Summary for Dashboard Development
*   **Physician Role:** Needs the "McGrath" safety metrics and "Pathology" detection from Somno-Art.
*   **Technician Role:** Needs the "Breathing Pattern" and "Sleep Classifications" from Hexoskin/Somno-Art.
*   **Patient Role:** Needs the simplified "Activity" and "Sleep Quality" scores from Withings/Smartwatches.
