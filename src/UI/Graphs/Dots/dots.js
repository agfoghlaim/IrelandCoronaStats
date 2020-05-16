import React from 'react';
import classes from './dots.module.css';

const Dots = ({
  yScale,
  xScale,
  relAvail,
  handleTextBox,
  handleHover,
  handleHoverLeave,
  fieldName,
}) => {

  const { attrData, xAxisAttribute, useDifferentShape, name, color } = relAvail;

  return attrData.map((attr, i) => {
    const y = yScale(attr[fieldName]);
    const x = xScale(attr[xAxisAttribute]);
    return x && y && !relAvail.useDifferentShape ? (
      <circle
        key={`${fieldName}-${i}`}
        className={classes.lineGraphCircle}
        onClick={() => handleTextBox(attr, xAxisAttribute)}
        onMouseEnter={(e) => handleHover(e, color, attr[fieldName])}
        onMouseLeave={(e) => handleHoverLeave(e)}
        cx={x}
        cy={y}
        r="0.2rem"
        id={name}
        fill={color}
      ></circle>
    ) : x && y && useDifferentShape ? (
      <rect
        key={`${fieldName}-${i}`}
        className={classes.lineGraphCircle}
        onClick={() => handleTextBox(attr, xAxisAttribute)}
        onMouseEnter={(e) => handleHover(e, attr, fieldName, attr[fieldName])}
        onMouseLeave={(e) => handleHoverLeave(e)}
        x={x}
        y={y}
        rx="0.1rem"
        id={name}
        width="0.2rem"
        height="0.5rem"
        fill={color}
      ></rect>
    ) : null;
  });

};

export default Dots;
