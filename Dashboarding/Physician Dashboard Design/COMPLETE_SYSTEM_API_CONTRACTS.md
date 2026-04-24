# COMPLETE SYSTEM API CONTRACTS: SleepCare Platform

**Date:** April 24, 2026  
**Version:** 3.0 (FINAL - ALIGNED WITH DB SCHEMA & UI)  
**Technical Stakeholder:** Siamak  
**Clinical Owner:** Moeez Ahmed

---

## 1. Global Patient Header API
**Endpoint:** `GET /api/v1/patient/{id}/summary`  
**Purpose:** Powers the "Patient Cockpit" and header metrics.

```json
{
  "id": "uuid",
  "name": "string",
  "dob": "ISO-8601",
  "gender": "enum[M, F, Other]",
  "address": "string",
  "tenant_id": "string",
  "therapy_status": "string",
  "therapy_start_date": "ISO-8601",
  "phase": "enum[Titration, Acclimation, Maintenance]",
  "risk_score": "float",
  "risk_tier": "enum[Low, Medium, High, Critical]",
  "hardware": {
    "device_brand": "enum[Philips, ResMed, Sefam, Löwenstein]",
    "device_model": "string",
    "serial_number": "string",
    "mask_interface": "string", // UI maps this to 'maskType'
    "last_modem_call": "ISO-8601"
  }
}
```

---

## 2. Unified CPAP Trends API
**Endpoint:** `GET /api/v1/patient/{id}/trends/cpap`  
**Purpose:** Powers the "Trends" tab. Aggregated CPAP clinical data AND 30/60/90-day time-series arrays for UI charts.

```json
{
  "reference_date": "ISO-8601",
  "compliance_streak_days": "int",
  "usage": {
    "total_hours": "float",
    "effective_hours": "float",
    "mask_on_off_events": "int"
  },
  "clinical": {
    "ahi": "float",
    "ai_total": "float",
    "ai_central": "float",
    "hi_total": "float",
    "chi_sefam": "float",
    "oai": "float",
    "rera": "float",
    "csr_percent": "float"
  },
  "leak_profile": {
    "p95": "float",
    "p90": "float",
    "p0": "float",
    "large_leak_percent": "float"
  },
  "pressure": {
    "p90": "float",
    "p0": "float",
    "mode": "enum[CPAP, APAP, BiLevel]",
    "min_setting": "float",
    "max_setting": "float",
    "current_setting": "float"
  },
  "source": {
    "platform": "enum[LMD, AirView, CareOrchestrator, prismaCloud]",
    "upload_method": "enum[Modem, SD, Bluetooth]",
    "receipt_timestamp": "ISO-8601"
  },
  "time_series": [
    {
      "date": "ISO-8601", // Maps to Siamak's db_cpap.reference_date
      "usage_hours": "float",
      "ahi": "float",
      "ai_central": "float",
      "oai": "float"
    }
  ]
}
```

---

## 3. Normalized Clinical Biomarkers API
**Endpoint:** `GET /api/v1/patient/{id}/biomarkers`  
**Purpose:** Powers the Dynamic Biomarker Monitoring tab. Unified view across all sensors, returning both current averages and a 30-day historical array for charting.

```json
{
  "timestamp": "ISO-8601",
  "analysis_status": "enum[Done, Warning, Partial]",
  "current_metrics": {
    "odi": { "value": "float", "source": "string", "status": "enum[Optimal, Moderate, Elevated]" },
    "hrv": { "value": "float", "unit": "ms", "source": "string" },
    "spo2": { "mean": "float", "nadir": "float", "source": "string" },
    "rvo": { "value": "float", "source": "string" }, // Respiratory Effort Variability (Hexoskin)
    "sleep_architecture": {
      "deep_sleep_duration_min": "float", 
      "rem_duration_min": "float",
      "efficiency_percent": "float",
      "source": "string" 
    },
    "cardiovascular": {
      "systolic_bp": "float",
      "diastolic_bp": "float",
      "heart_rate_avg": "float",
      "source": "string"
    }
  },
  "historical_series": [
    {
      "date": "ISO-8601", // Siamak's night_date / timestamp
      "odi": "float",
      "hrv": "float",
      "spo2_mean": "float",
      "spo2_nadir": "float",
      "rvo": "float",
      "oai": "float",
      "deep_sleep_duration_min": "float",
      "systolic_bp": "float",
      "diastolic_bp": "float"
    }
  ]
}
```

---

## 4. Weekly Clinical Analysis (Feature Store)
**Endpoint:** `GET /api/v1/patient/{id}/analysis/weekly`  
**Purpose:** Powers the "AI Analysis" tab. Derived features, risk models, and prescriptive actions.

```json
{
  "week_start_date": "ISO-8601",
  "week_end_date": "ISO-8601",
  "risk_model_output": {
    "composite_risk": "float",
    "previous_risk": "float",
    "confidence_score": "float",
    "risk_horizon_days": "int",
    "risk_tier": "enum[Critical, High, Medium, Low]",
    "phase_label": "string"
  },
  "cluster_assignment": {
    "current": "enum[Adherent, Attempting, Struggling, Dropout]",
    "previous": "string",
    "changed_this_week": "boolean",
    "description": "text"
  },
  "risk_factor_breakdown": [
    {
      "factor": "string", // e.g. "Usage Decay"
      "contribution_percent": "float",
      "direction": "enum[worsening, improving, stable]"
    }
  ],
  "seven_day_rolling": [
    {
      "day": "ISO-8601",
      "usage_hours": "float",
      "leak_rate": "float",
      "ahi": "float"
    }
  ],
  "next_best_action": {
    "type": "string",
    "delivery_mode": "string",
    "rationale": "text",
    "reassessment_window": "string"
  },
  "completeness_status": "enum[Complete, Partial, Insufficient]"
}
```

---

## 5. Universal Truth Intervention Log
**Endpoint:** `GET /api/v1/patient/{id}/interventions`  
**Purpose:** Audit-ready chronological log of all platform actions.

```json
{
  "id": "uuid",
  "timestamp": "ISO-8601",
  "type": "string",
  "job_code": "enum[EX-DISP, VK-AUTO, SL-REF, MD-CONSULT]",
  "actor": {
    "id": "string",
    "name": "string",
    "role": "enum[Physician, Technician, AI-System]"
  },
  "outcome": "string",
  "notes": "text",
  "signature_hash": "string" 
}
```

---

## 6. Surveys & PROM History
**Endpoint:** `GET /api/v1/patient/{id}/surveys`  
**Purpose:** Powers clinical scoring and persistence timeline.

```json
{
  "survey_id": "uuid",
  "name": "string", // ESS, PSQI, ISI, BDI, SF-36
  "category": "enum[Clinical, Operational, Monitoring]",
  "execution_date": "ISO-8601",
  "status": "enum[Invited, Reminder_1, SMS_Final, Delinquent, Completed]",
  "score": "float", // UI expects 'score' instead of 'score_value'
  "threshold": "float",
  "risk": "enum[Normal, Elevated, Moderate, High]", // UI uses 'risk' instead of 'severity_label'
  "structured_answers": [
    { "question_id": "string", "answer": "text" }
  ]
}
```

---

## 7. Physician Exception Inbox & Queue
**Endpoint:** `GET /api/v1/physician/queue`  
**Purpose:** Powers the Physician's Home tab lists (Urgent AI escalations & Annual Reviews).

```json
{
  "urgent": [
    {
      "id": "uuid",
      "patient_name": "string",
      "risk_score": "float",
      "reason": "string",
      "category": "string",
      "days_active": "int",
      "last_review": "ISO-8601"
    }
  ],
  "annual_reviews": [
    {
      "id": "uuid",
      "patient_name": "string",
      "risk_score": "float",
      "therapy_start": "ISO-8601",
      "days_until_due": "int",
      "status": "enum[Due Soon, Overdue]"
    }
  ]
}
```

---

## 8. Technician Triage & Reactive Alerts
**Endpoint:** `GET /api/v1/technician/triage/events`  
**Purpose:** Powers the "Priority Inbox" for technicians.

```json
{
  "event_id": "uuid",
  "patient_id": "uuid",
  "severity": "enum[Critical, High, Medium]",
  "type": "enum[Self-Report, Mechanical Spike, Adherence Drop]",
  "detected_at": "ISO-8601",
  "evidence_summary": "text",
  "status": "enum[Pending, In-Progress, Resolved, Dismissed]",
  "ai_note": "text",
  "suggested_action": "text"
}
```

**Endpoint:** `POST /api/v1/technician/triage/action`  
**Purpose:** Submits the technician's validation or rejection of an AI-detected event.

```json
{
  "event_id": "uuid",
  "action": "enum[VALIDATE, DISMISS]",
  "technician_id": "string",
  "notes": "string",
  "reason_code": "string", // Required if action is DISMISS (e.g. "FALSE_POSITIVE", "DATA_ANOMALY")
  "timestamp": "ISO-8601"
}
```

---

## 9. Technician's Unified Queue
**Endpoint:** `GET /api/v1/technician/queue`  
**Purpose:** Powers the Technician's unified list of patients sorted by risk and usage.

```json
[
  {
    "patient_id": "uuid",
    "patient_name": "string",
    "dropout_risk": "float",
    "usage_hours": "float",
    "usage_category": "enum[<2 hrs, 2-4 hrs, 4+ hrs]",
    "postal_code": "string",
    "last_contact": "ISO-8601",
    "required_action": "string"
  }
]
```

---

## 10. Clinical Orders & Authorization Status
**Endpoint:** `GET /api/v1/patient/{id}/authorizations`  
**Purpose:** Tracks clinical transitions (MAD/HNS) and Digital Clinical Seals.

```json
{
  "auth_id": "uuid",
  "type": "enum[MAD, HNS, CPAP_MOD]",
  "status": "enum[Pending_Review, Approved, Denied, Signed]",
  "physician_id": "string",
  "digital_seal": {
    "seal_hash": "string",
    "visual_id": "string",
    "certified_on": "ISO-8601"
  }
}
```

---

## 11. Biomarker Devices (Hardware Management)
**Endpoint:** `GET /api/v1/patient/{id}/devices`  
**Purpose:** Powers the Technician's "Biomarker Devices" tab, tracking hardware health, battery, and sync status for Hexoskin, Masimo, Somno-Art, and Withings.

```json
[
  {
    "device_id": "string", // e.g., "HEXO-092"
    "name": "enum[Hexoskin Smart Shirt, Masimo MightySat Rx, Somno-Art Band, Withings BPM Core, Withings ScanWatch]",
    "type": "string",
    "status": "enum[Online, Offline, Disconnected]",
    "battery_percentage": "int",
    "last_sync": "ISO-8601",
    "assigned_date": "ISO-8601"
  }
]
```

---

## 12. Source-Specific Audit Records (Backend Storage)
Siamak's backend must preserve these structures for full auditability, aligning with the `v1.xlsx` schema:

### 12.1 Hexoskin Record (`db_hexoskin`)
*   `heart_rate`, `hrv`, `breathing_rate`, `tidal_volume`, `minute_ventilation`, `accelerometer_activity`. (RVO should be derived here if possible).

### 12.2 Somno-Art Record (`db_somnoart`)
*   `tst`, `sleep_efficiency`, `waso`, `sleep_latency`, `rem_latency`, `n1_n2_duration`, `n3_duration`, `rem_duration`.

### 12.3 Masimo Record (`db_masimo`)
*   `spo2`, `pulse_rate`, `perfusion_index`, `respiration_rate`, `pleth_variability_index`, `siq_flag`.

### 12.4 Withings Record (`db_withings`)
*   `systolic_bp`, `diastolic_bp`, `afib_result`, `pulse_wave_velocity`, `step_count`, `sleep_score`.

---

## 13. Technical / Data Integrity Requirements
For every record, Siamak must ensure:
1.  **`raw_payload` (JSONB):** Complete manufacturer JSON stored for re-analysis.
2.  **`source_platform`:** Traceability (e.g. "Hexoskin OneAPI", "Withings Public API").
3.  **`created_at` / `updated_at`:** Standard database metadata.
4.  **`missingness_flag` (JSONB):** Critical for `patient_week` layers to track which sensors were offline.

---

## 14. Global Formatting Rules
1.  **Dates:** All timestamps MUST be ISO-8601 (UTC). Time-series `date` fields should map cleanly to DB `reference_date` / `night_date`.
2.  **Units:** Pressures: `cmH2O`, Leaks: `L/min`, Durations: `minutes`, Biomarkers: `mmHg/ms/bpm/%`.
3.  **Nulls:** Use `null` for missing clinical metrics; use `[]` for empty lists.
