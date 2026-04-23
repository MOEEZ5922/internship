# COMPLETE SYSTEM API CONTRACTS: SleepCare Platform

**Date:** April 23, 2026  
**Version:** 2.0 (FINAL - MULTI-SENSOR INTEGRATED)  
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
  "tenant_id": "string",
  "therapy_status": "string",
  "phase": "enum[Titration, Acclimation, Maintenance]",
  "risk_score": "float",
  "risk_tier": "enum[Low, Medium, High, Critical]",
  "hardware": {
    "device_brand": "enum[Philips, ResMed, Sefam, Löwenstein]",
    "device_model": "string",
    "serial_number": "string",
    "mask_interface": "string",
    "last_modem_call": "ISO-8601"
  }
}
```

---

## 2. Unified CPAP Trends API
**Endpoint:** `GET /api/v1/patient/{id}/trends/cpap`  
**Purpose:** Powers the "Trends" tab. Aggregated CPAP clinical data.

```json
{
  "reference_date": "ISO-8601",
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
    "current_setting": "float"
  },
  "source": {
    "platform": "enum[LMD, AirView, CareOrchestrator, prismaCloud]",
    "upload_method": "enum[Modem, SD, Bluetooth]",
    "receipt_timestamp": "ISO-8601"
  }
}
```

---

## 3. Normalized Clinical Biomarkers API
**Endpoint:** `GET /api/v1/patient/{id}/biomarkers`  
**Purpose:** Powers the Dynamic Biomarker Monitoring tab. Unified view across all sensors.

```json
{
  "timestamp": "ISO-8601",
  "metrics": {
    "odi": {
      "value": "float",
      "source": "string", // e.g. "Masimo MightySat Rx"
      "status": "enum[Optimal, Moderate, Elevated]"
    },
    "hrv": {
      "value": "float",
      "unit": "ms",
      "source": "string" // e.g. "Hexoskin Smart Shirt"
    },
    "spo2": {
      "mean": "float",
      "nadir": "float",
      "source": "string"
    },
    "sleep_architecture": {
      "deep_sleep_duration_min": "float", // N3 duration
      "rem_duration_min": "float",
      "efficiency_percent": "float",
      "source": "string" // e.g. "Somno-Art Analysis"
    },
    "cardiovascular": {
      "systolic_bp": "float",
      "diastolic_bp": "float",
      "heart_rate_avg": "float",
      "source": "string" // e.g. "Withings BPM Core"
    }
  },
  "analysis_status": "enum[Done, Warning, Partial]"
}
```

---

## 4. Weekly Clinical Analysis (Feature Store)
**Endpoint:** `GET /api/v1/patient/{id}/analysis/weekly`  
**Purpose:** Powers the "AI Analysis" tab. Derived features for risk modeling.

```json
{
  "week_start_date": "ISO-8601",
  "week_end_date": "ISO-8601",
  "trends": {
    "usage_delta_hours": "float", // Change from previous week
    "hrv_delta_ms": "float",
    "ahi_variance": "float",
    "leak_instability_score": "float"
  },
  "risk_model_output": {
    "composite_risk": "float",
    "confidence_score": "float",
    "risk_horizon_days": "int",
    "evidence_flags": ["string"] // e.g. ["Sustained Usage Decay", "High ODI Spike"]
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
  "score_value": "float",
  "severity_label": "string",
  "structured_answers": [
    { "question_id": "string", "answer": "text" }
  ]
}
```

---

## 7. Technician Triage & Reactive Alerts
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
  "ai_note": "text"
}
```

---

## 8. Clinical Orders & Authorization Status
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

## 9. Source-Specific Audit Records (Backend Storage)
Siamak's backend must preserve these structures for full auditability:

### 9.1 Hexoskin Record (`db_hexoskin`)
*   `heart_rate`, `hrv`, `breathing_rate`, `tidal_volume`, `minute_ventilation`, `accelerometer_activity`.

### 9.2 Somno-Art Record (`db_somnoart`)
*   `tst`, `sleep_efficiency`, `waso`, `sleep_latency`, `rem_latency`, `n1_n2_duration`, `n3_duration`, `rem_duration`.

### 9.3 Masimo Record (`db_masimo`)
*   `spo2`, `pulse_rate`, `perfusion_index`, `respiration_rate`, `pleth_variability_index`, `siq_flag`.

### 9.4 Withings Record (`db_withings`)
*   `systolic_bp`, `diastolic_bp`, `afib_result`, `pulse_wave_velocity`, `step_count`, `sleep_score`.

---

## 10. Technical / Data Integrity Requirements
For every record, Siamak must ensure:
1.  **`raw_payload` (JSONB):** Complete manufacturer JSON stored for re-analysis.
2.  **`source_platform`:** Traceability (e.g. "Hexoskin OneAPI", "Withings Public API").
3.  **`created_at` / `updated_at`:** Standard database metadata.
4.  **`missingness_flag` (JSONB):** Critical for `patient_week` layers to track which sensors were offline.

---

## 11. Global Formatting Rules
1.  **Dates:** All timestamps MUST be ISO-8601 (UTC).
2.  **Units:** Pressures: `cmH2O`, Leaks: `L/min`, Durations: `minutes`, Biomarkers: `mmHg/ms/bpm/%`.
3.  **Nulls:** Use `null` for missing clinical metrics; use `[]` for empty lists.
