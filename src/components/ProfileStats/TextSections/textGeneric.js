import React from 'react';
import TextBoxGeneric from './textBoxGeneric';
import classes from './textGeneric.module.css';

const TextGeneric = ( {data, title, attributeForTitle} ) => {

  return (
    <div className={classes.genericTextWrap}>
       <div className={classes.genericTextItem}>
      <h2>{title}</h2>
      </div>
      

    {
      data.map( d => {
        return <div className={classes.genericTextItem}>
          <TextBoxGeneric attributeForBoxTitle={attributeForTitle} data={d} />
        </div>
      })
    }
    </div>
  )
}

export default TextGeneric;