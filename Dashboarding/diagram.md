# Frontend Architecture: Clinical Stakeholder Diagrams

### 1. The Physician View
*Focuses on the clear flow from the Exception Inbox to authorizing an alternative therapy.*

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

### 2. The Technician View
*Focuses on the tactical workflow of reviewing the queue, prepping for a visit, and logging hardware.*

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

### 3. The Patient View (Dual-Routing Focus)
*Clearly illustrates how the patient's self-reported issues feed both the human tech and the AI without overwhelming the reader.*

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

