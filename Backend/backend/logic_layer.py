from backend import XMLConverter as Converter
from backend.python_interface import AltInterface
from backend import AlgorithmTypes


def simple_algorithm(json_file: str, algorithm_name: str) -> str:
    source = Converter.json_to_xml(json_file, algorithm_name)

    with AltInterface() as interface:
        algorithm_result = interface.algorithms(source, algorithm_name)

    result = Converter.xml_to_json(algorithm_result, algorithm_name)
    return result


# def transformation (json_file: str) -> str:
#     try:
#         terget, source = Converter.json_to_xml(json_file, AlgorithmTypes.TRANSFORMATION)
#         # call transformation algorithm of source(xml string) to the target(code name of transformation target)
#         # algorithm_result = Algorithm.transform(target, source)
#         result = Converter.xml_to_json(algorithm_result, AlgorithmTypes.TRANSFORMATION)
#         return result
#     except Converter.JSONDecodeError:
#         raise
#     except Converter.XMLDecodeError:
#         raise
#
#
# def comparison (json_file: str) -> str:
#     try:
#         lhs, rhs = Converter.json_to_xml(json_file, AlgorithmTypes.COMPARISON)
#         # call comparison algorithm to campare lhs and rhs (both xml strings), return bool for result
#         # algorithm_result = Algorithm.compare(lhs, rhs)
#         result = Converter.json_to_xml(algorithm_result, AlgorithmTypes.COMPARISON)
#         return result
#     except Converter.JSONDecodeError:
#         raise
#     except Converter.XMLDecodeError:
#         raise
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
# def grammar_cnf(json_file: str) -> str:
#     try:
#         source = Converter.json_to_xml(json_file, AlgorithmTypes.GRAMMAR_CNF_CONVERSION)
#         # call cnf conversion in four steps, save steps in an array
#         # result is not put in steps array - could stay so, or should change?
#         # algorithm_steps = []
#         # after_reduction = Algorithm.algorithm(source, 'grammar_reduction')
#         # algorithm_steps.append(after_reduction)
#         # after_epsilon = Algorithm.algorithm(after_reduction, 'grammar_epsilon')
#         # algorithm_steps.append(after_epsilon)
#         # after_unit= Algorithm.algorithm(after_epsilon, 'grammar_unit')
#         # algorithm_steps.append(after_unit)
#         # algorithm_result = Algorithm.algorithm(after_unit, 'grammar_cnf')
#         result = Converter.xml_to_json(algorithm_result, AlgorithmTypes.GRAMMAR_CNF_CONVERSION, algorithm_steps)
#         return result
#     except Converter.JSONDecodeError:
#         raise
#     except Converter.XMLDecodeError:
#         raise
#
#
# def grammar_left_recursion(json_file: str) -> str:
#     try:
#         source = Converter.json_to_xml(json_file, AlgorithmTypes.GRAMMAR_LEFT_RECURSION_REMOVAL)
#         # call left recursion removal in four steps, save steps in an array
#         # result is not put in steps array - could stay so, or should change?
#         # algorithm_steps = []
#         # after_reduction = Algorithm.algorithm(source, 'grammar_reduction')
#         # algorithm_steps.append(after_reduction)
#         # after_epsilon = Algorithm.algorithm(after_reduction, 'grammar_epsilon')
#         # algorithm_steps.append(after_epsilon)
#         # after_unit= Algorithm.algorithm(after_epsilon, 'grammar_unit')
#         # algorithm_steps.append(after_unit)
#         # algorithm_result = Algorithm.algorithm(after_unit, 'grammar_left_recursion')
#         result = Converter.xml_to_json(algorithm_result, AlgorithmTypes.GRAMMAR_LEFT_RECURSION_REMOVAL, algorithm_steps)
#         return result
#     except Converter.JSONDecodeError:
#         raise
#     except Converter.XMLDecodeError:
#         raise
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
