import React from 'react';
import classes from './countyBtns.module.css';

const CountyBtns = ({ counties, handleSelectCounty }) => {
  return (
    <div className={classes.countiesTinyBtnGroupWrap}>
      {counties.map((county) => {
        return (
          <button
            style={{
              border: `${
                county.selected ? `none` : `0.1rem solid ${county.color}`
              }`,
              background: `${
                county.selected ? `${county.color}` : `var(--lightBlack)`
              }`,
              color: `${
                county.selected ? 'var(--lightBlack)' : 'var(--white)'
              }`,
              fontWeight: '700',
            }}
            id={county.name}
            key={county.name}
            onClick={(e) => handleSelectCounty(e)}
          >
            {county.name}
          </button>
        );
      })}
      ;
    </div>
  );
};

export default CountyBtns;
