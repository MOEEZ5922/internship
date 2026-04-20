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

// Technician Priority Queue Data (Proactive Dropout Prevention)
export const technicianQueue = [
  {
    id: 1,
    patientName: "Sarah Mitchell",
    dropoutRisk: 85,
    usageHours: 1.2,
    usageCategory: "<2 hrs",
    postalCode: "97214",
    lastContact: "2026-04-10",
    action: "Titration Review",
    behavioralCluster: "Attempting",
    phase: "Titration",
    maskType: "AirFit F20 - Medium",
    lastMaskChange: "2026-01-15",
    equipmentNeed: ["New Cushion", "Heated Tubing"],
    leakProfile: { p50: 12.4, p95: 28.5, max: 42.1 },
    assetTracking: { serial: "LND-7742-XP", assetTag: "TAG-991" },
    interventionHistory: [
      { date: "2026-04-01", type: "Remote Pressure Alt", result: "Success (AHI Down)", tech: "J. Doe" },
      { date: "2026-03-15", type: "Mask Size Swap", result: "Failed (Leak Same)", tech: "A. Smith" },
    ],
    monitoringSurveys: [
      { id: "M1", question: "Mask Comfort (1-10)", answer: "4 (Hurts nose bridge)" },
      { id: "M2", question: "Ease of Cleaning", answer: "Good" },
    ]
  },
  {
    id: 2,
    patientName: "Robert Chen",
    dropoutRisk: 72,
    usageHours: 3.5,
    usageCategory: "2-4 hrs",
    postalCode: "97203",
    lastContact: "2026-04-08",
    action: "Motivational Call",
    behavioralCluster: "Struggling",
    phase: "Acclimation",
    maskType: "AirFit N20 - Small",
    lastMaskChange: "2026-02-20",
    equipmentNeed: ["Chin Strap"],
    leakProfile: { p50: 8.2, p95: 14.1, max: 19.5 },
    assetTracking: { serial: "LND-1102-AQ", assetTag: "TAG-882" },
    interventionHistory: [
      { date: "2026-03-20", type: "Software Update", result: "Success", tech: "K. Lee" },
    ],
    monitoringSurveys: [
      { id: "M1", question: "Morning Headache?", answer: "Occasional" },
      { id: "M2", question: "Device Noise", answer: "Acceptable" },
    ]
  },
  {
    id: 3,
    patientName: "Maria Garcia",
    dropoutRisk: 68,
    usageHours: 1.8,
    usageCategory: "<2 hrs",
    postalCode: "97212",
    lastContact: "2026-04-12",
    action: "Home Visit Prep",
    behavioralCluster: "Non-Adherent",
    phase: "Acclimation",
    maskType: "AirFit F30 - Medium",
    lastMaskChange: "2025-11-05",
    equipmentNeed: ["Mask Refit Kit", "SD Card"],
    leakProfile: { p50: 15.5, p95: 32.2, max: 48.0 },
    assetTracking: { serial: "LND-4491-ZZ", assetTag: "TAG-004" },
    interventionHistory: [
      { date: "2026-02-10", type: "Humidifier Repair", result: "Resolved", tech: "J. Doe" },
    ],
    monitoringSurveys: [
      { id: "M1", question: "Skin Rash?", answer: "Yes (Cheeks)" },
      { id: "M2", question: "Dry Mouth?", answer: "Severe" },
    ]
  },
];

// Technician Event-Based Inbox (Reactive Triage for Mechanical/Self-Reported Triggers)
export const technicianEvents = [
  {
    id: 1,
    type: "Patient Self-Report",
    severity: "high",
    detectedAt: "2026-04-19T09:45:00",
    patient: {
      name: "Sarah Mitchell",
      patientId: 1,
      address: "1425 Maple Street, Portland, OR 97214",
      phone: "+1 (503) 555-0182",
      maskType: "AirFit F20 - Medium",
    },
    evidence: "Patient reported 'Severe mask discomfort and skin irritation' via the mobile app support tool.",
    aiNote: "Correlates with 3:15 AM mask removal. High probability of poor seal causing pressure points.",
    suggestedAction: "In-person mask refit required. Bring sensitive skin liners.",
    status: "pending",
  },
  {
    id: 101,
    type: "Mask Leak",
    severity: "high",
    detectedAt: "2026-04-19T07:30:00",
    patient: {
      name: "Robert Chen",
      patientId: 2,
      address: "842 Oak Avenue, Portland, OR 97203",
      phone: "+1 (503) 555-0234",
      maskType: "AirFit N20 - Small",
    },
    evidence: "Mask leak exceeded 24 L/min on 3 consecutive nights. Peak leak recorded at 38 L/min.",
    aiNote: "Pattern is consistent with mask seal degradation or incorrect fit.",
    suggestedAction: "Dispatch replacement mask kit.",
    status: "pending",
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

// AI Weekly State — Physician Reference Tab
export const aiWeeklyState = {
  weekOf: "2026-04-14",
  compositeRiskScore: 8.2,
  previousRiskScore: 6.7,
  riskTier: "Critical",
  phaseLabel: "Optimization",
  confidenceLevel: 84,
  daysToPredictedDropout: 12,

  clusterAssignment: {
    current: "Attempting",
    previous: "Adherent",
    changedThisWeek: true,
    description: "Patient has been reclassified from Adherent to Attempting due to sustained usage decline and increasing residual AHI variance.",
  },

  sevenDayRolling: [
    { day: "Mon Apr 14", usageHours: 6.1, leakRate: 14.2, ahi: 4.1 },
    { day: "Tue Apr 15", usageHours: 5.4, leakRate: 19.8, ahi: 5.3 },
    { day: "Wed Apr 16", usageHours: 3.8, leakRate: 28.4, ahi: 7.8 },
    { day: "Thu Apr 17", usageHours: 2.1, leakRate: 34.1, ahi: 10.2 },
    { day: "Fri Apr 18", usageHours: 1.9, leakRate: 36.7, ahi: 11.4 },
    { day: "Sat Apr 19", usageHours: 2.4, leakRate: 31.2, ahi: 9.8 },
    { day: "Sun Apr 20", usageHours: 1.2, leakRate: 38.0, ahi: 12.4 },
  ],

  riskFactorBreakdown: [
    { factor: "Usage Decay",         contribution: 32, direction: "worsening" },
    { factor: "Mask Leak Instability", contribution: 28, direction: "worsening" },
    { factor: "Residual AHI Burden",  contribution: 22, direction: "worsening" },
    { factor: "ESS Score (12/24)",    contribution: 10, direction: "stable"    },
    { factor: "PSQI Score (8/21)",    contribution: 8,  direction: "stable"    },
  ],

  activeFlags: [
    { label: "Leak Instability",    severity: "high"   },
    { label: "Usage Decay",         severity: "high"   },
    { label: "Residual AHI Burden", severity: "medium" },
  ],

  nextBestAction: {
    type: "Physician Escalation",
    deliveryMode: "Exception-Based Inbox",
    rationale: "Three consecutive failed technician interventions with no improvement. Composite risk score has crossed the clinical threshold (≥8). AI has escalated to physician for clinical pathway review.",
    reassessmentWindow: "7 days post-intervention",
  },
};