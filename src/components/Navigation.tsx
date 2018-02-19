import * as React from 'react';
import styled from 'styled-components';
import {
  Navbar,
  Nav,
  NavItem
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Brand = styled(Navbar.Brand)`
  cursor: pointer;
`;

export default () => (
  <Navbar fixedTop fluid>
    <Navbar.Header>
      <LinkContainer to="/">
        <Brand>
          Automaton
        </Brand>
      </LinkContainer>
      <Navbar.Toggle />
    </Navbar.Header>

    <Navbar.Collapse>
      <Nav pullRight>
        <LinkContainer to="/menu1">
          <NavItem>
            Menu1
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/menu2">
          <NavItem>
            Menu2
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/menu3">
          <NavItem>
            Menu3
          </NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
