import React, { useState, useEffect, useRef } from 'react';
import classes from './section.module.css';
import axios from 'axios';
import LineGraph from '../LineGraph/lineGraph';
import TextBox from '../TextBox/textBox';
import ErrorComp from '../../../UI/error';

const baseUrl = (specificUrlPart) =>
  `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=${specificUrlPart}&outSR=4326&f=json`;

const Section = ({ section }) => {
  const [sectionData, setSectionData] = useState(section);
  const [sectionAvail, setSectionAvail] = useState(section.avail);
  const [shouldUpdate, setShouldUpdate] = useState(true);
  const [tinyTextAttr, setTinyTextAttr] = useState('');
  const [tinyTextData, setTinyTextData] = useState();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      setIsError(false);
      setIsLoading(true);
      const response = await axios.get(baseUrl(part));

      setIsLoading(false);
      // if(!response || response.status !== 200) return false;
      return response.data.features;
    } catch (e) {

      setIsError(true);
      setIsLoading(false);
      return false;
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
                const features = await getOne(a.urlPart);
           
                if ( features ) {
                  // data from the beginning of records but first few weeks are all null for profile stats
                  const filteredFeatures = removeNulls(features, a.fieldName);
                  a.data = filteredFeatures;
                  return a;
                }
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
  }, [sectionAvail, shouldUpdate, isError, isLoading]);

  const handleTextBox = (data, selectedAttribute) => {
    console.log(data, selectedAttribute )
    if (!data || !selectedAttribute) return;
    setTinyTextData(data);
    setTinyTextAttr(selectedAttribute);
  };

  const renderLineGraph = () => {
    if (!sectionAvail || !sectionAvail.length ) {
      return;
    }
    return (
      <LineGraph
        theData={sectionAvail}
        // section={sectionData}
        yAxisLabel={section.yAxisLabel}
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
          border: `${a.selected ? `0.1rem solid ${a.color}` : `0.1rem solid `}`,
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
      {isError ? <ErrorComp msg="Could not load data." /> : null}

        <div className={classes.profileStatsGraphWrap}>
          <div className={classes.profileStatsGraphLeft}>
            <div className={classes.sectionHeader}>
              <h3>{section.sectionName}</h3>
              <p>{section.description}</p>
            </div>

            {tinyTextAttr && tinyTextData ? (
              <TextBox
                avail={sectionAvail}
                attributeForDate={sectionAvail.xAxisAttribute}
                data={tinyTextData}
              />
            ) : null}

            <div className={classes.graphSectionBtnGroupWrap}>
              {renderCheckButtons()}
            </div>
          </div>
          <div className={classes.profileStatsGraphMain}>
            {renderLineGraph()}
          </div>
        </div>
 
    </>
  );
};

export default Section;
