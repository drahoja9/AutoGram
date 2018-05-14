import { Dispatch } from 'react-redux';
import { RootState } from 'reducers';
import { compare } from 'actions/comparison';
import { ComparisonRequest } from 'lib/types';

export const mapStateToProps = (state: RootState) => ({ ...state.compare });

export const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onCompare: (data: ComparisonRequest) => dispatch(compare.request(data))
});
