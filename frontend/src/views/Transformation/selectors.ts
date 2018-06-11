//#region imports
import { Dispatch } from 'react-redux';
import { RootState } from 'reducers';
import { transform } from 'actions/transformation';
import { TransformRequest } from 'lib/types';
//#endregion

export const mapStateToProps = (state: RootState) => ({ meta: state.transform.meta });

export const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onTransform: (data: TransformRequest) => dispatch(transform.request(data)),
  onCancelTransform: () => dispatch(transform.cancel())
});
