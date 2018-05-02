class AlgorithmTypes:
    TRANSFORMATION = 'transformation'
    COMPARISON = 'comparison'
    AUTOMATON_EPSILON_REMOVAL = 'automaton_epsilon'
    AUTOMATON_DETERMINIZATION = 'automaton_determinization'
    AUTOMATON_MINIMIZATION = 'automaton_minimization'
    REGEXP_DERIVATION = 'regexp_derivation'
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

