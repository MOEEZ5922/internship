import json
from requests import *
from static.retreive_data import auth
from static.retreive_data.auth import proxyDict
from static.retreive_data.risk_factor import add_risk_factor
from static.retreive_data.progress_indicator import add_progress_indicator
from static.retreive_data.treatments import add_treatment, logger1
import tqdm
import multiprocessing.dummy as mp
import logging
import pandas as pd

logger_patient = logging.getLogger('patient')
logger_patient.addHandler(logging.FileHandler('patient.log'))

patient_df = pd.read_csv("../../data/LHARI_dbo_patient.csv", sep=";")
treatment_df = pd.read_csv("../../data/LHARI_dbo_treatment.csv", sep=";")
progress_indicator_df = pd.read_csv("../../data/LHARI_dbo_treatment_progress_indicator.csv", sep=";")
risk_factor_df = pd.read_csv("../../data/LHARI_dbo_treatment_risk_factor.csv", sep=";")


def get_all_patients_id():
    TOKEN = auth.get_token()
    payload = {
        "activeViewType": 4,
        "properties": [
            {
                "PropertyType": 1,
                "Name": "Patient.Id"
            }
        ],
        "filter": [],
        "order": [
            {
                "OrderType": 4,
                "Property": {
                    "PropertyType": 1,
                    "Name": "Patient.Id"
                }
            }
        ],
        "pageInfo": {
            "PageNumber": 1,
            "PageSize": 1000000000,
            "CalculateCountItems": True
        },
        "logInfo": {
            "Token": TOKEN,
            "Application": {
                "Name": "LMDm"
            },
            "User": {
                "Language": "fr-FR"
            },
            "Tag": 4
        }
    }
    r = post(
        url="https://lindemedicaldirect.com/fr/AdS.Web.Services/AdSService.svc/TreatmentGlobalSearchRest/GetTreatmentsGlobalSearch",
        data=json.dumps(payload), proxies=proxyDict)
    return r.json()


def get_payload(patient_id, token):
    payload = {
        "treatment": {
            "Patient": {
                "Id": patient_id
            }
        },
        "logInfo": {
            "Token": token,
            "Application": {
                "Name": "LMDm"
            },
            "User": {
                "Language": "fr-FR"
            }
        }
    }
    return payload


# sending get request and saving the response as response object
# r = post(
#     url="https://lindemedicaldirect.com/fr/AdS.Web.Services/AdSService.svc/PatientRest/GetPatientTreatment",
#     data=json.dumps(get_payload(54317)))
#
# r = post(url="http://127.0.0.1:5000/patient/", data=json.dumps(r.json()))
#
# print(r.json())

def add_patient(patient_id):
    patient_id = patient_id
    if patient_id not in treatment_df['patient_id'].values:
        r = post(
            url="https://lindemedicaldirect.com/fr/AdS.Web.Services/AdSService.svc/PatientRest/GetPatientTreatment",
            data=json.dumps(get_payload(patient_id, token)), proxies=proxyDict)

        patient_request = post(url="http://127.0.0.1:5000/patient/", data=json.dumps(r.json()))
        if patient_request.status_code >= 400:
             print("error")
             logger_patient.warning(patient_id)

        print(patient_id)
        try:
            if r is not None:
                for treatment in r.json()['Value']['Treatments']:
                    treatment_test = add_treatment(treatment["Id"], token)
                    # add_progress_indicator(treatment["Id"], token)
                    # add_risk_factor(treatment["Id"], token)
                    # if treatment_test is not None:
                    #     _thread.start_new_thread(add_progress_indicator, (treatment["Id"], token,))
                    #     _thread.start_new_thread(add_risk_factor, (treatment["Id"], token,))
            else:
                logger1.warning(patient_id)
        except ValueError:
            print("Treatment error")
            logger1.warning(patient_id)
            return None
        except (KeyError, TypeError):
            print("Treatment error key/type error")
            logger1.warning(patient_id)
            return None


def add_treatment_indicator(treatment_id):
    add_progress_indicator(treatment_id, token)
    add_risk_factor(treatment_id, token)


token = auth.get_token()
print(token)
# for patient in all_patients['Value']:
#     add_patient(patient['Patient']['Id'])

p = mp.Pool(50)
p.map(add_patient, [patient_id for patient_id in patient_df['id']])
# p.map(add_treatment_indicator, [treatment_id for treatment_id in treatment_df['id']])
