import { ComparisonAction } from './comparison';
import { TransformationAction } from './transformation';
import { DeterminizationAction } from './determinization';
import { MinimizationAction } from './minimization';
import { DerivationAction } from './derivation';

//TODO - add transformation somewhere somehow
export type RootAction = ComparisonAction | TransformationAction | DeterminizationAction | DerivationAction | MinimizationAction;
