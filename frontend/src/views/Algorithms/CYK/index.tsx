//#region imports
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { GrammarInputValue } from 'components/Forms/Grammar';
import { CYKRequest } from 'lib/types';

import { routes } from './routes';
import { validate } from './validation';
import {
  mapStateToProps,
  mapDispatchToProps
} from './selectors';

import Controller from 'components/AlgorithmView/Controller';
//#endregion

//#region Component interfaces
interface CykState {
  values: GrammarInputValue
}
//#endregion

class CykController extends Controller<CYKRequest, CykState>{
  public state = {
      values: {
        nonTerms: '',
        terms: '',
        rules: '',
        startSymbol: '',
      }
  };

  public get url(){
    return '/algo/cyk'
  }
  public get routes(){
    return routes;
  }

  protected handleSubmit() {
    const values = this.state.values;
    try {
      const value = validate({values});
      this.props.onSubmit(value);
    } catch (err) {
      this.handleSubmitError(err);
    }

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CykController));
