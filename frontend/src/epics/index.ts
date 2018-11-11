//#region imports
import { combineEpics } from 'redux-observable';
import { compareEpic } from './comparison';
import { transformEpic } from './transformation';
import { determinizeEpic } from './determinization';
import { minimizeEpic } from './minimization';
import { derivateEpic } from './derivation';
import { epsremoveEpic } from './epsremoval';
import { cnfactionEpic } from './cnf';
import { leftrecremoveEpic } from './leftrecremoval';
import { cykactionEpic } from './cyk';

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
  cnfactionEpic,
  leftrecremoveEpic,
  cykactionEpic
);
