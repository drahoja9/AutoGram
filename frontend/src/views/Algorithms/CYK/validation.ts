//#region imports
import { GRType, CNF } from 'lib/types';
import { Parser as GRParser } from 'lib/parse/grammar/Parser';
import { validateCNF } from 'lib/validate';
import { GrammarInputValue } from 'components/Forms/Grammar';
//#endregion

interface Data {
  values: GrammarInputValue
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
export function validate(data: Data): CNF {
  const p = new GRParser(data.values.nonTerms);
    // Parse input
    const nonTerm = p.parseIdentList();
    p.setBuffer(data.values.terms);
    const terms = p.parseIdentList();
    p.setBuffer(data.values.rules);
    const rules = p.parseRules();

    // Assemeble grammar object
    const grammar = {
      type: GRType.CNF,
      nonterminal_alphabet: nonTerm,
      terminal_alphabet: terms,
      initial_symbol: data.values.startSymbol,
      rules
    } as CNF;

    validateCNF(grammar);
    return grammar;
}

