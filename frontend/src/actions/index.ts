import { ComparisonAction } from './comparison';
import { TransformationAction } from './transformation';
import { DeterminizationAction } from './determinization';
import { DerivationAction } from './derivation';

//TODO - add transformation somewhere somehow
export type RootAction = ComparisonAction | TransformationAction | DeterminizationAction | DerivationAction;
