import os
import json
from flask import Flask, Blueprint, request, jsonify
from werkzeug.http import HTTP_STATUS_CODES

from backend import logic_layer, AlgorithmTypes


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


# -------------------------------------------------- Errors -----------------------------------------------------------


def error_response(status_code, message = None):
    payload = {'error': HTTP_STATUS_CODES.get(status_code, 'Unknown error')}
    if message:
        payload['message'] = message
    response = jsonify(payload)
    response.status_code = status_code

    return response


def bad_request(message):
    return error_response(400, message)

# --------------------------------------------------- Views -----------------------------------------------------------


bp = Blueprint('AutoGramAPI', __name__, url_prefix='/api')


@bp.route('/algorithms/<string:algorithm_name>', methods=['POST'])
def algorithms(algorithm_name: str):
    if algorithm_name not in AlgorithmTypes():
        return bad_request('Invalid algorithm name')
    response = logic_layer.simple_algorithm(request.get_json(), algorithm_name)
    return jsonify(response)
