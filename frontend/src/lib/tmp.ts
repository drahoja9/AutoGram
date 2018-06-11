import { GR, RE, FA, FAType} from './types';
import { RENode, NodeType } from 'lib/types';
import { Concat, Iter, Alter} from 'lib/types';


export function grammarRulesToString (grammar: GR) : string[] {
  let ruleMap : {[key: string] : Array<string[]|[null]>} = {};

  for (const rule of grammar.rules){
    let res = ruleMap[rule.from];
    if (res){
      ruleMap[rule.from].push(rule.to);
    }
    else {
      ruleMap[rule.from] = [];
      ruleMap[rule.from].push(rule.to);
    }
  }

  let res : string[] = [];
  let ruleFirst : boolean = true;

  for (const nonterminal of grammar.nonterminal_alphabet){
    let str : string = "";
    if (ruleMap[nonterminal]){
      str += nonterminal + " -> ";
      ruleFirst = true;
      for (const rule of ruleMap[nonterminal]){
        if (ruleFirst){
          ruleFirst = false;
        } else {
          str += " | ";
        }
        for (const symbol of rule){
          if (symbol === null){
            str += "ε";
          } else {
            str += symbol;
          }
        }
      }
      res.push(str);
    }
  }

  return res;
}

function alterToString(node: Alter, outer: boolean) : string {
  let res : string = "";
  let first: boolean = true;

  if (!outer){
    res += "(";
  }

  for (const child of node.value){
    if (first){
      first = false;
    } else {
      res += "+";
    }
    res += nodeToString(child);
  }

  if (!outer){
    res += ")";
  }

  return res;
}

function concatToString(node: Concat) : string {
  let res : string = "";

  for (const child of node.value){
    res += nodeToString(child);
  }

  return res;
}

function iterToString(node: Iter) : string {
  let res : string = ""
  if (node.value.type === NodeType.Concat || node.value.type === NodeType.Iter){
    res += "(";
  }
  res += nodeToString(node.value);
  if (node.value.type === NodeType.Concat || node.value.type === NodeType.Iter){
    res += ")";
  }
  res += "*";
  return res;
}

function nodeToString (node: RENode, outer: boolean = false) : string {
  switch(node.type){
    case NodeType.Alter:
      return alterToString(node, outer);
    case NodeType.Concat:
      return concatToString(node);
    case NodeType.Iter:
      return iterToString(node);
    case NodeType.Term:
      return node.value;
    case NodeType.Epsilon:
      return 'ε';
    case NodeType.EmptySymbol:
      return '∅';
  }

}

export function regexpToString (regexp: RE){
  return nodeToString(regexp.value, true);
}


//------------------------------------------------------------------------------------------------

/*export function automatonTransitionsToString (transitions: any, from: string, input: string | null) : string {
  let res : string = "";
  let first : boolean = true;

  for (const transition of transitions){
    if (transition.from == from && transition.input == input){
      if (first){
        first = false;
      } else {
        res += ", "
      }
      res += transition.to;
    }
  }

  return res;
}*/

export function automatonTransitionsToString (automaton: FA) {
  let transitionMap: {[key: string] : {[key: string] : string}} = {};

  for (const state of automaton.states){
    transitionMap[state] = {};
    for (const input of automaton.input_alphabet){
      transitionMap[state][input] = "";
    }
    if (automaton.type === FAType.ENFA){
      transitionMap[state]['ε'] = "";
    }
  }

  for (const transition of automaton.transitions){
    let input : string = transition.input || 'ε';

    if (transitionMap[transition.from][input] === ""){
      transitionMap[transition.from][input] = transition.to
    } else {
      transitionMap[transition.from][input] += ", " + transition.to
    }
  }


  return transitionMap;
}
