from flask import Flask, app
# from flask_cors import CORS
from Patient.model import patients
from database import db_session, engine


######################################
#### Application Factory Function ####
######################################

def create_app(config_filename=None):
    app = Flask(__name__, instance_relative_config=True)
    # CORS(app)
    register_blueprints(app)
    return app


def register_blueprints(app):
    # Since the application instance is now created, register each Blueprint
    # with the Flask application instance (app)
    from Patient import patient_blueprint
    app.register_blueprint(patient_blueprint)

    from Treatment import treatment_blueprint
    app.register_blueprint(treatment_blueprint)

    from ProgessIndicator import progress_indicator_blueprint
    app.register_blueprint(progress_indicator_blueprint)

    from RiskFactor import risk_factor_blueprint
    app.register_blueprint(risk_factor_blueprint)


app = create_app()
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)

@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()
