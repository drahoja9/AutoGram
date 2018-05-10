import pytest
import os

from backend import logic_layer, XMLConverter, AlgorithmTypes
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


@pytest.mark.parametrize('input_file, algorithm, expected', [
    (AUTOMATA + '/DFA1.TRIM.xml', AlgorithmTypes.AUTOMATON_TRIM, AUTOMATA + '/DFA1.TRIM_RES.xml'),
    (AUTOMATA + '/DFA2.TRIM.xml', AlgorithmTypes.AUTOMATON_TRIM, AUTOMATA + '/DFA2.TRIM_RES.xml'),
    (AUTOMATA + '/ENFA1.EPSILON.xml', AlgorithmTypes.AUTOMATON_EPSILON_REMOVAL, AUTOMATA + '/ENFA1.EPSILON_RES.xml'),
    (AUTOMATA + '/ENFA2.EPSILON.xml', AlgorithmTypes.AUTOMATON_EPSILON_REMOVAL, AUTOMATA + '/ENFA2.EPSILON_RES.xml'),
    (AUTOMATA + '/NFSM1.xml', AlgorithmTypes.AUTOMATON_DETERMINIZATION, AUTOMATA + '/NFSM1.DET.xml'),
    (AUTOMATA + '/NFSM2.xml', AlgorithmTypes.AUTOMATON_DETERMINIZATION, AUTOMATA + '/NFSM2.DET.xml'),
    (AUTOMATA + '/NFSM3.xml', AlgorithmTypes.AUTOMATON_DETERMINIZATION, AUTOMATA + '/NFSM3.DET.xml'),
    (AUTOMATA + '/NFSM4.xml', AlgorithmTypes.AUTOMATON_DETERMINIZATION, AUTOMATA + '/NFSM4.DET.xml'),
    (AUTOMATA + '/NFSM5.xml', AlgorithmTypes.AUTOMATON_DETERMINIZATION, AUTOMATA + '/NFSM5.DET.xml'),
])
def test_simple_algorithm(interface, input_file, algorithm, expected):
    xml_input = read_input(input_file)
    expected_output = read_input(expected)

    json_input = XMLConverter.xml_to_json(xml_input)
    result = logic_layer.simple_algorithm(json_input, algorithm)

    xml_output = XMLConverter.json_to_xml(result)
    res_code, res = interface.comparison(xml_output, 'fa', expected_output, 'fa')
    assert res_code == 0
    assert res == 'True'
