//#region imports
import { GrammarInputValue } from 'components/Forms/Grammar'
import { GRType, CFG, CFGUnitRemovalRequest } from 'lib/types';
import { validateCFG } from 'lib/validate';
import { Parser as GRParser } from 'lib/parse/grammar/Parser';
import { ParseError } from 'lib/parse';
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
  const values = data.values;
  const p = new GRParser(values.nonTerms);

  // Parse input
  const nonTerm = p.parseIdentList();
  p.setBuffer(values.terms);
  const terms = p.parseIdentList();
  p.setBuffer(values.rules);
  const rules = p.parseRules();
  let startSymbol = "";
  if (values.startSymbol.length <= 1){
    startSymbol = values.startSymbol;
  } else if (values.startSymbol[0] === '<' && values.startSymbol[values.startSymbol.length - 1] === '>') {
    startSymbol = values.startSymbol.substring(1, values.startSymbol.length - 1)
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

