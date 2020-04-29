import React from 'react'

const XAxisLabel = ({text, yClass, height, width}) => {
  return (
    <text
    // fill="var(--black)"
    fill="var(--white)" // for dark graph theme
    x={width/2-110}
    y={height-10}
    style={{fontSize:'1rem' }}
    className={yClass}
  >
    {text}
  </text>
  )
}

export default XAxisLabel;