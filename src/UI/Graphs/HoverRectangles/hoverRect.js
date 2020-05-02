import React, { useState } from 'react';

const HoverRect = ({
  rect,
  // graphData,
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

  return (
    <rect
      key={rect.key}
      onMouseEnter={(e) =>
        localHandleHover(e)
      }
      onMouseLeave={(e) => localHandleHoverLeave(e)}
      x={rect.xOffset}
      y={rect.y}
      width={rect.rectWidth}
      height={rect.height}
      fill="var(--white)" // for dark graph theme
      style={{ transition: 'all 0.005s linear', cursor: 'pointer' }}
      opacity={`${isHovered || selected ? '0.2' : '0'}`}
      onClick={() => localHandleTextBox(attr)}
    />
  );
};

export default HoverRect;
