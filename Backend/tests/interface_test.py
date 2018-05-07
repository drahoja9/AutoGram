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


def read_input(input_file):
    with open(input_file, 'r') as f:
        xml_input = f.read()
    return xml_input

# ------------------------------------------------ Algorithms Tests ---------------------------------------------------


@pytest.mark.parametrize('input_file, algorithm, result_type', [
    (AUTOMATA + '/NFSM1.xml', 'automaton_determinization', '</DFA>'),
    (AUTOMATA + '/NFSM2.xml', 'automaton_determinization', '</DFA>'),
    (AUTOMATA + '/NFSM3.xml', 'automaton_determinization', '</DFA>'),
    (AUTOMATA + '/NFSM4.xml', 'automaton_determinization', '</DFA>'),
    (AUTOMATA + '/NFSM5.xml', 'automaton_determinization', '</DFA>'),
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
def test_algorithm_run(interface, input_file, algorithm, result_type):
    xml_input = read_input(input_file)
    return_code, res = interface.algorithms(xml_input, algorithm)
    assert return_code == 0
    assert res.endswith(result_type + '\n')


@pytest.mark.parametrize('input_file, algorithm, expected_file, optional_param', [
    (AUTOMATA + '/DFA1.MIN.xml', 'automaton_minimization', AUTOMATA + '/DFA1.MIN_RES.xml', None),
    (AUTOMATA + '/DFA2.MIN.xml', 'automaton_minimization', AUTOMATA + '/DFA2.MIN_RES.xml', None),
    (AUTOMATA + '/NFSM1.xml', 'automaton_determinization', AUTOMATA + '/NFSM1.DET.xml', None),
    (AUTOMATA + '/NFSM2.xml', 'automaton_determinization', AUTOMATA + '/NFSM2.DET.xml', None),
    (AUTOMATA + '/NFSM3.xml', 'automaton_determinization', AUTOMATA + '/NFSM3.DET.xml', None),
    (AUTOMATA + '/NFSM4.xml', 'automaton_determinization', AUTOMATA + '/NFSM4.DET.xml', None),
    (AUTOMATA + '/NFSM5.xml', 'automaton_determinization', AUTOMATA + '/NFSM5.DET.xml', None),
    (AUTOMATA + '/DFA1.TRIM.xml', 'automaton_trim', AUTOMATA + '/DFA1.TRIM_RES.xml', None),
    (AUTOMATA + '/DFA2.TRIM.xml', 'automaton_trim', AUTOMATA + '/DFA2.TRIM_RES.xml', None),
    (AUTOMATA + '/ENFA1.EPSILON.xml', 'automaton_epsilon', AUTOMATA + '/ENFA1.EPSILON_RES.xml', None),
    (AUTOMATA + '/ENFA2.EPSILON.xml', 'automaton_epsilon', AUTOMATA + '/ENFA2.EPSILON_RES.xml', None),
    (GRAMMARS + '/CFG1.REDUCTION.xml', 'grammar_reduction', GRAMMARS + '/CFG1.REDUCTION_RES.xml', None),
    (GRAMMARS + '/CFG2.REDUCTION.xml', 'grammar_reduction', GRAMMARS + '/CFG2.REDUCTION_RES.xml', None),
    (GRAMMARS + '/CFG1.EPSILON.xml', 'grammar_epsilon', GRAMMARS + '/CFG1.EPSILON_RES.xml', None),
    (GRAMMARS + '/CFG2.EPSILON.xml', 'grammar_epsilon', GRAMMARS + '/CFG2.EPSILON_RES.xml', None),
    (GRAMMARS + '/CFG1.UNIT.xml', 'grammar_unit', GRAMMARS + '/CFG1.UNIT_RES.xml', None),
    (GRAMMARS + '/CFG2.UNIT.xml', 'grammar_unit', GRAMMARS + '/CFG2.UNIT_RES.xml', None),
    (REGEXPS + '/RE1.DERIVATION.xml', 'regexp_derivation', REGEXPS + '/RE1.DERIVATION_RES.xml', '1'),
    (REGEXPS + '/RE2.DERIVATION.xml', 'regexp_derivation', REGEXPS + '/RE2.DERIVATION_RES.xml', '0'),
    (REGEXPS + '/RE3.DERIVATION.xml', 'regexp_derivation', REGEXPS + '/RE3.DERIVATION_RES.xml', '011'),
    (REGEXPS + '/RE4.DERIVATION.xml', 'regexp_derivation', REGEXPS + '/RE4.DERIVATION_RES.xml', '0'),
    (REGEXPS + '/RE5.DERIVATION.xml', 'regexp_derivation', REGEXPS + '/RE5.DERIVATION_RES.xml', '100'),
])
def test_algorithm_result(interface, input_file, algorithm, expected_file, optional_param):
    xml_input = read_input(input_file)
    expected_output = read_input(expected_file)

    return_code, res = interface.algorithms(xml_input, algorithm, optional_param)
    assert return_code == 0

    if 'automaton' in algorithm:
        input_type = 'fa'
        # Determinization results are already trimmed
        if 'determinization' in algorithm:
            return_code, res = interface.algorithms(res, 'automaton_trim')
            assert return_code == 0
    elif 'grammar' in algorithm:
        input_type = 'rg'
    elif 'regexp' in algorithm:
        input_type = 're'
        # Derivation results are already trimmed
        return_code, res = interface.algorithms(res, 'regexp_trim')
        assert return_code == 0
    else:
        pytest.fail('Invalid algorithm passed as argument!!')
        return

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
def test_conversion(interface, input_file, source, target):
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


# ----------------------------------------------- Comparison Tests ----------------------------------------------------

# TODO: Comparison tests

# ------------------------------------------------ Sequence Tests -----------------------------------------------------


@pytest.mark.parametrize('automata', [
    (AUTOMATA + '/NFSM1.xml'),
    (AUTOMATA + '/NFSM2.xml'),
    (AUTOMATA + '/NFSM3.xml'),
    (AUTOMATA + '/NFSM4.xml'),
    (AUTOMATA + '/NFSM5.xml'),
    (AUTOMATA + '/ENFSM2.xml'),
    (AUTOMATA + '/ENFA1.EPSILON.xml'),
    (AUTOMATA + '/ENFA2.EPSILON.xml')
])
def test_epsilon_trim_det_min(interface, automata):
    res = read_input(automata)

    for algorithm, result_type in [
        ('epsilon', '</NFA>'),
        ('trim', '</NFA>'),
        ('determinization', '</DFA>'),
        ('minimization', '</DFA>')
    ]:
        return_code, res = interface.algorithms(res, 'automaton_' + algorithm)
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
def test_epsilon_reduction_unit_recursion(interface, grammar):
    res = read_input(grammar)

    for algorithm in ['epsilon', 'reduction', 'unit', 'left_recursion']:
        return_code, res = interface.algorithms(res, 'grammar_' + algorithm)
        assert return_code == 0
        assert res.endswith('</EpsilonFreeCFG>\n')


# ------------------------------------------------- Failing Tests -----------------------------------------------------


def test_fails(interface):
    # Passing file as parameter
    return_code, res = interface.algorithms(REGEXPS + '/regexp.xml', 'regexp_trim')
    assert return_code == 1
    assert 'Cannot parse the XML' in res

    # Omitting the optional parameter which is mandatory for some algorithms OR giving optional parameter when it's not
    # wanted
    xml_input = read_input(REGEXPS + '/regexp.xml')
    return_code, res = interface.algorithms(xml_input, 'regexp_derivation')
    assert return_code == 1
    assert 'No string to differentiate by was given!' in res
    return_code, res = interface.algorithms(xml_input, 'regexp_trim', 'ThisShouldNotBeHere')
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
    return_code, res = interface.algorithms(xml_input, 'automaton_minimization')
    assert return_code == 3
    assert 'Entry overload' in res
    assert 'not available' in res

    # Passing invalid source or target type to conversion
    return_code, res = interface.conversion(xml_input, 'fsm', 'rg')
    assert return_code == 1
    assert 'Unknown \'from\' parameter passed as parameter!' in res
    return_code, res = interface.conversion(xml_input, 'fa', 'gr')
    assert return_code == 1
    assert 'Unknown \'to\' parameter passed as parameter!' in res
