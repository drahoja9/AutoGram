//#region imports
import { Dispatch } from 'react-redux';
import { RootState } from 'reducers';
import { derivate } from 'actions/derivation';
import { RE } from 'lib/types';

//#endregion

export const mapStateToProps = (state: RootState) => ({ meta: state.derivate.meta });

export const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onSubmit: (data: { 'regexp': RE, 'derivation_string': string }) => dispatch(derivate.request(data)),
  onCancel: () => dispatch(derivate.cancel())
});