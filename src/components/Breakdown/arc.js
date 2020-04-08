// import * as d3 from 'd3';
import React, { useRef, useEffect, useState } from 'react';

const Arc = ({ data, index, createArc, colors, format, svgDimensions }) => {
  const textLabel = useRef(null);
  const [labelTextOffsetX, setLabelTextOffsetX] = useState(0);
  const [labelTextOffsetY, setLabelTextOffsetY] = useState(0);
  const thisArcCenter = createArc.centroid(data);

  useEffect(() => {
    const textLabelEl = textLabel.current.getBBox();

    setLabelTextOffsetY(textLabelEl.height / 4); // midpoint @ lineEnd
    if (textLabelEl.x < 0) {
      const newLabelTextOffset = -Math.abs(textLabelEl.width);
      setLabelTextOffsetX(newLabelTextOffset);
    }
  }, []);

  const calcCenterOfChartToArcCentroidProjection = () => {
    // ie point outside chart at which label line turns towards horizontal line to text

    if (thisArcCenter[0] > 0) {
      //to the right
      const ansx1 = thisArcCenter[0] - 0 + thisArcCenter[0];
      const ansy1 = thisArcCenter[1] - 0 + thisArcCenter[1] - index * 33;
      return [ansx1, ansy1];
    } else {
      const ansx1 = thisArcCenter[0] - 0 + thisArcCenter[0];
      const ansy1 = thisArcCenter[1] - 0 + thisArcCenter[1];
      // console.log(`${data.data.name} returningpppp: `, -ansx1,ansy1)
      return [-Math.abs(ansx1), ansy1];
    }
  };

  // projected end of line from pie center=>arc center=>[ansx1,ansy1]
  // Length needs to be proportional to something so there's vertical space for the text
  // I'm using index*30 - this is very dodge.
  // leaving '-0' because this is the coordinate of the center of the piechart.

  const [ansx1, ansy1] = calcCenterOfChartToArcCentroidProjection();
  // horizontal line from projected point above to start of label text
  // TODO - '300's below should be a constant (depends on finalised size)
  const lineEnd = () => {
    if (ansx1 > 0) {
      return [300, ansy1];
    } else {
      return [-300, ansy1];
    }
  };

  const [lineEndx, lineEndy] = lineEnd();
  const arcId = data.data.name;
  const pathStringArcCentroidToLabelText = `M ${thisArcCenter[0]} ${thisArcCenter[1]} 
              L ${ansx1} ${ansy1} L ${lineEndx} ${lineEndy}
             `;
  return (
    <g key={index} className="arc">
      <path className="arc" d={createArc(data)} fill={colors(index)} />

      <text
        transform={`translate(${createArc.centroid(data)})`}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="white"
        fontSize="19"
        // ref={textRef}
      >
        {format(data.value)}
      </text>
      <path
        d={pathStringArcCentroidToLabelText}
        id={arcId}
        stroke="black"
        fill="none"
        strokeWidth="2"
        opacity="0.2"
      />
      <text
        x={lineEndx}
        y={lineEndy}
        dx={labelTextOffsetX}
        dy={labelTextOffsetY}
        ref={textLabel}
        fill="grey"
        fontSize="19"
      >
        {data.data.name} ({data.data.value})
      </text>
    </g>
  );
};

export default Arc;
