import datetime

import jsons

from sqlalchemy import Table, Column, Integer, String, DateTime
from sqlalchemy.orm import mapper
from database import db_session, metadata


class Patient(object):
    query = db_session.query_property()

    def __init__(self, patient_id, address, zip_code, town, full_name, data_protected_type,
                 creation_date, gender, trc_id):
        self.gender = gender
        self.trc_id = trc_id
        self.full_name = full_name
        self.town = town
        self.zip_code = zip_code
        self.creation_date = creation_date
        self.data_protected_type = data_protected_type
        self.address = address
        self.id = patient_id

        split_result = self.split_name()
        self.last_name = split_result[0]
        self.first_name = split_result[1]

    def __repr__(self):
        return '<User %r>' % self.id

    def split_name(self):
        return self.full_name.split(", ")

    def to_json(self):
        return {
            'patient_id': self.id,
            'first_name': self.first_name,
            'address': self.address,
            'full_name': self.full_name,
            'trc_id': self.trc_id
        }


def get_date(date):
    res = datetime.datetime.strptime(date, '%Y-%m-%dT%H:%M:%SZ')
    return res


patients = Table('patient', metadata,
                 Column('id', Integer, primary_key=True),
                 Column('first_name', String(50)),
                 Column('last_name', String(50)),
                 Column('address', String(100)),
                 Column('zip_code', Integer),
                 Column('town', String(50)),
                 Column('full_name', String(50)),
                 Column('data_protected_type', Integer),
                 Column('creation_date', DateTime),
                 Column('gender', String(5)),
                 Column('trc_id', Integer)
                 )
mapper(Patient, patients)
