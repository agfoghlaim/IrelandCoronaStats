import React, {useMemo, useCallback} from 'react';
import classes from './section.module.css';
import LineGraph2 from '../LineGraph2/lineGraph2';
import TextBox from '../TextBox/textBox';
import { useStore } from '../../../Store/store';

const Section = () => {

  const testDispatch = useStore()[1];
  const sections = useStore()[0].sections[0];
  console.log("Sections ", sections)
  // choose attribute for line graph
  const handleSelectData = (e) => {
    const fieldName = e.target.name;
    testDispatch('SELECT_ATTRIBUTE', fieldName);
  };

  // TODO - Put into component
  const renderCheckButtons = () => {
    return sections.avail.map((a) => (
      <button
        key={a.fieldName}
        id={a.name}
        name={a.fieldName}
        selected={a.selected}
        style={{
          opacity: `${!a.selected ? '0.7' : `1`}`,
          background: `${a.selected ? `${a.color}` : `var(--lightBlack)`}`,
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

  // click on county line/tinyBtn to show details in textbox
  const handleSelectCounty = (e, county) => {
    const name = county || e.target.id;
    testDispatch('SELECT_COUNTY', name);
  };

  const renderTinyButtons = () => {
    if (sections.allCounties.length) {
      return sections.allCounties.map((county) => {
        return (
          <button
            style={{
              border: `${county.selected ? `none` : `0.2rem solid ${county.color}`}`,
              background: `${county.selected ? `${county.color}` : `var(--lightBlack)`}`,
              color: `${county.selected ? 'var(--lightBlack)' : 'var(--white)'}`,
              fontWeight: '700', 
            }}
            id={county.name}
            key={county.name}
            onClick={(e) => handleSelectCounty(e)}
          >
            {county.name}
          </button>
        );
      });
    }
  };

  return (
    <div className={classes.countiesGraphWrap}>
      <div className={classes.countiesGraphLeft}>
        <div className={classes.sectionHeader}>
          <h3>
            {sections.name} <br />
            <small>- counties subtitle</small>
          </h3>
        </div>

        <TextBox />

        <div className={classes.countiesBtnGroupWrap}>
          {sections && sections.avail
            ? renderCheckButtons()
            : null}
        </div>
        <div className={classes.countiesTinyBtnGroupWrap}>
          {sections && sections.avail
            ? renderTinyButtons()
            : null}
        </div>
      </div>
      <div className={classes.countiesGraphMain}>
        {sections &&
        sections.allCounties.length ? (
          <LineGraph2
            // isCountySelected={isCountySelected}
            handleSelectCounty={handleSelectCounty}
            theNewData={sections}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Section;
