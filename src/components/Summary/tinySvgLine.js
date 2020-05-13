import React from 'react';
import Line from '../DailyGraphs/LineGraphDaily/line';

const TinySvgLine = ({ niceStats, xScale, yScale, temp, fieldName }) => (
  <svg
    viewBox="0 0 200 100"
    height="100"
    width="200"
    style={{ maxWidth: '100%', position: 'relative' }}
  >
    <Line
      graphData={niceStats}
      xScale={xScale}
      yScale={yScale}
      fieldName={fieldName}
      color="var(--gray)"
      handleHover={temp}
      handleHoverLeave={temp}
    />
  </svg>
);

export default TinySvgLine;
