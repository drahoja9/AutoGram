//#region imports
import 'rxjs';
import { Observable } from 'rxjs';
import { isActionOf } from 'typesafe-actions';
import { Epic } from 'redux-observable';

import { RootAction } from 'actions';
import { RootState } from 'reducers';
import * as determinizeApi from 'API/determinization';
import * as determinizeActions from 'actions/determinization';
//#endregion

export const determinizeEpic: Epic<RootAction, RootState> = (action$) => (
  action$.filter(isActionOf(determinizeActions.determinize.request))
    .switchMap(action =>
      determinizeApi.determinize(action.payload)
        .takeUntil(action$.filter(isActionOf(determinizeActions.determinize.cancel)))
        .map(res => determinizeActions.determinize.success(res.response))
        .catch(error => Observable.of(determinizeActions.determinize.fail(error)))
    )
);