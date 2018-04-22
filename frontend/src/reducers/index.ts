//#region imports
import { combineReducers } from 'redux';
//#endregion

/**
 * Application root state.
 *
 * This is an object representing a whole application state
 * which is managed by Redux.
 */
export interface RootState { }

/**
 * Application root reducer.
 */
export const rootReducer = combineReducers<RootState>({});
