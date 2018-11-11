import { ComparisonAction } from './comparison';
import { TransformationAction } from './transformation';
import { DeterminizationAction } from './determinization';
import { MinimizationAction } from './minimization';
import { DerivationAction } from './derivation';
import { EpsremovalAction } from './epsremoval';
import { CnfAction } from './cnf';
import { LeftrecremovalAction } from './leftrecremoval';
import { CykAction } from './cyk';


export type RootAction = ComparisonAction | TransformationAction | DeterminizationAction | MinimizationAction | DerivationAction | EpsremovalAction | CnfAction | LeftrecremovalAction | CykAction;
