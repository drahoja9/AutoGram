//#region imports
import 'rxjs';
import { Observable } from 'rxjs';
import { isActionOf } from 'typesafe-actions';
import { Epic } from 'redux-observable';

import { RootAction } from 'actions';
import { RootState } from 'reducers';
import * as epsremoveApi from 'API/epsremoval';
import * as epsremoveActions from 'actions/epsremoval';
//#endregion

export const epsremoveEpic: Epic<RootAction, RootState> = (action$) => (
  action$.filter(isActionOf(epsremoveActions.epsremove.request))
    .switchMap(action =>
      epsremoveApi.epsremove(action.payload)
        .takeUntil(action$.filter(isActionOf(epsremoveActions.epsremove.cancel)))
        .map(res => epsremoveActions.epsremove.success(res.response))
        .catch(error => Observable.of(epsremoveActions.epsremove.fail(error)))
    )
);