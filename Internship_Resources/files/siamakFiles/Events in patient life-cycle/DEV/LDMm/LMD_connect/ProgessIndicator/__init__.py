from flask import Blueprint

progress_indicator_blueprint = Blueprint('progress_indicator_factor', __name__, url_prefix='/progress/indicator/')

#  Import Views/routes
from . import routes
