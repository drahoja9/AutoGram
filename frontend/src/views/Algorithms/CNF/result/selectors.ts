//#region imports
import { Dispatch } from 'react-redux';
import { RootState } from 'reducers';
//#endregion

export const mapStateToProps = (state: RootState) => ({ result: state.cnfaction.result });

export const mapDispatchToProps = (dispatch: Dispatch<any>) => ({ });
