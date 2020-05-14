import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import Lines from './lines';
import Circles from './circles';
import HoverRectangles from '../../../UI/Graphs/HoverRectangles/hoverRectangles';
import TinyTooltip from '../../../UI/Tooltips/TinyTooltip';
import YAxisLabel from '../../../UI/Graphs/yAxisLabel';
import Axis from '../../../UI/Graphs/axis';

const dimensions = {
  margin: {
    left: 50,
    right: 50,
    top: 50,
    bottom: 50,
  },
  width: 800,
  height: 600,
};
const { margin, width, height } = dimensions;

const LineGraph = ({ theData, handleTextBox, yAxisLabel }) => {
  const [data, setData] = useState(theData);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverInfo, setHoverInfo] = useState();
  const [hoverColor, setHoverColor] = useState();
  const [hoverPosition, setHoverPosition] = useState([]);

  const svgRef = useRef(null);

  // Prevent lines/circles spilling over from the start of graph. Use selected attrubute with the earliest non null values for the date.
  const xExtent = useMemo(
    function calcXExtent() {
      const selected = data.filter((d) => d.selected);

      const getExtentsForAllSelectedAttributes = () => {
        const extents = selected.map((attr) => {
          return d3.extent(attr.data, (d) => d.StatisticsProfileDate);
        });
        return extents;
      };
      const selectedExtents = getExtentsForAllSelectedAttributes();
      const maxValue = selectedExtents.map((h) =>
        Math.max(...selectedExtents.map((h) => h[1]))
      )[0];
      const minValue = selectedExtents.map((h) =>
        Math.min(...selectedExtents.map((h) => h[0]))
      )[0];
      const xExtent = [minValue, maxValue];

      return xExtent;
    },
    [data]
  );

  useEffect(() => {
    setData(theData);
  }, [theData]);

  // Switched to log scale, yExtent is hardcoded
  // const yExtent = d3.extent(data[0].data, (d) => d.attributes.CovidCasesConfirmed);

  const xScale = d3
    .scaleTime()
    .domain([xExtent[0], xExtent[1]])
    .range([margin.left, width - margin.right]);

  const yScale = d3
    .scaleLog()
    .domain([1, 100000])
    .clamp(true)
    .range([height - margin.top, margin.bottom])
    .nice();

  const handleHoverDate = (e, info) => {
    // daily data date attr is 'Date' (not relevant anymore...)
    // statistics profile data date attr is 'StatisticsProfileDate'
    // This should not be hardcoded, (theData[?].xAxisAttribute). I'm leaving it cause it's just easier.
    let dateFieldName = 'StatisticsProfileDate';
    if (!info[dateFieldName]) {
      dateFieldName = 'Date';
    }
    setHoverInfo(new Date(info[dateFieldName]).toString().substring(0, 10));
    setHoverColor('var(--lightBlack)');

    const xP = e.clientX + 20;
    const yP = e.clientY - 10;

    setHoverPosition([xP, yP]);
    setIsHovered(true);
  };

  const handleHoverLeaveDate = () => {
    setIsHovered(false);
  };

  const handleHover = (e, info, attr) => {
    setHoverInfo(`${attr.name}: ${info[attr.fieldName]}`);
    setHoverColor(attr.color);

    const xP = e.clientX + 20;
    const yP = e.clientY - 10;
    setHoverPosition([xP, yP]);
    setIsHovered(true);
  };

  const handleHoverLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      {isHovered && hoverPosition.length ? (
        <TinyTooltip
          isHovered={isHovered}
          hoverPosition={hoverPosition}
          hoverColor={hoverColor}
        >
          {hoverInfo}
        </TinyTooltip>
      ) : null}

      <svg
        ref={svgRef}
        viewBox="0 20 800 600"
        width={width}
        style={{ maxWidth: '100%' }}
      >
        <Axis
          dimensions={dimensions}
          xScale={xScale}
          yScale={yScale}
          tickNumDays={2}
        />
        {yAxisLabel ? (
          <YAxisLabel text={yAxisLabel} height={height} margin={margin} />
        ) : null}

        <Lines data={data} xScale={xScale} yScale={yScale} />

        {data && data.length ? (
          <HoverRectangles
            graphData={data[0].data}
            dimensions={dimensions}
            xAxisAttribute={data[0].xAxisAttribute}
            xScale={xScale}
            handleHoverLeaveDate={handleHoverLeaveDate}
            handleHoverDate={handleHoverDate}
            handleTextBox={handleTextBox}
          />
        ) : null}

        <Circles
          data={data}
          yScale={yScale}
          xScale={xScale}
          handleTextBox={handleTextBox}
          handleHover={handleHover}
          handleHoverLeave={handleHoverLeave}
        />
      </svg>
    </>
  );
};

export default LineGraph;
