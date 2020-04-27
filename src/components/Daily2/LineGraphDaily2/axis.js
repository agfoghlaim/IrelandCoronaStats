import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';

const Axis = ({ dimensions, xScale, yScale, selectLogScale }) => {
  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);
  const xAxis = d3.axisBottom();
  const yAxis = d3.axisLeft();
  const yTickWidth = -Math.abs(
    dimensions.width - dimensions.margin.right - dimensions.margin.left
  );
  const xTickWidth = -Math.abs(
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom
  );

  useEffect(() => {
    doAxis();
  }, [selectLogScale, yScale]);

  const doAxis = () => {
    const xRef = d3.select(xAxisRef.current);
    const yRef = d3.select(yAxisRef.current);
    xAxis.scale(xScale).ticks(d3.timeDay.every(3));
    if (yScale.theType === 'LOG') {
      // appended to yScale in lineGraph

      yAxis.scale(yScale).ticks(10, ',.0f');
    } else {
      yAxis.scale(yScale).ticks(20);
    }

    //= scaleSymlog handles values below zero but I can't figure out how to get the ticks to behave. Below moves some of them to the right of the graph
    // if (yScale.theType === 'LOG') { // appended to yScale in lineGraph
    //   yAxis
    //     .scale(yScale)
    //     .ticks(10, ',.0f')
    //     .tickFormat((d, i, textLabels) => {
    //       // transform some of the labels to the right cause o' clutter see global app.css for .dodgyTransformClutterLogScaleLabels

    //       textLabels.map((textLabel, i) => {
    //         if (i % 2 !== 0) {
    //           return (textLabel.classList.value =
    //             'dodgyTransformClutterLogScaleLabels');
    //         }
    //         return textLabel;
    //       });
    //       return d;
    //     });
    // }

    xRef.call(xAxis.tickSize(xTickWidth));
    yRef.call(yAxis.tickSize(yTickWidth));
  };

  return (
    <>
      <g
        ref={xAxisRef}
        transform={`translate(0,${dimensions.height - dimensions.margin.top})`}
      ></g>
      <g
        ref={yAxisRef}
        transform={`translate(${dimensions.margin.left}, 0)`}
      ></g>
    </>
  );
};

export default Axis;
