import React from 'react'

const XAxisLabel = ({text, yClass, height, width, margin}) => {
  return (
    <text
    fill="var(--white)" // for dark graph theme
    x={margin.right}
    y={height-10}
    style={{fontSize:'1rem', fontWeight: 700 }}
    className={yClass}
  >
    {text}
  </text>
  )
}

export default XAxisLabel;