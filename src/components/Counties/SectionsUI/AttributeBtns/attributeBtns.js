import React from 'react';
import classes from './attributeBtns.module.css'

const AttributeBtns = ({availableAttributes, handleSelectData}) => {
  return<div className={classes.btnGroupWrap}>
  { availableAttributes.map((a) => (
    <button
      key={a.fieldName}
      id={a.name}
      name={a.fieldName}
      selected={a.selected}
      style={{
        opacity: `${!a.selected ? '0.7' : `1`}`,
        background: `${a.selected ? `${a.color}` : `var(--lightBlack)`}`,
        border: `${
          !a.selected ? `0.2rem solid ${a.color}` : `0.1rem solid `
        }`,
        outline: 'none',
      }}
      onClick={(e) => handleSelectData(e)}
    >
      {a.name}
    </button>
  ))
    };
  </div>
}

export default AttributeBtns;