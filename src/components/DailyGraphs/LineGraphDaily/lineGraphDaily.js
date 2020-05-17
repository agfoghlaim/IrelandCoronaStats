import React, { useState, useRef } from 'react';
import * as d3 from 'd3';
import classes from './lineGraphDaily.module.css';
import Axis from '../../../UI/Graphs/axis';
import YAxisLabel from '../../../UI/Graphs/yAxisLabel';
import Line from '../../../UI/Graphs/line';
import { useStore } from '../../../Store/store';
import HoverRectangles from '../../../UI/Graphs/HoverRectangles/hoverRectangles';
import BoringButton from '../../../UI/Buttons/boringButton';
// temp
import Dots from '../../../UI/Graphs/Dots/dots';
import TinyToolTip from '../../../UI/ToolTips/tinyToolTip';
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

const getMinMax = (extents) => {
  const maxValue = extents.map(() => Math.max(...extents.map((h) => h[1])))[0];
  const minValue = extents.map(() => Math.min(...extents.map((h) => h[0])))[0];
  return [minValue, maxValue];
};

const { margin, width, height } = dimensions;
const LineGraphDaily = ({ graphId, storeName, handleTextBox }) => {
  const dailyData = useStore()[0][storeName].graphs;

  const daily = dailyData.filter((d) => d.id === graphId)[0]; //should be called graph

  const [selectLogScale, setSelectLogScale] = useState(true);

  const svgRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverInfo, setHoverInfo] = useState();
  const [hoverColor, setHoverColor] = useState();
  const [hoverPosition, setHoverPosition] = useState([]);

  const calculateYExtentOfSelectedAttributes = () => {
    const getExtentsForTheseAttributes = () => {
      const extents = daily.selectedAttributeNames.map((attr) => {
        const relevant = daily.avail.filter((a) => a.fieldName === attr)[0];
        return d3.extent(relevant.attrData, (d) => d[attr]);
      });

      return extents;
    };

    const selectedExtents = getExtentsForTheseAttributes();
    return getMinMax(selectedExtents);
  };

  const getYScale = () => {
    const getYExtent = () => {
      let extent = calculateYExtentOfSelectedAttributes();
      // logScale can't deal with <= 0
      if (selectLogScale && extent[0] <= 0) {
        extent[0] = 1;
      }
      return extent;
    };

    const yExtent = getYExtent();

    if (selectLogScale) {
      const yScale = d3
        .scaleLog()
        // .scaleSymlog() accepts values below zero but causes more trouble than it's worth
        .domain(yExtent)
        .clamp(true)
        .range([height - margin.top, margin.bottom])
        .nice();
      yScale.theType = 'LOG'; // need this for nice axis (axis.js)
      return yScale;
    } else {
      const yScale = d3
        .scaleLinear()
        .domain(yExtent)
        .clamp(true)
        .range([height - margin.top, margin.bottom]);
      yScale.theType = 'LINEAR'; // need this for nice axis

      return yScale;
    }
  };

  const getXExtent = () => {
    const extents = daily.selectedAttributeNames.map((selected) => {
      const relevant = daily.avail.filter((a) => a.fieldName === selected)[0];
      return d3.extent(relevant.attrData, (d) => d[daily.xAxisAttribute]);
    });
    return getMinMax(extents);
  };

  const getXScale = () => {
    const xExtent = getXExtent();
    const xScale = d3
      .scaleTime()
      .domain([xExtent[0], xExtent[1]])
      .range([margin.left, width - margin.right]);
    return xScale;
  };

  const colorScale = d3
    .scaleSequential()
    .domain([0, 100])
    .interpolator(d3.interpolateRainbow);

  // const handleTextBox = (data, dateFieldName) => {
  //   if (!data || !dateFieldName) return;
  //   const dateToSelect = data[dateFieldName];
  //   dispatch('SET_DAILY_GRAPHS_SELECTED_DATE_AND_DATA', dateToSelect);
  // };

  const handleHover = (e, color, val) => {
    if (!e || !color || !val) return;

    setHoverInfo(`${e.target.id}: ${val}`);

    setHoverColor(color);
    const xP = e.clientX + 20;
    const yP = e.clientY - 10;
    setHoverPosition([xP, yP]);
    setIsHovered(true);
  };
  const handleHoverLeave = (e) => {
    setIsHovered(false);
  };
  //============
  const handleHoverDate = (e, info) => {
    // daily data date attr is 'Date'
    // statistics profile data date attr is 'StatisticsProfileDate'
    let dateFieldName = 'Date';
    if (!info[dateFieldName]) {
      dateFieldName = 'StatisticsProfileDate';
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
  //==========
  const getColor = (fieldName) => {
    const check = daily.avail.filter((d) => d.fieldName === fieldName);
    if (check.length && check[0].color) {
      return check[0].color;
    }

    return 'var(--blue)';
  };
  const toggleLogScale = () => {
    const currentLog = selectLogScale;
    setSelectLogScale(!currentLog);
  };

  return (
    <>

      <BoringButton
        onClick={toggleLogScale}
        overRideStyle={{
          background: `${
            selectLogScale ? 'var(--lightBlack)' : 'var(--covidGreen)'
          }`,
          color: `${
            selectLogScale ? 'var(--covidGreen)' : 'var(--lightBlack)'
          }`,
          borderRadius: ' 0.4rem',
          border: 'none',
          fontWeight: '800',
          letterSpacing: '0.1rem',
          textTransform: 'uppercase',
          fontSize: '0.6rem',
          padding: '0.5rem 1rem',
          outline: 'none',
          minWidth: '5rem',
          display: 'grid',
          alignSelf: 'center',
          justifySelf: 'center',
          cursor: 'pointer'
        }}
      >
        {selectLogScale ? 'Use Linear Scale' : 'Use Log Scale'}
      </BoringButton>
      {isHovered && hoverPosition.length ? (
        <TinyToolTip
          hoverPosition={hoverPosition}
          hoverColor={hoverColor}
        >
          {hoverInfo}
        </TinyToolTip>
      ) : null}

      <svg
        style={{ maxWidth: '100%' }}
        ref={svgRef}
        viewBox="0 0 800 600"
        width={width}
      >
        {daily ? (
          <>
            <Axis
              dimensions={dimensions}
              xScale={getXScale()}
              yScale={getYScale()}
              selectLogScale={selectLogScale}
            />

            <YAxisLabel
              text={daily.xAxisLabel}
              yClass={classes.yLabel}
              height={height}
              margin={margin}
            />

            <HoverRectangles
              // graphData={daily.all}
              // TODO is this okay...
              altGraphData={daily.avail[0].attrData}
              dimensions={dimensions}
              xScale={getXScale()}
              xAxisAttribute={daily.xAxisAttribute} // todo
              handleHoverLeaveDate={handleHoverLeaveDate}
              handleHoverDate={handleHoverDate}
              handleTextBox={handleTextBox}
            />
            {daily.selectedAttributeNames.map((fieldName) => {
              return (
                <g key={fieldName}>
                  <Line
                    graphData={daily.all}
                    altGraphData={
                      daily.avail.filter((a) => {
                        return a.fieldName === fieldName;
                      })[0].attrData
                    }
                    i="0"
                    key={fieldName}
                    handleHover={handleHover}
                    handleHoverLeave={handleHoverLeave}
                    xScale={getXScale()}
                    yScale={getYScale()}
                    colorScale={colorScale}
                    fieldName={fieldName}
                    color={getColor(fieldName)}
                    xAxisAttribute={daily.xAxisAttribute}
                  />

                  <Dots
                    relAvail={
                      daily.avail.filter((a) => a.fieldName === fieldName)[0]
                    }
                    xScale={getXScale()}
                    yScale={getYScale()}
                    fieldName={fieldName}
                    handleTextBox={handleTextBox}
                    handleHover={handleHover}
                    handleHoverLeave={handleHoverLeave}
                  />
                </g>
              );
            })}
          </>
        ) : null}
      </svg>
    </>
  );
};

export default LineGraphDaily;
