from flask import Blueprint

risk_factor_blueprint = Blueprint('risk_factor', __name__, url_prefix='/risk/factor/')

#  Import Views/routes
from . import routes
