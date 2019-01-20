//#region imports
import { validateCNF, validateExtraString } from 'lib/validate';
import { assembleCNF } from 'lib/assemble';
import { GrammarInputValue } from 'components/Forms/Grammar';
import { CYKRequest } from 'lib/types';
//#endregion

interface Data {
  values: GrammarInputValue;
  cykString: string;
}

/**
 * Parses and validates input data.
 *
 * @description Takes a `Data` object as an argument. The calle of the function
 * is responsible, that `values` property of the data object
 * is in sync.
 *
 * @param data A data object that contains input for validation.
 * @return A parsed input, which corresponds to `CFG` object.
 */
export function validate(data: Data): CYKRequest {
  const secondParameter = data.cykString;
  const grammar = assembleCNF({ values: data.values })
  validateCNF(grammar);

  let cykString = '';
  let whiteSpace = [' ', '\t', '\n'];
  for (const char of secondParameter) {
    if (whiteSpace.indexOf(char) === -1) {
      cykString += char;
    }
  }
  validateExtraString(cykString, 'CYK string')

  return { grammar: grammar, cyk_string: cykString };
}

