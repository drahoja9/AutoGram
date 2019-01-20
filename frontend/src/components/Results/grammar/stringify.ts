//#region imports
import { GR } from 'lib/types';
//#endregion

export function symbolToString(symbol: string): string {
  if (symbol.length == 1) {
    return symbol;
  } else {
    return '<' + symbol + '>';
  }
}

export function grammarTermsToString(terms: string[]): string {
  let res = '';
  let isFirst = true;

  for (let term of terms) {
    if (isFirst) {
      isFirst = false;
    } else {
      res += ', ';
    }
    res += symbolToString(term)
  }

  return res;
}

export function grammarRulesToString(grammar: GR): string[] {
  let ruleMap: { [key: string]: Array<string[] | [null]> } = {};

  for (let rule of grammar.rules) {
    let res = ruleMap[rule.from];
    if (res) {
      ruleMap[rule.from].push(rule.to);
    }
    else {
      ruleMap[rule.from] = [];
      ruleMap[rule.from].push(rule.to);
    }
  }

  let res: string[] = [];
  let ruleFirst: boolean = true;

  for (let nonterminal of grammar.nonterminal_alphabet) {
    let str: string = "";
    if (ruleMap[nonterminal]) {
      str += symbolToString(nonterminal) + " -> ";
      ruleFirst = true;
      for (let rule of ruleMap[nonterminal]) {
        if (ruleFirst) {
          ruleFirst = false;
        } else {
          str += " | ";
        }
        for (let symbol of rule) {
          if (symbol === null) {
            str += "ε";
          } else {
            str += symbolToString(symbol);
          }
        }
      }
      res.push(str);
    }
  }

  return res;
}
