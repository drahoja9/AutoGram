//#region imports
import { FA, ENFA, NFA, DFA } from 'lib/types';
import { allowedSymbols } from 'lib/validate';
import { FiniteAutomatonExceptions as FA_Error } from 'lib/validate';
//#endregion

/** 
 * Function to validate common finite automaton rules. Allows epsilon transitions.
 * 
 * @description Checks: 
 *  - source is defiend in states
 *  - target is defiend in states
 *  - input is defined in input alphabet or is null
 * @param transitions List of automaton transitions
 * @param states List of automaton states
 * @param alphabet List of automaton input alphabet symbols
 */
function standardTransitionCheck(transitions: any[], states: string[], alphabet: string[]) {
  //each transition must go from and to some state defined in states on input defined in input alphabet, or on null
  for (let transition of transitions) {
    if (states.indexOf(transition.from) === -1) {
      throw new FA_Error.TransitionAttributeNotDefined("source", "states", transition.from, false);
    }
    if (states.indexOf(transition.to) === -1) {
      throw new FA_Error.TransitionAttributeNotDefined("target", "states", transition.to, false);
    }
    if (alphabet.indexOf(transition.input) === -1 && transition.input !== null) {
      throw new FA_Error.TransitionAttributeNotDefined("input", "input alphabet", transition.input, true);
    }
  }
}

/** 
 * Function to validate epsilon-free finite automaton rules. Does NOT allow epsilon transitions.
 * 
 * @description Checks: 
 *  - source is defiend in states
 *  - target is defiend in states
 *  - input is defined in input alphabet
 * @param transitions List of automaton transitions
 * @param states List of automaton states
 * @param alphabet List of automaton input alphabet symbols
 */
function epsilonFreeTransitionCheck(transitions: any[], states: string[], alphabet: string[]) {
  //each transition must go from and to some state defined in states on input defined in input alphabet, null is not allowed
  for (let transition of transitions) {
    if (states.indexOf(transition.from) === -1) {
      throw new FA_Error.TransitionAttributeNotDefined("source", "states", transition.from, false);
    }
    if (states.indexOf(transition.to) === -1) {
      throw new FA_Error.TransitionAttributeNotDefined("target", "states", transition.to, false);
    }
    if (alphabet.indexOf(transition.input) === -1) {
      throw new FA_Error.TransitionAttributeNotDefined("input", "input alphabet", transition.input, false);
    }
  }
}

/**
 * Function to validate, if given automaton rules are deterministic. Functions does not check usage of states and input alphabet symbols.
 * Automaton is deterministic if from each state go transitions with different input and it has only one initial symbol.
 * @param transitions List of automaton transitions
 * @param initial_states: List of automaton initial states
 */
function deterministicTransitionCheck(transitions: any[], initial_states: string[]) {
  //from one state can go only transitions with different inputs
  if (initial_states.length !== 1) {
    throw new FA_Error.MultipleInitialStates();
  }
  let statesAndInputs: { [key: string]: string[] } = {};
  for (let transition of transitions) {
    let res: string[] = statesAndInputs[transition.from];
    if (res) {
      if (res.indexOf(transition.input) !== -1) {
        throw new FA_Error.NotDeterministic(transition.from, transition.input);
      } else {
        res.push(transition.input);
      }
    } else {
      statesAndInputs[transition.from] = [transition.input];
    }
  }
}

/**
 * Function to validate core structure of a finitie automaton. It validates everything except for transitions and determinism.
 * 
 * @description Checks:
 *  - states and initial states are not empty arrays
 *  - states are not empty strings and consist of allowed symbols
 *  - input alphabet symbols are characters and are allowed symbols
 *  - states and input alphabet symbols are unique
 *  - initial and final states are defined in states
 * @param automaton Automaton to validate
 */
function validateFiniteAutomaton(automaton: FA) {
  //states must not be empty
  if (automaton.states.length === 0) {
    throw new FA_Error.StatesEmpty();
  }
  //initial states must not be empty
  if (automaton.initial_states.length === 0) {
    throw new FA_Error.InitialStatesEmpty();
  }
  //each state must consist only from allowed symbols
  for (let state of automaton.states) {
    if (state.length < 1) {
      throw new FA_Error.StateZeroLength();
    }
    for (let i = 0; i < state.length; i++) {
      if (!allowedSymbols.has(state.charAt(i))) {
        throw new FA_Error.NotAllowedChar("states", state);
      }
    }
  }
  //each symbol of input alphabet must be only character and that must be an allowed symbol
  for (let symbol of automaton.input_alphabet) {
    if (symbol.length !== 1) {
      throw new FA_Error.AlphabetNotChar(symbol);
    }
    if (!allowedSymbols.has(symbol)) {
      throw new FA_Error.NotAllowedChar("input alphabet", symbol);
    }
  }
  //each state and input alphabet name must be unique 
  const symbolArray: string[] = automaton.states.concat(automaton.input_alphabet);
  for (let symbol of symbolArray) {
    const res: number = symbolArray.filter(element => element === symbol).length;
    if (res !== 1) {
      throw new FA_Error.NotUniqueNames(symbol);
    }
  }
  //each initial state must be defined in states
  for (let state of automaton.initial_states) {
    if (automaton.states.indexOf(state) === -1) {
      throw new FA_Error.StateNotDefined("initial state", state);
    }
  }
  //each final state must be defined in states
  for (let state of automaton.final_states) {
    if (automaton.states.indexOf(state) === -1) {
      throw new FA_Error.StateNotDefined("final state", state);
    }
  }
}

/**
 * Function to validate common NFA with allowed epsilon transitions. Validates automaton's core structure and transitions.
 * @param automaton ENFA to validate
 */
export function validateEpsilonNFA(automaton: ENFA): boolean {
  //check basic structure of the automaton
  validateFiniteAutomaton(automaton);
  //each transition must fullfil standard transition's rules
  standardTransitionCheck(automaton.transitions, automaton.states, automaton.input_alphabet);
  return true;
}

/**
 * Function to validate NFA with forbidden epsilon transitions. Validates automaton's core structure and transitions.
 * @param automaton NFA to validate
 */
export function validateNFA(automaton: NFA): boolean {
  //check basic structure of the automaton
  validateFiniteAutomaton(automaton);
  //each transition must fullfil epsilon free transition's rules
  epsilonFreeTransitionCheck(automaton.transitions, automaton.states, automaton.input_alphabet);
  return true;
}

/**
 * Function to validate DFA. Validates automaton's core structure and transitions and its determinism.
 * @param automaton DFA to validate
 */
export function validateDFA(automaton: DFA): boolean {
  //check basic structure of the automaton
  validateFiniteAutomaton(automaton);
  //each transition must fullfil epsilon free transition's rules
  epsilonFreeTransitionCheck(automaton.transitions, automaton.states, automaton.input_alphabet);
  //automaton must be deterministic
  deterministicTransitionCheck(automaton.transitions, automaton.initial_states);
  return true;
}