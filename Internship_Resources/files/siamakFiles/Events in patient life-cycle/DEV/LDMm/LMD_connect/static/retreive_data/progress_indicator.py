import json

from requests import *

from ProgessIndicator.model import ProgressIndicator, ProgressIndicatorType
from static.retreive_data.auth import proxyDict
import pandas as pd

logger2 = logging.getLogger('2')
logger2.addHandler(logging.FileHandler('progress_indicator.log'))

progress_indicator_df = pd.read_csv("../../data/LHARI_dbo_treatment_progress_indicator.csv", sep=";")
progress_indicator_type_df = pd.read_csv("../../data/LHARI_dbo_progress_indicator_type.csv", sep=";")


def get_progress_indicator(treatment_id, token):
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
                "Name": "IsActive"
            },
            {
                "PropertyType": 1,
                "Name": "IsCurrent"
            },
            {
                "PropertyType": 1,
                "Name": "ProgressIndicatorType.DescriptionLanguageString.Text"
            },
            {
                "PropertyType": 1,
                "Name": "ProgressIndicatorType.FieldType"
            },
            {
                "PropertyType": 1,
                "Name": "ProgressIndicatorType.Id"
            },
            {
                "PropertyType": 1,
                "Name": "ProgressIndicatorType.MaxValue"
            },
            {
                "PropertyType": 1,
                "Name": "ProgressIndicatorType.MinValue"
            },
            {
                "PropertyType": 1,
                "Name": "ProgressIndicatorType.UnitOfMeasureLanguageString.Text"
            },
            {
                "PropertyType": 1,
                "Name": "Value"
            },
            {
                "PropertyType": 1,
                "Name": "MeasurementDate"
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
                    "Name": "ProgressIndicatorPersonType.PersonType.Id"
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
        url='https://lindemedicaldirect.com/fr/AdS.Web.Services/AdSService.svc/TreatmentProgressIndicatorHistoryRest/GetGroupedTreatmentProgressIndicatorsHistory2',
        data=json.dumps(payload), proxies=proxyDict)
    try:
        return r.json()
    except ValueError:
        print("progress indicator error")
        logger2.warning(treatment_id)
        return "error"


def add_progress_indicator(treatment_id, token):
    _raw_progress_indicator = get_progress_indicator(treatment_id, token)
    if 'Value' in _raw_progress_indicator:
        progress_indicators_data = _raw_progress_indicator['Value']
        for progress_indicator_data in progress_indicators_data:
            new_progress_indicator = ProgressIndicator(
                progress_indicator_data['TreatmentProgressIndicatorsHistory'][0]['Id'],
                progress_indicator_data['TreatmentProgressIndicatorsHistory'][0]['ProgressIndicatorType']['Id'],
                treatment_id,
                progress_indicator_data['CreationDate'],
                progress_indicator_data['TreatmentProgressIndicatorsHistory'][0]["Value"],
                progress_indicator_data['TreatmentProgressIndicatorsHistory'][0]["MeasurementDate"])

            raw_progress_indicator_type = progress_indicator_data['TreatmentProgressIndicatorsHistory'][0][
                'ProgressIndicatorType']
            new_progress_indicator_type = ProgressIndicatorType(
                raw_progress_indicator_type['Id'],
                raw_progress_indicator_type['MinValue'] if 'MinValue' in raw_progress_indicator_type else 0,
                raw_progress_indicator_type['MaxValue'] if 'MaxValue' in raw_progress_indicator_type else 0,
                raw_progress_indicator_type['Description'],
                raw_progress_indicator_type['UnitOfMeasure'],
                raw_progress_indicator_type['Classification'],
                raw_progress_indicator_type['FieldType'])

            if new_progress_indicator_type.id not in progress_indicator_type_df['id'].values:
                r = post(url='http://127.0.0.1:5000/progress/indicator/type/',
                         data=json.dumps(new_progress_indicator_type.to_json()))
                if r.status_code >= 400:
                    logger2.warning(treatment_id)
                    print(new_progress_indicator_type.to_json())

            if new_progress_indicator.id not in progress_indicator_df['id'].values:
                r = post(url='http://127.0.0.1:5000/progress/indicator/',
                         data=json.dumps(new_progress_indicator.to_json()))
                if r.status_code >= 400:
                    logger2.warning(treatment_id)
                    print(new_progress_indicator.to_json())
