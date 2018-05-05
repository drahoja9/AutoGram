import pytest
import os

from . import AltInterface

AUTOMATA = os.path.dirname(__file__) + '/examples/automaton'
GRAMMARS = os.path.dirname(__file__) + '/examples/grammar'
REGEXPS = os.path.dirname(__file__) + '/examples/regexp'


@pytest.fixture
def interface():
    # Context manager is responsible for both setup and teardown
    with AltInterface() as it:
        yield it


@pytest.fixture(params=[
    AUTOMATA + '/NFSM1.xml',
    AUTOMATA + '/NFSM2.xml',
    AUTOMATA + '/NFSM3.xml',
    AUTOMATA + '/NFSM4.xml',
    AUTOMATA + '/NFSM5.xml'
])
def automata(request):
    with open(request.param, 'r') as f:
        xml_input = f.read()
    return xml_input


@pytest.mark.parametrize('input_file, output_file', [
    (AUTOMATA + '/NFSM1.xml', AUTOMATA + '/NFSM1.DET.xml'),
    (AUTOMATA + '/NFSM2.xml', AUTOMATA + '/NFSM2.DET.xml'),
    (AUTOMATA + '/NFSM3.xml', AUTOMATA + '/NFSM3.DET.xml'),
    (AUTOMATA + '/NFSM4.xml', AUTOMATA + '/NFSM4.DET.xml'),
    (AUTOMATA + '/NFSM5.xml', AUTOMATA + '/NFSM5.DET.xml'),
])
def test_determinization(interface, input_file, output_file):
    with open(input_file, 'r') as f:
        xml_input = f.read()
    with open(output_file, 'r') as f:
        expected = f.read()

    return_code1, res1 = interface.algorithms(xml_input, 'automaton_determinization')
    assert return_code1 == 0
    assert res1.endswith('</DFA>\n')

    # We need to trim the automaton to be able to compare with expected result
    _, trimmed_res = interface.algorithms(res1, 'automaton_trim')

    _, res2 = interface.comparison(trimmed_res, 'fa', expected, 'fa')
    assert res2 == 'True'


def test_det_and_min(interface, automata):
    _, determinized = interface.algorithms(automata, 'automaton_determinization')
    return_code, res = interface.algorithms(determinized, 'automaton_minimization')
    assert return_code == 0
    assert res.endswith('</DFA>\n')


@pytest.mark.parametrize('input_file, algorithm, result_type', [
    (AUTOMATA + '/NFSM1.xml', 'automaton_trim', '</NFA>'),
    (AUTOMATA + '/NFSM2.xml', 'automaton_trim', '</NFA>'),
    (AUTOMATA + '/NFSM3.xml', 'automaton_trim', '</NFA>'),
    (AUTOMATA + '/NFSM4.xml', 'automaton_trim', '</NFA>'),
    (AUTOMATA + '/NFSM5.xml', 'automaton_trim', '</NFA>'),
    (AUTOMATA + '/ENFSM2.xml', 'automaton_epsilon', '</NFA>'),
    (GRAMMARS + '/contextFree.xml', 'grammar_reduction', '</CFG>'),
    (GRAMMARS + '/contextFree.xml', 'grammar_epsilon', '</EpsilonFreeCFG>'),
    (GRAMMARS + '/contextFree.xml', 'grammar_unit', '</CFG>'),
    (GRAMMARS + '/contextFree.xml', 'grammar_cnf', '</CNF>'),
    (GRAMMARS + '/epsilonFreeCFG.xml', 'grammar_left_recursion', '</EpsilonFreeCFG>'),
])
def test_algorithms(interface, input_file, algorithm, result_type):
    with open(input_file, 'r') as f:
        xml_input = f.read()
    return_code, res = interface.algorithms(xml_input, algorithm)
    assert return_code == 0
    assert res.endswith(result_type + '\n')


@pytest.mark.parametrize('input_file, algorithm, expected_file', [
    (AUTOMATA + '/DFA1.MIN.xml', 'automaton_minimization', AUTOMATA + '/DFA1.MIN_RES.xml'),
    (AUTOMATA + '/DFA2.MIN.xml', 'automaton_minimization', AUTOMATA + '/DFA2.MIN_RES.xml'),
    (AUTOMATA + '/DFA1.TRIM.xml', 'automaton_trim', AUTOMATA + '/DFA1.TRIM_RES.xml'),
    (AUTOMATA + '/DFA2.TRIM.xml', 'automaton_trim', AUTOMATA + '/DFA2.TRIM_RES.xml'),
    (AUTOMATA + '/ENFA1.EPSILON.xml', 'automaton_epsilon', AUTOMATA + '/ENFA1.EPSILON_RES.xml'),
    (AUTOMATA + '/ENFA2.EPSILON.xml', 'automaton_epsilon', AUTOMATA + '/ENFA2.EPSILON_RES.xml'),
    (GRAMMARS + '/CFG1.REDUCTION.xml', 'grammar_reduction', GRAMMARS + '/CFG1.REDUCTION_RES.xml'),
    (GRAMMARS + '/CFG2.REDUCTION.xml', 'grammar_reduction', GRAMMARS + '/CFG2.REDUCTION_RES.xml'),
    (GRAMMARS + '/CFG1.EPSILON.xml', 'grammar_epsilon', GRAMMARS + '/CFG1.EPSILON_RES.xml'),
    (GRAMMARS + '/CFG2.EPSILON.xml', 'grammar_epsilon', GRAMMARS + '/CFG2.EPSILON_RES.xml'),
    (GRAMMARS + '/CFG1.UNIT.xml', 'grammar_unit', GRAMMARS + '/CFG1.UNIT_RES.xml'),
    (GRAMMARS + '/CFG2.UNIT.xml', 'grammar_unit', GRAMMARS + '/CFG2.UNIT_RES.xml'),

])
def test_algorithms_2(interface, input_file, algorithm, expected_file):
    with open(input_file, 'r') as f:
        xml_input = f.read()
    with open(expected_file, 'r') as f:
        expected_output = f.read()

    return_code, res = interface.algorithms(xml_input, algorithm)
    assert return_code == 0

    if 'automaton' in algorithm:
        input_type = 'fa'
    elif 'grammar' in algorithm:
        input_type = 'rg'
    elif 'regexp' in algorithm:
        input_type = 're'
    else:
        pytest.fail('Invalid algorithm passed as argument!!')
        return

    return_code1, res1 = interface.comparison(res, input_type, expected_output, input_type)
    assert return_code1 == 0
    assert res1 == 'True'
