# Nejib's Way: SQL-to-University Data Sync Workflow

This document outlines the specialized workflow for extracting patient data from the internal **MS SQL Server** and synchronizing it with the **University Server** using an automated, incremental approach.

---

## 🏗️ 1. Architecture Overview
This workflow uses the supervisor's computer as a secure bridge.

*   **Source**: MS SQL Server (Internal Company Network).
*   **Bridge**: Python Script (running on Supervisor PC via Windows Authentication).
*   **Destination**: University Server (External API).

---

## 🔐 2. The Authentication Advantage
Unlike the LMD Web API, this workflow uses **Windows Authentication (SSO)**.
*   The Python script "inherits" the supervisor's Windows token.
*   **No passwords** are stored in the code for the database connection.
*   As long as the supervisor is logged into the PC and on the VPN, the script has access.

---

## 📈 3. Handling Incremental Updates (Changes Only)
To avoid sending the entire database every day, the script uses the **"Watermark"** method.

1.  **Local Tracker**: A file named `last_sync.json` is stored on the PC.
2.  **Date Filtering**: The script reads the `last_sync_date` from this file.
3.  **SQL Query**: It specifically asks SQL Server for rows where the `ModifiedDate` is newer than the `last_sync_date`.
4.  **Update**: Once successful, it updates the `last_sync.json` with the current date.

---

## 💻 4. Python Implementation Snippet

```python
import pyodbc
import requests
import json
import datetime
import os

# --- CONFIGURATION ---
# Note: To find your drivers, run: python -c "import pyodbc; print(pyodbc.drivers())"
SQL_DRIVER = "{SQL Server}"          # Common options: "{ODBC Driver 17 for SQL Server}" or "{SQL Server}"
SQL_SERVER = "ENTER_SQL_SERVER_NAME"
SQL_DATABASE = "ENTER_DATABASE_NAME"
UNI_API_URL = "ENTER_UNIVERSITY_API_URL"
METADATA_FILE = "last_sync.json"

# 1. Get the last sync timestamp
if os.path.exists(METADATA_FILE):
    with open(METADATA_FILE, 'r') as f:
        last_sync = json.load(f)['timestamp']
else:
    last_sync = "2000-01-01 00:00:00"

# 2. Connect to SQL Server via Windows Authentication
conn_str = f"Driver={SQL_DRIVER};Server={SQL_SERVER};Database={SQL_DATABASE};Trusted_Connection=yes;"
conn = pyodbc.connect(conn_str)
cursor = conn.cursor()

# 3. Fetch only the NEW/CHANGED rows
print(f"Fetching changes since: {last_sync}")
query = f"SELECT * FROM ENTER_TABLE_NAME WHERE ENTER_DATE_COLUMN > '{last_sync}'"
cursor.execute(query)
rows = cursor.fetchall()

# 4. Process and Push to University
if rows:
    payload = []
    for row in rows:
        payload.append({
            "patient_id": row.PatientID,
            "metrics": row.BiomarkerData,
            "last_updated": str(row.UpdatedAt)
        })
    
    response = requests.post(UNI_API_URL, json=payload)
    
    if response.status_code == 200:
        # 5. Update the local sync tracker
        new_sync_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        with open(METADATA_FILE, 'w') as f:
            json.dump({"timestamp": new_sync_time}, f)
        print(f"Successfully synced {len(rows)} records.")
else:
    print("No new changes found.")
```

---

## ⚙️ 5. Automation Step
To make this completely hands-off for the supervisor:
1.  Open **Windows Task Scheduler**.
2.  Create a task to run `python.exe NejibsWay.py` every day at a specific time (e.g., 6:00 PM).
3.  Ensure the "Run only when user is logged on" or "Run with highest privileges" options are set appropriately to allow network access.

---

## 🛡️ 6. Troubleshooting
*   **Connection Failed**: Ensure the VPN is active.
*   **Empty Results**: Verify that the `UpdatedAt` column in SQL Server is actually being updated by the source system.
*   **Uni Server 403**: The University Server might need to "whitelist" the supervisor's IP address.
