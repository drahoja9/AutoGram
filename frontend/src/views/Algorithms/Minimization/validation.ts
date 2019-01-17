//#region imports
import { DFA } from 'lib/types';
import { validateDFA } from 'lib/validate';
import { assembleDFA } from 'lib/assemble';
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
export function validate(data: Data): DFA {
  const automaton = assembleDFA(data);
  validateDFA(automaton);
  return automaton;

}

