//#region imports
import { combineEpics } from 'redux-observable';
import { compareEpic } from './comparison';
import { transformEpic } from './transformation';
import { determinizeEpic } from './determinization';
import { derivateEpic } from './derivation';
import { minimizeEpic } from './minimization';
//#endregion

/**
 * Application root epic.
 */
export const rootEpic = combineEpics(
  compareEpic,
  transformEpic,
  determinizeEpic,
  derivateEpic,
  minimizeEpic
);
