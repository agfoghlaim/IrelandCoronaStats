import React from 'react';
import TinySvgLine from './tinySvgLine';
import classes from './summaryBox.module.css';

const SummaryBox = ({
  niceStats,
  xScale,
  yScale,
  temp,
  fieldName,
  yesterdayFieldName,
  latest,
  text,
  dateField,
  svgLineFieldName,
}) => {
  return (
    <div className={classes.summaryBox} style={{ position: 'relative' }}>
      <TinySvgLine
        niceStats={niceStats}
        xScale={xScale}
        yScale={yScale}
        temp={temp}
        fieldName={svgLineFieldName}
      />

      <h4>
        {latest[fieldName].toLocaleString()}{' '}
        {yesterdayFieldName ? (
          <small>
            (+
            {latest[yesterdayFieldName].toLocaleString()})*
          </small>
        ) : null}
      </h4>
      <h3>{text}</h3>
      <p>({new Date(latest[dateField]).toString().substring(0, 15)})</p>
    </div>
  );
};

export default SummaryBox;
