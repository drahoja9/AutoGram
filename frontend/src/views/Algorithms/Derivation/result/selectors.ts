//#region imports
import { Dispatch } from 'react-redux';
import { RootState } from 'reducers';
//#endregion

export const mapStateToProps = (state: RootState) => ({ steps: state.derivate.steps, trimmed_steps: state.derivate.trimmed_steps });

export const mapDispatchToProps = (dispatch: Dispatch<any>) => ({});
