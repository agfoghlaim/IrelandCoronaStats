import React from 'react';
import SectionWrapSimple from '../../../UI/Sections/SectionWrapSimple/sectionWrapSimple';
import classes from './intro.module.css';

const Intro = ({ allAvailableGraphs, handleSelectGraph, h1, desc, p }) => (
  <SectionWrapSimple offsetBottom="-3rem">
    <h1 style={{ color: 'var(--white)', margin: 0 }}>{h1}</h1>
    <p className={classes.desc}>{desc}</p>
    <p className={classes.p}>{p}</p>
    <div className={classes.btnGroupWrap}>
      {allAvailableGraphs.map((graph, i) => (
        <button
          className={classes.tabBtn}
          key={i}
          style={{
            background: `${graph.selected ? 'var(--orange)' : 'var(--black)'}`,
          }}
          onClick={() => handleSelectGraph(graph.name)}
        >
          {graph.sectionName}
        </button>
      ))}
    </div>
  </SectionWrapSimple>
);

export default Intro;
