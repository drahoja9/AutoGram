//#region imports
import { GRType, FAType, RRG, NFA, RE } from 'lib/types';
import { Parser as GRParser } from 'lib/parse/grammar/Parser';
import { Parser as REParser } from 'lib/parse/regexp/Parser';
import { validateRE, validateRRG, validateNFA } from 'lib/validate';
import {
  InputType,
  ValueStore
} from 'components/LangInput';
import { AutomatonInputValue } from 'components/Forms/Automaton';
import { GrammarInputValue } from 'components/Forms/Grammar';
import { RegexpInputValue } from 'components/Forms/Regexp';
import { ParseError } from 'lib/parse';
//#endregion

interface Data {
  selected: InputType;
  values: ValueStore;
}

/**
 * Parses and validates input data.
 *
 * @description Takes a `Data` object as an argument. The calle of the function
 * is responsible, taht `selected` and `values` properties of the data object
 * are in sync.
 *
 * @param data A data object that contains input for validation.
 * @return A parsed input, which corresponds to `RRG`, `NFA` or `RE` object.
 */
export function validate(data: Data): RRG | NFA | RE {
  const values = data.values[data.selected];
  switch (data.selected) {
    case InputType.Automaton: return validateAutomaton(values as AutomatonInputValue);
    case InputType.Grammar: return validateGrammar(values as GrammarInputValue);
    case InputType.Regexp: return validateRegexp(values as RegexpInputValue);
  }
}

function validateAutomaton(values: AutomatonInputValue): NFA {
  // Helper function that extracts values and optionally filters upon predicate.
  const valuesWhere = <T, U extends { value: T }>(
    items: U[],
    where: (item: U) => boolean = (_) => true
  ): T[] => ( items.filter(where).map(item => item.value) );

  // Parse input
  const input = values.header;
  const states = valuesWhere(values.body);
  const initStates = valuesWhere(values.body, (item) => item.isInitial);
  const finStates = valuesWhere(values.body, (item) => item.isFinal);

  const transitions: {from: string, input: string, to: string }[] = [];
  for (const row of values.body) {
    const from = row.value;

    row.values.forEach((value, idx) => {
      const p = new GRParser(value);
      for (const to of p.parseIdentList()) {
        transitions.push({ from, input: values.header[idx], to });
      }
    });
  }

  // Assemble automaton object
  const automaton = {
    type: FAType.NFA,
    initial_states: initStates,
    final_states: finStates,
    input_alphabet: input,
    states,
    transitions
  } as NFA;

  validateNFA(automaton);
  return automaton;
}

function validateGrammar(values: GrammarInputValue): RRG {
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
      type: GRType.RRG,
      nonterminal_alphabet: nonTerm,
      terminal_alphabet: terms,
      initial_symbol: startSymbol,
      rules
    } as RRG;

    validateRRG(grammar);
    return grammar;
}

function validateRegexp(values: RegexpInputValue): RE {
  // Parse regexp
  const p = new REParser(values);
  const re = p.parse();

  validateRE(re);
  return re;
}

