//#region imports
import {FA, ENFA, NFA, DFA} from 'lib/types'
import {allowedSymbols} from 'lib/validate'
//#endregion

function standardTransitionCheck(transitions: Array<any>, states: Array<String>, alphabet: Array<String>){
  /** each transition must go from and to some state defined in states on input defined in input alphabet, or on null */
  transitions.forEach(transition => {
    if (states.indexOf(transition.from) === -1){
      throw new TypeError("Transition's 'from' must be defined in states")
    }
    if (states.indexOf(transition.to) === -1){
      throw new TypeError("Transition's 'to' must be defined in states")
    }
    if (alphabet.indexOf(transition.input) === -1 && transition.input !== null){
      throw new TypeError("Transition's 'input' must be defined in input alphabet or it must be null")
    }
  })
}

function epsilonFreeTransitionCheck(transitions: Array<any>, states: Array<String>, alphabet: Array<String>){
  /** each transition must go from and to some state defined in states on input defined in input alphabet, null is not allowed */
  transitions.forEach(transition => {
    if (states.indexOf(transition.from) === -1){
      throw new TypeError("Transition's 'from' must be defined in states")
    }
    if (states.indexOf(transition.to) === -1){
      throw new TypeError("Transition's 'to' must be defined in states")
    }
    if (alphabet.indexOf(transition.input) === -1){
      throw new TypeError("Transition's 'input' must be defined in input alphabet")
    }
  }) 
}

function deterministicTransitionCheck(transitions: Array<any>){
  /** from one state can go only transitions with different inputs */
  var statesAndInputs : {[key: string] : Array<string>} = {}
  transitions.forEach(transition => {
    var res : string[] = statesAndInputs[transition.from]
    if (res){
      if (res.indexOf(transition.input) !== -1){
        throw new TypeError("Automaton is not deterministic")
      } else {
        res.push(transition.input)
      }
    } else {
      statesAndInputs[transition.from] = [transition.input]
    }
  })
}

function validateFiniteAutomaton(automaton : FA){
  /** states must not be empty */
  if (automaton.states.length === 0){
    throw new TypeError("Finite automaton must have at least one state")
  }
  /** initial states must not be empty */
  if (automaton.initial_states.length === 0){
    throw new TypeError("Finite automaton must have at least one initial state")
  }
  /** each state must consist only from allowed symbols */
  automaton.states.forEach(state => {
    if (state.length < 1){
      throw new TypeError("States must consist of one character at least")
    }
    for (var i = 0 ; i < state.length ; i++ ){
      if (allowedSymbols.indexOf(state.charAt(i)) === -1){
        throw new TypeError("States must consist of allowed characters only")
      }
    }
  })
  /** each symbol of input alphabet must be only character and that must be an allowed symbol*/
  automaton.input_alphabet.forEach(symbol => {
    if (symbol.length !== 1){
      throw new TypeError("Input alphabet symbols must be characters")
    }
    if (allowedSymbols.indexOf(symbol) === -1){
      throw new TypeError("Input alphabet must consist of allowed characters only")
    }
  })
  /** each state and input alphabet name must be unique */
  var symbol_array : Array<String> = automaton.states.concat(automaton.input_alphabet)
  symbol_array.forEach(symbol => {
    var res : number = symbol_array.filter( element => element === symbol).length
    if (res !== 1){
      throw new TypeError("Each state and input alphabet name must be unique")
    }
  })
  /** each initial state must be defined in states */
  automaton.initial_states.forEach(state => {
    if (automaton.states.indexOf(state) === -1){
      throw new TypeError("Each initial state must be defined in states")
    }
  })
  /** each final state must be defined in states */
  automaton.final_states.forEach(state => {
    if (automaton.states.indexOf(state) === -1){
      throw new TypeError("Each final state must be defined in states")
    }
  })
}

export function validateEpsilonNFA(automaton : ENFA) : boolean {
  /** check basic structure of the automaton */
  validateFiniteAutomaton(automaton)
  /** each transition must fullfil standard transition's rules */
  standardTransitionCheck(automaton.transitions, automaton.states, automaton.input_alphabet)
  return true
}

export function validateNFA(automaton: NFA) : boolean {
  /** check basic structure of the automaton */
  validateFiniteAutomaton(automaton)
  /** each transition must fullfil epsilon free transition's rules */
  epsilonFreeTransitionCheck(automaton.transitions, automaton.states, automaton.input_alphabet)
  return true
}

export function validateDFA(automaton: DFA) : boolean {
  /** check basic structure of the automaton */
  validateFiniteAutomaton(automaton)
  /** each transition must fullfil epsilon free transition's rules */
  epsilonFreeTransitionCheck(automaton.transitions, automaton.states, automaton.input_alphabet)
  /** automaton must be deterministic */
  deterministicTransitionCheck(automaton.transitions)
  return true
}