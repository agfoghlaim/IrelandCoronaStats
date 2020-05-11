import React from 'react';
import classes from './selectGraphBtnGroup.module.css';
const SelectGraphBtnGroup = ({data, handleSelectGraph, btnClass}) => (
  <div className={classes.btnGroupWrap}>
      {data.map((graph, i) => (
        <button
          className={classes.tabBtn}
          key={i}
          style={{
            background: `${graph.selected ? 'var(--yellow)' : 'var(--black)'}`,
            color: `${graph.selected ? 'var(--lightBlack)' : 'var(--white)'}`,
            fontWeight: `${graph.selected ? '800' : 'normal'}`,
          }}
          onClick={() => handleSelectGraph(graph.name)}
        >
          {graph.sectionName}
        </button>
      ))}
  </div>
  )


export default SelectGraphBtnGroup;