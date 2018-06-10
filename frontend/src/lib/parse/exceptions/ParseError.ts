/**
 * Custom parse base error class, that all parse error must derive from.
 *
 * @description All parse errors must inherit from the `ParseError` while providing
 *  a error message, describing what caused a problem with maybe a advice, how to fix it.
 *  All error messages must be presentable to the application user.
 */
export class ParseError extends Error {
  /**
   * A fixit should be a string containing a advice to the user, how they can fix
   * the cause the error.
   */
  private fixits: string[] = [];

  constructor() {
    super();
    Object.setPrototypeOf(this, ParseError.prototype);
  }

  /**
   * A description of the error.
   *
   * @description This message contains a description of the error itself. This method
   * should be customize description in the derived classes. To get fully descriptive
   * message presentable to the user, @see `message`.
   */
  public get description(): string {
    return 'Error occurred during parsing.';
  }

  /**
   * A descriptive error message, which can be presented to the user.
   *
   * @description This message contains full description of the error, which includes
   * fixits aswell. Derived class that overrides this property takes responsibility
   * for providing and formatting of the fixits, that correspond to the instance
   * of the error class.
   * The property that contains a raw description of the error, @see `description`.
   */
  public get message(): string {
    const message = this.description;
    if (this.fixits.length !== 0) {
      return message + ' ' + this.fixits.join(' ');
    } else {
      return message;
    }
  }

  /**
   * Add a fixit to the error.
   * @param fixit A fixit message, that sould be added to the error.
   * @return The instance itself allowing addition of multiple fixit in chaining fashion.
   *
   * @code
   * ```javascript
       new ParseError('SomeError')
         .addFixit('This is a first fixit added to the error')
         .addFixit('This is a second fixit added to the error');
     ```
   */
  public addFixit(fixit: string): ParseError {
    this.fixits.push(fixit);
    return this;
  }
}
