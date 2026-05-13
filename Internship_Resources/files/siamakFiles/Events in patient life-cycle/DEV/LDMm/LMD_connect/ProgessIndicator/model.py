import datetime

from sqlalchemy import Table, Column, Integer, ForeignKey, String, DateTime, Float
from sqlalchemy.orm import mapper

from database import db_session, metadata


class ProgressIndicatorType(object):
    query = db_session.query_property()

    def __init__(self, progress_indicator_type_id, min_value, max_value, description, units, classification, field_type):
        self.field_type = field_type
        self.classification = classification
        self.units = units
        self.description = description
        self.max_value = max_value
        self.min_value = min_value
        self.id = progress_indicator_type_id

    def to_json(self):
        return {
            'Id': self.id,
            'min_value': self.max_value,
            'max_value': self.max_value,
            'description': self.description,
            'units': self.units,
            'classification': self.classification,
            'field_type': self.field_type
        }


progress_indicator_type = Table('progress_indicator_type', metadata,
                                Column('id', Integer, primary_key=True),
                                Column('min_value', Float),
                                Column('max_value', Float),
                                Column('description', String(50)),
                                Column('units', String(36)),
                                Column('classification', String(30)),
                                Column('field_type', String(5)),
                                )


class ProgressIndicator(object):
    query = db_session.query_property()

    def __init__(self, progress_indicator_id, id_progress_indicator_type, id_treatment, creation_date, value,
                 measurement_date):
        self.measurement_date = measurement_date
        self.value = value
        self.creation_date = creation_date
        self.id_treatment = id_treatment
        self.id_progress_indicator_type = id_progress_indicator_type
        self.id = progress_indicator_id

    def to_json(self):
        return {
            'Id': self.id,
            'value': self.value,
            'creation_date': self.creation_date,
            'id_treatment': self.id_treatment,
            'id_progress_indicator_type': self.id_progress_indicator_type,
            'measurement_date': self.measurement_date
        }


progress_indicator = Table('treatment_progress_indicator', metadata,
                           Column('id', Integer, primary_key=True),
                           Column('id_progress_indicator_type', Integer, ForeignKey('progress_indicator_type.id')),
                           Column('id_treatment', Integer, ForeignKey('treatment.id')),
                           Column('creation_date', DateTime),
                           Column('value', String(50)),
                           Column('measurement_date', DateTime)
                           )


def get_date(date):
    res = datetime.datetime.strptime(date, '%Y-%m-%dT%H:%M:%SZ')
    return res


mapper(ProgressIndicatorType, progress_indicator_type)
mapper(ProgressIndicator, progress_indicator)
