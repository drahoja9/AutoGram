import { ComparisonAction } from './comparison';
import { TransformationAction } from './transformation';
import { DeterminizationAction } from './determinization';

//TODO - add transformation somewhere somehow
export type RootAction = ComparisonAction | TransformationAction | DeterminizationAction;
