//#region imports
import 'rxjs';
import { Observable } from 'rxjs';
import { isActionOf } from 'typesafe-actions';
import { Epic } from 'redux-observable';

import { RootAction } from 'actions';
import { RootState } from 'reducers';
import * as derivateApi from 'API/Derivation';
import * as derivateActions from 'actions/derivation';
//#endregion

export const derivateEpic: Epic<RootAction, RootState> = (action$) => (
  action$.filter(isActionOf(derivateActions.derivate.request))
    .switchMap(action =>
      derivateApi.derivate(action.payload)
        .takeUntil(action$.filter(isActionOf(derivateActions.derivate.cancel)))
        .map(res => derivateActions.derivate.success(res.response))
        .catch(error => Observable.of(derivateActions.derivate.fail(error)))
    )
);