import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import classes from './lineGraph2.module.css';
import Axis from '../../../UI/Graphs/axis';
import YAxisLabel from '../../../UI/Graphs/yAxisLabel';
import Line from './line';
import { useStore } from '../../../Store/store';
import ClickRectangles from '../ClickRectangles/clickRectangles';

const dimensions = {
  margin: {
    left: 70,
    right: 60,
    top: 60,
    bottom: 60,
  },
  width: 1000,
  height: 600,
};
const { margin, width, height } = dimensions;

const LineGraph = ({ handleSelectCounty, handleSelectDate }) => {
  const storeSections = useStore()[0].sections[0];
  const selectedData = storeSections.avail.filter((data) => data.selected)[0];
  const svgRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [hoverInfo, setHoverInfo] = useState();
  const [hoverColor, setHoverColor] = useState();
  const [hoverPosition, setHoverPosition] = useState([]);
  const [selectedAttribute, setSelectedAttribute] = useState('');
  const [hoverInfoDate, setHoverInfoDate] = useState('');

  useEffect(() => {
    const findSelectedAttribute = () => {
      const selected = storeSections.avail.filter((d) => d.selected)[0];
      return selected;
    };
    const newSelected = findSelectedAttribute();
    setSelectedAttribute(newSelected.fieldName);
  }, [storeSections.avail]);

  const useForXExtent = storeSections.allCounties[0].stats;
  const xExtent = d3.extent(useForXExtent, (d) => d.TimeStampDate);
  const xScale = d3
    .scaleTime()
    .domain([xExtent[0], xExtent[1]])
    .range([margin.left, width - margin.right]);
  const yScale = d3
    .scaleLog()
    .domain([1, 10000000])
    .clamp(true)
    .range([height - margin.top, margin.bottom])
    .nice();
  const colorScale = d3
    .scaleSequential()
    .domain([0, 100])
    .interpolator(d3.interpolateRainbow);

  const handleHover = (e, info) => {
    const county = info.name;
    // e.target.attributes['stroke-width'].value = '0.5rem';
    setHoverInfo(county);
    setHoverColor(info.color);
    const xP = e.clientX + 20;
    const yP = e.clientY - 10;
    setHoverPosition([xP, yP]);
    setIsHovered(true);
  };

  const handleHoverLeave = (e) => {

    setIsHovered(false);
  };

  const handleHoverDate = (e, date) => {
    setHoverInfoDate(new Date(date).toString().substring(0, 10));
    setHoverColor('var(--lightBlack)');
    const xP = e.clientX + 20;
    const yP = e.clientY - 10;
    setHoverPosition([xP, yP]);
  };

  // TODO ?
  const handleHoverLeaveDate = () => {

  };

  return (
    <>
  
     { isHovered && hoverPosition.length ? (
        <div
          style={{
            opacity: `${isHovered ? '1' : '0'}`,
            position: 'fixed',
            left: `${hoverPosition[0]}px`,
            top: `${hoverPosition[1]}px`,
            background: `${hoverColor}`,
            color: 'var(--white)',
            padding: '0.5rem 1rem',
            borderRadius: '0.4rem',
            fontSize: '0.6rem',
          }}
        >
          {hoverInfo || hoverInfoDate}
        </div>
      ) : null}

    <svg
        ref={svgRef}
        className={classes.lineSvg}
        viewBox={`0 40 ${width-50} ${height}`}
        width={width}
        style={{maxWidth:'100%'}}
      >
        <Axis dimensions={dimensions} xScale={xScale} yScale={yScale} />
        <YAxisLabel
          text={ selectedData ? selectedData.xAxisDescription : ''}
          height={height}
          margin={margin}
        />
        {storeSections && storeSections.allCountiesLatestData.length ? (
          <ClickRectangles
            graphData={storeSections.allCounties[0].stats.map(
              (county) => county.TimeStampDate
            )}
            dimensions={dimensions}
            xScale={xScale}
            handleHoverLeaveDate={handleHoverLeaveDate}
            handleHoverDate={handleHoverDate}
            handleSelectDate={handleSelectDate}
            selectedDate={storeSections.selectedDate}
          />
        ) : null}
        {storeSections && storeSections.allCounties.length
          ? storeSections.allCounties.map((graphData, i) => (
             
                <Line
                  graphData={graphData}
                  i={i}
                  key={i}
                  handleHover={handleHover}
                  handleHoverLeave={handleHoverLeave}
                  xScale={xScale}
                  yScale={yScale}
                  colorScale={colorScale}
                  selectedAttribute={selectedAttribute}
                  handleSelectCounty={handleSelectCounty}
                />
          
            ))
          : null}
      </svg>

    </>
  );
};

export default LineGraph;
