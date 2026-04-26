# Internship Progress Report

**Student:** Moeez Ahmed  
**Date:** April 26, 2026  
**Internship Topic:** SleepCare — Integrated Sleep Apnea Management Platform  
**Host Organization:** DISP Lab (University of Lyon 2)

## 1. Supervisor Information
*   **Name:** Yasaman Kakaei Siahkal
*   **Role:** PhD Researcher / Project Supervisor
*   **Email:** [yasaman.kakaei-siahkal@univ-lyon2.fr](mailto:yasaman.kakaei-siahkal@univ-lyon2.fr)

## 2. Project Context & Objectives
**SleepCare** is a digital health platform designed to improve therapy success for patients with **Obstructive Sleep Apnea (OSA)**. 

OSA is a condition where breathing stops during sleep, leading to serious health risks if untreated. While CPAP therapy is effective, many patients stop using it ("dropout") due to technical or comfort issues. SleepCare aims to solve this by:
*   **Predicting Dropout:** Using AI and digital biomarkers (HRV, SpO2) to identify at-risk patients early.
*   **Improving Coordination:** Providing tailored dashboards for Physicians, Technicians, and Patients to ensure faster intervention when issues arise.

## 3. Achievements to Date
I have completed the first phase of the internship and started the development phase.

### Phase 1: Requirements & Design (Weeks 1–4)
*   **Research:** Studied academic papers on sleep apnea therapy and digital biomarkers (Weeks 1–2).
*   **Stakeholder Meetings:** Worked with Yasaman and the backend intern to define the features needed for each user role.
*   **UI/UX Design:** Created high-fidelity wireframes for the role-based dashboards and specialized tabs.
*   **API Strategy:** Collaborated with the backend intern to define API contracts and data formats for the dashboards (Week 4).

### Phase 2: Core Development (Starting - Week 5)
*   **Project Setup:** Initialize the React project with TypeScript and Tailwind CSS.
*   **Functional Design:** Define screen logic and component inventory.
*   **Mock Integration:** Connect to the backend intern's mock API for component development.

## 4. Upcoming Schedule
The following tasks are planned for the next phases:

*   **Week 5:** Initialize the React + TypeScript project and set up the mock API environment.
*   **Weeks 6–13:** Build core tabs (AHI trends, Biomarkers, Interventions, Surveys) and AI monitoring panels.
*   **Week 13:** Deliver a full working prototype demo.
*   **Phase 3 (Weeks 14-18):** **AI Integration**.
    *   Add advanced patient history views for physicians.
    *   Create visit preparation cards for technicians.
    *   Implement alerts for low-confidence AI data.
*   **Phase 4 (Weeks 19-21):** **Testing & Optimization**.
    *   Test usability with technicians and improve performance.
*   **Phase 5 (Weeks 22-24):** Final documentation and report submission.

## 5. Challenges Faced
*   **Data Handling:** Combining data from different hardware brands (ResMed, Withings, etc.) into a single, clean interface.
*   **Information Design:** Designing the physician dashboard to show critical alerts without overwhelming them with too much data.
*   **API Alignment:** Working closely with the backend intern to ensure the frontend handles data gaps or sensor errors correctly.

## 6. System Diagrams

### Use Case Diagram
This diagram shows how different users interact with the SleepCare platform.

```mermaid
flowchart LR
    Patient["Patient"]
    Tech["Technician"]
    Physician["Physician"]
    AI["🧠 AI Risk Model"]

    classDef actor fill:none,stroke:none,text-align:center,font-weight:bold;
    class Patient,Tech,Physician,AI actor;

    subgraph Pat_UI["Patient Interface"]
        UC_Adherence(["View Adherence & Progress"])
        UC_Milestone(["Complete Milestone Surveys"])
        UC_Report(["Submit Self-Report"])
    end
    
    subgraph Tech_UI["Technician Interface"]
        UC_Queue(["Manage Priority Queue"])
        UC_Dispatch(["Log Hardware Dispatch"])
    end

    subgraph Doc_UI["Physician Interface"]
        UC_Inbox(["Manage Exception Inbox"])
        UC_Pathway(["Review Pathway Log"])
    end

    subgraph AI_UI["AI Framework"]
        UC_CalcRisk(["Calculate Dropout Risk"])
        UC_FlagEsc(["Flag Clinical Escalation"])
    end

    Patient --- Pat_UI
    Tech --- Tech_UI
    Physician --- Doc_UI
    AI --- AI_UI

    UC_Report -.-> UC_Queue
    UC_Report -.-> UC_CalcRisk
    UC_CalcRisk -.-> UC_Queue
    UC_CalcRisk -.-> UC_FlagEsc
    UC_FlagEsc -.-> UC_Inbox
    UC_Dispatch -.-> Doc_UI
```

### Sequence Diagrams

#### Physician Workflow
Shows the process of monitoring critical alerts and authorizing new treatments.

```mermaid
sequenceDiagram
    actor Physician
    participant Dashboard as Physician Dashboard
    participant System as Core System

    Physician->>Dashboard: Open "Exception-Based Inbox"
    Dashboard->>System: Request critical patients
    System-->>Dashboard: Return Risk 8+ & Complex AHI Alerts
    Dashboard-->>Physician: Show Urgent Actions Tab

    Physician->>Dashboard: Click Patient -> View Pathway Report
    System-->>Dashboard: Load OAI, Surveys & Viability Log
    Dashboard-->>Physician: Display full clinical & historical context

    Note over Physician, Dashboard: Physician evaluates Viability Log for past failures
    
    Physician->>Dashboard: Authorize Alternative Therapy (MAD/HNS)
    Dashboard->>System: Log therapy authorization
    System-->>Dashboard: Success
    Dashboard-->>Physician: Confirm therapy transition
```

#### Technician Workflow
Shows how technicians prepare for and log patient visits.

```mermaid
sequenceDiagram
    actor Technician
    participant Dashboard as Tech Dashboard
    participant System as Core System

    Technician->>Dashboard: Open Unified Priority Queue
    Dashboard->>System: Request tasks (Dropout Risk & Lack of Usage)
    System-->>Dashboard: Return sorted patients & Postal Codes
    Dashboard-->>Technician: Show Queue with Intervention Action Badges

    Technician->>Dashboard: Open "Visit Prep Card"
    System-->>Dashboard: Load Mask Type, Change Date, Leakage Rates
    Dashboard-->>Technician: Display hardware needed for home visit

    Note over Technician, Dashboard: Technician performs remote call or home visit
    
    Technician->>Dashboard: Log physical dispatch via Device Logistics Tracker
    Dashboard->>System: Update patient's hardware record
    
    Technician->>Dashboard: Submit Post-Visit Monitoring Log
    Dashboard->>System: Save operational survey answers
    Dashboard-->>Technician: Confirm intervention logged
```

#### Patient Workflow
Shows how patient feedback updates both the technician and the AI risk model.

```mermaid
sequenceDiagram
    actor Patient
    participant App as Patient Mobile App
    participant TechQueue as Technician Queue
    participant AI as AI Risk Framework

    Patient->>App: Open Application
    App-->>Patient: Show "Next Step" Card & Visual Progress

    Note over Patient, AI: Self-Reporting Tool (Dual-Routing)
    Patient->>App: Report issue ("Mask is causing discomfort")
    
    par Route to Human
        App->>TechQueue: Trigger Actionable Alert for intervention
    and Route to AI Model
        App->>AI: Feed symptoms as behavioral feedback
        AI-->>AI: Recalculate Dropout Probability Score
    end

    App-->>Patient: "A technician will review your report shortly."

    Note over Patient, App: Milestone Survey Schedule
    App-->>Patient: Prompt: "30-Day Check-in Ready"
    Patient->>App: Complete Milestone Wizard (PSQI/ESS forms)
    App->>AI: Save clinical survey scores
```

---

## 7. UI Snapshots

#### Role Selector Page
![Role Selector Page](screenshots/role_selector_page_1777241616163.png)

#### Physician Portal Dashboard
![Physician Portal Dashboard](screenshots/physician_portal_page_1777241630115.png)

#### Technician Portal Dashboard
![Technician Portal Dashboard](screenshots/technician_portal_page_1777241645938.png)

#### Patient Portal Dashboard
![Patient Portal Dashboard](screenshots/patient_dashboard_maximized_1777241781121.png)
