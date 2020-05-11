import React from 'react';
import SectionWrapSimple from '../../../UI/Sections/SectionWrapSimple/sectionWrapSimple';
import classes from './intro.module.css';
import SelectGraphBtnGroup from '../../../UI/Buttons/SelectGraphBtnGroup/selectGraphBtnGroup';

const Intro = ({ allAvailableGraphs, handleSelectGraph, h1, desc, p }) => (
  <SectionWrapSimple offsetTop="-3rem">
    <h1 style={{ color: 'var(--white)', margin: 0 }}>{h1}</h1>
    <p className={classes.desc}></p>
    <p className={classes.p}>{p}</p>

  </SectionWrapSimple>
);

export default Intro;
