import React from 'react';

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
        stroke={rect.stroke}
        strokeWidth="0.1rem"
        // fill={rect.fill}
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
          x={rect.x}
          y={rect.y - 4}
          fontSize="0.6rem"
          fontWeight="900"
          fill="var(--yellow)"
        >
          {tree.parent.data.name
            ? tree.parent.data.name.charAt(0).toUpperCase() +
              tree.parent.data.name.slice(1)
            : ''}
        </text>
      ) : null}

      {/* If rect is ~wide enough show county name, otherwise show county reg */}
      {rect.width > 80 ? (
        <>
          <text
            x={rect.x + 4}
            y={rect.y + 12}
            height="20"
            fontSize="0.6rem"
            fontWeight="900"
            fill={rect.isSelected ? 'var(--lightBlack)' : 'var(--white)'}
            // fill="var(--white)"
            style={{ textTransform: 'uppercase', letterSpacing: '0.2rem' }}
          >
            {tree.data.CountyName}{' '}
          </text>
          {rect.height > 20 ? (
            <text
              x={rect.x + 4}
              y={rect.y + 22}
              height="20"
              fontSize="0.5rem"
              fontWeight="500"
              fill={rect.isSelected ? 'var(--lightBlack)' : 'var(--white)'}
              // fill="var(--white)"
              style={{ textTransform: 'uppercase', letterSpacing: '0.1rem' }}
            >
              ({Math.round(tree.data[attribute])})
            </text>
          ) : null}
        </>
      ) : (
        <>
          <text
            x={rect.x + 4}
            y={rect.y + 12}
            height="20"
            fontSize={rect.width < 30 ? '0.5rem' : '0.6rem'}
            fontWeight="900"
            fill={rect.isSelected ? 'var(--lightBlack)' : 'var(--white)'}
            // fill="var(--white)"
          >
            {tree.data.reg}{' '}
          </text>
          {rect.height > 30 ? (
            <text
              x={rect.x + 4}
              y={rect.y + 22}
              height="20"
              fontSize="0.5rem"
              fontWeight="500"
              fill={rect.isSelected ? 'var(--lightBlack)' : 'var(--white)'}
              // fill="var(--white)"
              style={{ textTransform: 'uppercase', letterSpacing: '0.1rem' }}
            >
              ({Math.round(tree.data[attribute])})
            </text>
          ) : null}
        </>
      )}
    </g>
  );
};

export default CountyTile;
