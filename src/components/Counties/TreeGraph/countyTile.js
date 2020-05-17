import React from 'react';
import classes from './countyTile.module.css';

const CountyTile = ({
  tree,
  rect,
  handleSelectOneCounty,
  showProvinces,
  i,
  arr,
  attribute,
}) => {
  return (
    <g
      key={tree.data.CountyName}
      style={{ cursor: 'pointer' }}
      onClick={() => handleSelectOneCounty(tree.data.CountyName)}
    >
      {/* white background - otherwise low numbers are darker than high (not intuitive) */}
      <rect
        stroke={rect.stroke}
        strokeWidth="0.1rem"
        fill="var(--white)"
        x={rect.x}
        y={rect.y}
        width={rect.width}
        height={rect.height}
        opacity="1"
      />
      <rect
        className={classes.countyTileRect}
        stroke={rect.stroke}
        strokeWidth="0.1rem"
        fill={rect.isSelected ? 'var(--white)' : rect.fill}
        x={rect.x}
        y={rect.y}
        width={rect.width}
        height={rect.height}
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
          <text
           className={classes.countyText}
            x={rect.x + 4}
            y={rect.y + 16}
            height="20"
            fontSize="1rem"
            fill={rect.isSelected ? 'var(--lightBlack)' : 'var(--white)'}
          >
            {tree.data.CountyName}{' '}
          </text>
          {/*  Only if rect is ~tall enough show number */}
          {rect.height > 30 ? (
            <text
              className={classes.numText}
              x={rect.x + 4}
              y={rect.y + 34}
              height="20"
              fontSize="0.9rem"
              fill={rect.isSelected ? `${rect.fill}` : 'var(--white)'}
            >  
              ({Math.round(tree.data[attribute]).toLocaleString()})
            </text>
          ) : null}
        </>
      ) : (
        <>
          <text
            className={classes.countyText}
            x={rect.x + 4}
            y={rect.y + 16}
            height="20"
            fontSize={rect.width < 30 ? '1rem' : '1rem'}
            fill={rect.isSelected ? 'var(--lightBlack)' : 'var(--white)'}
          >
            {tree.data.reg}{' '}
          </text>
          {rect.height > 30 ? (
            <text
              className={classes.numText}
              x={rect.x + 4}
              y={rect.y + 34}
              height="20"
              fontSize="1rem"
              fill={rect.isSelected ? `${rect.fill}` : 'var(--white)'}
            >
              ({Math.round(tree.data[attribute]).toLocaleString()})
            </text>
          ) : null}
        </>
      )}
    </g>
  );
};

export default CountyTile;
