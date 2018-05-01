import XMLConverter as Converter
# add import for ALT library wrapper


def simple_algorithm(json_file: str, algorithm_name: str) -> str:
    source = Converter.json_to_xml(json_file, algorithm_name)
    # call algorithm
    # algorithm_result = Algorithm.algorithm(source, algorithm_name)
    result = Converter.xml_to_json(algorithm_result, algorithm_name)
    return result


def transformation (json_file: str) -> str:
    terget, source = Converter.json_to_xml(json_file, 'transformation')
    # call transformation algorithm of source(xml string) to the target(code name of transformation target)
    # algorithm_result = Algorithm.transform(target, source)
    result = Converter.xml_to_json(algorithm_result, 'transformation')
    return result


def comparision (json_file: str) -> str:
    lhs, rhs = Converter.json_to_xml(json_file, 'comparision')
    # call comparision algorithm to campare lhs and rhs (both xml strings), return bool for result
    # algorithm_result = Algorithm.compare(lhs, rhs)
    result = Converter.json_to_xml(algorithm_result, 'comparision')
    return result


def automaton_epsilon_removal(json_file: str) -> str:
    return simple_algorithm(json_file, 'automaton_epsilon')


def automaton_determinization(json_file: str) -> str:
    return simple_algorithm(json_file, 'automaton_determinization')


def automaton_minimization(json_file: str) -> str:
    source = Converter.json_to_xml(json_file, 'automaton_minimization')
    # call minimization algorithm, when implemented, should return the result and the steps leading to it
    # interface can change according to final implementation of the steps
    # algorithm_result, algorithm_steps = Algorithm.algorithm('automaton_minimization')
    result = Converter.xml_to_json(algorithm_result, 'automaton_minimization', algorithm_steps)
    return result


def regexp_derivation(json_file: str) -> str:
    derivation_string, source = Converter.json_to_xml(json_file, 'regexp_derivation')
    # call derivation algorithm in a loop, one character after another, save steps in an array
    # discuss: leave result as a last step in steps?
    # algorithm_steps = []
    # for c in derivation_string:
    #   algorithm_steps.append(Algorithm.algorithm(source, 'regexp_derivation', c)
    # algorithm_result = alhorithm_steps[-1]
    result = Converter.xml_to_json(algorithm_result, 'automaton_derivation', algorithm_steps)
    return result


def grammar_reduction(json_file: str) -> str:
    return simple_algorithm(json_file, 'grammar_reduction')


def grammar_epsilon_removal(json_file: str) -> str:
    return simple_algorithm(json_file, 'grammar_epsilon')


def grammar_unit_rules_removal(json_file: str) -> str:
    return simple_algorithm(json_file, 'grammar_unit')


def grammar_cnf(json_file: str) -> str:
    source = Converter.json_to_xml(json_file, 'grammar_cnf')
    # call cnf conversion in four steps, save steps in an array
    # result is not put in steps array - could stay so, or should change?
    # algorithm_steps = []
    # after_reduction = Algorithm.algorithm(source, 'grammar_reduction')
    # algorithm_steps.append(after_reduction)
    # after_epsilon = Algorithm.algorithm(after_reduction, 'grammar_epsilon')
    # algorithm_steps.append(after_epsilon)
    # after_unit= Algorithm.algorithm(after_epsilon, 'grammar_unit')
    # algorithm_steps.append(after_unit)
    # algorithm_result = Algorithm.algorithm(after_unit, 'grammar_cnf')
    result = Converter.xml_to_json(algorithm_result, 'grammar_cnf', algorithm_steps)
    return result


def grammar_left_recursion(json_file: str) -> str:
    source = Converter.json_to_xml(json_file, 'grammar_left_recursion')
    # call left recursion removal in four steps, save steps in an array
    # result is not put in steps array - could stay so, or should change?
    # algorithm_steps = []
    # after_reduction = Algorithm.algorithm(source, 'grammar_reduction')
    # algorithm_steps.append(after_reduction)
    # after_epsilon = Algorithm.algorithm(after_reduction, 'grammar_epsilon')
    # algorithm_steps.append(after_epsilon)
    # after_unit= Algorithm.algorithm(after_epsilon, 'grammar_unit')
    # algorithm_steps.append(after_unit)
    # algorithm_result = Algorithm.algorithm(after_unit, 'grammar_left_recursion')
    result = Converter.xml_to_json(algorithm_result, 'grammar_left_recursion', algorithm_steps)
    return result


def grammar_cyk(json_file: str) -> str:
    generated_string, source = Converter.json_to_xml(json_file, 'grammar_cyk')
    # call cyk algorithm, when implemented, should return bool result and step table as an xml_string
    # interface can change when implemented
    # algorithm_result, algorithm_steps = Algorithm.algorithm(source, 'grammar_cyk', generated_string)
    result = Converter.xml_to_json(algorithm_result, 'grammar_cyk', algorithm_steps)
    return result

