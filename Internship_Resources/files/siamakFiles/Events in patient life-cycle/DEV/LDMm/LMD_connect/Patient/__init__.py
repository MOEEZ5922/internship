from flask import Blueprint

patient_blueprint = Blueprint('patient', __name__, url_prefix='/patient/')

#  Import Views/routes
from . import routes
