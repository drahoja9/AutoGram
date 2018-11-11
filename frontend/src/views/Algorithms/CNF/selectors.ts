//#region imports
import { Dispatch } from 'react-redux';
import { RootState } from 'reducers';
import { cnfaction } from 'actions/cnf';
import { CNFRequest } from 'lib/types';

//#endregion

export const mapStateToProps = (state: RootState) => ({ meta: state.cnfaction.meta });

export const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onSubmit: (data: CNFRequest) => dispatch(cnfaction.request(data)),
  onCancel: () => dispatch(cnfaction.cancel())
});