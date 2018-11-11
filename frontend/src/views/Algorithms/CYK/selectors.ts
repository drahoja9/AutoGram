//#region imports
import { Dispatch } from 'react-redux';
import { RootState } from 'reducers';
import { cykaction } from 'actions/cyk';
import { CYKRequest } from 'lib/types';

//#endregion

export const mapStateToProps = (state: RootState) => ({ meta: state.cykaction.meta });

export const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onSubmit: (data: CYKRequest) => dispatch(cykaction.request(data)),
  onCancel: () => dispatch(cykaction.cancel())
});