import * as d3 from 'd3';
import React from 'react';
import CountyTile from './countyTile';

// const color = d3
//   .scaleOrdinal()
//   .domain(['ulster', 'munster', 'connaught', 'leinster'])
//   .range([
//     'var(--covidGreen)',
//     'var(--covidBlue)',
//     'var(--covidPurple)',
//     'var(--covidYellow)',
//   ]);

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

// const getOpacity = (extent) => d3.scaleLinear().domain(extent).range([0.2, 1]);
// const getOpacity = (extent) => d3.scaleQuantize().domain(extent).range([0.6,0.7,0.8,0.9, 1]);
const getOpacity = (graphData, attribute) =>
  d3
    .scaleQuantile()
    .domain(graphData.map((d) => d[attribute]))
    .range([0.6, 0.7, 0.8, 0.9, 1]);

const CountyTiles = ({
  graphData,
  attribute,
  showProvinces,
  handleSelectOneCounty,
  selectedAttributeColor,
  selectedCountyName,
}) => {
  const sortedGraphData = graphData.sort((a, b) => a[attribute] - b[attribute]);

  // Only calling divideIntoProvince() when actually needed causes reg to be missing first time. TODO add reg somewhere more sensible and don't call this until showProvinces is true.
  const withProvinces = { children: divideIntoProvences(graphData, attribute) };

  const dataWithOrWithoutProvinces = showProvinces
    ? withProvinces
    : withoutProvinces(sortedGraphData);


  const opacity = getOpacity(graphData, attribute);
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
    const rect = {
      x: tree.x0,
      y: tree.y0,
      width: tree.x1 - tree.x0,
      height: tree.y1 - tree.y0,
      fill: selectedAttributeColor,
      stroke:
        tree.data.CountyName === selectedCountyName ? 'var(--white)' : 'none',
      opacity: opacity(tree.data[attribute]),
    };

    return (
      <CountyTile 
        tree={tree}
        rect={rect}
        handleSelectOneCounty={handleSelectOneCounty}
        showProvinces={showProvinces}
        i={i}
        arr={arr}
        attribute={attribute}
      />
    );
  });
};

export default CountyTiles;
