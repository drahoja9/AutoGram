import { GRType, FAType } from 'lib/types';
import { Parser as GRParser } from 'lib/parse/grammar/Parser';
import { Parser as REParser } from 'lib/parse/regexp/Parser';
import { validateRE, validateRRG, validateNFA } from 'lib/validate';

export function validate(data: any): boolean {
  const values = data.values[data.selected];
  console.log(data);

  switch (data.selected) {
    case 'au': {
      const input = values.header;
      const states = values.body.map((v: any) => v.value);
      const initStates = values.body
        .filter((v: any) => v.isInitial)
        .map((v: any) => v.value);

      const finStates = values.body
        .filter((v: any) => v.isFinal)
        .map((v: any) => v.value);

      const transitions: {from: string, input: string, to: string }[] = [];
      for (const row of values.body) {
        const from = row.value;

        row.values.forEach((value: string, idx: number) => {
          const p = new GRParser(value);
          for (const to of p.parseIdentList()) {
            transitions.push({ from, input: values.header[idx], to });
          }
        });
      }

      console.log({
        type: FAType.NFA,
        initial_states: initStates,
        final_states: finStates,
        input_alphabet: input,
        states,
        transitions
      });

      return validateNFA({
        type: FAType.NFA,
        initial_states: initStates,
        final_states: finStates,
        input_alphabet: input,
        states,
        transitions
      });
    }


    case 'gr': {
      const p = new GRParser(values.nonTerms);
      const nonTerm = p.parseIdentList();
      p.setBuffer(values.terms);
      const terms = p.parseIdentList();
      p.setBuffer(values.rules);
      const rules = p.parseRules();
      const startSymbol = values.startSymbol;

      return validateRRG({
        type: GRType.RRG,
        nonterminal_alphabet: nonTerm,
        terminal_alphabet: terms,
        initial_symbol: startSymbol,
        rules
      });
    }

    case 're': {
      const p = new REParser(values);
      const re = p.parse();
      return validateRE(re);
    }


    default:
      throw new TypeError("Invalid type");
  }
}



