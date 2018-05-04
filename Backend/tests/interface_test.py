import pytest
import os

from . import AltInterface

AUTOMATA = os.path.dirname(__file__) + '/examples/automaton'
GRAMMARS = os.path.dirname(__file__) + '/examples/grammar'
REGEXPS = os.path.dirname(__file__) + '/examples/regexp'


@pytest.fixture
def interface():
    # Setup
    it = AltInterface()
    yield it.__enter__()

    # Teardown
    it.__exit__(None, None, None)


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
    assert res1[-6:] == '</DFA>'

    # We need to trim the automaton to be able to compare with expected result
    _, trimmed_res = interface.algorithms(res1, 'automaton_trim')

    _, res2 = interface.comparison(trimmed_res, 'fa', expected, 'fa')
    assert res2 == 'True'


def test_minimization(interface, automata):
    _, determinized = interface.algorithms(automata, 'automaton_determinization')
    return_code, res = interface.algorithms(determinized, 'automaton_minimization')
    assert return_code == 0
    assert res[-6:] == '</DFA>'


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
    assert res.endswith(result_type)


@pytest.mark.parametrize('input_file, algorithm, expected', [
    (AUTOMATA + '/DFA1.MIN.xml', 'automaton_minimization', AUTOMATA + '/DFA1.MIN_RES.XML'),
    (AUTOMATA + '/DFA2.MIN.xml', 'automaton_minimization', AUTOMATA + '/DFA2.MIN_RES.XML'),
    (AUTOMATA + '/DFA1.TRIM.xml', 'automaton_trim', AUTOMATA + '/DFA1.TRIM_RES.XML'),
    (AUTOMATA + '/DFA2.TRIM.xml', 'automaton_trim', AUTOMATA + '/DFA2.TRIM_RES.XML'),
    (AUTOMATA + '/ENFA1.EPSILON.xml', 'automaton_epsilon', AUTOMATA + '/ENFA1.EPSILON_RES.XML'),
    (AUTOMATA + '/ENFA2.EPSILON.xml', 'automaton_epsilon', AUTOMATA + '/ENFA2.EPSILON_RES.XML'),
])
def test_algorithms_2(interface, input_file, algorithm, expected):
    with open(input_file, 'r') as f:
        xml_input = f.read()
    return_code, res = interface.algorithms(xml_input, algorithm)
    assert return_code == 0

    return_code, res = interface.comparison(res, 'fa', expected, 'fa')
    assert return_code == 0
    assert res == 'True'
