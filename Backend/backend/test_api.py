# from backend.logic_layer import simple_algorithm
#
# from backend import XMLConverter as Converter
# from backend import AlgorithmTypes
# from backend.python_interface import AltInterface, AltInterfaceException
#
#
# with open('tests/examples/grammar/CFG1.EPSILON.xml') as f:
#     xml_input = f.read()
# with open('tests/examples/grammar/CFG1.EPSILON_RES.xml') as f:
#     expected = f.read()
#
# json_input = Converter.xml_to_json(xml_input)
# res = simple_algorithm(json_input, AlgorithmTypes.GRAMMAR_REDUCTION)
# xml_output = Converter.json_to_xml(res)
#
#
# with AltInterface() as interface:
#     res_code, res = interface.algorithms(xml_output, AlgorithmTypes.GRAMMAR_EPSILON_REMOVAL)
#     print(interface.comparison(res, 'cfg', expected, 'cfg'))
