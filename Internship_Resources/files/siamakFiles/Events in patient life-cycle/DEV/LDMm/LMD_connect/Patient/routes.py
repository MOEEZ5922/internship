from flask import request, jsonify
from flask_api import status
from sqlalchemy.exc import SQLAlchemyError

from Patient import patient_blueprint
from Patient.model import patients, Patient, get_date
from database import engine, db_session


@patient_blueprint.route("/", methods=['GET', 'POST'])
def add_patient():
    if request.method == 'POST':
        patient_value = request.get_json(force=True)["Value"]
        new_patient = Patient(patient_id=patient_value["Id"],
                              address=patient_value["Address"],
                              zip_code=patient_value["PostalCode"],
                              town=patient_value["Town"],
                              full_name=patient_value["FullName"],
                              data_protected_type=patient_value["DataProtectedType"],
                              creation_date=get_date(patient_value["PatientPatientCodes"][0]["CreationDate"]),
                              gender=patient_value["Gender"]["Name"],
                              trc_id=patient_value["PatientPatientCodes"][0]["Code"])
        db_session.merge(new_patient)
        try:
            db_session.commit()
            return jsonify(new_patient.to_json()), status.HTTP_201_CREATED
        except SQLAlchemyError as e:
            print(e)
            return "error", status.HTTP_409_CONFLICT
