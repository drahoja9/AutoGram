//#region imports
import { combineEpics } from 'redux-observable';
import { compareEpic } from './comparison';
import { transformEpic } from './transformation';
//#endregion

/**
 * Application root epic.
 */
export const rootEpic = combineEpics(
  compareEpic,
  transformEpic
);
