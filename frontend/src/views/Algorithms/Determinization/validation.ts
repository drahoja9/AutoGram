//#region imports
import { NFA } from 'lib/types';
import { validateNFA } from 'lib/validate';
import { assembleNFA } from 'lib/assemble';
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
  const automaton = assembleNFA(data);
  validateNFA(automaton);
  return automaton;

}

