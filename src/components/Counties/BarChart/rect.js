import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';

const Rect = ({
  allCountiesLatestData,
  localHandleSelectCounty,
  classes,
  handleHover,
  handleHoverLeave,
  attribute,
  storeSections,
  selectedData,
  margin,
  y,
  rectangle,
}) => {
  const [rect, setRect] = useState(rectangle);

  const prevRectRef = useRef();
  useEffect(() => {
    setRect(rectangle);
    prevRectRef.current = rect;
  }, [rect, rectangle]);
  const prevRect = prevRectRef.current;

  const animationConfig = {
    duration: 200,
    tension: 180,
    friction: 12,
  };

  const rectConfig = {
    from: {
      width: prevRect ? prevRect.width : rect.width,
      height: prevRect ? prevRect.height : rect.height,
      y: prevRect ? prevRect.y : rect.y,
    },
    to: {
      width: rect.width,
      height: rect.height,
      y: rect.y,
    },
    config: animationConfig,
  };
  const rectProps = useSpring(rectConfig);
  return (
    <g key={allCountiesLatestData.CountyName}>
      <animated.rect
        {...rectProps}
        x={margin.left}
        onClick={() =>
          localHandleSelectCounty(allCountiesLatestData.CountyName)
        }
        className={classes.barChartRect}
        onMouseEnter={(e) => handleHover(e, allCountiesLatestData[attribute])}
        onMouseLeave={(e) => handleHoverLeave(e)}
        strokeWidth="1"
        stroke={
          allCountiesLatestData.CountyName ===
          storeSections.allStatsAboutSelectedCounty.name
            ? selectedData.color
            : 'var(--white)'
        }
        fill={
          allCountiesLatestData.CountyName ===
          storeSections.allStatsAboutSelectedCounty.name
            ? 'var(--white)'
            : selectedData.color
        }
        opacity={`${
          allCountiesLatestData.CountyName ===
          storeSections.allStatsAboutSelectedCounty.name
            ? 1
            : 0.85
        }`}
      ></animated.rect>
    </g>
  );
};

export default Rect;
