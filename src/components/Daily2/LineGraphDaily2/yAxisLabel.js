import React from 'react'

const YAxisLabel = ({text, yClass, height, margin}) => {
  // console.log("in y axis", text, height)
  return (
    <text
    fill="var(--white)"
    // x={-Math.abs(height / 2 + 50)}
    x={-Math.abs(height-margin.bottom)}
    y="10"
    style={{ transform: 'rotate(-90deg)' }}
    className={yClass}
  >
    {text}
  </text>
  )
}

export default YAxisLabel;