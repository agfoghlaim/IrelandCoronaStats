import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

const HoverRect = ({
  rect,
  attr, // the actual data (from api attributes:{})
  handleHoverDate,
  handleHoverLeaveDate,
  xAxisAttribute, // name of 'date' field - Date / StatisticsProfileDate
  handleTextBox,
  selected,
  date,
  selectRect,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  //set for first time
  useEffect(() => {
    selectRect(date);
    // eslint-disable-next-line
  }, []);

  const localHandleHover = (e) => {
    setIsHovered(true);
    handleHoverDate(e, attr);
  };

  const localHandleHoverLeave = (e) => {
    setIsHovered(false);
    handleHoverLeaveDate(e);
  };

  const localHandleTextBox = (attr) => {
    selectRect(date);
    handleTextBox(attr, xAxisAttribute);
  };

  const x = rect.x;
  const half = x - rect.xOffset;
  const y = rect.y;
  const w = rect.rectWidth;

  return (
    <g>
      <polygon
        opacity={`${selected ? '1' : '0'}`}
        stroke="var(--yellow)"
        strokeWidth="0.15rem"
        strokeLinejoin='round'
        fill="var(--yellow)"
        points={`
          ${x},${y}
          ${x - w / 2},${y -(w/1.2) }
          ${x + half},${y -(w/1.2) } 
        `}
      />

      <rect
        key={rect.key}
        onMouseEnter={(e) => localHandleHover(e)}
        onMouseLeave={(e) => localHandleHoverLeave(e)}
        x={rect.xOffset}
        y={rect.y}
        width={rect.rectWidth}
        height={rect.height}
        fill="var(--white)" // for dark graph theme
        style={{ transition: 'all 0.005s linear', cursor: 'pointer' }}
        opacity={`${isHovered ? '0.2' : selected ? '0.1' : '0'}`}
        onClick={() => localHandleTextBox(attr)}
      />
    </g>
  );
};

export default HoverRect;
