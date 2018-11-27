"""

Backend structure of web application AutoGram.

.. module:: backend
    :platform: Unix
    :synopsis: Backend structure of web application AutoGram.

.. moduleauthor:: Jakub Drahos <drahoja9@fit.cvut.cz>, Dominika Kralikova <kralidom@fit.cvut.cz>

"""


class AlgorithmTypes:
    """

    Simple enum class representing currently supported algorithms (their names).

    Can be used in two ways. First, without instantiating just for specific algorithm name::

        AlgorithmTypes.<NAME_OF_ALGORITHM>

    or with class instance for validating algorithm name::

        if algorithm in AlgorithmTypes():
            # do something

    """
    TRANSFORMATION = 'transformation'
    COMPARISON = 'comparison'
    AUTOMATON_EPSILON_REMOVAL = 'automaton_epsilon'
    AUTOMATON_DETERMINIZATION = 'automaton_determinization'
    AUTOMATON_MINIMIZATION = 'automaton_minimization'
    AUTOMATON_MINIMIZATION_NO_VERBOSE = 'automaton_minimization_no_verbose'
    AUTOMATON_TRIM = 'automaton_trim'
    AUTOMATON_NORMALIZATION = 'automaton_normalization'
    REGEXP_DERIVATION = 'regexp_derivation'
    REGEXP_TRIM = 'regexp_trim'
    GRAMMAR_REDUCTION = 'grammar_reduction'
    GRAMMAR_EPSILON_REMOVAL = 'grammar_epsilon'
    GRAMMAR_UNIT_RULES_REMOVAL = 'grammar_unit'
    GRAMMAR_CNF_CONVERSION = 'grammar_cnf'
    GRAMMAR_LEFT_RECURSION_REMOVAL = "grammar_left_recursion"
    GRAMMAR_CYK = 'grammar_cyk'

    def __init__(self):
        self._all = [
            'transformation',
            'comparison',
            'automaton_epsilon',
            'automaton_determinization',
            'automaton_minimization',
            'automaton_trim',
            'automaton_normalization',
            'regexp_derivation',
            'regexp_trim',
            'grammar_reduction',
            'grammar_epsilon',
            'grammar_unit',
            'grammar_cnf',
            'grammar_left_recursion',
            'grammar_cyk'
        ]

    def __contains__(self, item: str) -> bool:
        """

        Implementing this special (magical) method to be able to "query" (use ``in`` keyword) in :class:`AlgorithmTypes`
        instance::

            if algorithm in AlgorithmTypes():
                # do something

        :param item: algorithm name to be used in ALT library

        :return: True if ``item`` is in self._all (currently supported algorithm names), otherwise False

        """
        return item in self._all


class ObjectTypes:
    """

    Simple enum class representing currently supported types of object.

    Can be used without instantiating::

        ObjectTypes.<OBJECT_TYPE_NAME>

    """
    DFA = 'DFA'
    NFA = 'NFA'
    EpsilonNFA = 'EpsilonNFA'
    MultiNFA = 'MultiInitialStateNFA'
    RG = 'RightRG'
    CFG = 'CFG'
    CNF = 'CNF'
    EpsilonFreeCFG = 'EpsilonFreeCFG'
    DPDA = 'DPDA'
    NPDA = 'NPDA'
    RegExp = 'UnboundedRegExp'
