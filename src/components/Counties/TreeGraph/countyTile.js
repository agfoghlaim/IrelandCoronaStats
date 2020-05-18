import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import classes from './countyTile.module.css';

const CountyTile = ({
  tree,
  rectX,
  handleSelectOneCounty,
  showProvinces,
  i,
  arr,
  attribute,
}) => {
  const [rect, setRect] = useState(rectX);

  const prevRectRef = useRef();
  useEffect(() => {
    setRect(rectX);
    prevRectRef.current = rect;
  }, [rect, rectX]);
  const prevRect = prevRectRef.current;

  const animationConfig = {
    duration: 250,
    tension: 120,
    friction: 14,
    clamp: true,
  };

  const rectConfig = {
    from: {
      width: prevRect ? prevRect.width : rect.width,
      height: prevRect ? prevRect.height : rect.height,
      x: prevRect ? prevRect.x : rect.x,
      y: prevRect ? prevRect.y : rect.y,
    },
    to: {
      width: rect.width,
      height: rect.height,
      x: rect.x,
      y: rect.y,
    },
    config: animationConfig,
  };

  const textConfig = {
    from: {
      x: prevRect ? prevRect.x + 4 : rect.x + 4,
      y: prevRect ? prevRect.y + 16 : rect.y + 16,
    },
    to: {
      x: rect.x + 4,
      y: rect.y + 16,
    },
    config: animationConfig,
  };

  const numConfig = {
    from: {
      x: prevRect ? prevRect.x + 4 : rect.x + 4,
      y: prevRect ? prevRect.y + 34 : rect.y + 34,
    },
    to: {
      x: rect.x + 4,
      y: rect.y + 34,
    },
    config: animationConfig,
  };
  const rectProps = useSpring(rectConfig);
  const textProps = useSpring(textConfig);
  const numProps = useSpring(numConfig);

  return (
    <g
      key={tree.data.CountyName}
      onClick={() => handleSelectOneCounty(tree.data.CountyName)}
    >
      {/* white background - otherwise low numbers are darker than high (not intuitive) */}
      <animated.rect
        {...rectProps}
        stroke={rect.stroke}
        strokeWidth="0.1rem"
        fill="var(--white)"
        opacity="1"
      />

      <animated.rect
        {...rectProps}
        className={classes.countyTileRect}
        stroke={rect.stroke}
        strokeWidth="0.1rem"
        fill={rect.isSelected ? 'var(--white)' : rect.fill}
        opacity={rect.opacity}
      />
      {/* Add Province names */}
      {showProvinces &&
      (i === 0 || tree.parent.data.name !== arr[i - 1].parent.data.name) ? (
        <text
          className={classes.provinceText}
          x={rect.x}
          y={rect.y - 4}
          fill="var(--yellow)"
        >
          {tree.parent.data.name
            ? tree.parent.data.name.charAt(0).toUpperCase() +
              tree.parent.data.name.slice(1)
            : ''}
        </text>
      ) : null}

      {/* If rect is ~wide enough show county name, otherwise show county reg */}
      {rect.width > 100 ? (
        <>
          <animated.text
            {...textProps}
            className={classes.countyText}
            height="20"
            fontSize="1rem"
            fill={rect.isSelected ? 'var(--lightBlack)' : 'var(--black)'}
          >
            {tree.data.CountyName}{' '}
          </animated.text>
          {/*  Only if rect is ~tall enough show number */}
          {rect.height > 30 ? (
            <animated.text
              className={classes.numText}
              {...numProps}
              height="20"
              fontSize="0.9rem"
              fill={rect.isSelected ? `${rect.fill}` : 'var(--black)'}
            >
              ({Math.round(tree.data[attribute]).toLocaleString()})
            </animated.text>
          ) : null}
        </>
      ) : (
        <>
          <animated.text
            className={classes.countyText}
            {...textProps}
            height="20"
            fontSize={rect.width < 30 ? '1rem' : '1rem'}
            fill={rect.isSelected ? 'var(--lightBlack)' : 'var(--black)'}
          >
            {tree.data.reg}{' '}
          </animated.text>
          {rect.height > 30 ? (
            <animated.text
              className={classes.numText}
              {...numProps}
              height="20"
              fontSize="1rem"
              fill={rect.isSelected ? `${rect.fill}` : 'var(--black)'}
            >
              ({Math.round(tree.data[attribute]).toLocaleString()})
            </animated.text>
          ) : null}
        </>
      )}
    </g>
  );
};

export default CountyTile;
