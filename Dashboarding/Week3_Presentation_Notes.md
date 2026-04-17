# Week 3 Presentation: Progress & Architecture

---

### **Slide 1: What I Did This Week**

**Tasks Completed from the Weekly Plan:**
*   **Finalized the Architecture:** Finished the overall frontend architecture design (deciding exactly what data belongs where). This was planned for last week, but is now completely locked in and perfect!
*   **Wireframe Design:** Created the wireframes (UI layouts) for the 3 main roles: Patient, Technician, and Physician. This includes the core tabs like Biomarkers, CPAP, and Surveys.
*   **System Flow Diagrams:** Drew Use Case diagrams using PlantUML to show exactly how the AI, Technician, and Physician work together (especially for the APPEL IAH alert).
*   **Navigation Update:** Changed the layout to a simpler "drill-down" flow so that each user role only sees what they need without getting cluttered.

**What Task is Pending (Why & My Plan):**
*   **Pending:** Finishing the last few wireframe screens (like the Help page and Technician Queue).
*   **Why:** I focused hard on getting the main navigation and architecture right first. If the main structure is confusing, creating a hundred screens is a waste of time.
*   **Plan:** Now that the main flow works perfectly, I am wrapping up the remaining wireframes quickly.

---

### **Slide 2: Current Status**

**What is Working / Done:**
*   The overall Frontend Architecture is officially finalized.
*   The main wireframes for the Patient and Physician are practically finished and ready for Yasaman's review.
*   The screen isolation between roles (Patient vs. Tech vs. Doctor) is working perfectly in the prototype.
*   The system diagrams are finished (I put screenshots in this presentation).

**What is Still In Progress:**
*   Finishing up the Technician queue wireframe and the Coaching Videos section.

**Any Blockers or Delays:**
*   **No active blockers.** I spent a little extra time fixing the main layout early in the week, which delayed making the actual screens slightly. However, catching those usability issues early means the final designs are much better!

---

### **Slide 3: Plan for Next Week (Week 4)**

**Specific Tasks for Week 4:**
*   **Design Review with Yasaman:** Meet with Yasaman to review the 3 role homepages and tabs, get her feedback, and get official design approval.
*   **API Alignment with Siamak:** Meet with Siamak to agree on API contracts (how the frontend and backend talk to each other) and agree exactly what data each tab will receive.

---

### **Slide 4: Open Questions**

**Technical or Task-Related Points Still Unclear:**
*   **Putting AI in the Normal Flow:** We decided to put the AI warnings directly into the normal workflow (like inside the Physician's Inbox) instead of making an isolated "AI Tab". Do we all agree that this looks cleaner and is less confusing?
*   **Technician Independence:** Should Physicians manually approve simple hardware tasks (like giving a patient a new mask), or can Technicians just do it automatically without asking?

**Any Dependency Blocking Progress:**
*   **Data Format:** No hard blockers right now, but I will need the final API details from Siamak next week so I can make sure my frontend code matches the real database format perfectly.
