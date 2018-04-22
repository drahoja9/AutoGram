//#region imports
import { createStore, applyMiddleware, Store } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from 'epics';
import { rootReducer, RootState } from 'reducers';
//#endregion

// Create redux middleware from epics
const epicMiddleware = createEpicMiddleware(rootEpic);

/**
 * Creates and returns a Redux store instance.
 */
export default function(): Store<RootState> {
  return createStore(
    rootReducer,
    applyMiddleware(epicMiddleware)
  );
}

