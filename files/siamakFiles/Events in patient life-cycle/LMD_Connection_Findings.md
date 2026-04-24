# LMD (Linde Medical Direct) Connection Findings

This document summarizes the technical requirements and connectivity status for the LMD API, based on the analysis of the project's development scripts.

## 1. Authentication Process
Authentication is a two-step process handled via a WCF REST service.

*   **Login Endpoint**: `https://lindemedicaldirect.com/fr/AdS.Web.Services/AdSService.svc/LoginRest/Login`
*   **Method**: `POST`
*   **Payload Structure**:
    ```json
    {
        "applicationUser": {
            "Domain": "...",
            "Username": "...",
            "Password": "..."
        },
        "logInfo": {
            "Application": { "Name": "LMDm" }
        }
    }
    ```
*   **Response**: Returns an `ApplicationToken` (Token string) required for all subsequent data requests.

## 2. Automated Token Handling
The project already contains an automation layer in `DEV/LDMm/LMD_connect/static/retreive_data/auth.py`.
*   **Function**: `get_token()`
*   **Configuration**: Reads credentials from `auth_config.ini`.
*   **Usage**: You do **not** need to manually fetch tokens if using the internal `auth.py` library.

## 3. Connectivity & Network Constraints
*   **Public Status**: The endpoint is **not publicly accessible**. A GET request returns a 404, and the root domain shows a default Microsoft Azure landing page.
*   **Proxy Requirement**: Connection requires an internal proxy/VPN. The scripts point to a private IP: `10.132.5.7:8080`.
*   **Environment**: Connection will only succeed when running from a machine within the authorized network (e.g., Hospital/Linde internal network or VPN).

## 4. Credential Hosting Workarounds
Since credentials cannot be hosted on the university server, the following strategies are proposed:

| Workaround | Description | Best For |
| :--- | :--- | :--- |
| **Local ETL (Extract)** | Run scripts locally to fetch data to CSV/JSON, then upload clean data to the server. | One-time copy or manual updates. |
| **Env Variables** | Store credentials in server environment memory rather than files. | Automated scripts (if allowed). |
| **JIT Token Injection** | Local script gets token; you paste it into the server script manually at runtime. | Maximum security; no credentials on server. |

## 6. Verification Steps (For Supervisor)
Since the supervisor has access to the internal proxy, they can verify the endpoint using these steps:

### A. Connectivity Test (Quick Check)
Use `curl` to see if the server responds through the proxy.
```bash
# Replace with actual proxy credentials/IP if different from code
export https_proxy="http://e7bm36:password@10.132.5.7:8080"
curl -I https://lindemedicaldirect.com/fr/AdS.Web.Services/AdSService.svc/LoginRest/Login
```
*Expected Result*: A response from the server (e.g., HTTP 405 or 200) rather than a timeout.

### B. Authentication Test (Python)
Run this minimal script to verify the credentials and the proxy connection:
```python
import requests
import json

proxies = {
    "http": "http://e7bm36:password@10.132.5.7:8080",
    "https": "http://e7bm36:password@10.132.5.7:8080"
}

url = "https://lindemedicaldirect.com/fr/AdS.Web.Services/AdSService.svc/LoginRest/Login"
payload = {
    "applicationUser": {
        "Domain": "YOUR_DOMAIN",
        "Username": "YOUR_USERNAME",
        "Password": "YOUR_PASSWORD"
    },
    "logInfo": { "Application": { "Name": "LMDm" } }
}

try:
    r = requests.post(url, data=json.dumps(payload), proxies=proxies, timeout=10)
    print(f"Status Code: {r.status_code}")
    print(f"Token: {r.json()['Value']['ApplicationToken']['Token']}")
except Exception as e:
    print(f"Connection Failed: {e}")
```

### C. Data Access Verification
Verify that the token can actually pull data:
```python
# Using the Token from step B
data_url = "https://lindemedicaldirect.com/fr/AdS.Web.Services/AdSService.svc/PatientRest/GetPatientTreatment"
data_payload = {
    "treatment": { "Patient": { "Id": 56469 } },
    "logInfo": {
        "Token": "PASTE_TOKEN_HERE",
        "Application": { "Name": "LMDm" },
        "User": { "Language": "fr-FR" }
    }
}
r = requests.post(data_url, data=json.dumps(data_payload), proxies=proxies)
print(r.json())
```

### D. Manual Verification (via Postman)
If your supervisor prefers using a GUI tool like Postman, they should follow these steps:

1.  **Configure Proxy in Postman**:
    *   Go to **Settings** (Gear icon) -> **Proxy**.
    *   Enable **Global Proxy Configuration**.
    *   Set **Proxy Server** to `10.132.5.7` and **Port** to `8080`.
    *   Enable **Proxy Authentication** and enter the username (`e7bm36`) and password if required.

2.  **Setup Authentication Request**:
    *   **Method**: `POST`
    *   **URL**: `https://lindemedicaldirect.com/fr/AdS.Web.Services/AdSService.svc/LoginRest/Login`
    *   **Headers**: Add `Content-Type: application/json`.
    *   **Body**: Select **raw** and **JSON**, then paste:
        ```json
        {
            "applicationUser": {
                "Domain": "YOUR_DOMAIN",
                "Username": "YOUR_USERNAME",
                "Password": "YOUR_PASSWORD"
            },
            "logInfo": { "Application": { "Name": "LMDm" } }
        }
        ```

3.  **Send & Verify**:
    *   Click **Send**.
    *   **Success**: You should receive a `200 OK` with a JSON response containing `Value.ApplicationToken.Token`.
    *   **Failure**: If you get a timeout, the proxy is likely blocked or configured incorrectly.

---

## 5. Data Retrieval Endpoints
Commonly used endpoints discovered in the scripts:
*   **Patient Search**: `.../TreatmentGlobalSearchRest/GetTreatmentsGlobalSearch`
*   **Patient Details**: `.../PatientRest/GetPatientTreatment`
*   **Indicators**: `.../TreatmentRest/GetTreatmentProgressIndicators`
