//#region imports
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import { RegexpInputValue } from 'components/Forms/Regexp';
import { DerivationRequest } from 'lib/types';

import { routes } from './routes';
import { validate } from './validation';
import {
  mapStateToProps,
  mapDispatchToProps
} from './selectors';

import Controller from 'components/AlgorithmView/Controller';
//#endregion

class DerivationController extends Controller<DerivationRequest, RegexpInputValue>{
  public state = { 
      values: '', 
      derivationString: '',
      inputValue: null };

  public get url(){
    return '/algo/der'
  }
  public get routes(){
    return routes;
  }
  protected handleSubmit(){
    const values = this.state.values;
    const derivationString = this.state.derivationString;
    try {
      const derivationRequest = validate({ values, derivationString });
      this.setState({inputValue: derivationRequest}, () => this.props.onSubmit(derivationRequest));
    } catch (err) {
      this.handleSubmitError(err);
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DerivationController));
