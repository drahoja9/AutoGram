//#region imports
import { Dispatch } from 'react-redux';
import { RootState } from 'reducers';
import { epsremove } from 'actions/epsremoval';
import { ENFA } from 'lib/types';

//#endregion

export const mapStateToProps = (state: RootState) => ({ meta: state.epsremove.meta });

export const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onSubmit: (data: ENFA) => dispatch(epsremove.request(data)),
  onCancel: () => dispatch(epsremove.cancel())
});