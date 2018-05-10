"""

Testing module for class :class:`AltInterface` in python_interface module, using `pytest`_ library.

.. _pytest: https://pytest.org/

.. module:: interface_test
    :platform: Unix
    :synopsis: Testing module for class AltInterface in python_interface module, using pytest library.

.. moduleauthor:: Jakub Drahos <drahoja9@fit.cvut.cz>

"""

import pytest
import os

from backend import AlgorithmTypes
from backend.python_interface import AltInterface

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

# ------------------------------------------------ Algorithms Tests ---------------------------------------------------


@pytest.mark.parametrize('input_file, algorithm, result_type', [
    (AUTOMATA + '/NFSM1.xml', AlgorithmTypes.AUTOMATON_DETERMINIZATION, '</DFA>'),
    (AUTOMATA + '/NFSM2.xml', AlgorithmTypes.AUTOMATON_DETERMINIZATION, '</DFA>'),
    (AUTOMATA + '/NFSM3.xml', AlgorithmTypes.AUTOMATON_DETERMINIZATION, '</DFA>'),
    (AUTOMATA + '/NFSM4.xml', AlgorithmTypes.AUTOMATON_DETERMINIZATION, '</DFA>'),
    (AUTOMATA + '/NFSM5.xml', AlgorithmTypes.AUTOMATON_DETERMINIZATION, '</DFA>'),
    (AUTOMATA + '/NFSM1.xml', AlgorithmTypes.AUTOMATON_TRIM, '</NFA>'),
    (AUTOMATA + '/NFSM2.xml', AlgorithmTypes.AUTOMATON_TRIM, '</NFA>'),
    (AUTOMATA + '/NFSM3.xml', AlgorithmTypes.AUTOMATON_TRIM, '</NFA>'),
    (AUTOMATA + '/NFSM4.xml', AlgorithmTypes.AUTOMATON_TRIM, '</NFA>'),
    (AUTOMATA + '/NFSM5.xml', AlgorithmTypes.AUTOMATON_TRIM, '</NFA>'),
    (AUTOMATA + '/ENFSM2.xml', AlgorithmTypes.AUTOMATON_EPSILON_REMOVAL, '</NFA>'),
    (GRAMMARS + '/contextFree.xml', AlgorithmTypes.GRAMMAR_REDUCTION, '</CFG>'),
    (GRAMMARS + '/contextFree.xml', AlgorithmTypes.GRAMMAR_EPSILON_REMOVAL, '</EpsilonFreeCFG>'),
    (GRAMMARS + '/contextFree.xml', AlgorithmTypes.GRAMMAR_UNIT_RULES_REMOVAL, '</CFG>'),
    (GRAMMARS + '/contextFree.xml', AlgorithmTypes.GRAMMAR_CNF_CONVERSION, '</CNF>'),
    (GRAMMARS + '/epsilonFreeCFG.xml', AlgorithmTypes.GRAMMAR_LEFT_RECURSION_REMOVAL, '</EpsilonFreeCFG>'),
])
def test_algorithm_run(interface: AltInterface, input_file: str, algorithm: str, result_type: str):
    """

    Simple algorithms test. Just run the given algorithm with given input and checks the output type.

    :param interface: pytest fixture returning :class:`AltInterface` instance
    :param input_file: path to XML file containing input
    :param algorithm: algorithm to be run
    :param result_type: expected type of the output

    """
    xml_input = read_input(input_file)
    return_code, res = interface.algorithms(xml_input, algorithm)
    assert return_code == 0
    assert res.endswith(result_type + '\n')


@pytest.mark.parametrize('input_file, algorithm, expected_file, optional_param', [
    (AUTOMATA + '/DFA1.MIN.xml', AlgorithmTypes.AUTOMATON_MINIMIZATION, AUTOMATA + '/DFA1.MIN_RES.xml', None),
    (AUTOMATA + '/DFA2.MIN.xml', AlgorithmTypes.AUTOMATON_MINIMIZATION, AUTOMATA + '/DFA2.MIN_RES.xml', None),
    (AUTOMATA + '/NFSM1.xml', AlgorithmTypes.AUTOMATON_DETERMINIZATION, AUTOMATA + '/NFSM1.DET.xml', None),
    (AUTOMATA + '/NFSM2.xml', AlgorithmTypes.AUTOMATON_DETERMINIZATION, AUTOMATA + '/NFSM2.DET.xml', None),
    (AUTOMATA + '/NFSM3.xml', AlgorithmTypes.AUTOMATON_DETERMINIZATION, AUTOMATA + '/NFSM3.DET.xml', None),
    (AUTOMATA + '/NFSM4.xml', AlgorithmTypes.AUTOMATON_DETERMINIZATION, AUTOMATA + '/NFSM4.DET.xml', None),
    (AUTOMATA + '/NFSM5.xml', AlgorithmTypes.AUTOMATON_DETERMINIZATION, AUTOMATA + '/NFSM5.DET.xml', None),
    (AUTOMATA + '/DFA1.TRIM.xml', AlgorithmTypes.AUTOMATON_TRIM, AUTOMATA + '/DFA1.TRIM_RES.xml', None),
    (AUTOMATA + '/DFA2.TRIM.xml', AlgorithmTypes.AUTOMATON_TRIM, AUTOMATA + '/DFA2.TRIM_RES.xml', None),
    (AUTOMATA + '/ENFA1.EPSILON.xml', AlgorithmTypes.AUTOMATON_EPSILON_REMOVAL, AUTOMATA + '/ENFA1.EPSILON_RES.xml', None),
    (AUTOMATA + '/ENFA2.EPSILON.xml', AlgorithmTypes.AUTOMATON_EPSILON_REMOVAL, AUTOMATA + '/ENFA2.EPSILON_RES.xml', None),
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
def test_algorithm_result(interface: AltInterface, input_file: str,
                          algorithm: str, expected_file: str, optional_param: str):
    """

    Testing given algorithm on given input and comparing the result with expected output.

    .. note::

        Bare on mind that this function is heavily testing comparison. If this test fails, don't forget to check also
        comparison function and wrapper!

    :param interface: pytest fixture returning :class:`AltInterface` instance
    :param input_file: path to XML file containing input
    :param algorithm: algorithm to be run
    :param expected_file: path to XML file containing expected output
    :param optional_param: extra parameter for algorithms that need it (currently only regexp derivation and CYK)

    """
    xml_input = read_input(input_file)
    expected_output = read_input(expected_file)

    return_code, res = interface.algorithms(xml_input, algorithm, optional_param)
    assert return_code == 0

    if 'automaton' in algorithm:
        input_type = 'fa'
    elif 'grammar' in algorithm:
        input_type = 'cfg'
    elif 'regexp' in algorithm:
        input_type = 're'
    else:
        pytest.fail('Invalid algorithm passed as argument!!')
        return

    # Also testing comparison. If this test fails, don't forget to check also that!
    return_code, res = interface.comparison(res, input_type, expected_output, input_type)
    assert return_code == 0
    assert res == 'True'


# ------------------------------------------------ Conversion Tests ---------------------------------------------------


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
def test_conversion(interface: AltInterface, input_file: str, source: str, target: str):
    """

    Simple conversion test. Converts input to `target`, checks the output type, converts it back to `source` and compare
    it with original input.

    .. note::

        Bare on mind that this function is also slightly testing comparison. If this test fails, don't forget to check
        also comparison function and wrapper!

    :param interface: pytest fixture returning :class:`AltInterface` instance
    :param input_file: path to XML file containing input
    :param source: type of input
    :param target: type of conversion output

    """
    if target == 'fa':
        result_type = '</NFA>'
    elif target == 'rg':
        result_type = '</RightRG>'
    elif target == 're':
        result_type = '</UnboundedRegExp>'
    else:
        pytest.fail('Invalid target passed as argument!!')
        return

    xml_input = read_input(input_file)
    return_code, res = interface.conversion(xml_input, source, target)
    assert return_code == 0
    assert res.endswith(result_type + '\n')

    return_code, res = interface.conversion(res, target, source)
    assert return_code == 0

    return_code, res = interface.comparison(xml_input, source, res, source)
    assert return_code == 0
    assert res == 'True'


# ----------------------------------------------- Comparison Tests ----------------------------------------------------
# Tests for comparison are, in a way, already done in test_algorithm_result function. So if anything goes wrong with
# comparison functions, test_algorithm_result function will probably fail.


@pytest.mark.parametrize('input_file, source', [
    (AUTOMATA + '/NFSM1.xml', 'fa'),
    (AUTOMATA + '/DFA1.MIN.xml', 'fa'),
    (AUTOMATA + '/ENFA1.EPSILON.xml', 'fa'),
    (AUTOMATA + '/MISNFA.xml', 'fa'),
    (GRAMMARS + '/rightRegular.xml', 'rg'),
    (GRAMMARS + '/CFG1.EPSILON.xml', 'cfg'),
    (REGEXPS + '/regexp.xml', 're'),
    (REGEXPS + '/RE4.DERIVATION.xml', 're'),
])
def test_comparison(interface: AltInterface, input_file: str, source: str):
    """

    Basic comparison test. Takes input and compares it with itself.

    :param interface: pytest fixture returning :class:`AltInterface` instance
    :param input_file: path to XML file containing input
    :param source: type of input

    """
    xml_input = read_input(input_file)

    return_code, res = interface.comparison(xml_input, source, xml_input, source)
    assert return_code == 0
    assert res == 'True'

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
def test_epsilon_trim_det_min(interface: AltInterface, automaton: str):
    """

    Testing sequence of automata algorithms: epsilon transition removal, automaton trim, determinization and
    minimization. In each step checking for valid output type.

    :param interface: pytest fixture returning :class:`AltInterface` instance
    :param automaton: path to XML file containing input automaton

    """
    res = read_input(automaton)

    for algorithm, result_type in [
        (AlgorithmTypes.AUTOMATON_EPSILON_REMOVAL, '</NFA>'),
        (AlgorithmTypes.AUTOMATON_TRIM, '</NFA>'),
        (AlgorithmTypes.AUTOMATON_DETERMINIZATION, '</DFA>'),
        (AlgorithmTypes.AUTOMATON_MINIMIZATION, '</DFA>')
    ]:
        return_code, res = interface.algorithms(res, algorithm)
        assert return_code == 0
        assert res.endswith(result_type + '\n')


@pytest.mark.parametrize('grammar', [
    (GRAMMARS + '/CFG1.EPSILON.xml'),
    (GRAMMARS + '/CFG2.EPSILON.xml'),
    (GRAMMARS + '/CFG1.REDUCTION.xml'),
    (GRAMMARS + '/CFG2.REDUCTION.xml'),
    (GRAMMARS + '/CFG1.UNIT.xml'),
    (GRAMMARS + '/CFG2.UNIT.xml'),
    (GRAMMARS + '/contextFree.xml'),
    (GRAMMARS + '/epsilonFreeCFG.xml'),
])
def test_epsilon_reduction_unit_recursion(interface: AltInterface, grammar: str):
    """

    Testing sequence of grammar algorithms: epsilon rules removal, grammar reduction, unit rules removal and left
    recursion removal. In each step checking for valid output type.

    :param interface: pytest fixture returning :class:`AltInterface` instance
    :param grammar: path to XML file containing input grammar

    """
    res = read_input(grammar)

    for algorithm in [
        AlgorithmTypes.GRAMMAR_EPSILON_REMOVAL,
        AlgorithmTypes.GRAMMAR_REDUCTION,
        AlgorithmTypes.GRAMMAR_UNIT_RULES_REMOVAL,
        AlgorithmTypes.GRAMMAR_LEFT_RECURSION_REMOVAL
    ]:
        return_code, res = interface.algorithms(res, algorithm)
        assert return_code == 0
        assert res.endswith('</EpsilonFreeCFG>\n')


# ------------------------------------------------- Failing Tests -----------------------------------------------------


def test_fails(interface: AltInterface):
    """

    Testing invalid requests for :class:`AltInterface` that should always fail.

    :param interface: pytest fixture returning :class:`AltInterface` instance

    """
    # Passing file as parameter
    return_code, res = interface.algorithms(REGEXPS + '/regexp.xml', AlgorithmTypes.REGEXP_TRIM)
    assert return_code == 1
    assert 'Cannot parse the XML' in res

    # Omitting the optional parameter which is mandatory for some algorithms OR giving optional parameter when it's not
    # wanted
    xml_input = read_input(REGEXPS + '/regexp.xml')
    return_code, res = interface.algorithms(xml_input, AlgorithmTypes.REGEXP_DERIVATION)
    assert return_code == 1
    assert 'No string to differentiate by was given!' in res
    return_code, res = interface.algorithms(xml_input, AlgorithmTypes.REGEXP_TRIM, 'ThisShouldNotBeHere')
    assert return_code == 1
    assert 'Optional parameter was given even though it can\'t be used!' in res

    # Passing invalid algorithm
    xml_input = read_input(AUTOMATA + '/NFSM1.xml')
    return_code, res = interface.algorithms(xml_input, 'determinization')
    assert return_code == 1
    assert 'Unknown algorithm passed as parameter!' in res
    return_code, res = interface.algorithms(xml_input, 'automaton_determinize')
    assert return_code == 1
    assert 'Unknown algorithm passed as parameter!' in res

    # Passing invalid input type
    return_code, res = interface.algorithms(xml_input, AlgorithmTypes.AUTOMATON_MINIMIZATION)
    assert return_code == 3
    assert 'Entry overload' in res
    assert 'not available' in res

    # Passing invalid source or target type to conversion
    return_code, res = interface.conversion(xml_input, 'fsm', 'rg')
    assert return_code == 1
    assert 'Unknown \'from\' parameter passed as parameter!' in res
    return_code, res = interface.conversion(xml_input, 'fa', 'cfg')
    assert return_code == 1
    assert 'Unknown \'to\' parameter passed as parameter!' in res
    return_code, res = interface.conversion(xml_input, 'pda', 'cfg')
    assert return_code == 1
    assert 'Unknown \'from\' parameter passed as parameter!' in res

    # Trying to convert ENFA to RG
    xml_input = read_input(AUTOMATA + '/ENFA1.EPSILON.xml')
    return_code, res = interface.conversion(xml_input, 'fa', 'rg')
    assert return_code == 3
    assert 'Entry overload' in res
    assert 'not available' in res

    # Trying to compare FA and CFG
    xml_input2 = read_input(GRAMMARS + '/CFG1.UNIT.xml')
    return_code, res = interface.comparison(xml_input, 'fa', xml_input2, 'cfg')
    assert return_code == 3
    assert 'Entry overload' in res
    assert 'not available' in res
