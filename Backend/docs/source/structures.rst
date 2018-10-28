**********************************
Input and output structures
**********************************


Basic structures
---------------------------------------------------------

Here are 3 basic structures representing formal languages used in our application. 

.. _finite-automata-label:

Finite automata
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^   

**type:** *String, either DFA, NFA or ENFA*

**states:** *String[]*

**input_alphabet:** *String[]*

**initial_states:** *String[]*

**final_states:** *String[]*

**transitions:** *{ "from": String ,"input": String, "to": String }[]*

.. note::
    Epsilon transitions represented with null value
    
**Example:** ::

    {
        "type" : "ENFA"
        "states" :  ["S", "A", "B", "C"],
        "input_alphabet" : ["0", "1"],
        "initial_states" : ["S"],
        "final_states" : ["C"],
        "transitions" : [
            {"from" : "S", "input" : "0", "to" : "S"},
            {"from" : "S", "input" : "0", "to" : "A"},
            {"from" : "S", "input" : "1", "to" : "S"},
            {"from" : "A", "input" : "1", "to" : "B"},
            {"from" : "B", "input" : null, "to" : "C"}
        ]
    }
    

.. _grammars-label:    

Grammars
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^   

**type:** *String, either RightRG, CFG, EpsilonFreeCFG, CNF*

**nonterminal_alphabet:** *String[]*

**terminal_alphabet:** *String[]*

**initial_symbol:** *String*

**rules:** *{ "from": String , "to": String[] }[]*

.. note::
    Epsilon rules represented with null value
    
**Example:** ::

    {
        "type" : "RightRG",
        "nonterminal_alphabet" : ["3", "5"],
        "terminal_alphabet" : ["7", "8"],
        "initial_symbol" : "3",
        "rules" : [
            {"from" : "3", "to" : ["5", "7"]},
            {"from" : "3", "to" : ["8"]},
            {"from" : "5", "to" : ["7"]},
            {"from" : "3", "to" : [null]}
        ]
    }

    
.. _regular-expressions-label:
    
Regular expressions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^   

**type:** *String, UnboundedRegExp*

**alphabet:** *String[]*

**value:** *{ "type": RE_Node_type, "value":  RE_Node }*

**RE_Node:** *{ "type": RE_Node_type, "value": <String|RE_NODE|RE_NODE[]> }*

**RE_Node_type:** *String, either concatenation, iteration, alternation, empty_symbol, epsilon or term*

.. note::
    Epsilon and empty_symbol doesn't have "value" key/value!
    
**Example:** ::

    {
        "type": "UnboundedRegExp",
        "alphabet": ["0", "1"],
        "value": {
            "type" : "concatenation",
            "value" : [
                {
                    "type" : "term",
                    "value" : "0"
                },
                {
                    "type" : "term",
                    "value" : "1"
                },
                {
                    "type": "iteration",
                    "value": {
                        "type": "term",
                        "value": "0"
                    }
                },
                {
                    "type" : "alternation",
                    "value" : [
                        {
                            "type" : "empty_symbol"
                        },
                        {
                            "type" : "epsilon"
                        }
                    ]
                }
            ]
        }
    }
    

---------------------------------------------------------


API's endpoints
---------------------------------------------------------

AutoGram's API exposes endpoints for different algorithms with different inputs and outputs. Here is the list of each one with it's I/O structures.

Comparison
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
**endpoint:** 
    */api/comparison*
    
**input:** :: 

    { 
        "lhs": <NFA|RightRG|UnboundedRegExp>,
        "rhs": <NFA|RightRG|UnboundedRegExp> 
    }

**output:** :: 

    {
        "result" : String<"true"|"false">
    }
    

Transformation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
**endpoint:** 
    */api/transformation*

**input:** :: 

    { 
        "target" : String<"fa"|"gr"|"re">,
        "source" : <NFA|RightRG|UnboundedRegExp>
    }

**output:** :: 

   <NFA|RightRG|UnboundedRegExp>
   

Automaton determinization
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
**endpoint:** 
    */api/algorithms/automaton_determinization*

**input:** :: 

    NFA

**output:** :: 

   DFA


Automaton epsilon
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
**endpoint:** 
    */api/algorithms/automaton_epsilon*

**input:** :: 

    ENFA

**output:** :: 

   NFA


Grammar reduction
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
**endpoint:** 
    */api/algorithms/grammar_reduction*

**input:** :: 

    CFG

**output:** :: 

   CFG


Removal of epsilon rules
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
**endpoint:** 
    */api/algorithms/grammar_epsilon*

**input:** :: 

    CFG

**output:** :: 

   CFG


Removal of unit rules
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
**endpoint:** 
    */api/algorithms/grammar_unit*

**input:** :: 

    CFG

**output:** :: 

   CFG


Chomsky normal form
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
**endpoint:** 
    */api/algorithms/grammar_cnf*

**input:** :: 

    CFG

**output:** :: 

   {
        "after_reduction" : CFG,
        "after_epsion" : CFG,
        "after_unit_rules" : CFG,
        "result": CNF
   }


Left recursion removal
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
**endpoint:** 
    */api/algorithms/grammar_left_recursion*

**input:** :: 

    CFG

**output:** :: 

   {
        "after_reduction" : CFG,
        "after_epsion" : CFG,
        "after_unit_rules" : CFG,
        "result": CFG
   }


Regular expression derivation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
**endpoint:** 
    */api/algorithms/regexp_derivation*

**input:** :: 

    {
        "regexp": UnboundedRegExp,
        "derivation_string": String
    }

**output:** :: 

   {
        "result" : UnboundedRegExp,
        "steps" : [
            UnboundedRegExp,
            UnboundedRegExp,
            ...
        ]
   }
