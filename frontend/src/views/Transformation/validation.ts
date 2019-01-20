//#region imports
import { RRG, NFA, RE } from 'lib/types';
import { validateRE, validateRRG, validateNFA } from 'lib/validate';
import {
  InputType,
  ValueStore
} from 'components/LangInput';
import { AutomatonInputValue } from 'components/Forms/Automaton';
import { GrammarInputValue } from 'components/Forms/Grammar';
import { RegexpInputValue } from 'components/Forms/Regexp';
import { assembleRE, assembleRRG, assembleNFA } from 'lib/assemble';
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
  const automaton = assembleNFA({values})
  validateNFA(automaton);
  return automaton;
}

function validateGrammar(values: GrammarInputValue): RRG {
    const grammar = assembleRRG({values})
    validateRRG(grammar);
    return grammar;
}

function validateRegexp(values: RegexpInputValue): RE {
  const re = assembleRE({values})
  validateRE(re);
  return re;
}

