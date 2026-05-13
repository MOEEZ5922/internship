from flask import request, jsonify
from flask_api import status
from sqlalchemy.exc import SQLAlchemyError

from Treatment import treatment_blueprint
from Treatment.model import Treatment
from database import db_session


@treatment_blueprint.route("/", methods=['GET', 'POST'])
def add_treatment():
    if request.method == 'POST':
        new_treatment = request.get_json(force=True)
        new_treatment = Treatment(new_treatment['id'], new_treatment['patient_id'], new_treatment['trc_treatment_id'],
                                  new_treatment['trc_rendered_treatment'])
        db_session.merge(new_treatment)
        try:
            db_session.commit()
            return jsonify(new_treatment.to_json()), status.HTTP_201_CREATED
        except SQLAlchemyError as e:
            print(e)
            return "error", status.HTTP_409_CONFLICT
