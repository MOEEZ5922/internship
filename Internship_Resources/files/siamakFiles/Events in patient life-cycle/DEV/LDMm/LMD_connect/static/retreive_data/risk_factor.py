import json

from requests import *

from RiskFactor.model import RiskFactor, RiskFactorType
from static.retreive_data.auth import proxyDict
import pandas as pd

logger3 = logging.getLogger('3')
logger3.addHandler(logging.FileHandler('risk_factor.log'))

risk_factor_df = pd.read_csv("../../data/LHARI_dbo_treatment_risk_factor.csv", sep=";")
risk_factor_type_df = pd.read_csv("../../data/LHARI_dbo_risk_factor_type.csv", sep=";")


def get_risk_factor(treatment_id, token):
    payload = {
        "properties": [
            {
                "PropertyType": 1,
                "Name": "CreationDate"
            },
            {
                "PropertyType": 1,
                "Name": "Id"
            },
            {
                "PropertyType": 1,
                "Name": "RiskFactorType.ChildRiskFactorRelationship.ParentRiskFactor.Id"
            },
            {
                "PropertyType": 1,
                "Name": "RiskFactorType.Id"
            },
            {
                "PropertyType": 1,
                "Name": "RiskFactorType.NameLanguageString.Text"
            },
            {
                "PropertyType": 1,
                "Name": "RiskFactorType.ShowValue"
            },
            {
                "PropertyType": 1,
                "Name": "Treatment.Id"
            },
            {
                "PropertyType": 1,
                "Name": "Value"
            }
        ],
        "filter": [
            {
                "TypeInfo": "ValueFilter",
                "FilterOperator": 2,
                "LogicOperator": 1,
                "OpenParenthesis": 1,
                "CloseParenthesis": 0,
                "Property": {
                    "PropertyType": 1,
                    "Name": "Treatment.Id"
                },
                "Value": treatment_id
            },
            {
                "TypeInfo": "ValueFilter",
                "FilterOperator": 2,
                "LogicOperator": 1,
                "OpenParenthesis": 0,
                "CloseParenthesis": 1,
                "Property": {
                    "PropertyType": 1,
                    "Name": "RiskFactorPersonType.PersonType.Id"
                },
                "Value": 1
            }
        ],
        "order": [
            {
                "OrderType": 4,
                "Property": {
                    "PropertyType": 1,
                    "Name": "CreationDate"
                }
            }
        ],
        "pageInfo": {
            "PageNumber": 1,
            "PageSize": 0,
            "CalculateCountItems": True
        },
        "logInfo": {
            "Token": token,
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
        url='https://lindemedicaldirect.com/fr/AdS.Web.Services/AdSService.svc/TreatmentRiskFactorHistoryRest/GetGroupedTreatmentRiskFactorsHistory2',
        data=json.dumps(payload), proxies=proxyDict)
    try:
        return r.json()
    except ValueError:
        print("Risk Factor error")
        logger3.warning(treatment_id)
        return "error"


def add_risk_factor(treatment_id, token):
    _raw_risk_factor = get_risk_factor(treatment_id, token)
    if 'Value' in _raw_risk_factor:
        raw_value = _raw_risk_factor['Value']
        for raw_risk_factors in raw_value:
            raw_treatment_risk_factors_history = raw_risk_factors['TreatmentRiskFactorsHistory']
            for raw_treatment_risk_factor_history in raw_treatment_risk_factors_history:

                new_risk_factor = RiskFactor(
                    raw_treatment_risk_factor_history['Id'],
                    raw_treatment_risk_factor_history['RiskFactorType']['Id'],
                    treatment_id,
                    raw_treatment_risk_factor_history['CreationDate'],
                    raw_treatment_risk_factor_history["Value"])

                raw_risk_factor_type = raw_treatment_risk_factor_history['RiskFactorType']

                new_risk_factor_type = RiskFactorType(
                    raw_risk_factor_type['Id'],
                    raw_risk_factor_type['FactorType'],
                    raw_risk_factor_type['Name'])

                if new_risk_factor_type.id not in risk_factor_type_df['id'].values:
                    r = post(url='http://127.0.0.1:5000/risk/factor/type/',
                             data=json.dumps(new_risk_factor_type.to_json()))
                    if r.status_code >= 400:
                        logger3.warning(treatment_id)
                        print(new_risk_factor_type.to_json())

                if new_risk_factor.id not in risk_factor_df['id'].values:
                    r = post(url='http://127.0.0.1:5000/risk/factor/',
                             data=json.dumps(new_risk_factor.to_json()))
                    if r.status_code >= 400:
                        logger3.warning(treatment_id)
                        print(new_risk_factor.to_json())
