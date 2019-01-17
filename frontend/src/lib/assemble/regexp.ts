//#region imports
import { Parser } from 'lib/parse/regexp/Parser';
import { RegexpInputValue } from 'components/Forms/Regexp';
import { RE } from 'lib/types';
//#endregion

interface RegexpData {
  values: RegexpInputValue,
}

export function assembleRE(data: RegexpData) : RE {
  const values = data.values;

  //Parse
  const parser = new Parser(values);

  // Assemble regexp object
  const regexp = parser.parse();

  return regexp;
}