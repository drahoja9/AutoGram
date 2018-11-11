//#region imports
import 'rxjs';
import { Observable } from 'rxjs';
import { isActionOf } from 'typesafe-actions';
import { Epic } from 'redux-observable';

import { RootAction } from 'actions';
import { RootState } from 'reducers';
import * as cnfactionApi from 'API/cnf';
import * as cnfactionActions from 'actions/cnf';
//#endregion

export const cnfactionEpic: Epic<RootAction, RootState> = (action$) => (
  action$.filter(isActionOf(cnfactionActions.cnfaction.request))
    .switchMap(action =>
      cnfactionApi.cnfaction(action.payload)
        .takeUntil(action$.filter(isActionOf(cnfactionActions.cnfaction.cancel)))
        .map(res => cnfactionActions.cnfaction.success(res.response))
        .catch(error => Observable.of(cnfactionActions.cnfaction.fail(error)))
    )
);