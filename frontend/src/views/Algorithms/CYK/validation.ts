//#region imports
import { validateCNF } from 'lib/validate';
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
    const grammar = assembleCNF({values: data.values})
    validateCNF(grammar);

    //validate string!!
    
    return {grammar: grammar, cyk_string: data.cykString};
}

