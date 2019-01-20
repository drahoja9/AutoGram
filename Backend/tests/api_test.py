"""

Testing module for module :mod:`~backend.api`, using `pytest`_ library.



.. _pytest: https://pytest.org/

.. module:: api_test
    :platform: Unix
    :synopsis: Testing module for module api.py, using pytest library.

.. moduleauthor:: Jakub Drahos <drahoja9@fit.cvut.cz>, Dominika Kralikova <kralidom@fit.cvut.cz>

"""

import pytest
import os
import json

from flask import Flask
from flask.testing import FlaskClient

from backend import AlgorithmTypes
from backend.api import create_app


# ------------------------------------------------- Helpers -----------------------------------------------------------


ALGO = os.path.dirname(__file__) + '/examples/jsonTojson/ALGO'
CMP = os.path.dirname(__file__) + '/examples/jsonTojson/CMP'
TRAN = os.path.dirname(__file__) + '/examples/jsonTojson/TRAN'


def read_input(input_file: str) -> str:
    """

    Helper function for reading JSON contents from a file.

    :param input_file: path to JSON file containing input

    :return: `string` representing JSON input from given file
    """
    with open(input_file, 'r') as f:
        json_input = f.read()
    return json.loads(json_input)


# --------------------------------------------------- Fixtures --------------------------------------------------------


@pytest.fixture(scope='function')
def test_app() -> Flask:
    """

    PyTest fixture for creating instance of the Flask app for each testing function.

    :return: instance of Flask

    """
    app = create_app({'TESTING': True})
    assert app.config['TESTING'] is True
    return app


@pytest.fixture(scope='function')
def test_client(test_app: Flask) -> FlaskClient:
    """

    PyTest fixture for creating instance of testing client derived from Flask app for each testing function.

    :param test_app: instance of Flask
    :return: instance of Flask test client

    """
    return test_app.test_client()


# ------------------------------------------------------- Test --------------------------------------------------------


@pytest.mark.parametrize('input_file, algorithm, result_file', [
    (ALGO + '/CFGEPS1.json', AlgorithmTypes.GRAMMAR_EPSILON_REMOVAL, ALGO + '/CFGEPS1_RES.json'),
    (ALGO + '/CFGEPS2.json', AlgorithmTypes.GRAMMAR_EPSILON_REMOVAL, ALGO + '/CFGEPS2_RES.json'),
    (ALGO + '/CFGRED1.json', AlgorithmTypes.GRAMMAR_REDUCTION, ALGO + '/CFGRED1_RES.json'),
    (ALGO + '/CFGRED2.json', AlgorithmTypes.GRAMMAR_REDUCTION, ALGO + '/CFGRED2_RES.json'),
    (ALGO + '/CFGUNI1.json', AlgorithmTypes.GRAMMAR_UNIT_RULES_REMOVAL, ALGO + '/CFGUNI1_RES.json'),
    (ALGO + '/CFGUNI2.json', AlgorithmTypes.GRAMMAR_UNIT_RULES_REMOVAL, ALGO + '/CFGUNI2_RES.json'),
    (ALGO + '/CNF1.json', AlgorithmTypes.GRAMMAR_CNF_CONVERSION, ALGO + '/CNF1_RES.json'),
    (ALGO + '/CNF2.json', AlgorithmTypes.GRAMMAR_CNF_CONVERSION, ALGO + '/CNF2_RES.json'),
    (ALGO + '/DER1.json', AlgorithmTypes.REGEXP_DERIVATION, ALGO + '/DER1_RES.json'),
    (ALGO + '/DER2.json', AlgorithmTypes.REGEXP_DERIVATION, ALGO + '/DER2_RES.json'),
    (ALGO + '/DER3.json', AlgorithmTypes.REGEXP_DERIVATION, ALGO + '/DER3_RES.json'),
    (ALGO + '/DER4.json', AlgorithmTypes.REGEXP_DERIVATION, ALGO + '/DER4_RES.json'),
    (ALGO + '/DER5.json', AlgorithmTypes.REGEXP_DERIVATION, ALGO + '/DER5_RES.json'),
    (ALGO + '/DER6.json', AlgorithmTypes.REGEXP_DERIVATION, ALGO + '/DER6_RES.json'),
    (ALGO + '/DET1.json', AlgorithmTypes.AUTOMATON_DETERMINIZATION, ALGO + '/DET1_RES.json'),
    (ALGO + '/DET2.json', AlgorithmTypes.AUTOMATON_DETERMINIZATION, ALGO + '/DET2_RES.json'),
    (ALGO + '/DET3.json', AlgorithmTypes.AUTOMATON_DETERMINIZATION, ALGO + '/DET3_RES.json'),
    (ALGO + '/DET4.json', AlgorithmTypes.AUTOMATON_DETERMINIZATION, ALGO + '/DET4_RES.json'),
    (ALGO + '/EPS1.json', AlgorithmTypes.AUTOMATON_EPSILON_REMOVAL, ALGO + '/EPS1_RES.json'),
    (ALGO + '/EPS2.json', AlgorithmTypes.AUTOMATON_EPSILON_REMOVAL, ALGO + '/EPS2_RES.json'),
    (ALGO + '/REC1.json', AlgorithmTypes.GRAMMAR_LEFT_RECURSION_REMOVAL, ALGO + '/REC1_RES.json'),
    (ALGO + '/REC2.json', AlgorithmTypes.GRAMMAR_LEFT_RECURSION_REMOVAL, ALGO + '/REC2_RES.json'),
    (ALGO + '/REC3.json', AlgorithmTypes.GRAMMAR_LEFT_RECURSION_REMOVAL, ALGO + '/REC3_RES.json'),
    (ALGO + '/REC4.json', AlgorithmTypes.GRAMMAR_LEFT_RECURSION_REMOVAL, ALGO + '/REC4_RES.json'),
])
def test_algorithms(test_client: FlaskClient, input_file: str, algorithm: str, result_file: str):
    json_input = read_input(input_file)
    json_output = read_input(result_file)

    response = test_client.post('/api/algorithms/' + algorithm, json=json_input)
    json_response = response.get_json()

    assert json_response == json_output


@pytest.mark.parametrize('input_file, result_file', [
    (CMP + '/CMP1.json', CMP + '/CMP1_RES.json'),
    (CMP + '/CMP2.json', CMP + '/CMP2_RES.json'),
    (CMP + '/CMP3.json', CMP + '/CMP3_RES.json'),
    (CMP + '/CMP4.json', CMP + '/CMP4_RES.json'),
    (CMP + '/CMP5.json', CMP + '/CMP5_RES.json'),
    (CMP + '/CMP6.json', CMP + '/CMP6_RES.json'),
    (CMP + '/CMP7.json', CMP + '/CMP7_RES.json'),
    (CMP + '/CMP8.json', CMP + '/CMP8_RES.json'),
    (CMP + '/CMP9.json', CMP + '/CMP9_RES.json'),
    (CMP + '/CMP10.json', CMP + '/CMP10_RES.json'),
    (CMP + '/CMP11.json', CMP + '/CMP11_RES.json'),
    (CMP + '/CMP12.json', CMP + '/CMP12_RES.json'),
    (CMP + '/CMP13.json', CMP + '/CMP13_RES.json'),
    (CMP + '/CMP14.json', CMP + '/CMP14_RES.json'),
    (CMP + '/CMP15.json', CMP + '/CMP15_RES.json'),
    (CMP + '/CMP16.json', CMP + '/CMP16_RES.json'),
])
def test_comparison(test_client: FlaskClient, input_file: str, result_file: str):
    json_input = read_input(input_file)
    json_output = read_input(result_file)

    response = test_client.post('/api/comparison', json=json_input)
    json_response = response.get_json()

    assert json_response == json_output


@pytest.mark.parametrize('input_file, result_file', [
    (TRAN + '/TRAN1.json', TRAN + '/TRAN1_RES.json'),
    (TRAN + '/TRAN2.json', TRAN + '/TRAN2_RES.json'),
    (TRAN + '/TRAN3.json', TRAN + '/TRAN3_RES.json'),
    (TRAN + '/TRAN4.json', TRAN + '/TRAN4_RES.json'),
    (TRAN + '/TRAN5.json', TRAN + '/TRAN5_RES.json'),
    (TRAN + '/TRAN6.json', TRAN + '/TRAN6_RES.json'),
    (TRAN + '/TRAN7.json', TRAN + '/TRAN7_RES.json'),
    (TRAN + '/TRAN8.json', TRAN + '/TRAN8_RES.json'),
    (TRAN + '/TRAN9.json', TRAN + '/TRAN9_RES.json'),
    (TRAN + '/TRAN10.json', TRAN + '/TRAN10_RES.json'),
    (TRAN + '/TRAN12.json', TRAN + '/TRAN12_RES.json'),
    (TRAN + '/TRAN13.json', TRAN + '/TRAN13_RES.json'),
    (TRAN + '/TRAN14.json', TRAN + '/TRAN14_RES.json'),
    (TRAN + '/TRAN15.json', TRAN + '/TRAN15_RES.json'),
    (TRAN + '/TRAN16.json', TRAN + '/TRAN16_RES.json'),
    (TRAN + '/TRAN17.json', TRAN + '/TRAN17_RES.json'),
    (TRAN + '/TRAN18.json', TRAN + '/TRAN18_RES.json'),
])
def test_transformation(test_client: FlaskClient, input_file: str, result_file: str):
    json_input = read_input(input_file)
    json_output = read_input(result_file)

    response = test_client.post('/api/transformation', json=json_input)
    json_response = response.get_json()

    assert json_response == json_output


def test_api_fails(test_client: FlaskClient):
    response = test_client.post('/api/wrong_path')
    assert response.status == '404 NOT FOUND'

    response = test_client.get('/api/algorithms')
    assert response.status == '404 NOT FOUND'

    response = test_client.post('/api/algorithms/wrong_algorithm')
    assert response.status == '400 BAD REQUEST'

    input_file = read_input(TRAN + '/TRAN1.json')
    response = test_client.post('/api/algorithms/regexp_derivation', json=input_file)
    assert response.status == '400 BAD REQUEST'

    response = test_client.post('/api/comparison', json=input_file)
    assert response.status == '400 BAD REQUEST'

    input_file = read_input(ALGO + '/DER1.json')
    response = test_client.post('/api/transformation', json=input_file)
    assert response.status == '400 BAD REQUEST'
