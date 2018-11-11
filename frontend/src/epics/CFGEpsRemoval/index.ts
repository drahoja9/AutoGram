//#region imports
import 'rxjs';
import { Observable } from 'rxjs';
import { isActionOf } from 'typesafe-actions';
import { Epic } from 'redux-observable';

import { RootAction } from 'actions';
import { RootState } from 'reducers';
import * as CFGEpsRemoveApi from 'API/CFGEpsRemoval';
import * as CFGEpsRemoveActions from 'actions/CFGEpsRemoval';
//#endregion

export const CFGEpsRemoveEpic: Epic<RootAction, RootState> = (action$) => (
  action$.filter(isActionOf(CFGEpsRemoveActions.CFGEpsRemove.request))
    .switchMap(action =>
      CFGEpsRemoveApi.CFGEpsRemove(action.payload)
        .takeUntil(action$.filter(isActionOf(CFGEpsRemoveActions.CFGEpsRemove.cancel)))
        .map(res => CFGEpsRemoveActions.CFGEpsRemove.success(res.response))
        .catch(error => Observable.of(CFGEpsRemoveActions.CFGEpsRemove.fail(error)))
    )
);