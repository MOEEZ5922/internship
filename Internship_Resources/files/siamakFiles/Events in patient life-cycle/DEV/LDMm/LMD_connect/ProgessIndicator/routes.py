from flask import request, jsonify
from flask_api import status
from sqlalchemy.exc import SQLAlchemyError

from Patient.model import Patient, get_date
from ProgessIndicator import progress_indicator_blueprint
from ProgessIndicator.model import ProgressIndicator, ProgressIndicatorType
from database import db_session


@progress_indicator_blueprint.route("/", methods=['GET', 'POST'])
def add_progress_indicator():
    if request.method == 'POST':
        new_progress_indicator = request.get_json(force=True)

        new_progress_indicator = ProgressIndicator(new_progress_indicator['Id'],
                                                   new_progress_indicator['id_progress_indicator_type'],
                                                   new_progress_indicator['id_treatment'],
                                                   new_progress_indicator['creation_date'],
                                                   new_progress_indicator['value'],
                                                   new_progress_indicator['measurement_date'])

        db_session.merge(new_progress_indicator)
        try:
            db_session.commit()
            return jsonify(new_progress_indicator.to_json()), status.HTTP_201_CREATED
        except SQLAlchemyError as e:
            print(e)
            return "error", status.HTTP_409_CONFLICT


@progress_indicator_blueprint.route("/type/", methods=['GET', 'POST'])
def add_progress_indicator_type():
    if request.method == 'POST':
        new_progress_indicator_type = request.get_json(force=True)
        new_progress_indicator_type = ProgressIndicatorType(new_progress_indicator_type['Id'],
                                                            new_progress_indicator_type['min_value'],
                                                            new_progress_indicator_type['max_value'],
                                                            new_progress_indicator_type['description'],
                                                            new_progress_indicator_type['units'],
                                                            new_progress_indicator_type['classification'],
                                                            new_progress_indicator_type['field_type'])
        db_session.merge(new_progress_indicator_type)
        try:
            db_session.commit()
            return jsonify(new_progress_indicator_type.to_json()), status.HTTP_201_CREATED
        except SQLAlchemyError as e:
            print(e)
            return "error", status.HTTP_409_CONFLICT
