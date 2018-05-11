export class ValidationError extends Error{

  constructor(){
    super()
    Object.setPrototypeOf(this, ValidationError.prototype)
  }

  public getMessage() : string {
    return "Error occurred during validation."
  }
}