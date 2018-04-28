import json
import xml.etree.ElementTree as ET

from pprint import pprint

# todo add protection for invalid JSON structure
# todo add own exception class
# todo chatch jsondecodeerrors


class Converter:

    @staticmethod
    def _create_list_subelements(parent_element: ET.Element, children_list: list(str), tag: str):
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
    def _create_grammar_rules(parent_element: ET.Element, children_list: list, nonterminal_alphabet: list):
        """
        Creates and attaches list of rules to a given parent element
        :param parent_element: the element created sub elements should be attached to
        :param children_list: list of rules in format like {'lhs': [['', '']], 'rhs': [[''], ['']]}
        :param nonterminal_alphabet: list of symbols to be tagged as "Strings", other will be tagged as "Character"
        :return: nothing
        """
        for rule in children_list:
            for entry in rule['rhs']:
                r = ET.SubElement(parent_element, 'rule')
                r_l = ET.SubElement(r, 'lhs')
                r_l_in = ET.SubElement(r_l, "String")
                r_l_in.text = rule['lhs']

                r_r = ET.SubElement(r, 'rhs')
                for symbol in entry:
                    if not symbol:
                        r_r_in = ET.SubElement(r_r, "epsilon")
                    elif symbol in nonterminal_alphabet:
                        r_r_in = ET.SubElement(r_r, "String")
                        r_r_in.text = symbol
                    else:
                        r_r_in = ET.SubElement(r_r, "Character")
                        r_r_in.text = str(ord(symbol))

    @staticmethod
    def json_to_xml(json_file: str) -> str:
        """
        Base function the the class, takes string representation of an JSON file,
        converts it to a dictionary and then to XML string
        :param json_file: string representation of an JSON file
        :return: string representation of an XML file that was converted from given JSON
        """
        json_dict = json.loads(json_file)
        # pprint(json_dict)
        res = ''
        try:
            type = json_dict['type']
            if type == "NFA" or type == "DFA" or type == "EpsilonNFA":
                res = Converter._json_to_xml_fa(json_dict)
            if type == "RightRG" or type == "CFG" or type == "CNF":
                res = Converter._json_to_xml_grammar(json_dict)
            else:
                print("ERROR: converter got unknown type")
                # todo raise exception here
        except KeyError:
            # todo raise exception here
            print("ERROR: converter got unknown key")
        except TypeError:
            # todo raise exception here
            print("ERROR: converter got unknown type")
        return res

    @staticmethod
    def _json_to_xml_fa(json_dict: dict) -> str:
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
        Converter._create_list_subelements(states, json_dict['states'], "String")

        input_alphabet = ET.SubElement(etree_root, 'inputAlphabet')
        children_list = [str(ord(i)) for i in json_dict['input_alphabet']]
        Converter._create_list_subelements(input_alphabet, children_list, "Character")

        if multi:
            initial_states = ET.SubElement(etree_root, 'initialStates')
        else:
            initial_states = ET.SubElement(etree_root, 'initialState')
        Converter._create_list_subelements(initial_states, json_dict['initial_states'], "String")

        final_states = ET.SubElement(etree_root, 'finalStates')
        Converter._create_list_subelements(final_states, json_dict['final_states'], "String")

        transitions = ET.SubElement(etree_root, 'transitions')
        Converter._create_fa_transtitions(transitions, json_dict['transitions'])

        return ET.tostring(etree_root).decode()

    @staticmethod
    def _json_to_xml_grammar(json_dict: dict) -> str:
        type = json_dict['type']
        etree_root = ET.Element(type)

        nonterminal_alphabet = ET.SubElement(etree_root, 'nonterminalAlphabet')
        Converter._create_list_subelements(nonterminal_alphabet, json_dict['nonterminal_alphabet'], "String")

        terminal_alphabet = ET.SubElement(etree_root, 'terminalAlphabet')
        children_list = [str(ord(i)) for i in json_dict['terminal_alphabet']]
        Converter._create_list_subelements(terminal_alphabet, children_list, "Character")

        initial_symbol = ET.SubElement(etree_root, 'initialSymbol')
        Converter._create_single_subelement(initial_symbol, json_dict['initial_symbol'], "String")

        rules = ET.SubElement(etree_root, 'rules')
        Converter._create_grammar_rules(rules, json_dict['rules'], json_dict["nonterminal_alphabet"])

        if type == "RightRG" or type == "CNF":
            generates_epsilon = ET.SubElement(etree_root, 'generatesEpsilon')
            if json_dict['generates_epsilon']:
                ET.SubElement(generates_epsilon, "true")
            else:
                ET.SubElement(generates_epsilon, "false")

        return ET.tostring(etree_root).decode()


def jtx_file_tester(infile: str):
    # tester function, takes parameter with name of the json file, converts it to xml and saves the result to a file
    with open("../examples/" + infile + ".json") as f1:
        json_text = f1.read()
        result = Converter.json_to_xml(json_text)
        with open("../examples/" + infile + "_res.xml", "w") as f2:
            f2.write(result)

# jtx_file_tester("RightRG")
# jtx_file_tester("CFG")
# jtx_file_tester("EpsilonCFG")
# jtx_file_tester("CNF")
#
# jtx_file_tester("DFA")
# jtx_file_tester("NFA")
# jtx_file_tester("EpsilonNFA")
# jtx_file_tester("MultiInitialStateNFA")


