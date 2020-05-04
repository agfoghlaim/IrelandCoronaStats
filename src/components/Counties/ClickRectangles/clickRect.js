import React, { useState } from 'react';

const ClickRect = ({
  rect,
  date,
  handleHoverDate,
  handleHoverLeaveDate,
  handleSelectDate,
  selected,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const localHandleHover = (e, date) => {
    setIsHovered(true);
    handleHoverDate(e, date);
  };
  const localHandleHoverLeave = (e) => {
    setIsHovered(false);
    handleHoverLeaveDate(e);
  };

  return (
    <>
      <rect
        onMouseEnter={(e) => localHandleHover(e)}
        onMouseLeave={(e) => localHandleHoverLeave(e)}
        x={rect.xOffset}
        y={
          selected
            ? `${rect.y + (rect.height / 50 - rect.height / 40)}`
            : `${rect.y}`
        }
        width={rect.rectWidth}
        height={selected ? `${rect.height / 40}` : `${rect.height / 50}`}
        stroke={`${isHovered ? 'var(--orange)' : 'var(--white)'}`}
        fill={`${selected ? 'var(--lightBlack)' : 'var(--orange)'}`}
        style={{ transition: 'all 0.005s linear', cursor: 'pointer' }}
        opacity="0.8"
        onClick={() => {
      
          return handleSelectDate(date);
        }}
      />
      <rect
        x={rect.xOffset}
        y={rect.y2}
        width={rect.rectWidth}
        height={selected ? `${rect.y2Height}` : `0`}
        stroke={`${isHovered ? 'var(--purple)' : 'var(--white)'}`}
        opacity="0.1"
        fill={`${selected ? 'var(--white)' : 'var(--lightBlack)'}`}
        style={{ transition: 'all 0.005s linear', cursor: 'pointer' }}
      />
    </>
  );
};

export default ClickRect;
