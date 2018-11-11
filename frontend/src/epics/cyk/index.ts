//#region imports
import 'rxjs';
import { Observable } from 'rxjs';
import { isActionOf } from 'typesafe-actions';
import { Epic } from 'redux-observable';

import { RootAction } from 'actions';
import { RootState } from 'reducers';
import * as cykactionApi from 'API/cyk';
import * as cykactionActions from 'actions/cyk';
//#endregion

export const cykactionEpic: Epic<RootAction, RootState> = (action$) => (
  action$.filter(isActionOf(cykactionActions.cykaction.request))
    .switchMap(action =>
      cykactionApi.cykaction(action.payload)
        .takeUntil(action$.filter(isActionOf(cykactionActions.cykaction.cancel)))
        .map(res => cykactionActions.cykaction.success(res.response))
        .catch(error => Observable.of(cykactionActions.cykaction.fail(error)))
    )
);