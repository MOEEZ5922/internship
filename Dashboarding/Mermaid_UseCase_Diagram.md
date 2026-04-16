# SleepCare Ecosystem: Use Case Diagram

### 1. The Classical UML Standard (PlantUML)
*Your screenshot reveals exactly why PlantUML was failing: the internal "Packages" (Subgraphs) were acting as solid walls. The PlantUML Graphviz engine refuses to draw lines through packages, so it was forced to route all the dotted dependencies out the side door, around the entire system boundary, and back in! I have stripped the internal packages so the Use Cases are free-floating inside the system. The engine will now instantly clump them together based on their connections and route the dependencies flawlessly through the center.*

```plantuml
@startuml
left to right direction
skinparam packageStyle rectangle

actor Patient
actor Physician
actor Technician
actor "🧠 AI Risk Model" as AI

rectangle "SleepCare Dashboard System" {
  
  usecase "View Adherence & Progress" as UC_Adherence
  usecase "Complete Milestone Surveys" as UC_Milestone
  usecase "Submit Self-Report" as UC_Report
  usecase "Track Equipment Delivery" as UC_Track

  usecase "Manage Exception Inbox" as UC_Inbox
  usecase "Review Pathway & Viability Log" as UC_Pathway
  usecase "Authorize Alternative Therapy" as UC_Auth

  usecase "Manage Priority Queue" as UC_Queue
  usecase "Log Hardware Dispatch" as UC_Dispatch
  usecase "Complete Post-Visit Log" as UC_VisitLog

  usecase "Calculate Dropout Risk" as UC_CalcRisk
  usecase "Flag Clinical Escalation" as UC_FlagEsc
}

' Actors on the Left Layout
Patient -- UC_Adherence
Patient -- UC_Milestone
Patient -- UC_Report
Patient -- UC_Track

Physician -- UC_Inbox
Physician -- UC_Pathway
Physician -- UC_Auth

' Actors on the Right Layout
UC_Queue -- Technician
UC_Dispatch -- Technician
UC_VisitLog -- Technician

UC_CalcRisk -- AI
UC_FlagEsc -- AI

' Internal Logical Dependencies
UC_Report .up.> UC_Queue : <<include>>\nAlert Tech
UC_Report .up.> UC_CalcRisk : <<include>>\nFeed Data

UC_CalcRisk .up.> UC_Queue : <<extend>>\nSort Queue
UC_CalcRisk .up.> UC_FlagEsc : <<extend>>\nTrigger Urgent Alert

UC_FlagEsc .up.> UC_Inbox : <<include>>\nPopulate Inbox

UC_Dispatch .down.> UC_Pathway : <<extend>>\nProvide History
@enduml
```

---

### 2. The Strict-Linear Fallback (Mermaid)

```mermaid
%%{init: {'flowchart': {'curve': 'stepBefore'}}}%%
flowchart LR
    Patient["Patient"]
    Tech["Technician"]
    Physician["Physician"]
    AI["🧠 AI Risk Model"]

    classDef actor fill:none,stroke:none,text-align:center,font-weight:bold;
    class Patient,Tech,Physician,AI actor;

    subgraph SleepCare["SleepCare Dashboard System"]
        direction TB
        
        subgraph Pat_UI["Patient Interface"]
            UC_Adherence(["View Adherence & Progress"])
            UC_Milestone(["Complete Milestone Surveys"])
            UC_Report(["Submit Self-Report"])
            UC_Track(["Track Equipment Delivery"])
        end
        
        subgraph Tech_UI["Technician Interface"]
            UC_Queue(["Manage Priority Queue"])
            UC_Dispatch(["Log Hardware Dispatch"])
            UC_VisitLog(["Complete Post-Visit Log"])
        end

        subgraph Doc_UI["Physician Interface"]
            UC_Inbox(["Manage Exception Inbox"])
            UC_Pathway(["Review Pathway & Viability Log"])
            UC_Auth(["Authorize Alternative Therapy"])
        end

        subgraph AI_UI["AI Framework"]
            UC_CalcRisk(["Calculate Dropout Risk"])
            UC_FlagEsc(["Flag Clinical Escalation"])
        end
    end

    Patient --- UC_Adherence
    Patient --- UC_Milestone
    Patient --- UC_Report
    Patient --- UC_Track

    Tech --- UC_Queue
    Tech --- UC_Dispatch
    Tech --- UC_VisitLog

    Physician --- UC_Inbox
    Physician --- UC_Pathway
    Physician --- UC_Auth

    UC_CalcRisk --- AI
    UC_FlagEsc --- AI

    UC_Report -. "&laquo;include&raquo;<br/>Alert Tech" .-> UC_Queue
    UC_Report -. "&laquo;include&raquo;<br/>Feed Data" .-> UC_CalcRisk
    
    UC_CalcRisk -. "&laquo;extend&raquo;<br/>Sort Queue" .-> UC_Queue
    UC_CalcRisk -. "&laquo;extend&raquo;<br/>Trigger Urgent Alert" .-> UC_FlagEsc
    
    UC_FlagEsc -. "&laquo;include&raquo;<br/>Populate Inbox" .-> UC_Inbox
    
    UC_Dispatch -. "&laquo;extend&raquo;<br/>Provide History" .-> UC_Pathway
```
