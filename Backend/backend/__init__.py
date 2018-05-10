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
