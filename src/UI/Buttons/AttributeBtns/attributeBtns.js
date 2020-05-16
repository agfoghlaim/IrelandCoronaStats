import React from 'react';
import classes from './attributeBtns.module.css'

const AttributeBtns = ({availableAttributes, handleSelectData, graphIndex}) => {

  return<div className={classes.btnGroupWrap}>
  { availableAttributes.map((a) => (
    <button
      key={a.fieldName}
      id={a.name}
      name={a.fieldName}
      selected={a.selected}
      style={{
        opacity: `${!a.selected ? '0.8' : `1`}`,
        background: `${a.selected ? `${a.color}` : `var(--gray)`}`,
        border: `${
          !a.selected ? `0.1rem solid ${a.color}` : `${a.color} `
        }`,
        color: `${a.selected && a.color === 'var(--white)' ? `var(--lightBlack)` : `var(--white)`}`,
        outline: 'none',
      }}
      onClick={(e) => handleSelectData(e, graphIndex)}
    >
      {a.name}
    </button>
  ))
    }
  </div>
}

export default AttributeBtns;