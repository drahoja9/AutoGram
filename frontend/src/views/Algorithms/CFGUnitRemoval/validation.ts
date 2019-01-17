//#region imports
import { GrammarInputValue } from 'components/Forms/Grammar'
import { CFGUnitRemovalRequest } from 'lib/types';
import { validateCFG } from 'lib/validate';
import { assembleCFG } from 'lib/assemble';
//#endregion

interface Data {
  values: GrammarInputValue;
}

/**
 * Parses and validates input data.
 *
 * @description Takes a `Data` object as an argument. The calle of the function
 * is responsible, that `values` property of the data object
 * is in sync.
 *
 * @param data A data object that contains input for validation.
 * @return A parsed input, which corresponds to `CFGUnitRemovalRequest` object.
 */
export function validate(data: Data): CFGUnitRemovalRequest {
  const grammar = assembleCFG(data);
  validateCFG(grammar);
  return grammar;
}

