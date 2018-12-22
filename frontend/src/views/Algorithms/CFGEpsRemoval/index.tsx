//#region imports
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { GrammarInputValue } from 'components/Forms/Grammar';
import { CFGEpsRemovalRequest } from 'lib/types';

import { routes } from './routes';
import { validate } from './validation';
import {
  mapStateToProps,
  mapDispatchToProps
} from './selectors';

import Controller from 'components/AlgorithmView/Controller';
//#endregion

class CFGEpsRemovalController extends Controller<CFGEpsRemovalRequest, GrammarInputValue>{
  public state = {
    values: {
      nonTerms: '',
      terms: '',
      rules: '',
      startSymbol: ''
    },
    inputValue: null
  };

  public get url() {
    return '/algo/cfg_eps'
  }
  public get routes() {
    return routes;
  }

  protected handleSubmit() {
    const values = this.state.values;
    try {
      const value = validate({ values });
      this.setState({inputValue: value}, () => this.props.onSubmit(value));
    } catch (err) {
      this.handleSubmitError(err);
    }

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CFGEpsRemovalController));
