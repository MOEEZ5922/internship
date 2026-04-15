PROJECT CODE SUMMARY


--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\app\App.tsx ---

```tsx

import { RouterProvider } from 'react-router';
import { router } from './routes';

export default function App() {
  return <RouterProvider router={router} />;
}

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\app\routes.tsx ---

```tsx

import { createBrowserRouter } from "react-router";
import RoleSelector from "./pages/RoleSelector";
import PhysicianLayout from "./layouts/PhysicianLayout";
import TechnicianLayout from "./layouts/TechnicianLayout";
import PatientLayout from "./layouts/PatientLayout";
import PhysicianHome from "./pages/physician/Home";
import PhysicianBiomarkers from "./pages/physician/Biomarkers";
import PhysicianInterventions from "./pages/physician/Interventions";
import PhysicianSurveys from "./pages/physician/Surveys";
import TechnicianHome from "./pages/technician/Home";
import TechnicianCPAP from "./pages/technician/CPAP";
import TechnicianInterventions from "./pages/technician/Interventions";
import TechnicianSurveys from "./pages/technician/Surveys";
import PatientHome from "./pages/patient/Home";
import PatientCPAP from "./pages/patient/CPAP";
import PatientSurveys from "./pages/patient/Surveys";
import PatientVideos from "./pages/patient/Videos";
import PatientHelp from "./pages/patient/Help";

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
      { path: "biomarkers", Component: PhysicianBiomarkers },
      { path: "interventions", Component: PhysicianInterventions },
      { path: "surveys", Component: PhysicianSurveys },
    ],
  },
  {
    path: "/technician",
    Component: TechnicianLayout,
    children: [
      { index: true, Component: TechnicianHome },
      { path: "cpap", Component: TechnicianCPAP },
      { path: "interventions", Component: TechnicianInterventions },
      { path: "surveys", Component: TechnicianSurveys },
    ],
  },
  {
    path: "/patient",
    Component: PatientLayout,
    children: [
      { index: true, Component: PatientHome },
      { path: "cpap", Component: PatientCPAP },
      { path: "surveys", Component: PatientSurveys },
      { path: "videos", Component: PatientVideos },
      { path: "help", Component: PatientHelp },
    ],
  },
]);

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\app\components\figma\ImageWithFallback.tsx ---

```tsx

import React, { useState } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  const { src, alt, style, className, ...rest } = props

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={handleError} />
  )
}

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\app\data\mockData.ts ---

```tsx

export const patientInfo = {
  name: "Sarah Mitchell",
  dob: "1978-06-15",
  riskScore: 72,
  therapyStatus: "Active - CPAP",
  address: "1425 Maple Street, Portland, OR 97214",
  machineSerial: "CPAP-2024-8745",
  maskType: "AirFit F20 - Medium",
};

// Physician Exception-Based Inbox Data
export const physicianQueue = {
  urgent: [
    {
      id: 1,
      patientName: "Sarah Mitchell",
      riskScore: 85,
      reason: "AHI spike: 12.4 (â†‘45% from baseline)",
      category: "Complex AHI",
      lastReview: "2026-03-15",
      daysOverdue: 0,
    },
    {
      id: 2,
      patientName: "Robert Chen",
      riskScore: 92,
      reason: "Central apneas increasing (>60% of events)",
      category: "Complex AHI",
      lastReview: "2026-03-10",
      daysOverdue: 5,
    },
    {
      id: 3,
      patientName: "Maria Garcia",
      riskScore: 78,
      reason: "ODI >30 with SpO2 desaturation events",
      category: "Risk Score 8+",
      lastReview: "2026-04-01",
      daysOverdue: 0,
    },
  ],
  annualReviews: [
    {
      id: 4,
      patientName: "James Wilson",
      riskScore: 45,
      therapyStart: "2025-04-10",
      daysUntilDue: 5,
      status: "Due Soon",
    },
    {
      id: 5,
      patientName: "Emily Johnson",
      riskScore: 38,
      therapyStart: "2025-03-20",
      daysUntilDue: -10,
      status: "Overdue",
    },
  ],
};

// Technician Priority Queue Data
export const technicianQueue = [
  {
    id: 1,
    patientName: "Sarah Mitchell",
    dropoutRisk: 85,
    usageHours: 1.2,
    usageCategory: "<2 hrs",
    postalCode: "97214",
    lastContact: "2026-04-10",
    action: "Urgent Follow-up",
  },
  {
    id: 2,
    patientName: "Robert Chen",
    dropoutRisk: 72,
    usageHours: 3.5,
    usageCategory: "2-4 hrs",
    postalCode: "97203",
    lastContact: "2026-04-08",
    action: "Mask Refit",
  },
  {
    id: 3,
    patientName: "Maria Garcia",
    dropoutRisk: 68,
    usageHours: 1.8,
    usageCategory: "<2 hrs",
    postalCode: "97212",
    lastContact: "2026-04-12",
    action: "Equipment Check",
  },
  {
    id: 4,
    patientName: "James Wilson",
    dropoutRisk: 45,
    usageHours: 6.2,
    usageCategory: "4+ hrs",
    postalCode: "97214",
    lastContact: "2026-04-05",
    action: "Routine Check-in",
  },
];

export const cpapData = {
  currentAHI: 4.2,
  percentileLeak: 12.5,
  averageHours: 6.8,
  lastMaskChange: "2026-02-10",
  pressureSettings: {
    min: 6,
    max: 14,
    current: 10.5,
  },
  usageHistory: [
    { date: "2026-04-08", hours: 7.2, ahi: 3.8 },
    { date: "2026-04-09", hours: 6.5, ahi: 4.1 },
    { date: "2026-04-10", hours: 7.8, ahi: 3.2 },
    { date: "2026-04-11", hours: 5.2, ahi: 5.8 },
    { date: "2026-04-12", hours: 7.5, ahi: 3.9 },
    { date: "2026-04-13", hours: 6.9, ahi: 4.2 },
    { date: "2026-04-14", hours: 7.1, ahi: 3.6 },
  ],
  thirtyDayTrend: Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    ahi: 3 + Math.random() * 4,
    central: 1 + Math.random() * 2,
    obstructive: 2 + Math.random() * 2,
  })),
  streak: 4,
};

export const biomarkerData = {
  sleepQuality: 85,
  restfulness: "Good",
  odi: Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    value: 8 + Math.random() * 6,
  })),
  hrv: Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    value: 45 + Math.random() * 20,
  })),
  spo2: Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    value: 93 + Math.random() * 4,
  })),
  status: {
    vitals: "green",
    general: "Good",
  },
};

export const interventionData = {
  physician: {
    availableTherapies: [
      "Mandibular Advancement Device",
      "Hypoglossal Nerve Stimulation",
      "Positional Therapy",
      "Oral Appliance Therapy",
    ],
  },
  technician: {
    tasks: [
      {
        id: 1,
        status: "To Dispatch",
        item: "New Medium AirFit Mask",
        priority: "High",
        scheduledDate: "2026-04-16",
      },
      {
        id: 2,
        status: "In Transit",
        item: "Replacement Headgear",
        priority: "Medium",
        scheduledDate: "2026-04-15",
      },
      {
        id: 3,
        status: "Delivered",
        item: "Heated Humidifier",
        priority: "Low",
        scheduledDate: "2026-04-12",
      },
    ],
  },
  patient: {
    upcomingDelivery: {
      item: "New Medium AirFit Mask",
      status: "In Transit",
      estimatedArrival: "2026-04-16",
      steps: [
        { label: "Order Placed", completed: true },
        { label: "In Transit", completed: true },
        { label: "Out for Delivery", completed: false },
        { label: "Delivered", completed: false },
      ],
    },
  },
};

export const surveyData = {
  physician: [
    {
      id: 1,
      name: "Pittsburgh Sleep Quality Index (PSQI)",
      dateTaken: "2026-04-01",
      score: 8,
      threshold: 5,
      risk: "Elevated",
    },
    {
      id: 2,
      name: "Epworth Sleepiness Scale (ESS)",
      dateTaken: "2026-04-01",
      score: 12,
      threshold: 10,
      risk: "Moderate",
    },
    {
      id: 3,
      name: "STOP-BANG Questionnaire",
      dateTaken: "2026-03-15",
      score: 6,
      threshold: 3,
      risk: "High",
    },
  ],
  technician: [
    {
      id: 1,
      name: "Post-Visit Hardware Log",
      type: "Operational",
      lastCompleted: "2026-03-20",
    },
    {
      id: 2,
      name: "Mask Comfort Check",
      type: "Operational",
      lastCompleted: "2026-04-05",
    },
  ],
  patient: {
    next: {
      name: "1-Month Check-In",
      dueDate: "2026-04-18",
      questions: 8,
    },
    history: [
      { name: "Initial Assessment", completed: "2026-03-01", score: "Complete" },
      { name: "2-Week Follow-Up", completed: "2026-03-15", score: "Complete" },
    ],
  },
};

export const aiData = {
  physician: {
    riskLevel: "Yellow",
    riskScore: 72,
    keyFindings: [
      "AHI trending upward over past 2 weeks (+15% increase)",
      "Mask leak events increased by 23% this week",
      "Patient compliance remains strong (>6 hrs/night)",
      "SpO2 desaturation events correlate with increased central apneas",
    ],
  },
  technician: {
    dropoutProbability: 15,
    riskFactors: [
      "Patient is removing mask at 3 AM consistently",
      "Leak rate spiked on 4/11 - possible mask fit issue",
      "Usage hours declined by 1.2 hrs/night this week",
    ],
    recommendation: "Schedule mask refit appointment",
  },
  patient: {
    weeklyMessage: "Great job this week! You used your therapy 15% more than last week.",
    improvements: [
      "Sleep quality improved by 8 points",
      "4-day streak achieved!",
      "Average usage increased to 6.8 hours",
    ],
    tip: "Try wearing your mask for 30 minutes before bed to get comfortable",
  },
};

export const videoData = {
  physician: [
    {
      id: 1,
      title: "Understanding AHI Trends",
      duration: "8:24",
      category: "Clinical Education",
      thumbnail: "clinical",
    },
    {
      id: 2,
      title: "Interpreting Leak Data",
      duration: "6:15",
      category: "Clinical Education",
      thumbnail: "clinical",
    },
    {
      id: 3,
      title: "Alternative Therapy Options",
      duration: "12:40",
      category: "Treatment Options",
      thumbnail: "clinical",
    },
  ],
  technician: [
    {
      id: 1,
      title: "Mask Fitting Best Practices",
      duration: "10:22",
      category: "Technical Support",
      thumbnail: "technical",
    },
    {
      id: 2,
      title: "Troubleshooting Leak Issues",
      duration: "7:18",
      category: "Technical Support",
      thumbnail: "technical",
    },
    {
      id: 3,
      title: "CPAP Pressure Adjustment Guide",
      duration: "9:45",
      category: "Technical Support",
      thumbnail: "technical",
    },
  ],
  patient: [
    {
      id: 1,
      title: "How to Tighten Your Mask",
      duration: "3:24",
      category: "Getting Started",
      thumbnail: "patient",
      relevance: "high",
    },
    {
      id: 2,
      title: "Building a Bedtime Routine",
      duration: "5:12",
      category: "Tips & Tricks",
      thumbnail: "patient",
      relevance: "medium",
    },
    {
      id: 3,
      title: "Cleaning Your Equipment",
      duration: "4:08",
      category: "Maintenance",
      thumbnail: "patient",
      relevance: "medium",
    },
  ],
};

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\app\layouts\PatientLayout.tsx ---

```tsx

import { Outlet, Link, useLocation } from 'react-router';
import { Home, Activity, Video, FileText, HelpCircle } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/patient', icon: Home },
  { name: 'Sleep', href: '/patient/cpap', icon: Activity },
  { name: 'Videos', href: '/patient/videos', icon: Video },
  { name: 'Surveys', href: '/patient/surveys', icon: FileText },
  { name: 'Help', href: '/patient/help', icon: HelpCircle },
];

export default function PatientLayout() {
  const location = useLocation();

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-[#FAFAFA] to-[#E8EEF2]">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-[#6A994E] to-[#2D9596] px-6 py-6 text-white">
        <Link to="/" className="text-white/80 hover:text-white text-sm mb-3 inline-block">
          â† Back
        </Link>
        <h1 className="text-3xl mb-1">
          Good Evening, Sarah
        </h1>
        <p className="text-white/90">Let's check your sleep progress</p>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-auto pb-20">
        <Outlet />
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8EEF2] px-2 py-2 shadow-lg">
        <div className="flex items-center justify-around max-w-2xl mx-auto">
          {navigation.map((item) => {
            const isActive =
              location.pathname === item.href ||
              (location.pathname === '/patient' && item.href === '/patient');
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all min-w-[70px] ${
                  isActive
                    ? 'text-[#6A994E]'
                    : 'text-[#5A6B7C]'
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''} transition-transform`} />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\app\layouts\PhysicianLayout.tsx ---

```tsx

import { Outlet, Link, useLocation } from 'react-router';
import { Home, BarChart3, FileText, Settings, ArrowLeft } from 'lucide-react';
import { patientInfo } from '../data/mockData';

const navigation = [
  { name: 'Home', href: '/physician', icon: Home },
  { name: 'Biomarkers', href: '/physician/biomarkers', icon: BarChart3 },
  { name: 'Interventions', href: '/physician/interventions', icon: FileText },
  { name: 'Medical Surveys', href: '/physician/surveys', icon: FileText },
];

export default function PhysicianLayout() {
  const location = useLocation();

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'text-[#F4A261]';
    if (score >= 50) return 'text-[#F4A261]';
    return 'text-[#6A994E]';
  };

  return (
    <div className="h-screen flex bg-[#FAFAFA]">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-[#E8EEF2] flex flex-col">
        <div className="p-6 border-b border-[#E8EEF2]">
          <Link to="/" className="flex items-center gap-2 text-[#5A6B7C] hover:text-[#0A1128] transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Portal</span>
          </Link>
          <h1 className="text-2xl text-[#0A1128] mb-1">
            SleepCare
          </h1>
          <p className="text-sm text-[#5A6B7C]">Physician Portal</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-[#2D9596] text-white shadow-sm'
                    : 'text-[#5A6B7C] hover:bg-[#E8EEF2] hover:text-[#0A1128]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#E8EEF2]">
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#5A6B7C] hover:bg-[#E8EEF2] hover:text-[#0A1128] transition-all w-full">
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium">Settings</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-[#E8EEF2] px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-xs text-[#5A6B7C] mb-1">Patient Name</p>
                <p className="font-semibold text-[#0A1128]">{patientInfo.name}</p>
              </div>
              <div className="w-px h-10 bg-[#E8EEF2]" />
              <div>
                <p className="text-xs text-[#5A6B7C] mb-1">Date of Birth</p>
                <p className="text-[#0A1128]">{new Date(patientInfo.dob).toLocaleDateString()}</p>
              </div>
              <div className="w-px h-10 bg-[#E8EEF2]" />
              <div>
                <p className="text-xs text-[#5A6B7C] mb-1">Risk Score</p>
                <p className={`font-semibold ${getRiskColor(patientInfo.riskScore)}`}>
                  {patientInfo.riskScore}/100
                </p>
              </div>
              <div className="w-px h-10 bg-[#E8EEF2]" />
              <div>
                <p className="text-xs text-[#5A6B7C] mb-1">Current Therapy</p>
                <p className="text-[#0A1128]">{patientInfo.therapyStatus}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\app\layouts\TechnicianLayout.tsx ---

```tsx

import { Outlet, Link, useLocation } from 'react-router';
import { Home, Activity, Package, FileText, Settings, ArrowLeft } from 'lucide-react';
import { patientInfo } from '../data/mockData';

const navigation = [
  { name: 'Home', href: '/technician', icon: Home },
  { name: 'CPAP', href: '/technician/cpap', icon: Activity },
  { name: 'Interventions', href: '/technician/interventions', icon: Package },
  { name: 'Medical Surveys', href: '/technician/surveys', icon: FileText },
];

export default function TechnicianLayout() {
  const location = useLocation();

  return (
    <div className="h-screen flex bg-[#FAFAFA]">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-[#E8EEF2] flex flex-col">
        <div className="p-6 border-b border-[#E8EEF2]">
          <Link to="/" className="flex items-center gap-2 text-[#5A6B7C] hover:text-[#0A1128] transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Portal</span>
          </Link>
          <h1 className="text-2xl text-[#0A1128] mb-1">
            SleepCare
          </h1>
          <p className="text-sm text-[#5A6B7C]">Technician Portal</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || (location.pathname === '/technician' && item.href === '/technician/cpap');
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-[#F4A261] text-white shadow-sm'
                    : 'text-[#5A6B7C] hover:bg-[#E8EEF2] hover:text-[#0A1128]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#E8EEF2]">
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#5A6B7C] hover:bg-[#E8EEF2] hover:text-[#0A1128] transition-all w-full">
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium">Settings</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-[#E8EEF2] px-8 py-4">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-xs text-[#5A6B7C] mb-1">Patient Name</p>
              <p className="font-semibold text-[#0A1128]">{patientInfo.name}</p>
            </div>
            <div className="w-px h-10 bg-[#E8EEF2]" />
            <div>
              <p className="text-xs text-[#5A6B7C] mb-1">Address</p>
              <p className="text-[#0A1128]">{patientInfo.address}</p>
            </div>
            <div className="w-px h-10 bg-[#E8EEF2]" />
            <div>
              <p className="text-xs text-[#5A6B7C] mb-1">Machine Serial</p>
              <p className="text-[#0A1128] font-mono text-sm">{patientInfo.machineSerial}</p>
            </div>
            <div className="w-px h-10 bg-[#E8EEF2]" />
            <div>
              <p className="text-xs text-[#5A6B7C] mb-1">Mask Type</p>
              <p className="text-[#0A1128]">{patientInfo.maskType}</p>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\app\pages\RoleSelector.tsx ---

```tsx

import { Link } from 'react-router';
import { Stethoscope, Wrench, User } from 'lucide-react';

export default function RoleSelector() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1128] via-[#1a2744] to-[#2D9596] flex items-center justify-center p-6">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-16 animate-[fadeIn_0.8s_ease-out]">
          <h1 className="text-6xl text-white mb-4 tracking-tight">
            SleepCare
          </h1>
          <p className="text-xl text-white/80">
            Integrated Sleep Apnea Management Platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Physician Card */}
          <Link
            to="/physician"
            className="group relative bg-white rounded-2xl p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#2D9596]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-16 h-16 bg-[#2D9596]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#2D9596] transition-colors">
                <Stethoscope className="w-8 h-8 text-[#2D9596] group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-2xl mb-3 text-[#0A1128]">
                Physician Portal
              </h2>
              <p className="text-[#5A6B7C] leading-relaxed">
                Comprehensive clinical dashboard for diagnosis, treatment planning, and patient monitoring
              </p>
              <div className="mt-6 text-[#2D9596] group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                Enter Portal
                <span>â†’</span>
              </div>
            </div>
          </Link>

          {/* Technician Card */}
          <Link
            to="/technician"
            className="group relative bg-white rounded-2xl p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#F4A261]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-16 h-16 bg-[#F4A261]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#F4A261] transition-colors">
                <Wrench className="w-8 h-8 text-[#F4A261] group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-2xl mb-3 text-[#0A1128]">
                Technician Portal
              </h2>
              <p className="text-[#5A6B7C] leading-relaxed">
                Equipment management, patient support, and technical troubleshooting interface
              </p>
              <div className="mt-6 text-[#F4A261] group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                Enter Portal
                <span>â†’</span>
              </div>
            </div>
          </Link>

          {/* Patient Card */}
          <Link
            to="/patient"
            className="group relative bg-white rounded-2xl p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#6A994E]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-16 h-16 bg-[#6A994E]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#6A994E] transition-colors">
                <User className="w-8 h-8 text-[#6A994E] group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-2xl mb-3 text-[#0A1128]">
                Patient App
              </h2>
              <p className="text-[#5A6B7C] leading-relaxed">
                Your personal sleep therapy companion for tracking progress and staying motivated
              </p>
              <div className="mt-6 text-[#6A994E] group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                Enter App
                <span>â†’</span>
              </div>
            </div>
          </Link>
        </div>

        <div className="text-center mt-16 text-white/60">
          <p>Demo Environment â€¢ All data is simulated for demonstration purposes</p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\app\pages\patient\AI.tsx ---

```tsx

import { aiData } from '../../data/mockData';
import { TrendingUp, Sparkles, Lightbulb } from 'lucide-react';

export default function PatientAI() {
  return (
    <div className="p-6 space-y-6">
      {/* Weekly Message */}
      <div className="bg-gradient-to-br from-[#6A994E] to-[#4a7a35] rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-8 h-8" />
          <h2 className="text-2xl font-semibold">This Week's Wrap-Up</h2>
        </div>
        <p className="text-xl text-white/95 leading-relaxed">{aiData.patient.weeklyMessage}</p>
      </div>

      {/* Improvements */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#2D9596]/10 rounded-full flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-[#2D9596]" />
          </div>
          <h3 className="text-lg text-[#0A1128]">Your Improvements</h3>
        </div>

        <div className="space-y-3">
          {aiData.patient.improvements.map((improvement, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 bg-gradient-to-r from-[#6A994E]/5 to-[#2D9596]/5 rounded-xl border border-[#6A994E]/10"
            >
              <div className="w-6 h-6 bg-[#6A994E] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium">
                {index + 1}
              </div>
              <p className="text-[#0A1128] flex-1">{improvement}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Tip */}
      <div className="bg-gradient-to-br from-[#F4A261]/10 to-[#F4A261]/5 border-2 border-[#F4A261]/20 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-[#F4A261]/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-6 h-6 text-[#F4A261]" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg text-[#0A1128] mb-2">Tip of the Week</h3>
            <p className="text-[#5A6B7C] leading-relaxed">{aiData.patient.tip}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <p className="text-3xl font-bold text-[#6A994E] mb-1">6.8</p>
          <p className="text-xs text-[#5A6B7C]">Avg Hours/Night</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <p className="text-3xl font-bold text-[#2D9596] mb-1">85</p>
          <p className="text-xs text-[#5A6B7C]">Sleep Quality</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <p className="text-3xl font-bold text-[#F4A261] mb-1">4</p>
          <p className="text-xs text-[#5A6B7C]">Day Streak</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <p className="text-3xl font-bold text-[#6A994E] mb-1">+15%</p>
          <p className="text-xs text-[#5A6B7C]">vs Last Week</p>
        </div>
      </div>

      {/* Encouragement */}
      <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
        <p className="text-2xl mb-3">ðŸŽ‰</p>
        <p className="text-lg text-[#0A1128] font-medium mb-2">You're doing amazing!</p>
        <p className="text-sm text-[#5A6B7C]">
          Keep up the great work. Every night of therapy brings you closer to better health and
          more energy.
        </p>
      </div>
    </div>
  );
}

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\app\pages\patient\Biomarkers.tsx ---

```tsx

import { biomarkerData } from '../../data/mockData';
import { Heart, Star } from 'lucide-react';

export default function PatientBiomarkers() {
  return (
    <div className="p-6 space-y-6">
      {/* Sleep Quality Score */}
      <div className="bg-gradient-to-br from-[#6A994E] to-[#4a7a35] rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white/90 text-sm mb-2">Your Sleep Quality Score</p>
            <div className="flex items-baseline gap-2">
              <p className="text-6xl font-bold">{biomarkerData.sleepQuality}</p>
              <p className="text-2xl text-white/80">/100</p>
            </div>
          </div>
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
            <Star className="w-10 h-10" fill="white" />
          </div>
        </div>
        <p className="text-white/90">
          Excellent! Your sleep quality has improved significantly this month.
        </p>
      </div>

      {/* Restfulness */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-[#2D9596]/10 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-[#2D9596]" />
          </div>
          <div>
            <p className="text-sm text-[#5A6B7C]">How Rested You Feel</p>
            <p className="text-2xl font-semibold text-[#0A1128]">{biomarkerData.restfulness}</p>
          </div>
        </div>
        <p className="text-sm text-[#5A6B7C]">
          Based on your therapy data and health metrics, you're getting good quality rest.
        </p>
      </div>

      {/* What This Means */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg text-[#0A1128] mb-4">What This Means</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-[#6A994E] rounded-full mt-2 flex-shrink-0" />
            <div>
              <p className="text-[#0A1128] font-medium mb-1">Better Energy</p>
              <p className="text-sm text-[#5A6B7C]">
                You should feel more alert and energized during the day
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-[#2D9596] rounded-full mt-2 flex-shrink-0" />
            <div>
              <p className="text-[#0A1128] font-medium mb-1">Improved Health</p>
              <p className="text-sm text-[#5A6B7C]">
                Better sleep supports your heart health and immune system
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-[#F4A261] rounded-full mt-2 flex-shrink-0" />
            <div>
              <p className="text-[#0A1128] font-medium mb-1">Sharper Focus</p>
              <p className="text-sm text-[#5A6B7C]">
                Quality sleep helps with memory and concentration
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Visual */}
      <div className="bg-[#E8EEF2] rounded-2xl p-6">
        <h4 className="text-[#0A1128] font-medium mb-4">Your Progress Over Time</h4>
        <div className="flex items-end justify-between gap-2 h-32">
          {[65, 72, 78, 81, 85].map((value, index) => (
            <div key={index} className="flex-1 flex flex-col justify-end">
              <div
                className="bg-gradient-to-t from-[#6A994E] to-[#2D9596] rounded-t-lg transition-all"
                style={{ height: `${value}%` }}
              />
              <p className="text-xs text-[#5A6B7C] text-center mt-2">Week {index + 1}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-[#5A6B7C] mt-4">
          Your sleep quality has improved by 20 points in the last 5 weeks!
        </p>
      </div>
    </div>
  );
}

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\app\pages\patient\CPAP.tsx ---

```tsx

import { cpapData } from '../../data/mockData';
import { Moon, Flame } from 'lucide-react';

export default function PatientCPAP() {
  const percentComplete = (cpapData.averageHours / 8) * 100;

  return (
    <div className="p-6 space-y-6">
      {/* Sleep Ring */}
      <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
        <p className="text-[#5A6B7C] mb-2">Last Night</p>
        <div className="relative w-48 h-48 mx-auto mb-6">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="#E8EEF2"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="url(#gradient)"
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${percentComplete * 5.53} 553`}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6A994E" />
                <stop offset="100%" stopColor="#2D9596" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Moon className="w-8 h-8 text-[#2D9596] mb-2" />
            <p className="text-4xl font-bold text-[#0A1128]">
              {cpapData.usageHistory[cpapData.usageHistory.length - 1]?.hours.toFixed(1)}
            </p>
            <p className="text-sm text-[#5A6B7C]">hours</p>
          </div>
        </div>
        <p className="text-lg text-[#0A1128]">
          Great job! You slept{' '}
          <span className="font-semibold text-[#6A994E]">
            {cpapData.usageHistory[cpapData.usageHistory.length - 1]?.hours.toFixed(1)} hours
          </span>{' '}
          with your therapy
        </p>
      </div>

      {/* Streak Tracker */}
      <div className="bg-gradient-to-br from-[#F4A261] to-[#e39350] rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Flame className="w-8 h-8" />
          </div>
          <div>
            <p className="text-white/90 text-sm mb-1">Current Streak</p>
            <p className="text-4xl font-bold">{cpapData.streak} Days</p>
          </div>
        </div>
        <p className="mt-4 text-white/90 text-sm">
          Keep it up! You're building a healthy sleep routine.
        </p>
      </div>

      {/* Weekly Progress */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg text-[#0A1128] mb-4">This Week's Progress</h3>
        <div className="space-y-3">
          {cpapData.usageHistory.map((day, index) => {
            const date = new Date(day.date);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const progress = (day.hours / 8) * 100;

            return (
              <div key={index}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#5A6B7C]">{dayName}</span>
                  <span className="text-[#0A1128] font-medium">{day.hours.toFixed(1)} hrs</span>
                </div>
                <div className="h-2 bg-[#E8EEF2] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#6A994E] to-[#2D9596] rounded-full transition-all"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Encouragement Card */}
      <div className="bg-[#E8EEF2] rounded-2xl p-6">
        <h4 className="text-[#0A1128] font-medium mb-2">ðŸ’¡ Did You Know?</h4>
        <p className="text-[#5A6B7C] text-sm">
          Using your CPAP therapy for at least 4 hours per night can significantly improve your
          energy levels and reduce health risks. You're doing great!
        </p>
      </div>
    </div>
  );
}

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\app\pages\patient\Help.tsx ---

```tsx

import { Phone, MessageCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function PatientHelp() {
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportType, setReportType] = useState('');
  const [reportDetails, setReportDetails] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmitReport = () => {
    // Simulate report submission
    setShowConfirmation(true);
    setTimeout(() => {
      setShowReportForm(false);
      setShowConfirmation(false);
      setReportType('');
      setReportDetails('');
    }, 3000);
  };

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      {/* Self-Reporting Tool - Prominent */}
      <div className="bg-gradient-to-br from-[#2D9596] to-[#1a7273] text-white rounded-3xl p-8 shadow-xl">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Report an Issue</h2>
            <p className="text-white/90 text-sm">
              Tell us about problems with your machine or equipment
            </p>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-4 mb-6 border border-white/20">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-white/95">
              <p className="font-medium mb-1">Important:</p>
              <p>Your report will <span className="font-semibold">alert a technician</span> AND automatically <span className="font-semibold">update your profile</span> so we can help you faster.</p>
            </div>
          </div>
        </div>

        {!showReportForm ? (
          <button
            onClick={() => setShowReportForm(true)}
            className="w-full bg-white text-[#2D9596] py-4 rounded-xl font-semibold hover:bg-white/95 transition-all shadow-md text-lg"
          >
            Start Report
          </button>
        ) : (
          <div className="space-y-4">
            {!showConfirmation ? (
              <>
                <div>
                  <label className="block text-white/90 text-sm mb-2">What's the issue?</label>
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="" className="text-gray-900">Select issue type...</option>
                    <option value="mask_leak" className="text-gray-900">Mask is leaking air</option>
                    <option value="mask_discomfort" className="text-gray-900">Mask feels uncomfortable</option>
                    <option value="machine_noise" className="text-gray-900">Machine making noise</option>
                    <option value="dry_nose" className="text-gray-900">Dry nose or throat</option>
                    <option value="pressure_issue" className="text-gray-900">Pressure feels wrong</option>
                    <option value="other" className="text-gray-900">Other issue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/90 text-sm mb-2">Tell us more (optional)</label>
                  <textarea
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    placeholder="Describe what's happening..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowReportForm(false)}
                    className="flex-1 bg-white/20 text-white py-3 rounded-xl font-medium hover:bg-white/30 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitReport}
                    disabled={!reportType}
                    className="flex-1 bg-white text-[#2D9596] py-3 rounded-xl font-semibold hover:bg-white/95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Report
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-white/20 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-[#6A994E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Report Sent!</h3>
                <p className="text-white/90">
                  A technician will contact you within 24 hours. Your profile has been updated.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick Call Button */}
      <button className="w-full bg-gradient-to-br from-[#6A994E] to-[#4a7a35] text-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all">
        <Phone className="w-12 h-12 mb-4 mx-auto" />
        <p className="text-2xl font-semibold mb-2">Call My Technician</p>
        <p className="text-white/90 text-sm mb-4">
          Talk to your equipment specialist about any issues
        </p>
        <div className="bg-white/20 px-6 py-3 rounded-xl inline-block">
          <p className="text-xl font-mono">1-800-555-CPAP</p>
        </div>
      </button>

      {/* Common Issues */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h3 className="text-lg text-[#0A1128] mb-4">Common Questions</h3>
        <div className="space-y-4">
          <button className="w-full text-left p-4 bg-[#E8EEF2] rounded-xl hover:bg-[#d5dce3] transition-colors">
            <p className="text-[#0A1128] font-medium mb-1">My mask feels uncomfortable</p>
            <p className="text-sm text-[#5A6B7C]">Tips for better comfort â†’</p>
          </button>

          <button className="w-full text-left p-4 bg-[#E8EEF2] rounded-xl hover:bg-[#d5dce3] transition-colors">
            <p className="text-[#0A1128] font-medium mb-1">I hear air leaking</p>
            <p className="text-sm text-[#5A6B7C]">How to fix mask leaks â†’</p>
          </button>

          <button className="w-full text-left p-4 bg-[#E8EEF2] rounded-xl hover:bg-[#d5dce3] transition-colors">
            <p className="text-[#0A1128] font-medium mb-1">My nose feels dry</p>
            <p className="text-sm text-[#5A6B7C]">Humidifier settings help â†’</p>
          </button>

          <button className="w-full text-left p-4 bg-[#E8EEF2] rounded-xl hover:bg-[#d5dce3] transition-colors">
            <p className="text-[#0A1128] font-medium mb-1">How do I clean my equipment?</p>
            <p className="text-sm text-[#5A6B7C]">Cleaning guide â†’</p>
          </button>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-[#E76F51]/10 border-2 border-[#E76F51]/20 rounded-2xl p-6">
        <h4 className="text-[#0A1128] font-medium mb-2">Medical Emergency?</h4>
        <p className="text-sm text-[#5A6B7C] mb-4">
          For urgent medical concerns, please call 911 or visit your nearest emergency room. This
          app is for equipment and therapy support only.
        </p>
      </div>

      {/* Support Hours */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg text-[#0A1128] mb-4">Support Hours</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-[#5A6B7C]">Monday - Friday</span>
            <span className="text-[#0A1128] font-medium">8:00 AM - 8:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#5A6B7C]">Saturday</span>
            <span className="text-[#0A1128] font-medium">9:00 AM - 5:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#5A6B7C]">Sunday</span>
            <span className="text-[#0A1128] font-medium">Closed</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-[#E8EEF2]">
          <p className="text-xs text-[#5A6B7C]">
            For after-hours emergencies, leave a message and we'll call you back first thing in
            the morning.
          </p>
        </div>
      </div>
    </div>
  );
}

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\app\pages\patient\Home.tsx ---

```tsx

import { cpapData, interventionData, surveyData } from '../../data/mockData';
import { Moon, Flame, ChevronRight, Package, FileText, Sparkles, Video, HelpCircle } from 'lucide-react';
import { Link } from 'react-router';

export default function PatientHome() {
  const lastNightHours = cpapData.usageHistory[cpapData.usageHistory.length - 1]?.hours || 0;
  const percentComplete = (lastNightHours / 8) * 100;
  const weeklyAverage = cpapData.averageHours;

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      {/* Next Step Card - Prominent */}
      <div className="bg-gradient-to-br from-[#6A994E] to-[#2D9596] rounded-3xl p-8 text-white shadow-xl">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-white/90 text-sm mb-1">Your Next Step</p>
            <h2 className="text-2xl font-bold">1-Month Check-In Survey</h2>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>
        <p className="text-white/90 mb-6">
          Due in 3 days â€¢ 8 quick questions â€¢ Takes ~5 minutes
        </p>
        <Link
          to="/patient/surveys"
          className="flex items-center justify-center gap-2 w-full bg-white text-[#2D9596] py-4 rounded-xl font-semibold hover:bg-white/95 transition-all shadow-md"
        >
          Start Survey
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Sleep Progress Rings */}
      <div className="bg-white rounded-3xl p-8 shadow-sm">
        <h3 className="text-xl text-[#0A1128] mb-6">Last Night's Progress</h3>
        
        <div className="grid grid-cols-2 gap-8">
          {/* Hours Ring */}
          <div className="text-center">
            <div className="relative w-36 h-36 mx-auto mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="64"
                  stroke="#E8EEF2"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="64"
                  stroke="url(#sleepGradient)"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={`${percentComplete * 4.02} 402`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="sleepGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6A994E" />
                    <stop offset="100%" stopColor="#2D9596" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Moon className="w-6 h-6 text-[#2D9596] mb-1" />
                <p className="text-3xl font-bold text-[#0A1128]">
                  {lastNightHours.toFixed(1)}
                </p>
                <p className="text-xs text-[#5A6B7C]">hours</p>
              </div>
            </div>
            <p className="text-sm text-[#5A6B7C]">Sleep with Therapy</p>
            <p className="text-lg font-semibold text-[#6A994E] mt-1">
              {lastNightHours >= 6 ? 'Excellent!' : lastNightHours >= 4 ? 'Good Job!' : 'Keep Going!'}
            </p>
          </div>

          {/* Streak Ring */}
          <div className="text-center">
            <div className="relative w-36 h-36 mx-auto mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="64"
                  stroke="#E8EEF2"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="64"
                  stroke="#F4A261"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={`${(cpapData.streak / 7) * 100 * 4.02} 402`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Flame className="w-6 h-6 text-[#F4A261] mb-1" />
                <p className="text-3xl font-bold text-[#0A1128]">
                  {cpapData.streak}
                </p>
                <p className="text-xs text-[#5A6B7C]">days</p>
              </div>
            </div>
            <p className="text-sm text-[#5A6B7C]">Current Streak</p>
            <p className="text-lg font-semibold text-[#F4A261] mt-1">
              {cpapData.streak >= 7 ? 'ðŸ”¥ On Fire!' : 'Building Momentum!'}
            </p>
          </div>
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="bg-gradient-to-br from-[#2D9596] to-[#1a7a7b] rounded-3xl p-8 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-6 h-6" />
          <h3 className="text-xl font-bold">This Week's Summary</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-white/90">Average Hours</span>
            <span className="text-2xl font-bold">{weeklyAverage} hrs</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/90">Days Used</span>
            <span className="text-2xl font-bold">{cpapData.usageHistory.length}/7</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/90">Consistency</span>
            <span className="text-2xl font-bold">
              {weeklyAverage >= 6 ? 'â­â­â­' : weeklyAverage >= 4 ? 'â­â­' : 'â­'}
            </span>
          </div>
        </div>
      </div>

      {/* Equipment Delivery Tracker */}
      {interventionData.patient.upcomingDelivery && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-[#F4A261]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#F4A261]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Package className="w-6 h-6 text-[#F4A261]" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-[#5A6B7C] mb-1">Equipment on the Way</p>
              <h3 className="text-lg text-[#0A1128] font-semibold mb-2">
                {interventionData.patient.upcomingDelivery.item}
              </h3>
              <p className="text-sm text-[#2D9596] font-medium mb-4">
                Arriving: {new Date(interventionData.patient.upcomingDelivery.estimatedArrival).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </p>
              
              {/* Delivery Progress Steps */}
              <div className="flex items-center gap-2">
                {interventionData.patient.upcomingDelivery.steps.map((step, index) => (
                  <div key={index} className="flex-1 flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                      step.completed
                        ? 'bg-[#6A994E] text-white'
                        : 'bg-[#E8EEF2] text-[#5A6B7C]'
                    }`}>
                      {step.completed ? 'âœ“' : index + 1}
                    </div>
                    {index < interventionData.patient.upcomingDelivery.steps.length - 1 && (
                      <div className={`flex-1 h-1 mx-1 ${
                        step.completed ? 'bg-[#6A994E]' : 'bg-[#E8EEF2]'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Motivational Card */}
      <div className="bg-gradient-to-br from-[#F4A261] to-[#e39350] rounded-3xl p-8 text-white shadow-lg">
        <h3 className="text-xl font-bold mb-3">ðŸ’¡ Sleep Better Tip</h3>
        <p className="text-white/95 text-lg leading-relaxed">
          "Try wearing your mask for 30 minutes before bed while reading or watching TV. 
          This helps your body get comfortable with the therapy before sleep."
        </p>
      </div>

      {/* Quick Access Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/patient/videos"
          className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8EEF2] hover:shadow-md transition-all text-center"
        >
          <Video className="w-8 h-8 text-[#2D9596] mx-auto mb-2" />
          <p className="text-sm font-medium text-[#0A1128]">Watch Tutorials</p>
        </Link>
        <Link
          to="/patient/help"
          className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8EEF2] hover:shadow-md transition-all text-center"
        >
          <HelpCircle className="w-8 h-8 text-[#F4A261] mx-auto mb-2" />
          <p className="text-sm font-medium text-[#0A1128]">Get Help</p>
        </Link>
      </div>
    </div>
  );
}

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\app\pages\patient\Interventions.tsx ---

```tsx

import { interventionData } from '../../data/mockData';
import { Package, MapPin, Truck, CheckCircle } from 'lucide-react';

export default function PatientInterventions() {
  const delivery = interventionData.patient.upcomingDelivery;

  return (
    <div className="p-6 space-y-6">
      {/* Delivery Status Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-[#2D9596]/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Package className="w-6 h-6 text-[#2D9596]" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-[#5A6B7C] mb-1">On the way</p>
            <p className="text-xl font-semibold text-[#0A1128] mb-1">{delivery.item}</p>
            <div className="flex items-center gap-2 text-sm text-[#2D9596]">
              <MapPin className="w-4 h-4" />
              <span>Arriving {new Date(delivery.estimatedArrival).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="space-y-4">
          {delivery.steps.map((step, index) => {
            const isCompleted = step.completed;
            const isLast = index === delivery.steps.length - 1;

            return (
              <div key={index} className="relative">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCompleted
                        ? 'bg-[#6A994E] text-white'
                        : 'bg-[#E8EEF2] text-[#5A6B7C]'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : index === 1 ? (
                      <Truck className="w-5 h-5" />
                    ) : (
                      <div className="w-3 h-3 bg-current rounded-full" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`font-medium ${
                        isCompleted ? 'text-[#0A1128]' : 'text-[#5A6B7C]'
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                </div>
                {!isLast && (
                  <div
                    className={`absolute left-5 top-10 bottom-0 w-0.5 h-6 ${
                      isCompleted ? 'bg-[#6A994E]' : 'bg-[#E8EEF2]'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Why You're Getting This */}
      <div className="bg-gradient-to-br from-[#2D9596]/10 to-[#2D9596]/5 rounded-2xl p-6">
        <h3 className="text-lg text-[#0A1128] mb-3">Why You're Getting This</h3>
        <p className="text-[#5A6B7C] mb-4">
          Your current mask has been in use for over 60 days. Regular mask replacements ensure:
        </p>
        <ul className="space-y-2 text-sm text-[#5A6B7C]">
          <li className="flex items-start gap-2">
            <span className="text-[#2D9596]">âœ“</span>
            <span>Better seal and less air leakage</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#2D9596]">âœ“</span>
            <span>More comfortable fit</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#2D9596]">âœ“</span>
            <span>More effective therapy</span>
          </li>
        </ul>
      </div>

      {/* Contact Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg text-[#0A1128] mb-4">Need Help?</h3>
        <p className="text-sm text-[#5A6B7C] mb-4">
          Questions about your delivery or need to make changes?
        </p>
        <button className="w-full bg-[#2D9596] text-white px-6 py-3 rounded-xl hover:bg-[#247a7a] transition-colors font-medium">
          Contact My Technician
        </button>
      </div>
    </div>
  );
}

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\app\pages\patient\Surveys.tsx ---

```tsx

import { surveyData } from '../../data/mockData';
import { FileText, Clock, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { useState } from 'react';

const surveyQuestions = [
  {
    id: 1,
    question: "How many nights this week did you use your CPAP therapy?",
    type: "number",
    options: ["0-2 nights", "3-4 nights", "5-6 nights", "Every night (7)"],
  },
  {
    id: 2,
    question: "How comfortable is your mask?",
    type: "choice",
    options: ["Very uncomfortable", "Somewhat uncomfortable", "Neutral", "Comfortable", "Very comfortable"],
  },
  {
    id: 3,
    question: "Do you wake up feeling rested?",
    type: "choice",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
  },
  {
    id: 4,
    question: "Have you experienced any mask leaks?",
    type: "yesno",
    options: ["No leaks", "Minor leaks", "Moderate leaks", "Significant leaks"],
  },
  {
    id: 5,
    question: "How is your energy level during the day?",
    type: "choice",
    options: ["Very low", "Low", "Moderate", "Good", "Excellent"],
  },
  {
    id: 6,
    question: "Are you experiencing any side effects?",
    type: "multiple",
    options: ["Dry nose/mouth", "Skin irritation", "Bloating", "Difficulty breathing", "None"],
  },
  {
    id: 7,
    question: "How easy is it to fall asleep with your CPAP?",
    type: "choice",
    options: ["Very difficult", "Difficult", "Neutral", "Easy", "Very easy"],
  },
  {
    id: 8,
    question: "Do you have any concerns you'd like to discuss?",
    type: "text",
    placeholder: "Share any questions or concerns (optional)",
  },
];

export default function PatientSurveys() {
  const nextSurvey = surveyData.patient.next;
  const [inSurvey, setInSurvey] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [showCompletion, setShowCompletion] = useState(false);

  const handleAnswer = (value: any) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (currentQuestion < surveyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Survey complete
      setShowCompletion(true);
      setTimeout(() => {
        setInSurvey(false);
        setShowCompletion(false);
        setCurrentQuestion(0);
        setAnswers({});
      }, 3000);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const currentQ = surveyQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / surveyQuestions.length) * 100;

  if (showCompletion) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gradient-to-br from-[#6A994E] to-[#2D9596] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-[#0A1128] mb-4">All Done! ðŸŽ‰</h2>
          <p className="text-lg text-[#5A6B7C] mb-6">
            Thank you for completing your check-in. Your care team has been notified.
          </p>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-[#5A6B7C]">
              We'll review your responses and reach out if we have any suggestions to improve your therapy.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (inSurvey) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex flex-col p-6">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#5A6B7C]">Question {currentQuestion + 1} of {surveyQuestions.length}</span>
            <span className="text-sm font-medium text-[#2D9596]">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-[#E8EEF2] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#6A994E] to-[#2D9596] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full">
          <div className="bg-white rounded-3xl p-8 shadow-lg mb-6 flex-1 flex flex-col justify-center">
            <h2 className="text-2xl text-[#0A1128] mb-8 leading-relaxed">
              {currentQ.question}
            </h2>

            <div className="space-y-3">
              {currentQ.type === 'text' ? (
                <textarea
                  value={answers[currentQuestion] || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  placeholder={currentQ.placeholder}
                  rows={6}
                  className="w-full px-6 py-4 border-2 border-[#E8EEF2] rounded-2xl focus:outline-none focus:border-[#2D9596] text-lg resize-none"
                />
              ) : (
                currentQ.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className={`w-full p-6 rounded-2xl border-2 transition-all text-left text-lg ${
                      answers[currentQuestion] === option
                        ? 'border-[#2D9596] bg-[#2D9596]/5 shadow-md'
                        : 'border-[#E8EEF2] hover:border-[#2D9596]/50 hover:bg-[#FAFAFA]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        answers[currentQuestion] === option
                          ? 'border-[#2D9596] bg-[#2D9596]'
                          : 'border-[#5A6B7C]'
                      }`}>
                        {answers[currentQuestion] === option && (
                          <div className="w-3 h-3 bg-white rounded-full" />
                        )}
                      </div>
                      <span className="text-[#0A1128]">{option}</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            {currentQuestion > 0 && (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-6 py-4 bg-white border-2 border-[#E8EEF2] text-[#5A6B7C] rounded-2xl hover:border-[#2D9596] hover:text-[#2D9596] transition-all font-medium"
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!answers[currentQuestion] && currentQ.type !== 'text'}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#6A994E] to-[#2D9596] text-white rounded-2xl hover:shadow-lg transition-all font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestion < surveyQuestions.length - 1 ? 'Next' : 'Complete'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      {/* Next Check-In */}
      <div className="bg-gradient-to-br from-[#6A994E] to-[#4a7a35] rounded-3xl p-8 text-white shadow-lg">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <p className="text-white/90 text-sm mb-1">Ready for you</p>
            <p className="text-xl font-semibold mb-3">{nextSurvey.name}</p>
            <div className="flex items-center gap-4 text-sm text-white/90">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Due {new Date(nextSurvey.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>{nextSurvey.questions} questions</span>
              </div>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setInSurvey(true)}
          className="w-full bg-white text-[#6A994E] px-6 py-4 rounded-xl hover:bg-white/90 transition-colors font-semibold text-lg shadow-md"
        >
          Start Check-In (5 min)
        </button>
      </div>

      {/* Why It Matters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg text-[#0A1128] mb-3">Why These Check-Ins Matter</h3>
        <p className="text-[#5A6B7C] mb-4">
          Your responses help your care team understand how you're doing and make sure your
          therapy is working well for you.
        </p>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-[#E8EEF2] rounded-lg">
            <div className="w-6 h-6 bg-[#6A994E] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm">
              1
            </div>
            <div className="flex-1">
              <p className="text-sm text-[#0A1128] font-medium">Answer honestly</p>
              <p className="text-xs text-[#5A6B7C]">There are no wrong answers</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-[#E8EEF2] rounded-lg">
            <div className="w-6 h-6 bg-[#2D9596] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm">
              2
            </div>
            <div className="flex-1">
              <p className="text-sm text-[#0A1128] font-medium">Take your time</p>
              <p className="text-xs text-[#5A6B7C]">Usually takes about 5 minutes</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-[#E8EEF2] rounded-lg">
            <div className="w-6 h-6 bg-[#F4A261] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm">
              3
            </div>
            <div className="flex-1">
              <p className="text-sm text-[#0A1128] font-medium">Get personalized support</p>
              <p className="text-xs text-[#5A6B7C]">Helps us provide better care</p>
            </div>
          </div>
        </div>
      </div>

      {/* History */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg text-[#0A1128] mb-4">Completed Check-Ins</h3>
        <div className="space-y-3">
          {surveyData.patient.history.map((item, index) => (
            <div key={index} className="flex items-center gap-3 pb-3 border-b border-[#E8EEF2] last:border-0">
              <CheckCircle className="w-5 h-5 text-[#6A994E] flex-shrink-0" />
              <div className="flex-1">
                <p className="text-[#0A1128] font-medium text-sm">{item.name}</p>
                <p className="text-xs text-[#5A6B7C]">
                  {new Date(item.completed).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\app\pages\patient\Videos.tsx ---

```tsx

import { videoData } from '../../data/mockData';
import { Play, Star } from 'lucide-react';

export default function PatientVideos() {
  const sortedVideos = [...videoData.patient].sort((a, b) => {
    const relevanceOrder: { [key: string]: number } = { high: 0, medium: 1, low: 2 };
    return relevanceOrder[a.relevance] - relevanceOrder[b.relevance];
  });

  return (
    <div className="p-6 space-y-6">
      {/* Featured Video */}
      <div className="bg-gradient-to-br from-[#2D9596] to-[#1a7273] rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-5 h-5" fill="white" />
          <p className="text-sm font-medium">Recommended for You</p>
        </div>
        <h2 className="text-xl font-semibold mb-2">How to Tighten Your Mask</h2>
        <p className="text-white/90 text-sm mb-4">
          Based on your recent leak data, this video can help improve your seal.
        </p>
        <button className="w-full bg-white text-[#2D9596] px-6 py-3 rounded-xl hover:bg-white/90 transition-colors font-medium flex items-center justify-center gap-2">
          <Play className="w-5 h-5" />
          Watch Now (3:24)
        </button>
      </div>

      {/* Video Grid */}
      <div>
        <h3 className="text-lg text-[#0A1128] mb-4">More Videos for You</h3>
        <div className="space-y-4">
          {sortedVideos.map((video) => {
            const isRecommended = video.relevance === 'high';

            return (
              <div
                key={video.id}
                className={`bg-white rounded-xl shadow-sm overflow-hidden ${
                  isRecommended ? 'border-2 border-[#2D9596]' : 'border border-[#E8EEF2]'
                }`}
              >
                <div className="flex gap-4 p-4">
                  {/* Thumbnail */}
                  <div className="relative w-32 h-20 bg-gradient-to-br from-[#6A994E] to-[#4a7a35] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Play className="w-8 h-8 text-white/80" />
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                      {video.duration}
                    </div>
                    {isRecommended && (
                      <div className="absolute top-1 left-1 bg-[#2D9596] text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
                        <Star className="w-3 h-3" fill="white" />
                        <span>For You</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#2D9596] mb-1">{video.category}</p>
                    <h4 className="text-[#0A1128] font-medium mb-2 line-clamp-2">{video.title}</h4>
                    <button className="text-sm text-[#2D9596] hover:underline">Watch â†’</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Help Card */}
      <div className="bg-[#E8EEF2] rounded-2xl p-6">
        <h4 className="text-[#0A1128] font-medium mb-2">ðŸ’¡ Can't find what you need?</h4>
        <p className="text-sm text-[#5A6B7C] mb-4">
          Our team is here to help with any questions about your therapy.
        </p>
        <button className="text-sm text-[#2D9596] hover:underline font-medium">
          Contact Support â†’
        </button>
      </div>
    </div>
  );
}

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\app\pages\physician\AI.tsx ---

```tsx

import { aiData } from '../../data/mockData';
import { AlertTriangle, TrendingUp, CheckCircle } from 'lucide-react';

export default function PhysicianAI() {
  const getRiskColor = (level: string) => {
    if (level === 'Red') return { bg: 'bg-[#E76F51]', text: 'text-[#E76F51]', icon: AlertTriangle };
    if (level === 'Yellow') return { bg: 'bg-[#F4A261]', text: 'text-[#F4A261]', icon: AlertTriangle };
    return { bg: 'bg-[#6A994E]', text: 'text-[#6A994E]', icon: CheckCircle };
  };

  const riskStyle = getRiskColor(aiData.physician.riskLevel);
  const RiskIcon = riskStyle.icon;

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-6">
        <h2 className="text-2xl text-[#0A1128] mb-2">AI-Powered Risk Assessment</h2>
        <p className="text-[#5A6B7C]">
          Machine learning analysis of patient data to predict clinical deterioration
        </p>
      </div>

      {/* Risk Stratification Gauge */}
      <div className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm p-8 mb-6">
        <div className="flex items-start gap-8">
          <div className="flex-1">
            <h3 className="text-lg text-[#0A1128] mb-6">Weekly Risk Stratification</h3>

            {/* Visual Risk Gauge */}
            <div className="relative mb-8">
              <div className="flex gap-2 h-12 rounded-lg overflow-hidden">
                <div className="flex-1 bg-[#6A994E]" />
                <div className="flex-1 bg-[#F4A261]" />
                <div className="flex-1 bg-[#E76F51]" />
              </div>
              <div
                className="absolute top-0 h-12 w-1 bg-[#0A1128] shadow-lg transition-all"
                style={{ left: `${aiData.physician.riskScore}%` }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#0A1128] text-white px-3 py-1 rounded text-sm font-medium whitespace-nowrap">
                  Risk Score: {aiData.physician.riskScore}
                </div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-[#5A6B7C]">
                <span>Low Risk (0-33)</span>
                <span>Moderate (34-66)</span>
                <span>High Risk (67-100)</span>
              </div>
            </div>

            <div className={`flex items-center gap-3 p-4 rounded-lg ${riskStyle.bg}/10 mb-6`}>
              <RiskIcon className={`w-6 h-6 ${riskStyle.text}`} />
              <div>
                <p className={`font-medium ${riskStyle.text}`}>
                  {aiData.physician.riskLevel === 'Yellow' ? 'Moderate Risk Alert' :
                   aiData.physician.riskLevel === 'Red' ? 'High Risk Alert' : 'Low Risk'}
                </p>
                <p className="text-sm text-[#5A6B7C]">
                  AI predicts moderate risk of clinical deterioration within 2 weeks
                </p>
              </div>
            </div>
          </div>

          <div className="w-48 bg-gradient-to-br from-[#2D9596] to-[#1a7273] rounded-xl p-6 text-white">
            <TrendingUp className="w-8 h-8 mb-4 opacity-80" />
            <p className="text-sm opacity-90 mb-2">Prediction Confidence</p>
            <p className="text-4xl font-semibold">87%</p>
          </div>
        </div>
      </div>

      {/* Key Clinical Findings */}
      <div className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm p-8">
        <h3 className="text-lg text-[#0A1128] mb-6">Key Clinical Findings</h3>

        <div className="space-y-4">
          {aiData.physician.keyFindings.map((finding, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-[#E8EEF2] rounded-lg"
            >
              <div className="w-8 h-8 bg-[#2D9596] text-white rounded-full flex items-center justify-center flex-shrink-0 font-medium">
                {index + 1}
              </div>
              <p className="text-[#0A1128] leading-relaxed">{finding}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-[#E8EEF2]">
          <h4 className="text-sm font-medium text-[#0A1128] mb-4">AI Model Details</h4>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-[#5A6B7C] mb-1">Model Version</p>
              <p className="text-[#0A1128] font-medium">SleepAI v2.4.1</p>
            </div>
            <div>
              <p className="text-[#5A6B7C] mb-1">Data Points Analyzed</p>
              <p className="text-[#0A1128] font-medium">1,247</p>
            </div>
            <div>
              <p className="text-[#5A6B7C] mb-1">Last Updated</p>
              <p className="text-[#0A1128] font-medium">April 14, 2026</p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-[#2D9596]/5 border border-[#2D9596]/20 rounded-lg p-4">
          <p className="text-xs text-[#5A6B7C]">
            <strong className="text-[#0A1128]">Clinical Note:</strong> AI predictions are
            intended to supplement, not replace, clinical judgment. All recommendations should
            be reviewed in context of the complete patient profile.
          </p>
        </div>
      </div>
    </div>
  );
}

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\app\pages\physician\Biomarkers.tsx ---

```tsx

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { biomarkerData } from '../../data/mockData';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function PhysicianBiomarkers() {
  const [expandedODI, setExpandedODI] = useState(true);
  const [expandedHRV, setExpandedHRV] = useState(true);
  const [expandedSpO2, setExpandedSpO2] = useState(true);

  return (
    <div className="p-8 space-y-6">
      <h2 className="text-2xl text-[#0A1128]">Biomarker Monitoring</h2>

      {/* ODI Chart */}
      <div className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm overflow-hidden">
        <button
          onClick={() => setExpandedODI(!expandedODI)}
          className="w-full flex items-center justify-between p-6 hover:bg-[#FAFAFA] transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-[#F4A261] rounded-full" />
            <h3 className="text-lg text-[#0A1128]">Oxygen Desaturation Index (ODI)</h3>
          </div>
          {expandedODI ? <ChevronUp className="w-5 h-5 text-[#5A6B7C]" /> : <ChevronDown className="w-5 h-5 text-[#5A6B7C]" />}
        </button>

        {expandedODI && (
          <div className="px-6 pb-6">
            <div className="mb-4 flex items-center gap-6">
              <div>
                <p className="text-xs text-[#5A6B7C]">Current Value</p>
                <p className="text-2xl font-semibold text-[#0A1128]">11.2</p>
              </div>
              <div>
                <p className="text-xs text-[#5A6B7C]">30-Day Average</p>
                <p className="text-2xl font-semibold text-[#0A1128]">10.8</p>
              </div>
              <div>
                <p className="text-xs text-[#5A6B7C]">Status</p>
                <p className="text-sm text-[#F4A261] font-medium">Moderate</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={biomarkerData.odi}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EEF2" />
                <XAxis dataKey="day" stroke="#5A6B7C" />
                <YAxis stroke="#5A6B7C" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E8EEF2',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#F4A261"
                  strokeWidth={2}
                  dot={false}
                  name="ODI"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* HRV Chart */}
      <div className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm overflow-hidden">
        <button
          onClick={() => setExpandedHRV(!expandedHRV)}
          className="w-full flex items-center justify-between p-6 hover:bg-[#FAFAFA] transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-[#2D9596] rounded-full" />
            <h3 className="text-lg text-[#0A1128]">Heart Rate Variability (HRV)</h3>
          </div>
          {expandedHRV ? <ChevronUp className="w-5 h-5 text-[#5A6B7C]" /> : <ChevronDown className="w-5 h-5 text-[#5A6B7C]" />}
        </button>

        {expandedHRV && (
          <div className="px-6 pb-6">
            <div className="mb-4 flex items-center gap-6">
              <div>
                <p className="text-xs text-[#5A6B7C]">Current Value</p>
                <p className="text-2xl font-semibold text-[#0A1128]">58 ms</p>
              </div>
              <div>
                <p className="text-xs text-[#5A6B7C]">30-Day Average</p>
                <p className="text-2xl font-semibold text-[#0A1128]">55 ms</p>
              </div>
              <div>
                <p className="text-xs text-[#5A6B7C]">Status</p>
                <p className="text-sm text-[#6A994E] font-medium">Good</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={biomarkerData.hrv}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EEF2" />
                <XAxis dataKey="day" stroke="#5A6B7C" />
                <YAxis stroke="#5A6B7C" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E8EEF2',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2D9596"
                  strokeWidth={2}
                  dot={false}
                  name="HRV (ms)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* SpO2 Chart */}
      <div className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm overflow-hidden">
        <button
          onClick={() => setExpandedSpO2(!expandedSpO2)}
          className="w-full flex items-center justify-between p-6 hover:bg-[#FAFAFA] transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-[#6A994E] rounded-full" />
            <h3 className="text-lg text-[#0A1128]">Blood Oxygen Saturation (SpO2)</h3>
          </div>
          {expandedSpO2 ? <ChevronUp className="w-5 h-5 text-[#5A6B7C]" /> : <ChevronDown className="w-5 h-5 text-[#5A6B7C]" />}
        </button>

        {expandedSpO2 && (
          <div className="px-6 pb-6">
            <div className="mb-4 flex items-center gap-6">
              <div>
                <p className="text-xs text-[#5A6B7C]">Current Value</p>
                <p className="text-2xl font-semibold text-[#0A1128]">96%</p>
              </div>
              <div>
                <p className="text-xs text-[#5A6B7C]">30-Day Average</p>
                <p className="text-2xl font-semibold text-[#0A1128]">95.8%</p>
              </div>
              <div>
                <p className="text-xs text-[#5A6B7C]">Status</p>
                <p className="text-sm text-[#6A994E] font-medium">Excellent</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={biomarkerData.spo2}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EEF2" />
                <XAxis dataKey="day" stroke="#5A6B7C" />
                <YAxis domain={[90, 100]} stroke="#5A6B7C" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E8EEF2',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#6A994E"
                  strokeWidth={2}
                  dot={false}
                  name="SpO2 (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\app\pages\physician\CPAP.tsx ---

```tsx

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { cpapData } from '../../data/mockData';
import { TrendingDown, Activity } from 'lucide-react';

export default function PhysicianCPAP() {
  const [chartPeriod, setChartPeriod] = useState<'30' | '60' | '90'>('30');
  const [showApneaTypes, setShowApneaTypes] = useState(false);

  return (
    <div className="p-8 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-[#E8EEF2] shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-[#5A6B7C] mb-1">Current AHI</p>
              <p className="text-4xl font-semibold text-[#0A1128]">{cpapData.currentAHI}</p>
            </div>
            <div className="w-12 h-12 bg-[#6A994E]/10 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-[#6A994E]" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#6A994E]">â†“ 12%</span>
            <span className="text-[#5A6B7C]">vs. last month</span>
          </div>
          <div className="mt-4 pt-4 border-t border-[#E8EEF2]">
            <p className="text-xs text-[#5A6B7C]">
              Normal range: &lt;5 events/hour. Patient shows good control.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#E8EEF2] shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-[#5A6B7C] mb-1">90th Percentile Leak</p>
              <p className="text-4xl font-semibold text-[#0A1128]">{cpapData.percentileLeak} <span className="text-xl text-[#5A6B7C]">L/min</span></p>
            </div>
            <div className="w-12 h-12 bg-[#2D9596]/10 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-[#2D9596]" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#F4A261]">â†‘ 5%</span>
            <span className="text-[#5A6B7C]">vs. last month</span>
          </div>
          <div className="mt-4 pt-4 border-t border-[#E8EEF2]">
            <p className="text-xs text-[#5A6B7C]">
              Target: &lt;24 L/min. Current leak rate is acceptable.
            </p>
          </div>
        </div>
      </div>

      {/* AHI Trend Chart */}
      <div className="bg-white rounded-xl p-6 border border-[#E8EEF2] shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg text-[#0A1128]">AHI Trend Analysis</h3>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setChartPeriod('30')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  chartPeriod === '30'
                    ? 'bg-[#2D9596] text-white'
                    : 'bg-[#E8EEF2] text-[#5A6B7C] hover:bg-[#2D9596]/10'
                }`}
              >
                30 Days
              </button>
              <button
                onClick={() => setChartPeriod('60')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  chartPeriod === '60'
                    ? 'bg-[#2D9596] text-white'
                    : 'bg-[#E8EEF2] text-[#5A6B7C] hover:bg-[#2D9596]/10'
                }`}
              >
                60 Days
              </button>
              <button
                onClick={() => setChartPeriod('90')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  chartPeriod === '90'
                    ? 'bg-[#2D9596] text-white'
                    : 'bg-[#E8EEF2] text-[#5A6B7C] hover:bg-[#2D9596]/10'
                }`}
              >
                90 Days
              </button>
            </div>
            <button
              onClick={() => setShowApneaTypes(!showApneaTypes)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                showApneaTypes
                  ? 'bg-[#F4A261] text-white'
                  : 'bg-[#E8EEF2] text-[#5A6B7C] hover:bg-[#F4A261]/10'
              }`}
            >
              {showApneaTypes ? 'Show Total AHI' : 'Show Central vs. Obstructive'}
            </button>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={cpapData.thirtyDayTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8EEF2" />
            <XAxis
              dataKey="day"
              label={{ value: 'Days', position: 'insideBottom', offset: -5 }}
              stroke="#5A6B7C"
            />
            <YAxis
              label={{ value: 'Events/Hour', angle: -90, position: 'insideLeft' }}
              stroke="#5A6B7C"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E8EEF2',
                borderRadius: '8px',
              }}
            />
            <Legend />
            {!showApneaTypes ? (
              <Line
                type="monotone"
                dataKey="ahi"
                stroke="#2D9596"
                strokeWidth={2}
                dot={{ fill: '#2D9596', r: 4 }}
                name="AHI"
              />
            ) : (
              <>
                <Line
                  type="monotone"
                  dataKey="central"
                  stroke="#F4A261"
                  strokeWidth={2}
                  dot={{ fill: '#F4A261', r: 4 }}
                  name="Central Apneas"
                />
                <Line
                  type="monotone"
                  dataKey="obstructive"
                  stroke="#E76F51"
                  strokeWidth={2}
                  dot={{ fill: '#E76F51', r: 4 }}
                  name="Obstructive Apneas"
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-[#E8EEF2] rounded-lg p-4">
            <p className="text-xs text-[#5A6B7C] mb-1">Average AHI (30d)</p>
            <p className="text-xl font-semibold text-[#0A1128]">4.1</p>
          </div>
          <div className="bg-[#E8EEF2] rounded-lg p-4">
            <p className="text-xs text-[#5A6B7C] mb-1">Trend Direction</p>
            <p className="text-xl font-semibold text-[#6A994E]">Improving</p>
          </div>
          <div className="bg-[#E8EEF2] rounded-lg p-4">
            <p className="text-xs text-[#5A6B7C] mb-1">Days Below Target (&lt;5)</p>
            <p className="text-xl font-semibold text-[#0A1128]">24/30</p>
          </div>
        </div>
      </div>
    </div>
  );
}

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\app\pages\physician\Help.tsx ---

```tsx

import { Book, FileText, Mail } from 'lucide-react';

export default function PhysicianHelp() {
  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-2xl text-[#0A1128] mb-2">Help & Support</h2>
        <p className="text-[#5A6B7C]">Access documentation and support resources</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* System Documentation */}
        <div className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm p-6 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-[#2D9596]/10 rounded-lg flex items-center justify-center mb-4">
            <Book className="w-6 h-6 text-[#2D9596]" />
          </div>
          <h3 className="text-lg text-[#0A1128] mb-2">System Documentation</h3>
          <p className="text-sm text-[#5A6B7C] mb-4">
            Comprehensive guides for using the platform and interpreting data
          </p>
          <button className="text-[#2D9596] hover:underline text-sm font-medium">
            View Documentation â†’
          </button>
        </div>

        {/* Clinical Protocols */}
        <div className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm p-6 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-[#F4A261]/10 rounded-lg flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-[#F4A261]" />
          </div>
          <h3 className="text-lg text-[#0A1128] mb-2">Clinical Protocol Guidelines</h3>
          <p className="text-sm text-[#5A6B7C] mb-4">
            Evidence-based protocols for sleep apnea treatment and management
          </p>
          <button className="text-[#F4A261] hover:underline text-sm font-medium">
            View Guidelines â†’
          </button>
        </div>

        {/* Contact Support */}
        <div className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm p-6 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-[#6A994E]/10 rounded-lg flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-[#6A994E]" />
          </div>
          <h3 className="text-lg text-[#0A1128] mb-2">Contact Software Support</h3>
          <p className="text-sm text-[#5A6B7C] mb-4">
            Get help from our technical support team
          </p>
          <button className="text-[#6A994E] hover:underline text-sm font-medium">
            Contact Support â†’
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8 bg-white rounded-xl border border-[#E8EEF2] shadow-sm p-6">
        <h3 className="text-lg text-[#0A1128] mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div className="pb-4 border-b border-[#E8EEF2]">
            <h4 className="text-[#0A1128] font-medium mb-2">
              How is the AI risk score calculated?
            </h4>
            <p className="text-sm text-[#5A6B7C]">
              The AI risk score uses machine learning algorithms trained on over 100,000 patient
              records to identify patterns associated with clinical deterioration, analyzing AHI
              trends, compliance data, biomarkers, and survey responses.
            </p>
          </div>

          <div className="pb-4 border-b border-[#E8EEF2]">
            <h4 className="text-[#0A1128] font-medium mb-2">
              What is the recommended AHI target?
            </h4>
            <p className="text-sm text-[#5A6B7C]">
              For patients on CPAP therapy, the target AHI is typically &lt;5 events per hour.
              Values between 5-15 indicate mild residual sleep apnea, 15-30 is moderate, and &gt;30
              is severe.
            </p>
          </div>

          <div>
            <h4 className="text-[#0A1128] font-medium mb-2">
              How often is patient data synchronized?
            </h4>
            <p className="text-sm text-[#5A6B7C]">
              CPAP machine data is automatically synchronized daily when the patient's device
              connects via cellular or WiFi. Biomarker data from wearables syncs in real-time when
              available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\app\pages\physician\Home.tsx ---

```tsx

import { physicianQueue } from '../../data/mockData';
import { AlertTriangle, Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

export default function PhysicianHome() {
  const getRiskColor = (score: number) => {
    if (score >= 80) return 'bg-[#E76F51] text-white';
    if (score >= 70) return 'bg-[#F4A261] text-white';
    return 'bg-[#6A994E] text-white';
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-[#0A1128] mb-2">Exception-Based Inbox</h1>
        <p className="text-[#5A6B7C]">
          Clinical escalations only. All routine cases are filtered out.
        </p>
      </div>

      {/* Urgent Actions Section */}
      <div className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm overflow-hidden">
        <div className="bg-[#E76F51] px-6 py-4 flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-white" />
          <div>
            <h2 className="text-xl text-white">Urgent Actions</h2>
            <p className="text-white/90 text-sm">
              Risk Score â‰¥8 or Complex AHI Patterns
            </p>
          </div>
          <div className="ml-auto">
            <span className="bg-white text-[#E76F51] px-4 py-1 rounded-full font-semibold">
              {physicianQueue.urgent.length} Patients
            </span>
          </div>
        </div>

        <div className="divide-y divide-[#E8EEF2]">
          {physicianQueue.urgent.map((patient) => (
            <div
              key={patient.id}
              className="p-6 hover:bg-[#FAFAFA] transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg text-[#0A1128] font-medium">
                      {patient.patientName}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(patient.riskScore)}`}>
                      Risk: {patient.riskScore}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#E8EEF2] text-[#5A6B7C]">
                      {patient.category}
                    </span>
                  </div>
                  <p className="text-[#E76F51] font-medium mb-2">
                    {patient.reason}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-[#5A6B7C]">
                    <span>Last Review: {new Date(patient.lastReview).toLocaleDateString()}</span>
                    {patient.daysOverdue > 0 && (
                      <span className="text-[#E76F51] font-medium">
                        {patient.daysOverdue} days overdue
                      </span>
                    )}
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#2D9596]/90 transition-colors">
                  Review
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Annual Reviews Section */}
      <div className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm overflow-hidden">
        <div className="bg-[#2D9596] px-6 py-4 flex items-center gap-3">
          <Calendar className="w-6 h-6 text-white" />
          <div>
            <h2 className="text-xl text-white">Annual Reviews</h2>
            <p className="text-white/90 text-sm">
              Patients due for yearly assessment
            </p>
          </div>
          <div className="ml-auto">
            <span className="bg-white text-[#2D9596] px-4 py-1 rounded-full font-semibold">
              {physicianQueue.annualReviews.length} Patients
            </span>
          </div>
        </div>

        <div className="divide-y divide-[#E8EEF2]">
          {physicianQueue.annualReviews.map((patient) => (
            <div
              key={patient.id}
              className="p-6 hover:bg-[#FAFAFA] transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg text-[#0A1128] font-medium">
                      {patient.patientName}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      patient.status === 'Overdue'
                        ? 'bg-[#E76F51] text-white'
                        : 'bg-[#F4A261] text-white'
                    }`}>
                      {patient.status}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#E8EEF2] text-[#5A6B7C]">
                      Risk: {patient.riskScore}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#5A6B7C]">
                    <span>Therapy Start: {new Date(patient.therapyStart).toLocaleDateString()}</span>
                    <span>
                      {patient.daysUntilDue < 0
                        ? `${Math.abs(patient.daysUntilDue)} days overdue`
                        : `Due in ${patient.daysUntilDue} days`}
                    </span>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#2D9596]/90 transition-colors">
                  Schedule
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-[#E8EEF2] rounded-xl p-6">
        <h3 className="text-[#0A1128] font-medium mb-2">â„¹ï¸ About This View</h3>
        <p className="text-[#5A6B7C] text-sm">
          This exception-based inbox hides all routine patients and mechanical noise. You only see
          patients requiring clinical escalation (Risk â‰¥8), complex AHI patterns (central vs.
          obstructive), or annual review deadlines. AI Weekly State data is already baked into the
          sorting algorithm.
        </p>
      </div>
    </div>
  );
}

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\app\pages\physician\Interventions.tsx ---

```tsx

import { useState } from 'react';
import { interventionData } from '../../data/mockData';
import { FileSignature } from 'lucide-react';

export default function PhysicianInterventions() {
  const [selectedTherapy, setSelectedTherapy] = useState('');
  const [clinicalNotes, setClinicalNotes] = useState('');

  const handleAuthorize = () => {
    alert(`Authorization submitted for: ${selectedTherapy}\n\nClinical Notes:\n${clinicalNotes}`);
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm p-8">
        <div className="mb-8">
          <h2 className="text-2xl text-[#0A1128] mb-2">Alternative Therapy Authorization</h2>
          <p className="text-[#5A6B7C]">
            Complete this form to authorize alternative sleep apnea treatments for the patient.
          </p>
        </div>

        <div className="space-y-6">
          {/* Therapy Selection */}
          <div>
            <label className="block text-sm font-medium text-[#0A1128] mb-3">
              Select Alternative Therapy
            </label>
            <div className="space-y-3">
              {interventionData.physician.availableTherapies.map((therapy) => (
                <label
                  key={therapy}
                  className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedTherapy === therapy
                      ? 'border-[#2D9596] bg-[#2D9596]/5'
                      : 'border-[#E8EEF2] hover:border-[#2D9596]/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="therapy"
                    value={therapy}
                    checked={selectedTherapy === therapy}
                    onChange={(e) => setSelectedTherapy(e.target.value)}
                    className="w-5 h-5 text-[#2D9596] border-[#E8EEF2]"
                  />
                  <span className="text-[#0A1128]">{therapy}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Clinical Indication */}
          <div>
            <label className="block text-sm font-medium text-[#0A1128] mb-3">
              Clinical Indication & Notes
            </label>
            <textarea
              value={clinicalNotes}
              onChange={(e) => setClinicalNotes(e.target.value)}
              placeholder="Enter clinical justification, patient history, contraindications, and any relevant notes..."
              className="w-full h-40 px-4 py-3 rounded-lg border border-[#E8EEF2] focus:border-[#2D9596] focus:ring-2 focus:ring-[#2D9596]/20 transition-all resize-none"
            />
            <p className="text-xs text-[#5A6B7C] mt-2">
              Include relevant diagnostic findings, prior treatment outcomes, and rationale for therapy change.
            </p>
          </div>

          {/* Patient Information Summary */}
          <div className="bg-[#E8EEF2] rounded-lg p-6">
            <h4 className="text-sm font-medium text-[#0A1128] mb-4">Current Treatment Summary</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[#5A6B7C] mb-1">Current Therapy</p>
                <p className="text-[#0A1128] font-medium">CPAP (Active)</p>
              </div>
              <div>
                <p className="text-[#5A6B7C] mb-1">Current AHI</p>
                <p className="text-[#0A1128] font-medium">4.2 events/hour</p>
              </div>
              <div>
                <p className="text-[#5A6B7C] mb-1">Compliance</p>
                <p className="text-[#0A1128] font-medium">6.8 hrs/night (Good)</p>
              </div>
              <div>
                <p className="text-[#5A6B7C] mb-1">Treatment Duration</p>
                <p className="text-[#0A1128] font-medium">14 months</p>
              </div>
            </div>
          </div>

          {/* Authorization Button */}
          <button
            onClick={handleAuthorize}
            disabled={!selectedTherapy || !clinicalNotes}
            className="w-full bg-[#2D9596] text-white px-6 py-4 rounded-lg hover:bg-[#247a7a] disabled:bg-[#E8EEF2] disabled:text-[#5A6B7C] disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#2D9596]/20 disabled:shadow-none"
          >
            <FileSignature className="w-5 h-5" />
            <span className="font-medium">Authorize & Sign</span>
          </button>

          <p className="text-xs text-[#5A6B7C] text-center">
            By clicking "Authorize & Sign", you are electronically signing this authorization form.
            This action will be logged in the patient's medical record.
          </p>
        </div>
      </div>
    </div>
  );
}

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\app\pages\physician\Surveys.tsx ---

```tsx

import { useState } from 'react';
import { surveyData } from '../../data/mockData';
import { ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

export default function PhysicianSurveys() {
  const [expandedSurvey, setExpandedSurvey] = useState<number | null>(null);

  const getRiskColor = (risk: string) => {
    if (risk === 'High') return 'text-[#E76F51]';
    if (risk === 'Elevated' || risk === 'Moderate') return 'text-[#F4A261]';
    return 'text-[#6A994E]';
  };

  const getRiskBadge = (risk: string) => {
    if (risk === 'High') return 'bg-[#E76F51]/10 text-[#E76F51]';
    if (risk === 'Elevated' || risk === 'Moderate') return 'bg-[#F4A261]/10 text-[#F4A261]';
    return 'bg-[#6A994E]/10 text-[#6A994E]';
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl text-[#0A1128] mb-2">Medical Survey Results</h2>
        <p className="text-[#5A6B7C]">Click on any survey to view detailed responses</p>
      </div>

      <div className="space-y-4">
        {surveyData.physician.map((survey) => {
          const isExpanded = expandedSurvey === survey.id;
          const isAboveThreshold = survey.score > survey.threshold;

          return (
            <div
              key={survey.id}
              className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setExpandedSurvey(isExpanded ? null : survey.id)}
                className="w-full p-6 hover:bg-[#FAFAFA] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    {isAboveThreshold && (
                      <AlertCircle className="w-5 h-5 text-[#F4A261] mt-1 flex-shrink-0" />
                    )}
                    <div className="text-left flex-1">
                      <h3 className="text-lg text-[#0A1128] mb-2">{survey.name}</h3>
                      <div className="flex items-center gap-6 text-sm">
                        <div>
                          <span className="text-[#5A6B7C]">Date: </span>
                          <span className="text-[#0A1128]">
                            {new Date(survey.dateTaken).toLocaleDateString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#5A6B7C]">Score: </span>
                          <span className={`font-semibold ${getRiskColor(survey.risk)}`}>
                            {survey.score}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#5A6B7C]">Threshold: </span>
                          <span className="text-[#0A1128]">{survey.threshold}</span>
                        </div>
                        <div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskBadge(
                              survey.risk
                            )}`}
                          >
                            {survey.risk} Risk
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-[#5A6B7C] flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#5A6B7C] flex-shrink-0 ml-4" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="px-6 pb-6 border-t border-[#E8EEF2]">
                  <div className="mt-6 space-y-4">
                    <div className="bg-[#E8EEF2] rounded-lg p-4">
                      <h4 className="text-sm font-medium text-[#0A1128] mb-3">Survey Breakdown</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-[#5A6B7C]">Question 1: Sleep Quality</span>
                          <span className="text-[#0A1128] font-medium">Poor (3/4)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#5A6B7C]">Question 2: Sleep Latency</span>
                          <span className="text-[#0A1128] font-medium">Moderate (2/4)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#5A6B7C]">Question 3: Sleep Duration</span>
                          <span className="text-[#0A1128] font-medium">Good (1/4)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#5A6B7C]">Question 4: Sleep Efficiency</span>
                          <span className="text-[#0A1128] font-medium">Poor (2/4)</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#F4A261]/10 border border-[#F4A261]/20 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-[#0A1128] mb-2">Clinical Note</h4>
                      <p className="text-sm text-[#5A6B7C]">
                        Score exceeds clinical threshold. Consider follow-up assessment and
                        potential adjustment to treatment plan. Patient reports difficulty with
                        sleep quality despite good CPAP compliance.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\app\pages\physician\Videos.tsx ---

```tsx

import { useState } from 'react';
import { videoData } from '../../data/mockData';
import { Search, Play, Send } from 'lucide-react';

export default function PhysicianVideos() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVideos = videoData.physician.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePrescribe = (videoTitle: string) => {
    alert(`"${videoTitle}" has been prescribed to patient's app`);
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl text-[#0A1128] mb-2">Coaching Video Library</h2>
        <p className="text-[#5A6B7C]">Educational content to prescribe to patients</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5A6B7C]" />
        <input
          type="text"
          placeholder="Search videos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-[#E8EEF2] focus:border-[#2D9596] focus:ring-2 focus:ring-[#2D9596]/20 transition-all"
        />
      </div>

      {/* Video Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Video Thumbnail */}
            <div className="relative aspect-video bg-gradient-to-br from-[#2D9596] to-[#1a7273] flex items-center justify-center">
              <Play className="w-16 h-16 text-white/80" />
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>

            {/* Video Info */}
            <div className="p-4">
              <div className="mb-3">
                <span className="text-xs text-[#2D9596] bg-[#2D9596]/10 px-2 py-1 rounded">
                  {video.category}
                </span>
              </div>
              <h3 className="text-[#0A1128] font-medium mb-4">{video.title}</h3>

              <button
                onClick={() => handlePrescribe(video.title)}
                className="w-full bg-[#2D9596] text-white px-4 py-2 rounded-lg hover:bg-[#247a7a] transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Prescribe to Patient App
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-16">
          <p className="text-[#5A6B7C]">No videos found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
}

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\app\pages\technician\AI.tsx ---

```tsx

import { aiData } from '../../data/mockData';
import { AlertTriangle, Phone } from 'lucide-react';

export default function TechnicianAI() {
  const isHighRisk = aiData.technician.dropoutProbability > 20;

  return (
    <div className="p-8 max-w-4xl">
      {/* Alert Banner */}
      {isHighRisk && (
        <div className="mb-6 bg-[#E76F51]/10 border-2 border-[#E76F51] rounded-xl p-6 flex items-start gap-4">
          <AlertTriangle className="w-8 h-8 text-[#E76F51] flex-shrink-0" />
          <div>
            <h3 className="text-lg text-[#E76F51] font-semibold mb-2">High Dropout Risk Alert</h3>
            <p className="text-[#0A1128]">
              AI predicts this patient has a high probability of discontinuing therapy. Immediate
              intervention recommended.
            </p>
          </div>
        </div>
      )}

      {/* Dropout Probability */}
      <div className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm p-8 mb-6">
        <h2 className="text-2xl text-[#0A1128] mb-6">AI Dropout Prediction</h2>

        <div className="flex items-center gap-8 mb-8">
          <div className="flex-1">
            <div className="relative h-4 bg-[#E8EEF2] rounded-full overflow-hidden">
              <div
                className={`absolute top-0 left-0 h-full ${
                  aiData.technician.dropoutProbability > 20 ? 'bg-[#E76F51]' : 'bg-[#F4A261]'
                } transition-all`}
                style={{ width: `${aiData.technician.dropoutProbability}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-[#5A6B7C]">
              <span>Low Risk</span>
              <span>Moderate</span>
              <span>High Risk</span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-5xl font-semibold text-[#F4A261]">
              {aiData.technician.dropoutProbability}%
            </p>
            <p className="text-sm text-[#5A6B7C] mt-1">Dropout Probability</p>
          </div>
        </div>

        <div className="bg-[#F4A261]/10 border border-[#F4A261]/20 rounded-lg p-4">
          <p className="text-sm text-[#0A1128] font-medium mb-2">AI Recommendation:</p>
          <p className="text-[#5A6B7C]">{aiData.technician.recommendation}</p>
        </div>
      </div>

      {/* Risk Factors */}
      <div className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm p-8 mb-6">
        <h3 className="text-lg text-[#0A1128] mb-6">Mechanical & Usage Risk Factors</h3>

        <div className="space-y-4">
          {aiData.technician.riskFactors.map((factor, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-[#E8EEF2] rounded-lg"
            >
              <div className="w-8 h-8 bg-[#F4A261] text-white rounded-full flex items-center justify-center flex-shrink-0 font-medium">
                {index + 1}
              </div>
              <p className="text-[#0A1128] leading-relaxed">{factor}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Items */}
      <div className="bg-gradient-to-br from-[#F4A261] to-[#e39350] rounded-xl p-8 text-white">
        <h3 className="text-xl mb-4">Recommended Actions</h3>
        <ul className="space-y-3 mb-6">
          <li className="flex items-start gap-2">
            <span>â€¢</span>
            <span>Contact patient to schedule mask refit appointment</span>
          </li>
          <li className="flex items-start gap-2">
            <span>â€¢</span>
            <span>Assess comfort issues that may be causing 3 AM mask removal</span>
          </li>
          <li className="flex items-start gap-2">
            <span>â€¢</span>
            <span>Review machine settings and leak data from April 11th</span>
          </li>
        </ul>

        <button className="w-full bg-white text-[#F4A261] px-6 py-3 rounded-lg hover:bg-white/90 transition-colors flex items-center justify-center gap-2 font-medium">
          <Phone className="w-5 h-5" />
          Call Patient Now
        </button>
      </div>
    </div>
  );
}

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\app\pages\technician\Biomarkers.tsx ---

```tsx

import { biomarkerData } from '../../data/mockData';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function TechnicianBiomarkers() {
  const getStatusIcon = (status: string) => {
    return status === 'green' ? (
      <CheckCircle className="w-8 h-8 text-[#6A994E]" />
    ) : (
      <AlertCircle className="w-8 h-8 text-[#F4A261]" />
    );
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl text-[#0A1128] mb-2">Patient Health Status</h2>
        <p className="text-[#5A6B7C]">
          Simplified health indicators to provide context for technical support
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Overall Status */}
        <div className="bg-white rounded-xl p-8 border border-[#E8EEF2] shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            {getStatusIcon(biomarkerData.status.vitals)}
            <div>
              <h3 className="text-lg text-[#0A1128]">Vital Signs Status</h3>
              <p className="text-[#5A6B7C]">Overall health indicators</p>
            </div>
          </div>
          <div className="mt-6">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
              biomarkerData.status.vitals === 'green'
                ? 'bg-[#6A994E]/10 text-[#6A994E]'
                : 'bg-[#F4A261]/10 text-[#F4A261]'
            }`}>
              <div className={`w-3 h-3 rounded-full ${
                biomarkerData.status.vitals === 'green' ? 'bg-[#6A994E]' : 'bg-[#F4A261]'
              }`} />
              <span className="font-medium">
                {biomarkerData.status.vitals === 'green' ? 'All Systems Normal' : 'Attention Needed'}
              </span>
            </div>
          </div>
        </div>

        {/* General Health */}
        <div className="bg-white rounded-xl p-8 border border-[#E8EEF2] shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <CheckCircle className="w-8 h-8 text-[#6A994E]" />
            <div>
              <h3 className="text-lg text-[#0A1128]">General Health</h3>
              <p className="text-[#5A6B7C]">Patient-reported status</p>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-2xl font-semibold text-[#0A1128]">{biomarkerData.status.general}</p>
            <p className="text-sm text-[#5A6B7C] mt-2">
              Patient is not reporting significant health concerns
            </p>
          </div>
        </div>
      </div>

      {/* Contextual Information */}
      <div className="mt-6 bg-[#E8EEF2] rounded-xl p-6">
        <h4 className="text-sm font-medium text-[#0A1128] mb-4">For Technicians</h4>
        <div className="space-y-2 text-sm text-[#5A6B7C]">
          <p>
            â€¢ Green status indicates the patient is doing well health-wise - focus on equipment optimization
          </p>
          <p>
            â€¢ Yellow/Red status suggests the patient may be struggling - prioritize comfort and troubleshooting
          </p>
          <p>
            â€¢ If you notice patterns (e.g., patient removing mask at same time nightly), escalate to care team
          </p>
        </div>
      </div>
    </div>
  );
}

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\app\pages\technician\CPAP.tsx ---

```tsx

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cpapData } from '../../data/mockData';
import { Clock, Wind, Calendar } from 'lucide-react';

export default function TechnicianCPAP() {
  return (
    <div className="p-8 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-[#E8EEF2] shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-[#5A6B7C] mb-1">Average Hours Used</p>
              <p className="text-4xl font-semibold text-[#0A1128]">{cpapData.averageHours}</p>
            </div>
            <div className="w-12 h-12 bg-[#F4A261]/10 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-[#F4A261]" />
            </div>
          </div>
          <p className="text-sm text-[#5A6B7C]">Target: &gt;4 hours/night</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#E8EEF2] shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-[#5A6B7C] mb-1">Mask Type</p>
              <p className="text-lg font-semibold text-[#0A1128]">AirFit F20</p>
              <p className="text-[#5A6B7C]">Medium</p>
            </div>
            <div className="w-12 h-12 bg-[#2D9596]/10 rounded-lg flex items-center justify-center">
              <Wind className="w-6 h-6 text-[#2D9596]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#E8EEF2] shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-[#5A6B7C] mb-1">Last Mask Change</p>
              <p className="text-lg font-semibold text-[#0A1128]">
                {new Date(cpapData.lastMaskChange).toLocaleDateString()}
              </p>
              <p className="text-[#F4A261]">64 days ago</p>
            </div>
            <div className="w-12 h-12 bg-[#6A994E]/10 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-[#6A994E]" />
            </div>
          </div>
        </div>
      </div>

      {/* Usage Chart */}
      <div className="bg-white rounded-xl p-6 border border-[#E8EEF2] shadow-sm">
        <h3 className="text-lg text-[#0A1128] mb-6">Daily Usage Hours</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={cpapData.usageHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8EEF2" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              stroke="#5A6B7C"
            />
            <YAxis
              label={{ value: 'Hours', angle: -90, position: 'insideLeft' }}
              stroke="#5A6B7C"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E8EEF2',
                borderRadius: '8px',
              }}
              formatter={(value: number) => [`${value} hours`, 'Usage']}
              labelFormatter={(label) => new Date(label).toLocaleDateString()}
            />
            <Bar dataKey="hours" fill="#F4A261" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pressure Settings Table */}
      <div className="bg-white rounded-xl p-6 border border-[#E8EEF2] shadow-sm">
        <h3 className="text-lg text-[#0A1128] mb-6">Machine Pressure Settings</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E8EEF2]">
                <th className="text-left py-3 px-4 text-sm font-medium text-[#5A6B7C]">Setting</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#5A6B7C]">Value</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#5A6B7C]">Unit</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#E8EEF2]">
                <td className="py-3 px-4 text-[#0A1128]">Minimum Pressure</td>
                <td className="py-3 px-4 text-[#0A1128] font-medium">{cpapData.pressureSettings.min}</td>
                <td className="py-3 px-4 text-[#5A6B7C]">cmHâ‚‚O</td>
              </tr>
              <tr className="border-b border-[#E8EEF2]">
                <td className="py-3 px-4 text-[#0A1128]">Maximum Pressure</td>
                <td className="py-3 px-4 text-[#0A1128] font-medium">{cpapData.pressureSettings.max}</td>
                <td className="py-3 px-4 text-[#5A6B7C]">cmHâ‚‚O</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-[#0A1128]">Current Pressure (Auto)</td>
                <td className="py-3 px-4 text-[#0A1128] font-medium">{cpapData.pressureSettings.current}</td>
                <td className="py-3 px-4 text-[#5A6B7C]">cmHâ‚‚O</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\app\pages\technician\Help.tsx ---

```tsx

import { Bug, HelpCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function TechnicianHelp() {
  const [ticketType, setTicketType] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    alert(`Support ticket submitted:\n\nType: ${ticketType}\nDescription: ${description}`);
    setTicketType('');
    setDescription('');
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-2xl text-[#0A1128] mb-2">IT Support & Ticketing</h2>
        <p className="text-[#5A6B7C]">Report technical issues and get help from IT support</p>
      </div>

      {/* Submit Ticket Form */}
      <div className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm p-8 mb-6">
        <h3 className="text-lg text-[#0A1128] mb-6">Submit Support Ticket</h3>

        <div className="space-y-6">
          {/* Ticket Type */}
          <div>
            <label className="block text-sm font-medium text-[#0A1128] mb-3">
              Issue Type
            </label>
            <div className="space-y-3">
              <label
                className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  ticketType === 'Hardware Malfunction'
                    ? 'border-[#F4A261] bg-[#F4A261]/5'
                    : 'border-[#E8EEF2] hover:border-[#F4A261]/50'
                }`}
              >
                <input
                  type="radio"
                  name="ticketType"
                  value="Hardware Malfunction"
                  checked={ticketType === 'Hardware Malfunction'}
                  onChange={(e) => setTicketType(e.target.value)}
                  className="w-5 h-5 text-[#F4A261] border-[#E8EEF2]"
                />
                <Bug className="w-5 h-5 text-[#F4A261]" />
                <span className="text-[#0A1128]">Hardware Malfunction</span>
              </label>

              <label
                className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  ticketType === 'System Sync Error'
                    ? 'border-[#F4A261] bg-[#F4A261]/5'
                    : 'border-[#E8EEF2] hover:border-[#F4A261]/50'
                }`}
              >
                <input
                  type="radio"
                  name="ticketType"
                  value="System Sync Error"
                  checked={ticketType === 'System Sync Error'}
                  onChange={(e) => setTicketType(e.target.value)}
                  className="w-5 h-5 text-[#F4A261] border-[#E8EEF2]"
                />
                <AlertCircle className="w-5 h-5 text-[#F4A261]" />
                <span className="text-[#0A1128]">System Sync Error</span>
              </label>

              <label
                className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  ticketType === 'Other Technical Issue'
                    ? 'border-[#F4A261] bg-[#F4A261]/5'
                    : 'border-[#E8EEF2] hover:border-[#F4A261]/50'
                }`}
              >
                <input
                  type="radio"
                  name="ticketType"
                  value="Other Technical Issue"
                  checked={ticketType === 'Other Technical Issue'}
                  onChange={(e) => setTicketType(e.target.value)}
                  className="w-5 h-5 text-[#F4A261] border-[#E8EEF2]"
                />
                <HelpCircle className="w-5 h-5 text-[#F4A261]" />
                <span className="text-[#0A1128]">Other Technical Issue</span>
              </label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-[#0A1128] mb-3">
              Issue Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue in detail. Include error messages, patient serial number, and steps to reproduce..."
              className="w-full h-40 px-4 py-3 rounded-lg border border-[#E8EEF2] focus:border-[#F4A261] focus:ring-2 focus:ring-[#F4A261]/20 transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!ticketType || !description}
            className="w-full bg-[#F4A261] text-white px-6 py-4 rounded-lg hover:bg-[#e39350] disabled:bg-[#E8EEF2] disabled:text-[#5A6B7C] disabled:cursor-not-allowed transition-all shadow-lg shadow-[#F4A261]/20 disabled:shadow-none"
          >
            Submit Support Ticket
          </button>
        </div>
      </div>

      {/* Quick Help Resources */}
      <div className="bg-[#E8EEF2] rounded-xl p-6">
        <h4 className="text-sm font-medium text-[#0A1128] mb-4">Quick Help Resources</h4>
        <div className="space-y-2 text-sm text-[#5A6B7C]">
          <p>
            â€¢ <strong>System not syncing?</strong> Check patient's WiFi connection and machine
            power status
          </p>
          <p>
            â€¢ <strong>Data missing?</strong> Verify machine has been used in the last 24 hours
          </p>
          <p>
            â€¢ <strong>For urgent issues:</strong> Call IT Support at 1-800-555-TECH (8324)
          </p>
        </div>
      </div>
    </div>
  );
}

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\app\pages\technician\Home.tsx ---

```tsx

import { technicianQueue } from '../../data/mockData';
import { AlertTriangle, MapPin, Clock, Phone } from 'lucide-react';

export default function TechnicianHome() {
  const getRiskColor = (risk: number) => {
    if (risk >= 80) return 'bg-[#E76F51] text-white';
    if (risk >= 60) return 'bg-[#F4A261] text-white';
    return 'bg-[#6A994E] text-white';
  };

  const getUsageBadge = (category: string) => {
    if (category === '<2 hrs') return 'bg-[#E76F51] text-white';
    if (category === '2-4 hrs') return 'bg-[#F4A261] text-white';
    return 'bg-[#6A994E] text-white';
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-[#0A1128] mb-2">Unified Priority Queue</h1>
        <p className="text-[#5A6B7C]">
          Sorted strictly by Dropout Risk and Usage Hours. Tackle high-risk, low-usage patients first.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-[#E8EEF2] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#5A6B7C]">Critical (&lt;2 hrs)</p>
            <AlertTriangle className="w-5 h-5 text-[#E76F51]" />
          </div>
          <p className="text-3xl font-semibold text-[#0A1128]">
            {technicianQueue.filter(p => p.usageCategory === '<2 hrs').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-[#E8EEF2] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#5A6B7C]">At Risk (2-4 hrs)</p>
            <Clock className="w-5 h-5 text-[#F4A261]" />
          </div>
          <p className="text-3xl font-semibold text-[#0A1128]">
            {technicianQueue.filter(p => p.usageCategory === '2-4 hrs').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-[#E8EEF2] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#5A6B7C]">Stable (4+ hrs)</p>
            <Clock className="w-5 h-5 text-[#6A994E]" />
          </div>
          <p className="text-3xl font-semibold text-[#0A1128]">
            {technicianQueue.filter(p => p.usageCategory === '4+ hrs').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-[#E8EEF2] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#5A6B7C]">Total Queue</p>
            <MapPin className="w-5 h-5 text-[#2D9596]" />
          </div>
          <p className="text-3xl font-semibold text-[#0A1128]">
            {technicianQueue.length}
          </p>
        </div>
      </div>

      {/* Priority Queue Table */}
      <div className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F4A261] text-white">
                <th className="text-left py-4 px-6 font-medium">Priority</th>
                <th className="text-left py-4 px-6 font-medium">Patient Name</th>
                <th className="text-left py-4 px-6 font-medium">Dropout Risk</th>
                <th className="text-left py-4 px-6 font-medium">Usage (hrs)</th>
                <th className="text-left py-4 px-6 font-medium">Category</th>
                <th className="text-left py-4 px-6 font-medium">Postal Code</th>
                <th className="text-left py-4 px-6 font-medium">Last Contact</th>
                <th className="text-left py-4 px-6 font-medium">Action Required</th>
                <th className="text-left py-4 px-6 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8EEF2]">
              {technicianQueue.map((patient, index) => (
                <tr
                  key={patient.id}
                  className="hover:bg-[#FAFAFA] transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E8EEF2] text-[#0A1128] font-semibold">
                      {index + 1}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-[#0A1128] font-medium">
                      {patient.patientName}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(patient.dropoutRisk)}`}>
                      {patient.dropoutRisk}%
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-[#0A1128] font-medium">
                      {patient.usageHours.toFixed(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUsageBadge(patient.usageCategory)}`}>
                      {patient.usageCategory}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-[#5A6B7C]">
                      <MapPin className="w-4 h-4" />
                      <span>{patient.postalCode}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[#5A6B7C]">
                    {new Date(patient.lastContact).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-[#E76F51] font-medium">
                      {patient.action}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#F4A261] text-white rounded-lg hover:bg-[#F4A261]/90 transition-colors">
                      <Phone className="w-4 h-4" />
                      Call
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-6">
        <button className="bg-white rounded-xl p-6 border border-[#E8EEF2] shadow-sm hover:shadow-md transition-all text-left">
          <h3 className="text-lg text-[#0A1128] font-medium mb-2">
            ðŸ“¦ Schedule Bulk Dispatch
          </h3>
          <p className="text-sm text-[#5A6B7C]">
            Group equipment deliveries by postal code
          </p>
        </button>
        <button className="bg-white rounded-xl p-6 border border-[#E8EEF2] shadow-sm hover:shadow-md transition-all text-left">
          <h3 className="text-lg text-[#0A1128] font-medium mb-2">
            ðŸ“ž Call List Export
          </h3>
          <p className="text-sm text-[#5A6B7C]">
            Download priority call list for today
          </p>
        </button>
        <button className="bg-white rounded-xl p-6 border border-[#E8EEF2] shadow-sm hover:shadow-md transition-all text-left">
          <h3 className="text-lg text-[#0A1128] font-medium mb-2">
            ðŸ—ºï¸ Route Optimizer
          </h3>
          <p className="text-sm text-[#5A6B7C]">
            Plan home visits by geographic area
          </p>
        </button>
      </div>

      {/* Info Box */}
      <div className="bg-[#E8EEF2] rounded-xl p-6">
        <h3 className="text-[#0A1128] font-medium mb-2">â„¹ï¸ About This Queue</h3>
        <p className="text-[#5A6B7C] text-sm">
          Patients are sorted automatically by Dropout Risk (high to low) and then by Usage Hours
          (low to high). Focus on the top of the list first - these patients need immediate
          intervention. AI Risk Alerts are embedded in the sorting logic.
        </p>
      </div>
    </div>
  );
}

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\app\pages\technician\Interventions.tsx ---

```tsx

import { interventionData } from '../../data/mockData';
import { Clock, Truck, CheckCircle } from 'lucide-react';

export default function TechnicianInterventions() {
  const columns = ['To Dispatch', 'In Transit', 'Delivered'];

  const getColumnIcon = (status: string) => {
    if (status === 'To Dispatch') return <Clock className="w-5 h-5" />;
    if (status === 'In Transit') return <Truck className="w-5 h-5" />;
    return <CheckCircle className="w-5 h-5" />;
  };

  const getColumnColor = (status: string) => {
    if (status === 'To Dispatch') return 'bg-[#F4A261]/10 border-[#F4A261]/20 text-[#F4A261]';
    if (status === 'In Transit') return 'bg-[#2D9596]/10 border-[#2D9596]/20 text-[#2D9596]';
    return 'bg-[#6A994E]/10 border-[#6A994E]/20 text-[#6A994E]';
  };

  const getPriorityColor = (priority: string) => {
    if (priority === 'High') return 'bg-[#E76F51] text-white';
    if (priority === 'Medium') return 'bg-[#F4A261] text-white';
    return 'bg-[#5A6B7C] text-white';
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl text-[#0A1128] mb-2">Equipment Dispatch Board</h2>
        <p className="text-[#5A6B7C]">Track and manage patient equipment deliveries</p>
      </div>

      {/* Kanban Board */}
      <div className="grid md:grid-cols-3 gap-6">
        {columns.map((column) => {
          const tasks = interventionData.technician.tasks.filter((task) => task.status === column);
          const Icon = column === 'To Dispatch' ? Clock : column === 'In Transit' ? Truck : CheckCircle;
          const headerColor = column === 'To Dispatch' ? 'bg-[#F4A261]' : column === 'In Transit' ? 'bg-[#2D9596]' : 'bg-[#6A994E]';

          return (
            <div key={column} className="bg-[#E8EEF2] rounded-xl p-4">
              <div className={`${headerColor} text-white rounded-lg p-4 mb-4 flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5" />
                  <h3 className="font-medium">{column}</h3>
                </div>
                <span className="bg-white/20 px-2 py-1 rounded text-sm">{tasks.length}</span>
              </div>

              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="bg-white rounded-lg p-4 shadow-sm border border-[#E8EEF2]">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-[#0A1128] font-medium">{task.item}</h4>
                      <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-[#5A6B7C]">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(task.scheduledDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {tasks.length === 0 && (
                  <div className="text-center py-8 text-[#5A6B7C] text-sm">
                    No items in this column
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-white rounded-xl p-6 border border-[#E8EEF2] shadow-sm">
        <h3 className="text-lg text-[#0A1128] mb-4">Quick Actions</h3>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-[#F4A261] text-white rounded-lg hover:bg-[#e39350] transition-colors">
            + New Dispatch Order
          </button>
          <button className="px-6 py-3 bg-[#E8EEF2] text-[#0A1128] rounded-lg hover:bg-[#d5dce3] transition-colors">
            View Delivery History
          </button>
          <button className="px-6 py-3 bg-[#E8EEF2] text-[#0A1128] rounded-lg hover:bg-[#d5dce3] transition-colors">
            Equipment Inventory
          </button>
        </div>
      </div>
    </div>
  );
}

function Calendar({ className }: { className: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\app\pages\technician\Surveys.tsx ---

```tsx

import { surveyData } from '../../data/mockData';
import { FileText, Plus } from 'lucide-react';

export default function TechnicianSurveys() {
  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-2xl text-[#0A1128] mb-2">Operational Check-In Forms</h2>
        <p className="text-[#5A6B7C]">
          Log technician visits and equipment maintenance activities
        </p>
      </div>

      {/* Log New Visit Button */}
      <div className="mb-6">
        <button className="px-6 py-3 bg-[#F4A261] text-white rounded-lg hover:bg-[#e39350] transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Log New Technician Visit
        </button>
      </div>

      {/* Survey List */}
      <div className="space-y-4">
        {surveyData.technician.map((survey) => (
          <div
            key={survey.id}
            className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#F4A261]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-[#F4A261]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-[#0A1128] mb-2">{survey.name}</h3>
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <span className="text-[#5A6B7C]">Type: </span>
                    <span className="text-[#0A1128] font-medium">{survey.type}</span>
                  </div>
                  <div>
                    <span className="text-[#5A6B7C]">Last Completed: </span>
                    <span className="text-[#0A1128]">
                      {new Date(survey.lastCompleted).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="text-[#F4A261] hover:underline text-sm font-medium">
                    Start New Form â†’
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Reference */}
      <div className="mt-8 bg-[#E8EEF2] rounded-xl p-6">
        <h4 className="text-sm font-medium text-[#0A1128] mb-4">Form Guidelines</h4>
        <div className="space-y-2 text-sm text-[#5A6B7C]">
          <p>
            â€¢ <strong>Post-Visit Hardware Log:</strong> Complete after every in-person visit or
            equipment delivery
          </p>
          <p>
            â€¢ <strong>Mask Comfort Check:</strong> Use during follow-up calls to assess patient
            comfort and fit
          </p>
          <p>
            â€¢ All forms are automatically timestamped and added to the patient's service history
          </p>
        </div>
      </div>
    </div>
  );
}

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\app\pages\technician\Videos.tsx ---

```tsx

import { useState } from 'react';
import { videoData } from '../../data/mockData';
import { Search, Play, MessageSquare } from 'lucide-react';

export default function TechnicianVideos() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVideos = videoData.technician.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendToPatient = (videoTitle: string) => {
    alert(`"${videoTitle}" will be sent to patient via SMS/App`);
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl text-[#0A1128] mb-2">Technical Support Videos</h2>
        <p className="text-[#5A6B7C]">Troubleshooting guides and patient education materials</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5A6B7C]" />
        <input
          type="text"
          placeholder="Search videos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-[#E8EEF2] focus:border-[#F4A261] focus:ring-2 focus:ring-[#F4A261]/20 transition-all"
        />
      </div>

      {/* Video Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Video Thumbnail */}
            <div className="relative aspect-video bg-gradient-to-br from-[#F4A261] to-[#e39350] flex items-center justify-center">
              <Play className="w-16 h-16 text-white/80" />
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>

            {/* Video Info */}
            <div className="p-4">
              <div className="mb-3">
                <span className="text-xs text-[#F4A261] bg-[#F4A261]/10 px-2 py-1 rounded">
                  {video.category}
                </span>
              </div>
              <h3 className="text-[#0A1128] font-medium mb-4">{video.title}</h3>

              <button
                onClick={() => handleSendToPatient(video.title)}
                className="w-full bg-[#F4A261] text-white px-4 py-2 rounded-lg hover:bg-[#e39350] transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Send to Patient via SMS/App
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-16">
          <p className="text-[#5A6B7C]">No videos found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
}

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\styles\fonts.css ---

```css

@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

:root {
  --font-display: 'Fraunces', serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;
}

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\styles\index.css ---

```css

@import './fonts.css';
@import './tailwind.css';
@import './theme.css';

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\styles\tailwind.css ---

```css

@import 'tailwindcss' source(none);
@source '../**/*.{js,ts,jsx,tsx}';

@import 'tw-animate-css';

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\src\styles\theme.css ---

```css

@custom-variant dark (&:is(.dark *));

:root {
  --font-size: 16px;
  --background: #FAFAFA;
  --foreground: #0A1128;
  --card: #ffffff;
  --card-foreground: #0A1128;
  --popover: #ffffff;
  --popover-foreground: #0A1128;
  --primary: #0A1128;
  --primary-foreground: #ffffff;
  --secondary: #E8EEF2;
  --secondary-foreground: #0A1128;
  --muted: #E8EEF2;
  --muted-foreground: #5A6B7C;
  --accent: #2D9596;
  --accent-foreground: #ffffff;
  --destructive: #E76F51;
  --destructive-foreground: #ffffff;
  --border: rgba(10, 17, 40, 0.1);
  --input: transparent;
  --input-background: #ffffff;
  --switch-background: #cbced4;
  --font-weight-medium: 500;
  --font-weight-normal: 400;
  --ring: #2D9596;
  --chart-1: #2D9596;
  --chart-2: #F4A261;
  --chart-3: #6A994E;
  --chart-4: #5A6B7C;
  --chart-5: #E76F51;
  --radius: 0.75rem;
  --sidebar: #ffffff;
  --sidebar-foreground: #0A1128;
  --sidebar-primary: #0A1128;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #E8EEF2;
  --sidebar-accent-foreground: #0A1128;
  --sidebar-border: rgba(10, 17, 40, 0.1);
  --sidebar-ring: #2D9596;

  /* Custom medical theme colors */
  --navy: #0A1128;
  --teal: #2D9596;
  --amber: #F4A261;
  --sage: #6A994E;
  --coral: #E76F51;
  --blue-gray: #5A6B7C;
  --light-blue: #E8EEF2;
  --success: #6A994E;
  --warning: #F4A261;
  --danger: #E76F51;
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.145 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.439 0 0);
  --font-weight-medium: 500;
  --font-weight-normal: 400;
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(0.269 0 0);
  --sidebar-ring: oklch(0.439 0 0);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-input-background: var(--input-background);
  --color-switch-background: var(--switch-background);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground;
    font-family: var(--font-body);
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-display);
  }

  /**
  * Default typography styles for HTML elements (h1-h4, p, label, button, input).
  * These are in @layer base, so Tailwind utility classes (like text-sm, text-lg) automatically override them.
  */

  html {
    font-size: var(--font-size);
  }

  h1 {
    font-size: var(--text-2xl);
    font-weight: var(--font-weight-medium);
    line-height: 1.5;
  }

  h2 {
    font-size: var(--text-xl);
    font-weight: var(--font-weight-medium);
    line-height: 1.5;
  }

  h3 {
    font-size: var(--text-lg);
    font-weight: var(--font-weight-medium);
    line-height: 1.5;
  }

  h4 {
    font-size: var(--text-base);
    font-weight: var(--font-weight-medium);
    line-height: 1.5;
  }

  label {
    font-size: var(--text-base);
    font-weight: var(--font-weight-medium);
    line-height: 1.5;
  }

  button {
    font-size: var(--text-base);
    font-weight: var(--font-weight-medium);
    line-height: 1.5;
  }

  input {
    font-size: var(--text-base);
    font-weight: var(--font-weight-normal);
    line-height: 1.5;
  }
}

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\index.html ---

```html


  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Physician Dashboard Design</title>
      <style>html, body { height: 100%; margin: 0; } #root { height: 100%; }</style>
    </head>

    <body>
      <div id="root"></div>
      <script type="module" src="/src/main.tsx"></script>
    </body>
  </html>
  

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\package-lock.json ---

```json

{
  "name": "@figma/my-make-file",
  "version": "0.0.1",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "@figma/my-make-file",
      "version": "0.0.1",
      "dependencies": {
        "@emotion/react": "11.14.0",
        "@emotion/styled": "11.14.1",
        "@mui/icons-material": "7.3.5",
        "@mui/material": "7.3.5",
        "@popperjs/core": "2.11.8",
        "@radix-ui/react-accordion": "1.2.3",
        "@radix-ui/react-alert-dialog": "1.1.6",
        "@radix-ui/react-aspect-ratio": "1.1.2",
        "@radix-ui/react-avatar": "1.1.3",
        "@radix-ui/react-checkbox": "1.1.4",
        "@radix-ui/react-collapsible": "1.1.3",
        "@radix-ui/react-context-menu": "2.2.6",
        "@radix-ui/react-dialog": "1.1.6",
        "@radix-ui/react-dropdown-menu": "2.1.6",
        "@radix-ui/react-hover-card": "1.1.6",
        "@radix-ui/react-label": "2.1.2",
        "@radix-ui/react-menubar": "1.1.6",
        "@radix-ui/react-navigation-menu": "1.2.5",
        "@radix-ui/react-popover": "1.1.6",
        "@radix-ui/react-progress": "1.1.2",
        "@radix-ui/react-radio-group": "1.2.3",
        "@radix-ui/react-scroll-area": "1.2.3",
        "@radix-ui/react-select": "2.1.6",
        "@radix-ui/react-separator": "1.1.2",
        "@radix-ui/react-slider": "1.2.3",
        "@radix-ui/react-slot": "1.1.2",
        "@radix-ui/react-switch": "1.1.3",
        "@radix-ui/react-tabs": "1.1.3",
        "@radix-ui/react-toggle": "1.1.2",
        "@radix-ui/react-toggle-group": "1.1.2",
        "@radix-ui/react-tooltip": "1.1.8",
        "canvas-confetti": "1.9.4",
        "class-variance-authority": "0.7.1",
        "clsx": "2.1.1",
        "cmdk": "1.1.1",
        "date-fns": "3.6.0",
        "embla-carousel-react": "8.6.0",
        "input-otp": "1.4.2",
        "lucide-react": "0.487.0",
        "motion": "12.23.24",
        "next-themes": "0.4.6",
        "react-day-picker": "8.10.1",
        "react-dnd": "16.0.1",
        "react-dnd-html5-backend": "16.0.1",
        "react-hook-form": "7.55.0",
        "react-popper": "2.3.0",
        "react-resizable-panels": "2.1.7",
        "react-responsive-masonry": "2.7.1",
        "react-router": "7.13.0",
        "react-slick": "0.31.0",
        "recharts": "2.15.2",
        "sonner": "2.0.3",
        "tailwind-merge": "3.2.0",
        "tw-animate-css": "1.3.8",
        "vaul": "1.1.2"
      },
      "devDependencies": {
        "@tailwindcss/vite": "4.1.12",
        "@vitejs/plugin-react": "4.7.0",
        "tailwindcss": "4.1.12",
        "vite": "6.3.5"
      },
      "peerDependencies": {
        "react": "^18.3.1",
        "react-dom": "^18.3.1"
      },
      "peerDependenciesMeta": {
        "react": {
          "optional": true
        },
        "react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@babel/code-frame": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.29.0.tgz",
      "integrity": "sha512-9NhCeYjq9+3uxgdtp20LSiJXJvN0FeCtNGpJxuMFZ1Kv3cWUNb6DOhJwUvcVCzKGR66cw4njwM6hrJLqgOwbcw==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-validator-identifier": "^7.28.5",
        "js-tokens": "^4.0.0",
        "picocolors": "^1.1.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/compat-data": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.29.0.tgz",
      "integrity": "sha512-T1NCJqT/j9+cn8fvkt7jtwbLBfLC/1y1c7NtCeXFRgzGTsafi68MRv8yzkYSapBnFA6L3U2VSc02ciDzoAJhJg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/core": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.29.0.tgz",
      "integrity": "sha512-CGOfOJqWjg2qW/Mb6zNsDm+u5vFQ8DxXfbM09z69p5Z6+mE1ikP2jUXw+j42Pf1XTYED2Rni5f95npYeuwMDQA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.0",
        "@babel/generator": "^7.29.0",
        "@babel/helper-compilation-targets": "^7.28.6",
        "@babel/helper-module-transforms": "^7.28.6",
        "@babel/helpers": "^7.28.6",
        "@babel/parser": "^7.29.0",
        "@babel/template": "^7.28.6",
        "@babel/traverse": "^7.29.0",
        "@babel/types": "^7.29.0",
        "@jridgewell/remapping": "^2.3.5",
        "convert-source-map": "^2.0.0",
        "debug": "^4.1.0",
        "gensync": "^1.0.0-beta.2",
        "json5": "^2.2.3",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/babel"
      }
    },
    "node_modules/@babel/core/node_modules/convert-source-map": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-2.0.0.tgz",
      "integrity": "sha512-Kvp459HrV2FEJ1CAsi1Ku+MY3kasH19TFykTz2xWmMeq6bk2NU3XXvfJ+Q61m0xktWwt+1HSYf3JZsTms3aRJg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@babel/generator": {
      "version": "7.29.1",
      "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.29.1.tgz",
      "integrity": "sha512-qsaF+9Qcm2Qv8SRIMMscAvG4O3lJ0F1GuMo5HR/Bp02LopNgnZBC/EkbevHFeGs4ls/oPz9v+Bsmzbkbe+0dUw==",
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.29.0",
        "@babel/types": "^7.29.0",
        "@jridgewell/gen-mapping": "^0.3.12",
        "@jridgewell/trace-mapping": "^0.3.28",
        "jsesc": "^3.0.2"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-compilation-targets": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.28.6.tgz",
      "integrity": "sha512-JYtls3hqi15fcx5GaSNL7SCTJ2MNmjrkHXg4FSpOA/grxK8KwyZ5bubHsCq8FXCkua6xhuaaBit+3b7+VZRfcA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/compat-data": "^7.28.6",
        "@babel/helper-validator-option": "^7.27.1",
        "browserslist": "^4.24.0",
        "lru-cache": "^5.1.1",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-globals": {
      "version": "7.28.0",
      "resolved": "https://registry.npmjs.org/@babel/helper-globals/-/helper-globals-7.28.0.tgz",
      "integrity": "sha512-+W6cISkXFa1jXsDEdYA8HeevQT/FULhxzR99pxphltZcVaugps53THCeiWA8SguxxpSp3gKPiuYfSWopkLQ4hw==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-imports": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.28.6.tgz",
      "integrity": "sha512-l5XkZK7r7wa9LucGw9LwZyyCUscb4x37JWTPz7swwFE/0FMQAGpiWUZn8u9DzkSBWEcK25jmvubfpw2dnAMdbw==",
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.28.6",
        "@babel/types": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-transforms": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.28.6.tgz",
      "integrity": "sha512-67oXFAYr2cDLDVGLXTEABjdBJZ6drElUSI7WKp70NrpyISso3plG9SAGEF6y7zbha/wOzUByWWTJvEDVNIUGcA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-module-imports": "^7.28.6",
        "@babel/helper-validator-identifier": "^7.28.5",
        "@babel/traverse": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-plugin-utils": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-plugin-utils/-/helper-plugin-utils-7.28.6.tgz",
      "integrity": "sha512-S9gzZ/bz83GRysI7gAD4wPT/AI3uCnY+9xn+Mx/KPs2JwHJIz1W8PZkg2cqyt3RNOBM8ejcXhV6y8Og7ly/Dug==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-string-parser": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.27.1.tgz",
      "integrity": "sha512-qMlSxKbpRlAridDExk92nSobyDdpPijUq2DW6oDnUqd0iOGxmQjyqhMIihI9+zv4LPyZdRje2cavWPbCbWm3eA==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-identifier": {
      "version": "7.28.5",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.28.5.tgz",
      "integrity": "sha512-qSs4ifwzKJSV39ucNjsvc6WVHs6b7S03sOh2OcHF9UHfVPqWWALUsNUVzhSBiItjRZoLHx7nIarVjqKVusUZ1Q==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-option": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-option/-/helper-validator-option-7.27.1.tgz",
      "integrity": "sha512-YvjJow9FxbhFFKDSuFnVCe2WxXk1zWc22fFePVNEaWJEu8IrZVlda6N0uHwzZrUM1il7NC9Mlp4MaJYbYd9JSg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helpers": {
      "version": "7.29.2",
      "resolved": "https://registry.npmjs.org/@babel/helpers/-/helpers-7.29.2.tgz",
      "integrity": "sha512-HoGuUs4sCZNezVEKdVcwqmZN8GoHirLUcLaYVNBK2J0DadGtdcqgr3BCbvH8+XUo4NGjNl3VOtSjEKNzqfFgKw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/template": "^7.28.6",
        "@babel/types": "^7.29.0"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/parser": {
      "version": "7.29.2",
      "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.29.2.tgz",
      "integrity": "sha512-4GgRzy/+fsBa72/RZVJmGKPmZu9Byn8o4MoLpmNe1m8ZfYnz5emHLQz3U4gLud6Zwl0RZIcgiLD7Uq7ySFuDLA==",
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.29.0"
      },
      "bin": {
        "parser": "bin/babel-parser.js"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@babel/plugin-transform-react-jsx-self": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-self/-/plugin-transform-react-jsx-self-7.27.1.tgz",
      "integrity": "sha512-6UzkCs+ejGdZ5mFFC/OCUrv028ab2fp1znZmCZjAOBKiBK2jXD1O+BPSfX8X2qjJ75fZBMSnQn3Rq2mrBJK2mw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-react-jsx-source": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-source/-/plugin-transform-react-jsx-source-7.27.1.tgz",
      "integrity": "sha512-zbwoTsBruTeKB9hSq73ha66iFeJHuaFkUbwvqElnygoNbj/jHRsSeokowZFN3CZ64IvEqcmmkVe89OPXc7ldAw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/runtime": {
      "version": "7.29.2",
      "resolved": "https://registry.npmjs.org/@babel/runtime/-/runtime-7.29.2.tgz",
      "integrity": "sha512-JiDShH45zKHWyGe4ZNVRrCjBz8Nh9TMmZG1kh4QTK8hCBTWBi8Da+i7s1fJw7/lYpM4ccepSNfqzZ/QvABBi5g==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/template": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/template/-/template-7.28.6.tgz",
      "integrity": "sha512-YA6Ma2KsCdGb+WC6UpBVFJGXL58MDA6oyONbjyF/+5sBgxY/dwkhLogbMT2GXXyU84/IhRw/2D1Os1B/giz+BQ==",
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.28.6",
        "@babel/parser": "^7.28.6",
        "@babel/types": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/traverse": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/traverse/-/traverse-7.29.0.tgz",
      "integrity": "sha512-4HPiQr0X7+waHfyXPZpWPfWL/J7dcN1mx9gL6WdQVMbPnF3+ZhSMs8tCxN7oHddJE9fhNE7+lxdnlyemKfJRuA==",
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.0",
        "@babel/generator": "^7.29.0",
        "@babel/helper-globals": "^7.28.0",
        "@babel/parser": "^7.29.0",
        "@babel/template": "^7.28.6",
        "@babel/types": "^7.29.0",
        "debug": "^4.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/types": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.29.0.tgz",
      "integrity": "sha512-LwdZHpScM4Qz8Xw2iKSzS+cfglZzJGvofQICy7W7v4caru4EaAmyUuO6BGrbyQ2mYV11W0U8j5mBhd14dd3B0A==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-string-parser": "^7.27.1",
        "@babel/helper-validator-identifier": "^7.28.5"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@emotion/babel-plugin": {
      "version": "11.13.5",
      "resolved": "https://registry.npmjs.org/@emotion/babel-plugin/-/babel-plugin-11.13.5.tgz",
      "integrity": "sha512-pxHCpT2ex+0q+HH91/zsdHkw/lXd468DIN2zvfvLtPKLLMo6gQj7oLObq8PhkrxOZb/gGCq03S3Z7PDhS8pduQ==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-module-imports": "^7.16.7",
        "@babel/runtime": "^7.18.3",
        "@emotion/hash": "^0.9.2",
        "@emotion/memoize": "^0.9.0",
        "@emotion/serialize": "^1.3.3",
        "babel-plugin-macros": "^3.1.0",
        "convert-source-map": "^1.5.0",
        "escape-string-regexp": "^4.0.0",
        "find-root": "^1.1.0",
        "source-map": "^0.5.7",
        "stylis": "4.2.0"
      }
    },
    "node_modules/@emotion/cache": {
      "version": "11.14.0",
      "resolved": "https://registry.npmjs.org/@emotion/cache/-/cache-11.14.0.tgz",
      "integrity": "sha512-L/B1lc/TViYk4DcpGxtAVbx0ZyiKM5ktoIyafGkH6zg/tj+mA+NE//aPYKG0k8kCHSHVJrpLpcAlOBEXQ3SavA==",
      "license": "MIT",
      "dependencies": {
        "@emotion/memoize": "^0.9.0",
        "@emotion/sheet": "^1.4.0",
        "@emotion/utils": "^1.4.2",
        "@emotion/weak-memoize": "^0.4.0",
        "stylis": "4.2.0"
      }
    },
    "node_modules/@emotion/hash": {
      "version": "0.9.2",
      "resolved": "https://registry.npmjs.org/@emotion/hash/-/hash-0.9.2.tgz",
      "integrity": "sha512-MyqliTZGuOm3+5ZRSaaBGP3USLw6+EGykkwZns2EPC5g8jJ4z9OrdZY9apkl3+UP9+sdz76YYkwCKP5gh8iY3g==",
      "license": "MIT"
    },
    "node_modules/@emotion/is-prop-valid": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/@emotion/is-prop-valid/-/is-prop-valid-1.4.0.tgz",
      "integrity": "sha512-QgD4fyscGcbbKwJmqNvUMSE02OsHUa+lAWKdEUIJKgqe5IwRSKd7+KhibEWdaKwgjLj0DRSHA9biAIqGBk05lw==",
      "license": "MIT",
      "dependencies": {
        "@emotion/memoize": "^0.9.0"
      }
    },
    "node_modules/@emotion/memoize": {
      "version": "0.9.0",
      "resolved": "https://registry.npmjs.org/@emotion/memoize/-/memoize-0.9.0.tgz",
      "integrity": "sha512-30FAj7/EoJ5mwVPOWhAyCX+FPfMDrVecJAM+Iw9NRoSl4BBAQeqj4cApHHUXOVvIPgLVDsCFoz/hGD+5QQD1GQ==",
      "license": "MIT"
    },
    "node_modules/@emotion/react": {
      "version": "11.14.0",
      "resolved": "https://registry.npmjs.org/@emotion/react/-/react-11.14.0.tgz",
      "integrity": "sha512-O000MLDBDdk/EohJPFUqvnp4qnHeYkVP5B0xEG0D/L7cOKP9kefu2DXn8dj74cQfsEzUqh+sr1RzFqiL1o+PpA==",
      "license": "MIT",
      "dependencies": {
        "@babel/runtime": "^7.18.3",
        "@emotion/babel-plugin": "^11.13.5",
        "@emotion/cache": "^11.14.0",
        "@emotion/serialize": "^1.3.3",
        "@emotion/use-insertion-effect-with-fallbacks": "^1.2.0",
        "@emotion/utils": "^1.4.2",
        "@emotion/weak-memoize": "^0.4.0",
        "hoist-non-react-statics": "^3.3.1"
      },
      "peerDependencies": {
        "react": ">=16.8.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@emotion/serialize": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/@emotion/serialize/-/serialize-1.3.3.tgz",
      "integrity": "sha512-EISGqt7sSNWHGI76hC7x1CksiXPahbxEOrC5RjmFRJTqLyEK9/9hZvBbiYn70dw4wuwMKiEMCUlR6ZXTSWQqxA==",
      "license": "MIT",
      "dependencies": {
        "@emotion/hash": "^0.9.2",
        "@emotion/memoize": "^0.9.0",
        "@emotion/unitless": "^0.10.0",
        "@emotion/utils": "^1.4.2",
        "csstype": "^3.0.2"
      }
    },
    "node_modules/@emotion/sheet": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/@emotion/sheet/-/sheet-1.4.0.tgz",
      "integrity": "sha512-fTBW9/8r2w3dXWYM4HCB1Rdp8NLibOw2+XELH5m5+AkWiL/KqYX6dc0kKYlaYyKjrQ6ds33MCdMPEwgs2z1rqg==",
      "license": "MIT"
    },
    "node_modules/@emotion/styled": {
      "version": "11.14.1",
      "resolved": "https://registry.npmjs.org/@emotion/styled/-/styled-11.14.1.tgz",
      "integrity": "sha512-qEEJt42DuToa3gurlH4Qqc1kVpNq8wO8cJtDzU46TjlzWjDlsVyevtYCRijVq3SrHsROS+gVQ8Fnea108GnKzw==",
      "license": "MIT",
      "dependencies": {
        "@babel/runtime": "^7.18.3",
        "@emotion/babel-plugin": "^11.13.5",
        "@emotion/is-prop-valid": "^1.3.0",
        "@emotion/serialize": "^1.3.3",
        "@emotion/use-insertion-effect-with-fallbacks": "^1.2.0",
        "@emotion/utils": "^1.4.2"
      },
      "peerDependencies": {
        "@emotion/react": "^11.0.0-rc.0",
        "react": ">=16.8.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@emotion/unitless": {
      "version": "0.10.0",
      "resolved": "https://registry.npmjs.org/@emotion/unitless/-/unitless-0.10.0.tgz",
      "integrity": "sha512-dFoMUuQA20zvtVTuxZww6OHoJYgrzfKM1t52mVySDJnMSEa08ruEvdYQbhvyu6soU+NeLVd3yKfTfT0NeV6qGg==",
      "license": "MIT"
    },
    "node_modules/@emotion/use-insertion-effect-with-fallbacks": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/@emotion/use-insertion-effect-with-fallbacks/-/use-insertion-effect-with-fallbacks-1.2.0.tgz",
      "integrity": "sha512-yJMtVdH59sxi/aVJBpk9FQq+OR8ll5GT8oWd57UpeaKEVGab41JWaCFA7FRLoMLloOZF/c/wsPoe+bfGmRKgDg==",
      "license": "MIT",
      "peerDependencies": {
        "react": ">=16.8.0"
      }
    },
    "node_modules/@emotion/utils": {
      "version": "1.4.2",
      "resolved": "https://registry.npmjs.org/@emotion/utils/-/utils-1.4.2.tgz",
      "integrity": "sha512-3vLclRofFziIa3J2wDh9jjbkUz9qk5Vi3IZ/FSTKViB0k+ef0fPV7dYrUIugbgupYDx7v9ud/SjrtEP8Y4xLoA==",
      "license": "MIT"
    },
    "node_modules/@emotion/weak-memoize": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/@emotion/weak-memoize/-/weak-memoize-0.4.0.tgz",
      "integrity": "sha512-snKqtPW01tN0ui7yu9rGv69aJXr/a/Ywvl11sUjNtEcRc+ng/mQriFL0wLXMef74iHa/EkftbDzU9F8iFbH+zg==",
      "license": "MIT"
    },
    "node_modules/@esbuild/aix-ppc64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/aix-ppc64/-/aix-ppc64-0.25.12.tgz",
      "integrity": "sha512-Hhmwd6CInZ3dwpuGTF8fJG6yoWmsToE+vYgD4nytZVxcu1ulHpUQRAB1UJ8+N1Am3Mz4+xOByoQoSZf4D+CpkA==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "aix"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-arm": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm/-/android-arm-0.25.12.tgz",
      "integrity": "sha512-VJ+sKvNA/GE7Ccacc9Cha7bpS8nyzVv0jdVgwNDaR4gDMC/2TTRc33Ip8qrNYUcpkOHUT5OZ0bUcNNVZQ9RLlg==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm64/-/android-arm64-0.25.12.tgz",
      "integrity": "sha512-6AAmLG7zwD1Z159jCKPvAxZd4y/VTO0VkprYy+3N2FtJ8+BQWFXU+OxARIwA46c5tdD9SsKGZ/1ocqBS/gAKHg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/android-x64/-/android-x64-0.25.12.tgz",
      "integrity": "sha512-5jbb+2hhDHx5phYR2By8GTWEzn6I9UqR11Kwf22iKbNpYrsmRB18aX/9ivc5cabcUiAT/wM+YIZ6SG9QO6a8kg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/darwin-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-arm64/-/darwin-arm64-0.25.12.tgz",
      "integrity": "sha512-N3zl+lxHCifgIlcMUP5016ESkeQjLj/959RxxNYIthIg+CQHInujFuXeWbWMgnTo4cp5XVHqFPmpyu9J65C1Yg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/darwin-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-x64/-/darwin-x64-0.25.12.tgz",
      "integrity": "sha512-HQ9ka4Kx21qHXwtlTUVbKJOAnmG1ipXhdWTmNXiPzPfWKpXqASVcWdnf2bnL73wgjNrFXAa3yYvBSd9pzfEIpA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/freebsd-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-arm64/-/freebsd-arm64-0.25.12.tgz",
      "integrity": "sha512-gA0Bx759+7Jve03K1S0vkOu5Lg/85dou3EseOGUes8flVOGxbhDDh/iZaoek11Y8mtyKPGF3vP8XhnkDEAmzeg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/freebsd-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-x64/-/freebsd-x64-0.25.12.tgz",
      "integrity": "sha512-TGbO26Yw2xsHzxtbVFGEXBFH0FRAP7gtcPE7P5yP7wGy7cXK2oO7RyOhL5NLiqTlBh47XhmIUXuGciXEqYFfBQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-arm": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm/-/linux-arm-0.25.12.tgz",
      "integrity": "sha512-lPDGyC1JPDou8kGcywY0YILzWlhhnRjdof3UlcoqYmS9El818LLfJJc3PXXgZHrHCAKs/Z2SeZtDJr5MrkxtOw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm64/-/linux-arm64-0.25.12.tgz",
      "integrity": "sha512-8bwX7a8FghIgrupcxb4aUmYDLp8pX06rGh5HqDT7bB+8Rdells6mHvrFHHW2JAOPZUbnjUpKTLg6ECyzvas2AQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-ia32": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ia32/-/linux-ia32-0.25.12.tgz",
      "integrity": "sha512-0y9KrdVnbMM2/vG8KfU0byhUN+EFCny9+8g202gYqSSVMonbsCfLjUO+rCci7pM0WBEtz+oK/PIwHkzxkyharA==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-loong64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-loong64/-/linux-loong64-0.25.12.tgz",
      "integrity": "sha512-h///Lr5a9rib/v1GGqXVGzjL4TMvVTv+s1DPoxQdz7l/AYv6LDSxdIwzxkrPW438oUXiDtwM10o9PmwS/6Z0Ng==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-mips64el": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-mips64el/-/linux-mips64el-0.25.12.tgz",
      "integrity": "sha512-iyRrM1Pzy9GFMDLsXn1iHUm18nhKnNMWscjmp4+hpafcZjrr2WbT//d20xaGljXDBYHqRcl8HnxbX6uaA/eGVw==",
      "cpu": [
        "mips64el"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-ppc64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ppc64/-/linux-ppc64-0.25.12.tgz",
      "integrity": "sha512-9meM/lRXxMi5PSUqEXRCtVjEZBGwB7P/D4yT8UG/mwIdze2aV4Vo6U5gD3+RsoHXKkHCfSxZKzmDssVlRj1QQA==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-riscv64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-riscv64/-/linux-riscv64-0.25.12.tgz",
      "integrity": "sha512-Zr7KR4hgKUpWAwb1f3o5ygT04MzqVrGEGXGLnj15YQDJErYu/BGg+wmFlIDOdJp0PmB0lLvxFIOXZgFRrdjR0w==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-s390x": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-s390x/-/linux-s390x-0.25.12.tgz",
      "integrity": "sha512-MsKncOcgTNvdtiISc/jZs/Zf8d0cl/t3gYWX8J9ubBnVOwlk65UIEEvgBORTiljloIWnBzLs4qhzPkJcitIzIg==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-x64/-/linux-x64-0.25.12.tgz",
      "integrity": "sha512-uqZMTLr/zR/ed4jIGnwSLkaHmPjOjJvnm6TVVitAa08SLS9Z0VM8wIRx7gWbJB5/J54YuIMInDquWyYvQLZkgw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/netbsd-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-arm64/-/netbsd-arm64-0.25.12.tgz",
      "integrity": "sha512-xXwcTq4GhRM7J9A8Gv5boanHhRa/Q9KLVmcyXHCTaM4wKfIpWkdXiMog/KsnxzJ0A1+nD+zoecuzqPmCRyBGjg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/netbsd-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-x64/-/netbsd-x64-0.25.12.tgz",
      "integrity": "sha512-Ld5pTlzPy3YwGec4OuHh1aCVCRvOXdH8DgRjfDy/oumVovmuSzWfnSJg+VtakB9Cm0gxNO9BzWkj6mtO1FMXkQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openbsd-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-arm64/-/openbsd-arm64-0.25.12.tgz",
      "integrity": "sha512-fF96T6KsBo/pkQI950FARU9apGNTSlZGsv1jZBAlcLL1MLjLNIWPBkj5NlSz8aAzYKg+eNqknrUJ24QBybeR5A==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openbsd-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-x64/-/openbsd-x64-0.25.12.tgz",
      "integrity": "sha512-MZyXUkZHjQxUvzK7rN8DJ3SRmrVrke8ZyRusHlP+kuwqTcfWLyqMOE3sScPPyeIXN/mDJIfGXvcMqCgYKekoQw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openharmony-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/openharmony-arm64/-/openharmony-arm64-0.25.12.tgz",
      "integrity": "sha512-rm0YWsqUSRrjncSXGA7Zv78Nbnw4XL6/dzr20cyrQf7ZmRcsovpcRBdhD43Nuk3y7XIoW2OxMVvwuRvk9XdASg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/sunos-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/sunos-x64/-/sunos-x64-0.25.12.tgz",
      "integrity": "sha512-3wGSCDyuTHQUzt0nV7bocDy72r2lI33QL3gkDNGkod22EsYl04sMf0qLb8luNKTOmgF/eDEDP5BFNwoBKH441w==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "sunos"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-arm64/-/win32-arm64-0.25.12.tgz",
      "integrity": "sha512-rMmLrur64A7+DKlnSuwqUdRKyd3UE7oPJZmnljqEptesKM8wx9J8gx5u0+9Pq0fQQW8vqeKebwNXdfOyP+8Bsg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-ia32": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-ia32/-/win32-ia32-0.25.12.tgz",
      "integrity": "sha512-HkqnmmBoCbCwxUKKNPBixiWDGCpQGVsrQfJoVGYLPT41XWF8lHuE5N6WhVia2n4o5QK5M4tYr21827fNhi4byQ==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-x64/-/win32-x64-0.25.12.tgz",
      "integrity": "sha512-alJC0uCZpTFrSL0CCDjcgleBXPnCrEAhTBILpeAp7M/OFgoqtAetfBzX0xM00MUsVVPpVjlPuMbREqnZCXaTnA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@floating-ui/core": {
      "version": "1.7.5",
      "resolved": "https://registry.npmjs.org/@floating-ui/core/-/core-1.7.5.tgz",
      "integrity": "sha512-1Ih4WTWyw0+lKyFMcBHGbb5U5FtuHJuujoyyr5zTaWS5EYMeT6Jb2AuDeftsCsEuchO+mM2ij5+q9crhydzLhQ==",
      "license": "MIT",
      "dependencies": {
        "@floating-ui/utils": "^0.2.11"
      }
    },
    "node_modules/@floating-ui/dom": {
      "version": "1.7.6",
      "resolved": "https://registry.npmjs.org/@floating-ui/dom/-/dom-1.7.6.tgz",
      "integrity": "sha512-9gZSAI5XM36880PPMm//9dfiEngYoC6Am2izES1FF406YFsjvyBMmeJ2g4SAju3xWwtuynNRFL2s9hgxpLI5SQ==",
      "license": "MIT",
      "dependencies": {
        "@floating-ui/core": "^1.7.5",
        "@floating-ui/utils": "^0.2.11"
      }
    },
    "node_modules/@floating-ui/react-dom": {
      "version": "2.1.8",
      "resolved": "https://registry.npmjs.org/@floating-ui/react-dom/-/react-dom-2.1.8.tgz",
      "integrity": "sha512-cC52bHwM/n/CxS87FH0yWdngEZrjdtLW/qVruo68qg+prK7ZQ4YGdut2GyDVpoGeAYe/h899rVeOVm6Oi40k2A==",
      "license": "MIT",
      "dependencies": {
        "@floating-ui/dom": "^1.7.6"
      },
      "peerDependencies": {
        "react": ">=16.8.0",
        "react-dom": ">=16.8.0"
      }
    },
    "node_modules/@floating-ui/utils": {
      "version": "0.2.11",
      "resolved": "https://registry.npmjs.org/@floating-ui/utils/-/utils-0.2.11.tgz",
      "integrity": "sha512-RiB/yIh78pcIxl6lLMG0CgBXAZ2Y0eVHqMPYugu+9U0AeT6YBeiJpf7lbdJNIugFP5SIjwNRgo4DhR1Qxi26Gg==",
      "license": "MIT"
    },
    "node_modules/@isaacs/fs-minipass": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/@isaacs/fs-minipass/-/fs-minipass-4.0.1.tgz",
      "integrity": "sha512-wgm9Ehl2jpeqP3zw/7mo3kRHFp5MEDhqAdwy1fTGkHAwnkGOVsgpvQhL8B5n1qlb01jV3n/bI0ZfZp5lWA1k4w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "minipass": "^7.0.4"
      },
      "engines": {
        "node": ">=18.0.0"
      }
    },
    "node_modules/@jridgewell/gen-mapping": {
      "version": "0.3.13",
      "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.13.tgz",
      "integrity": "sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.0",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/remapping": {
      "version": "2.3.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/remapping/-/remapping-2.3.5.tgz",
      "integrity": "sha512-LI9u/+laYG4Ds1TDKSJW2YPrIlcVYOwi2fUC6xB43lueCjgxV4lffOCZCtYFiH6TNOX+tQKXx97T4IKHbhyHEQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.5",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.5.5.tgz",
      "integrity": "sha512-cYQ9310grqxueWbl+WuIUIaiUaDcj7WOq5fVhEljNVgRfOUhY9fy2zTvfoqWsnebh8Sl70VScFbICvJnLKB0Og==",
      "license": "MIT"
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.31",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.31.tgz",
      "integrity": "sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.1.0",
        "@jridgewell/sourcemap-codec": "^1.4.14"
      }
    },
    "node_modules/@mui/core-downloads-tracker": {
      "version": "7.3.10",
      "resolved": "https://registry.npmjs.org/@mui/core-downloads-tracker/-/core-downloads-tracker-7.3.10.tgz",
      "integrity": "sha512-vrOpWRmPJSuwLo23J62wggEm/jvGdzqctej+UOCtgDUz6nZJQuj3ByPccVyaa7eQmwAzUwKN56FQPMKkqbj1GA==",
      "license": "MIT",
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/mui-org"
      }
    },
    "node_modules/@mui/icons-material": {
      "version": "7.3.5",
      "resolved": "https://registry.npmjs.org/@mui/icons-material/-/icons-material-7.3.5.tgz",
      "integrity": "sha512-LciL1GLMZ+VlzyHAALSVAR22t8IST4LCXmljcUSx2NOutgO2XnxdIp8ilFbeNf9wpo0iUFbAuoQcB7h+HHIf3A==",
      "license": "MIT",
      "dependencies": {
        "@babel/runtime": "^7.28.4"
      },
      "engines": {
        "node": ">=14.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/mui-org"
      },
      "peerDependencies": {
        "@mui/material": "^7.3.5",
        "@types/react": "^17.0.0 || ^18.0.0 || ^19.0.0",
        "react": "^17.0.0 || ^18.0.0 || ^19.0.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@mui/material": {
      "version": "7.3.5",
      "resolved": "https://registry.npmjs.org/@mui/material/-/material-7.3.5.tgz",
      "integrity": "sha512-8VVxFmp1GIm9PpmnQoCoYo0UWHoOrdA57tDL62vkpzEgvb/d71Wsbv4FRg7r1Gyx7PuSo0tflH34cdl/NvfHNQ==",
      "license": "MIT",
      "dependencies": {
        "@babel/runtime": "^7.28.4",
        "@mui/core-downloads-tracker": "^7.3.5",
        "@mui/system": "^7.3.5",
        "@mui/types": "^7.4.8",
        "@mui/utils": "^7.3.5",
        "@popperjs/core": "^2.11.8",
        "@types/react-transition-group": "^4.4.12",
        "clsx": "^2.1.1",
        "csstype": "^3.1.3",
        "prop-types": "^15.8.1",
        "react-is": "^19.2.0",
        "react-transition-group": "^4.4.5"
      },
      "engines": {
        "node": ">=14.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/mui-org"
      },
      "peerDependencies": {
        "@emotion/react": "^11.5.0",
        "@emotion/styled": "^11.3.0",
        "@mui/material-pigment-css": "^7.3.5",
        "@types/react": "^17.0.0 || ^18.0.0 || ^19.0.0",
        "react": "^17.0.0 || ^18.0.0 || ^19.0.0",
        "react-dom": "^17.0.0 || ^18.0.0 || ^19.0.0"
      },
      "peerDependenciesMeta": {
        "@emotion/react": {
          "optional": true
        },
        "@emotion/styled": {
          "optional": true
        },
        "@mui/material-pigment-css": {
          "optional": true
        },
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@mui/private-theming": {
      "version": "7.3.10",
      "resolved": "https://registry.npmjs.org/@mui/private-theming/-/private-theming-7.3.10.tgz",
      "integrity": "sha512-j3EZN+zOctxUISvJSmsEPo5o2F8zse4l5vRkBY+ps6UtnL6J7o14kUaI4w7gwo73id9e3cDNMVQK/9BVaMHVBw==",
      "license": "MIT",
      "dependencies": {
        "@babel/runtime": "^7.28.6",
        "@mui/utils": "^7.3.10",
        "prop-types": "^15.8.1"
      },
      "engines": {
        "node": ">=14.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/mui-org"
      },
      "peerDependencies": {
        "@types/react": "^17.0.0 || ^18.0.0 || ^19.0.0",
        "react": "^17.0.0 || ^18.0.0 || ^19.0.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@mui/styled-engine": {
      "version": "7.3.10",
      "resolved": "https://registry.npmjs.org/@mui/styled-engine/-/styled-engine-7.3.10.tgz",
      "integrity": "sha512-WxE9SiF8xskAQqGjsp0poXCkCqsoXFEsSr0HBXfApmGHR+DBnXRp+z46Vsltg4gpPM4Z96DeAQRpeAOnhNg7Ng==",
      "license": "MIT",
      "dependencies": {
        "@babel/runtime": "^7.28.6",
        "@emotion/cache": "^11.14.0",
        "@emotion/serialize": "^1.3.3",
        "@emotion/sheet": "^1.4.0",
        "csstype": "^3.2.3",
        "prop-types": "^15.8.1"
      },
      "engines": {
        "node": ">=14.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/mui-org"
      },
      "peerDependencies": {
        "@emotion/react": "^11.4.1",
        "@emotion/styled": "^11.3.0",
        "react": "^17.0.0 || ^18.0.0 || ^19.0.0"
      },
      "peerDependenciesMeta": {
        "@emotion/react": {
          "optional": true
        },
        "@emotion/styled": {
          "optional": true
        }
      }
    },
    "node_modules/@mui/system": {
      "version": "7.3.10",
      "resolved": "https://registry.npmjs.org/@mui/system/-/system-7.3.10.tgz",
      "integrity": "sha512-/sfPpdpJaQn7BSF+avjIdHSYmxHp0UOBYNxSG9QGKfMOD6sLANCpRPCnanq1Pe0lFf0NHkO2iUk0TNzdWC1USQ==",
      "license": "MIT",
      "dependencies": {
        "@babel/runtime": "^7.28.6",
        "@mui/private-theming": "^7.3.10",
        "@mui/styled-engine": "^7.3.10",
        "@mui/types": "^7.4.12",
        "@mui/utils": "^7.3.10",
        "clsx": "^2.1.1",
        "csstype": "^3.2.3",
        "prop-types": "^15.8.1"
      },
      "engines": {
        "node": ">=14.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/mui-org"
      },
      "peerDependencies": {
        "@emotion/react": "^11.5.0",
        "@emotion/styled": "^11.3.0",
        "@types/react": "^17.0.0 || ^18.0.0 || ^19.0.0",
        "react": "^17.0.0 || ^18.0.0 || ^19.0.0"
      },
      "peerDependenciesMeta": {
        "@emotion/react": {
          "optional": true
        },
        "@emotion/styled": {
          "optional": true
        },
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@mui/types": {
      "version": "7.4.12",
      "resolved": "https://registry.npmjs.org/@mui/types/-/types-7.4.12.tgz",
      "integrity": "sha512-iKNAF2u9PzSIj40CjvKJWxFXJo122jXVdrmdh0hMYd+FR+NuJMkr/L88XwWLCRiJ5P1j+uyac25+Kp6YC4hu6w==",
      "license": "MIT",
      "dependencies": {
        "@babel/runtime": "^7.28.6"
      },
      "peerDependencies": {
        "@types/react": "^17.0.0 || ^18.0.0 || ^19.0.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@mui/utils": {
      "version": "7.3.10",
      "resolved": "https://registry.npmjs.org/@mui/utils/-/utils-7.3.10.tgz",
      "integrity": "sha512-7y2eIfy0h7JPz+Yy4pS+wgV68d46PuuxDqKBN4Q8VlPQSsCAGwroMCV6xWyc7g9dvEp8ZNFsknc59GHWO+r6Ow==",
      "license": "MIT",
      "dependencies": {
        "@babel/runtime": "^7.28.6",
        "@mui/types": "^7.4.12",
        "@types/prop-types": "^15.7.15",
        "clsx": "^2.1.1",
        "prop-types": "^15.8.1",
        "react-is": "^19.2.3"
      },
      "engines": {
        "node": ">=14.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/mui-org"
      },
      "peerDependencies": {
        "@types/react": "^17.0.0 || ^18.0.0 || ^19.0.0",
        "react": "^17.0.0 || ^18.0.0 || ^19.0.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@popperjs/core": {
      "version": "2.11.8",
      "resolved": "https://registry.npmjs.org/@popperjs/core/-/core-2.11.8.tgz",
      "integrity": "sha512-P1st0aksCrn9sGZhp8GMYwBnQsbvAWsZAX44oXNNvLHGqAOcoVxmjZiohstwQ7SqKnbR47akdNi+uleWD8+g6A==",
      "license": "MIT",
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/popperjs"
      }
    },
    "node_modules/@radix-ui/number": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/number/-/number-1.1.0.tgz",
      "integrity": "sha512-V3gRzhVNU1ldS5XhAPTom1fOIo4ccrjjJgmE+LI2h/WaFpHmx0MQApT+KZHnx8abG6Avtfcz4WoEciMnpFT3HQ==",
      "license": "MIT"
    },
    "node_modules/@radix-ui/primitive": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/primitive/-/primitive-1.1.1.tgz",
      "integrity": "sha512-SJ31y+Q/zAyShtXJc8x83i9TYdbAfHZ++tUZnvjJJqFjzsdUnKsxPL6IEtBlxKkU7yzer//GQtZSV4GbldL3YA==",
      "license": "MIT"
    },
    "node_modules/@radix-ui/react-accordion": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-accordion/-/react-accordion-1.2.3.tgz",
      "integrity": "sha512-RIQ15mrcvqIkDARJeERSuXSry2N8uYnxkdDetpfmalT/+0ntOXLkFOsh9iwlAsCv+qcmhZjbdJogIm6WBa6c4A==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.1",
        "@radix-ui/react-collapsible": "1.1.3",
        "@radix-ui/react-collection": "1.1.2",
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-context": "1.1.1",
        "@radix-ui/react-direction": "1.1.0",
        "@radix-ui/react-id": "1.1.0",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-use-controllable-state": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-alert-dialog": {
      "version": "1.1.6",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-alert-dialog/-/react-alert-dialog-1.1.6.tgz",
      "integrity": "sha512-p4XnPqgej8sZAAReCAKgz1REYZEBLR8hU9Pg27wFnCWIMc8g1ccCs0FjBcy05V15VTu8pAePw/VDYeOm/uZ6yQ==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.1",
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-context": "1.1.1",
        "@radix-ui/react-dialog": "1.1.6",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-slot": "1.1.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-arrow": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-arrow/-/react-arrow-1.1.2.tgz",
      "integrity": "sha512-G+KcpzXHq24iH0uGG/pF8LyzpFJYGD4RfLjCIBfGdSLXvjLHST31RUiRVrupIBMvIppMgSzQ6l66iAxl03tdlg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-primitive": "2.0.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-aspect-ratio": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-aspect-ratio/-/react-aspect-ratio-1.1.2.tgz",
      "integrity": "sha512-TaJxYoCpxJ7vfEkv2PTNox/6zzmpKXT6ewvCuf2tTOIVN45/Jahhlld29Yw4pciOXS2Xq91/rSGEdmEnUWZCqA==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-primitive": "2.0.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-avatar": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-avatar/-/react-avatar-1.1.3.tgz",
      "integrity": "sha512-Paen00T4P8L8gd9bNsRMw7Cbaz85oxiv+hzomsRZgFm2byltPFDtfcoqlWJ8GyZlIBWgLssJlzLCnKU0G0302g==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-context": "1.1.1",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-use-callback-ref": "1.1.0",
        "@radix-ui/react-use-layout-effect": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-checkbox": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-checkbox/-/react-checkbox-1.1.4.tgz",
      "integrity": "sha512-wP0CPAHq+P5I4INKe3hJrIa1WoNqqrejzW+zoU0rOvo1b9gDEJJFl2rYfO1PYJUQCc2H1WZxIJmyv9BS8i5fLw==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.1",
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-context": "1.1.1",
        "@radix-ui/react-presence": "1.1.2",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-use-controllable-state": "1.1.0",
        "@radix-ui/react-use-previous": "1.1.0",
        "@radix-ui/react-use-size": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-collapsible": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-collapsible/-/react-collapsible-1.1.3.tgz",
      "integrity": "sha512-jFSerheto1X03MUC0g6R7LedNW9EEGWdg9W1+MlpkMLwGkgkbUXLPBH/KIuWKXUoeYRVY11llqbTBDzuLg7qrw==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.1",
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-context": "1.1.1",
        "@radix-ui/react-id": "1.1.0",
        "@radix-ui/react-presence": "1.1.2",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-use-controllable-state": "1.1.0",
        "@radix-ui/react-use-layout-effect": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-collection": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-collection/-/react-collection-1.1.2.tgz",
      "integrity": "sha512-9z54IEKRxIa9VityapoEYMuByaG42iSy1ZXlY2KcuLSEtq8x4987/N6m15ppoMffgZX72gER2uHe1D9Y6Unlcw==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-context": "1.1.1",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-slot": "1.1.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-compose-refs": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-compose-refs/-/react-compose-refs-1.1.1.tgz",
      "integrity": "sha512-Y9VzoRDSJtgFMUCoiZBDVo084VQ5hfpXxVE+NgkdNsjiDBByiImMZKKhxMwCbdHvhlENG6a833CbFkOQvTricw==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-context": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-context/-/react-context-1.1.1.tgz",
      "integrity": "sha512-UASk9zi+crv9WteK/NU4PLvOoL3OuE6BWVKNF6hPRBtYBDXQ2u5iu3O59zUlJiTVvkyuycnqrztsHVJwcK9K+Q==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-context-menu": {
      "version": "2.2.6",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-context-menu/-/react-context-menu-2.2.6.tgz",
      "integrity": "sha512-aUP99QZ3VU84NPsHeaFt4cQUNgJqFsLLOt/RbbWXszZ6MP0DpDyjkFZORr4RpAEx3sUBk+Kc8h13yGtC5Qw8dg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.1",
        "@radix-ui/react-context": "1.1.1",
        "@radix-ui/react-menu": "2.1.6",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-use-callback-ref": "1.1.0",
        "@radix-ui/react-use-controllable-state": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-dialog": {
      "version": "1.1.6",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-dialog/-/react-dialog-1.1.6.tgz",
      "integrity": "sha512-/IVhJV5AceX620DUJ4uYVMymzsipdKBzo3edo+omeskCKGm9FRHM0ebIdbPnlQVJqyuHbuBltQUOG2mOTq2IYw==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.1",
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-context": "1.1.1",
        "@radix-ui/react-dismissable-layer": "1.1.5",
        "@radix-ui/react-focus-guards": "1.1.1",
        "@radix-ui/react-focus-scope": "1.1.2",
        "@radix-ui/react-id": "1.1.0",
        "@radix-ui/react-portal": "1.1.4",
        "@radix-ui/react-presence": "1.1.2",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-slot": "1.1.2",
        "@radix-ui/react-use-controllable-state": "1.1.0",
        "aria-hidden": "^1.2.4",
        "react-remove-scroll": "^2.6.3"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-direction": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-direction/-/react-direction-1.1.0.tgz",
      "integrity": "sha512-BUuBvgThEiAXh2DWu93XsT+a3aWrGqolGlqqw5VU1kG7p/ZH2cuDlM1sRLNnY3QcBS69UIz2mcKhMxDsdewhjg==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-dismissable-layer": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-dismissable-layer/-/react-dismissable-layer-1.1.5.tgz",
      "integrity": "sha512-E4TywXY6UsXNRhFrECa5HAvE5/4BFcGyfTyK36gP+pAW1ed7UTK4vKwdr53gAJYwqbfCWC6ATvJa3J3R/9+Qrg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.1",
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-use-callback-ref": "1.1.0",
        "@radix-ui/react-use-escape-keydown": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-dropdown-menu": {
      "version": "2.1.6",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-dropdown-menu/-/react-dropdown-menu-2.1.6.tgz",
      "integrity": "sha512-no3X7V5fD487wab/ZYSHXq3H37u4NVeLDKI/Ks724X/eEFSSEFYZxWgsIlr1UBeEyDaM29HM5x9p1Nv8DuTYPA==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.1",
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-context": "1.1.1",
        "@radix-ui/react-id": "1.1.0",
        "@radix-ui/react-menu": "2.1.6",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-use-controllable-state": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-focus-guards": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-focus-guards/-/react-focus-guards-1.1.1.tgz",
      "integrity": "sha512-pSIwfrT1a6sIoDASCSpFwOasEwKTZWDw/iBdtnqKO7v6FeOzYJ7U53cPzYFVR3geGGXgVHaH+CdngrrAzqUGxg==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-focus-scope": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-focus-scope/-/react-focus-scope-1.1.2.tgz",
      "integrity": "sha512-zxwE80FCU7lcXUGWkdt6XpTTCKPitG1XKOwViTxHVKIJhZl9MvIl2dVHeZENCWD9+EdWv05wlaEkRXUykU27RA==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-use-callback-ref": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-hover-card": {
      "version": "1.1.6",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-hover-card/-/react-hover-card-1.1.6.tgz",
      "integrity": "sha512-E4ozl35jq0VRlrdc4dhHrNSV0JqBb4Jy73WAhBEK7JoYnQ83ED5r0Rb/XdVKw89ReAJN38N492BAPBZQ57VmqQ==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.1",
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-context": "1.1.1",
        "@radix-ui/react-dismissable-layer": "1.1.5",
        "@radix-ui/react-popper": "1.2.2",
        "@radix-ui/react-portal": "1.1.4",
        "@radix-ui/react-presence": "1.1.2",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-use-controllable-state": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-id": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-id/-/react-id-1.1.0.tgz",
      "integrity": "sha512-EJUrI8yYh7WOjNOqpoJaf1jlFIH2LvtgAl+YcFqNCa+4hj64ZXmPkAKOFs/ukjz3byN6bdb/AVUqHkI8/uWWMA==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-use-layout-effect": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-label": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-label/-/react-label-2.1.2.tgz",
      "integrity": "sha512-zo1uGMTaNlHehDyFQcDZXRJhUPDuukcnHz0/jnrup0JA6qL+AFpAnty+7VKa9esuU5xTblAZzTGYJKSKaBxBhw==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-primitive": "2.0.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-menu": {
      "version": "2.1.6",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-menu/-/react-menu-2.1.6.tgz",
      "integrity": "sha512-tBBb5CXDJW3t2mo9WlO7r6GTmWV0F0uzHZVFmlRmYpiSK1CDU5IKojP1pm7oknpBOrFZx/YgBRW9oorPO2S/Lg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.1",
        "@radix-ui/react-collection": "1.1.2",
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-context": "1.1.1",
        "@radix-ui/react-direction": "1.1.0",
        "@radix-ui/react-dismissable-layer": "1.1.5",
        "@radix-ui/react-focus-guards": "1.1.1",
        "@radix-ui/react-focus-scope": "1.1.2",
        "@radix-ui/react-id": "1.1.0",
        "@radix-ui/react-popper": "1.2.2",
        "@radix-ui/react-portal": "1.1.4",
        "@radix-ui/react-presence": "1.1.2",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-roving-focus": "1.1.2",
        "@radix-ui/react-slot": "1.1.2",
        "@radix-ui/react-use-callback-ref": "1.1.0",
        "aria-hidden": "^1.2.4",
        "react-remove-scroll": "^2.6.3"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-menubar": {
      "version": "1.1.6",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-menubar/-/react-menubar-1.1.6.tgz",
      "integrity": "sha512-FHq7+3DlXwh/7FOM4i0G4bC4vPjiq89VEEvNF4VMLchGnaUuUbE5uKXMUCjdKaOghEEMeiKa5XCa2Pk4kteWmg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.1",
        "@radix-ui/react-collection": "1.1.2",
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-context": "1.1.1",
        "@radix-ui/react-direction": "1.1.0",
        "@radix-ui/react-id": "1.1.0",
        "@radix-ui/react-menu": "2.1.6",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-roving-focus": "1.1.2",
        "@radix-ui/react-use-controllable-state": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-navigation-menu": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-navigation-menu/-/react-navigation-menu-1.2.5.tgz",
      "integrity": "sha512-myMHHQUZ3ZLTi8W381/Vu43Ia0NqakkQZ2vzynMmTUtQQ9kNkjzhOwkZC9TAM5R07OZUVIQyHC06f/9JZJpvvA==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.1",
        "@radix-ui/react-collection": "1.1.2",
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-context": "1.1.1",
        "@radix-ui/react-direction": "1.1.0",
        "@radix-ui/react-dismissable-layer": "1.1.5",
        "@radix-ui/react-id": "1.1.0",
        "@radix-ui/react-presence": "1.1.2",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-use-callback-ref": "1.1.0",
        "@radix-ui/react-use-controllable-state": "1.1.0",
        "@radix-ui/react-use-layout-effect": "1.1.0",
        "@radix-ui/react-use-previous": "1.1.0",
        "@radix-ui/react-visually-hidden": "1.1.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-popover": {
      "version": "1.1.6",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-popover/-/react-popover-1.1.6.tgz",
      "integrity": "sha512-NQouW0x4/GnkFJ/pRqsIS3rM/k97VzKnVb2jB7Gq7VEGPy5g7uNV1ykySFt7eWSp3i2uSGFwaJcvIRJBAHmmFg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.1",
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-context": "1.1.1",
        "@radix-ui/react-dismissable-layer": "1.1.5",
        "@radix-ui/react-focus-guards": "1.1.1",
        "@radix-ui/react-focus-scope": "1.1.2",
        "@radix-ui/react-id": "1.1.0",
        "@radix-ui/react-popper": "1.2.2",
        "@radix-ui/react-portal": "1.1.4",
        "@radix-ui/react-presence": "1.1.2",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-slot": "1.1.2",
        "@radix-ui/react-use-controllable-state": "1.1.0",
        "aria-hidden": "^1.2.4",
        "react-remove-scroll": "^2.6.3"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-popper": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-popper/-/react-popper-1.2.2.tgz",
      "integrity": "sha512-Rvqc3nOpwseCyj/rgjlJDYAgyfw7OC1tTkKn2ivhaMGcYt8FSBlahHOZak2i3QwkRXUXgGgzeEe2RuqeEHuHgA==",
      "license": "MIT",
      "dependencies": {
        "@floating-ui/react-dom": "^2.0.0",
        "@radix-ui/react-arrow": "1.1.2",
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-context": "1.1.1",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-use-callback-ref": "1.1.0",
        "@radix-ui/react-use-layout-effect": "1.1.0",
        "@radix-ui/react-use-rect": "1.1.0",
        "@radix-ui/react-use-size": "1.1.0",
        "@radix-ui/rect": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-portal": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-portal/-/react-portal-1.1.4.tgz",
      "integrity": "sha512-sn2O9k1rPFYVyKd5LAJfo96JlSGVFpa1fS6UuBJfrZadudiw5tAmru+n1x7aMRQ84qDM71Zh1+SzK5QwU0tJfA==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-use-layout-effect": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-presence": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-presence/-/react-presence-1.1.2.tgz",
      "integrity": "sha512-18TFr80t5EVgL9x1SwF/YGtfG+l0BS0PRAlCWBDoBEiDQjeKgnNZRVJp/oVBl24sr3Gbfwc/Qpj4OcWTQMsAEg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-use-layout-effect": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-primitive": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-primitive/-/react-primitive-2.0.2.tgz",
      "integrity": "sha512-Ec/0d38EIuvDF+GZjcMU/Ze6MxntVJYO/fRlCPhCaVUyPY9WTalHJw54tp9sXeJo3tlShWpy41vQRgLRGOuz+w==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-slot": "1.1.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-progress": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-progress/-/react-progress-1.1.2.tgz",
      "integrity": "sha512-u1IgJFQ4zNAUTjGdDL5dcl/U8ntOR6jsnhxKb5RKp5Ozwl88xKR9EqRZOe/Mk8tnx0x5tNUe2F+MzsyjqMg0MA==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-context": "1.1.1",
        "@radix-ui/react-primitive": "2.0.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-radio-group": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-radio-group/-/react-radio-group-1.2.3.tgz",
      "integrity": "sha512-xtCsqt8Rp09FK50ItqEqTJ7Sxanz8EM8dnkVIhJrc/wkMMomSmXHvYbhv3E7Zx4oXh98aaLt9W679SUYXg4IDA==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.1",
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-context": "1.1.1",
        "@radix-ui/react-direction": "1.1.0",
        "@radix-ui/react-presence": "1.1.2",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-roving-focus": "1.1.2",
        "@radix-ui/react-use-controllable-state": "1.1.0",
        "@radix-ui/react-use-previous": "1.1.0",
        "@radix-ui/react-use-size": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-roving-focus": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-roving-focus/-/react-roving-focus-1.1.2.tgz",
      "integrity": "sha512-zgMQWkNO169GtGqRvYrzb0Zf8NhMHS2DuEB/TiEmVnpr5OqPU3i8lfbxaAmC2J/KYuIQxyoQQ6DxepyXp61/xw==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.1",
        "@radix-ui/react-collection": "1.1.2",
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-context": "1.1.1",
        "@radix-ui/react-direction": "1.1.0",
        "@radix-ui/react-id": "1.1.0",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-use-callback-ref": "1.1.0",
        "@radix-ui/react-use-controllable-state": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-scroll-area": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-scroll-area/-/react-scroll-area-1.2.3.tgz",
      "integrity": "sha512-l7+NNBfBYYJa9tNqVcP2AGvxdE3lmE6kFTBXdvHgUaZuy+4wGCL1Cl2AfaR7RKyimj7lZURGLwFO59k4eBnDJQ==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/number": "1.1.0",
        "@radix-ui/primitive": "1.1.1",
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-context": "1.1.1",
        "@radix-ui/react-direction": "1.1.0",
        "@radix-ui/react-presence": "1.1.2",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-use-callback-ref": "1.1.0",
        "@radix-ui/react-use-layout-effect": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-select": {
      "version": "2.1.6",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-select/-/react-select-2.1.6.tgz",
      "integrity": "sha512-T6ajELxRvTuAMWH0YmRJ1qez+x4/7Nq7QIx7zJ0VK3qaEWdnWpNbEDnmWldG1zBDwqrLy5aLMUWcoGirVj5kMg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/number": "1.1.0",
        "@radix-ui/primitive": "1.1.1",
        "@radix-ui/react-collection": "1.1.2",
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-context": "1.1.1",
        "@radix-ui/react-direction": "1.1.0",
        "@radix-ui/react-dismissable-layer": "1.1.5",
        "@radix-ui/react-focus-guards": "1.1.1",
        "@radix-ui/react-focus-scope": "1.1.2",
        "@radix-ui/react-id": "1.1.0",
        "@radix-ui/react-popper": "1.2.2",
        "@radix-ui/react-portal": "1.1.4",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-slot": "1.1.2",
        "@radix-ui/react-use-callback-ref": "1.1.0",
        "@radix-ui/react-use-controllable-state": "1.1.0",
        "@radix-ui/react-use-layout-effect": "1.1.0",
        "@radix-ui/react-use-previous": "1.1.0",
        "@radix-ui/react-visually-hidden": "1.1.2",
        "aria-hidden": "^1.2.4",
        "react-remove-scroll": "^2.6.3"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-separator": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-separator/-/react-separator-1.1.2.tgz",
      "integrity": "sha512-oZfHcaAp2Y6KFBX6I5P1u7CQoy4lheCGiYj+pGFrHy8E/VNRb5E39TkTr3JrV520csPBTZjkuKFdEsjS5EUNKQ==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-primitive": "2.0.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-slider": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-slider/-/react-slider-1.2.3.tgz",
      "integrity": "sha512-nNrLAWLjGESnhqBqcCNW4w2nn7LxudyMzeB6VgdyAnFLC6kfQgnAjSL2v6UkQTnDctJBlxrmxfplWS4iYjdUTw==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/number": "1.1.0",
        "@radix-ui/primitive": "1.1.1",
        "@radix-ui/react-collection": "1.1.2",
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-context": "1.1.1",
        "@radix-ui/react-direction": "1.1.0",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-use-controllable-state": "1.1.0",
        "@radix-ui/react-use-layout-effect": "1.1.0",
        "@radix-ui/react-use-previous": "1.1.0",
        "@radix-ui/react-use-size": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-slot": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-slot/-/react-slot-1.1.2.tgz",
      "integrity": "sha512-YAKxaiGsSQJ38VzKH86/BPRC4rh+b1Jpa+JneA5LRE7skmLPNAyeG8kPJj/oo4STLvlrs8vkf/iYyc3A5stYCQ==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-compose-refs": "1.1.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-switch": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-switch/-/react-switch-1.1.3.tgz",
      "integrity": "sha512-1nc+vjEOQkJVsJtWPSiISGT6OKm4SiOdjMo+/icLxo2G4vxz1GntC5MzfL4v8ey9OEfw787QCD1y3mUv0NiFEQ==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.1",
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-context": "1.1.1",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-use-controllable-state": "1.1.0",
        "@radix-ui/react-use-previous": "1.1.0",
        "@radix-ui/react-use-size": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-tabs": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-tabs/-/react-tabs-1.1.3.tgz",
      "integrity": "sha512-9mFyI30cuRDImbmFF6O2KUJdgEOsGh9Vmx9x/Dh9tOhL7BngmQPQfwW4aejKm5OHpfWIdmeV6ySyuxoOGjtNng==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.1",
        "@radix-ui/react-context": "1.1.1",
        "@radix-ui/react-direction": "1.1.0",
        "@radix-ui/react-id": "1.1.0",
        "@radix-ui/react-presence": "1.1.2",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-roving-focus": "1.1.2",
        "@radix-ui/react-use-controllable-state": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-toggle": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-toggle/-/react-toggle-1.1.2.tgz",
      "integrity": "sha512-lntKchNWx3aCHuWKiDY+8WudiegQvBpDRAYL8dKLRvKEH8VOpl0XX6SSU/bUBqIRJbcTy4+MW06Wv8vgp10rzQ==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.1",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-use-controllable-state": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-toggle-group": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-toggle-group/-/react-toggle-group-1.1.2.tgz",
      "integrity": "sha512-JBm6s6aVG/nwuY5eadhU2zDi/IwYS0sDM5ZWb4nymv/hn3hZdkw+gENn0LP4iY1yCd7+bgJaCwueMYJIU3vk4A==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.1",
        "@radix-ui/react-context": "1.1.1",
        "@radix-ui/react-direction": "1.1.0",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-roving-focus": "1.1.2",
        "@radix-ui/react-toggle": "1.1.2",
        "@radix-ui/react-use-controllable-state": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-tooltip": {
      "version": "1.1.8",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-tooltip/-/react-tooltip-1.1.8.tgz",
      "integrity": "sha512-YAA2cu48EkJZdAMHC0dqo9kialOcRStbtiY4nJPaht7Ptrhcvpo+eDChaM6BIs8kL6a8Z5l5poiqLnXcNduOkA==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.1",
        "@radix-ui/react-compose-refs": "1.1.1",
        "@radix-ui/react-context": "1.1.1",
        "@radix-ui/react-dismissable-layer": "1.1.5",
        "@radix-ui/react-id": "1.1.0",
        "@radix-ui/react-popper": "1.2.2",
        "@radix-ui/react-portal": "1.1.4",
        "@radix-ui/react-presence": "1.1.2",
        "@radix-ui/react-primitive": "2.0.2",
        "@radix-ui/react-slot": "1.1.2",
        "@radix-ui/react-use-controllable-state": "1.1.0",
        "@radix-ui/react-visually-hidden": "1.1.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-callback-ref": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-callback-ref/-/react-use-callback-ref-1.1.0.tgz",
      "integrity": "sha512-CasTfvsy+frcFkbXtSJ2Zu9JHpN8TYKxkgJGWbjiZhFivxaeW7rMeZt7QELGVLaYVfFMsKHjb7Ak0nMEe+2Vfw==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-controllable-state": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-controllable-state/-/react-use-controllable-state-1.1.0.tgz",
      "integrity": "sha512-MtfMVJiSr2NjzS0Aa90NPTnvTSg6C/JLCV7ma0W6+OMV78vd8OyRpID+Ng9LxzsPbLeuBnWBA1Nq30AtBIDChw==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-use-callback-ref": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-escape-keydown": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-escape-keydown/-/react-use-escape-keydown-1.1.0.tgz",
      "integrity": "sha512-L7vwWlR1kTTQ3oh7g1O0CBF3YCyyTj8NmhLR+phShpyA50HCfBFKVJTpshm9PzLiKmehsrQzTYTpX9HvmC9rhw==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-use-callback-ref": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-layout-effect": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-layout-effect/-/react-use-layout-effect-1.1.0.tgz",
      "integrity": "sha512-+FPE0rOdziWSrH9athwI1R0HDVbWlEhd+FR+aSDk4uWGmSJ9Z54sdZVDQPZAinJhJXwfT+qnj969mCsT2gfm5w==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-previous": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-previous/-/react-use-previous-1.1.0.tgz",
      "integrity": "sha512-Z/e78qg2YFnnXcW88A4JmTtm4ADckLno6F7OXotmkQfeuCVaKuYzqAATPhVzl3delXE7CxIV8shofPn3jPc5Og==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-rect": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-rect/-/react-use-rect-1.1.0.tgz",
      "integrity": "sha512-0Fmkebhr6PiseyZlYAOtLS+nb7jLmpqTrJyv61Pe68MKYW6OWdRE2kI70TaYY27u7H0lajqM3hSMMLFq18Z7nQ==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/rect": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-size": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-size/-/react-use-size-1.1.0.tgz",
      "integrity": "sha512-XW3/vWuIXHa+2Uwcc2ABSfcCledmXhhQPlGbfcRXbiUQI5Icjcg19BGCZVKKInYbvUCut/ufbbLLPFC5cbb1hw==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-use-layout-effect": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-visually-hidden": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-visually-hidden/-/react-visually-hidden-1.1.2.tgz",
      "integrity": "sha512-1SzA4ns2M1aRlvxErqhLHsBHoS5eI5UUcI2awAMgGUp4LoaoWOKYmvqDY2s/tltuPkh3Yk77YF/r3IRj+Amx4Q==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-primitive": "2.0.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/rect": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/rect/-/rect-1.1.0.tgz",
      "integrity": "sha512-A9+lCBZoaMJlVKcRBz2YByCG+Cp2t6nAnMnNba+XiWxnj6r4JUFqfsgwocMBZU9LPtdxC6wB56ySYpc7LQIoJg==",
      "license": "MIT"
    },
    "node_modules/@react-dnd/asap": {
      "version": "5.0.2",
      "resolved": "https://registry.npmjs.org/@react-dnd/asap/-/asap-5.0.2.tgz",
      "integrity": "sha512-WLyfoHvxhs0V9U+GTsGilGgf2QsPl6ZZ44fnv0/b8T3nQyvzxidxsg/ZltbWssbsRDlYW8UKSQMTGotuTotZ6A==",
      "license": "MIT"
    },
    "node_modules/@react-dnd/invariant": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/@react-dnd/invariant/-/invariant-4.0.2.tgz",
      "integrity": "sha512-xKCTqAK/FFauOM9Ta2pswIyT3D8AQlfrYdOi/toTPEhqCuAs1v5tcJ3Y08Izh1cJ5Jchwy9SeAXmMg6zrKs2iw==",
      "license": "MIT"
    },
    "node_modules/@react-dnd/shallowequal": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/@react-dnd/shallowequal/-/shallowequal-4.0.2.tgz",
      "integrity": "sha512-/RVXdLvJxLg4QKvMoM5WlwNR9ViO9z8B/qPcc+C0Sa/teJY7QG7kJ441DwzOjMYEY7GmU4dj5EcGHIkKZiQZCA==",
      "license": "MIT"
    },
    "node_modules/@rolldown/pluginutils": {
      "version": "1.0.0-beta.27",
      "resolved": "https://registry.npmjs.org/@rolldown/pluginutils/-/pluginutils-1.0.0-beta.27.tgz",
      "integrity": "sha512-+d0F4MKMCbeVUJwG96uQ4SgAznZNSq93I3V+9NHA4OpvqG8mRCpGdKmK8l/dl02h2CCDHwW2FqilnTyDcAnqjA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@rollup/rollup-android-arm-eabi": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm-eabi/-/rollup-android-arm-eabi-4.60.1.tgz",
      "integrity": "sha512-d6FinEBLdIiK+1uACUttJKfgZREXrF0Qc2SmLII7W2AD8FfiZ9Wjd+rD/iRuf5s5dWrr1GgwXCvPqOuDquOowA==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-android-arm64": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm64/-/rollup-android-arm64-4.60.1.tgz",
      "integrity": "sha512-YjG/EwIDvvYI1YvYbHvDz/BYHtkY4ygUIXHnTdLhG+hKIQFBiosfWiACWortsKPKU/+dUwQQCKQM3qrDe8c9BA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-darwin-arm64": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-arm64/-/rollup-darwin-arm64-4.60.1.tgz",
      "integrity": "sha512-mjCpF7GmkRtSJwon+Rq1N8+pI+8l7w5g9Z3vWj4T7abguC4Czwi3Yu/pFaLvA3TTeMVjnu3ctigusqWUfjZzvw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-darwin-x64": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-x64/-/rollup-darwin-x64-4.60.1.tgz",
      "integrity": "sha512-haZ7hJ1JT4e9hqkoT9R/19XW2QKqjfJVv+i5AGg57S+nLk9lQnJ1F/eZloRO3o9Scy9CM3wQ9l+dkXtcBgN5Ew==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-arm64": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-arm64/-/rollup-freebsd-arm64-4.60.1.tgz",
      "integrity": "sha512-czw90wpQq3ZsAVBlinZjAYTKduOjTywlG7fEeWKUA7oCmpA8xdTkxZZlwNJKWqILlq0wehoZcJYfBvOyhPTQ6w==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-x64": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-x64/-/rollup-freebsd-x64-4.60.1.tgz",
      "integrity": "sha512-KVB2rqsxTHuBtfOeySEyzEOB7ltlB/ux38iu2rBQzkjbwRVlkhAGIEDiiYnO2kFOkJp+Z7pUXKyrRRFuFUKt+g==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-gnueabihf": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-gnueabihf/-/rollup-linux-arm-gnueabihf-4.60.1.tgz",
      "integrity": "sha512-L+34Qqil+v5uC0zEubW7uByo78WOCIrBvci69E7sFASRl0X7b/MB6Cqd1lky/CtcSVTydWa2WZwFuWexjS5o6g==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-musleabihf": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-musleabihf/-/rollup-linux-arm-musleabihf-4.60.1.tgz",
      "integrity": "sha512-n83O8rt4v34hgFzlkb1ycniJh7IR5RCIqt6mz1VRJD6pmhRi0CXdmfnLu9dIUS6buzh60IvACM842Ffb3xd6Gg==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-gnu": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-gnu/-/rollup-linux-arm64-gnu-4.60.1.tgz",
      "integrity": "sha512-Nql7sTeAzhTAja3QXeAI48+/+GjBJ+QmAH13snn0AJSNL50JsDqotyudHyMbO2RbJkskbMbFJfIJKWA6R1LCJQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-musl": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-musl/-/rollup-linux-arm64-musl-4.60.1.tgz",
      "integrity": "sha512-+pUymDhd0ys9GcKZPPWlFiZ67sTWV5UU6zOJat02M1+PiuSGDziyRuI/pPue3hoUwm2uGfxdL+trT6Z9rxnlMA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-loong64-gnu": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-loong64-gnu/-/rollup-linux-loong64-gnu-4.60.1.tgz",
      "integrity": "sha512-VSvgvQeIcsEvY4bKDHEDWcpW4Yw7BtlKG1GUT4FzBUlEKQK0rWHYBqQt6Fm2taXS+1bXvJT6kICu5ZwqKCnvlQ==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-loong64-musl": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-loong64-musl/-/rollup-linux-loong64-musl-4.60.1.tgz",
      "integrity": "sha512-4LqhUomJqwe641gsPp6xLfhqWMbQV04KtPp7/dIp0nzPxAkNY1AbwL5W0MQpcalLYk07vaW9Kp1PBhdpZYYcEw==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-ppc64-gnu": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-ppc64-gnu/-/rollup-linux-ppc64-gnu-4.60.1.tgz",
      "integrity": "sha512-tLQQ9aPvkBxOc/EUT6j3pyeMD6Hb8QF2BTBnCQWP/uu1lhc9AIrIjKnLYMEroIz/JvtGYgI9dF3AxHZNaEH0rw==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-ppc64-musl": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-ppc64-musl/-/rollup-linux-ppc64-musl-4.60.1.tgz",
      "integrity": "sha512-RMxFhJwc9fSXP6PqmAz4cbv3kAyvD1etJFjTx4ONqFP9DkTkXsAMU4v3Vyc5BgzC+anz7nS/9tp4obsKfqkDHg==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-gnu": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-gnu/-/rollup-linux-riscv64-gnu-4.60.1.tgz",
      "integrity": "sha512-QKgFl+Yc1eEk6MmOBfRHYF6lTxiiiV3/z/BRrbSiW2I7AFTXoBFvdMEyglohPj//2mZS4hDOqeB0H1ACh3sBbg==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-musl": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-musl/-/rollup-linux-riscv64-musl-4.60.1.tgz",
      "integrity": "sha512-RAjXjP/8c6ZtzatZcA1RaQr6O1TRhzC+adn8YZDnChliZHviqIjmvFwHcxi4JKPSDAt6Uhf/7vqcBzQJy0PDJg==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-s390x-gnu": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-s390x-gnu/-/rollup-linux-s390x-gnu-4.60.1.tgz",
      "integrity": "sha512-wcuocpaOlaL1COBYiA89O6yfjlp3RwKDeTIA0hM7OpmhR1Bjo9j31G1uQVpDlTvwxGn2nQs65fBFL5UFd76FcQ==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-gnu": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-gnu/-/rollup-linux-x64-gnu-4.60.1.tgz",
      "integrity": "sha512-77PpsFQUCOiZR9+LQEFg9GClyfkNXj1MP6wRnzYs0EeWbPcHs02AXu4xuUbM1zhwn3wqaizle3AEYg5aeoohhg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-musl": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-musl/-/rollup-linux-x64-musl-4.60.1.tgz",
      "integrity": "sha512-5cIATbk5vynAjqqmyBjlciMJl1+R/CwX9oLk/EyiFXDWd95KpHdrOJT//rnUl4cUcskrd0jCCw3wpZnhIHdD9w==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-openbsd-x64": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-openbsd-x64/-/rollup-openbsd-x64-4.60.1.tgz",
      "integrity": "sha512-cl0w09WsCi17mcmWqqglez9Gk8isgeWvoUZ3WiJFYSR3zjBQc2J5/ihSjpl+VLjPqjQ/1hJRcqBfLjssREQILw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ]
    },
    "node_modules/@rollup/rollup-openharmony-arm64": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-openharmony-arm64/-/rollup-openharmony-arm64-4.60.1.tgz",
      "integrity": "sha512-4Cv23ZrONRbNtbZa37mLSueXUCtN7MXccChtKpUnQNgF010rjrjfHx3QxkS2PI7LqGT5xXyYs1a7LbzAwT0iCA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ]
    },
    "node_modules/@rollup/rollup-win32-arm64-msvc": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-arm64-msvc/-/rollup-win32-arm64-msvc-4.60.1.tgz",
      "integrity": "sha512-i1okWYkA4FJICtr7KpYzFpRTHgy5jdDbZiWfvny21iIKky5YExiDXP+zbXzm3dUcFpkEeYNHgQ5fuG236JPq0g==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-ia32-msvc": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-ia32-msvc/-/rollup-win32-ia32-msvc-4.60.1.tgz",
      "integrity": "sha512-u09m3CuwLzShA0EYKMNiFgcjjzwqtUMLmuCJLeZWjjOYA3IT2Di09KaxGBTP9xVztWyIWjVdsB2E9goMjZvTQg==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-gnu": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-gnu/-/rollup-win32-x64-gnu-4.60.1.tgz",
      "integrity": "sha512-k+600V9Zl1CM7eZxJgMyTUzmrmhB/0XZnF4pRypKAlAgxmedUA+1v9R+XOFv56W4SlHEzfeMtzujLJD22Uz5zg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-msvc": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-msvc/-/rollup-win32-x64-msvc-4.60.1.tgz",
      "integrity": "sha512-lWMnixq/QzxyhTV6NjQJ4SFo1J6PvOX8vUx5Wb4bBPsEb+8xZ89Bz6kOXpfXj9ak9AHTQVQzlgzBEc1SyM27xQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@tailwindcss/node": {
      "version": "4.1.12",
      "resolved": "https://registry.npmjs.org/@tailwindcss/node/-/node-4.1.12.tgz",
      "integrity": "sha512-3hm9brwvQkZFe++SBt+oLjo4OLDtkvlE8q2WalaD/7QWaeM7KEJbAiY/LJZUaCs7Xa8aUu4xy3uoyX4q54UVdQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/remapping": "^2.3.4",
        "enhanced-resolve": "^5.18.3",
        "jiti": "^2.5.1",
        "lightningcss": "1.30.1",
        "magic-string": "^0.30.17",
        "source-map-js": "^1.2.1",
        "tailwindcss": "4.1.12"
      }
    },
    "node_modules/@tailwindcss/oxide": {
      "version": "4.1.12",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide/-/oxide-4.1.12.tgz",
      "integrity": "sha512-gM5EoKHW/ukmlEtphNwaGx45fGoEmP10v51t9unv55voWh6WrOL19hfuIdo2FjxIaZzw776/BUQg7Pck++cIVw==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "dependencies": {
        "detect-libc": "^2.0.4",
        "tar": "^7.4.3"
      },
      "engines": {
        "node": ">= 10"
      },
      "optionalDependencies": {
        "@tailwindcss/oxide-android-arm64": "4.1.12",
        "@tailwindcss/oxide-darwin-arm64": "4.1.12",
        "@tailwindcss/oxide-darwin-x64": "4.1.12",
        "@tailwindcss/oxide-freebsd-x64": "4.1.12",
        "@tailwindcss/oxide-linux-arm-gnueabihf": "4.1.12",
        "@tailwindcss/oxide-linux-arm64-gnu": "4.1.12",
        "@tailwindcss/oxide-linux-arm64-musl": "4.1.12",
        "@tailwindcss/oxide-linux-x64-gnu": "4.1.12",
        "@tailwindcss/oxide-linux-x64-musl": "4.1.12",
        "@tailwindcss/oxide-wasm32-wasi": "4.1.12",
        "@tailwindcss/oxide-win32-arm64-msvc": "4.1.12",
        "@tailwindcss/oxide-win32-x64-msvc": "4.1.12"
      }
    },
    "node_modules/@tailwindcss/oxide-android-arm64": {
      "version": "4.1.12",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-android-arm64/-/oxide-android-arm64-4.1.12.tgz",
      "integrity": "sha512-oNY5pq+1gc4T6QVTsZKwZaGpBb2N1H1fsc1GD4o7yinFySqIuRZ2E4NvGasWc6PhYJwGK2+5YT1f9Tp80zUQZQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@tailwindcss/oxide-darwin-arm64": {
      "version": "4.1.12",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-darwin-arm64/-/oxide-darwin-arm64-4.1.12.tgz",
      "integrity": "sha512-cq1qmq2HEtDV9HvZlTtrj671mCdGB93bVY6J29mwCyaMYCP/JaUBXxrQQQm7Qn33AXXASPUb2HFZlWiiHWFytw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@tailwindcss/oxide-darwin-x64": {
      "version": "4.1.12",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-darwin-x64/-/oxide-darwin-x64-4.1.12.tgz",
      "integrity": "sha512-6UCsIeFUcBfpangqlXay9Ffty9XhFH1QuUFn0WV83W8lGdX8cD5/+2ONLluALJD5+yJ7k8mVtwy3zMZmzEfbLg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@tailwindcss/oxide-freebsd-x64": {
      "version": "4.1.12",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-freebsd-x64/-/oxide-freebsd-x64-4.1.12.tgz",
      "integrity": "sha512-JOH/f7j6+nYXIrHobRYCtoArJdMJh5zy5lr0FV0Qu47MID/vqJAY3r/OElPzx1C/wdT1uS7cPq+xdYYelny1ww==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm-gnueabihf": {
      "version": "4.1.12",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm-gnueabihf/-/oxide-linux-arm-gnueabihf-4.1.12.tgz",
      "integrity": "sha512-v4Ghvi9AU1SYgGr3/j38PD8PEe6bRfTnNSUE3YCMIRrrNigCFtHZ2TCm8142X8fcSqHBZBceDx+JlFJEfNg5zQ==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm64-gnu": {
      "version": "4.1.12",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm64-gnu/-/oxide-linux-arm64-gnu-4.1.12.tgz",
      "integrity": "sha512-YP5s1LmetL9UsvVAKusHSyPlzSRqYyRB0f+Kl/xcYQSPLEw/BvGfxzbH+ihUciePDjiXwHh+p+qbSP3SlJw+6g==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm64-musl": {
      "version": "4.1.12",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm64-musl/-/oxide-linux-arm64-musl-4.1.12.tgz",
      "integrity": "sha512-V8pAM3s8gsrXcCv6kCHSuwyb/gPsd863iT+v1PGXC4fSL/OJqsKhfK//v8P+w9ThKIoqNbEnsZqNy+WDnwQqCA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-x64-gnu": {
      "version": "4.1.12",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-x64-gnu/-/oxide-linux-x64-gnu-4.1.12.tgz",
      "integrity": "sha512-xYfqYLjvm2UQ3TZggTGrwxjYaLB62b1Wiysw/YE3Yqbh86sOMoTn0feF98PonP7LtjsWOWcXEbGqDL7zv0uW8Q==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-x64-musl": {
      "version": "4.1.12",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-x64-musl/-/oxide-linux-x64-musl-4.1.12.tgz",
      "integrity": "sha512-ha0pHPamN+fWZY7GCzz5rKunlv9L5R8kdh+YNvP5awe3LtuXb5nRi/H27GeL2U+TdhDOptU7T6Is7mdwh5Ar3A==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@tailwindcss/oxide-wasm32-wasi": {
      "version": "4.1.12",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-wasm32-wasi/-/oxide-wasm32-wasi-4.1.12.tgz",
      "integrity": "sha512-4tSyu3dW+ktzdEpuk6g49KdEangu3eCYoqPhWNsZgUhyegEda3M9rG0/j1GV/JjVVsj+lG7jWAyrTlLzd/WEBg==",
      "bundleDependencies": [
        "@napi-rs/wasm-runtime",
        "@emnapi/core",
        "@emnapi/runtime",
        "@tybys/wasm-util",
        "@emnapi/wasi-threads",
        "tslib"
      ],
      "cpu": [
        "wasm32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/core": "^1.4.5",
        "@emnapi/runtime": "^1.4.5",
        "@emnapi/wasi-threads": "^1.0.4",
        "@napi-rs/wasm-runtime": "^0.2.12",
        "@tybys/wasm-util": "^0.10.0",
        "tslib": "^2.8.0"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/@tailwindcss/oxide-win32-arm64-msvc": {
      "version": "4.1.12",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-win32-arm64-msvc/-/oxide-win32-arm64-msvc-4.1.12.tgz",
      "integrity": "sha512-iGLyD/cVP724+FGtMWslhcFyg4xyYyM+5F4hGvKA7eifPkXHRAUDFaimu53fpNg9X8dfP75pXx/zFt/jlNF+lg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@tailwindcss/oxide-win32-x64-msvc": {
      "version": "4.1.12",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-win32-x64-msvc/-/oxide-win32-x64-msvc-4.1.12.tgz",
      "integrity": "sha512-NKIh5rzw6CpEodv/++r0hGLlfgT/gFN+5WNdZtvh6wpU2BpGNgdjvj6H2oFc8nCM839QM1YOhjpgbAONUb4IxA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@tailwindcss/vite": {
      "version": "4.1.12",
      "resolved": "https://registry.npmjs.org/@tailwindcss/vite/-/vite-4.1.12.tgz",
      "integrity": "sha512-4pt0AMFDx7gzIrAOIYgYP0KCBuKWqyW8ayrdiLEjoJTT4pKTjrzG/e4uzWtTLDziC+66R9wbUqZBccJalSE5vQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@tailwindcss/node": "4.1.12",
        "@tailwindcss/oxide": "4.1.12",
        "tailwindcss": "4.1.12"
      },
      "peerDependencies": {
        "vite": "^5.2.0 || ^6 || ^7"
      }
    },
    "node_modules/@types/babel__core": {
      "version": "7.20.5",
      "resolved": "https://registry.npmjs.org/@types/babel__core/-/babel__core-7.20.5.tgz",
      "integrity": "sha512-qoQprZvz5wQFJwMDqeseRXWv3rqMvhgpbXFfVyWhbx9X47POIA6i/+dXefEmZKoAgOaTdaIgNSMqMIU61yRyzA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.20.7",
        "@babel/types": "^7.20.7",
        "@types/babel__generator": "*",
        "@types/babel__template": "*",
        "@types/babel__traverse": "*"
      }
    },
    "node_modules/@types/babel__generator": {
      "version": "7.27.0",
      "resolved": "https://registry.npmjs.org/@types/babel__generator/-/babel__generator-7.27.0.tgz",
      "integrity": "sha512-ufFd2Xi92OAVPYsy+P4n7/U7e68fex0+Ee8gSG9KX7eo084CWiQ4sdxktvdl0bOPupXtVJPY19zk6EwWqUQ8lg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__template": {
      "version": "7.4.4",
      "resolved": "https://registry.npmjs.org/@types/babel__template/-/babel__template-7.4.4.tgz",
      "integrity": "sha512-h/NUaSyG5EyxBIp8YRxo4RMe2/qQgvyowRwVMzhYhBCONbW8PUsg4lkFMrhgZhUe5z3L3MiLDuvyJ/CaPa2A8A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.1.0",
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__traverse": {
      "version": "7.28.0",
      "resolved": "https://registry.npmjs.org/@types/babel__traverse/-/babel__traverse-7.28.0.tgz",
      "integrity": "sha512-8PvcXf70gTDZBgt9ptxJ8elBeBjcLOAcOtoO/mPJjtji1+CdGbHgm77om1GrsPxsiE+uXIpNSK64UYaIwQXd4Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.28.2"
      }
    },
    "node_modules/@types/d3-array": {
      "version": "3.2.2",
      "resolved": "https://registry.npmjs.org/@types/d3-array/-/d3-array-3.2.2.tgz",
      "integrity": "sha512-hOLWVbm7uRza0BYXpIIW5pxfrKe0W+D5lrFiAEYR+pb6w3N2SwSMaJbXdUfSEv+dT4MfHBLtn5js0LAWaO6otw==",
      "license": "MIT"
    },
    "node_modules/@types/d3-color": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/@types/d3-color/-/d3-color-3.1.3.tgz",
      "integrity": "sha512-iO90scth9WAbmgv7ogoq57O9YpKmFBbmoEoCHDB2xMBY0+/KVrqAaCDyCE16dUspeOvIxFFRI+0sEtqDqy2b4A==",
      "license": "MIT"
    },
    "node_modules/@types/d3-ease": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/@types/d3-ease/-/d3-ease-3.0.2.tgz",
      "integrity": "sha512-NcV1JjO5oDzoK26oMzbILE6HW7uVXOHLQvHshBUW4UMdZGfiY6v5BeQwh9a9tCzv+CeefZQHJt5SRgK154RtiA==",
      "license": "MIT"
    },
    "node_modules/@types/d3-interpolate": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/@types/d3-interpolate/-/d3-interpolate-3.0.4.tgz",
      "integrity": "sha512-mgLPETlrpVV1YRJIglr4Ez47g7Yxjl1lj7YKsiMCb27VJH9W8NVM6Bb9d8kkpG/uAQS5AmbA48q2IAolKKo1MA==",
      "license": "MIT",
      "dependencies": {
        "@types/d3-color": "*"
      }
    },
    "node_modules/@types/d3-path": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/@types/d3-path/-/d3-path-3.1.1.tgz",
      "integrity": "sha512-VMZBYyQvbGmWyWVea0EHs/BwLgxc+MKi1zLDCONksozI4YJMcTt8ZEuIR4Sb1MMTE8MMW49v0IwI5+b7RmfWlg==",
      "license": "MIT"
    },
    "node_modules/@types/d3-scale": {
      "version": "4.0.9",
      "resolved": "https://registry.npmjs.org/@types/d3-scale/-/d3-scale-4.0.9.tgz",
      "integrity": "sha512-dLmtwB8zkAeO/juAMfnV+sItKjlsw2lKdZVVy6LRr0cBmegxSABiLEpGVmSJJ8O08i4+sGR6qQtb6WtuwJdvVw==",
      "license": "MIT",
      "dependencies": {
        "@types/d3-time": "*"
      }
    },
    "node_modules/@types/d3-shape": {
      "version": "3.1.8",
      "resolved": "https://registry.npmjs.org/@types/d3-shape/-/d3-shape-3.1.8.tgz",
      "integrity": "sha512-lae0iWfcDeR7qt7rA88BNiqdvPS5pFVPpo5OfjElwNaT2yyekbM0C9vK+yqBqEmHr6lDkRnYNoTBYlAgJa7a4w==",
      "license": "MIT",
      "dependencies": {
        "@types/d3-path": "*"
      }
    },
    "node_modules/@types/d3-time": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/@types/d3-time/-/d3-time-3.0.4.tgz",
      "integrity": "sha512-yuzZug1nkAAaBlBBikKZTgzCeA+k1uy4ZFwWANOfKw5z5LRhV0gNA7gNkKm7HoK+HRN0wX3EkxGk0fpbWhmB7g==",
      "license": "MIT"
    },
    "node_modules/@types/d3-timer": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/@types/d3-timer/-/d3-timer-3.0.2.tgz",
      "integrity": "sha512-Ps3T8E8dZDam6fUyNiMkekK3XUsaUEik+idO9/YjPtfj2qruF8tFBXS7XhtE4iIXBLxhmLjP3SXpLhVf21I9Lw==",
      "license": "MIT"
    },
    "node_modules/@types/estree": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/@types/estree/-/estree-1.0.8.tgz",
      "integrity": "sha512-dWHzHa2WqEXI/O1E9OjrocMTKJl2mSrEolh1Iomrv6U+JuNwaHXsXx9bLu5gG7BUWFIN0skIQJQ/L1rIex4X6w==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/parse-json": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/@types/parse-json/-/parse-json-4.0.2.tgz",
      "integrity": "sha512-dISoDXWWQwUquiKsyZ4Ng+HX2KsPL7LyHKHQwgGFEA3IaKac4Obd+h2a/a6waisAoepJlBcx9paWqjA8/HVjCw==",
      "license": "MIT"
    },
    "node_modules/@types/prop-types": {
      "version": "15.7.15",
      "resolved": "https://registry.npmjs.org/@types/prop-types/-/prop-types-15.7.15.tgz",
      "integrity": "sha512-F6bEyamV9jKGAFBEmlQnesRPGOQqS2+Uwi0Em15xenOxHaf2hv6L8YCVn3rPdPJOiJfPiCnLIRyvwVaqMY3MIw==",
      "license": "MIT"
    },
    "node_modules/@types/react": {
      "version": "19.2.14",
      "resolved": "https://registry.npmjs.org/@types/react/-/react-19.2.14.tgz",
      "integrity": "sha512-ilcTH/UniCkMdtexkoCN0bI7pMcJDvmQFPvuPvmEaYA/NSfFTAgdUSLAoVjaRJm7+6PvcM+q1zYOwS4wTYMF9w==",
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "csstype": "^3.2.2"
      }
    },
    "node_modules/@types/react-transition-group": {
      "version": "4.4.12",
      "resolved": "https://registry.npmjs.org/@types/react-transition-group/-/react-transition-group-4.4.12.tgz",
      "integrity": "sha512-8TV6R3h2j7a91c+1DXdJi3Syo69zzIZbz7Lg5tORM5LEJG7X/E6a1V3drRyBRZq7/utz7A+c4OgYLiLcYGHG6w==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*"
      }
    },
    "node_modules/@vitejs/plugin-react": {
      "version": "4.7.0",
      "resolved": "https://registry.npmjs.org/@vitejs/plugin-react/-/plugin-react-4.7.0.tgz",
      "integrity": "sha512-gUu9hwfWvvEDBBmgtAowQCojwZmJ5mcLn3aufeCsitijs3+f2NsrPtlAWIR6OPiqljl96GVCUbLe0HyqIpVaoA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/core": "^7.28.0",
        "@babel/plugin-transform-react-jsx-self": "^7.27.1",
        "@babel/plugin-transform-react-jsx-source": "^7.27.1",
        "@rolldown/pluginutils": "1.0.0-beta.27",
        "@types/babel__core": "^7.20.5",
        "react-refresh": "^0.17.0"
      },
      "engines": {
        "node": "^14.18.0 || >=16.0.0"
      },
      "peerDependencies": {
        "vite": "^4.2.0 || ^5.0.0 || ^6.0.0 || ^7.0.0"
      }
    },
    "node_modules/aria-hidden": {
      "version": "1.2.6",
      "resolved": "https://registry.npmjs.org/aria-hidden/-/aria-hidden-1.2.6.tgz",
      "integrity": "sha512-ik3ZgC9dY/lYVVM++OISsaYDeg1tb0VtP5uL3ouh1koGOaUMDPpbFIei4JkFimWUFPn90sbMNMXQAIVOlnYKJA==",
      "license": "MIT",
      "dependencies": {
        "tslib": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/babel-plugin-macros": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/babel-plugin-macros/-/babel-plugin-macros-3.1.0.tgz",
      "integrity": "sha512-Cg7TFGpIr01vOQNODXOOaGz2NpCU5gl8x1qJFbb6hbZxR7XrcE2vtbAsTAbJ7/xwJtUuJEw8K8Zr/AE0LHlesg==",
      "license": "MIT",
      "dependencies": {
        "@babel/runtime": "^7.12.5",
        "cosmiconfig": "^7.0.0",
        "resolve": "^1.19.0"
      },
      "engines": {
        "node": ">=10",
        "npm": ">=6"
      }
    },
    "node_modules/baseline-browser-mapping": {
      "version": "2.10.19",
      "resolved": "https://registry.npmjs.org/baseline-browser-mapping/-/baseline-browser-mapping-2.10.19.tgz",
      "integrity": "sha512-qCkNLi2sfBOn8XhZQ0FXsT1Ki/Yo5P90hrkRamVFRS7/KV9hpfA4HkoWNU152+8w0zPjnxo5psx5NL3PSGgv5g==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "baseline-browser-mapping": "dist/cli.cjs"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/browserslist": {
      "version": "4.28.2",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.28.2.tgz",
      "integrity": "sha512-48xSriZYYg+8qXna9kwqjIVzuQxi+KYWp2+5nCYnYKPTr0LvD89Jqk2Or5ogxz0NUMfIjhh2lIUX/LyX9B4oIg==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "baseline-browser-mapping": "^2.10.12",
        "caniuse-lite": "^1.0.30001782",
        "electron-to-chromium": "^1.5.328",
        "node-releases": "^2.0.36",
        "update-browserslist-db": "^1.2.3"
      },
      "bin": {
        "browserslist": "cli.js"
      },
      "engines": {
        "node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"
      }
    },
    "node_modules/callsites": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/callsites/-/callsites-3.1.0.tgz",
      "integrity": "sha512-P8BjAsXvZS+VIDUI11hHCQEv74YT67YUi5JJFNWIqL235sBmjX4+qx9Muvls5ivyNENctx46xQLQ3aTuE7ssaQ==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001788",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001788.tgz",
      "integrity": "sha512-6q8HFp+lOQtcf7wBK+uEenxymVWkGKkjFpCvw5W25cmMwEDU45p1xQFBQv8JDlMMry7eNxyBaR+qxgmTUZkIRQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "CC-BY-4.0"
    },
    "node_modules/canvas-confetti": {
      "version": "1.9.4",
      "resolved": "https://registry.npmjs.org/canvas-confetti/-/canvas-confetti-1.9.4.tgz",
      "integrity": "sha512-yxQbJkAVrFXWNbTUjPqjF7G+g6pDotOUHGbkZq2NELZUMDpiJ85rIEazVb8GTaAptNW2miJAXbs1BtioA251Pw==",
      "license": "ISC",
      "funding": {
        "type": "donate",
        "url": "https://www.paypal.me/kirilvatev"
      }
    },
    "node_modules/chownr": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/chownr/-/chownr-3.0.0.tgz",
      "integrity": "sha512-+IxzY9BZOQd/XuYPRmrvEVjF/nqj5kgT4kEq7VofrDoM1MxoRjEWkrCC3EtLi59TVawxTAn+orJwFQcrqEN1+g==",
      "dev": true,
      "license": "BlueOak-1.0.0",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/class-variance-authority": {
      "version": "0.7.1",
      "resolved": "https://registry.npmjs.org/class-variance-authority/-/class-variance-authority-0.7.1.tgz",
      "integrity": "sha512-Ka+9Trutv7G8M6WT6SeiRWz792K5qEqIGEGzXKhAE6xOWAY6pPH8U+9IY3oCMv6kqTmLsv7Xh/2w2RigkePMsg==",
      "license": "Apache-2.0",
      "dependencies": {
        "clsx": "^2.1.1"
      },
      "funding": {
        "url": "https://polar.sh/cva"
      }
    },
    "node_modules/classnames": {
      "version": "2.5.1",
      "resolved": "https://registry.npmjs.org/classnames/-/classnames-2.5.1.tgz",
      "integrity": "sha512-saHYOzhIQs6wy2sVxTM6bUDsQO4F50V9RQ22qBpEdCW+I+/Wmke2HOl6lS6dTpdxVhb88/I6+Hs+438c3lfUow==",
      "license": "MIT"
    },
    "node_modules/clsx": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/clsx/-/clsx-2.1.1.tgz",
      "integrity": "sha512-eYm0QWBtUrBWZWG0d386OGAw16Z995PiOVo2B7bjWSbHedGl5e0ZWaq65kOGgUSNesEIDkB9ISbTg/JK9dhCZA==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/cmdk": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/cmdk/-/cmdk-1.1.1.tgz",
      "integrity": "sha512-Vsv7kFaXm+ptHDMZ7izaRsP70GgrW9NBNGswt9OZaVBLlE0SNpDq8eu/VGXyF9r7M0azK3Wy7OlYXsuyYLFzHg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-compose-refs": "^1.1.1",
        "@radix-ui/react-dialog": "^1.1.6",
        "@radix-ui/react-id": "^1.1.0",
        "@radix-ui/react-primitive": "^2.0.2"
      },
      "peerDependencies": {
        "react": "^18 || ^19 || ^19.0.0-rc",
        "react-dom": "^18 || ^19 || ^19.0.0-rc"
      }
    },
    "node_modules/convert-source-map": {
      "version": "1.9.0",
      "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-1.9.0.tgz",
      "integrity": "sha512-ASFBup0Mz1uyiIjANan1jzLQami9z1PoYSZCiiYW2FczPbenXc45FZdBZLzOT+r6+iciuEModtmCti+hjaAk0A==",
      "license": "MIT"
    },
    "node_modules/cookie": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-1.1.1.tgz",
      "integrity": "sha512-ei8Aos7ja0weRpFzJnEA9UHJ/7XQmqglbRwnf2ATjcB9Wq874VKH9kfjjirM6UhU2/E5fFYadylyhFldcqSidQ==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/cosmiconfig": {
      "version": "7.1.0",
      "resolved": "https://registry.npmjs.org/cosmiconfig/-/cosmiconfig-7.1.0.tgz",
      "integrity": "sha512-AdmX6xUzdNASswsFtmwSt7Vj8po9IuqXm0UXz7QKPuEUmPB4XyjGfaAr2PSuELMwkRMVH1EpIkX5bTZGRB3eCA==",
      "license": "MIT",
      "dependencies": {
        "@types/parse-json": "^4.0.0",
        "import-fresh": "^3.2.1",
        "parse-json": "^5.0.0",
        "path-type": "^4.0.0",
        "yaml": "^1.10.0"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/cosmiconfig/node_modules/yaml": {
      "version": "1.10.3",
      "resolved": "https://registry.npmjs.org/yaml/-/yaml-1.10.3.tgz",
      "integrity": "sha512-vIYeF1u3CjlhAFekPPAk2h/Kv4T3mAkMox5OymRiJQB0spDP10LHvt+K7G9Ny6NuuMAb25/6n1qyUjAcGNf/AA==",
      "license": "ISC",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/csstype": {
      "version": "3.2.3",
      "resolved": "https://registry.npmjs.org/csstype/-/csstype-3.2.3.tgz",
      "integrity": "sha512-z1HGKcYy2xA8AGQfwrn0PAy+PB7X/GSj3UVJW9qKyn43xWa+gl5nXmU4qqLMRzWVLFC8KusUX8T/0kCiOYpAIQ==",
      "license": "MIT"
    },
    "node_modules/d3-array": {
      "version": "3.2.4",
      "resolved": "https://registry.npmjs.org/d3-array/-/d3-array-3.2.4.tgz",
      "integrity": "sha512-tdQAmyA18i4J7wprpYq8ClcxZy3SC31QMeByyCFyRt7BVHdREQZ5lpzoe5mFEYZUWe+oq8HBvk9JjpibyEV4Jg==",
      "license": "ISC",
      "dependencies": {
        "internmap": "1 - 2"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-color": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/d3-color/-/d3-color-3.1.0.tgz",
      "integrity": "sha512-zg/chbXyeBtMQ1LbD/WSoW2DpC3I0mpmPdW+ynRTj/x2DAWYrIY7qeZIHidozwV24m4iavr15lNwIwLxRmOxhA==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-ease": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/d3-ease/-/d3-ease-3.0.1.tgz",
      "integrity": "sha512-wR/XK3D3XcLIZwpbvQwQ5fK+8Ykds1ip7A2Txe0yxncXSdq1L9skcG7blcedkOX+ZcgxGAmLX1FrRGbADwzi0w==",
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-format": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/d3-format/-/d3-format-3.1.2.tgz",
      "integrity": "sha512-AJDdYOdnyRDV5b6ArilzCPPwc1ejkHcoyFarqlPqT7zRYjhavcT3uSrqcMvsgh2CgoPbK3RCwyHaVyxYcP2Arg==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-interpolate": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/d3-interpolate/-/d3-interpolate-3.0.1.tgz",
      "integrity": "sha512-3bYs1rOD33uo8aqJfKP3JWPAibgw8Zm2+L9vBKEHJ2Rg+viTR7o5Mmv5mZcieN+FRYaAOWX5SJATX6k1PWz72g==",
      "license": "ISC",
      "dependencies": {
        "d3-color": "1 - 3"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-path": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/d3-path/-/d3-path-3.1.0.tgz",
      "integrity": "sha512-p3KP5HCf/bvjBSSKuXid6Zqijx7wIfNW+J/maPs+iwR35at5JCbLUT0LzF1cnjbCHWhqzQTIN2Jpe8pRebIEFQ==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-scale": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/d3-scale/-/d3-scale-4.0.2.tgz",
      "integrity": "sha512-GZW464g1SH7ag3Y7hXjf8RoUuAFIqklOAq3MRl4OaWabTFJY9PN/E1YklhXLh+OQ3fM9yS2nOkCoS+WLZ6kvxQ==",
      "license": "ISC",
      "dependencies": {
        "d3-array": "2.10.0 - 3",
        "d3-format": "1 - 3",
        "d3-interpolate": "1.2.0 - 3",
        "d3-time": "2.1.1 - 3",
        "d3-time-format": "2 - 4"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-shape": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/d3-shape/-/d3-shape-3.2.0.tgz",
      "integrity": "sha512-SaLBuwGm3MOViRq2ABk3eLoxwZELpH6zhl3FbAoJ7Vm1gofKx6El1Ib5z23NUEhF9AsGl7y+dzLe5Cw2AArGTA==",
      "license": "ISC",
      "dependencies": {
        "d3-path": "^3.1.0"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-time": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/d3-time/-/d3-time-3.1.0.tgz",
      "integrity": "sha512-VqKjzBLejbSMT4IgbmVgDjpkYrNWUYJnbCGo874u7MMKIWsILRX+OpX/gTk8MqjpT1A/c6HY2dCA77ZN0lkQ2Q==",
      "license": "ISC",
      "dependencies": {
        "d3-array": "2 - 3"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-time-format": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/d3-time-format/-/d3-time-format-4.1.0.tgz",
      "integrity": "sha512-dJxPBlzC7NugB2PDLwo9Q8JiTR3M3e4/XANkreKSUxF8vvXKqm1Yfq4Q5dl8budlunRVlUUaDUgFt7eA8D6NLg==",
      "license": "ISC",
      "dependencies": {
        "d3-time": "1 - 3"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-timer": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/d3-timer/-/d3-timer-3.0.1.tgz",
      "integrity": "sha512-ndfJ/JxxMd3nw31uyKoY2naivF+r29V+Lc0svZxe1JvvIRmi8hUsrMvdOwgS1o6uBHmiz91geQ0ylPP0aj1VUA==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/date-fns": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/date-fns/-/date-fns-3.6.0.tgz",
      "integrity": "sha512-fRHTG8g/Gif+kSh50gaGEdToemgfj74aRX3swtiouboip5JDLAyDE9F11nHMIcvOaXeOC6D7SpNhi7uFyB7Uww==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/kossnocorp"
      }
    },
    "node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/decimal.js-light": {
      "version": "2.5.1",
      "resolved": "https://registry.npmjs.org/decimal.js-light/-/decimal.js-light-2.5.1.tgz",
      "integrity": "sha512-qIMFpTMZmny+MMIitAB6D7iVPEorVw6YQRWkvarTkT4tBeSLLiHzcwj6q0MmYSFCiVpiqPJTJEYIrpcPzVEIvg==",
      "license": "MIT"
    },
    "node_modules/detect-libc": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-2.1.2.tgz",
      "integrity": "sha512-Btj2BOOO83o3WyH59e8MgXsxEQVcarkUOpEYrubB0urwnN10yQ364rsiByU11nZlqWYZm05i/of7io4mzihBtQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/detect-node-es": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/detect-node-es/-/detect-node-es-1.1.0.tgz",
      "integrity": "sha512-ypdmJU/TbBby2Dxibuv7ZLW3Bs1QEmM7nHjEANfohJLvE0XVujisn1qPJcZxg+qDucsr+bP6fLD1rPS3AhJ7EQ==",
      "license": "MIT"
    },
    "node_modules/dnd-core": {
      "version": "16.0.1",
      "resolved": "https://registry.npmjs.org/dnd-core/-/dnd-core-16.0.1.tgz",
      "integrity": "sha512-HK294sl7tbw6F6IeuK16YSBUoorvHpY8RHO+9yFfaJyCDVb6n7PRcezrOEOa2SBCqiYpemh5Jx20ZcjKdFAVng==",
      "license": "MIT",
      "dependencies": {
        "@react-dnd/asap": "^5.0.1",
        "@react-dnd/invariant": "^4.0.1",
        "redux": "^4.2.0"
      }
    },
    "node_modules/dom-helpers": {
      "version": "5.2.1",
      "resolved": "https://registry.npmjs.org/dom-helpers/-/dom-helpers-5.2.1.tgz",
      "integrity": "sha512-nRCa7CK3VTrM2NmGkIy4cbK7IZlgBE/PYMn55rrXefr5xXDP0LdtfPnblFDoVdcAfslJ7or6iqAUnx0CCGIWQA==",
      "license": "MIT",
      "dependencies": {
        "@babel/runtime": "^7.8.7",
        "csstype": "^3.0.2"
      }
    },
    "node_modules/electron-to-chromium": {
      "version": "1.5.336",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.336.tgz",
      "integrity": "sha512-AbH9q9J455r/nLmdNZes0G0ZKcRX73FicwowalLs6ijwOmCJSRRrLX63lcAlzy9ux3dWK1w1+1nsBJEWN11hcQ==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/embla-carousel": {
      "version": "8.6.0",
      "resolved": "https://registry.npmjs.org/embla-carousel/-/embla-carousel-8.6.0.tgz",
      "integrity": "sha512-SjWyZBHJPbqxHOzckOfo8lHisEaJWmwd23XppYFYVh10bU66/Pn5tkVkbkCMZVdbUE5eTCI2nD8OyIP4Z+uwkA==",
      "license": "MIT"
    },
    "node_modules/embla-carousel-react": {
      "version": "8.6.0",
      "resolved": "https://registry.npmjs.org/embla-carousel-react/-/embla-carousel-react-8.6.0.tgz",
      "integrity": "sha512-0/PjqU7geVmo6F734pmPqpyHqiM99olvyecY7zdweCw+6tKEXnrE90pBiBbMMU8s5tICemzpQ3hi5EpxzGW+JA==",
      "license": "MIT",
      "dependencies": {
        "embla-carousel": "8.6.0",
        "embla-carousel-reactive-utils": "8.6.0"
      },
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.1 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc"
      }
    },
    "node_modules/embla-carousel-reactive-utils": {
      "version": "8.6.0",
      "resolved": "https://registry.npmjs.org/embla-carousel-reactive-utils/-/embla-carousel-reactive-utils-8.6.0.tgz",
      "integrity": "sha512-fMVUDUEx0/uIEDM0Mz3dHznDhfX+znCCDCeIophYb1QGVM7YThSWX+wz11zlYwWFOr74b4QLGg0hrGPJeG2s4A==",
      "license": "MIT",
      "peerDependencies": {
        "embla-carousel": "8.6.0"
      }
    },
    "node_modules/enhanced-resolve": {
      "version": "5.20.1",
      "resolved": "https://registry.npmjs.org/enhanced-resolve/-/enhanced-resolve-5.20.1.tgz",
      "integrity": "sha512-Qohcme7V1inbAfvjItgw0EaxVX5q2rdVEZHRBrEQdRZTssLDGsL8Lwrznl8oQ/6kuTJONLaDcGjkNP247XEhcA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "graceful-fs": "^4.2.4",
        "tapable": "^2.3.0"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/error-ex": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/error-ex/-/error-ex-1.3.4.tgz",
      "integrity": "sha512-sqQamAnR14VgCr1A618A3sGrygcpK+HEbenA/HiEAkkUwcZIIB/tgWqHFxWgOyDh4nB4JCRimh79dR5Ywc9MDQ==",
      "license": "MIT",
      "dependencies": {
        "is-arrayish": "^0.2.1"
      }
    },
    "node_modules/es-errors": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/es-errors/-/es-errors-1.3.0.tgz",
      "integrity": "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/esbuild": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/esbuild/-/esbuild-0.25.12.tgz",
      "integrity": "sha512-bbPBYYrtZbkt6Os6FiTLCTFxvq4tt3JKall1vRwshA3fdVztsLAatFaZobhkBC8/BrPetoa0oksYoKXoG4ryJg==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "bin": {
        "esbuild": "bin/esbuild"
      },
      "engines": {
        "node": ">=18"
      },
      "optionalDependencies": {
        "@esbuild/aix-ppc64": "0.25.12",
        "@esbuild/android-arm": "0.25.12",
        "@esbuild/android-arm64": "0.25.12",
        "@esbuild/android-x64": "0.25.12",
        "@esbuild/darwin-arm64": "0.25.12",
        "@esbuild/darwin-x64": "0.25.12",
        "@esbuild/freebsd-arm64": "0.25.12",
        "@esbuild/freebsd-x64": "0.25.12",
        "@esbuild/linux-arm": "0.25.12",
        "@esbuild/linux-arm64": "0.25.12",
        "@esbuild/linux-ia32": "0.25.12",
        "@esbuild/linux-loong64": "0.25.12",
        "@esbuild/linux-mips64el": "0.25.12",
        "@esbuild/linux-ppc64": "0.25.12",
        "@esbuild/linux-riscv64": "0.25.12",
        "@esbuild/linux-s390x": "0.25.12",
        "@esbuild/linux-x64": "0.25.12",
        "@esbuild/netbsd-arm64": "0.25.12",
        "@esbuild/netbsd-x64": "0.25.12",
        "@esbuild/openbsd-arm64": "0.25.12",
        "@esbuild/openbsd-x64": "0.25.12",
        "@esbuild/openharmony-arm64": "0.25.12",
        "@esbuild/sunos-x64": "0.25.12",
        "@esbuild/win32-arm64": "0.25.12",
        "@esbuild/win32-ia32": "0.25.12",
        "@esbuild/win32-x64": "0.25.12"
      }
    },
    "node_modules/escalade": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/escape-string-regexp": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-4.0.0.tgz",
      "integrity": "sha512-TtpcNJ3XAzx3Gq8sWRzJaVajRs0uVxA2YAkdb1jm2YkPz4G6egUFAyA3n5vtEIZefPk5Wa4UXbKuS5fKkJWdgA==",
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/eventemitter3": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/eventemitter3/-/eventemitter3-4.0.7.tgz",
      "integrity": "sha512-8guHBZCwKnFhYdHr2ysuRWErTwhoN2X8XELRlrRwpmfeY2jjuUN4taQMsULKUVo1K4DvZl+0pgfyoysHxvmvEw==",
      "license": "MIT"
    },
    "node_modules/fast-deep-equal": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-3.1.3.tgz",
      "integrity": "sha512-f3qQ9oQy9j2AhBe/H9VC91wLmKBCCU/gDOnKNAYG5hswO7BLKj09Hc5HYNz9cGI++xlpDCIgDaitVs03ATR84Q==",
      "license": "MIT"
    },
    "node_modules/fast-equals": {
      "version": "5.4.0",
      "resolved": "https://registry.npmjs.org/fast-equals/-/fast-equals-5.4.0.tgz",
      "integrity": "sha512-jt2DW/aNFNwke7AUd+Z+e6pz39KO5rzdbbFCg2sGafS4mk13MI7Z8O5z9cADNn5lhGODIgLwug6TZO2ctf7kcw==",
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/find-root": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/find-root/-/find-root-1.1.0.tgz",
      "integrity": "sha512-NKfW6bec6GfKc0SGx1e07QZY9PE99u0Bft/0rzSD5k3sO/vwkVUpDUKVm5Gpp5Ue3YfShPFTX2070tDs5kB9Ng==",
      "license": "MIT"
    },
    "node_modules/framer-motion": {
      "version": "12.38.0",
      "resolved": "https://registry.npmjs.org/framer-motion/-/framer-motion-12.38.0.tgz",
      "integrity": "sha512-rFYkY/pigbcswl1XQSb7q424kSTQ8q6eAC+YUsSKooHQYuLdzdHjrt6uxUC+PRAO++q5IS7+TamgIw1AphxR+g==",
      "license": "MIT",
      "dependencies": {
        "motion-dom": "^12.38.0",
        "motion-utils": "^12.36.0",
        "tslib": "^2.4.0"
      },
      "peerDependencies": {
        "@emotion/is-prop-valid": "*",
        "react": "^18.0.0 || ^19.0.0",
        "react-dom": "^18.0.0 || ^19.0.0"
      },
      "peerDependenciesMeta": {
        "@emotion/is-prop-valid": {
          "optional": true
        },
        "react": {
          "optional": true
        },
        "react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/function-bind": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",
      "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/gensync": {
      "version": "1.0.0-beta.2",
      "resolved": "https://registry.npmjs.org/gensync/-/gensync-1.0.0-beta.2.tgz",
      "integrity": "sha512-3hN7NaskYvMDLQY55gnW3NQ+mesEAepTqlg+VEbj7zzqEMBVNhzcGYYeqFo/TlYz6eQiFcp1HcsCZO+nGgS8zg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/get-nonce": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/get-nonce/-/get-nonce-1.0.1.tgz",
      "integrity": "sha512-FJhYRoDaiatfEkUK8HKlicmu/3SGFD51q3itKDGoSTysQJBnfOcxU5GxnhE1E6soB76MbT0MBtnKJuXyAx+96Q==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/graceful-fs": {
      "version": "4.2.11",
      "resolved": "https://registry.npmjs.org/graceful-fs/-/graceful-fs-4.2.11.tgz",
      "integrity": "sha512-RbJ5/jmFcNNCcDV5o9eTnBLJ/HszWV0P73bc+Ff4nS/rJj+YaS6IGyiOL0VoBYX+l1Wrl3k63h/KrH+nhJ0XvQ==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/hasown": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.2.tgz",
      "integrity": "sha512-0hJU9SCPvmMzIBdZFqNPXWa6dqh7WdH0cII9y+CyS8rG3nL48Bclra9HmKhVVUHyPWNH5Y7xDwAB7bfgSjkUMQ==",
      "license": "MIT",
      "dependencies": {
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/hoist-non-react-statics": {
      "version": "3.3.2",
      "resolved": "https://registry.npmjs.org/hoist-non-react-statics/-/hoist-non-react-statics-3.3.2.tgz",
      "integrity": "sha512-/gGivxi8JPKWNm/W0jSmzcMPpfpPLc3dY/6GxhX2hQ9iGj3aDfklV4ET7NjKpSinLpJ5vafa9iiGIEZg10SfBw==",
      "license": "BSD-3-Clause",
      "dependencies": {
        "react-is": "^16.7.0"
      }
    },
    "node_modules/hoist-non-react-statics/node_modules/react-is": {
      "version": "16.13.1",
      "resolved": "https://registry.npmjs.org/react-is/-/react-is-16.13.1.tgz",
      "integrity": "sha512-24e6ynE2H+OKt4kqsOvNd8kBpV65zoxbA4BVsEOB3ARVWQki/DHzaUoC5KuON/BiccDaCCTZBuOcfZs70kR8bQ==",
      "license": "MIT"
    },
    "node_modules/import-fresh": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/import-fresh/-/import-fresh-3.3.1.tgz",
      "integrity": "sha512-TR3KfrTZTYLPB6jUjfx6MF9WcWrHL9su5TObK4ZkYgBdWKPOFoSoQIdEuTuR82pmtxH2spWG9h6etwfr1pLBqQ==",
      "license": "MIT",
      "dependencies": {
        "parent-module": "^1.0.0",
        "resolve-from": "^4.0.0"
      },
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/input-otp": {
      "version": "1.4.2",
      "resolved": "https://registry.npmjs.org/input-otp/-/input-otp-1.4.2.tgz",
      "integrity": "sha512-l3jWwYNvrEa6NTCt7BECfCm48GvwuZzkoeG3gBL2w4CHeOXW3eKFmf9UNYkNfYc3mxMrthMnxjIE07MT0zLBQA==",
      "license": "MIT",
      "peerDependencies": {
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0.0 || ^19.0.0-rc"
      }
    },
    "node_modules/internmap": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/internmap/-/internmap-2.0.3.tgz",
      "integrity": "sha512-5Hh7Y1wQbvY5ooGgPbDaL5iYLAPzMTUrjMulskHLH6wnv/A+1q5rgEaiuqEjB+oxGXIVZs1FF+R/KPN3ZSQYYg==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/is-arrayish": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/is-arrayish/-/is-arrayish-0.2.1.tgz",
      "integrity": "sha512-zz06S8t0ozoDXMG+ube26zeCTNXcKIPJZJi8hBrF4idCLms4CG9QtK7qBl1boi5ODzFpjswb5JPmHCbMpjaYzg==",
      "license": "MIT"
    },
    "node_modules/is-core-module": {
      "version": "2.16.1",
      "resolved": "https://registry.npmjs.org/is-core-module/-/is-core-module-2.16.1.tgz",
      "integrity": "sha512-UfoeMA6fIJ8wTYFEUjelnaGI67v6+N7qXJEvQuIGa99l4xsCruSYOVSQ0uPANn4dAzm8lkYPaKLrrijLq7x23w==",
      "license": "MIT",
      "dependencies": {
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/jiti": {
      "version": "2.6.1",
      "resolved": "https://registry.npmjs.org/jiti/-/jiti-2.6.1.tgz",
      "integrity": "sha512-ekilCSN1jwRvIbgeg/57YFh8qQDNbwDb9xT/qu2DAHbFFZUicIl4ygVaAvzveMhMVr3LnpSKTNnwt8PoOfmKhQ==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jiti": "lib/jiti-cli.mjs"
      }
    },
    "node_modules/js-tokens": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
      "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==",
      "license": "MIT"
    },
    "node_modules/jsesc": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-3.1.0.tgz",
      "integrity": "sha512-/sM3dO2FOzXjKQhJuo0Q173wf2KOo8t4I8vHy6lF9poUp7bKT0/NHE8fPX23PwfhnykfqnC2xRxOnVw5XuGIaA==",
      "license": "MIT",
      "bin": {
        "jsesc": "bin/jsesc"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/json-parse-even-better-errors": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/json-parse-even-better-errors/-/json-parse-even-better-errors-2.3.1.tgz",
      "integrity": "sha512-xyFwyhro/JEof6Ghe2iz2NcXoj2sloNsWr/XsERDK/oiPCfaNhl5ONfp+jQdAZRQQ0IJWNzH9zIZF7li91kh2w==",
      "license": "MIT"
    },
    "node_modules/json2mq": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/json2mq/-/json2mq-0.2.0.tgz",
      "integrity": "sha512-SzoRg7ux5DWTII9J2qkrZrqV1gt+rTaoufMxEzXbS26Uid0NwaJd123HcoB80TgubEppxxIGdNxCx50fEoEWQA==",
      "license": "MIT",
      "dependencies": {
        "string-convert": "^0.2.0"
      }
    },
    "node_modules/json5": {
      "version": "2.2.3",
      "resolved": "https://registry.npmjs.org/json5/-/json5-2.2.3.tgz",
      "integrity": "sha512-XmOWe7eyHYH14cLdVPoyg+GOH3rYX++KpzrylJwSW98t3Nk+U8XOl8FWKOgwtzdb8lXGf6zYwDUzeHMWfxasyg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "json5": "lib/cli.js"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/lightningcss": {
      "version": "1.30.1",
      "resolved": "https://registry.npmjs.org/lightningcss/-/lightningcss-1.30.1.tgz",
      "integrity": "sha512-xi6IyHML+c9+Q3W0S4fCQJOym42pyurFiJUHEcEyHS0CeKzia4yZDEsLlqOFykxOdHpNy0NmvVO31vcSqAxJCg==",
      "dev": true,
      "license": "MPL-2.0",
      "dependencies": {
        "detect-libc": "^2.0.3"
      },
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      },
      "optionalDependencies": {
        "lightningcss-darwin-arm64": "1.30.1",
        "lightningcss-darwin-x64": "1.30.1",
        "lightningcss-freebsd-x64": "1.30.1",
        "lightningcss-linux-arm-gnueabihf": "1.30.1",
        "lightningcss-linux-arm64-gnu": "1.30.1",
        "lightningcss-linux-arm64-musl": "1.30.1",
        "lightningcss-linux-x64-gnu": "1.30.1",
        "lightningcss-linux-x64-musl": "1.30.1",
        "lightningcss-win32-arm64-msvc": "1.30.1",
        "lightningcss-win32-x64-msvc": "1.30.1"
      }
    },
    "node_modules/lightningcss-darwin-arm64": {
      "version": "1.30.1",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-arm64/-/lightningcss-darwin-arm64-1.30.1.tgz",
      "integrity": "sha512-c8JK7hyE65X1MHMN+Viq9n11RRC7hgin3HhYKhrMyaXflk5GVplZ60IxyoVtzILeKr+xAJwg6zK6sjTBJ0FKYQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-x64": {
      "version": "1.30.1",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-x64/-/lightningcss-darwin-x64-1.30.1.tgz",
      "integrity": "sha512-k1EvjakfumAQoTfcXUcHQZhSpLlkAuEkdMBsI/ivWw9hL+7FtilQc0Cy3hrx0AAQrVtQAbMI7YjCgYgvn37PzA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-freebsd-x64": {
      "version": "1.30.1",
      "resolved": "https://registry.npmjs.org/lightningcss-freebsd-x64/-/lightningcss-freebsd-x64-1.30.1.tgz",
      "integrity": "sha512-kmW6UGCGg2PcyUE59K5r0kWfKPAVy4SltVeut+umLCFoJ53RdCUWxcRDzO1eTaxf/7Q2H7LTquFHPL5R+Gjyig==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm-gnueabihf": {
      "version": "1.30.1",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm-gnueabihf/-/lightningcss-linux-arm-gnueabihf-1.30.1.tgz",
      "integrity": "sha512-MjxUShl1v8pit+6D/zSPq9S9dQ2NPFSQwGvxBCYaBYLPlCWuPh9/t1MRS8iUaR8i+a6w7aps+B4N0S1TYP/R+Q==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-gnu": {
      "version": "1.30.1",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-gnu/-/lightningcss-linux-arm64-gnu-1.30.1.tgz",
      "integrity": "sha512-gB72maP8rmrKsnKYy8XUuXi/4OctJiuQjcuqWNlJQ6jZiWqtPvqFziskH3hnajfvKB27ynbVCucKSm2rkQp4Bw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-musl": {
      "version": "1.30.1",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-musl/-/lightningcss-linux-arm64-musl-1.30.1.tgz",
      "integrity": "sha512-jmUQVx4331m6LIX+0wUhBbmMX7TCfjF5FoOH6SD1CttzuYlGNVpA7QnrmLxrsub43ClTINfGSYyHe2HWeLl5CQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-gnu": {
      "version": "1.30.1",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-gnu/-/lightningcss-linux-x64-gnu-1.30.1.tgz",
      "integrity": "sha512-piWx3z4wN8J8z3+O5kO74+yr6ze/dKmPnI7vLqfSqI8bccaTGY5xiSGVIJBDd5K5BHlvVLpUB3S2YCfelyJ1bw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-musl": {
      "version": "1.30.1",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-musl/-/lightningcss-linux-x64-musl-1.30.1.tgz",
      "integrity": "sha512-rRomAK7eIkL+tHY0YPxbc5Dra2gXlI63HL+v1Pdi1a3sC+tJTcFrHX+E86sulgAXeI7rSzDYhPSeHHjqFhqfeQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-arm64-msvc": {
      "version": "1.30.1",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-arm64-msvc/-/lightningcss-win32-arm64-msvc-1.30.1.tgz",
      "integrity": "sha512-mSL4rqPi4iXq5YVqzSsJgMVFENoa4nGTT/GjO2c0Yl9OuQfPsIfncvLrEW6RbbB24WtZ3xP/2CCmI3tNkNV4oA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-x64-msvc": {
      "version": "1.30.1",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-x64-msvc/-/lightningcss-win32-x64-msvc-1.30.1.tgz",
      "integrity": "sha512-PVqXh48wh4T53F/1CCu8PIPCxLzWyCnn/9T5W1Jpmdy5h9Cwd+0YQS6/LwhHXSafuc61/xg9Lv5OrCby6a++jg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lines-and-columns": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/lines-and-columns/-/lines-and-columns-1.2.4.tgz",
      "integrity": "sha512-7ylylesZQ/PV29jhEDl3Ufjo6ZX7gCqJr5F7PKrqc93v7fzSymt1BpwEU8nAUXs8qzzvqhbjhK5QZg6Mt/HkBg==",
      "license": "MIT"
    },
    "node_modules/lodash": {
      "version": "4.18.1",
      "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.18.1.tgz",
      "integrity": "sha512-dMInicTPVE8d1e5otfwmmjlxkZoUpiVLwyeTdUsi/Caj/gfzzblBcCE5sRHV/AsjuCmxWrte2TNGSYuCeCq+0Q==",
      "license": "MIT"
    },
    "node_modules/lodash.debounce": {
      "version": "4.0.8",
      "resolved": "https://registry.npmjs.org/lodash.debounce/-/lodash.debounce-4.0.8.tgz",
      "integrity": "sha512-FT1yDzDYEoYWhnSGnpE/4Kj1fLZkDFyqRb7fNt6FdYOSxlUWAtp42Eh6Wb0rGIv/m9Bgo7x4GhQbm5Ys4SG5ow==",
      "license": "MIT"
    },
    "node_modules/loose-envify": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/loose-envify/-/loose-envify-1.4.0.tgz",
      "integrity": "sha512-lyuxPGr/Wfhrlem2CL/UcnUc1zcqKAImBDzukY7Y5F/yQiNdko6+fRLevlw1HgMySw7f611UIY408EtxRSoK3Q==",
      "license": "MIT",
      "dependencies": {
        "js-tokens": "^3.0.0 || ^4.0.0"
      },
      "bin": {
        "loose-envify": "cli.js"
      }
    },
    "node_modules/lru-cache": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz",
      "integrity": "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "yallist": "^3.0.2"
      }
    },
    "node_modules/lucide-react": {
      "version": "0.487.0",
      "resolved": "https://registry.npmjs.org/lucide-react/-/lucide-react-0.487.0.tgz",
      "integrity": "sha512-aKqhOQ+YmFnwq8dWgGjOuLc8V1R9/c/yOd+zDY4+ohsR2Jo05lSGc3WsstYPIzcTpeosN7LoCkLReUUITvaIvw==",
      "license": "ISC",
      "peerDependencies": {
        "react": "^16.5.1 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/magic-string": {
      "version": "0.30.21",
      "resolved": "https://registry.npmjs.org/magic-string/-/magic-string-0.30.21.tgz",
      "integrity": "sha512-vd2F4YUyEXKGcLHoq+TEyCjxueSeHnFxyyjNp80yg0XV4vUhnDer/lvvlqM/arB5bXQN5K2/3oinyCRyx8T2CQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.5"
      }
    },
    "node_modules/minipass": {
      "version": "7.1.3",
      "resolved": "https://registry.npmjs.org/minipass/-/minipass-7.1.3.tgz",
      "integrity": "sha512-tEBHqDnIoM/1rXME1zgka9g6Q2lcoCkxHLuc7ODJ5BxbP5d4c2Z5cGgtXAku59200Cx7diuHTOYfSBD8n6mm8A==",
      "dev": true,
      "license": "BlueOak-1.0.0",
      "engines": {
        "node": ">=16 || 14 >=14.17"
      }
    },
    "node_modules/minizlib": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/minizlib/-/minizlib-3.1.0.tgz",
      "integrity": "sha512-KZxYo1BUkWD2TVFLr0MQoM8vUUigWD3LlD83a/75BqC+4qE0Hb1Vo5v1FgcfaNXvfXzr+5EhQ6ing/CaBijTlw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "minipass": "^7.1.2"
      },
      "engines": {
        "node": ">= 18"
      }
    },
    "node_modules/motion": {
      "version": "12.23.24",
      "resolved": "https://registry.npmjs.org/motion/-/motion-12.23.24.tgz",
      "integrity": "sha512-Rc5E7oe2YZ72N//S3QXGzbnXgqNrTESv8KKxABR20q2FLch9gHLo0JLyYo2hZ238bZ9Gx6cWhj9VO0IgwbMjCw==",
      "license": "MIT",
      "dependencies": {
        "framer-motion": "^12.23.24",
        "tslib": "^2.4.0"
      },
      "peerDependencies": {
        "@emotion/is-prop-valid": "*",
        "react": "^18.0.0 || ^19.0.0",
        "react-dom": "^18.0.0 || ^19.0.0"
      },
      "peerDependenciesMeta": {
        "@emotion/is-prop-valid": {
          "optional": true
        },
        "react": {
          "optional": true
        },
        "react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/motion-dom": {
      "version": "12.38.0",
      "resolved": "https://registry.npmjs.org/motion-dom/-/motion-dom-12.38.0.tgz",
      "integrity": "sha512-pdkHLD8QYRp8VfiNLb8xIBJis1byQ9gPT3Jnh2jqfFtAsWUA3dEepDlsWe/xMpO8McV+VdpKVcp+E+TGJEtOoA==",
      "license": "MIT",
      "dependencies": {
        "motion-utils": "^12.36.0"
      }
    },
    "node_modules/motion-utils": {
      "version": "12.36.0",
      "resolved": "https://registry.npmjs.org/motion-utils/-/motion-utils-12.36.0.tgz",
      "integrity": "sha512-eHWisygbiwVvf6PZ1vhaHCLamvkSbPIeAYxWUuL3a2PD/TROgE7FvfHWTIH4vMl798QLfMw15nRqIaRDXTlYRg==",
      "license": "MIT"
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "license": "MIT"
    },
    "node_modules/nanoid": {
      "version": "3.3.11",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.11.tgz",
      "integrity": "sha512-N8SpfPUnUp1bK+PMYW8qSWdl9U+wwNWI4QKxOYDy9JAro3WMX7p2OeVRF9v+347pnakNevPmiHhNmZ2HbFA76w==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/next-themes": {
      "version": "0.4.6",
      "resolved": "https://registry.npmjs.org/next-themes/-/next-themes-0.4.6.tgz",
      "integrity": "sha512-pZvgD5L0IEvX5/9GWyHMf3m8BKiVQwsCMHfoFosXtXBMnaS0ZnIJ9ST4b4NqLVKDEm8QBxoNNGNaBv2JNF6XNA==",
      "license": "MIT",
      "peerDependencies": {
        "react": "^16.8 || ^17 || ^18 || ^19 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17 || ^18 || ^19 || ^19.0.0-rc"
      }
    },
    "node_modules/node-releases": {
      "version": "2.0.37",
      "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.37.tgz",
      "integrity": "sha512-1h5gKZCF+pO/o3Iqt5Jp7wc9rH3eJJ0+nh/CIoiRwjRxde/hAHyLPXYN4V3CqKAbiZPSeJFSWHmJsbkicta0Eg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/object-assign": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
      "integrity": "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/parent-module": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/parent-module/-/parent-module-1.0.1.tgz",
      "integrity": "sha512-GQ2EWRpQV8/o+Aw8YqtfZZPfNRWZYkbidE9k5rpl/hC3vtHHBfGm2Ifi6qWV+coDGkrUKZAxE3Lot5kcsRlh+g==",
      "license": "MIT",
      "dependencies": {
        "callsites": "^3.0.0"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/parse-json": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/parse-json/-/parse-json-5.2.0.tgz",
      "integrity": "sha512-ayCKvm/phCGxOkYRSCM82iDwct8/EonSEgCSxWxD7ve6jHggsFl4fZVQBPRNgQoKiuV/odhFrGzQXZwbifC8Rg==",
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.0.0",
        "error-ex": "^1.3.1",
        "json-parse-even-better-errors": "^2.3.0",
        "lines-and-columns": "^1.1.6"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/path-parse": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.7.tgz",
      "integrity": "sha512-LDJzPVEEEPR+y48z93A0Ed0yXb8pAByGWo/k5YYdYgpY2/2EsOsksJrq7lOHxryrVOn1ejG6oAp8ahvOIQD8sw==",
      "license": "MIT"
    },
    "node_modules/path-type": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/path-type/-/path-type-4.0.0.tgz",
      "integrity": "sha512-gDKb8aZMDeD/tZWs9P6+q0J9Mwkdl6xMV8TjnGP3qJVJ06bdMgkbBlLU8IdfOsIsFz2BW1rNVT3XuNEl8zPAvw==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "license": "ISC"
    },
    "node_modules/picomatch": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.4.tgz",
      "integrity": "sha512-QP88BAKvMam/3NxH6vj2o21R6MjxZUAd6nlwAS/pnGvN9IVLocLHxGYIzFhg6fUQ+5th6P4dv4eW9jX3DSIj7A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/postcss": {
      "version": "8.5.9",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.9.tgz",
      "integrity": "sha512-7a70Nsot+EMX9fFU3064K/kdHWZqGVY+BADLyXc8Dfv+mTLLVl6JzJpPaCZ2kQL9gIJvKXSLMHhqdRRjwQeFtw==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.11",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.1"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/prop-types": {
      "version": "15.8.1",
      "resolved": "https://registry.npmjs.org/prop-types/-/prop-types-15.8.1.tgz",
      "integrity": "sha512-oj87CgZICdulUohogVAR7AjlC0327U4el4L6eAvOqCeudMDVU0NThNaV+b9Df4dXgSP1gXMTnPdhfe/2qDH5cg==",
      "license": "MIT",
      "dependencies": {
        "loose-envify": "^1.4.0",
        "object-assign": "^4.1.1",
        "react-is": "^16.13.1"
      }
    },
    "node_modules/prop-types/node_modules/react-is": {
      "version": "16.13.1",
      "resolved": "https://registry.npmjs.org/react-is/-/react-is-16.13.1.tgz",
      "integrity": "sha512-24e6ynE2H+OKt4kqsOvNd8kBpV65zoxbA4BVsEOB3ARVWQki/DHzaUoC5KuON/BiccDaCCTZBuOcfZs70kR8bQ==",
      "license": "MIT"
    },
    "node_modules/react": {
      "version": "18.3.1",
      "resolved": "https://registry.npmjs.org/react/-/react-18.3.1.tgz",
      "integrity": "sha512-wS+hAgJShR0KhEvPJArfuPVN1+Hz1t0Y6n5jLrGQbkb4urgPE/0Rve+1kMB1v/oWgHgm4WIcV+i7F2pTVj+2iQ==",
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "loose-envify": "^1.1.0"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-day-picker": {
      "version": "8.10.1",
      "resolved": "https://registry.npmjs.org/react-day-picker/-/react-day-picker-8.10.1.tgz",
      "integrity": "sha512-TMx7fNbhLk15eqcMt+7Z7S2KF7mfTId/XJDjKE8f+IUcFn0l08/kI4FiYTL/0yuOLmEcbR4Fwe3GJf/NiiMnPA==",
      "license": "MIT",
      "funding": {
        "type": "individual",
        "url": "https://github.com/sponsors/gpbl"
      },
      "peerDependencies": {
        "date-fns": "^2.28.0 || ^3.0.0",
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0"
      }
    },
    "node_modules/react-dnd": {
      "version": "16.0.1",
      "resolved": "https://registry.npmjs.org/react-dnd/-/react-dnd-16.0.1.tgz",
      "integrity": "sha512-QeoM/i73HHu2XF9aKksIUuamHPDvRglEwdHL4jsp784BgUuWcg6mzfxT0QDdQz8Wj0qyRKx2eMg8iZtWvU4E2Q==",
      "license": "MIT",
      "dependencies": {
        "@react-dnd/invariant": "^4.0.1",
        "@react-dnd/shallowequal": "^4.0.1",
        "dnd-core": "^16.0.1",
        "fast-deep-equal": "^3.1.3",
        "hoist-non-react-statics": "^3.3.2"
      },
      "peerDependencies": {
        "@types/hoist-non-react-statics": ">= 3.3.1",
        "@types/node": ">= 12",
        "@types/react": ">= 16",
        "react": ">= 16.14"
      },
      "peerDependenciesMeta": {
        "@types/hoist-non-react-statics": {
          "optional": true
        },
        "@types/node": {
          "optional": true
        },
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/react-dnd-html5-backend": {
      "version": "16.0.1",
      "resolved": "https://registry.npmjs.org/react-dnd-html5-backend/-/react-dnd-html5-backend-16.0.1.tgz",
      "integrity": "sha512-Wu3dw5aDJmOGw8WjH1I1/yTH+vlXEL4vmjk5p+MHxP8HuHJS1lAGeIdG/hze1AvNeXWo/JgULV87LyQOr+r5jw==",
      "license": "MIT",
      "dependencies": {
        "dnd-core": "^16.0.1"
      }
    },
    "node_modules/react-dom": {
      "version": "18.3.1",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-18.3.1.tgz",
      "integrity": "sha512-5m4nQKp+rZRb09LNH59GM4BxTh9251/ylbKIbpe7TpGxfJ+9kv6BLkLBXIjjspbgbnIBNqlI23tRnTWT0snUIw==",
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "loose-envify": "^1.1.0",
        "scheduler": "^0.23.2"
      },
      "peerDependencies": {
        "react": "^18.3.1"
      }
    },
    "node_modules/react-fast-compare": {
      "version": "3.2.2",
      "resolved": "https://registry.npmjs.org/react-fast-compare/-/react-fast-compare-3.2.2.tgz",
      "integrity": "sha512-nsO+KSNgo1SbJqJEYRE9ERzo7YtYbou/OqjSQKxV7jcKox7+usiUVZOAC+XnDOABXggQTno0Y1CpVnuWEc1boQ==",
      "license": "MIT"
    },
    "node_modules/react-hook-form": {
      "version": "7.55.0",
      "resolved": "https://registry.npmjs.org/react-hook-form/-/react-hook-form-7.55.0.tgz",
      "integrity": "sha512-XRnjsH3GVMQz1moZTW53MxfoWN7aDpUg/GpVNc4A3eXRVNdGXfbzJ4vM4aLQ8g6XCUh1nIbx70aaNCl7kxnjog==",
      "license": "MIT",
      "engines": {
        "node": ">=18.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/react-hook-form"
      },
      "peerDependencies": {
        "react": "^16.8.0 || ^17 || ^18 || ^19"
      }
    },
    "node_modules/react-is": {
      "version": "19.2.5",
      "resolved": "https://registry.npmjs.org/react-is/-/react-is-19.2.5.tgz",
      "integrity": "sha512-Dn0t8IQhCmeIT3wu+Apm1/YVsJXsGWi6k4sPdnBIdqMVtHtv0IGi6dcpNpNkNac0zB2uUAqNX3MHzN8c+z2rwQ==",
      "license": "MIT"
    },
    "node_modules/react-popper": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/react-popper/-/react-popper-2.3.0.tgz",
      "integrity": "sha512-e1hj8lL3uM+sgSR4Lxzn5h1GxBlpa4CQz0XLF8kx4MDrDRWY0Ena4c97PUeSX9i5W3UAfDP0z0FXCTQkoXUl3Q==",
      "license": "MIT",
      "dependencies": {
        "react-fast-compare": "^3.0.1",
        "warning": "^4.0.2"
      },
      "peerDependencies": {
        "@popperjs/core": "^2.0.0",
        "react": "^16.8.0 || ^17 || ^18",
        "react-dom": "^16.8.0 || ^17 || ^18"
      }
    },
    "node_modules/react-refresh": {
      "version": "0.17.0",
      "resolved": "https://registry.npmjs.org/react-refresh/-/react-refresh-0.17.0.tgz",
      "integrity": "sha512-z6F7K9bV85EfseRCp2bzrpyQ0Gkw1uLoCel9XBVWPg/TjRj94SkJzUTGfOa4bs7iJvBWtQG0Wq7wnI0syw3EBQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-remove-scroll": {
      "version": "2.7.2",
      "resolved": "https://registry.npmjs.org/react-remove-scroll/-/react-remove-scroll-2.7.2.tgz",
      "integrity": "sha512-Iqb9NjCCTt6Hf+vOdNIZGdTiH1QSqr27H/Ek9sv/a97gfueI/5h1s3yRi1nngzMUaOOToin5dI1dXKdXiF+u0Q==",
      "license": "MIT",
      "dependencies": {
        "react-remove-scroll-bar": "^2.3.7",
        "react-style-singleton": "^2.2.3",
        "tslib": "^2.1.0",
        "use-callback-ref": "^1.3.3",
        "use-sidecar": "^1.1.3"
      },
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/react-remove-scroll-bar": {
      "version": "2.3.8",
      "resolved": "https://registry.npmjs.org/react-remove-scroll-bar/-/react-remove-scroll-bar-2.3.8.tgz",
      "integrity": "sha512-9r+yi9+mgU33AKcj6IbT9oRCO78WriSj6t/cF8DWBZJ9aOGPOTEDvdUDz1FwKim7QXWwmHqtdHnRJfhAxEG46Q==",
      "license": "MIT",
      "dependencies": {
        "react-style-singleton": "^2.2.2",
        "tslib": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/react-resizable-panels": {
      "version": "2.1.7",
      "resolved": "https://registry.npmjs.org/react-resizable-panels/-/react-resizable-panels-2.1.7.tgz",
      "integrity": "sha512-JtT6gI+nURzhMYQYsx8DKkx6bSoOGFp7A3CwMrOb8y5jFHFyqwo9m68UhmXRw57fRVJksFn1TSlm3ywEQ9vMgA==",
      "license": "MIT",
      "peerDependencies": {
        "react": "^16.14.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc",
        "react-dom": "^16.14.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc"
      }
    },
    "node_modules/react-responsive-masonry": {
      "version": "2.7.1",
      "resolved": "https://registry.npmjs.org/react-responsive-masonry/-/react-responsive-masonry-2.7.1.tgz",
      "integrity": "sha512-Q+u+nOH87PzjqGFd2PgTcmLpHPZnCmUPREHYoNBc8dwJv6fi51p9U6hqwG8g/T8MN86HrFjrU+uQU6yvETU7cA==",
      "license": "MIT"
    },
    "node_modules/react-router": {
      "version": "7.13.0",
      "resolved": "https://registry.npmjs.org/react-router/-/react-router-7.13.0.tgz",
      "integrity": "sha512-PZgus8ETambRT17BUm/LL8lX3Of+oiLaPuVTRH3l1eLvSPpKO3AvhAEb5N7ihAFZQrYDqkvvWfFh9p0z9VsjLw==",
      "license": "MIT",
      "dependencies": {
        "cookie": "^1.0.1",
        "set-cookie-parser": "^2.6.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "react": ">=18",
        "react-dom": ">=18"
      },
      "peerDependenciesMeta": {
        "react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/react-slick": {
      "version": "0.31.0",
      "resolved": "https://registry.npmjs.org/react-slick/-/react-slick-0.31.0.tgz",
      "integrity": "sha512-zo6VLT8wuSBJffg/TFPbzrw2dEnfZ/cUKmYsKByh3AgatRv29m2LoFbq5vRMa3R3A4wp4d8gwbJKO2fWZFaI3g==",
      "license": "MIT",
      "dependencies": {
        "classnames": "^2.2.5",
        "json2mq": "^0.2.0",
        "lodash.debounce": "^4.0.8",
        "resize-observer-polyfill": "^1.5.0"
      },
      "peerDependencies": {
        "react": "^0.14.0 || ^15.0.1 || ^16.0.0 || ^17.0.0 || ^18.0.0 || ^19.0.0",
        "react-dom": "^0.14.0 || ^15.0.1 || ^16.0.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/react-smooth": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/react-smooth/-/react-smooth-4.0.4.tgz",
      "integrity": "sha512-gnGKTpYwqL0Iii09gHobNolvX4Kiq4PKx6eWBCYYix+8cdw+cGo3do906l1NBPKkSWx1DghC1dlWG9L2uGd61Q==",
      "license": "MIT",
      "dependencies": {
        "fast-equals": "^5.0.1",
        "prop-types": "^15.8.1",
        "react-transition-group": "^4.4.5"
      },
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0",
        "react-dom": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/react-style-singleton": {
      "version": "2.2.3",
      "resolved": "https://registry.npmjs.org/react-style-singleton/-/react-style-singleton-2.2.3.tgz",
      "integrity": "sha512-b6jSvxvVnyptAiLjbkWLE/lOnR4lfTtDAl+eUC7RZy+QQWc6wRzIV2CE6xBuMmDxc2qIihtDCZD5NPOFl7fRBQ==",
      "license": "MIT",
      "dependencies": {
        "get-nonce": "^1.0.0",
        "tslib": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/react-transition-group": {
      "version": "4.4.5",
      "resolved": "https://registry.npmjs.org/react-transition-group/-/react-transition-group-4.4.5.tgz",
      "integrity": "sha512-pZcd1MCJoiKiBR2NRxeCRg13uCXbydPnmB4EOeRrY7480qNWO8IIgQG6zlDkm6uRMsURXPuKq0GWtiM59a5Q6g==",
      "license": "BSD-3-Clause",
      "dependencies": {
        "@babel/runtime": "^7.5.5",
        "dom-helpers": "^5.0.1",
        "loose-envify": "^1.4.0",
        "prop-types": "^15.6.2"
      },
      "peerDependencies": {
        "react": ">=16.6.0",
        "react-dom": ">=16.6.0"
      }
    },
    "node_modules/recharts": {
      "version": "2.15.2",
      "resolved": "https://registry.npmjs.org/recharts/-/recharts-2.15.2.tgz",
      "integrity": "sha512-xv9lVztv3ingk7V3Jf05wfAZbM9Q2umJzu5t/cfnAK7LUslNrGT7LPBr74G+ok8kSCeFMaePmWMg0rcYOnczTw==",
      "license": "MIT",
      "dependencies": {
        "clsx": "^2.0.0",
        "eventemitter3": "^4.0.1",
        "lodash": "^4.17.21",
        "react-is": "^18.3.1",
        "react-smooth": "^4.0.4",
        "recharts-scale": "^0.4.4",
        "tiny-invariant": "^1.3.1",
        "victory-vendor": "^36.6.8"
      },
      "engines": {
        "node": ">=14"
      },
      "peerDependencies": {
        "react": "^16.0.0 || ^17.0.0 || ^18.0.0 || ^19.0.0",
        "react-dom": "^16.0.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/recharts-scale": {
      "version": "0.4.5",
      "resolved": "https://registry.npmjs.org/recharts-scale/-/recharts-scale-0.4.5.tgz",
      "integrity": "sha512-kivNFO+0OcUNu7jQquLXAxz1FIwZj8nrj+YkOKc5694NbjCvcT6aSZiIzNzd2Kul4o4rTto8QVR9lMNtxD4G1w==",
      "license": "MIT",
      "dependencies": {
        "decimal.js-light": "^2.4.1"
      }
    },
    "node_modules/recharts/node_modules/react-is": {
      "version": "18.3.1",
      "resolved": "https://registry.npmjs.org/react-is/-/react-is-18.3.1.tgz",
      "integrity": "sha512-/LLMVyas0ljjAtoYiPqYiL8VWXzUUdThrmU5+n20DZv+a+ClRoevUzw5JxU+Ieh5/c87ytoTBV9G1FiKfNJdmg==",
      "license": "MIT"
    },
    "node_modules/redux": {
      "version": "4.2.1",
      "resolved": "https://registry.npmjs.org/redux/-/redux-4.2.1.tgz",
      "integrity": "sha512-LAUYz4lc+Do8/g7aeRa8JkyDErK6ekstQaqWQrNRW//MY1TvCEpMtpTWvlQ+FPbWCx+Xixu/6SHt5N0HR+SB4w==",
      "license": "MIT",
      "dependencies": {
        "@babel/runtime": "^7.9.2"
      }
    },
    "node_modules/resize-observer-polyfill": {
      "version": "1.5.1",
      "resolved": "https://registry.npmjs.org/resize-observer-polyfill/-/resize-observer-polyfill-1.5.1.tgz",
      "integrity": "sha512-LwZrotdHOo12nQuZlHEmtuXdqGoOD0OhaxopaNFxWzInpEgaLWoVuAMbTzixuosCx2nEG58ngzW3vxdWoxIgdg==",
      "license": "MIT"
    },
    "node_modules/resolve": {
      "version": "1.22.12",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.12.tgz",
      "integrity": "sha512-TyeJ1zif53BPfHootBGwPRYT1RUt6oGWsaQr8UyZW/eAm9bKoijtvruSDEmZHm92CwS9nj7/fWttqPCgzep8CA==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "is-core-module": "^2.16.1",
        "path-parse": "^1.0.7",
        "supports-preserve-symlinks-flag": "^1.0.0"
      },
      "bin": {
        "resolve": "bin/resolve"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/resolve-from": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-4.0.0.tgz",
      "integrity": "sha512-pb/MYmXstAkysRFx8piNI1tGFNQIFA3vkE3Gq4EuA1dF6gHp/+vgZqsCGJapvy8N3Q+4o7FwvquPJcnZ7RYy4g==",
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/rollup": {
      "version": "4.60.1",
      "resolved": "https://registry.npmjs.org/rollup/-/rollup-4.60.1.tgz",
      "integrity": "sha512-VmtB2rFU/GroZ4oL8+ZqXgSA38O6GR8KSIvWmEFv63pQ0G6KaBH9s07PO8XTXP4vI+3UJUEypOfjkGfmSBBR0w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/estree": "1.0.8"
      },
      "bin": {
        "rollup": "dist/bin/rollup"
      },
      "engines": {
        "node": ">=18.0.0",
        "npm": ">=8.0.0"
      },
      "optionalDependencies": {
        "@rollup/rollup-android-arm-eabi": "4.60.1",
        "@rollup/rollup-android-arm64": "4.60.1",
        "@rollup/rollup-darwin-arm64": "4.60.1",
        "@rollup/rollup-darwin-x64": "4.60.1",
        "@rollup/rollup-freebsd-arm64": "4.60.1",
        "@rollup/rollup-freebsd-x64": "4.60.1",
        "@rollup/rollup-linux-arm-gnueabihf": "4.60.1",
        "@rollup/rollup-linux-arm-musleabihf": "4.60.1",
        "@rollup/rollup-linux-arm64-gnu": "4.60.1",
        "@rollup/rollup-linux-arm64-musl": "4.60.1",
        "@rollup/rollup-linux-loong64-gnu": "4.60.1",
        "@rollup/rollup-linux-loong64-musl": "4.60.1",
        "@rollup/rollup-linux-ppc64-gnu": "4.60.1",
        "@rollup/rollup-linux-ppc64-musl": "4.60.1",
        "@rollup/rollup-linux-riscv64-gnu": "4.60.1",
        "@rollup/rollup-linux-riscv64-musl": "4.60.1",
        "@rollup/rollup-linux-s390x-gnu": "4.60.1",
        "@rollup/rollup-linux-x64-gnu": "4.60.1",
        "@rollup/rollup-linux-x64-musl": "4.60.1",
        "@rollup/rollup-openbsd-x64": "4.60.1",
        "@rollup/rollup-openharmony-arm64": "4.60.1",
        "@rollup/rollup-win32-arm64-msvc": "4.60.1",
        "@rollup/rollup-win32-ia32-msvc": "4.60.1",
        "@rollup/rollup-win32-x64-gnu": "4.60.1",
        "@rollup/rollup-win32-x64-msvc": "4.60.1",
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/scheduler": {
      "version": "0.23.2",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.23.2.tgz",
      "integrity": "sha512-UOShsPwz7NrMUqhR6t0hWjFduvOzbtv7toDH1/hIrfRNIDBnnBWd0CwJTGvTpngVlmwGCdP9/Zl/tVrDqcuYzQ==",
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "loose-envify": "^1.1.0"
      }
    },
    "node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/set-cookie-parser": {
      "version": "2.7.2",
      "resolved": "https://registry.npmjs.org/set-cookie-parser/-/set-cookie-parser-2.7.2.tgz",
      "integrity": "sha512-oeM1lpU/UvhTxw+g3cIfxXHyJRc/uidd3yK1P242gzHds0udQBYzs3y8j4gCCW+ZJ7ad0yctld8RYO+bdurlvw==",
      "license": "MIT"
    },
    "node_modules/sonner": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/sonner/-/sonner-2.0.3.tgz",
      "integrity": "sha512-njQ4Hht92m0sMqqHVDL32V2Oun9W1+PHO9NDv9FHfJjT3JT22IG4Jpo3FPQy+mouRKCXFWO+r67v6MrHX2zeIA==",
      "license": "MIT",
      "peerDependencies": {
        "react": "^18.0.0 || ^19.0.0 || ^19.0.0-rc",
        "react-dom": "^18.0.0 || ^19.0.0 || ^19.0.0-rc"
      }
    },
    "node_modules/source-map": {
      "version": "0.5.7",
      "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.5.7.tgz",
      "integrity": "sha512-LbrmJOMUSdEVxIKvdcJzQC+nQhe8FUZQTXQy6+I75skNgn3OoQ0DZA8YnFa7gp8tqtL3KPf1kmo0R5DoApeSGQ==",
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/source-map-js": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.1.tgz",
      "integrity": "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==",
      "dev": true,
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/string-convert": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/string-convert/-/string-convert-0.2.1.tgz",
      "integrity": "sha512-u/1tdPl4yQnPBjnVrmdLo9gtuLvELKsAoRapekWggdiQNvvvum+jYF329d84NAa660KQw7pB2n36KrIKVoXa3A==",
      "license": "MIT"
    },
    "node_modules/stylis": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/stylis/-/stylis-4.2.0.tgz",
      "integrity": "sha512-Orov6g6BB1sDfYgzWfTHDOxamtX1bE/zo104Dh9e6fqJ3PooipYyfJ0pUmrZO2wAvO8YbEyeFrkV91XTsGMSrw==",
      "license": "MIT"
    },
    "node_modules/supports-preserve-symlinks-flag": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/supports-preserve-symlinks-flag/-/supports-preserve-symlinks-flag-1.0.0.tgz",
      "integrity": "sha512-ot0WnXS9fgdkgIcePe6RHNk1WA8+muPa6cSjeR3V8K27q9BB1rTE3R1p7Hv0z1ZyAc8s6Vvv8DIyWf681MAt0w==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/tailwind-merge": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/tailwind-merge/-/tailwind-merge-3.2.0.tgz",
      "integrity": "sha512-FQT/OVqCD+7edmmJpsgCsY820RTD5AkBryuG5IUqR5YQZSdj5xlH5nLgH7YPths7WsLPSpSBNneJdM8aS8aeFA==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/dcastil"
      }
    },
    "node_modules/tailwindcss": {
      "version": "4.1.12",
      "resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-4.1.12.tgz",
      "integrity": "sha512-DzFtxOi+7NsFf7DBtI3BJsynR+0Yp6etH+nRPTbpWnS2pZBaSksv/JGctNwSWzbFjp0vxSqknaUylseZqMDGrA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/tapable": {
      "version": "2.3.2",
      "resolved": "https://registry.npmjs.org/tapable/-/tapable-2.3.2.tgz",
      "integrity": "sha512-1MOpMXuhGzGL5TTCZFItxCc0AARf1EZFQkGqMm7ERKj8+Hgr5oLvJOVFcC+lRmR8hCe2S3jC4T5D7Vg/d7/fhA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/webpack"
      }
    },
    "node_modules/tar": {
      "version": "7.5.13",
      "resolved": "https://registry.npmjs.org/tar/-/tar-7.5.13.tgz",
      "integrity": "sha512-tOG/7GyXpFevhXVh8jOPJrmtRpOTsYqUIkVdVooZYJS/z8WhfQUX8RJILmeuJNinGAMSu1veBr4asSHFt5/hng==",
      "dev": true,
      "license": "BlueOak-1.0.0",
      "dependencies": {
        "@isaacs/fs-minipass": "^4.0.0",
        "chownr": "^3.0.0",
        "minipass": "^7.1.2",
        "minizlib": "^3.1.0",
        "yallist": "^5.0.0"
      },
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/tar/node_modules/yallist": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-5.0.0.tgz",
      "integrity": "sha512-YgvUTfwqyc7UXVMrB+SImsVYSmTS8X/tSrtdNZMImM+n7+QTriRXyXim0mBrTXNeqzVF0KWGgHPeiyViFFrNDw==",
      "dev": true,
      "license": "BlueOak-1.0.0",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/tiny-invariant": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/tiny-invariant/-/tiny-invariant-1.3.3.tgz",
      "integrity": "sha512-+FbBPE1o9QAYvviau/qC5SE3caw21q3xkvWKBtja5vgqOWIHHJ3ioaq1VPfn/Szqctz2bU/oYeKd9/z5BL+PVg==",
      "license": "MIT"
    },
    "node_modules/tinyglobby": {
      "version": "0.2.16",
      "resolved": "https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.16.tgz",
      "integrity": "sha512-pn99VhoACYR8nFHhxqix+uvsbXineAasWm5ojXoN8xEwK5Kd3/TrhNn1wByuD52UxWRLy8pu+kRMniEi6Eq9Zg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fdir": "^6.5.0",
        "picomatch": "^4.0.4"
      },
      "engines": {
        "node": ">=12.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/SuperchupuDev"
      }
    },
    "node_modules/tslib": {
      "version": "2.8.1",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz",
      "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
      "license": "0BSD"
    },
    "node_modules/tw-animate-css": {
      "version": "1.3.8",
      "resolved": "https://registry.npmjs.org/tw-animate-css/-/tw-animate-css-1.3.8.tgz",
      "integrity": "sha512-Qrk3PZ7l7wUcGYhwZloqfkWCmaXZAoqjkdbIDvzfGshwGtexa/DAs9koXxIkrpEasyevandomzCBAV1Yyop5rw==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/Wombosvideo"
      }
    },
    "node_modules/update-browserslist-db": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.2.3.tgz",
      "integrity": "sha512-Js0m9cx+qOgDxo0eMiFGEueWztz+d4+M3rGlmKPT+T4IS/jP4ylw3Nwpu6cpTTP8R1MAC1kF4VbdLt3ARf209w==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "escalade": "^3.2.0",
        "picocolors": "^1.1.1"
      },
      "bin": {
        "update-browserslist-db": "cli.js"
      },
      "peerDependencies": {
        "browserslist": ">= 4.21.0"
      }
    },
    "node_modules/use-callback-ref": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/use-callback-ref/-/use-callback-ref-1.3.3.tgz",
      "integrity": "sha512-jQL3lRnocaFtu3V00JToYz/4QkNWswxijDaCVNZRiRTO3HQDLsdu1ZtmIUvV4yPp+rvWm5j0y0TG/S61cuijTg==",
      "license": "MIT",
      "dependencies": {
        "tslib": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/use-sidecar": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/use-sidecar/-/use-sidecar-1.1.3.tgz",
      "integrity": "sha512-Fedw0aZvkhynoPYlA5WXrMCAMm+nSWdZt6lzJQ7Ok8S6Q+VsHmHpRWndVRJ8Be0ZbkfPc5LRYH+5XrzXcEeLRQ==",
      "license": "MIT",
      "dependencies": {
        "detect-node-es": "^1.1.0",
        "tslib": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/vaul": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/vaul/-/vaul-1.1.2.tgz",
      "integrity": "sha512-ZFkClGpWyI2WUQjdLJ/BaGuV6AVQiJ3uELGk3OYtP+B6yCO7Cmn9vPFXVJkRaGkOJu3m8bQMgtyzNHixULceQA==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-dialog": "^1.1.1"
      },
      "peerDependencies": {
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0.0 || ^19.0.0-rc"
      }
    },
    "node_modules/victory-vendor": {
      "version": "36.9.2",
      "resolved": "https://registry.npmjs.org/victory-vendor/-/victory-vendor-36.9.2.tgz",
      "integrity": "sha512-PnpQQMuxlwYdocC8fIJqVXvkeViHYzotI+NJrCuav0ZYFoq912ZHBk3mCeuj+5/VpodOjPe1z0Fk2ihgzlXqjQ==",
      "license": "MIT AND ISC",
      "dependencies": {
        "@types/d3-array": "^3.0.3",
        "@types/d3-ease": "^3.0.0",
        "@types/d3-interpolate": "^3.0.1",
        "@types/d3-scale": "^4.0.2",
        "@types/d3-shape": "^3.1.0",
        "@types/d3-time": "^3.0.0",
        "@types/d3-timer": "^3.0.0",
        "d3-array": "^3.1.6",
        "d3-ease": "^3.0.1",
        "d3-interpolate": "^3.0.1",
        "d3-scale": "^4.0.2",
        "d3-shape": "^3.1.0",
        "d3-time": "^3.0.0",
        "d3-timer": "^3.0.1"
      }
    },
    "node_modules/vite": {
      "version": "6.3.5",
      "resolved": "https://registry.npmjs.org/vite/-/vite-6.3.5.tgz",
      "integrity": "sha512-cZn6NDFE7wdTpINgs++ZJ4N49W2vRp8LCKrn3Ob1kYNtOo21vfDoaV5GzBfLU4MovSAB8uNRm4jgzVQZ+mBzPQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "esbuild": "^0.25.0",
        "fdir": "^6.4.4",
        "picomatch": "^4.0.2",
        "postcss": "^8.5.3",
        "rollup": "^4.34.9",
        "tinyglobby": "^0.2.13"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": "^18.0.0 || ^20.0.0 || >=22.0.0"
      },
      "funding": {
        "url": "https://github.com/vitejs/vite?sponsor=1"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      },
      "peerDependencies": {
        "@types/node": "^18.0.0 || ^20.0.0 || >=22.0.0",
        "jiti": ">=1.21.0",
        "less": "*",
        "lightningcss": "^1.21.0",
        "sass": "*",
        "sass-embedded": "*",
        "stylus": "*",
        "sugarss": "*",
        "terser": "^5.16.0",
        "tsx": "^4.8.1",
        "yaml": "^2.4.2"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        },
        "jiti": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "lightningcss": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "sass-embedded": {
          "optional": true
        },
        "stylus": {
          "optional": true
        },
        "sugarss": {
          "optional": true
        },
        "terser": {
          "optional": true
        },
        "tsx": {
          "optional": true
        },
        "yaml": {
          "optional": true
        }
      }
    },
    "node_modules/warning": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/warning/-/warning-4.0.3.tgz",
      "integrity": "sha512-rpJyN222KWIvHJ/F53XSZv0Zl/accqHR8et1kpaMTD/fLCRxtV8iX8czMzY7sVZupTI3zcUTg8eycS2kNF9l6w==",
      "license": "MIT",
      "dependencies": {
        "loose-envify": "^1.0.0"
      }
    },
    "node_modules/yallist": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz",
      "integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g==",
      "dev": true,
      "license": "ISC"
    }
  }
}

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\package.json ---

```json

{
  "name": "@figma/my-make-file",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "build": "vite build",
    "dev": "vite"
  },
  "dependencies": {
    "@emotion/react": "11.14.0",
    "@emotion/styled": "11.14.1",
    "@mui/icons-material": "7.3.5",
    "@mui/material": "7.3.5",
    "@popperjs/core": "2.11.8",
    "@radix-ui/react-accordion": "1.2.3",
    "@radix-ui/react-alert-dialog": "1.1.6",
    "@radix-ui/react-aspect-ratio": "1.1.2",
    "@radix-ui/react-avatar": "1.1.3",
    "@radix-ui/react-checkbox": "1.1.4",
    "@radix-ui/react-collapsible": "1.1.3",
    "@radix-ui/react-context-menu": "2.2.6",
    "@radix-ui/react-dialog": "1.1.6",
    "@radix-ui/react-dropdown-menu": "2.1.6",
    "@radix-ui/react-hover-card": "1.1.6",
    "@radix-ui/react-label": "2.1.2",
    "@radix-ui/react-menubar": "1.1.6",
    "@radix-ui/react-navigation-menu": "1.2.5",
    "@radix-ui/react-popover": "1.1.6",
    "@radix-ui/react-progress": "1.1.2",
    "@radix-ui/react-radio-group": "1.2.3",
    "@radix-ui/react-scroll-area": "1.2.3",
    "@radix-ui/react-select": "2.1.6",
    "@radix-ui/react-separator": "1.1.2",
    "@radix-ui/react-slider": "1.2.3",
    "@radix-ui/react-slot": "1.1.2",
    "@radix-ui/react-switch": "1.1.3",
    "@radix-ui/react-tabs": "1.1.3",
    "@radix-ui/react-toggle": "1.1.2",
    "@radix-ui/react-toggle-group": "1.1.2",
    "@radix-ui/react-tooltip": "1.1.8",
    "canvas-confetti": "1.9.4",
    "class-variance-authority": "0.7.1",
    "clsx": "2.1.1",
    "cmdk": "1.1.1",
    "date-fns": "3.6.0",
    "embla-carousel-react": "8.6.0",
    "input-otp": "1.4.2",
    "lucide-react": "0.487.0",
    "motion": "12.23.24",
    "next-themes": "0.4.6",
    "react-day-picker": "8.10.1",
    "react-dnd": "16.0.1",
    "react-dnd-html5-backend": "16.0.1",
    "react-hook-form": "7.55.0",
    "react-popper": "2.3.0",
    "react-resizable-panels": "2.1.7",
    "react-responsive-masonry": "2.7.1",
    "react-router": "7.13.0",
    "react-slick": "0.31.0",
    "recharts": "2.15.2",
    "sonner": "2.0.3",
    "tailwind-merge": "3.2.0",
    "tw-animate-css": "1.3.8",
    "vaul": "1.1.2"
  },
  "devDependencies": {
    "@tailwindcss/vite": "4.1.12",
    "@vitejs/plugin-react": "4.7.0",
    "tailwindcss": "4.1.12",
    "vite": "6.3.5"
  },
  "peerDependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "peerDependenciesMeta": {
    "react": {
      "optional": true
    },
    "react-dom": {
      "optional": true
    }
  },
  "pnpm": {
    "overrides": {
      "vite": "6.3.5"
    }
  }
}

```n

--- FILE: C:\Users\mahmed\Downloads\internship\Dashboarding\Physician Dashboard Design\vite.config.ts ---

```ts

import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used â€“ do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})

```n

