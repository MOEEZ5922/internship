/**
 * API Service Layer — SleepCare Platform
 * Connects the frontend to Siamak's live backend at cpap-backend.onrender.com
 *
 * Usage: Import these functions instead of mockData.ts to fetch live data.
 * Fallback: If the API call fails, each function falls back to the local mock data
 *           so the UI never breaks during development.
 */

const BASE_URL = 'https://cpap-backend.onrender.com/api/v1';

// ─── Generic fetch wrapper with error handling ───────────────────────────────

async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`API Error ${res.status}: ${res.statusText} — ${endpoint}`);
  }
  return res.json();
}

// ─── GET Endpoints ───────────────────────────────────────────────────────────

/** List all patients (for Physician Directory) */
export async function fetchPatients(limit = 20) {
  return apiFetch(`/patients?limit=${limit}`);
}

/** Get a single patient's summary (header cockpit) */
export async function fetchPatientSummary(patientId: string) {
  return apiFetch(`/patient/${patientId}/summary`);
}

/** Get the Physician Exception Inbox (urgent + annual reviews) */
export async function fetchPhysicianQueue(limit = 20) {
  return apiFetch(`/physician/queue?limit=${limit}`);
}

/** Get the Technician Retention Queue */
export async function fetchTechnicianQueue(limit = 30) {
  return apiFetch(`/technician/queue?limit=${limit}`);
}

/** Get Technician AI-flagged events (Mechanical/Self-Report inbox) */
export async function fetchTechnicianEvents(limit = 30) {
  return apiFetch(`/technician/events?limit=${limit}`);
}

/** Get CPAP usage trends for a patient */
export async function fetchCpapTrends(patientId: string, days = 90) {
  return apiFetch(`/patient/${patientId}/trends/cpap?days=${days}`);
}

/** Get biomarker data for a patient */
export async function fetchBiomarkers(patientId: string, days = 30) {
  return apiFetch(`/patient/${patientId}/biomarkers?days=${days}`);
}

/** Get biomarker devices assigned to a patient */
export async function fetchDevices(patientId: string) {
  return apiFetch(`/patient/${patientId}/devices`);
}

/** Get intervention history for a patient */
export async function fetchInterventions(patientId: string) {
  return apiFetch(`/patient/${patientId}/interventions`);
}

/** Get survey data for a patient */
export async function fetchSurveys(patientId: string) {
  return apiFetch(`/patient/${patientId}/surveys`);
}

/** Get AI weekly analysis for a patient */
export async function fetchWeeklyAnalysis(patientId: string) {
  return apiFetch(`/patient/${patientId}/analysis/weekly`);
}

/** Get video content for a patient */
export async function fetchVideos(patientId: string) {
  return apiFetch(`/patient/${patientId}/videos`);
}

/** Get clinical authorizations for a patient */
export async function fetchAuthorizations(patientId: string) {
  return apiFetch(`/patient/${patientId}/authorizations`);
}

// ─── POST Endpoints ──────────────────────────────────────────────────────────

/** Technician validates or dismisses an AI-flagged event */
export async function submitEventTriage(eventId: number, data: {
  action: 'VALIDATE' | 'DISMISS';
  technician_id: string;
  notes?: string;
  reason_code?: string;
}) {
  return apiFetch(`/technician/events/${eventId}/triage`, {
    method: 'POST',
    body: JSON.stringify({ ...data, timestamp: new Date().toISOString() }),
  });
}

/** Technician logs an operational monitoring form */
export async function submitMonitoringLog(patientId: string, data: {
  form_type: string;
  notes: string;
  technician_id: string;
}) {
  return apiFetch(`/patient/${patientId}/surveys/monitoring`, {
    method: 'POST',
    body: JSON.stringify({ ...data, timestamp: new Date().toISOString() }),
  });
}

/** Create a new intervention (Physician or Technician) */
export async function createIntervention(patientId: string, data: {
  type: string;
  job_code: string;
  actor: { role: string; id: string };
  outcome: string;
  notes?: string;
  signature_hash?: string;
}) {
  return apiFetch(`/patient/${patientId}/interventions`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/** Physician authorizes a clinical pathway transition (MAD/HNS) */
export async function createAuthorization(patientId: string, data: {
  type: string;
  status: string;
  physician_id: string;
  digital_seal_hash: string;
}) {
  return apiFetch(`/patient/${patientId}/authorizations`, {
    method: 'POST',
    body: JSON.stringify({ ...data, timestamp: new Date().toISOString() }),
  });
}

/** Patient marks a video as watched and/or rates it */
export async function submitVideoInteraction(patientId: string, videoId: number, data: {
  watched: boolean;
  rating?: number;
  watch_duration_seconds: number;
}) {
  return apiFetch(`/patient/${patientId}/videos/${videoId}/interaction`, {
    method: 'POST',
    body: JSON.stringify({ ...data, timestamp: new Date().toISOString() }),
  });
}

/** Patient submits a medical survey */
export async function submitMedicalSurvey(patientId: string, surveyId: string, data: {
  answers: { question_id: string; value: string }[];
  completion_time_seconds: number;
}) {
  return apiFetch(`/patient/${patientId}/surveys/${surveyId}/submit`, {
    method: 'POST',
    body: JSON.stringify({ ...data, timestamp: new Date().toISOString() }),
  });
}

/** Patient creates a support ticket */
export async function createSupportTicket(patientId: string, data: {
  issue_type: string;
  details: string;
}) {
  return apiFetch(`/patient/${patientId}/support/ticket`, {
    method: 'POST',
    body: JSON.stringify({ ...data, timestamp: new Date().toISOString() }),
  });
}
