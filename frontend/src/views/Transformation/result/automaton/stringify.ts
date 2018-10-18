//#region imports
import { FAType, FA } from 'lib/types';
//#endregion

export interface TransitionMap {
  [key: string]: {
    [key: string]: string;
  }
}

export function automatonTransitionsToString(automaton: FA) {
  let transitionMap: {[key: string] : {[key: string] : string}} = {};

  for (const state of automaton.states){
    transitionMap[state] = {};
    for (const input of automaton.input_alphabet){
      transitionMap[state][input] = '';
    }
    if (automaton.type === FAType.ENFA){
      transitionMap[state]['ε'] = '';
    }
  }

  for (const transition of automaton.transitions){
    let input : string = transition.input || 'ε';

    if (transitionMap[transition.from][input] === ''){
      transitionMap[transition.from][input] = transition.to;
    } else {
      transitionMap[transition.from][input] += ', ' + transition.to;
    }
  }


  return transitionMap;
}
