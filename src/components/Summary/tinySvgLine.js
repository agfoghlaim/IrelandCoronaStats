import React from 'react';
import Line from '../../UI/Graphs/line';
import classes from './tinySvgLine.module.css';
import TinyAxis from './tinyAxis';

const dummy = () => {};

const TinySvgLine = ({
  shortStatsForPerformance,
  xScale,
  yScale,
  fieldName,
  label,
  mouseEnter,
  mouseLeave,
  handleClick,
  dimensions,
  isHovered,
  xAxisAttribute
}) => (
  <svg
    className={classes.tinySvgLine}
    // viewBox="0 0 200 100"
    viewBox="0 -20 200 150"
    width="200"
    style={{ maxWidth: '100%', position: 'relative' }}
    role="img"
    aria-label={label}
    onMouseOver={(e) => mouseEnter(e)}
    onMouseLeave={(e) => mouseLeave(e)}
    onClick={() => handleClick()}
  >
    {isHovered ? (
      <TinyAxis
        dimensions={dimensions}
        xScale={xScale}
        yScale={yScale}
        selectLogScale={true}
      />
    ) : null}

    <Line
      altGraphData={shortStatsForPerformance}
      xScale={xScale}
      yScale={yScale}
      fieldName={fieldName}
      color={isHovered ? 'var(--white)' : 'var(--gray)'}
      // color="var(--gray)"
      handleHover={dummy}
      handleHoverLeave={dummy}
      xAxisAttribute={xAxisAttribute}
    />
  </svg>
);

export default TinySvgLine;
