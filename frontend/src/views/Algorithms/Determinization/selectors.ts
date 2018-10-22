//#region imports
import { Dispatch } from 'react-redux';
import { RootState } from 'reducers';
import { determinize } from 'actions/determinization';
import { NFA } from 'lib/types';

//#endregion

export const mapStateToProps = (state: RootState) => ({ meta: state.transform.meta });

export const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onSubmit: (data: NFA) => dispatch(determinize.request(data)),
  onCancel: () => dispatch(determinize.cancel())
});