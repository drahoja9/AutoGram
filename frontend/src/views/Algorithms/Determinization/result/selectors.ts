//#region imports
import { Dispatch } from 'react-redux';
import { RootState } from 'reducers';
//#endregion

export const mapStateToProps = (state: RootState) => ({ value: state.determinize.result });

export const mapDispatchToProps = (dispatch: Dispatch<any>) => ({ });
