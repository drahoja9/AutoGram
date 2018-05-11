from backend import XMLConverter as Converter
from backend.python_interface import AltInterface, AltInterfaceException
from backend import AlgorithmTypes


def simple_algorithm(json_file: str, algorithm_name: str) -> str:
    try:
        source = Converter.json_to_xml(json_file, algorithm_name)

        with AltInterface() as interface:
            algorithm_result = interface.algorithms(source, algorithm_name)

        result = Converter.xml_to_json(algorithm_result, algorithm_name)
        return result
    # TODO: What to do with different exceptions? What to send to the API/USER?
    except AltInterfaceException as e:
        raise
    except Converter.JSONDecodeError as e:
        raise
    except Converter.XMLDecodeError as e:
        raise


def transformation(json_file: str) -> str:
    try:
        source, source_type, target_type = Converter.json_to_xml(json_file, AlgorithmTypes.TRANSFORMATION)

        with AltInterface() as interface:
            algorithm_result = interface.transform(source, source_type, target_type)

        result = Converter.xml_to_json(algorithm_result, AlgorithmTypes.TRANSFORMATION)
        return result
    except AltInterfaceException:
        raise
    except Converter.JSONDecodeError:
        raise
    except Converter.XMLDecodeError:
        raise


def comparison(json_file: str) -> str:
    try:
        lhs, lhs_type, rhs, rhs_type = Converter.json_to_xml(json_file, AlgorithmTypes.COMPARISON)

        with AltInterface() as interface:
            algorithm_result = interface.comparison(lhs, lhs_type, rhs, rhs_type)

        result = Converter.xml_to_json(algorithm_result, AlgorithmTypes.COMPARISON)
        return result
    except AltInterfaceException:
        raise
    except Converter.JSONDecodeError:
        raise
    except Converter.XMLDecodeError:
        raise
#
#
# def automaton_epsilon_removal(json_file: str) -> str:
#     try:
#         return simple_algorithm(json_file, AlgorithmTypes.AUTOMATON_EPSILON_REMOVAL)
#     except Converter.JSONDecodeError:
#         raise
#     except Converter.XMLDecodeError:
#         raise
#
#
# def automaton_determinization(json_file: str) -> str:
#     try:
#         return simple_algorithm(json_file, AlgorithmTypes.AUTOMATON_DETERMINIZATION)
#     except Converter.JSONDecodeError:
#         raise
#     except Converter.XMLDecodeError:
#         raise
#
#
# def automaton_minimization(json_file: str) -> str:
#     try:
#         source = Converter.json_to_xml(json_file, AlgorithmTypes.AUTOMATON_MINIMIZATION)
#         # call minimization algorithm, when implemented, should return the result and the steps leading to it
#         # interface can change according to final implementation of the steps
#         # algorithm_result, algorithm_steps = Algorithm.algorithm('automaton_minimization')
#         result = Converter.xml_to_json(algorithm_result, AlgorithmTypes.AUTOMATON_MINIMIZATION, algorithm_steps)
#         return result
#     except Converter.JSONDecodeError:
#         raise
#     except Converter.XMLDecodeError:
#         raise
#
#
# def regexp_derivation(json_file: str) -> str:
#     try:
#         derivation_string, source = Converter.json_to_xml(json_file, AlgorithmTypes.REGEXP_DERIVATION)
#         # call derivation algorithm in a loop, one character after another, save steps in an array
#         # discuss: leave result as a last step in steps?
#         # algorithm_steps = []
#         # for c in derivation_string:
#         #   algorithm_steps.append(Algorithm.algorithm(source, 'regexp_derivation', c)
#         # algorithm_result = alhorithm_steps[-1]
#         result = Converter.xml_to_json(algorithm_result, AlgorithmTypes.REGEXP_DERIVATION, algorithm_steps)
#         return result
#     except Converter.JSONDecodeError:
#         raise
#     except Converter.XMLDecodeError:
#         raise
#
#
# def grammar_reduction(json_file: str) -> str:
#     try:
#         return simple_algorithm(json_file, AlgorithmTypes.GRAMMAR_REDUCTION)
#     except Converter.JSONDecodeError:
#         raise
#     except Converter.XMLDecodeError:
#         raise
#
#
# def grammar_epsilon_removal(json_file: str) -> str:
#     try:
#         return simple_algorithm(json_file, AlgorithmTypes.GRAMMAR_EPSILON_REMOVAL)
#     except Converter.JSONDecodeError:
#         raise
#     except Converter.XMLDecodeError:
#         raise
#
#
# def grammar_unit_rules_removal(json_file: str) -> str:
#     try:
#         return simple_algorithm(json_file, AlgorithmTypes.GRAMMAR_UNIT_RULES_REMOVAL)
#     except Converter.JSONDecodeError:
#         raise
#     except Converter.XMLDecodeError:
#         raise
#
#


def grammar_cnf(json_file: str) -> str:
    try:
        source = Converter.json_to_xml(json_file, AlgorithmTypes.GRAMMAR_CNF_CONVERSION)

        # Calling CNF transformation in four steps, saving steps in an array
        with AltInterface() as interface:
            after_reduction = interface.algorithms(source, AlgorithmTypes.GRAMMAR_REDUCTION)
            after_epsilon = interface.algorithms(after_reduction, AlgorithmTypes.GRAMMAR_EPSILON_REMOVAL)
            after_unit = interface.algorithms(after_epsilon, AlgorithmTypes.GRAMMAR_UNIT_RULES_REMOVAL)
            after_cnf = interface.algorithms(after_unit, AlgorithmTypes.GRAMMAR_CNF_CONVERSION)

        algorithm_steps = {'after_reduction': after_reduction, 'after_epsilon': after_epsilon,
                           'after_unit': after_unit, 'result': after_cnf}
        result = Converter.xml_to_json(algorithm_steps, AlgorithmTypes.GRAMMAR_CNF_CONVERSION)
        return result
    except Converter.JSONDecodeError:
        raise
    except Converter.XMLDecodeError:
        raise


def grammar_left_recursion(json_file: str) -> str:
    try:
        source = Converter.json_to_xml(json_file, AlgorithmTypes.GRAMMAR_LEFT_RECURSION_REMOVAL)

        # Calling left recursion removal in four steps, saving steps in an array
        with AltInterface() as interface:
            after_reduction = interface.algorithms(source, AlgorithmTypes.GRAMMAR_REDUCTION)
            after_epsilon = interface.algorithms(after_reduction, AlgorithmTypes.GRAMMAR_EPSILON_REMOVAL)
            after_unit = interface.algorithms(after_epsilon, AlgorithmTypes.GRAMMAR_UNIT_RULES_REMOVAL)
            after_recursion = interface.algorithms(after_unit, AlgorithmTypes.GRAMMAR_LEFT_RECURSION_REMOVAL)

        algorithm_steps = {'after_reduction': after_reduction, 'after_epsilon': after_epsilon,
                           'after_unit': after_unit, 'result': after_recursion}
        result = Converter.xml_to_json(algorithm_steps, AlgorithmTypes.GRAMMAR_LEFT_RECURSION_REMOVAL)
        return result
    except Converter.JSONDecodeError:
        raise
    except Converter.XMLDecodeError:
        raise
#
#
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
