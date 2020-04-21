import React, { useState, useEffect } from 'react';
import classes from './section.module.css';
import BarChart from '../BarChart/barChart';
import TextBox from '../TextBox/textBox';
const Section = ({
  section,
  handleSelectOneCounty,
  selectedCountyData,
  selectedCountyName,
}) => {
  // county data is in section.avail.data

  // const [sectionData, setSectionData] = useState(section);
  const [sectionAvail, setSectionAvail] = useState(section.avail);

  useEffect(() => {
    // setSectionData(section); // ??
    setSectionAvail(section.avail);
  }, []);

  const handleSelectData = (e) => {
    const name = e.target.name;

    // select one at a time, set everything except name to false
    const sectionUpdate = sectionAvail.map((a) => {
      if (a.fieldName === name) {
        a.selected = true;
      } else {
        a.selected = false;
      }
      return a;
    });
    setSectionAvail(sectionUpdate);
  };

  const renderCheckButtons = () => {
    return sectionAvail.map((a) => (
      <button
        key={a.fieldName}
        id={a.name}
        name={a.fieldName}
        selected={a.selected}
        style={{
          opacity: `${!a.selected ? '0.5' : `1`}`,
          background: `${!a.selected ? 'gray' : `${a.color}`}`,
          border: `${
            !a.selected ? `0.2rem solid ${a.color}` : `0.1rem solid `
          }`,
          outline: 'none',
        }}
        onClick={(e) => handleSelectData(e)}
      >
        {a.name}
      </button>
    ));
  };

  return (
    <div className={classes.countiesGraphWrap}>
      <div className={classes.countiesGraphLeft}>
        <div className={classes.sectionHeader}>
          <h3>
            {section.name} <br />
            <small>- counties subtitle</small>
          </h3>
        </div>

        <TextBox  avail={sectionAvail} data={selectedCountyData} />

        <div className={classes.countiesBtnGroupWrap}>
          {renderCheckButtons()}
        </div>
      </div>
      <div className={classes.countiesGraphMain}>
        <BarChart
          theData={sectionAvail}
          attribute="CovidCases"
          handleSelectOneCounty={handleSelectOneCounty}
          selectedCountyName={selectedCountyName}
        />
      </div>
    </div>
  );
};

export default Section;
