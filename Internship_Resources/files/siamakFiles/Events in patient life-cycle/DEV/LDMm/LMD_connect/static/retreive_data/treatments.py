import json

from requests import *

from Treatment.model import Treatment
from static.retreive_data.auth import proxyDict

logger1 = logging.getLogger('1')
logger1.addHandler(logging.FileHandler('treatment.log'))


def get_treatment(treatment_id, token):
    payload = {
        "treatment": {
            "Id": treatment_id
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
    r = post(
        url='https://lindemedicaldirect.com/fr/AdS.Web.Services/AdSService.svc/TreatmentRest/GetTreatmentSummary',
        data=json.dumps(payload), proxies=proxyDict)
    try:
        res = r.json()
        res = r.json()['Value']
        return r.json()
    except ValueError:
        print("Treatment error")
        logger1.warning(treatment_id)
        return None
    except KeyError:
        print("Treatment error keyerror")
        logger1.warning(treatment_id)
        return None


def add_treatment(treatment_id, token):
    raw_treatment_data = get_treatment(treatment_id, token)['Value']
    if raw_treatment_data is not None:
        if 'TreatmentTreatmentCodes' in raw_treatment_data:
            new_treatment = Treatment(raw_treatment_data['Id'], raw_treatment_data['Patient']['Id'],
                                      raw_treatment_data['TreatmentTreatmentCodes'][0]['Code'],
                                      raw_treatment_data['TreatmentTreatmentCodes'][0]['SubCode'])
        else:
            new_treatment = Treatment(raw_treatment_data['Id'], raw_treatment_data['Patient']['Id'],
                                      -1,
                                      -1)
        r = post(url='http://127.0.0.1:5000/treatment/', data=json.dumps(new_treatment.to_json()))
        if r.status_code >= 400:
            print(new_treatment.to_json())
            logger1.warning(treatment_id)
            return None
        return new_treatment
    else:
        return None
