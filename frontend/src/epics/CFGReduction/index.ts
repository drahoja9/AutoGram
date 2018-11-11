//#region imports
import 'rxjs';
import { Observable } from 'rxjs';
import { isActionOf } from 'typesafe-actions';
import { Epic } from 'redux-observable';

import { RootAction } from 'actions';
import { RootState } from 'reducers';
import * as CFGReduceApi from 'API/CFGReduction';
import * as CFGReduceActions from 'actions/CFGReduction';
//#endregion

export const CFGReduceEpic: Epic<RootAction, RootState> = (action$) => (
  action$.filter(isActionOf(CFGReduceActions.CFGReduce.request))
    .switchMap(action =>
      CFGReduceApi.CFGReduce(action.payload)
        .takeUntil(action$.filter(isActionOf(CFGReduceActions.CFGReduce.cancel)))
        .map(res => CFGReduceActions.CFGReduce.success(res.response))
        .catch(error => Observable.of(CFGReduceActions.CFGReduce.fail(error)))
    )
);