//#region imports
import { combineEpics } from 'redux-observable';
import { compareEpic } from './comparison'
//#endregion

/**
 * Application root epic.
 */
export const rootEpic = combineEpics(
  compareEpic
);
