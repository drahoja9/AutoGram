//#region imports
import { DerivationRequest } from 'lib/types';
import { validateRE, validateExtraString } from 'lib/validate';
import { assembleRE } from 'lib/assemble';
import { RegexpInputValue } from 'components/Forms/Regexp';
//#endregion

interface Data {
  values: RegexpInputValue,
  derivationString: string
}

/**
 * Parses and validates input data.
 *
 * @description Takes a `Data` object as an argument. The call of the function
 * is responsible, that `values` property of the data object
 * is in sync.
 *
 * @param data A data object that contains input for validation.
 * 
 * @return A parsed input, which corresponds to `RE` object.
 */
export function validate(data: Data): DerivationRequest {
  const secondParameter = data.derivationString;

  // Assemble regexp object
  const regexp = assembleRE({values: data.values})

  let derivationString = '';
  let whiteSpace = [' ', '\t', '\n'];
  for (const char of secondParameter) {
    if (whiteSpace.indexOf(char) === -1) {
      derivationString += char;
    }
  }

  validateRE(regexp);
  validateExtraString(derivationString, 'derivation string');

  return { regexp: regexp, derivation_string: derivationString };
}

