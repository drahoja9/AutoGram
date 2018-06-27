//#region imports
import 'rxjs';
import { Observable } from 'rxjs';
import { isActionOf } from 'typesafe-actions';
import { Epic } from 'redux-observable';

import { RootAction } from 'actions';
import { RootState } from 'reducers';
import * as transformApi from 'API/Transformation';
import * as transformActions from 'actions/transformation';
//#endregion

export const transformEpic: Epic<RootAction, RootState> = (action$) => (
  action$.filter(isActionOf(transformActions.transform.request))
  .switchMap(action =>
    transformApi.transform(action.payload)
    .takeUntil(action$.filter(isActionOf(transformActions.transform.cancel)))
    .map(res => transformActions.transform.success(res.response))
    .catch(error => Observable.of(transformActions.transform.fail(error)))
  )
);