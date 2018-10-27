//#region imports
import { Dispatch } from 'react-redux';
import { RootState } from 'reducers';
//#endregion

export const mapStateToProps = (state: RootState) => ({ value: state.derivate.result });

export const mapDispatchToProps = (dispatch: Dispatch<any>) => ({});
