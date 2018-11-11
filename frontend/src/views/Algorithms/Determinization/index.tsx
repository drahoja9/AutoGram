//#region imports
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { AutomatonInputValue } from 'components/Forms/Automaton';
import { NFA } from 'lib/types';

import { routes } from './routes';
import { validate } from './validation';
import {
  mapStateToProps,
  mapDispatchToProps
} from './selectors';

import Controller from 'components/AlgorithmView/Controller';
//#endregion

//#region Component interfaces
interface DeterminizationState {
  values: AutomatonInputValue;
}
//#endregion

class DeterminizationController extends Controller<NFA, DeterminizationState>{
  public state = {
    values: {
      header: [], 
      body: []
    }
  };

  public get url(){
    return '/algo/det'
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
)(withRouter(DeterminizationController));
