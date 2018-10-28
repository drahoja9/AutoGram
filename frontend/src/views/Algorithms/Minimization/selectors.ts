//#region imports
import { Dispatch } from 'react-redux';
import { RootState } from 'reducers';
import { minimize } from 'actions/minimization';
import { DFA } from 'lib/types';

//#endregion

export const mapStateToProps = (state: RootState) => ({ meta: state.minimize.meta });

export const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onSubmit: (data: DFA) => dispatch(minimize.request(data)),
  onCancel: () => dispatch(minimize.cancel())
});