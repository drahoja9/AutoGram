import os
import json
from flask import Flask, Blueprint, request, jsonify

from backend import logic_layer


def create_app(test_config=None):
    # Create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
    )

    if test_config is None:
        # Load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # Load the test config if passed in
        app.config.from_mapping(test_config)

    # Ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    app.register_blueprint(bp)

    return app


bp = Blueprint('AutoGramAPI', __name__, url_prefix='/api')


@bp.route('/algorithms/<string:algorithm_name>', methods=['POST'])
def algorithms(algorithm_name: str):
    response = logic_layer.simple_algorithm(request.get_json(), algorithm_name)
    return jsonify(response)
