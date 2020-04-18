import React, { useState, useEffect, useRef } from 'react';
import classes from './section.module.css';
import axios from 'axios';
import LineGraph from '../LineGraph/lineGraph';
// import GraphTinyTextBox from '../TextBox/graphTinyTextBox';
import TextBox from '../TextBox/textBox';

const baseUrl = (specificUrlPart) =>
  `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=${specificUrlPart}&outSR=4326&f=json`;

const Section = ({ section }) => {
  const [sectionData, setSectionData] = useState(section);
  const [sectionAvail, setSectionAvail] = useState(section.avail);
  const [shouldUpdate, setShouldUpdate] = useState(true);
  const [tinyTextAttr, setTinyTextAttr] = useState('');
  const [tinyTextData, setTinyTextData] = useState();
  const shouldCancel = useRef(false);

  useEffect(() => {
    setSectionData();
  }, [section, sectionAvail]);

  const removeNulls = (resp, fieldName) => {
    const noNulls = resp.filter((m) => {
      for (const i in m.attributes) {
        return m.attributes[fieldName] !== null;
      }
    });
    return noNulls;
  };
  const getOne = async (part) => {
    try {
      const response = await axios.get(baseUrl(part));
      return response.data.features;
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    (async () => {
      const getDataForEachSelectedCheckbox = async () => {
        let sectionAvailCopy = sectionAvail;

        const getAllSelectedData = async () =>
          await Promise.all(
            sectionAvailCopy.map(async (a) => {
              if (a.selected) {
                const response = await getOne(a.urlPart);

                // data from the beginning of records but first few weeks are all null for profile stats
                const filteredResponse = removeNulls(response, a.fieldName);
                a.data = filteredResponse;
                return a;
              }
              return a;
            })
          );

        sectionAvailCopy = await getAllSelectedData();

        if (shouldCancel.current) {
          return false;
        }

        setSectionAvail(sectionAvailCopy);

        // set tiny text box to <find selected section>.data.<last>
        const selectedSection = sectionAvailCopy.find((s) => s.selected);

        setTinyTextAttr(selectedSection.fieldName);
        setTinyTextData(selectedSection.data[selectedSection.data.length - 1]);
        setShouldUpdate(false);
      };

      if (shouldUpdate) {
        await getDataForEachSelectedCheckbox();
      }
    })();
  }, [sectionAvail, shouldUpdate]);

  const handleTextBox = (data, selectedAttribute) => {
console.log(data, selectedAttribute )
    if (!data || !selectedAttribute) return;
    setTinyTextData(data);
    setTinyTextAttr(selectedAttribute);
  };

  const renderLineGraph = () => {
    if (!sectionAvail || !sectionAvail.length) {
      return;
    }
    return (
      <LineGraph
        theData={sectionAvail}
        section={sectionData}
        handleTextBox={handleTextBox}
      />
    );
  };

  const handleSelectData = (e) => {
    const name = e.target.name;
    const sectionUpdate = sectionAvail.map((a) => {
      if (a.fieldName === name) {
        // console.log('switch ' + a.fieldName + ' to ' + !a.selected);
        a.selected = !a.selected;
      }
      return a;
    });
    setSectionAvail(sectionUpdate);

    // Check if already have the data first
    const haveData = (name) => {
      const checkThis = sectionAvail.filter((s) => s.fieldName === name)[0];
      return checkThis && checkThis.data.length ? false : true;
    };
    const needToGetData = haveData(name);

    if (needToGetData) {
      setShouldUpdate(true);
    }
  };

  const renderCheckButtons = () => {
    return section.avail.map((a) => (
      <button
        key={a.fieldName}
        id={a.name}
        name={a.fieldName}
        selected={a.selected}
        style={{
          opacity: `${a.selected ? '0.5' : `1`}`,
          background: `${a.selected ? 'gray' : `${a.color}`}`,
          border: `${a.selected ? `0.2rem solid ${a.color}` : `0.1rem solid `}`,
          outline: 'none',
        }}
        onClick={(e) => handleSelectData(e)}
      >
        {a.name}
      </button>
    ));
  };

  return (
    <>
      <div className={classes.profileStatsGraphWrap}>
        <div className={classes.profileStatsGraphLeft}>
          <div className={classes.sectionHeader}>
            <h3>{section.sectionName}</h3>
          </div>

          {/* {tinyTextAttr && tinyTextData ? (
            <GraphTinyTextBox
              data={tinyTextData}
              attributeForBoxTitle={tinyTextAttr}
              attributeForDate={sectionAvail.xAxisAttribute}
              temp_theData={sectionAvail}
              temp_section={sectionData}
            />
          ) : (
            <div
              style={{
                background: 'var(--white)',
                borderRadius: '0.4rem',
                height: '8rem',
              }}
            ></div>
          )} */}
          {
            tinyTextAttr && tinyTextData ? (
              <TextBox avail={sectionAvail} attributeForDate={sectionAvail.xAxisAttribute} data={tinyTextData} />
            ) : null
          } 
      

          <div className={classes.graphSectionBtnGroupWrap}>
            {renderCheckButtons()}
          </div>
        </div>
        <div className={classes.profileStatsGraphMain}>{renderLineGraph()}</div>
      </div>
    </>
  );
};

export default Section;
