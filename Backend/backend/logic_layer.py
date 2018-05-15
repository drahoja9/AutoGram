"""

Logic layer module responsible for connecting all the components of the backend together.

Functions from this layer are using :mod:`JSON/XML converter <backend.XMLConverter>` module, running the
algorithm/transformation/comparison from our :mod:`Python ALT interface <backend.python_interface>` module and
delivering the results to :mod:`REST API <backend.api>` module (from where is this layer originally called).

.. module:: logic_layer
    :platform: Unix
    :synopsis: Logic layer module responsible for connecting all the components of the backend together.

.. moduleauthor:: Jakub Drahos <drahoja9@fit.cvut.cz>, Dominika Kralikova <kralidom@fit.cvut.cz>

"""

from backend import XMLConverter as Converter
from backend.python_interface import AltInterface, AltInterfaceException
from backend import AlgorithmTypes


def simple_algorithm(json_file: dict, algorithm_name: str) -> dict:
    """

    Logic layer function for calling correct JSON/XML conversion, running the algorithm through our Python ALT interface
    and converting the result back to JSON for REST API.

    :param json_file: `dictionary` containing the input (automaton, grammar or regexp)
    :param algorithm_name: `string` representing name of the algorithm to be used (see \
    :class:`~backend.AlgorithmTypes`) for available algorithm names

    :return: `dictionary` containing the output of given algorithm (automaton, grammar or regexp) OR `dictionary` with \
    exception message and exception type

    """
    try:
        if algorithm_name == AlgorithmTypes.REGEXP_DERIVATION:
            return _regexp_derivation(json_file)
        elif algorithm_name == AlgorithmTypes.GRAMMAR_LEFT_RECURSION_REMOVAL:
            return _grammar_left_recursion(json_file)
        elif algorithm_name == AlgorithmTypes.GRAMMAR_CNF_CONVERSION:
            return _grammar_cnf(json_file)
        else:
            source = Converter.json_to_xml(json_file, algorithm_name)

            with AltInterface() as interface:
                algorithm_result = interface.algorithms(source, algorithm_name)

            result = Converter.xml_to_json(algorithm_result, algorithm_name)
            return result
    except (AltInterfaceException, Converter.JSONDecodeError, Converter.XMLDecodeError) as e:
        return {'exception': e.msg, 'type': e.exc_type}


def transformation(json_file: dict) -> dict:
    """

    Logic layer function for calling correct JSON/XML conversion, running the transformation through our Python ALT
    interface and converting result back to JSON for REST API.

    :param json_file: `dictionary` containing the input (finite automaton, regular grammar or regexp)

    :return: `dictionary` containing the output of transformation (finite automaton, regular grammar or regexp) OR \
    `dictionary` with exception message and exception type

    """
    try:
        source, source_type, target_type = Converter.json_to_xml(json_file, AlgorithmTypes.TRANSFORMATION)

        with AltInterface() as interface:
            algorithm_result = interface.conversion(source, source_type, target_type)

        result = Converter.xml_to_json(algorithm_result, AlgorithmTypes.TRANSFORMATION)
        return result
    except (AltInterfaceException, Converter.JSONDecodeError, Converter.XMLDecodeError) as e:
        return {'exception': e.msg, 'type': e.exc_type}


def comparison(json_file: dict) -> dict:
    """

    Logic layer function for calling correct JSON/XML conversion, running the comparison through our Python ALT
    interface and converting result back to JSON for REST API.

    :param json_file: `dictionary` containing the input

    :return: `dictionary` containing the output of comparison (true or false) OR `dictionary` with exception message \
    and exception type

    """
    try:
        lhs, lhs_type, rhs, rhs_type = Converter.json_to_xml(json_file, AlgorithmTypes.COMPARISON)

        with AltInterface() as interface:
            algorithm_result = interface.comparison(lhs, lhs_type, rhs, rhs_type)

        result = Converter.xml_to_json(algorithm_result, AlgorithmTypes.COMPARISON)
        return result
    except (AltInterfaceException, Converter.JSONDecodeError, Converter.XMLDecodeError) as e:
        return {'exception': e.msg, 'type': e.exc_type}


def _regexp_derivation(json_file: dict) -> dict:
    """

    Logic layer function for calling correct JSON/XML conversion, running the derivation through our Python ALT
    interface and converting the result back to JSON for REST API.

    :param json_file: `dictionary` containing the input (regexp and derivation string)

    :return: `dictionary` containing the output of derivation (regexp) OR `dictionary` with exception message and \
    exception type

    """
    try:
        derivation_string, source = Converter.json_to_xml(json_file, AlgorithmTypes.REGEXP_DERIVATION)
        algorithm_steps = []

        # Derivation of regexp is called separately for each character of derivation string
        with AltInterface() as interface:
            for c in derivation_string:
                source = interface.algorithms(source, AlgorithmTypes.REGEXP_DERIVATION, c)
                algorithm_steps.append(source)

        # The last step is the desired result, but we have to delete it from algorithm_steps list to avoid duplicates
        algorithm_result = algorithm_steps[-1]
        del algorithm_steps[-1]

        result = Converter.xml_to_json(algorithm_result, AlgorithmTypes.REGEXP_DERIVATION, algorithm_steps)
        return result
    except (AltInterfaceException, Converter.JSONDecodeError, Converter.XMLDecodeError) as e:
        return {'exception': e.msg, 'type': e.exc_type}


def _grammar_cnf(json_file: dict) -> dict:
    """

    Logic layer function for calling correct JSON/XML conversion, running the CNF conversion through our Python ALT
    interface and converting the result back to JSON for REST API.

    :param json_file: `dictionary` containing the input (context-free grammar)

    :return: `dictionary` containing the output of CNF conversion (context-free grammar in CNF) OR `dictionary` with \
    exception message and exception type

    """
    try:
        source = Converter.json_to_xml(json_file, AlgorithmTypes.GRAMMAR_CNF_CONVERSION)

        # Calling CNF transformation in four steps (following BI-AAG practice), saving steps in an array
        with AltInterface() as interface:
            after_reduction = interface.algorithms(source, AlgorithmTypes.GRAMMAR_REDUCTION)
            after_epsilon = interface.algorithms(after_reduction, AlgorithmTypes.GRAMMAR_EPSILON_REMOVAL)
            after_unit = interface.algorithms(after_epsilon, AlgorithmTypes.GRAMMAR_UNIT_RULES_REMOVAL)
            after_cnf = interface.algorithms(after_unit, AlgorithmTypes.GRAMMAR_CNF_CONVERSION)

        algorithm_steps = {
            'after_reduction': after_reduction,
            'after_epsilon': after_epsilon,
            'after_unit': after_unit,
            'result': after_cnf
        }

        result = Converter.xml_to_json(algorithm_steps, AlgorithmTypes.GRAMMAR_CNF_CONVERSION)
        return result
    except (AltInterfaceException, Converter.JSONDecodeError, Converter.XMLDecodeError) as e:
        return {'exception': e.msg, 'type': e.exc_type}


def _grammar_left_recursion(json_file: dict) -> dict:
    """

    Logic layer function for calling correct JSON/XML conversion, running the left recursion removal through our Python\
    ALT interface and converting the result back to JSON for REST API.

    :param json_file: `dictionary` containing the input (context-free grammar)

    :return: `dictionary` containing the output of left recursion removal (context-free grammar without left recursion)\
    OR `dictionary` with exception message and exception type

    """
    try:
        source = Converter.json_to_xml(json_file, AlgorithmTypes.GRAMMAR_LEFT_RECURSION_REMOVAL)

        # Calling left recursion removal in four steps, saving steps in an array
        with AltInterface() as interface:
            after_reduction = interface.algorithms(source, AlgorithmTypes.GRAMMAR_REDUCTION)
            after_epsilon = interface.algorithms(after_reduction, AlgorithmTypes.GRAMMAR_EPSILON_REMOVAL)
            after_unit = interface.algorithms(after_epsilon, AlgorithmTypes.GRAMMAR_UNIT_RULES_REMOVAL)
            after_recursion = interface.algorithms(after_unit, AlgorithmTypes.GRAMMAR_LEFT_RECURSION_REMOVAL)

        algorithm_steps = {
            'after_reduction': after_reduction,
            'after_epsilon': after_epsilon,
            'after_unit': after_unit,
            'result': after_recursion
        }

        result = Converter.xml_to_json(algorithm_steps, AlgorithmTypes.GRAMMAR_LEFT_RECURSION_REMOVAL)
        return result
    except (AltInterfaceException, Converter.JSONDecodeError, Converter.XMLDecodeError) as e:
        return {'exception': e.msg, 'type': e.exc_type}

# def automaton_minimization(json_file: str) -> str:
#     try:
#         source = Converter.json_to_xml(json_file, AlgorithmTypes.AUTOMATON_MINIMIZATION)
#
#         with AltInterface() as interface:
#             algorithm_result = interface.algorithms(source, AlgorithmTypes.AUTOMATON_MINIMIZATION)
#
#         result = Converter.xml_to_json(algorithm_result, AlgorithmTypes.AUTOMATON_MINIMIZATION, algorithm_steps)
#         return result
#     except Converter.JSONDecodeError:
#         raise
#     except Converter.XMLDecodeError:
#         raise


# def grammar_cyk(json_file: str) -> str:
#     try:
#         generated_string, source = Converter.json_to_xml(json_file, AlgorithmTypes.GRAMMAR_CYK)
#         # call cyk algorithm, when implemented, should return bool result and step table as an xml_string
#         # interface can change when implemented
#         # algorithm_result, algorithm_steps = Algorithm.algorithm(source, 'grammar_cyk', generated_string)
#         result = Converter.xml_to_json(algorithm_result, AlgorithmTypes.GRAMMAR_CYK, algorithm_steps)
#         return result
#     except Converter.JSONDecodeError:
#         raise
#     except Converter.XMLDecodeError:
#         raise
