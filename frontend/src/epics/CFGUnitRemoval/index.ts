//#region imports
import 'rxjs';
import { Observable } from 'rxjs';
import { isActionOf } from 'typesafe-actions';
import { Epic } from 'redux-observable';

import { RootAction } from 'actions';
import { RootState } from 'reducers';
import * as CFGUnitRemoveApi from 'API/CFGUnitRemoval';
import * as CFGUnitRemoveActions from 'actions/CFGUnitRemoval';
//#endregion

export const CFGUnitRemoveEpic: Epic<RootAction, RootState> = (action$) => (
  action$.filter(isActionOf(CFGUnitRemoveActions.CFGUnitRemove.request))
    .switchMap(action =>
      CFGUnitRemoveApi.CFGUnitRemove(action.payload)
        .takeUntil(action$.filter(isActionOf(CFGUnitRemoveActions.CFGUnitRemove.cancel)))
        .map(res => CFGUnitRemoveActions.CFGUnitRemove.success(res.response))
        .catch(error => Observable.of(CFGUnitRemoveActions.CFGUnitRemove.fail(error)))
    )
);