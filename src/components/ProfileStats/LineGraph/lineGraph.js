import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import classes from './lineGraph.module.css';
import Lines from './lines';
import Circles from './circles';
import HoverRectangles from '../HoverRectangles/hoverRectangles';
import TinyTooltip from '../../../UI/Tooltips/TinyTooltip';
import YAxisLabel from '../../../UI/Graphs/yAxisLabel';
import Axis from '../../../UI/Graphs/axis';


const dimensions = {
  margin:{
    left: 50,
    right: 50,
    top: 50,
    bottom: 50,
  },
  width:800,
  height:600
}
const {margin, width, height} = dimensions;
const LineGraph = ({ theData, handleTextBox, yAxisLabel }) => {
  const [data, setData] = useState(theData);

  const svgRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [hoverInfo, setHoverInfo] = useState();
  const [hoverColor, setHoverColor] = useState();
  const [hoverPosition, setHoverPosition] = useState([]);

  const xExtent = d3.extent(
    data[0].data,
    // (d) => d.attributes.StatisticsProfileDate
    (d) => d.attributes[data[0].xAxisAttribute]
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
    // daily data date attr is 'Date'
    // statistics profile data date attr is 'StatisticsProfileDate'
    let dateFieldName = 'StatisticsProfileDate';
    if (!info.attributes[dateFieldName]) {
      dateFieldName = 'Date';
    }
    setHoverInfo(
      new Date(info.attributes[dateFieldName]).toString().substring(0, 10)
    );
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
    setHoverInfo(`${attr.name}: ${info.attributes[attr.fieldName]}`);
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
    <div className={classes.svgWrap}>
      {isHovered && hoverPosition.length ? (
        <TinyTooltip
          isHovered={isHovered}
          hoverPosition={hoverPosition}
          hoverColor={hoverColor}
        >
          {hoverInfo}
        </TinyTooltip>
      ) : null}

      <svg ref={svgRef} viewBox="0 0 800 600" width={width}>

        <Axis dimensions={dimensions} xScale={xScale} yScale={yScale} tickNumDays={2} />
        {yAxisLabel ? <YAxisLabel text={yAxisLabel} height={height} /> : null}

        <Lines data={data} xScale={xScale} yScale={yScale} />

        {data && data.length && data[0].selected ? (
          <HoverRectangles
            graphData={data[0]}
            width={width}
            height={height}
            margin={margin}
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
    </div>
  );
};

export default LineGraph;
