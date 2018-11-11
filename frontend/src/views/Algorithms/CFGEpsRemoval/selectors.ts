//#region imports
import { Dispatch } from 'react-redux';
import { RootState } from 'reducers';
import { CFGEpsRemove } from 'actions/CFGEpsRemoval';
import { CFGEpsRemovalRequest } from 'lib/types';

//#endregion

export const mapStateToProps = (state: RootState) => ({ meta: state.CFGEpsRemove.meta });

export const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onSubmit: (data: CFGEpsRemovalRequest) => dispatch(CFGEpsRemove.request(data)),
  onCancel: () => dispatch(CFGEpsRemove.cancel())
});