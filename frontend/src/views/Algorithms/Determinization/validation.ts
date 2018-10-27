//#region imports
import { FAType, NFA } from 'lib/types';
import { Parser as GRParser } from 'lib/parse/grammar/Parser';
import { validateNFA } from 'lib/validate';
import { AutomatonInputValue } from 'components/Forms/Automaton';
//#endregion

interface Data {
  values: AutomatonInputValue
}

/**
 * Parses and validates input data.
 *
 * @description Takes a `Data` object as an argument. The calle of the function
 * is responsible, that `values` property of the data object
 * is in sync.
 *
 * @param data A data object that contains input for validation.
 * @return A parsed input, which corresponds to `NFA` object.
 */
export function validate(data: Data): NFA {
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

  // Assemble automaton object
  const automaton = {
    type: FAType.NFA,
    initial_states: initStates,
    final_states: finStates,
    input_alphabet: input,
    states,
    transitions
  } as NFA;

  validateNFA(automaton);
  return automaton;

}

