import { NavLink as ReactLink } from 'react-router-dom';
import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink as RSNavLink,
} from 'reactstrap';

const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Navbar className="mb-3" style={{ backgroundColor: 'light' }} expand="md">
        <NavbarBrand tag={ReactLink} to='/' className="h5 text-danger font-weight-bold col-md-3 offset-md-1 mt-3" style={{ opacity: 0.7 }}>
          TweetX
        </NavbarBrand>

        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />

        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <NavItem>
              <RSNavLink
                tag={ReactLink}
                to='/feed'
                className="nav-link"
                style={{ marginRight: '15px', color: 'gray' }}
                activeClassName="active"
              >
                Feed
              </RSNavLink>
            </NavItem>
            <NavItem>
              <RSNavLink
                tag={ReactLink}
                to='/users'
                className="nav-link"
                style={{ marginRight: '15px', color: 'gray' }}
                activeClassName="active"
              >
                Users
              </RSNavLink>
            </NavItem>
            <NavItem>
              <RSNavLink
                tag={ReactLink}
                to='/profile'
                className="nav-link"
                style={{ marginRight: '50px', color: 'gray' }}
                activeClassName="active"
              >
                Profile
              </RSNavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navbar2;
