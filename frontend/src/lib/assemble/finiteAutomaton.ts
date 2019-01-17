//#region imports
import { FAType, DFA, NFA, ENFA } from 'lib/types';
import { Parser as GRParser } from 'lib/parse/grammar/Parser';
import { AutomatonInputValue } from 'components/Forms/Automaton';
import { UnexpectedTokenError } from 'lib/parse/exceptions';
//#endregion

interface AutomatonData {
  values: AutomatonInputValue
}

interface ParsedAutomatonData {
    initial_states: any,
    final_states: any,
    input_alphabet: any,
    states: any,
    transitions: any
}

function parseAutomaton(data: AutomatonData) : ParsedAutomatonData {
  const values = data.values
  
  const valuesWhere = <T, U extends { value: T }>(
    items: U[],
    where: (item: U) => boolean = (_) => true
  ): T[] => ( items.filter(where).map(item => item.value) );

  //Parse
  const input = values.header;
  const states = valuesWhere(values.body);
  const initStates = valuesWhere(values.body, (item) => item.isInitial);
  const finStates = valuesWhere(values.body, (item) => item.isFinal);

  const transitions: {from: string, input: string, to: string }[] = [];
  for (const row of values.body) {
    const from = row.value;

    row.values.forEach((value, idx) => {
      const p = new GRParser(value);
      for (const to of p.parseIdentList()) {
        transitions.push({ from, input: values.header[idx], to });
      }
    });
  }    

    return {
      initial_states: initStates,
      final_states: finStates,
      input_alphabet: input,
      states: states,
      transitions: transitions
    }
}

export function assembleDFA(data: AutomatonData) : DFA {
  
  const parsed = parseAutomaton(data);

  // Assemble automaton object
  const automaton = {
    type: FAType.DFA,
    initial_states: parsed.initial_states,
    final_states: parsed.final_states,
    input_alphabet: parsed.input_alphabet,
    states: parsed.states,
    transitions: parsed.transitions
  } as DFA;

  return automaton
}

export function assembleNFA(data: AutomatonData) : NFA {
  
  const parsed = parseAutomaton(data);

  // Assemble automaton object
  const automaton = {
    type: FAType.NFA,
    initial_states: parsed.initial_states,
    final_states: parsed.final_states,
    input_alphabet: parsed.input_alphabet,
    states: parsed.states,
    transitions: parsed.transitions
  } as NFA;

  return automaton
}

export function assembleENFA(data: AutomatonData) : ENFA {
  
  const parsed = parseAutomaton(data);

  // Check for epsilon transitions and correct their form
  let epsIndex = parsed.input_alphabet.indexOf('ε');
  if(parsed.input_alphabet != -1){
    //only one epsilon column
    if (parsed.input_alphabet.indexOf('ε', epsIndex+1) != -1){
      throw new UnexpectedTokenError('ε');
    }
    //replace 'ε' in transitions with null
    for (let transition of parsed.transitions){
      if (transition.input == 'ε'){
        transition.input = null;
      }
    }
    //remove 'ε' from input
    parsed.input_alphabet = parsed.input_alphabet.filter((item: any) => item !== 'ε');
  }

  // Assemble automaton object
  const automaton = {
    type: FAType.ENFA,
    initial_states: parsed.initial_states,
    final_states: parsed.final_states,
    input_alphabet: parsed.input_alphabet,
    states: parsed.states,
    transitions: parsed.transitions
  } as ENFA;

  return automaton
}
