import React, {useState, useEffect} from 'react'
import classes from './section.module.css';
import BarChart from '../BarChart/barChart';
import TextBox from '../TextBox/textBox';
const Section = ({cases, proportion, section, handleSelectOneCounty, selectedCountyData, selectedCountyName}) => {

  // counties.js sends alldata via props
  // better than doing loads of requests?
  // sort it here? or recieve it in section.avail.data?

  const [countyCases, setCountyCases] = useState(cases);
  const [ countyProportion, setCountyProportion] = useState(proportion);
  const [sectionData, setSectionData] = useState(section);
  const [sectionAvail, setSectionAvail] = useState(section.avail);

  // console.log(section)
  useEffect(()=>{
    setSectionData(section); // ??
    setSectionAvail(section.avail);
  },[])

  const handleSelectData = (e) => {
    // this is select one at a time
    // set everything to false first;

    const name = e.target.name;
    const sectionUpdate = sectionAvail.map((a) => {
      if (a.fieldName === name) {
        // console.log('switch ' + a.fieldName + ' to ' + !a.selected);
        a.selected = true;
      }else{
        a.selected = false;
      }
      return a;
    });
    setSectionAvail(sectionUpdate);
  };

  // const putIntoCorrectSection = (data, fieldName) => {  
  //     const toUpdate = section.avail.map(a=>{
  //       if(a.fieldName === fieldName) {
  //         a.data = data;
  //       }
  //       return a;
  //     });
  //     console.log(toUpdate)
  //     return toUpdate;
  // }
  // putIntoCorrectSection(cases, key);

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
          border: `${!a.selected ? `0.2rem solid ${a.color}` : `0.1rem solid `}`,
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
            Counties <br />
            <small>- counties subtitle</small>
          </h3>
        </div>

        
          {/* <GraphTinyTextBox
            data={testIdeaData}
            attributeForBoxTitle={testIdeaAttr}
          /> */}
     
          <TextBox data={selectedCountyData} />
        

        <div className={classes.countiesBtnGroupWrap}>
          {renderCheckButtons()}
        </div>
      </div>
      <div className={classes.countiesGraphMain}>
        <BarChart cases={countyCases} theData={sectionAvail} attribute="ConfirmedCovidCases" handleSelectOneCounty={handleSelectOneCounty} selectedCountyName={selectedCountyName} />
      </div>
    </div>
  );
}

export default Section;