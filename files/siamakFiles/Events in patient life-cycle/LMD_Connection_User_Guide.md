# LMD Connection: Verification & Troubleshooting Guide

This guide is designed to help you verify if your computer can successfully connect to the **Linde Medical Direct (LMD)** service. This is a critical step to ensure our data sync process works.

---

## 📋 1. Prerequisites

Before starting, ensure you have the following:

1. **Network Access**: You must be connected to the internal hospital/university network or have your **VPN active**.
2. **Python Installed**: You must have Python installed on your computer.
3. **Credentials**: You will need the specific LMD Username, Password, and Domain (provided separately).

---

## 🛠️ 2. Setup Instructions (One-Time)

### Step A: Install the Connection Tool

1. Open your **Command Prompt** (on Windows, search for `cmd` in the start menu).
2. Type the following and press **Enter**:
   
   ```bash
   pip install requests
   ```
   
   *Wait for it to finish. If it says "Successfully installed," you are ready.*

### Step B: Prepare the Test Script

1. Create a new folder on your desktop named `LMD_Test`.
2. Inside that folder, create a new text file and rename it to `verify_lmd.py`.
3. Open that file with Notepad and **paste the following code entirely**:

```python
import requests
import json
import urllib3

# Suppress warnings for internal proxy setup
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# ==========================================
# 1. ENTER YOUR CREDENTIALS HERE
# ==========================================
PROXY_USER = "ENTER_PROXY"
PROXY_PASS = "ENTER_PASSWORD"  # From your config
LMD_DOMAIN = "ENTER_DOMAIN"
LMD_USER = "ENTER_USERNAME"
LMD_PASS = "ENTER_PASSWORD"
# ==========================================

PROXY_URL = f"http://{PROXY_USER}:{PROXY_PASS}@10.132.5.7:8080"
BASE_URL = "https://lindemedicaldirect.com/fr/AdS.Web.Services/AdSService.svc"

proxies = {"http": PROXY_URL, "https": PROXY_URL}

def test_lmd_connection():
    print("--- [TEST 1/2] AUTHENTICATION ---")
    login_url = f"{BASE_URL}/LoginRest/Login"
    login_payload = {
        "applicationUser": {"Domain": LMD_DOMAIN, "Username": LMD_USER, "Password": LMD_PASS},
        "logInfo": {"Application": {"Name": "LMDm"}}
    }
    try:
        r = requests.post(login_url, json=login_payload, proxies=proxies, timeout=15, verify=False)
        if r.status_code == 200:
            token = r.json()['Value']['ApplicationToken']['Token']
            print("SUCCESS: Login passed.")

            print("\n--- [TEST 2/2] DATA ACCESS ---")
            data_url = f"{BASE_URL}/PatientRest/GetPatientTreatment"
            data_payload = {
                "treatment": {"Patient": {"Id": 56469}},
                "logInfo": {"Token": token, "Application": {"Name": "LMDm"}, "User": {"Language": "fr-FR"}}
            }
            r_data = requests.post(data_url, json=data_payload, proxies=proxies, timeout=15, verify=False)
            if r_data.status_code == 200:
                print("SUCCESS: Data retrieved.")
            else:
                print(f"FAILED: Data fetch returned {r_data.status_code}")
        else:
            print(f"FAILED: Login returned {r.status_code}")
    except Exception as e:
        print(f"ERROR: Could not connect.\nDetails: {e}")

if __name__ == "__main__":
    test_lmd_connection()
```

4. **Save and close the file.**

---

## 🚀 3. How to Run the Test

1. Open your **Command Prompt**.
2. Navigate to your folder by typing:
   
   ```bash
   cd Desktop\LMD_Test
   ```
3. Run the test by typing:
   
   ```bash
   python verify_lmd.py
   ```

---

## ✅ 4. Understanding the Results

### If it works (Success)

You will see two green lights:

* `SUCCESS: Login passed.`
* `SUCCESS: Data retrieved.`

**Action**: Take a screenshot and send it to the development team. You are ready!

### If it fails (Failure)

The script will tell you exactly what went wrong. Look for these messages:

| Message                  | What it means                           | Solution                                                             |
|:------------------------ |:--------------------------------------- |:-------------------------------------------------------------------- |
| **"Could not connect"**  | Your computer cannot see the proxy.     | Check if your VPN is turned on.                                      |
| **"Login returned 401"** | Your LMD username or password is wrong. | Double-check your spelling and caps-lock.                            |
| **"Login returned 403"** | Your account does not have permission.  | Contact the LMD administrator for access.                            |
| **"SSLError"**           | A network security block occurred.      | The script is already set to ignore this; contact IT if it persists. |

---

## ❓ 5. Troubleshooting FAQ

**Q: "python" is not recognized as a command.**

* *Solution*: Python might not be in your "PATH." Try typing `python3` instead of `python`. If that fails, Python may not be installed.

**Q: The window closes immediately after running.**

* *Solution*: Make sure you are running the script inside the Command Prompt window (as shown in Section 3), not by double-clicking the file.

**Q: I get a "Timeout" error.**

* *Solution*: This almost always means the network is blocking the request. Ensure you are on the correct WiFi or VPN.

---

## 📧 6. Support

If you cannot resolve an error, please provide the following to the tech team:

1. A screenshot of the Command Prompt window.
2. Confirmation of whether you are on VPN or the local network.
