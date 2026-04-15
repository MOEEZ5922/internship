import { createBrowserRouter } from "react-router";
import RoleSelector from "./pages/RoleSelector";
import PhysicianLayout from "./layouts/PhysicianLayout";
import TechnicianLayout from "./layouts/TechnicianLayout";
import PatientLayout from "./layouts/PatientLayout";
import PhysicianPatientLayout from "./layouts/PhysicianPatientLayout";
import TechnicianPatientLayout from "./layouts/TechnicianPatientLayout";
import PhysicianHome from "./pages/physician/Home";
import PhysicianBiomarkers from "./pages/physician/Biomarkers";
import PhysicianInterventions from "./pages/physician/Interventions";
import PhysicianSurveys from "./pages/physician/Surveys";
import PhysicianCPAP from "./pages/physician/CPAP";
import PhysicianHelp from "./pages/physician/Help";
import PhysicianDirectory from "./pages/physician/Directory";
import TechnicianHome from "./pages/technician/Home";
import TechnicianCPAP from "./pages/technician/CPAP";
import TechnicianInterventions from "./pages/technician/Interventions";
import TechnicianSurveys from "./pages/technician/Surveys";
import TechnicianHelp from "./pages/technician/Help";
import TechnicianInventory from "./pages/technician/Inventory";
import PatientHome from "./pages/patient/Home";
import PatientCPAP from "./pages/patient/CPAP";
import PatientSurveys from "./pages/patient/Surveys";
import PatientVideos from "./pages/patient/Videos";
import PatientHelp from "./pages/patient/Help";
import PatientInterventions from "./pages/patient/Interventions";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RoleSelector,
  },
  {
    path: "/physician",
    Component: PhysicianLayout,
    children: [
      { index: true, Component: PhysicianHome },
      { path: "directory", Component: PhysicianDirectory },
      { path: "help", Component: PhysicianHelp },
      {
        path: "patient/:patientId",
        Component: PhysicianPatientLayout,
        children: [
          { index: true, Component: PhysicianCPAP },
          { path: "biomarkers", Component: PhysicianBiomarkers },
          { path: "interventions", Component: PhysicianInterventions },
          { path: "surveys", Component: PhysicianSurveys },
        ],
      },
    ],
  },
  {
    path: "/technician",
    Component: TechnicianLayout,
    children: [
      { index: true, Component: TechnicianHome },
      { path: "inventory", Component: TechnicianInventory },
      { path: "help", Component: TechnicianHelp },
      {
        path: "patient/:patientId",
        Component: TechnicianPatientLayout,
        children: [
          { index: true, Component: TechnicianCPAP },
          { path: "interventions", Component: TechnicianInterventions },
          { path: "surveys", Component: TechnicianSurveys },
        ],
      },
    ],
  },
  {
    path: "/patient",
    Component: PatientLayout,
    children: [
      { index: true, Component: PatientHome },
      { path: "cpap", Component: PatientCPAP },
      { path: "interventions", Component: PatientInterventions },
      { path: "surveys", Component: PatientSurveys },
      { path: "videos", Component: PatientVideos },
      { path: "help", Component: PatientHelp },
    ],
  },
]);
