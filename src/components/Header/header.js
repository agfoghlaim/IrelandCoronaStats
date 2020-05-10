import React from 'react';
import classes from './header.module.css';
import { NavLink } from 'react-router-dom';
const Header = (props) => (
  <header className={classes.header}>
    <h1>Ireland Coronavirus Stats</h1>
    <nav>
      <ul>
        <li>
          <NavLink exact to="/" activeClassName={classes.navActive}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/stats" activeClassName={classes.navActive}>
            Profiles
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/counties" activeClassName={classes.navActive}>
            Counties
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
