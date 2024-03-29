import { allowedSymbols, ExtraStringExceptions as ES_Error } from 'lib/validate';


export function validateExtraString(extraString: string, type: string = ''): boolean {
  if (extraString === '') {
    throw new ES_Error.EmptyString(type);
  }

  for (const char of extraString) {
    if (!allowedSymbols.has(char) && char !== 'ε' && char !== '∅') {
      throw new ES_Error.NotAllowedChar(char, type);
    }
  }
  return true;
}