from flask import request, jsonify
from flask_api import status
from sqlalchemy.exc import SQLAlchemyError

from RiskFactor import risk_factor_blueprint
from RiskFactor.model import RiskFactor, RiskFactorType
from database import db_session


@risk_factor_blueprint.route("/", methods=['GET', 'POST'])
def add_risk_factor():
    if request.method == 'POST':
        new_risk_factor = request.get_json(force=True)

        new_risk_factor = RiskFactor(new_risk_factor['Id'],
                                     new_risk_factor['id_risk_factor_type'],
                                     new_risk_factor['id_treatment'],
                                     new_risk_factor['creation_date'],
                                     new_risk_factor['value'])

        db_session.merge(new_risk_factor)
        try:
            db_session.commit()
            return jsonify(new_risk_factor.to_json()), status.HTTP_201_CREATED
        except SQLAlchemyError as e:
            print(e)
            return "error", status.HTTP_409_CONFLICT


@risk_factor_blueprint.route("/type/", methods=['GET', 'POST'])
def add_risk_factor_type():
    if request.method == 'POST':
        new_risk_factor_type = request.get_json(force=True)
        new_risk_factor_type = RiskFactorType(new_risk_factor_type['Id'],
                                              new_risk_factor_type['factor_type'],
                                              new_risk_factor_type['name'])
        db_session.merge(new_risk_factor_type)
        try:
            db_session.commit()
            return jsonify(new_risk_factor_type.to_json()), status.HTTP_201_CREATED
        except SQLAlchemyError as e:
            print(e)
            return "error", status.HTTP_409_CONFLICT
