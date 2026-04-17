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
      reason: "AHI spike: 12.4 (↑45% from baseline)",
      category: "Complex AHI",
      lastReview: "2026-03-15",
      daysActive: 0,
    },
    {
      id: 2,
      patientName: "Robert Chen",
      riskScore: 92,
      reason: "Central apneas increasing (>60% of events)",
      category: "Complex AHI",
      lastReview: "2026-03-10",
      daysActive: 5,
    },
    {
      id: 3,
      patientName: "Maria Garcia",
      riskScore: 78,
      reason: "ODI >30 with SpO2 desaturation events",
      category: "Risk Score 8+",
      lastReview: "2026-04-01",
      daysActive: 0,
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
      title: "How to Tighten Your Mask for a Better Seal",
      duration: "3:24",
      category: "Mask & Equipment",
      triggerReason: "Mask Leak Detected",
      relevance: "high",
      watched: false,
      rating: null,
    },
    {
      id: 2,
      title: "Building a Consistent Bedtime Routine",
      duration: "5:12",
      category: "Tips & Tricks",
      triggerReason: "Improve Adherence",
      relevance: "high",
      watched: false,
      rating: null,
    },
    {
      id: 3,
      title: "Cleaning Your Mask & Tubing Weekly",
      duration: "4:08",
      category: "Maintenance",
      triggerReason: "Routine Care",
      relevance: "medium",
      watched: true,
      rating: 5,
    },
    {
      id: 4,
      title: "Understanding Your AHI Score",
      duration: "6:45",
      category: "Understanding Your Data",
      triggerReason: "Educational",
      relevance: "medium",
      watched: true,
      rating: 4,
    },
    {
      id: 5,
      title: "What to Do If You Wake Up at Night",
      duration: "4:30",
      category: "Tips & Tricks",
      triggerReason: "Improve Adherence",
      relevance: "medium",
      watched: false,
      rating: null,
    },
    {
      id: 6,
      title: "Travelling with Your CPAP Machine",
      duration: "7:15",
      category: "Lifestyle",
      triggerReason: "Educational",
      relevance: "low",
      watched: false,
      rating: null,
    },
  ],
};