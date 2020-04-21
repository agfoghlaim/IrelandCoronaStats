import React, { useState, useEffect } from 'react';
import classes from './section.module.css';
import LineGraph2 from '../LineGraph2/lineGraph2';
import TextBox from '../TextBox/textBox';
const Section = ({ newSections }) => {
  const [newVersionOfSections, setNewVersionOfSections] = useState(
    newSections[0]
  );

  // rename -selectedCountyName
  const [isCountySelected, setIsCountySelected] = useState(false);

  useEffect(() => {
    setNewVersionOfSections(newSections[0]);
  }, [newSections, newVersionOfSections]);

  // ie choose attribute for linegraph
  const handleSelectData = (e) => {
    // set section.name = e.target.name to true
    // all others to false
    const name = e.target.name;
    const sectionUpdate = newVersionOfSections.avail.map((a) => {
      if (a.fieldName === name) {
        // console.log('switch ' + a.fieldName + ' to ' + !a.selected);
        a.selected = true;
      } else {
        a.selected = false;
      }
      return a;
    });

    const newSections = {
      ...newVersionOfSections,
      avail: sectionUpdate,
    };

    setNewVersionOfSections(newSections);
  };

  // TODO - Put into component
  const renderCheckButtons = () => {
    return newVersionOfSections.avail.map((a) => (
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

  // ie. click on county line to show details in textbox
  const handleSelectCounty = (e, county) => {
    // console.log(county);
    const copy = newVersionOfSections;
    copy.selectedCounty = copy.allData.filter(
      (d) => d[0].CountyName === county
    )[0];
    // console.log(copy);
    setNewVersionOfSections(copy);
    setIsCountySelected(county);
  };

  // These don't work yet
  const renderTinyButtons = () => {
    const countyNames = newVersionOfSections.allData.map(a=>{
      return a[0].CountyName;
    })
    // console.log(countyNames)
    return (
      countyNames.map(county =>(
      <button>{county}</button>
      ))
    )
  }

  return (
    <div className={classes.countiesGraphWrap}>
      <div className={classes.countiesGraphLeft}>
        <div className={classes.sectionHeader}>
          <h3>
            {newVersionOfSections.name} <br />
            <small>- counties subtitle</small>
          </h3>
        </div>

        <TextBox
          selectedCountyName={isCountySelected}
          data={newVersionOfSections}
          avail={newVersionOfSections.avail}
        />

        <div className={classes.countiesBtnGroupWrap}>
          {newVersionOfSections && newVersionOfSections.avail
            ? renderCheckButtons()
            : null}
        </div>
        <div className={classes.countiesTinyBtnGroupWrap}>
          {newVersionOfSections && newVersionOfSections.avail
            ? renderTinyButtons()
            : null}
        </div>
      </div>
      <div className={classes.countiesGraphMain}>
        {newVersionOfSections && newVersionOfSections.allData.length ? (
          <LineGraph2
            isCountySelected={isCountySelected}
            handleSelectCounty={handleSelectCounty}
            theNewData={newVersionOfSections}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Section;
