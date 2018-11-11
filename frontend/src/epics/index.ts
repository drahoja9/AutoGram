//#region imports
import { combineEpics } from 'redux-observable';
import { compareEpic } from './comparison';
import { transformEpic } from './transformation';
import { determinizeEpic } from './determinization';
import { minimizeEpic } from './minimization';
import { derivateEpic } from './derivation';
import { epsremoveEpic } from './epsremoval';
import { CFGreduceEpic } from './CFGreduction';
import { CFGEpsRemoveEpic } from './CFGEpsRemoval';
import { CFGUnitRemoveEpic } from './CFGUnitRemoval';

//#endregion

/**
 * Application root epic.
 */
export const rootEpic = combineEpics(
  compareEpic,
  transformEpic,
  determinizeEpic,
  minimizeEpic,
  derivateEpic,
  epsremoveEpic,
  CFGreduceEpic,
  CFGEpsRemoveEpic,
  CFGUnitRemoveEpic
);
