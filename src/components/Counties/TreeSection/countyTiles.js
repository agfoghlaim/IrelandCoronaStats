import * as d3 from 'd3';
import React, { useRef, useState } from 'react';

const color = d3
  .scaleOrdinal()
  .domain(['ulster', 'munster', 'connaught', 'leinster'])
  .range([
    'var(--covidGreen)',
    'var(--covidBlue)',
    'var(--covidPurple)',
    'var(--covidYellow)',
  ]);

const PROVINCES = [
  {
    name: 'connaught',
    counties: [
      { name: 'Mayo', reg: 'MO' },
      { name: 'Galway', reg: 'G' },
      { name: 'Sligo', reg: 'SO' },
      { name: 'Leitrim', reg: 'LM' },
      { name: 'Roscommon', reg: 'RN' },
    ],
  },
  {
    name: 'ulster',
    counties: [
      { name: 'Donegal', reg: 'DL' },
      { name: 'Monaghan', reg: 'MN' },
      { name: 'Cavan', reg: 'CN' },
    ],
  },
  {
    name: 'leinster',
    counties: [
      { name: 'Longford', reg: 'LD' },
      { name: 'Westmeath', reg: 'WH' },
      { name: 'Louth', reg: 'LH' },
      { name: 'Meath', reg: 'MH' },
      { name: 'Dublin', reg: 'D' },
      { name: 'Wicklow', reg: 'WW' },
      { name: 'Wexford', reg: 'WX' },
      { name: 'Kilkenny', reg: 'KK' },
      { name: 'Carlow', reg: 'CW' },
      { name: 'Kildare', reg: 'KE' },
      { name: 'Laois', reg: 'LS' },
      { name: 'Offaly', reg: 'OY' },
    ],
  },
  {
    name: 'munster',
    counties: [
      { name: 'Cork', reg: 'C' },
      { name: 'Kerry', reg: 'KY' },
      { name: 'Limerick', reg: 'L' },
      { name: 'Clare', reg: 'CE' },
      { name: 'Tipperary', reg: 'T' },
      { name: 'Waterford', reg: 'W' },
    ],
  },
];
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

const divideIntoProvences = (countyData, attribute) => {
  const ans = PROVINCES.map((prov, i) => {
    const names = prov.counties.map((c) => c.name);

    prov.children = countyData.filter((c) => {
      if (names.includes(c.CountyName)) {
        // Also add in the reg numbers, this probably shouldn't be happening inside a filter btw
        c.reg = prov.counties.find((co) => co.name === c.CountyName).reg;
        c.province = prov.name;
        return true;
      }
      return false;
    });
    return prov;
  });

  return ans;
  // return ans;
};

// const withProvinces = (graphData, attribute) => {
//   return { children: divideIntoProvences(graphData, attribute) };
// };
const withoutProvinces = (graphData) => {
  return { children: graphData };
};

const getOpacity = (extent) => d3.scaleLinear().domain(extent).range([0.2, 1]);

const CountyTiles = ({
  graphData,
  attribute,
  showProvinces,
  handleSelectOneCounty,
  selectedAttributeColor
}) => {
  const sortedGraphData = graphData.sort((a, b) => a[attribute] - b[attribute]);

  // Only calling divideIntoProvince() when actually needed causes reg to be missing first time. TODO add reg somewhere more sensible and don't call this until showProvinces is true.
  const withProvinces = { children: divideIntoProvences(graphData, attribute) };

  const dataWithOrWithoutProvinces = showProvinces
    ? withProvinces
    : withoutProvinces(sortedGraphData);

  const extentOfSelectedAttribute = d3.extent(
    graphData,
    (d) => d[attribute] / 10
  );

  const opacity = getOpacity(extentOfSelectedAttribute);
  const root = d3
    .hierarchy(dataWithOrWithoutProvinces)
    .sum((d) => d[attribute]);

  d3
    .treemap()
    .size([width, height])
    .padding(2)
    .paddingTop(15)
    .paddingLeft(10)
    .paddingRight(10)
    .paddingBottom(10)(root);

  return root.leaves().map((tree, i, arr) => {
    console.log(tree);
    const rect = {
      x: tree.x0,
      y: tree.y0,
      width: tree.x1 - tree.x0,
      height: tree.y1 - tree.y0,
      // fill: showProvinces ? color(tree.parent.data.name) : selectedAttributeColor,
      fill: selectedAttributeColor,
      opacity: opacity(tree.data[attribute]),
    };

    return (
      <g
        key={tree.data.CountyName}
        style={{cursor:'pointer'}}
        onClick={()=>handleSelectOneCounty(tree.data.CountyName)}
      >
        <rect
          stroke={rect.stroke}
          fill={rect.fill}
          x={rect.x}
          y={rect.y}
          width={rect.width}
          height={rect.height}
          opacity={rect.opacity}
        />
        {showProvinces &&
        (i === 0 || tree.parent.data.name !== arr[i - 1].parent.data.name) ? (
          <text
            x={rect.x}
            y={rect.y - 4}
            fontSize="0.6rem"
            fontWeight="900"
            fill="var(--yellow)"
          >
            {tree.parent.data.name
              ? tree.parent.data.name.charAt(0).toUpperCase() +
                tree.parent.data.name.slice(1)
              : ''}
          </text>
        ) : null}

        {rect.width > 80 ? (
          <>
            <text
              x={rect.x + 4}
              y={rect.y + 12}
              height="20"
              fontSize="0.6rem"
              fontWeight="900"
              fill="var(--white)"
              style={{ textTransform: 'uppercase', letterSpacing: '0.2rem' }}
            >
              {tree.data.CountyName}{' '}
              {/* {new Date(tree.data.TimeStampDate).toString().substring(0, 16)} ( */}
              {/* ({tree.data[attribute]}) */}
            </text>
            {rect.height > 20 ? (
              <text
                x={rect.x + 4}
                y={rect.y + 22}
                height="20"
                fontSize="0.5rem"
                fontWeight="500"
                fill="var(--white)"
                style={{ textTransform: 'uppercase', letterSpacing: '0.1rem' }}
              >
                {/* {tree.data.CountyName}{' '} */}
                {/* {new Date(tree.data.TimeStampDate).toString().substring(0, 16)} ( */}
                ({Math.round(tree.data[attribute])})
              </text>
            ) : null}
          </>
        ) : (
          <>
            <text
              x={rect.x + 4}
              y={rect.y + 12}
              height="20"
              fontSize={rect.width < 30 ? '0.5rem' : '0.6rem'}
              fontWeight="900"
              fill="var(--white)"
              // stroke="var(--black)"
              // strokeWidth={rect.width < 30 ? '0.05rem' : '0.08rem'}
            >
              {tree.data.reg}{' '}
              {/* {new Date(tree.data.TimeStampDate).toString().substring(0, 16)} ( */}
              {/* ({tree.data[attribute]}) */}
            </text>
            {rect.height > 30 ? (
              <text
                x={rect.x + 4}
                y={rect.y + 22}
                height="20"
                fontSize="0.5rem"
                fontWeight="500"
                fill="var(--white)"
                style={{ textTransform: 'uppercase', letterSpacing: '0.1rem' }}
              >
                {/* {tree.data.CountyName}{' '} */}
                {/* {new Date(tree.data.TimeStampDate).toString().substring(0, 16)} ( */}
                ({Math.round(tree.data[attribute])})
              </text>
            ) : null}
          </>
        )}
      </g>
    );
  });
};

export default CountyTiles;
