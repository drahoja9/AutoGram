//#region imports
import 'rxjs';
import { Observable } from 'rxjs';
import { isActionOf } from 'typesafe-actions';
import { Epic } from 'redux-observable';

import { RootAction } from 'actions';
import { RootState } from 'reducers';
import * as leftrecremoveApi from 'API/leftrecremoval';
import * as leftrecremoveActions from 'actions/leftrecremoval';
//#endregion

export const leftrecremoveEpic: Epic<RootAction, RootState> = (action$) => (
  action$.filter(isActionOf(leftrecremoveActions.leftrecremove.request))
    .switchMap(action =>
      leftrecremoveApi.leftrecremove(action.payload)
        .takeUntil(action$.filter(isActionOf(leftrecremoveActions.leftrecremove.cancel)))
        .map(res => leftrecremoveActions.leftrecremove.success(res.response))
        .catch(error => Observable.of(leftrecremoveActions.leftrecremove.fail(error)))
    )
);