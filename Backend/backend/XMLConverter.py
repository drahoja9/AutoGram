import json
import xml.etree.ElementTree as ET


class JSONDecodeError(Exception):
    """
    Base exception class, raised when an error occurs while decoding JSON
    :param msg: message describing the error
    """
    def __init__(self, msg: str = ''):
        self.msg = msg


class JtXConverter:
    """
    Base class responsible for converting dictionary representation of a JSON structure
    to a string representation of an XML structure.
    """

    @staticmethod
    def _create_list_subelements(parent_element: ET.Element, children_list: list(), tag: str):
        """
        Creates and attaches a simple list of sub elements to a given parent element,
        all of them with the same specified tag and with the text attribute given in the input list.
        :param parent_element: the element created sub elements should be attached to
        :param children_list: list of string values to be used as text attributes of the new sub elements
        :param tag: string value that should be used as a name of the xml tag
        :return: nothing
        """
        for child in children_list:
            n = ET.SubElement(parent_element, tag)
            n.text = child

    @staticmethod
    def _create_single_subelement(parent_element: ET.Element, child: str, tag: str):
        """
        Creates and attaches a single sub element to a given parent element,
        new element is created with a given tag and given text.
        :param parent_element: the element created sub elements should be attached to
        :param child: string value to be used as text attribute of the new sub elements
        :param tag: string value that should be used as a name of the xml tag
        :return: nothing
        """
        n = ET.SubElement(parent_element, tag)
        n.text = child

    @staticmethod
    def _create_fa_transtitions(parent_element: ET.Element, children_list: list):
        """
        Creates and attaches list of transitions to a given parent element
        :param parent_element: the element created sub elements should be attached to
        :param children_list: list of transitions in format {'from': '', 'input': '', 'to': ''}
        :return: nothing
        """
        for transition in children_list:
            t = ET.SubElement(parent_element, 'transition')

            t_from = ET.SubElement(t, 'from')
            t_from_in = ET.SubElement(t_from, 'String')
            t_from_in.text = transition['from']

            t_input = ET.SubElement(t, 'input')
            if not transition['input']:
                ET.SubElement(t_input, 'epsilon')
            else:
                t_input_in = ET.SubElement(t_input, 'Character')
                t_input_in.text = str(ord(transition['input']))

            t_to = ET.SubElement(t, 'to')
            t_to_in = ET.SubElement(t_to, 'String')
            t_to_in.text = transition['to']

    @staticmethod
    def _create_pda_transtitions(parent_element: ET.Element, children_list: list):
        """
        Creates and attaches list of pushdown store transitions to a given parent element
        :param parent_element: the element created sub elements should be attached to
        :param children_list: list of transitions in format {'from': '', 'input': '', pop: '', 'to': '', push:''}
        :return: nothing
        """
        for transition in children_list:
            t = ET.SubElement(parent_element, 'transition')

            t_from = ET.SubElement(t, 'from')
            t_from_in = ET.SubElement(t_from, 'String')
            t_from_in.text = transition['from']

            t_input = ET.SubElement(t, 'input')
            if not transition['input']:
                ET.SubElement(t_input, 'epsilon')
            else:
                t_input_in = ET.SubElement(t_input, 'Character')
                t_input_in.text = str(ord(transition['input']))

            t_pop = ET.SubElement(t, 'pop')
            if transition['pop']:
                t_pop_in = ET.SubElement(t_pop, 'Character')
                t_pop_in.text = str(ord(transition['pop']))

            t_to = ET.SubElement(t, 'to')
            t_to_in = ET.SubElement(t_to, 'String')
            t_to_in.text = transition['to']

            t_push = ET.SubElement(t, 'push')
            if transition['push']:
                t_push_in = ET.SubElement(t_push, 'Character')
                t_push_in.text = str(ord(transition['push']))

    @staticmethod
    def _create_grammar_rules(parent_element: ET.Element, children_list: list, nonterminal_alphabet: list):
        """
        Creates and attaches list of rules to a given parent element
        :param parent_element: the element created sub elements should be attached to
        :param children_list: list of rules in format like {'from': '', 'to': ['', '']}
        :param nonterminal_alphabet: list of symbols to be tagged as "Strings", other will be tagged as "Character"
        :return: nothing
        """
        for rule in children_list:
            r = ET.SubElement(parent_element, 'rule')
            r_l = ET.SubElement(r, 'lhs')
            r_l_in = ET.SubElement(r_l, "String")
            r_l_in.text = rule['from']

            r_r = ET.SubElement(r, 'rhs')
            for symbol in rule['to']:
                if not symbol:
                    ET.SubElement(r_r, "epsilon")
                elif symbol in nonterminal_alphabet:
                    r_r_in = ET.SubElement(r_r, "String")
                    r_r_in.text = symbol
                else:
                    r_r_in = ET.SubElement(r_r, "Character")
                    r_r_in.text = str(ord(symbol))

    @staticmethod
    def _create_regexp_value(parent_element: ET.Element, value_dict: dict):
        """
        Creates and attaches regexp value part to a given parent element,
        is supposed to be called recursively
        :param parent_element: element the value should be attached to
        :param value_dict: dictionary describing the value in format like {type: '', value: ''}
        :return: nothing
        """
        type = value_dict['type']
        if type == 'term':
            sub = ET.SubElement(parent_element, 'Character')
            sub.text = str(ord(value_dict['value']))
        elif type == 'epsilon':
            ET.SubElement(parent_element, 'epsilon')
        elif type == 'empty_symbol':
            ET.SubElement(parent_element, 'empty')
        elif type == 'iteration':
            sub = ET.SubElement(parent_element, 'iteration')
            JtXConverter._create_regexp_value(sub, value_dict['value'])
        elif type == 'concatenation' or type == 'alternation':
            sub = ET.SubElement(parent_element, type)
            for dct in value_dict['value']:
                JtXConverter._create_regexp_value(sub, dct)
        else:
            raise TypeError

    @staticmethod
    def _json_to_xml_fa(json_dict: dict) -> str:
        """
        Responsible for converting dictionaries representing finite automata (DFA, NFA) to XML files
        :param json_dict: dictionary representation of a JSON structure describing finite automaton
        :return: string representation of an XML file describing given finite automaton
        """
        multi = False
        type = json_dict['type']
        if len(json_dict['initial_states']) > 1 and type == 'NFA':
            etree_root = ET.Element('MultiInitialStateNFA')
            multi = True
        elif len(json_dict['initial_states']) > 1 and not type == 'NFA':
            raise TypeError
        else:
            etree_root = ET.Element(type)

        states = ET.SubElement(etree_root, 'states')
        JtXConverter._create_list_subelements(states, json_dict['states'], "String")

        input_alphabet = ET.SubElement(etree_root, 'inputAlphabet')
        children_list = [str(ord(i)) for i in json_dict['input_alphabet']]
        JtXConverter._create_list_subelements(input_alphabet, children_list, "Character")

        if multi:
            initial_states = ET.SubElement(etree_root, 'initialStates')
        else:
            initial_states = ET.SubElement(etree_root, 'initialState')
        JtXConverter._create_list_subelements(initial_states, json_dict['initial_states'], "String")

        final_states = ET.SubElement(etree_root, 'finalStates')
        JtXConverter._create_list_subelements(final_states, json_dict['final_states'], "String")

        transitions = ET.SubElement(etree_root, 'transitions')
        JtXConverter._create_fa_transtitions(transitions, json_dict['transitions'])

        return ET.tostring(etree_root).decode()

    @staticmethod
    def _json_to_xml_pda(json_dict: dict) -> str:
        """
        Responsible for converting dictionaries representing push-down automata (DPDA, NPDA) to XML files
        param json_dict: dictionary representation of a JSON structure describing push-down automaton
        :return: string representation of an XML file describing given push-down automaton
        """
        etree_root = ET.Element(json_dict['type'])

        states = ET.SubElement(etree_root, 'states')
        JtXConverter._create_list_subelements(states, json_dict['states'], "String")

        input_alphabet = ET.SubElement(etree_root, 'inputAlphabet')
        children_list = [str(ord(i)) for i in json_dict['input_alphabet']]
        JtXConverter._create_list_subelements(input_alphabet, children_list, "Character")

        pushdown_store_alphabet = ET.SubElement(etree_root, 'pushdownStoreAlphabet')
        children_list = [str(ord(i)) for i in json_dict['pushdown_store_alphabet']]
        JtXConverter._create_list_subelements(pushdown_store_alphabet, children_list, "Character")

        initial_states = ET.SubElement(etree_root, 'initialState')
        JtXConverter._create_list_subelements(initial_states, json_dict['initial_states'], "String")

        initial_pushdown_store_symbol = ET.SubElement(etree_root, 'initialPushdownStoreSymbol')
        child = str(ord(json_dict['initial_pushdown_store_symbol']))
        JtXConverter._create_single_subelement(initial_pushdown_store_symbol, child, 'Character')

        final_states = ET.SubElement(etree_root, 'finalStates')
        JtXConverter._create_list_subelements(final_states, json_dict['final_states'], "String")

        transitions = ET.SubElement(etree_root, 'transitions')
        JtXConverter._create_pda_transtitions(transitions, json_dict['transitions'])

        return ET.tostring(etree_root).decode()

    @staticmethod
    def _json_to_xml_grammar(json_dict: dict) -> str:
        """
        Responsible for converting dictionaries representing grammars (RightRG, CFG, CNF) to XML files
        param json_dict: dictionary representation of a JSON structure describing grammar
        :return: string representation of an XML file describing given grammar
        """
        type = json_dict['type']
        etree_root = ET.Element(type)

        nonterminal_alphabet = ET.SubElement(etree_root, 'nonterminalAlphabet')
        JtXConverter._create_list_subelements(nonterminal_alphabet, json_dict['nonterminal_alphabet'], "String")

        terminal_alphabet = ET.SubElement(etree_root, 'terminalAlphabet')
        children_list = [str(ord(i)) for i in json_dict['terminal_alphabet']]
        JtXConverter._create_list_subelements(terminal_alphabet, children_list, "Character")

        initial_symbol = ET.SubElement(etree_root, 'initialSymbol')
        JtXConverter._create_single_subelement(initial_symbol, json_dict['initial_symbol'], "String")

        rules = ET.SubElement(etree_root, 'rules')
        JtXConverter._create_grammar_rules(rules, json_dict['rules'], json_dict["nonterminal_alphabet"])

        if type == "RightRG" or type == "CNF":
            generates_epsilon = ET.SubElement(etree_root, 'generatesEpsilon')
            if json_dict['generates_epsilon']:
                ET.SubElement(generates_epsilon, "true")
            else:
                ET.SubElement(generates_epsilon, "false")

        return ET.tostring(etree_root).decode()

    @staticmethod
    def _json_to_xml_regexp(json_dict: dict) -> str:
        """
        Responsible for converting dictionaries representing regular expressions (UnboundedRegExp) to XML files
        param json_dict: dictionary representation of a JSON structure describing regular expression
        :return: string representation of an XML file describing given regular expression
        """
        etree_root = ET.Element(json_dict['type'])

        alphabet = ET.SubElement(etree_root, 'alphabet')
        children_list = [str(ord(i)) for i in json_dict['alphabet']]
        JtXConverter._create_list_subelements(alphabet, children_list, 'Character')
        JtXConverter._create_regexp_value(etree_root, json_dict['value'])

        return ET.tostring(etree_root).decode()

    @staticmethod
    def simple_json_to_xml(json_dict: dict) -> str:
        """
        Base mathod the the class, takes dictionary representation of an JSON file,
        and converts it to an XML string
        :param json_dict: dictionary representation of an JSON file
        :return: string representation of an XML file that was converted from given JSON
        """
        type = json_dict['type']
        if type == "NFA" or type == "DFA" or type == "EpsilonNFA":
            res = JtXConverter._json_to_xml_fa(json_dict)
        elif type == "RightRG" or type == "CFG" or type == "CNF":
            res = JtXConverter._json_to_xml_grammar(json_dict)
        elif type == "UnboundedRegExp":
            res = JtXConverter._json_to_xml_regexp(json_dict)
        elif type == "DPDA" or type == "NPDA":
            res = JtXConverter._json_to_xml_pda(json_dict)
        else:
            raise TypeError
        return res

    @staticmethod
    def comparision_json_to_xml(json_dict: dict) -> (str, str):
        """
        Takes dictionary representation of an JSON file describing comparision
        and returns XML representations of structures to be compared
        :param json_dict: dictionary representation of an JSON file
        :return: tuple of string representations of XML files
        """
        res1 = JtXConverter.simple_json_to_xml(json_dict['lhs'])
        res2 = JtXConverter.simple_json_to_xml(json_dict['rhs'])
        return res1, res2

    @staticmethod
    def transformation_json_to_xml(json_dict: dict) -> (str, str):
        """
        Takes dictionary representation of an JSON file describing transformation
        and returns transformation target and transformation source in XML string
        :param json_dict: dictionary representation of an JSON file
        :return: tuple of string code for transformation target and string XML
        representation of the transformation source
        """
        res = JtXConverter.simple_json_to_xml(json_dict['source'])
        return json_dict['target'], res

    @staticmethod
    def derivation_json_to_xml(json_dict: dict) -> (str, str):
        """
        Takes dictionary representation of an JSON file describing derivation
        and returns drivation string and derived regexp as XML string
        :param json_dict: dictionary representation of an JSON file
        :return: tuple of derivation string and string XML representation of the derived regular expression
        """
        res = JtXConverter.simple_json_to_xml(json_dict['regexp'])
        return json_dict['derivation_string'], res


def json_to_xml(json_file: str, param: str = None):
    """
    Converts given JSON string representation to corresponding XML string representation
    :param json_file: string with JSON file to convert
    :param param: optional parameter describing JSON file structure - if it's simple,
    or one of the special cases - comparision, transformation or derivation.
    If it's not a special case, it can be omitted.
    :return: representation of a converted JSON file, usually XML string or tuple of XML strings and needed parameters
    """
    try:
        json_dict = json.loads(json_file)
        if param == 'comparision':
            return JtXConverter.comparision_json_to_xml(json_dict)
        elif param == 'transformation':
            return JtXConverter.transformation_json_to_xml(json_dict)
        elif param == 'derivation':
            return JtXConverter.derivation_json_to_xml(json_dict)
        else:
            return JtXConverter.simple_json_to_xml(json_dict)
    except json.JSONDecodeError:
        raise JSONDecodeError("JSON decode exception")
    except (KeyError, TypeError):
        raise JSONDecodeError("Invalid JSON structure")
    except:
        raise JSONDecodeError("Unexpected exception occurred")


def jtx_file_tester(infile: str, param: str = None):
    # tester function, takes parameter with name of the json file, converts it to xml and saves the result to a file
    with open("../examples/" + infile + ".json") as f1:
        json_text = f1.read()
        result = json_to_xml(json_text, param)
        print(result)
        # with open("../examples/" + infile + "_res.xml", "w") as f2:
        #     f2.write(result)

# jtx_file_tester("comparision", "comparision")
# jtx_file_tester("transformation", "transformation")
# jtx_file_tester("derivation", "derivation")

# jtx_file_tester("EpsilonPDA")
# jtx_file_tester("DPDA")

# jtx_file_tester("UnboundedRegExp")
# jtx_file_tester("EEUnboundedRegExp")

# jtx_file_tester("RightRG")
# jtx_file_tester("CFG")
# jtx_file_tester("EpsilonCFG")
# jtx_file_tester("CNF")

# jtx_file_tester("DFA")
# jtx_file_tester("NFA")
# jtx_file_tester("EpsilonNFA")
# jtx_file_tester("MultiInitialStateNFA")


