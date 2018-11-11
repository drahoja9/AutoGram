import { ComparisonAction } from './comparison';
import { TransformationAction } from './transformation';
import { DeterminizationAction } from './determinization';
import { MinimizationAction } from './minimization';
import { DerivationAction } from './derivation';
import { EpsremovalAction } from './epsremoval';


export type RootAction = ComparisonAction | TransformationAction | DeterminizationAction | MinimizationAction | DerivationAction | EpsremovalAction;
