//#region imports
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { AutomatonInputValue } from 'components/Forms/Automaton';
import { ENFA } from 'lib/types';

import { routes } from './routes';
import { validate } from './validation';
import {
  mapStateToProps,
  mapDispatchToProps
} from './selectors';

import Controller from 'components/AlgorithmView/Controller';
//#endregion


class EpsremovalController extends Controller<ENFA, AutomatonInputValue>{
  public state = {
    values: {
      header: [], 
      body: [],
    },
    inputValue: null
  };

  public get url(){
    return '/algo/eps'
  }
  public get routes(){
    return routes;
  }

  protected handleSubmit() {
    //CHECK THIS IF IT IS CORRECT
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
)(withRouter(EpsremovalController));
