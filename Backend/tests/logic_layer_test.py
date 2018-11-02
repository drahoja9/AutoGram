"""

Testing module for module :mod:`~backend.logic_layer`, using `pytest`_ library.

All tests are just copy-pasted from module :mod:`~tests.interface_test`. This way, when something goes wrong, we'll be
able to tell where exactly is the evildoing happening.

.. _pytest: https://pytest.org/

.. module:: logic_layer_test
    :platform: Unix
    :synopsis: Testing module for module logic_layer, using pytest library.

.. moduleauthor:: Jakub Drahos <drahoja9@fit.cvut.cz>

"""

import pytest
import os

from backend import logic_layer, XMLConverter, AlgorithmTypes
from backend.python_interface import AltInterfaceException

AUTOMATA = os.path.dirname(__file__) + '/examples/automaton'
GRAMMARS = os.path.dirname(__file__) + '/examples/grammar'
REGEXPS = os.path.dirname(__file__) + '/examples/regexp'


def read_input(input_file: str) -> str:
    """

    Helper function for reading XML contents from a file.

    :param input_file: path to XML file containing input

    :return: `string` representing XML input from given file
    """
    with open(input_file, 'r') as f:
        xml_input = f.read()
    return xml_input


@pytest.mark.parametrize('input_file, algorithm, result_type, optional_param', [
    (AUTOMATA + '/NFSM1.xml', AlgorithmTypes.AUTOMATON_DETERMINIZATION, 'DFA', None),
    (AUTOMATA + '/NFSM2.xml', AlgorithmTypes.AUTOMATON_DETERMINIZATION, 'DFA', None),
    (AUTOMATA + '/NFSM3.xml', AlgorithmTypes.AUTOMATON_DETERMINIZATION, 'DFA', None),
    (AUTOMATA + '/NFSM4.xml', AlgorithmTypes.AUTOMATON_DETERMINIZATION, 'DFA', None),
    (AUTOMATA + '/NFSM5.xml', AlgorithmTypes.AUTOMATON_DETERMINIZATION, 'DFA', None),
    (AUTOMATA + '/NFSM1.xml', AlgorithmTypes.AUTOMATON_TRIM, 'NFA', None),
    (AUTOMATA + '/NFSM2.xml', AlgorithmTypes.AUTOMATON_TRIM, 'NFA', None),
    (AUTOMATA + '/NFSM3.xml', AlgorithmTypes.AUTOMATON_TRIM, 'NFA', None),
    (AUTOMATA + '/NFSM4.xml', AlgorithmTypes.AUTOMATON_TRIM, 'NFA', None),
    (AUTOMATA + '/NFSM5.xml', AlgorithmTypes.AUTOMATON_TRIM, 'NFA', None),
    (AUTOMATA + '/ENFSM2.xml', AlgorithmTypes.AUTOMATON_EPSILON_REMOVAL, 'NFA', None),
    (GRAMMARS + '/contextFree.xml', AlgorithmTypes.GRAMMAR_REDUCTION, 'CFG', None),
    (GRAMMARS + '/contextFree.xml', AlgorithmTypes.GRAMMAR_EPSILON_REMOVAL, 'CFG', None),
    (GRAMMARS + '/contextFree.xml', AlgorithmTypes.GRAMMAR_UNIT_RULES_REMOVAL, 'CFG', None),
    (GRAMMARS + '/contextFree.xml', AlgorithmTypes.GRAMMAR_CNF_CONVERSION, 'CNF', None),
    (GRAMMARS + '/CFG1.REDUCTION.xml', AlgorithmTypes.GRAMMAR_REDUCTION, 'CFG', None),
    (GRAMMARS + '/CFG1.REDUCTION.xml', AlgorithmTypes.GRAMMAR_EPSILON_REMOVAL, 'CFG', None),
    (GRAMMARS + '/CFG1.REDUCTION.xml', AlgorithmTypes.GRAMMAR_UNIT_RULES_REMOVAL, 'CFG', None),
    (GRAMMARS + '/CFG1.REDUCTION.xml', AlgorithmTypes.GRAMMAR_CNF_CONVERSION, 'CNF', None),
    (GRAMMARS + '/epsilonFreeCFG.xml', AlgorithmTypes.GRAMMAR_LEFT_RECURSION_REMOVAL, 'CFG', None),
    (REGEXPS + '/RE1.DERIVATION.xml', AlgorithmTypes.REGEXP_DERIVATION, 'UnboundedRegExp', '1'),
    (REGEXPS + '/RE2.DERIVATION.xml', AlgorithmTypes.REGEXP_DERIVATION, 'UnboundedRegExp', '0'),
    (REGEXPS + '/RE3.DERIVATION.xml', AlgorithmTypes.REGEXP_DERIVATION, 'UnboundedRegExp', '011'),
    (REGEXPS + '/RE4.DERIVATION.xml', AlgorithmTypes.REGEXP_DERIVATION, 'UnboundedRegExp', '0'),
    (REGEXPS + '/RE5.DERIVATION.xml', AlgorithmTypes.REGEXP_DERIVATION, 'UnboundedRegExp', '100'),
])
def test_simple_algorithm_run(input_file: str, algorithm: str, result_type: str, optional_param: str):
    """

    Simple algorithms test. Just run the given algorithm with given input and checks the output type.

    :param input_file: path to XML file containing input
    :param algorithm: algorithm to be run
    :param result_type: expected type of the output
    :param optional_param: extra parameter for algorithms that need it (currently only regexp derivation and CYK)

    """
    json_input = XMLConverter.xml_to_json(read_input(input_file))
    if 'derivation' in algorithm:
        json_input = {
            'regexp': json_input,
            'derivation_string': optional_param
        }

    res = logic_layer.simple_algorithm(json_input, algorithm)

    if 'recursion' in algorithm or 'cnf' in algorithm:
        assert 'after_reduction' in res.keys()
        assert 'after_epsilon' in res.keys()
        assert 'after_unit_rules' in res.keys()
        assert result_type == res['result']['type']
    elif 'derivation' in algorithm:
        assert 'steps' in res.keys()
        assert 'trimmed_steps' in res.keys()
        assert result_type == res['steps'][-1]['type']
    else:
        assert result_type == res['type']


# TODO: Add CNF transformation and left recursion removal test inputs/outputs
@pytest.mark.parametrize('input_file, algorithm, expected_file, optional_param', [
    (AUTOMATA + '/DFA1.TRIM.xml', AlgorithmTypes.AUTOMATON_TRIM, AUTOMATA + '/DFA1.TRIM_RES.xml', None),
    (AUTOMATA + '/DFA2.TRIM.xml', AlgorithmTypes.AUTOMATON_TRIM, AUTOMATA + '/DFA2.TRIM_RES.xml', None),
    (AUTOMATA + '/ENFA1.EPSILON.xml', AlgorithmTypes.AUTOMATON_EPSILON_REMOVAL, AUTOMATA + '/ENFA1.EPSILON_RES.xml', None),
    (AUTOMATA + '/ENFA2.EPSILON.xml', AlgorithmTypes.AUTOMATON_EPSILON_REMOVAL, AUTOMATA + '/ENFA2.EPSILON_RES.xml', None),
    (AUTOMATA + '/NFSM1.xml', AlgorithmTypes.AUTOMATON_DETERMINIZATION, AUTOMATA + '/NFSM1.DET.xml', None),
    (AUTOMATA + '/NFSM2.xml', AlgorithmTypes.AUTOMATON_DETERMINIZATION, AUTOMATA + '/NFSM2.DET.xml', None),
    (AUTOMATA + '/NFSM3.xml', AlgorithmTypes.AUTOMATON_DETERMINIZATION, AUTOMATA + '/NFSM3.DET.xml', None),
    (AUTOMATA + '/NFSM4.xml', AlgorithmTypes.AUTOMATON_DETERMINIZATION, AUTOMATA + '/NFSM4.DET.xml', None),
    (AUTOMATA + '/NFSM5.xml', AlgorithmTypes.AUTOMATON_DETERMINIZATION, AUTOMATA + '/NFSM5.DET.xml', None),
    (GRAMMARS + '/CFG1.REDUCTION.xml', AlgorithmTypes.GRAMMAR_REDUCTION, GRAMMARS + '/CFG1.REDUCTION_RES.xml', None),
    (GRAMMARS + '/CFG2.REDUCTION.xml', AlgorithmTypes.GRAMMAR_REDUCTION, GRAMMARS + '/CFG2.REDUCTION_RES.xml', None),
    (GRAMMARS + '/CFG1.EPSILON.xml', AlgorithmTypes.GRAMMAR_EPSILON_REMOVAL, GRAMMARS + '/CFG1.EPSILON_RES.xml', None),
    (GRAMMARS + '/CFG2.EPSILON.xml', AlgorithmTypes.GRAMMAR_EPSILON_REMOVAL, GRAMMARS + '/CFG2.EPSILON_RES.xml', None),
    (GRAMMARS + '/CFG1.UNIT.xml', AlgorithmTypes.GRAMMAR_UNIT_RULES_REMOVAL, GRAMMARS + '/CFG1.UNIT_RES.xml', None),
    (GRAMMARS + '/CFG2.UNIT.xml', AlgorithmTypes.GRAMMAR_UNIT_RULES_REMOVAL, GRAMMARS + '/CFG2.UNIT_RES.xml', None),
    (REGEXPS + '/RE1.DERIVATION.xml', AlgorithmTypes.REGEXP_DERIVATION, REGEXPS + '/RE1.DERIVATION_RES.xml', '1'),
    (REGEXPS + '/RE2.DERIVATION.xml', AlgorithmTypes.REGEXP_DERIVATION, REGEXPS + '/RE2.DERIVATION_RES.xml', '0'),
    (REGEXPS + '/RE3.DERIVATION.xml', AlgorithmTypes.REGEXP_DERIVATION, REGEXPS + '/RE3.DERIVATION_RES.xml', '011'),
    (REGEXPS + '/RE4.DERIVATION.xml', AlgorithmTypes.REGEXP_DERIVATION, REGEXPS + '/RE4.DERIVATION_RES.xml', '0'),
    (REGEXPS + '/RE5.DERIVATION.xml', AlgorithmTypes.REGEXP_DERIVATION, REGEXPS + '/RE5.DERIVATION_RES.xml', '100'),
])
def test_simple_algorithm_result(input_file: str, algorithm: str, expected_file: str, optional_param: str):
    """

    Testing given algorithm on given input and comparing the result with expected output.

    .. note::

        Bare on mind that this function is heavily testing comparison. If this test fails, don't forget to check also
        comparison function and wrapper!

    :param input_file: path to XML file containing input
    :param algorithm: algorithm to be run
    :param expected_file: path to XML file containing expected output
    :param optional_param: extra parameter for algorithms that need it (currently only regexp derivation and CYK)

    """
    xml_input = read_input(input_file)
    expected_output = read_input(expected_file)

    json_input = XMLConverter.xml_to_json(xml_input)
    json_output = XMLConverter.xml_to_json(expected_output)

    if 'derivation' in algorithm:
        json_input = {
            'regexp': json_input,
            'derivation_string': optional_param
        }
        result = logic_layer._regexp_derivation(json_input)
        result = result['steps'][-1]
    else:
        result = logic_layer.simple_algorithm(json_input, algorithm)

    to_compare = {
        'lhs': result,
        'rhs': json_output
    }
    res = logic_layer.comparison(to_compare)
    assert res['result'] is True


# ------------------------------------------------ Sequence Tests -----------------------------------------------------


@pytest.mark.parametrize('automaton', [
    (AUTOMATA + '/NFSM1.xml'),
    (AUTOMATA + '/NFSM2.xml'),
    (AUTOMATA + '/NFSM3.xml'),
    (AUTOMATA + '/NFSM4.xml'),
    (AUTOMATA + '/NFSM5.xml'),
    (AUTOMATA + '/ENFSM2.xml'),
    (AUTOMATA + '/ENFA1.EPSILON.xml'),
    (AUTOMATA + '/ENFA2.EPSILON.xml')
])
def test_epsilon_trim_det_min(automaton: str):
    """

    Testing sequence of automata algorithms: epsilon transition removal, automaton trim, determinization and
    minimization. In each step checking for valid output type.

    :param automaton: path to XML file containing input automaton

    """
    res = XMLConverter.xml_to_json(read_input(automaton))

    for algorithm, result_type in [
        (AlgorithmTypes.AUTOMATON_EPSILON_REMOVAL, 'NFA'),
        (AlgorithmTypes.AUTOMATON_TRIM, 'NFA'),
        (AlgorithmTypes.AUTOMATON_DETERMINIZATION, 'DFA'),
        # (AlgorithmTypes.AUTOMATON_MINIMIZATION, 'DFA')         <--- Uncomment when minimization is ready
    ]:
        res = logic_layer.simple_algorithm(res, algorithm)
        assert result_type == res['type']


# --------------------------------------------- Transformation Tests --------------------------------------------------


@pytest.mark.parametrize('input_file, source, target', [
    (AUTOMATA + '/NFSM1.xml', 'fa', 'rg'),
    (AUTOMATA + '/NFSM1.xml', 'fa', 're'),
    (AUTOMATA + '/NFSM1.xml', 'fa', 'fa'),
    (AUTOMATA + '/DFA1.MIN.xml', 'fa', 'rg'),
    (AUTOMATA + '/DFA1.MIN.xml', 'fa', 're'),
    (GRAMMARS + '/rightRegular.xml', 'rg', 'fa'),
    (GRAMMARS + '/rightRegular.xml', 'rg', 're'),
    (GRAMMARS + '/rightRegular.xml', 'rg', 'rg'),
    (GRAMMARS + '/rightRegular2.xml', 'rg', 'fa'),
    (GRAMMARS + '/rightRegular2.xml', 'rg', 're'),
    (GRAMMARS + '/rightRegular2.xml', 'rg', 'rg'),
    (REGEXPS + '/regexp.xml', 're', 'fa'),
    (REGEXPS + '/regexp.xml', 're', 'rg'),
    (REGEXPS + '/regexp.xml', 're', 're'),
    (REGEXPS + '/RE4.DERIVATION.xml', 're', 'fa'),
    (REGEXPS + '/RE4.DERIVATION.xml', 're', 'rg'),
    (REGEXPS + '/RE4.DERIVATION.xml', 're', 're'),
])
def test_transformation(input_file: str, source: str, target: str):
    """

    Simple conversion test. Converts input to `target`, checks the output type, converts it back to `source` and compare
    it with original input.

    .. note::

        Bare on mind that this function is also slightly testing comparison. If this test fails, don't forget to check
        also comparison function and wrapper!

    :param input_file: path to XML file containing input
    :param source: type of input
    :param target: type of conversion output

    """
    if target == 'fa':
        result_type = 'NFA'
    elif target == 'rg':
        result_type = 'RightRG'
    elif target == 're':
        result_type = 'UnboundedRegExp'
    else:
        pytest.fail('Invalid target passed as argument!!')
        return

    xml_input = XMLConverter.xml_to_json(read_input(input_file))
    json_file = {
        'target': target,
        'source': xml_input
    }

    # Converting to target
    res = logic_layer.transformation(json_file)
    assert result_type == res['type']

    json_file = {
        'target': source,
        'source': res
    }
    # Converting back to source
    res = logic_layer.transformation(json_file)

    json_file = {
        'lhs': res,
        'rhs': xml_input
    }
    res = logic_layer.comparison(json_file)
    assert res['result'] is True


# ----------------------------------------------- Comparison Tests ----------------------------------------------------
# Tests for comparison are, in a way, already done in test_algorithm_result function. So if anything goes wrong with
# comparison functions, test_algorithm_result function will probably fail.


@pytest.mark.parametrize('input_file', [
    (AUTOMATA + '/NFSM1.xml'),
    (AUTOMATA + '/DFA1.MIN.xml'),
    (AUTOMATA + '/ENFA1.EPSILON.xml'),
    (GRAMMARS + '/rightRegular.xml'),
    (GRAMMARS + '/CFG1.EPSILON.xml'),
    (REGEXPS + '/regexp.xml'),
    (REGEXPS + '/RE4.DERIVATION.xml'),
])
def test_comparison(input_file: str):
    """

    Basic comparison test. Takes input and compares it with itself.

    :param input_file: path to XML file containing input

    """
    xml_input = XMLConverter.xml_to_json(read_input(input_file))
    json_file = {
        'lhs': xml_input,
        'rhs': xml_input
    }

    res = logic_layer.comparison(json_file)
    assert res['result'] is True


# ------------------------------------------------- Failing Tests -----------------------------------------------------


def test_fails():
    """

    Testing invalid requests for :mod:`~backend.logic_layer` that should always fail.

    """

    # Passing invalid name of algorithm
    json_input = XMLConverter.xml_to_json(read_input(REGEXPS + '/regexp.xml'))
    res = logic_layer.simple_algorithm(json_input, 'regexp_trimmm')
    assert res['exception'] == 'Unknown algorithm passed as parameter!'
    assert res['type'] is AltInterfaceException

    # Omitting the optional parameter which is mandatory for some algorithms
    res = logic_layer.simple_algorithm(json_input, AlgorithmTypes.REGEXP_DERIVATION)
    assert res['exception'] == 'Invalid JSON structure'
    assert res['type'] is XMLConverter.JSONDecodeError

    # Passing invalid input type
    res = logic_layer.simple_algorithm(json_input, AlgorithmTypes.AUTOMATON_DETERMINIZATION)
    assert 'Entry overload' in res['exception']
    assert 'not available' in res['exception']
    assert res['type'] is AltInterfaceException

    # Missing 'target' in transformation input
    res = logic_layer.transformation(json_input)
    assert res['exception'] == 'Invalid JSON structure'
    assert res['type'] is XMLConverter.JSONDecodeError

    # Passing invalid target type to transformation
    json_input_transformation = {
        'source': json_input,
        'target': 'NFA'
    }
    res = logic_layer.transformation(json_input_transformation)
    assert res['exception'] == 'Unknown \'to\' parameter passed as parameter!'
    assert res['type'] is AltInterfaceException

    # Trying to convert ENFA to RG
    json_input = XMLConverter.xml_to_json(read_input(AUTOMATA + '/ENFA1.EPSILON.xml'))
    json_input_transformation = {
        'source': json_input,
        'target': 'rg'
    }
    res = logic_layer.transformation(json_input_transformation)
    assert 'Entry overload' in res['exception']
    assert 'not available' in res['exception']
    assert res['type'] is AltInterfaceException

    # Trying to compare FA and CFG
    json_input2 = XMLConverter.xml_to_json(read_input(GRAMMARS + '/CFG1.UNIT.xml'))
    json_input_comparison = {
        'lhs': json_input,
        'rhs': json_input2
    }
    res = logic_layer.comparison(json_input_comparison)
    assert 'Entry overload' in res['exception']
    assert 'not available' in res['exception']
    assert res['type'] is AltInterfaceException

    # TODO: Add more failing tests
