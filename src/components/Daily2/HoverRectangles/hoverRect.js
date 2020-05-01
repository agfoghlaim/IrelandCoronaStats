import React, { useState } from 'react';

const HoverRect = ({
  rect,
  graphData,
  attr,
  handleHoverDate,
  handleHoverLeaveDate,
  handleTextBox,
  selected,
  date,
  selectRect,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const localHandleHover = (e) => {
    setIsHovered(true);
    handleHoverDate(e, attr, graphData.fieldName, graphData);
  };
  const localHandleHoverLeave = (e) => {
    setIsHovered(false);
    handleHoverLeaveDate(e);
  };

  const localHandleTextBox = (attr, fieldName, graphData) => {
    selectRect(date);

    handleTextBox(attr, fieldName, graphData);
  };

  return (
    <rect
      key={rect.key}
      onMouseEnter={(e) =>
        localHandleHover(e, attr, graphData.fieldName, graphData)
      }
      onMouseLeave={(e) => localHandleHoverLeave(e)}
      x={rect.xOffset}
      y={rect.y}
      width={rect.rectWidth}
      height={rect.height}
      fill="var(--white)"
      style={{ transition: 'all 0.005s linear', cursor: 'pointer' }}
      // opacity={`${isHovered ? '0.2' : '0'}`}
      // onClick={() => handleTextBox(attr, graphData.fieldName, graphData)}
      opacity={`${isHovered || selected ? '0.2' : '0'}`}
      onClick={() => localHandleTextBox(attr, graphData.fieldName, graphData)}
    />
  );
};

export default HoverRect;
