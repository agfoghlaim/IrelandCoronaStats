import React  from 'react';
import * as d3 from 'd3';


const Line = ({
  graphData,
  altGraphData,
  xScale,
  yScale,
  fieldName,
  color,
  xAxisAttribute

}) => {

  const line = d3
  .line()
  .x((d) => {
    // console.log("calc", altGraphData.attrData.length)
    return xScale(d[xAxisAttribute])
  })
  .y((d) => {
    // console.log(d[fieldName])
    return yScale(d[fieldName]);
  })

const path = line(altGraphData);

return (
  <path
  
    d={path}
    fill="none"
    stroke={color}
    id={fieldName}
    strokeWidth={altGraphData.selected ? '4px' : '2px'}
  ></path>
);

  // const line = d3
  //   .line()
  //   .x((d) => {
  //     console.log("calc", graphData.length)
  //   return xScale(d[xAxisAttribute])
  // })
  //   .y((d) => {
     
  //     return yScale(d[fieldName]);
  //   });

  // const path = line(graphData);

  // return (
  //   <path
  //     d={path}
  //     fill="none"
  //     stroke={color}
  //     id={fieldName}
  //     strokeWidth={graphData.selected ? '4px' : '2px'}
  //   ></path>
  // );
};

export default Line;
