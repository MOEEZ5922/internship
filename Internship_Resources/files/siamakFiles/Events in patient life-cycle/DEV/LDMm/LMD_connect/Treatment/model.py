import datetime

from sqlalchemy import Table, Column, Integer, ForeignKey
from sqlalchemy.orm import mapper

from database import db_session, metadata


class Treatment(object):
    query = db_session.query_property()

    def __init__(self, treatment_id, patient_id, trc_treatment_id, trc_rendered_treatment):
        self.trc_rendered_treatment = trc_rendered_treatment
        self.trc_treatment_id = trc_treatment_id
        self.patient_id = patient_id
        self.id = treatment_id

    def __repr__(self):
        return '<User %r>' % self.id

    def to_json(self):  # New special method.
        return {
            'id': self.id,
            'patient_id': self.patient_id,
            'trc_treatment_id': self.trc_treatment_id,
            'trc_rendered_treatment': self.trc_rendered_treatment
        }


def get_date(date):
    res = datetime.datetime.strptime(date, '%Y-%m-%dT%H:%M:%SZ')
    print(res)
    return res


treatment = Table('treatment', metadata,
                  Column('id', Integer, primary_key=True),
                  Column('patient_id', Integer, ForeignKey('patient.id')),
                  Column('trc_treatment_id', Integer),
                  Column('trc_rendered_treatment', Integer)
                  )
mapper(Treatment, treatment)
