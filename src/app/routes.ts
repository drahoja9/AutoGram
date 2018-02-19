import { RouteProps } from 'react-router-dom';
import { Redirect } from 'components';
import Menu1 from './menu1';
import Menu2 from './menu2';
import Menu3 from './menu3';

export const routes: RouteProps[] = [
  {
    path: '/',
    exact: true,
    component: Redirect('/menu1')
  },
  {
    path: '/menu1',
    exact: true,
    component: Menu1
  },
  {
    path: '/menu2',
    exact: true,
    component: Menu2
  },
  {
    path: '/menu3',
    exact: true,
    component: Menu3
  }
];
