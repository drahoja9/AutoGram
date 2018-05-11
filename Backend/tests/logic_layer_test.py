import pytest
import os
import json

from backend import logic_layer, XMLConverter, AlgorithmTypes
from backend.python_interface import AltInterface, AltInterfaceException

AUTOMATA = os.path.dirname(__file__) + '/examples/automaton'
GRAMMARS = os.path.dirname(__file__) + '/examples/grammar'
REGEXPS = os.path.dirname(__file__) + '/examples/regexp'


@pytest.fixture
def interface() -> AltInterface:
    """

    Pytest fixture for exporting the :class:`AltInterface` instance. Context manager is responsible for both setup and teardown (
    thanks to ``yield`` keyword).

    :return: new :class:`AltInterface` instance
    """
    with AltInterface() as it:
        yield it


def read_input(input_file: str) -> str:
    """

    Helper function for reading XML contents from a file.

    :param input_file: path to XML file containing input

    :return: string representing XML input from given file
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

    if 'recursion' in algorithm:
        res = logic_layer.grammar_left_recursion(json_input)
        res = json.loads(res)
        assert 'after_reduction' in res.keys()
        assert 'after_epsilon' in res.keys()
        assert 'after_unit_rules' in res.keys()
        assert result_type == res['result']['type']
    elif 'cnf' in algorithm:
        res = logic_layer.grammar_cnf(json_input)
        res = json.loads(res)
        assert 'after_reduction' in res.keys()
        assert 'after_epsilon' in res.keys()
        assert 'after_unit_rules' in res.keys()
        assert result_type == res['result']['type']
    elif 'derivation' in algorithm:
        json_input = {
            'regexp': json.loads(json_input),
            'derivation_string': optional_param
        }
        res = logic_layer.regexp_derivation(json.dumps(json_input))
        res = json.loads(res)
        assert 'result' in res.keys()
        assert 'steps' in res.keys()
        assert result_type == res['result']['type']
    else:
        res = logic_layer.simple_algorithm(json_input, algorithm)
        assert result_type == json.loads(res)['type']


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
            'regexp': json.loads(json_input),
            'derivation_string': optional_param
        }
        result = logic_layer.regexp_derivation(json.dumps(json_input))
        # Transforming result to dictionary to pick the 'result' dictionary inside
        result = json.loads(result)['result']
        # Transforming it back to string, because later we will transform it to dictionary once again :)
        result = json.dumps(result)
    else:
        result = logic_layer.simple_algorithm(json_input, algorithm)

    to_compare = {
        'lhs': json.loads(result),
        'rhs': json.loads(json_output)
    }
    res = logic_layer.comparison(json.dumps(to_compare))
    assert json.loads(res)['result'] is True


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
        assert result_type == json.loads(res)['type']


# ------------------------------------------------- Failing Tests -----------------------------------------------------


def test_fails():
    """

    Testing invalid requests for :class:`AltInterface` that should always fail.

    """

    # Passing file as parameter
    with pytest.raises(XMLConverter.JSONDecodeError):
        logic_layer.simple_algorithm(REGEXPS + '/regexp.xml', AlgorithmTypes.REGEXP_TRIM)

    # TODO: Add more failing tests
