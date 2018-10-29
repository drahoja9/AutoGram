"""

Module responsible for converting JSON from :mod:`REST API <backend.api>` to XML compatible with `ALT library`_ and
converting this XML back to JSON for :mod:`REST API <backend.api>`.

.. _ALT library: https://gitlab.fit.cvut.cz/algorithms-library-toolkit/automata-library

.. module:: XMLConverter
    :platform: Unix
    :synopsis: Module responsible for converting JSON from REST API to XML compatible with ALT library and converting \
    this XML back to JSON for REST API.

.. moduleauthor:: Dominika Kralikova <kralidom@fit.cvut.cz>

"""


import json
import xml.etree.ElementTree as ET
from backend import ObjectTypes
from backend import AlgorithmTypes

XML_VERSION = '<?xml version="1.0"?>'


class JSONDecodeError(Exception):
    """

    Base exception class, raised when an error occurs while processing JSON

    :param msg: message describing the error

    """

    def __init__(self, msg: str = ''):
        self.msg = msg
        self.exc_type = self.__class__


class XMLDecodeError(Exception):
    """

    Base exception class, raised when an error occurs while processing XML

    :param msg: message describing the error

    """

    def __init__(self, msg: str = ''):
        self.msg = msg
        self.exc_type = self.__class__


# ----------------------------------------------------------------------------------------------------------------------


class JtXConverter:
    """

    Base class responsible for converting `dictionary` representation of a JSON structure
    to a `string` representation of an XML structure.

    """

    @staticmethod
    def _create_list_subelements(parent_element: ET.Element, children_list: list, tag: str):
        """

        Creates a simple list of sub elements and attaches it to a given parent element,
        all of them with the same specified tag and with the text attribute given in the input list.

        :param parent_element: the element, that created sub elements should be attached to
        :param children_list: `list` of `string` values to be used as text attributes of the new sub elements
        :param tag: `string` value that should be used as a name of the xml tag

        """
        for child in children_list:
            n = ET.SubElement(parent_element, tag)
            n.text = child

    @staticmethod
    def _create_single_subelement(parent_element: ET.Element, child: str, tag: str):
        """

        Creates a single sub element and attaches it to a given parent element.
        New element is created with a given tag and given text.

        :param parent_element: the element that created sub elements should be attached to
        :param child: `string` value to be used as text attribute of the new sub elements
        :param tag: `string` value that should be used as a name of the xml tag

        """
        n = ET.SubElement(parent_element, tag)
        n.text = child

    @staticmethod
    def _create_fa_transitions(parent_element: ET.Element, children_list: list):
        """

        Creates list of transitions and attaches it to a given parent element

        :param parent_element: the element, that created sub elements should be attached to
        :param children_list: `list` of transitions in format {'from': '', 'input': '', 'to': ''}

        :raises KeyError: when JSON `dict` has wrong structure of transitions
        :raises TypeError: when there are wrong types of values in JSON `dict` (input is not Character)

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
    def _create_pda_transitions(parent_element: ET.Element, children_list: list):
        """

        Creates `list` of pushdown store transitions and attaches it to a given parent element

        :param parent_element: the element, that created sub elements should be attached to
        :param children_list: `list` of transitions in format {'from': '', 'input': '', pop: [''], 'to': '', push:['']}

        :raises KeyError: when JSON `dict` has wrong structure of transitions
        :raises TypeError: when there are wrong types of values in JSON `dict` (input, pop and push must be \
        Characters) or when JSON `dict` has wrong structure of transitions

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
            children_list = [str(ord(i)) for i in transition['pop']]
            JtXConverter._create_list_subelements(t_pop, children_list, 'Character')

            t_to = ET.SubElement(t, 'to')
            t_to_in = ET.SubElement(t_to, 'String')
            t_to_in.text = transition['to']

            t_push = ET.SubElement(t, 'push')
            children_list = [str(ord(i)) for i in transition['push']]
            JtXConverter._create_list_subelements(t_push, children_list, 'Character')

    @staticmethod
    def _create_grammar_rules(parent_element: ET.Element, children_list: list, nonterminal_alphabet: list,
                              allow_epsilon: bool, initial_symbol: str):
        """

        Creates list of rules and attaches it to a given parent element

        :param parent_element: the element, that created sub elements should be attached to
        :param children_list: `list` of rules in format like {'from': '', 'to': ['', '']}
        :param nonterminal_alphabet: `list` of symbols to be tagged as "Strings", other will be tagged as "Character"
        :param allow_epsilon: `bool` value, `True` if rule "rewrite initial symbol to epsilon" should be allowed to be \
        in XML, `False` otherwise
        :param initial_symbol: initial symbol of grammar

        :raises KeyError: when JSON `dict` has wrong structure of grammar rules
        :raises TypeError: when there are wrong types of values in JSON `dict` (terminal symbols must be Characters), \
        or when JSON `dict` has wrong structure of grammar rules

        """
        for rule in children_list:
            # skip epsilon at initial symbol
            if not allow_epsilon and rule == {'from': initial_symbol, 'to': [None]}:
                continue
            # continue normally
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
    def _create_grammar_generates_epsilon(parent_element: ET.Element, rule_list: list, initial_symbol: str):
        """

        Transforms grammar to the type accepted by library - adds value to generatesEpsilon tag, \
        true if the rule "rewrite initial symbol to epsilon" was present in the original grammar

        :param parent_element: already created generatesEpsilon tag
        :param rule_list: rule `list` of grammar
        :param initial_symbol: initial symbol of grammar

        """
        null_rule = {'from': initial_symbol, 'to': [None]}
        if null_rule in rule_list:
            ET.SubElement(parent_element, 'true')
        else:
            ET.SubElement(parent_element, 'false')

    @staticmethod
    def _create_regexp_value(parent_element: ET.Element, value_dict: dict):
        """

        Creates regexp value part and attaches it to a given parent element.
        It is supposed to be called recursively

        :param parent_element: element, that the value should be attached to
        :param value_dict: `dictionary` describing the value in format like {type: '', value: ''}

        :raises KeyError: when JSON `dict` has wrong structure of regexp value
        :raises TypeError: when there are wrong types of values in JSON `dict` (alphabet symbols must be Characters), \
        or when JSON `dict` has wrong structure of regexp value or when there is unknown type value

        """
        node_type = value_dict['type']
        if node_type == 'term':
            sub = ET.SubElement(parent_element, 'Character')
            sub.text = str(ord(value_dict['value']))
        elif node_type == 'epsilon':
            ET.SubElement(parent_element, 'epsilon')
        elif node_type == 'empty_symbol':
            ET.SubElement(parent_element, 'empty')
        elif node_type == 'iteration':
            sub = ET.SubElement(parent_element, 'iteration')
            JtXConverter._create_regexp_value(sub, value_dict['value'])
        elif node_type == 'concatenation' or node_type == 'alternation':
            sub = ET.SubElement(parent_element, node_type)
            for dct in value_dict['value']:
                JtXConverter._create_regexp_value(sub, dct)
        else:
            raise TypeError

    @staticmethod
    def _json_to_xml_fa(json_dict: dict) -> str:
        """

        Responsible for converting dictionaries representing finite automata (DFA, NFA) to XML files

        :param json_dict: `dictionary` representation of a JSON structure describing finite automaton

        :return: `string` representation of an XML file describing given finite automaton

        :raises KeyError: when JSON `dict` has wrong structure
        :raises TypeError: when there are wrong types of values in JSON `dict` (input symbols must be Characters), \
        or when JSON `dict` has wrong structure or when there is bad combination of automaton type and properties

        """
        multi = False
        a_type = json_dict['type']
        if len(json_dict['initial_states']) > 1 and a_type == ObjectTypes.NFA:
            etree_root = ET.Element(ObjectTypes.MultiNFA)
            multi = True
        elif len(json_dict['initial_states']) > 1 and not a_type == ObjectTypes.NFA:
            raise TypeError
        else:
            etree_root = ET.Element(a_type)

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
        JtXConverter._create_fa_transitions(transitions, json_dict['transitions'])

        return ET.tostring(etree_root).decode()

    @staticmethod
    def _json_to_xml_pda(json_dict: dict) -> str:
        """

        Responsible for converting `dictionaries` representing push-down automata (DPDA, NPDA) to XML files

        :param json_dict: `dictionary` representation of a JSON structure describing push-down automaton

        :return: `string` representation of an XML file describing given push-down automaton

        :raises KeyError: when JSON `dict` has wrong structure
        :raises TypeError: when there are wrong types of values in JSON `dict` (input, push and pop symbols must be \
        Characters), or when JSON `dict` has wrong structure

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
        JtXConverter._create_pda_transitions(transitions, json_dict['transitions'])

        return ET.tostring(etree_root).decode()

    @staticmethod
    def _json_to_xml_grammar(json_dict: dict) -> str:
        """

        Responsible for converting `dictionaries` representing grammars (RightRG, CFG, CNF) to XML files

        :param json_dict: `dictionary` representation of a JSON structure describing grammar

        :return: `string` representation of an XML file describing given grammar

        :raises KeyError: when JSON `dict` has wrong structure
        :raises TypeError: when there are wrong types of values in JSON `dict` (terminal symbols must be Characters), \
        or when JSON `dict` has wrong structure

        """
        g_type = json_dict['type']
        etree_root = ET.Element(g_type)

        nonterminal_alphabet = ET.SubElement(etree_root, 'nonterminalAlphabet')
        JtXConverter._create_list_subelements(nonterminal_alphabet, json_dict['nonterminal_alphabet'], "String")

        terminal_alphabet = ET.SubElement(etree_root, 'terminalAlphabet')
        children_list = [str(ord(i)) for i in json_dict['terminal_alphabet']]
        JtXConverter._create_list_subelements(terminal_alphabet, children_list, "Character")

        initial_symbol = ET.SubElement(etree_root, 'initialSymbol')
        JtXConverter._create_single_subelement(initial_symbol, json_dict['initial_symbol'], "String")

        rules = ET.SubElement(etree_root, 'rules')
        allow_epsilon = g_type == ObjectTypes.CFG
        JtXConverter._create_grammar_rules(rules, json_dict['rules'], json_dict["nonterminal_alphabet"], allow_epsilon,
                                           json_dict['initial_symbol'])

        if g_type == ObjectTypes.RG or g_type == ObjectTypes.CNF:
            generates_epsilon = ET.SubElement(etree_root, 'generatesEpsilon')
            JtXConverter._create_grammar_generates_epsilon(generates_epsilon, json_dict['rules'],
                                                           json_dict['initial_symbol'])

        return ET.tostring(etree_root).decode()

    @staticmethod
    def _json_to_xml_regexp(json_dict: dict) -> str:
        """

        Responsible for converting `dictionaries` representing regular expressions (UnboundedRegExp) to XML files

        :param json_dict: `dictionary` representation of a JSON structure describing regular expression

        :return: `string` representation of an XML file describing given regular expression

        :raises KeyError: when JSON `dict` has wrong structure
        :raises TypeError: when there are wrong types of values in JSON `dict` (alphabet symbols must be Characters), \
        or when JSON `dict` has wrong structure

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

        Base method of the class, takes `dictionary` representation of an JSON file,
        and converts it to an XML `string`

        :param json_dict: `dictionary` representation of an JSON file

        :return: `string` representation of an XML file that was converted from given JSON

        :raises KeyError: when JSON `dict` has wrong structure - the 'type' property is not present
        :raises TypeError: when there is unknown object type

        """
        obj_type = json_dict['type']
        if obj_type == ObjectTypes.DFA or obj_type == ObjectTypes.NFA or obj_type == ObjectTypes.EpsilonNFA:
            res = JtXConverter._json_to_xml_fa(json_dict)
        elif obj_type == ObjectTypes.RG or obj_type == ObjectTypes.CFG or obj_type == ObjectTypes.CNF:
            res = JtXConverter._json_to_xml_grammar(json_dict)
        elif obj_type == ObjectTypes.RegExp:
            res = JtXConverter._json_to_xml_regexp(json_dict)
        elif obj_type == ObjectTypes.DPDA or obj_type == ObjectTypes.NPDA:
            res = JtXConverter._json_to_xml_pda(json_dict)
        else:
            raise TypeError
        return XML_VERSION + res

    @staticmethod
    def _get_object_type(o_type: str) -> str:
        """

        Translates various object types to one of: 'rg' | 'fa' | 're' | 'cfg' | 'pda'

        :param o_type: object type

        :return: `string` representation of simple object type

        """

        if o_type == ObjectTypes.RG:
            return 'rg'
        elif o_type == ObjectTypes.DFA or o_type == ObjectTypes.NFA or o_type == ObjectTypes.EpsilonNFA or o_type == ObjectTypes.MultiNFA:
            return 'fa'
        elif o_type == ObjectTypes.RegExp:
            return 're'
        elif o_type == ObjectTypes.CNF or o_type == ObjectTypes.CFG or o_type == ObjectTypes.EpsilonFreeCFG:
            return 'cfg'
        elif o_type == ObjectTypes.DPDA or o_type == ObjectTypes.NPDA:
            return 'pda'
        else:
            raise TypeError

    @staticmethod
    def comparison_json_to_xml(json_dict: dict) -> tuple:
        """

        Takes `dictionary` representation of an JSON file describing comparison
        and returns XML representations of structures to be compared and their simple types.
        Types are: 'rg' | 'fa' | 're' | 'cfg' | 'pda'.

        :param json_dict: `dictionary` representation of an JSON file

        :return: `tuple` of `string` representations of (XML file, its object type, XML file, its object type)

        :raises KeyError: when JSON `dict` has wrong structure

        """

        obj1 = json_dict['lhs']
        obj2 = json_dict['rhs']

        o_type_res1 = JtXConverter._get_object_type(obj1['type'])
        o_type_res2 = JtXConverter._get_object_type(obj2['type'])

        res1 = JtXConverter.simple_json_to_xml(obj1)
        res2 = JtXConverter.simple_json_to_xml(obj2)
        return res1, o_type_res1, res2, o_type_res2

    @staticmethod
    def transformation_json_to_xml(json_dict: dict) -> tuple:
        """

        Takes `dictionary` representation of an JSON file describing transformation
        and returns transformation source in XML `string`, its type and transformation target type.
        Types are: 'rg' | 'fa' | 're' | 'cfg' | 'pda'.

        :param json_dict: `dictionary` representation of an JSON file

        :return: `tuple` of `string` representations of (XML file - transformation source, source type, target type)
        :raises KeyError: when JSON `dict` has wrong structure

        """

        target_type = json_dict['target']
        source = json_dict['source']
        source_type = JtXConverter._get_object_type(source['type'])
        res = JtXConverter.simple_json_to_xml(source)
        return res, source_type, target_type

    @staticmethod
    def derivation_json_to_xml(json_dict: dict) -> tuple:
        """

        Takes `dictionary` representation of an JSON file describing derivation
        and returns derivation string and derived regexp as XML `string`

        :param json_dict: `dictionary` representation of an JSON file

        :return: `tuple` of derivation string and `string` XML representation of the derived regular expression

        :raises KeyError: when JSON `dict` has wrong structure

        """
        res = JtXConverter.simple_json_to_xml(json_dict['regexp'])
        return json_dict['derivation_string'], res

    @staticmethod
    def cyk_json_to_xml(json_dict: dict) -> tuple:
        """

        Takes `dictionary` representation of an JSON file describing CYK input
        and returns generated `string` and the grammar to be checked as XML `string`

        :param json_dict: `dictionary` representation of an JSON file

        :return: `tuple` of generated `string` and string XML representation of the grammar

        :raises KeyError: when JSON `dict` has wrong structure

        """
        res = JtXConverter.simple_json_to_xml(json_dict['grammar'])
        return json_dict['generated_string'], res


# ----------------------------------------------------------------------------------------------------------------------


class XtJConverter:
    """

    Base class responsible for converting `string` representation of an XML structure
    to a `dict` representation of an JSON structure.

    """

    @staticmethod
    def _flatten_child_text(child: ET.Element, referenced_values: dict, allow_name_change: bool) -> str:
        """

        Takes child element, that has some sub elements and returns aggregated text value of the whole group

        :param child: element to be flattened to a `string` value
        :param referenced_values: `list` of already found references
        :param allow_name_change: `bool` parameter that states if the name value from XML file can be changed

        :return: text representation of the element

        """
        result = ""
        for subelement in child:
            text = XtJConverter._get_child_text(subelement, referenced_values,
                                                allow_name_change, integer_in_string=True)
            result += text

        return result

    @staticmethod
    def _get_child_text(child: ET.Element, referenced_values: dict,
                        allow_name_change: bool, integer_in_string: bool = False) -> str:
        """

        Return text attribute of given element formatted according to the element given.
        Is able to fill in correct referenced values, create new values from pairs and sets
        and add new values to reference list.

        :param child: element we want to get text attribute from, must have tags Ref, String, Character, Integer or Pair
        :param referenced_values: `list` of already found references
        :param allow_name_change: `bool` parameter that states if the name value from XML file can be changed
        :param integer_in_string: `bool` parameter that states if the resulting value will be part of a string, \
        by default set to `False`

        :return: text representation od the element

        :raises KeyError: in case of wrong structure of the XML file - not present attributes, bad references
        :raises TypeError: when unknown tag occurs

        """
        if child.tag == "Ref":
            child_id = child.attrib['id']
            text = referenced_values[child_id]
        elif child.tag == "String":
            text = child.text
        elif child.tag == "Character":
            text = chr(int(child.text))
        elif child.tag == "Integer":
            if allow_name_change:
                if integer_in_string:
                    text = "_" + child.text
                else:
                    text = child.text + "\'"
            else:
                text = child.text
        elif child.tag == "epsilon":
            text = None
        elif child.tag == "Set" or child.tag == "Pair":
            text = XtJConverter._flatten_child_text(child, referenced_values, allow_name_change)
        elif child.tag == "FinalStateLabel":
            text = "Final"
        elif child.tag == "InitialSymbol":
            text = "Start"
        else:
            raise TypeError

        if 'ref' in child.attrib:
            if allow_name_change:
                while text in referenced_values.values():
                    text += '\''
            referenced_values[child.attrib['ref']] = text

        return text

    @staticmethod
    def _create_string_from_subelement(root_element: ET.Element, parent_tag: str, referenced_values: dict,
                                       allow_name_change: bool = False) -> str:
        """

        Creates one single `string` value from the first child of element with given parent tag.
        Accesses given root element, finds the first element with given parent tag, finds its first child element
        and returns its string representation. If the parent element has no children, returns None.

        :param root_element: parent element of the element, whose child's text is wanted
        :param parent_tag: tag of the element, whose child's text is wanted
        :param referenced_values: `list` of already found references
        :param allow_name_change: `bool` parameter that states if the name value from XML file can be changed, \
        by default set to `False`

        :return: `string` representation of the child attribute, `None` if no child is present

        :raises IndexError: in case of wrong structure of the XML file - parent_tag is not present in the roots children

        """
        parent_element = root_element.findall(parent_tag)[0]
        if len(parent_element) == 0:
            return None
        child = parent_element[0]
        return XtJConverter._get_child_text(child, referenced_values, allow_name_change)

    @staticmethod
    def _create_list_from_subelements(root_element: ET.Element, parent_tag: str, referenced_values: dict,
                                      allow_name_change: bool = False) -> list:
        """

        Creates `list` of `string` values from all children of element with given parent tag.
        Accesses given root element, finds the first element with given parent tag, finds all its child elements
        and returns their `string` representations in a `list`.

        :param root_element: parent element of the element, whose children's text is wanted
        :param parent_tag: tag of the element, whose children's text is wanted
        :param referenced_values: `list` of already found references
        :param allow_name_change: `bool` parameter that states if the name value from XML file can be changed, \
        by default set to `False`

        :return: `list` of `string` representations of the child attributes

        :raises IndexError: in case of wrong structure of the XML file - parent_tag is not present in the roots children

        """
        parent_element = root_element.findall(parent_tag)[0]
        result = []
        for child in parent_element:
            text = XtJConverter._get_child_text(child, referenced_values, allow_name_change)
            result.append(text)

        return result

    @staticmethod
    def _create_list_fa_transitions(root_element: ET.Element, referenced_values: dict) -> list:
        """

        Creates `list` of `dictionaries` that represents finite automaton transitions.
        Format: [{'from':, 'input':, 'to':}]

        :param root_element: element, which has child with the tag 'transitions'
        :param referenced_values: `list` of already found references

        :return: `list` of `dictionaries` that represents finite automaton transitions

        :raises IndexError: in case of wrong structure of the XML file - transitions tag is not present in the root

        """
        parent_element = root_element.findall('transitions')[0]
        result = []
        for child in parent_element.findall('transition'):
            t = {}
            t_from = XtJConverter._create_string_from_subelement(child, 'from', referenced_values)
            t['from'] = t_from
            t_input = XtJConverter._create_string_from_subelement(child, 'input', referenced_values)
            t['input'] = t_input
            t_to = XtJConverter._create_string_from_subelement(child, 'to', referenced_values)
            t['to'] = t_to
            result.append(t)
        return result

    @staticmethod
    def _create_list_pda_transitions(root_element: ET.Element, referenced_values: dict) -> list:
        """

        Creates `list` of `dictionaries` that represents pushdown automaton transitions.
        Format: [{'from':, 'input':, 'pop':, 'to':, 'push':}]

        :param root_element: element, which has child with the tag 'transitions'
        :param referenced_values: `list` of already found references

        :return: `list` of `dictionaries`, that represents finite automaton transitions

        :raises IndexError: in case of wrong structure of the XML file - transitions tag is not present in the root

        """
        parent_element = root_element.findall('transitions')[0]
        result = []

        for child in parent_element.findall('transition'):
            t = {}
            t_from = XtJConverter._create_string_from_subelement(child, 'from', referenced_values)
            t['from'] = t_from
            t_input = XtJConverter._create_string_from_subelement(child, 'input', referenced_values)
            t['input'] = t_input
            t_pop = XtJConverter._create_list_from_subelements(child, 'pop', referenced_values)
            t['pop'] = t_pop
            t_to = XtJConverter._create_string_from_subelement(child, 'to', referenced_values)
            t['to'] = t_to
            t_push = XtJConverter._create_list_from_subelements(child, 'push', referenced_values)
            t['push'] = t_push
            result.append(t)
        return result

    @staticmethod
    def _create_list_rules(root_element: ET.Element, referenced_values: dict) -> list:
        """

        Creates `list` of `dictionaries` that represents grammar rules.
        Format: [{'from':, 'to':}]

        :param root_element: element, which has child with the tag 'rules'
        :param referenced_values: `list` of already found references

        :return: `list` of `dictionaries`, that represents grammar rules

        :raises IndexError: in case of wrong structure of the XML file - rules tag is not present in the roots children

        """
        parent_element = root_element.findall('rules')[0]
        result = []
        for child in parent_element.findall('rule'):
            r = {}
            r_lhs = XtJConverter._create_string_from_subelement(child, 'lhs', referenced_values)
            r['from'] = r_lhs
            r_rhs = XtJConverter._create_list_from_subelements(child, 'rhs', referenced_values)
            r['to'] = r_rhs
            result.append(r)
        return result

    @staticmethod
    def _create_generates_epsilon(generates_epsilon: bool, grammar_dict):
        """

        Converts XML structure of generatesEpsilon to internal structure without it. Checks generatesEpsilon parameter
        value. If true, checks presence of initial symbol on the right side of grammar rules. Then eventually performs
        simple algorithm to remove rule "rewrite initial symbol to epsilon" while the initial symbol is present
        on the right side of some rules.

        :param generates_epsilon: `bool` parameter that states, if the grammar given is able to rewrite initial \
        symbol to epsilon
        :param grammar_dict: `dict` representation of grammar

        """
        if not generates_epsilon:
            return

        rules = grammar_dict['rules']  # pointer
        initial_symbol = grammar_dict['initial_symbol']  # value

        # is initial symbol present on the right side of any rule?
        rules_with_initial_symbol = [rule for rule in rules if initial_symbol in rule['to']]

        # if not, append new rule of rewritting initial_symbol to epsilon and end
        if len(rules_with_initial_symbol) == 0:
            rules.append({'from': initial_symbol, 'to': [None]})
            return

        # if yes:
        # 1) add new initial symbol:
        new_initial_symbol = initial_symbol + "\'"
        while new_initial_symbol in grammar_dict['nonterminal_alphabet']:
            new_initial_symbol += "\'"
        grammar_dict['nonterminal_alphabet'].append(new_initial_symbol)
        grammar_dict['initial_symbol'] = new_initial_symbol
        # 2) modified rules must be added, where initial_symbol is not present in them
        modified_rules = []
        for rule in rules_with_initial_symbol:
            new_to = [symbol for symbol in rule['to'] if symbol != initial_symbol]
            modified_rules.append({'from': rule['from'], 'to': new_to})
        # add them only if they are not present yet and are not empty
        rules_to_add = [rule for rule in modified_rules if rule not in rules and rule['to'] != []]
        rules.extend(rules_to_add)
        # 3) rules from old initial symbol must be copied to the new one
        rules_of_new_init = [{'from': new_initial_symbol, 'to': rule['to']} for rule in rules if
                             rule['from'] == initial_symbol]
        rules.extend(rules_of_new_init)
        # 4) add rewrite to epsilon to new initial symbol
        rules.append({'from': new_initial_symbol, 'to': [None]})

    @staticmethod
    def _create_regexp_value(element: ET.Element, referenced_values: dict) -> dict:
        """

        Creates `list-dictionary` structure, that represents regular expression value.
        Method is supposed to be called recursively.

        :param element: element, which represents a valid regular expression
        :param referenced_values: `list` of already found references

        :return: `list-dictionary` structure, that represents regular expression value.

        :raises IndexError: in case of wrong structure of the XML file

        """
        res = {}
        e_tag = element.tag
        if e_tag == 'epsilon':
            res['type'] = 'epsilon'
        elif e_tag == 'empty':
            res['type'] = 'empty_symbol'
        elif e_tag == 'iteration':
            res['type'] = 'iteration'
            value = XtJConverter._create_regexp_value(element[0], referenced_values)
            res['value'] = value
        elif e_tag == 'concatenation' or e_tag == 'alternation':
            res['type'] = e_tag
            value = []
            for child in element:
                c = XtJConverter._create_regexp_value(child, referenced_values)
                value.append(c)
            res['value'] = value
        else:
            res['type'] = 'term'
            res['value'] = XtJConverter._get_child_text(element, referenced_values, allow_name_change=False)
        return res

    @staticmethod
    def _xml_to_json_fa(root: ET.Element) -> dict:
        """

        Converts given ElementTree structure to a `dictionary`, that can be turned into JSON file.
        ElementTree and dictionary both represent the same finite automaton.

        :param root: root element of ElementTree to be converted

        :return: `dictionary` representation of finite automaton

        """
        result_dict = {}
        referenced_values = {}

        a_type = root.tag
        if a_type == ObjectTypes.MultiNFA:
            result_dict['type'] = ObjectTypes.NFA
        else:
            result_dict['type'] = a_type

        states = XtJConverter._create_list_from_subelements(root, 'states', referenced_values, allow_name_change=True)
        result_dict['states'] = states

        input_alphabet = XtJConverter._create_list_from_subelements(root, 'inputAlphabet', referenced_values)
        result_dict['input_alphabet'] = input_alphabet

        if a_type == ObjectTypes.MultiNFA:
            parent_tag = "initialStates"
        else:
            parent_tag = "initialState"
        initial_states = XtJConverter._create_list_from_subelements(root, parent_tag, referenced_values)
        result_dict['initial_states'] = initial_states

        final_states = XtJConverter._create_list_from_subelements(root, 'finalStates', referenced_values)
        result_dict['final_states'] = final_states

        transitions = XtJConverter._create_list_fa_transitions(root, referenced_values)
        result_dict['transitions'] = transitions

        return result_dict

    @staticmethod
    def _xml_to_json_pda(root: ET.Element) -> dict:
        """

        Converts given ElementTree structure to a `dictionary`, that can be turned into JSON file.
        ElementTree and dictionary both represent the same push-down automaton.

        :param root: root element of ElementTree to be converted

        :return: `dictionary` representation of push-down automaton

        """
        result_dict = {}
        referenced_values = {}

        a_type = root.tag
        result_dict['type'] = a_type

        states = XtJConverter._create_list_from_subelements(root, 'states', referenced_values, allow_name_change=True)
        result_dict['states'] = states

        input_alphabet = XtJConverter._create_list_from_subelements(root, 'inputAlphabet', referenced_values)
        result_dict['input_alphabet'] = input_alphabet

        pd_store_alphabet = XtJConverter._create_list_from_subelements(root, 'pushdownStoreAlphabet', referenced_values)
        result_dict['pushdown_store_alphabet'] = pd_store_alphabet

        initial_states = XtJConverter._create_list_from_subelements(root, 'initialState', referenced_values)
        result_dict['initial_states'] = initial_states

        init_pd_symbol = XtJConverter._create_string_from_subelement(root, 'initialPushdownStoreSymbol',
                                                                     referenced_values)
        result_dict['initial_pushdown_store_symbol'] = init_pd_symbol

        final_states = XtJConverter._create_list_from_subelements(root, 'finalStates', referenced_values)
        result_dict['final_states'] = final_states

        transitions = XtJConverter._create_list_pda_transitions(root, referenced_values)
        result_dict['transitions'] = transitions

        return result_dict

    @staticmethod
    def _xml_to_json_regexp(root: ET.Element) -> dict:
        """

        Converts given ElementTree structure to a `dictionary`, that can be turned into JSON file.
        ElementTree and dictionary both represent the same regular expression.

        :param root: root element of ElementTree to be converted

        :return: `dictionary` representation of regular expression

        :raises IndexError: in case of wrong structure of the XML file - wrong number of root children

        """
        result_dict = {}
        referenced_values = {}

        r_type = root.tag
        result_dict['type'] = r_type

        alphabet = XtJConverter._create_list_from_subelements(root, 'alphabet', referenced_values)
        result_dict['alphabet'] = alphabet

        value = XtJConverter._create_regexp_value(root[1], referenced_values)
        result_dict['value'] = value

        return result_dict

    @staticmethod
    def _xml_to_json_grammar(root: ET.Element) -> dict:
        """

        Converts given ElementTree structure to a `dictionary`, that can be turned into JSON file.
        ElementTree and `dictionary` both represent the same grammar.

        :param root: root element of ElementTree to be converted

        :return: `dictionary` representation of grammar

        :raises IndexError: in case of wrong structure of the XML file -minimization_xml_to_json(result, ste wrong \
        appearance and usage of generatesEpsilon tag

        """
        result_dict = {}
        referenced_values = {}
        g_type = root.tag
        if g_type == ObjectTypes.EpsilonFreeCFG:
            result_dict['type'] = ObjectTypes.CFG
        else:
            result_dict['type'] = g_type

        nonterminal_alphabet = XtJConverter._create_list_from_subelements(root, 'nonterminalAlphabet',
                                                                          referenced_values, allow_name_change=True)
        result_dict['nonterminal_alphabet'] = nonterminal_alphabet

        terminal_alphabet = XtJConverter._create_list_from_subelements(root, 'terminalAlphabet', referenced_values)
        result_dict['terminal_alphabet'] = terminal_alphabet

        initial_symbol = XtJConverter._create_string_from_subelement(root, 'initialSymbol', referenced_values)
        result_dict['initial_symbol'] = initial_symbol

        rules = XtJConverter._create_list_rules(root, referenced_values)
        result_dict['rules'] = rules

        # solve generates epsilon
        if g_type == ObjectTypes.RG or g_type == ObjectTypes.CNF or g_type == ObjectTypes.EpsilonFreeCFG:
            generates_epsilon = root.findall('generatesEpsilon')[0][0].tag == 'true'
            XtJConverter._create_generates_epsilon(generates_epsilon, result_dict)

        return result_dict

    @staticmethod
    def simple_xml_to_json(xml_file: str) -> dict:
        """

        Converts given XML file to a `dictionary`, that can be turned into JSON file.
        Converts XML file to ElementTree structure, according to the parent tag of the structure
        chooses correct conversion method.

        :param xml_file: `string` representation of an xml file

        :return: `dictionary` that represents converted object

        :raises TypeError: when there is unknown object type

        """
        root = ET.fromstring(xml_file)
        obj_type = root.tag
        if obj_type == ObjectTypes.DFA or obj_type == ObjectTypes.NFA or obj_type == ObjectTypes.EpsilonNFA or obj_type == ObjectTypes.MultiNFA:
            result = XtJConverter._xml_to_json_fa(root)
        elif obj_type == ObjectTypes.RG or obj_type == ObjectTypes.CFG or obj_type == ObjectTypes.CNF or obj_type == ObjectTypes.EpsilonFreeCFG:
            result = XtJConverter._xml_to_json_grammar(root)
        elif obj_type == ObjectTypes.RegExp:
            result = XtJConverter._xml_to_json_regexp(root)
        elif obj_type == ObjectTypes.DPDA or obj_type == ObjectTypes.NPDA:
            result = XtJConverter._xml_to_json_pda(root)
        else:
            raise TypeError

        return result

    @staticmethod
    def comparison_xml_to_json(result: bool) -> dict:
        """

        Converts given result of a comparison to a `dictionary`, that can be converted to JSON

        :param result: result of a comparison, `bool` value

        :return: `dictionary` with the result, that can be converted to JSON

        """
        return {'result': result}

    @staticmethod
    def derivation_xml_to_json(steps: list, trimmed_steps: list) -> dict:
        """

        Converts given result of a derivation (its steps) to a dictionary, that can be converted to JSON

        :param steps: `list` of RegExps that represents the untrimmed steps of the derivation
        :param trimmed_steps: `list` of RegExps that represents the trimmed steps of the derivation

        :return: `dictionary` representation of the result (derivation steps), can be converted to JSON

        """
        ret = {}
        r_steps = []
        r_trimmed_steps = []

        for step in steps:
            r_steps.append(XtJConverter.simple_xml_to_json(step))
        for step in trimmed_steps:
            r_trimmed_steps.append(XtJConverter.simple_xml_to_json(step))

        ret['steps'] = r_steps
        ret['trimmed_steps'] = r_trimmed_steps

        return ret

    @staticmethod
    def cnf_leftrec_xml_to_json(result: dict) -> dict:
        """

        Converts given result of a conversion to CNF or left recursion removal and its steps to a `dictionary`,
        that can be converted to JSON

        :param result: `dictionary` containing each step of CNF transformation/left recursion removal

        :return: `dictionary` representation of the result and the steps, can be converted to JSON

        """
        ret = {}
        ret['after_reduction'] = XtJConverter.simple_xml_to_json(result['after_reduction'])
        ret['after_epsilon'] = XtJConverter.simple_xml_to_json(result['after_epsilon'])
        ret['after_unit_rules'] = XtJConverter.simple_xml_to_json(result['after_unit'])
        ret['result'] = XtJConverter.simple_xml_to_json(result['result'])
        return ret

    @staticmethod
    def minimization_xml_to_json(result: str, steps: list) -> dict:
        raise NotImplementedError

    @staticmethod
    def cyk_xml_to_json(result: bool, steps: str) -> dict:
        raise NotImplementedError


def json_to_xml(json_file: dict, param: str = None):
    """

    Converts given JSON (Python dictionary) to corresponding XML `string` representation

    :param json_file: `dictionary` with JSON file to convert
    :param param: optional parameter describing JSON file structure - if it's simple, \
    or one of the special cases - comparison, transformation or derivation. \
    If it's not a special case, it can be omitted.

    :return: representation of a converted JSON file, usually XML `string` or `tuple` of XML `strings` and needed \
    parameters

    :raises JSONDecodeError: in case of wrong structure of the JSON file

    """
    try:
        if param == AlgorithmTypes.COMPARISON:
            res = JtXConverter.comparison_json_to_xml(json_file)
        elif param == AlgorithmTypes.TRANSFORMATION:
            res = JtXConverter.transformation_json_to_xml(json_file)
        elif param == AlgorithmTypes.REGEXP_DERIVATION:
            res = JtXConverter.derivation_json_to_xml(json_file)
        elif param == AlgorithmTypes.GRAMMAR_CYK:
            res = JtXConverter.cyk_json_to_xml(json_file)
        else:
            res = JtXConverter.simple_json_to_xml(json_file)
        return res
    except json.JSONDecodeError:
        raise JSONDecodeError("JSON decode exception")
    except (KeyError, TypeError):
        raise JSONDecodeError("Invalid JSON structure")
    except:
        raise JSONDecodeError("Unexpected exception occurred")


def xml_to_json(result, param: str = None, **steps) -> dict:
    """

    Converts given algorithm result to corresponding JSON (Python `dictionary`)

    :param result: algorithm result, can be `string` representing XML file, `dictionary` or a `bool` value, according to \
    param attribute
    :param param: optional parameter describing result structure. If it's one of the special cases - derivation, \
    comparison, minimization, cnf conversion, left recursion removal or cyk algorithm -  it must be present. \
    If it's not a special case, it can be omitted.
    :param steps: optional keyword parameters describing steps of the algorithm. Either a `string` or a `list` of \
    `strings`, according to the param specified. May be present with minimization or cyk. Must be present with \
    regexp derivation, cnf conversion and left recursion removal.

    :return: `dictionary` representing the JSON file

    :raises XMLDecodeError: in case of wrong structure of the XML file

    """
    try:
        if param == AlgorithmTypes.COMPARISON:
            ret = XtJConverter.comparison_xml_to_json(result)
        elif param == AlgorithmTypes.AUTOMATON_MINIMIZATION:
            ret = XtJConverter.minimization_xml_to_json(result, steps['steps'])
        elif param == AlgorithmTypes.REGEXP_DERIVATION:
            ret = XtJConverter.derivation_xml_to_json(steps['steps'], steps['trimmed_steps'])
        elif param == AlgorithmTypes.GRAMMAR_CNF_CONVERSION:
            ret = XtJConverter.cnf_leftrec_xml_to_json(result)
        elif param == AlgorithmTypes.GRAMMAR_LEFT_RECURSION_REMOVAL:
            ret = XtJConverter.cnf_leftrec_xml_to_json(result)
        elif param == AlgorithmTypes.GRAMMAR_CYK:
            ret = XtJConverter.cyk_xml_to_json(result, steps['steps'])
        else:
            ret = XtJConverter.simple_xml_to_json(result)
        return ret
    except ET.ParseError:
        raise XMLDecodeError("XML parse exception")
    except (IndexError, KeyError, TypeError):
        raise XMLDecodeError("Invalid XML structure")
    except:
        raise XMLDecodeError("Unexpected exception occurred")
