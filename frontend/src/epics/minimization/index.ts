//#region imports
import 'rxjs';
import { Observable } from 'rxjs';
import { isActionOf } from 'typesafe-actions';
import { Epic } from 'redux-observable';

import { RootAction } from 'actions';
import { RootState } from 'reducers';
import * as minimizeApi from 'API/minimization';
import * as minimizeActions from 'actions/minimization';
//#endregion

export const minimizeEpic: Epic<RootAction, RootState> = (action$) => (
  action$.filter(isActionOf(minimizeActions.minimize.request))
    .switchMap(action =>
      minimizeApi.minimize(action.payload)
        .takeUntil(action$.filter(isActionOf(minimizeActions.minimize.cancel)))
        .map(res => minimizeActions.minimize.success(res.response))
        .catch(error => Observable.of(minimizeActions.minimize.fail(error)))
    )
);