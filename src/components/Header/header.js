import React from 'react';
import classes from './header.module.css';
import { Link } from 'react-router-dom';
const Header = () => (
  <header className={classes.header}>
    <h1>Ireland Coronavirus Stats</h1>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/stats">Profiles</Link>
        </li>
        <li>
          <Link to="/counties">Counties</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
