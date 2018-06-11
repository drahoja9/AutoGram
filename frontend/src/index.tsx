//#region imports
import './styles/index.less'
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

import App from './views';
import configureStore from './configureStore';
//#endregion

import {regexpToString} from "./lib"
//import { RE, REType, NodeType } from 'lib/types'
import { Parser } from 'lib/parse/regexp';

const p = new Parser('((((((((a)*)*)*)*)*)*)*)*');
const re = p.parse();

/*var re : RE = {
  type: REType.Unbounded,
  alphabet: ["a", "b", "c"],
  value: {
    type: NodeType.Alter,
    value: [S
      {type: NodeType.Alter,
      value: [
        {type: NodeType.Iter, value: {type: NodeType.Concat, value: [{type: NodeType.Term, value: "A"}, {type: NodeType.Term, value: "B"}]}},
        {type: NodeType.Epsilon},
        {type: NodeType.EmptySymbol}
      ]},
      {type: NodeType.Term, value: "X"}
    ]
    
  }
}*/

console.log(regexpToString(re));


const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
