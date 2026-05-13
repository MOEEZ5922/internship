from flask import Blueprint

treatment_blueprint = Blueprint('treatment', __name__, url_prefix='/treatment/')

#  Import Views/routes
from . import routes
