//#region imports
import { Dispatch } from 'react-redux';
import { RootState } from 'reducers';
import { CFGreduce } from 'actions/CFGreduction';
import { CFG } from 'lib/types';

//#endregion

export const mapStateToProps = (state: RootState) => ({ meta: state.CFGreduce.meta });

export const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onSubmit: (data: CFG) => dispatch(CFGreduce.request(data)),
  onCancel: () => dispatch(CFGreduce.cancel())
});