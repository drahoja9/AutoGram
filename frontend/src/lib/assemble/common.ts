

export function trimWhitespace(input: string){
  let result = '';
  let whiteSpace = [' ', '\t', '\n'];
  for (const char of input) {
    if (whiteSpace.indexOf(char) === -1) {
      result += char;
    }
  }
  return result;
}