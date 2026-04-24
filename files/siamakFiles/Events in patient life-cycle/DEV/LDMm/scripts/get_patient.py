import requests, json

url = "https://lindemedicaldirect.com/fr/AdS.Web.Services/AdSService.svc/PatientRest/GetPatientTreatment"
data = {
    "treatment": {
        "Patient": {
            "Id": 56469
        }
    },
    "logInfo": {
        "Token": "5beb8f8e-d1d8-46d7-a1a1-3c99972a221f",
        "Application": {
            "Name": "LMDm"
        },
        "User": {
            "Language": "fr-FR"
        }
    }
}
headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
r = requests.post(url, data=json.dumps(data), headers=headers)
print(r.json()["Value"])
