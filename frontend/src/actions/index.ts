import { ComparisonAction } from './comparison';
import { TransformationAction } from './transformation';

//TODO - add transformation somewhere somehow
export type RootAction = ComparisonAction | TransformationAction;
