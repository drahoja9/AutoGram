//#region imports
import {FA, ENFA, NFA, DFA} from 'lib/types'
import {allowedSymbols} from 'lib/validate'
import { FiniteAutomatonExceptions as FA_Error } from 'lib/validate'
//#endregion

function standardTransitionCheck(transitions: Array<any>, states: Array<String>, alphabet: Array<String>){
  /** each transition must go from and to some state defined in states on input defined in input alphabet, or on null */
  transitions.forEach(transition => {
    if (states.indexOf(transition.from) === -1){
      throw new FA_Error.FA_TransitionAttributeNotDefined("source", "states", transition.from, false)
    }
    if (states.indexOf(transition.to) === -1){
      throw new FA_Error.FA_TransitionAttributeNotDefined("target", "states", transition.to, false)
    }
    if (alphabet.indexOf(transition.input) === -1 && transition.input !== null){
      throw new FA_Error.FA_TransitionAttributeNotDefined("input", "input alphabet", transition.input, true)
    }
  })
}

function epsilonFreeTransitionCheck(transitions: Array<any>, states: Array<String>, alphabet: Array<String>){
  /** each transition must go from and to some state defined in states on input defined in input alphabet, null is not allowed */
  transitions.forEach(transition => {
    if (states.indexOf(transition.from) === -1){
      throw new FA_Error.FA_TransitionAttributeNotDefined("source", "states", transition.from, false)
    }
    if (states.indexOf(transition.to) === -1){
      throw new FA_Error.FA_TransitionAttributeNotDefined("target", "states", transition.to, false)
    }
    if (alphabet.indexOf(transition.input) === -1){
      throw new FA_Error.FA_TransitionAttributeNotDefined("input", "input alphabet", transition.input, false)
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
        throw new FA_Error.FA_NotDeterministic(transition.from, transition.input)
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
    throw new FA_Error.FA_StatesEmpty()
  }
  /** initial states must not be empty */
  if (automaton.initial_states.length === 0){
    throw new FA_Error.FA_InitialStatesEmpty()
  }
  /** each state must consist only from allowed symbols */
  automaton.states.forEach(state => {
    if (state.length < 1){
      throw new FA_Error.FA_StateZeroLength()
    }
    for (var i = 0 ; i < state.length ; i++ ){
      if (allowedSymbols.indexOf(state.charAt(i)) === -1){
        throw new FA_Error.FA_NotAllowedChar("states", state)
      }
    }
  })
  /** each symbol of input alphabet must be only character and that must be an allowed symbol*/
  automaton.input_alphabet.forEach(symbol => {
    if (symbol.length !== 1){
      throw new FA_Error.FA_AlphabetNotChar(symbol)
    }
    if (allowedSymbols.indexOf(symbol) === -1){
      throw new FA_Error.FA_NotAllowedChar("input alphabet", symbol)
    }
  })
  /** each state and input alphabet name must be unique */
  var symbol_array : Array<string> = automaton.states.concat(automaton.input_alphabet)
  symbol_array.forEach(symbol => {
    var res : number = symbol_array.filter( element => element === symbol).length
    if (res !== 1){
      throw new FA_Error.FA_NotUniqueNames(symbol)
    }
  })
  /** each initial state must be defined in states */
  automaton.initial_states.forEach(state => {
    if (automaton.states.indexOf(state) === -1){
      throw new FA_Error.FA_StateNotDefined("initial state", state)
    }
  })
  /** each final state must be defined in states */
  automaton.final_states.forEach(state => {
    if (automaton.states.indexOf(state) === -1){
      throw new FA_Error.FA_StateNotDefined("final state", state)
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