import { ComparisonAction } from './comparison';
import { TransformationAction } from './transformation';
import { DeterminizationAction } from './determinization';
import { MinimizationAction } from './minimization';
import { DerivationAction } from './derivation';
import { EpsremovalAction } from './epsremoval';
import { CFGreductionAction } from './CFGreduction';
import { CFGEpsRemovalAction } from './CFGEpsRemoval';
import { CFGUnitRemovalAction } from './CFGUnitRemoval';
import { CnfAction } from './cnf';
import { LeftrecremovalAction } from './leftrecremoval';
import { CykAction } from './cyk';


export type RootAction =
  ComparisonAction |
  TransformationAction |
  DeterminizationAction |
  MinimizationAction |
  DerivationAction |
  EpsremovalAction |
  CFGreductionAction |
  CFGEpsRemovalAction |
  CFGUnitRemovalAction | 
  CnfAction | 
  LeftrecremovalAction | 
  CykAction;
