//#region imports
import 'rxjs';
import { Observable } from 'rxjs'
import { isActionOf } from 'typesafe-actions';
import {
  Epic
} from 'redux-observable';

import { RootAction } from 'actions';
import { RootState } from 'reducers';
import * as compareApi from 'API/Comparison';
import * as compareActions from 'actions/comparison';
//#endregion;

export const compareEpic: Epic<RootAction, RootState> = (action$) => (
  action$.filter(isActionOf(compareActions.compare.request))
  .switchMap(action =>
    compareApi.compare(action.payload)
    .takeUntil(action$.filter(isActionOf(compareActions.compare.cancel)))
    .map(res => compareActions.compare.success(res.response))
    .catch(error => Observable.of(compareActions.compare.fail(error)))
  )
);
