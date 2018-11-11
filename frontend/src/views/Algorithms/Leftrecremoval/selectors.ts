//#region imports
import { Dispatch } from 'react-redux';
import { RootState } from 'reducers';
import { leftrecremove } from 'actions/leftrecremoval';
import { LeftRecRemovalRequest } from 'lib/types';

//#endregion

export const mapStateToProps = (state: RootState) => ({ meta: state.leftrecremove.meta });

export const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onSubmit: (data: LeftRecRemovalRequest) => dispatch(leftrecremove.request(data)),
  onCancel: () => dispatch(leftrecremove.cancel())
});