import React from 'react'

const XAxisLabel = ({text, yClass, height, width}) => {
  return (
    <text
    fill="var(--black)"
    x={width/2-110}
    y={height}
    style={{fontSize:'1rem' }}
    className={yClass}
  >
    {text}
  </text>
  )
}

export default XAxisLabel;