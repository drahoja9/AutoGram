//#region imports
import {CFG, GR, RRG, CNF} from 'lib/types';
import {allowedSymbols} from 'lib/validate';
import { GrammarExceptions as GR_Error} from 'lib/validate';
//#endregion

/**
 * Function to check correct structure of context-free grammar rules. Allows epsilon on the left side of the rule.
 * Checks:
 *  - on the right side there is nonterminal symbol
 *  - on the left side there is combination of defined terminals and non-terminals or null
 * @param rules List of rules to be checked
 * @param nonterminal_alphabet List of non-terminal alphabet symbols
 * @param terminal_alphabet List of terminal alphabet symbols
 */
function contextFreeRulesCheck(rules: any[], nonterminal_alphabet: string[], terminal_alphabet: string[]){
  //each rule's left side must be one non-terminal character
  //each rule's right side must not be empty and must consist of array of combinantion of terminal and nonterminal symbols or of only null
  const symbol_array : string[] = nonterminal_alphabet.concat(terminal_alphabet);
  for (let rule of rules) {
    if (nonterminal_alphabet.indexOf(rule.from) === -1){
      throw new GR_Error.GR_RuleFromNotDefined(rule.from);
    }
    if (rule.to.length === 0){
      throw new GR_Error.GR_CFGRuleToZeroLength();
    }
    if (rule.to.length === 1 && rule.to[0] === null){
      continue;
    } else {
      for (let element of rule.to){
        if (symbol_array.indexOf(element) === -1){
          throw new GR_Error.GR_CFGRuleToNotDefined(rule.from, rule.to, element);
        }
      }
    }
  }
}

/**
 * Function to check correct structure of (right) regular grammar rules. Allows epsilon on the left side of the rule.
 * Does not check if epsilon is placed correctly.
 * Checks:
 *  - on the right side there is nonterminal symbol
 *  - on the left side there is either one terminal OR one terminal and one non-terminal (in this order) OR null
 * @param rules List of rules to be checked
 * @param nonterminal_alphabet List of non-terminal alphabet symbols
 * @param terminal_alphabet List of terminal alphabet symbols
 */
function regularRulesCheck(rules: any[], nonterminal_alphabet: string[], terminal_alphabet: string[]){
  //each rule's left side must be one non-terminal character
  //each rule's right side must be either one terminal character or one terminal and one nonterminal character
  for (let rule of rules){
    if (nonterminal_alphabet.indexOf(rule.from) === -1){
      throw new GR_Error.GR_RuleFromNotDefined(rule.from);
    }
    if (rule.to.length === 1 && rule.to[0] === null){
      continue;
    }
    const type_one : boolean = (rule.to.length === 1 && terminal_alphabet.indexOf(rule.to[0]) !== -1);
    const type_two : boolean = (rule.to.length === 2 && terminal_alphabet.indexOf(rule.to[0]) !== -1
                              && nonterminal_alphabet.indexOf(rule.to[1]) !== -1);
    if (!type_one && !type_two){
      throw new GR_Error.GR_RGRuleToInvalid(rule.from, rule.to);
    }
  }
}

/**
 * Function to check correct structure of CNF grammar rules. Allows epsilon on the left side of the rule.
 * Does not check if epsilon is placed correctly.
 * Checks:
 *  - on the right side there is nonterminal symbol
 *  - on the left side there is either one terminal OR two non-terminals OR null
 * @param rules List of rules to be checked
 * @param nonterminal_alphabet List of non-terminal alphabet symbols
 * @param terminal_alphabet List of terminal alphabet symbols
 */
function chomskyRulesCheck(rules: any[], nonterminal_alphabet: string[], terminal_alphabet: string[]){
  //each rule's left side must be one non-terminal character
  //each rule's right side must be either one terminal character or two nonterminal characters
  for (let rule of rules) {
    if (nonterminal_alphabet.indexOf(rule.from) === -1){
      throw new GR_Error.GR_RuleFromNotDefined(rule.from);
    }
    if (rule.to.length === 1 && rule.to[0] === null){
      continue;
    }
    const type_one : boolean = (rule.to.length === 1 && terminal_alphabet.indexOf(rule.to[0]) !== -1);
    const type_two : boolean = (rule.to.length === 2 && nonterminal_alphabet.indexOf(rule.to[0]) !== -1
                              && nonterminal_alphabet.indexOf(rule.to[1]) !== -1);
    if (!type_one && !type_two){
      throw new GR_Error.GR_CNFRuleToInvalid(rule.from, rule.to);
    }
  }
}

/**
 * Function to check correct placement of epsilon rule.
 * Epsilon can be on the right side of a rule, if on the left side there is initial symbol. 
 * Plus if this situation occurs, then initial symbol must not be on the right side of any rule.
 * Function does NOT check structure of rules or usage of terminal and non-terminal symbols.
 * @param rules List of rules to be checked
 * @param initial_symbol Initial symbol of the grammar
 */
function epsilonCheck(rules: any[], initial_symbol: string){
  //if it is possible to rewrite initial symbol to epsilon, then initial symbol must not be on right side of any rule
  //a) can any nonterminal be rewritten to epsilon?
  const allRewritableToNull : any[] = rules.filter(rule => rule.to.length === 1 && rule.to[0] === null);
  if (allRewritableToNull.length === 0){
    return;
  }
  //b) epsilon must not be anywhere else, but initial_symbol
  for (let rule of allRewritableToNull){
    if (rule.from !== initial_symbol){
      throw new GR_Error.GR_NonInitialToEpsilon(rule.from);
    }
  }
  //c) is initial symbol on the right side of any rule?
  for (let rule of rules){
    if (rule.to.indexOf(initial_symbol) !== -1){
      throw new GR_Error.GR_EpsilonAndInitialOnRhs();
    }
  }
}

/**
 * Function to validate core stucture of grammar. validates everything but grammar rules.
 * Checks:
 *  - non-terminal alphabet is not empty
 *  - non-terminal symbols are not empty strings and consist of allowed symbols
 *  - terminal symbols are characters and consist of allowed symbols
 *  - non-terminal and terminal symbols are unique
 *  - initial symbol is defined in non-terminal symbols
 * @param grammar Grammar to be validated
 */
function validateGrammar(grammar: GR){
  //non-terminal alphabet must not be empty
  if (grammar.nonterminal_alphabet.length === 0) {
    throw new GR_Error.GR_NonTerminalsEmpty();
  }
  //non-terminal symbols must consist only of allowed symbols
  for (let symbol of grammar.nonterminal_alphabet){
    if (symbol.length < 1){
      throw new GR_Error.GR_NonTerminalZeroLength();
    }
    for (let i = 0; i < symbol.length ; i++){
      if (!allowedSymbols.has(symbol.charAt(i))){
        throw new GR_Error.GR_NotAllowedChar("non-terminal alphabet", symbol);
      }
    }
  }
  //terminal symbols must consist only of one allowed character
  for (let symbol of grammar.terminal_alphabet){
    if (symbol.length !== 1){
      throw new GR_Error.GR_TerminalNotChar(symbol);
    }
    if (!allowedSymbols.has(symbol)){
      throw new GR_Error.GR_NotAllowedChar("terminal alphabet", symbol);
    }
  }
  //each terminal and non-terminal symbol name must be unique
  const symbol_array : string[] = grammar.nonterminal_alphabet.concat(grammar.terminal_alphabet);
  for (let symbol of symbol_array){
    const res : number = symbol_array.filter(element => element === symbol).length;
    if (res !== 1){
      throw new GR_Error.GR_NotUniqueNames(symbol);
    }
  }
  //initial symbol must be defined in non-terminal symbols
  if (grammar.nonterminal_alphabet.indexOf(grammar.initial_symbol) === -1){
    throw new GR_Error.GR_InitialSymbolNotDefined(grammar.initial_symbol);
  }
}

/**
 * Function to validate context-free grammar. Validates it's core strucure and it's rules structure.
 * @param grammar Context-free grammar (CFG) to be validated
 */
export function validateCFG(grammar: CFG) : boolean{
  //check basic structure of grammar
  validateGrammar(grammar);
  //check rules
  contextFreeRulesCheck(grammar.rules, grammar.nonterminal_alphabet, grammar.terminal_alphabet);
  return true;
}

/**
 * Function to validate (right) regular grammar. Validates it's core strucure and it's rules structure and correct usage of epsilon.
 * @param grammar Right regular grammar (RRG) to be validated
 */
export function validateRRG(grammar: RRG) : boolean{
  //check basic structure of grammar
  validateGrammar(grammar);
  //check rules
  regularRulesCheck(grammar.rules, grammar.nonterminal_alphabet, grammar.terminal_alphabet);
  //check epsilon
  epsilonCheck(grammar.rules, grammar.initial_symbol);
  return true;
}

/**
 * Function to validate grammar in CNF. Validates it's core strucure and it's rules structure and correct usage of epsilon.
 * @param grammar Grammar in CNF (CNF) to be validated
 */
export function validateCNF(grammar: CNF) : boolean {
  //check basic structure of grammar
  validateGrammar(grammar);
  //check rules
  chomskyRulesCheck(grammar.rules, grammar.nonterminal_alphabet, grammar.terminal_alphabet);
  //check epsilon
  epsilonCheck(grammar.rules, grammar.initial_symbol);
  return true;
}