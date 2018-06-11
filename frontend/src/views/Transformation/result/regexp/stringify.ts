//#region imports
import { RE, NodeType, RENode, Alter, Iter, Concat } from 'lib/types';
//#endregion

function alterToString(node: Alter, outer: boolean) : string {
  let res : string = '';
  let first: boolean = true;

  if (!outer) {
    res += '('
  }

  for (let child of node.value){
    if (first){
      first = false;
    } else {
      res += '+'
    }
    res += nodeToString(child);
  }

  if (!outer) {
    res += ')'
  }

  return res;
}

function concatToString(node: Concat) : string {
  let res : string = '';

  for (let child of node.value){
    res += nodeToString(child);
  }

  return res;
}

function iterToString(node: Iter) : string {
  let res : string = ''
  if (node.value.type === NodeType.Concat || node.value.type === NodeType.Iter) {
    res += '('
  }
  res += nodeToString(node.value);
  if (node.value.type === NodeType.Concat || node.value.type === NodeType.Iter) {
    res += ')'
  }
  res += '*';
  return res;
}

function nodeToString (node: RENode, outer: boolean = false) : string {
  switch(node.type){
    case NodeType.Alter:
      return alterToString(node, outer);
    case NodeType.Concat:
      return concatToString(node);
    case NodeType.Iter:
      return iterToString(node);
    case NodeType.Term:
      return node.value;
    case NodeType.Epsilon:
      return 'ε'
    case NodeType.EmptySymbol:
      return '∅'
  }
}

export function regexpToString (regexp: RE) {
  return nodeToString(regexp.value, true);
}
