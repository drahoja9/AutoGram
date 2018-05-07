//#region imports
import { RENode, NodeType } from 'lib/types';
import { Concat, Iter, Alter, Term, Epsilon, EmptySymbol } from 'lib/types';
import { RE } from 'lib/types';
import { allowedSymbols } from 'lib/validate'
//#endregion

function validateConcat(node : Concat, alphabet: Array<string>) {
  /** concatenation length must not be 0 */
  if (node.value.length < 2){
    throw new TypeError("Concatenation must consist of at least two nodes")
  }
  /** check all children nodes */
  node.value.forEach(node => validateNode(node, alphabet))
}

function validateAlter(node : Alter, alphabet: Array<string>) {
  /** alternation length must not be 0 */
  if (node.value.length < 2){
    throw new TypeError("Alternation must consist of at least two nodes")
  } 
  /** check all children nodes */
  node.value.forEach(child => validateNode(child, alphabet))
}

function validateIter(node : Iter, alphabet: Array<string>) {
  /** check children node */
  validateNode(node.value, alphabet)
}

function validateTerm(node : Term, alphabet: Array<string>) {
  /** value must be in alphabet */
  if (alphabet.indexOf(node.value) === -1){
    throw new TypeError("Term must be in alphabet")
  }
}

function validateEpsilon(node : Epsilon, alphabet: Array<string>) {}

function validateEmpty(node : EmptySymbol, alphabet: Array<string>) {}

function validateNode(node : RENode, alphabet: Array<string>){
  switch (node.type){
    case NodeType.Concat:
      return validateConcat(node as Concat, alphabet)
    case NodeType.Alter:
      return validateAlter(node as Alter, alphabet)
    case NodeType.Iter:
      return validateIter(node as Iter, alphabet)
    case NodeType.Term:
      return validateTerm(node as Term, alphabet)
    case NodeType.Epsilon:
      return validateEpsilon(node as Epsilon, alphabet)
    case NodeType.EmptySymbol:
      return validateEmpty(node as EmptySymbol, alphabet)
    default:
      throw new TypeError("Unknown node type")
  }
}

function validateRegexp(regexp: RE){
  /** validate alphabet */
  regexp.alphabet.forEach(symbol => {
    /** alphabet symbols must be only characters */
    if (symbol.length !== 1){
      throw new TypeError("Alphabet must consist of characters")
    }
    /** alphabet symbols must consist only of allowed characters */
    if (allowedSymbols.indexOf(symbol) === -1){
      throw new TypeError("Alphabet must consist of allowed symbols only")
    }
    /** alphabet symbols must be unique */
    if (regexp.alphabet.filter(element => element === symbol).length !== 1){
      throw new TypeError("Alphabet symbols must be unique")
    }
  })
}

export function validateRE(regexp: RE) : boolean {
  /** check basic structure */
  validateRegexp(regexp)
  /** validate nodes */
  validateNode(regexp.value, regexp.alphabet)
  return true
}