import React from 'react';
import * as d3 from 'd3';
import CountyTile from './countyTile';
import { COUNTIES } from '../../../constants';
import { useSpring, animated } from 'react-spring';

const { PROVINCES } = COUNTIES;
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
const { width, height } = dimensions;

// TODO - leaving this here for now
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

const withoutProvinces = (graphData) => {
  return { children: graphData };
};

// const getOpacity = (extent) => d3.scaleLinear().domain(extent).range([0.2, 1]);
// const getOpacity = (extent) => d3.scaleQuantize().domain(extent).range([0.6,0.7,0.8,0.9, 1]);
const getOpacity = (graphData, attribute) =>
  d3
    .scaleQuantile()
    .domain(graphData.map((d) => d[attribute]))
    .range([0.5,0.6, 0.7, 0.8]);



const CountyTiles = ({
  graphData,
  attribute,
  showProvinces,
  handleSelectOneCounty,
  selectedAttributeColor,
  selectedCountyName,
}) => {
  // TODO, this should happen automatically in store maybe? Definitely too much sorting going on here.
  const sortedGraphData = graphData.sort((a, b) => a[attribute] - b[attribute]);

  // Only calling divideIntoProvince() when actually needed causes reg to be missing first time. TODO add reg somewhere more sensible and don't call this until showProvinces is true.
  const withProvinces = { children: divideIntoProvences(graphData, attribute) };

  const dataWithOrWithoutProvinces = showProvinces
    ? withProvinces
    : withoutProvinces(sortedGraphData);

  const opacity = getOpacity(graphData, attribute, selectedAttributeColor);

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
   
      isSelected: tree.data.CountyName === selectedCountyName ? true : false,
      x: tree.x0,
      y: tree.y0,
      width: tree.x1 - tree.x0,
      height: tree.y1 - tree.y0,
      fill: selectedAttributeColor,
  
      stroke:
        tree.data.CountyName === selectedCountyName ? 'var(--white)' : 'none',
      opacity: opacity(tree.data[attribute]),
      // newColor: newColor(tree.data[attribute])
    };

    return (
      <CountyTile
        key={i}
        tree={tree}
        rectX={rect}
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
