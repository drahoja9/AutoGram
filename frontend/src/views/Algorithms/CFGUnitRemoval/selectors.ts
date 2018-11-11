//#region imports
import { Dispatch } from 'react-redux';
import { RootState } from 'reducers';
import { CFGUnitRemove } from 'actions/CFGUnitRemoval';
import { CFGUnitRemovalRequest } from 'lib/types';

//#endregion

export const mapStateToProps = (state: RootState) => ({ meta: state.CFGUnitRemove.meta });

export const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onSubmit: (data: CFGUnitRemovalRequest) => dispatch(CFGUnitRemove.request(data)),
  onCancel: () => dispatch(CFGUnitRemove.cancel())
});