//#region imports
import { FAType, FA } from 'lib/types';
//#endregion

export interface TransitionMap {
  [key: string]: {
    [key: string]: string;
  }
}

export function symbolToString(symbol: string): string {
  if (symbol.length == 1) {
    return symbol;
  } else {
    return '<' + symbol + '>';
  }
}

export function statesToString(states: string[]): string[] {
  let res: string[] = [];
  for (const state of states) {
    res.push(symbolToString(state));
  }
  return res;
}

export function automatonTransitionsToString(automaton: FA) {
  let transitionMap: { [key: string]: { [key: string]: string } } = {};

  for (let state of automaton.states) {
    state = symbolToString(state);
    transitionMap[state] = {};
    for (const input of automaton.input_alphabet) {
      transitionMap[state][input] = '';
    }
    if (automaton.type === FAType.ENFA) {
      transitionMap[state]['ε'] = '';
    }
  }

  for (const transition of automaton.transitions) {
    let input: string = transition.input || 'ε';
    const from = symbolToString(transition.from);
    const to = symbolToString(transition.to);

    if (transitionMap[from][input] === '') {
      transitionMap[from][input] = to;
    } else {
      transitionMap[from][input] += ', ' + to;
    }
  }

  return transitionMap;
}
