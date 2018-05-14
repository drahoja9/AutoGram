"""

.. module:: backend
    :platform: Unix
    :synopsis: Backend structure of web application AutoGram.

.. moduleauthor:: Jakub Drahos <drahoja9@fit.cvut.cz>, Dominika Kralikova <kralidom@fit.cvut.cz>

"""


class AlgorithmTypes:
    TRANSFORMATION = 'transformation'
    COMPARISON = 'comparison'
    AUTOMATON_EPSILON_REMOVAL = 'automaton_epsilon'
    AUTOMATON_DETERMINIZATION = 'automaton_determinization'
    AUTOMATON_MINIMIZATION = 'automaton_minimization'
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

    def __contains__(self, item):
        return item in self._all


class ObjectTypes:
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
