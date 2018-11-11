//#region imports
import { Dispatch } from 'react-redux';
import { RootState } from 'reducers';
import { CFGReduce } from 'actions/CFGReduction';
import { CFGReductionRequest } from 'lib/types';

//#endregion

export const mapStateToProps = (state: RootState) => ({ meta: state.CFGReduce.meta });

export const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onSubmit: (data: CFGReductionRequest) => dispatch(CFGReduce.request(data)),
  onCancel: () => dispatch(CFGReduce.cancel())
});