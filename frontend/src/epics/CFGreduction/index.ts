//#region imports
import 'rxjs';
import { Observable } from 'rxjs';
import { isActionOf } from 'typesafe-actions';
import { Epic } from 'redux-observable';

import { RootAction } from 'actions';
import { RootState } from 'reducers';
import * as CFGreduceApi from 'API/CFGreduction';
import * as CFGreduceActions from 'actions/CFGreduction';
//#endregion

export const CFGreduceEpic: Epic<RootAction, RootState> = (action$) => (
  action$.filter(isActionOf(CFGreduceActions.CFGreduce.request))
    .switchMap(action =>
      CFGreduceApi.CFGreduce(action.payload)
        .takeUntil(action$.filter(isActionOf(CFGreduceActions.CFGreduce.cancel)))
        .map(res => CFGreduceActions.CFGreduce.success(res.response))
        .catch(error => Observable.of(CFGreduceActions.CFGreduce.fail(error)))
    )
);