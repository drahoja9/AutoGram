//#region imports
import { GRType, CFG } from 'lib/types';
import { Parser as GRParser } from 'lib/parse/grammar/Parser';
import { validateCFG } from 'lib/validate';
import { GrammarInputValue } from 'components/Forms/Grammar';
import { ParseError } from 'lib/parse';
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
export function validate(data: Data): CFG {
  const p = new GRParser(data.values.nonTerms);
    // Parse input
    const nonTerm = p.parseIdentList();
    p.setBuffer(data.values.terms);
    const terms = p.parseIdentList();
    p.setBuffer(data.values.rules);
    const rules = p.parseRules();
    let startSymbol = "";
    if (data.values.startSymbol.length <= 1){
      startSymbol = data.values.startSymbol;
    } else if (data.values.startSymbol[0] === '<' && data.values.startSymbol[data.values.startSymbol.length - 1] === '>') {
      startSymbol = data.values.startSymbol.substring(1, data.values.startSymbol.length - 1)
    } else {
      throw new ParseError().addFixit("Every multi-character non-teminal should be wrapped in <>.")
    }

    // Assemeble grammar object
    const grammar = {
      type: GRType.CFG,
      nonterminal_alphabet: nonTerm,
      terminal_alphabet: terms,
      initial_symbol: startSymbol,
      rules
    } as CFG;

    validateCFG(grammar);
    return grammar;
}

