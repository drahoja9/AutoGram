import { ComparisonAction } from './comparison';
import { TransformationAction } from './transformation';
import { DeterminizationAction } from './determinization';
import { EpsremovalAction } from './epsremoval';

//TODO - add transformation somewhere somehow
export type RootAction = ComparisonAction | TransformationAction | DeterminizationAction | EpsremovalAction;
