//#region imports
import { RE } from 'lib/types';
import { Parser } from 'lib/parse/regexp/Parser';
import { validateRE } from 'lib/validate';
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
 * @return A parsed input, which corresponds to `RE` object.
 */
export function validate(data: Data): RE {
  const values = data.values;
  // const derivationString = data.derivationString;

  //Parse
  const parser = new Parser(values);

  // Assemble regexp object
  const regexp = parser.parse();

  validateRE(regexp);
  // validateDerivationString(derivationString);
  return regexp;

}

