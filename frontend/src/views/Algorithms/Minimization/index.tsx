//#region imports
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { AutomatonInputValue } from 'components/Forms/Automaton';
import { DFA } from 'lib/types';

import { routes } from './routes';
import { validate } from './validation';
import {
  mapStateToProps,
  mapDispatchToProps
} from './selectors';

import Controller from 'components/AlgorithmView/Controller';
//#endregion


class MinimizationController extends Controller<DFA, AutomatonInputValue>{
  public state = {
    values: {
      header: [], 
      body: []
    },
    inputValue: null
  };

  public get url(){
    return '/algo/min'
  }
  public get routes(){
    return routes;
  }

  protected handleSubmit() {
    const values = this.state.values;
    try {
      const value = validate({values});
      this.setState({inputValue: value}, () => this.props.onSubmit(value));
    } catch (err) {
      this.handleSubmitError(err);
    }

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MinimizationController));
