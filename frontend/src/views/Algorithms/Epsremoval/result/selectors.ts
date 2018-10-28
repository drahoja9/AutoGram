//#region imports
import { Dispatch } from 'react-redux';
import { RootState } from 'reducers';
//#endregion

export const mapStateToProps = (state: RootState) => ({ value: state.epsremove.result });

export const mapDispatchToProps = (dispatch: Dispatch<any>) => ({ });
