//#region imports
import { createStore, applyMiddleware, Store } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from 'epics';
import { rootReducer, RootState } from 'reducers';
//#endregion

const epicMiddleware = createEpicMiddleware(rootEpic);

export default function(): Store<RootState> {
  return createStore<RootState>(
    rootReducer,
    applyMiddleware(epicMiddleware)
  );
}
