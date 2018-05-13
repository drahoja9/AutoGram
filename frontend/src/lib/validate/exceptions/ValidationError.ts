/** 
 * Base error class derived from standard Error. 
 * Supprorts method getMessage() to get description of the error in user-presentable form.
*/
export class ValidationError extends Error{
  constructor(){
    super();
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
  public getMessage() : string {
    return "Error occurred during validation.";
  }
}