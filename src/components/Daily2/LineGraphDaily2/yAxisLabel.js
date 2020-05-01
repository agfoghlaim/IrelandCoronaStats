import React from 'react'

const YAxisLabel = ({text, yClass, height}) => {
  // console.log("in y axis", text, height)
  return (
    <text
    fill="var(--white)"
    x={-Math.abs(height / 2 + 100)}
    y="20"
    style={{ transform: 'rotate(-90deg)' }}
    className={yClass}
  >
    {text}
  </text>
  )
}

export default YAxisLabel;