import { ComparisonAction } from './comparison';
import { TransformationAction } from './transformation';
import { DeterminizationAction } from './determinization';
import { MinimizationAction } from './minimization';

//TODO - add transformation somewhere somehow
export type RootAction = ComparisonAction | TransformationAction | DeterminizationAction | MinimizationAction;
