import React from 'react';
import classes from './loading.module.css';

const LoadingComp = ({ msg }) => <div className={classes.loader}>{msg}</div>;

export default LoadingComp;
