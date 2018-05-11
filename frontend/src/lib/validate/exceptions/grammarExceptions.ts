//#region imports
import { ValidationError } from './ValidationError'
//#endregion

export class GrammarValidationError extends ValidationError {
  constructor(){
    super()
    Object.setPrototypeOf(this, GrammarValidationError.prototype)
  }
  public getMessage() : string {
    return "Error occurred during grammar validation."
  }
}

export class GR_NonTerminalsEmpty extends GrammarValidationError {
  constructor(){
    super()
    Object.setPrototypeOf(this, GR_NonTerminalsEmpty.prototype)
  }
  public getMessage() : string {
    return "Grammar must have at least one non-terminal symbol."
  }
}

export class GR_NonTerminalZeroLength extends GrammarValidationError {
  constructor(){
    super()
    Object.setPrototypeOf(this, GR_NonTerminalZeroLength.prototype)
  }
  public getMessage() : string {
    return "Non-terminal symbols must consist of at least one character."
  }
}

export class GR_NotAllowedChar extends GrammarValidationError {
  private problem: string
  private where: string
  constructor(where: string, problem: string){
    super()
    Object.setPrototypeOf(this, GR_NotAllowedChar.prototype)
    this.problem = problem
    this.where = where
  }
  public getMessage() : string {
    return "Symbol '" + this.problem + "' in " + this.where + " does not consist of allowed characters only."
  }
}

export class GR_TerminalNotChar extends GrammarValidationError {
  private problem: string
  constructor(problem: string){
    super()
    Object.setPrototypeOf(this, GR_TerminalNotChar.prototype)
    this.problem = problem
  }
  public getMessage() : string {
    return "Terminal alphabet symbols must be characters. Symbol '" + this.problem + "' is not character."
  }
}

export class GR_NotUniqueNames extends GrammarValidationError {
  private problem: string
  constructor(problem: string){
    super()
    Object.setPrototypeOf(this, GR_NotUniqueNames.prototype)
    this.problem = problem
  }
  public getMessage() : string {
    return "Each non-terminal and terminal symbol must be unique. Collision in symbol '" + this.problem + "' detected."
  }
}

export class GR_InitialSymbolNotDefined extends GrammarValidationError {
  private problem: string
  constructor(problem: string){
    super()
    Object.setPrototypeOf(this, GR_InitialSymbolNotDefined.prototype)
    this.problem = problem
  }
  public getMessage() : string {
    return "Initial symbol must be defined in non-terminal alphabet. Symbol '" + this.problem + "' is not defined."
  }
}

export class GR_RuleFromNotDefined extends GrammarValidationError {
  private problem: string
  constructor(problem: string){
    super()
    Object.setPrototypeOf(this, GR_RuleFromNotDefined.prototype)
    this.problem = problem
  }
  public getMessage() : string {
    return "Left side of grammar rule must consist of one non-terminal symbol. Symbol '" + this.problem + "' is not defined."
  }
}

export class GR_CFGRuleToZeroLength extends GrammarValidationError {
  constructor(){
    super()
    Object.setPrototypeOf(this, GR_CFGRuleToZeroLength.prototype)
  }
  public getMessage() : string {
    return "Right side of grammar rule must consist of at least one symbol or epsilon."
  }
}

export class GR_CFGRuleToNotDefined extends GrammarValidationError {
  private problem: string
  private from: string
  private to: string[]
  constructor(from: string, to: string[], problem: string){
    super()
    Object.setPrototypeOf(this, GR_CFGRuleToNotDefined.prototype)
    this.problem = problem
    this.from = from
    this.to = to
  }
  public getMessage() : string {
    let toStr : string = ""
    for (let symbol of this.to){
      toStr += symbol
    }
    return "Right side of grammar rule must consist of defined non-terminal and terminal symbols. Symbol '" + this.problem + "' in rule '" + this.from + " -> " + toStr + "' is not defined."
  }
}

export class GR_RGRuleToInvalid extends GrammarValidationError {
  private from: string
  private to: string[]
  constructor(from: string, to: string[]){
    super()
    Object.setPrototypeOf(this, GR_RGRuleToInvalid.prototype)
    this.from = from
    this.to = to
  }
  public getMessage() : string {
    let toStr : string = ""
    for (let symbol of this.to){
      toStr += symbol
    }
    return "Right side of regular grammar rule must consist of either terminal or terminal and non-terminal symbol. Rule '" + this.from + " -> " + toStr + "' is not valid."
  }
}

export class GR_CNFRuleToInvalid extends GrammarValidationError {
  private from: string
  private to: string[]
  constructor(from: string, to: string[]){
    super()
    Object.setPrototypeOf(this, GR_CNFRuleToInvalid.prototype)
    this.from = from
    this.to = to
  }
  public getMessage() : string {
    let toStr : string = ""
    for (let symbol of this.to){
      toStr += symbol
    }
    return "Right side of CNF grammar rule must consist of either terminal or two non-terminal symbols. Rule '" + this.from + " -> " + toStr + "' is not valid."
  }
}

export class GR_NonInitialToEpsilon extends GrammarValidationError {
  private problem: string
  constructor(problem: string){
    super()
    Object.setPrototypeOf(this, GR_NonInitialToEpsilon.prototype)
    this.problem = problem
  }
  public getMessage() : string {
    return "Only initial symbol can be rewritten to epsilon. Symbol '" + this.problem + "' was not declared as initial."
  }
}

export class GR_EpsilonAndInitialOnRhs extends GrammarValidationError {
  constructor(){
    super()
    Object.setPrototypeOf(this, GR_EpsilonAndInitialOnRhs.prototype)
  }
  public getMessage() : string {
    return "If it is possible to rewrite initial symbol to epsilon, then it must not be present on the right side of any rule."
  }
}
