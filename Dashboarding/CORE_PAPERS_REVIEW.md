# Literary Overview: Core Dashboard Framework (Revised)
## PhD Research & Functional Logic (Accuracy Verified)

This document summarizes the foundational research papers that define the dashboard's logic, risk models, and user roles, corrected for clinical accuracy.

---

### 1. The Core Research Papers

| Paper Name | Key Questions Answered | Methodology & Dashboard UI Logic |
| :--- | :--- | :--- |
| **DASA-Paper-Final.pdf** | 1. What are the 8 intervention types? <br> 2. How do we measure intervention success? | **Intervention Taxonomy:** Defines 8 actions (Educational, Technical, Behavioral, Motivational, Supportive, Escalation, Follow-up, Admin). Uses a **7-day symmetric window** to track efficacy. |
| **CBMS_yasaman.pdf** | 1. What are the 4 therapy phases? <br> 2. How is the 0–8+ risk score calculated? | **Logic Framework:** Defines the 4 phases (New, Adherent, Attempting, Non-Adherent). Establishes the **Weekly Composite Risk Score (0–8 or greater)**. |
| **BHI-2024295868.pdf** | 1. What are the specific patient profiles? <br> 2. How do we cluster 570+ patients? | **Profile Refinement:** Refines 3 broad clusters into **6 detailed profiles** (Adherent Low/High Risk, Attempting High/Low Priority, Non-Adherent, Unknown). |

---

### 2. Corrected Risk Thresholds for UI Alerts

The dashboard UI must use these specific mathematical triggers for alerting:

*   **Risk 0–2 (Low):** Standard monitoring.
*   **Risk 3–4 (Moderate):** Trigger **Monitoring Enhancements** (Technician View).
*   **Risk 5–7 (High):** Trigger **Automated Medical Procedures** (System Level).
*   **Risk 8+ (Critical):** Demand **Immediate Physician Attention** (Physician View).

---

### 3. Verified User Roles

*   **The Physician:** Focuses on patients with a Risk Score **$\ge 8$**. Requires a "Medical procedure signature" and deep-dive pathology data.
*   **The Technician:** Manages the 8 intervention types. Focuses on patients in the "Attempting" profiles and Moderate risk (3–4) levels.
*   **The Patient:** Progresses through 4 phases. Receives the interventions (SMS/Call/Visit) and provides survey feedback.

---

### 4. Updated Dashboard Requirements

1.  **Risk Scale:** UI must support a score range of **0 to 8 or greater**.
2.  **6-Profile Tracking:** Patient tables must be filterable by the 6 specific risk profiles (Adherent-High, Attempting-Priority, etc.).
3.  **8-Type Intervention Logging:** The "Action" menu for Technicians must include all 8 taxonomy categories.
4.  **7-Day Windows:** All "Before/After" efficacy charts must use the 7-day symmetric comparison model.
