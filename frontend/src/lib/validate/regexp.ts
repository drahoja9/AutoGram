//#region imports
import { RENode, NodeType } from 'lib/types';
import { Concat, Iter, Alter, Term, Epsilon, EmptySymbol } from 'lib/types';
import { RE } from 'lib/types';
import { allowedSymbols } from 'lib/validate';
import { RegexpExceptions as RE_Error } from 'lib/validate';
//#endregion

/**
 * Function to validate concatenation node.
 * Checks if it has at least two child nodes and then calls validation on each of the child nodes.
 * @param node Node to be validated
 * @param alphabet Regexp alphabet
 */
function validateConcat(node : Concat, alphabet: string[]) {
  //concatenation length must not be 0
  if (node.value.length < 2){
    throw new RE_Error.NotEnoughChildNodes("concatenation");
  }
  //check all children nodes
  for (let child of node.value){
    validateNode(child, alphabet);
  }
}

/**
 * Function to validate alternation node.
 * Checks if it has at least two child nodes and then calls validation on each of the child nodes.
 * @param node Node to be validated
 * @param alphabet Regexp alphabet
 */
function validateAlter(node : Alter, alphabet: string[]) {
  //alternation length must not be 0
  if (node.value.length < 2){
    throw new RE_Error.NotEnoughChildNodes("alternation");
  } 
  //check all children nodes
  for (let child of node.value){
    validateNode(child, alphabet);
  }
}

/**
 * Function to validate iteration node.
 * It calls validation on the child node.
 * @param node Node to be validated
 * @param alphabet Regexp alphabet
 */
function validateIter(node : Iter, alphabet: string[]) {
  //check children node
  validateNode(node.value, alphabet);
}

/**
 * Function to validate term node.
 * Checks if term's value is a symbol from alphabet.
 * @param node Node to be validated
 * @param alphabet Regexp alphabet
 */
function validateTerm(node : Term, alphabet: string[]) {
  //value must be in alphabet
  if (alphabet.indexOf(node.value) === -1){
    throw new RE_Error.TermNotInAlphabet(node.value);
  }
}

/**
 * Function to validate epsilon node.
 * @param node Node to be validated
 * @param alphabet Regexp alphabet
 */
function validateEpsilon(node : Epsilon, alphabet: string[]) {}

/**
 * Function to validate empty symbol node.
 * @param node Node to be validated
 * @param alphabet Regexp alphabet
 */
function validateEmpty(node : EmptySymbol, alphabet: string[]) {}

/**
 * Function to distinguish between node types and call correct validation method.
 * @param node Node to be validated
 * @param alphabet Regexp alphabet
 */
function validateNode(node : RENode, alphabet: string[]){
  switch (node.type){
    case NodeType.Concat:
      return validateConcat(node as Concat, alphabet);
    case NodeType.Alter:
      return validateAlter(node as Alter, alphabet);
    case NodeType.Iter:
      return validateIter(node as Iter, alphabet);
    case NodeType.Term:
      return validateTerm(node as Term, alphabet);
    case NodeType.Epsilon:
      return validateEpsilon(node as Epsilon, alphabet);
    case NodeType.EmptySymbol:
      return validateEmpty(node as EmptySymbol, alphabet);
  }
}

/**
 * Function to validate core structure of the regular expression (it's alphabet).
 * Does NOT validate regexp's value.
 * @description Checks:
 *  - alphabet symbols are characters
 *  - alphabet symbols are from allowedSymbols
 *  - alphabet symbols are unique
 * @param regexp Regexp to be validated
 */
function validateRegexp(regexp: RE){
  //validate alphabet
  for (let symbol of regexp.alphabet){
    //alphabet symbols must be only characters
    if (symbol.length !== 1){
      throw new RE_Error.AlphabetNotChar(symbol);
    }
    //alphabet symbols must consist only of allowed characters
    if (!allowedSymbols.has(symbol)){
      throw new RE_Error.NotAllowedChar(symbol);
    }
    //alphabet symbols must be unique
    if (regexp.alphabet.filter(element => element === symbol).length !== 1){
      throw new RE_Error.NotUniqueNames(symbol);
    }
  }
}

/**
 * Function to validate unbounded regular expression.
 * Checks it's alphabet strusture and it's value structure.
 * @param regexp Regexp to be validated
 */
export function validateRE(regexp: RE) : boolean {
  //check basic structure
  validateRegexp(regexp);
  //validate nodes
  validateNode(regexp.value, regexp.alphabet);
  return true;
}