//#region imports
import {CFG, GR, RRG, CNF} from 'lib/types'
import {allowedSymbols} from 'lib/validate'
//#endregion

function contextFreeRulesCheck(rules: Array<any>, nonterminal_alphabet: Array<string>, terminal_alphabet: Array<string>){
  /** each rule's left side must be one non-terminal character */
  /** each rule's right side must not be empty and must consist of array of combinantion of terminal and nonterminal symbols or of only null */
  var symbol_array : Array<string> = nonterminal_alphabet.concat(terminal_alphabet)
  rules.forEach(rule => {
    if (nonterminal_alphabet.indexOf(rule.from) === -1){
      throw new TypeError("Left side of rule must consist of one non-terminal symbol")
    }
    if (rule.to.length === 0){
      throw new TypeError("Right side of rule must consist of at least one symbol")
    }
    if (rule.to.length === 1 && rule.to[0] === null){
      return
    } else {
      rule.to.forEach((element: any) => {
        if (symbol_array.indexOf(element) === -1){
          console.log(rule)
          throw new TypeError("Right side of rule must consist of defined non-terminal and terminal symbols or of null")
        }
      })
    }
  })
}

function regularRulesCheck(rules: Array<any>, nonterminal_alphabet: Array<string>, terminal_alphabet: Array<string>){
  /** each rule's left side must be one non-terminal character */
  /** each rule's right side must be either one terminal character or one terminal and one nonterminal character */
  rules.forEach(rule => {
    if (nonterminal_alphabet.indexOf(rule.from) === -1){
      throw new TypeError("Left side of rule must consist of one non-terminal symbol")
    }
    if (rule.to.length === 1 && rule.to[0] === null){
      return
    }
    var type_one : boolean = (rule.to.length === 1 && terminal_alphabet.indexOf(rule.to[0]) !== -1)
    var type_two : boolean = (rule.to.length === 2 && terminal_alphabet.indexOf(rule.to[0]) !== -1
                              && nonterminal_alphabet.indexOf(rule.to[1]) !== -1)
    if (!type_one && !type_two){
      throw new TypeError("Right side of rule must consist of one terminal symbol or one terminal and one non-terminal symbol")
    }
  })
}

function chomskyRulesCheck(rules: Array<any>, nonterminal_alphabet: Array<string>, terminal_alphabet: Array<string>){
  /** each rule's left side must be one non-terminal character */
  /** each rule's right side must be either one terminal character or two nonterminal characters */
  rules.forEach(rule => {
    if (nonterminal_alphabet.indexOf(rule.from) === -1){
      throw new TypeError("Left side of rule must consist of one non-terminal symbol")
    }
    if (rule.to.length === 1 && rule.to[0] === null){
      return
    }
    var type_one : boolean = (rule.to.length === 1 && terminal_alphabet.indexOf(rule.to[0]) !== -1)
    var type_two : boolean = (rule.to.length === 2 && nonterminal_alphabet.indexOf(rule.to[0]) !== -1
                              && nonterminal_alphabet.indexOf(rule.to[1]) !== -1)
    if (!type_one && !type_two){
      throw new TypeError("Right side of rule must consist of one terminal symbol or two non-terminal symbols")
    }
  })
}

function epsilonCheck(rules: Array<any>, initial_symbol: string){
  /** if it is possible to rewrite initial symbol to epsilon, then initial symbol must not be on right side of any rule */
  /** a) can any nonterminal be rewritten to epsilon? */
  var allRewritableToNull : Array<any> = rules.filter(rule => rule.to.length === 1 && rule.to[0] === null)
  if (allRewritableToNull.length === 0){
    return
  }
  /** b) epsilon must not be anywhere else, but initial_symbol */
  allRewritableToNull.forEach( rule => {
    if (rule.from !== initial_symbol){
      throw new TypeError("Only initial symbol can be rewritten to epsilon")
    }
  })
  /** b) is initial symbol on the right side of any rule? */
  rules.forEach(rule => {
    if (rule.to.indexOf(initial_symbol) !== -1){
      throw new TypeError("If it is possible to rewrite initial symbol to epsilon,then it must not be present on the right side of any rule")
    }
  })
}

function validateGrammar(grammar: GR){
  /** non-terminal alphabet must not be empty */
  if (grammar.nonterminal_alphabet.length === 0) {
    throw new TypeError("Grammar must have at least one non-terminal symbol")
  }
  /** non-terminal symbols must consist only of allowed symbols */
  grammar.nonterminal_alphabet.forEach(symbol => {
    if (symbol.length < 1){
      throw new TypeError("Non-terminal symbols must consist of one character at least")
    }
    for (var i = 0; i < symbol.length ; i++){
      if (allowedSymbols.indexOf(symbol.charAt(i)) === -1){
        throw new TypeError("Non-terminal symbols must consist of allowed characters only")
      }
    }
  })
  /** terminal symbols must consist only of one allowed character */
  grammar.terminal_alphabet.forEach(symbol => {
    if (symbol.length !== 1){
      throw new TypeError("Terminal symbols must be characters")
    }
    if (allowedSymbols.indexOf(symbol) === -1){
      throw new TypeError("Terminal symbol must consist of allowed characters only")
    }
  })
  /** each terminal and non-terminal symbol name must be unique */
  var symbol_array : Array<string> = grammar.nonterminal_alphabet.concat(grammar.terminal_alphabet)
  symbol_array.forEach(symbol => {
    var res : number = symbol_array.filter(element => element === symbol).length
    if (res !== 1){
      throw new TypeError("Each non-terminal and terminal symbol must be unique")
    }
  })
  /** initial symbol must be defined in non-terminal symbols */
  if (grammar.nonterminal_alphabet.indexOf(grammar.initial_symbol) === -1){
    throw new TypeError("Initial symbol must be defined in non-terminal alphabet")
  }
}

export function validateCFG(grammar: CFG) : boolean{
  /** check basic structure of grammar */
  validateGrammar(grammar)
  /** check rules */
  contextFreeRulesCheck(grammar.rules, grammar.nonterminal_alphabet, grammar.terminal_alphabet)
  return true
}

export function validateRRG(grammar: RRG) : boolean{
  /** check basic structure of grammar */
  validateGrammar(grammar)
  /** check rules */
  regularRulesCheck(grammar.rules, grammar.nonterminal_alphabet, grammar.terminal_alphabet)
  /** check epsilon */
  epsilonCheck(grammar.rules, grammar.initial_symbol)
  return true
}

export function validateCNF(grammar: CNF) : boolean {
  /** check basic structure of grammar */
  validateGrammar(grammar)
  /** check rules */
  chomskyRulesCheck(grammar.rules, grammar.nonterminal_alphabet, grammar.terminal_alphabet)
  /** check epsilon */
  epsilonCheck(grammar.rules, grammar.initial_symbol)
  return true
}