import datetime

from sqlalchemy import Table, Column, Integer, ForeignKey, String, DateTime, Float
from sqlalchemy.orm import mapper

from database import db_session, metadata


class RiskFactorType(object):
    query = db_session.query_property()

    def __init__(self, risk_factor_type_id, factor_type, name):
        self.name = name
        self.factor_type = factor_type
        self.id = risk_factor_type_id

    def to_json(self):
        return {
            'Id': self.id,
            'factor_type': self.factor_type,
            'name': self.name
        }


risk_factor_type = Table('risk_factor_type', metadata,
                         Column('id', Integer, primary_key=True),
                         Column('factor_type', Integer),
                         Column('name', String(50))
                         )


class RiskFactor(object):
    query = db_session.query_property()

    def __init__(self, risk_factor_id, id_risk_factor_type, id_treatment, creation_date, value):
        self.value = value
        self.creation_date = creation_date
        self.id_treatment = id_treatment
        self.id_risk_factor_type = id_risk_factor_type
        self.id = risk_factor_id

    def to_json(self):
        return {
            'Id': self.id,
            'value': self.value,
            'creation_date': self.creation_date,
            'id_treatment': self.id_treatment,
            'id_risk_factor_type': self.id_risk_factor_type
        }


risk_factor = Table('treatment_risk_factor', metadata,
                    Column('id', Integer, primary_key=True),
                    Column('id_risk_factor_type', Integer, ForeignKey('risk_factor_type.id')),
                    Column('id_treatment', Integer, ForeignKey('treatment.id')),
                    Column('creation_date', DateTime),
                    Column('value', String(50)),
                    )

mapper(RiskFactorType, risk_factor_type)
mapper(RiskFactor, risk_factor)
