//#region imports
import { RouteProps } from 'react-router-dom';
import { Redirect } from 'components';
const { asyncComponent } = require('react-async-component');
//#endregion

/**
 * Top level routing for `/algo/*` paths..
 */
export default function getRoutes(basePath: string, inputComponent: any, resultComponent: any): RouteProps[]{
  return [
    {
      path: basePath,
      exact: true,
      component: Redirect(`${basePath}/input`)
    },
    {
      path: `${basePath}/input`,
      exact: true,
      component: asyncComponent({
        resolve: () => inputComponent
      })
    },
    {
      path: `${basePath}/result`,
      exact: true,
      component: asyncComponent({
        resolve: () => resultComponent
      })
    },
  ];
}


