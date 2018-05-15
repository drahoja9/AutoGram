"""

`Flask`_ API for AutoGram's backend, containing app factory and API views.

.. _Flask: http://flask.pocoo.org/

.. module:: api
    :platform: Unix
    :synopsis: Flask API for AutoGram's backend, containing app factory and API views.

.. moduleauthor:: Jakub Drahos <drahoja9@fit.cvut.cz>

"""

import os

from flask import Flask, Blueprint, jsonify, request, Response
from flask_cors import CORS
from werkzeug.http import HTTP_STATUS_CODES

from backend import logic_layer, AlgorithmTypes


def create_app(test_config=None) -> Flask:
    """

    Flask app factory.

    Creates Flask app, loads configuration from `instance/config.py` (if available) or from ``test_config`` parameter
    and registers API blueprint.

    :param test_config: configuration mapping for testing purposes

    :return: instance of :class:`~flask.Flask`

    """
    # Create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    # Setting up a Cross-Origin Resource Sharing (for any origin as this is supposed to be a public API)
    CORS(app, resources={r"/api/*": {"origins": "*"}})
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


def _error_response(status_code: int, message: str = None, exc_type: str = None) -> Response:
    """

    Helper function for creating error response.

    Takes status code, generates appropriate text description and adds error message and exception type. Structure of
    JSON response is:

    .. code-block:: JSON

        {
            "error": <status code, short message describing what given status code means>,
            "message": <description of what went wrong>,
            "type": <name of exception class that was raised and caught>
        }

    :param status_code: HTTP status code
    :param message: description of error
    :param exc_type: type of exception that was caught

    :return: instance of :class:`~flask.Response` representing JSON response, containing error code, message and \
    exception type

    """
    payload = {'error': '{0}, {1}'.format(status_code, HTTP_STATUS_CODES.get(status_code, 'Unknown error'))}
    if message:
        payload['message'] = message
    if exc_type:
        payload['type'] = exc_type
    response = jsonify(payload)
    response.status_code = status_code

    return response


def _bad_request(message: str, exc_type: str) -> Response:
    """

    Helper function for sending bad request.

    Takes message, exception type and returns error response with status code 400.

    :param message: description of error
    :param exc_type: type of exception that was caught

    :return: instance of :class:`~flask.Response` representing JSON response, containing error code, message and \
    exception type

    """
    return _error_response(400, message, exc_type)


def _internal_error(message: str, exc_type: str) -> Response:
    """

    Helper function for sending internal error.

    Takes message, exception type and returns error response with status code 500.

    :param message: description of error
    :param exc_type: type of exception that was caught

    :return: instance of :class:`~flask.Response` representing JSON response, containing error code, message and \
    exception type

    """
    return _error_response(500, message, exc_type)

# --------------------------------------------------- Views -----------------------------------------------------------


bp = Blueprint('AutoGramAPI', __name__, url_prefix='/api')


@bp.route('/algorithms/<string:algorithm_name>', methods=['POST'])
def algorithms(algorithm_name: str) -> Response:
    """

    Algorithms view.

    Checks for correct algorithm name (returns bad request (400) if not valid) and calls given algorithm through
    :func:`backend.logic_layer.simple_algorithm`. Currently supported algorithm names are:

        * ``'automaton_determinization'``
        * ``'automaton_epsilon'``
        * ``'grammar_reduction'``
        * ``'grammar_epsilon'``
        * ``'grammar_unit'``
        * ``'grammar_cnf'``
        * ``'grammar_left_recursion'``
        * ``'regexp_derivation'``

    :param algorithm_name: `string` representing name of the algorithm

    :return: instance of :class:`~flask.Response` representing JSON response (structure of JSON depends on given \
    algorithm)

    """
    if algorithm_name not in AlgorithmTypes():
        return _bad_request('Invalid algorithm_name parameter', 'API')

    response = logic_layer.simple_algorithm(request.get_json(), algorithm_name)

    if 'exception' in response:
        return _bad_request(response['exception'], response['type'])

    return jsonify(response)


@bp.route('/transformation', methods=['POST'])
def transformation() -> Response:
    """

    Transformation view.

    Performs no validation, just passes given JSON to :func:`backend.logic_layer.transformation` for transformation.

    :return: instance of :class:`~flask.Response` representing JSON response (structure of JSON depends on output type)

    """
    response = logic_layer.transformation(request.get_json())

    if 'exception' in response:
        return _bad_request(response['exception'], response['type'])

    return jsonify(response)


@bp.route('/comparison', methods=['POST'])
def comparison() -> Response:
    """

    Comparison view.

    Performs no validation, just passes given JSON to :func:`backend.logic_layer.comparison` for comparison. Structure
    of JSON is:

    .. code-block:: JSON

        {
            "result": <true/false>
        }

    :return: instance of :class:`~flask.Response` representing JSON response

    """
    response = logic_layer.comparison(request.get_json())

    if 'exception' in response:
        return _bad_request(response['exception'], response['type'])

    return jsonify(response)
