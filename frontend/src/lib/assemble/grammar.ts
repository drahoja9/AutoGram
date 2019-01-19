//#region imports
import { GrammarInputValue } from 'components/Forms/Grammar'
import { GRType, CFG, RRG, CNF } from 'lib/types';
import { Parser as GRParser } from 'lib/parse/grammar/Parser';
import { ParseError } from 'lib/parse';
//#endregion

interface GrammarData {
  values: GrammarInputValue;
}
interface ParsedGrammarData {
  nonterminal_alphabet: string[],
  terminal_alphabet: string[],
  initial_symbol: string,
  rules: {
    from: string;
    to: string[] | [null];
  }[];
}

function parseGrammar(data: GrammarData): ParsedGrammarData {
  const values = data.values;
  const p = new GRParser(values.nonTerms);

  // Parse input
  const nonTerm = p.parseIdentList();
  p.setBuffer(values.terms);
  const terms = p.parseIdentList();
  p.setBuffer(values.rules);
  const rules = p.parseRules();
  let startSymbol = "";
  if (values.startSymbol.length <= 1) {
    startSymbol = values.startSymbol;
  } else if (values.startSymbol[0] === '<' && values.startSymbol[values.startSymbol.length - 1] === '>') {
    startSymbol = values.startSymbol.substring(1, values.startSymbol.length - 1);
  } else {
    throw new ParseError().addFixit("Every multi-character non-teminal should be wrapped in <>.")
  }

  return {
    nonterminal_alphabet: nonTerm,
    terminal_alphabet: terms,
    initial_symbol: startSymbol,
    rules: rules
  }
}

export function assembleRRG(data: GrammarData): RRG {
  const parsed = parseGrammar(data)

  // Assemeble grammar object
  const grammar = {
    type: GRType.RRG,
    nonterminal_alphabet: parsed.nonterminal_alphabet,
    terminal_alphabet: parsed.terminal_alphabet,
    initial_symbol: parsed.initial_symbol,
    rules: parsed.rules
  } as RRG;

  return grammar;
}

export function assembleCNF(data: GrammarData): CNF {
  const parsed = parseGrammar(data)

  // Assemeble grammar object
  const grammar = {
    type: GRType.CNF,
    nonterminal_alphabet: parsed.nonterminal_alphabet,
    terminal_alphabet: parsed.terminal_alphabet,
    initial_symbol: parsed.initial_symbol,
    rules: parsed.rules
  } as CNF;

  return grammar;
}

export function assembleCFG(data: GrammarData): CFG {
  const parsed = parseGrammar(data)

  // Assemeble grammar object
  const grammar = {
    type: GRType.CFG,
    nonterminal_alphabet: parsed.nonterminal_alphabet,
    terminal_alphabet: parsed.terminal_alphabet,
    initial_symbol: parsed.initial_symbol,
    rules: parsed.rules
  } as CFG;

  return grammar;
}