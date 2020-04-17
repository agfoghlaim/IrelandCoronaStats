import React, { useState, useEffect, useRef } from 'react';
import classes from './graphSection.module.css';
import Axios from 'axios';
import LineGraphCheckBoxes from './lineGraphCheckBoxes';
// import GraphTextBox from './graphTextBox';
import GraphTinyTextBox from './graphTinyTextBox';

const baseUrl = (specificUrlPart) =>
  `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=${specificUrlPart}&outSR=4326&f=json`;

const GraphSectionCheckBoxes = ({ section }) => {
  console.log("here")
  const [sectionData, setSectionData] = useState(section);
  const [sectionAvail, setSectionAvail] = useState(section.avail);
  const [shouldUpdate, setShouldUpdate] = useState(true);

  const [tinyTextAttr, setTinyTextAttr] = useState('');
  const [tinyTextData, setTinyTextData] = useState();
  const shouldCancel = useRef(false);

  useEffect(() => {
   
      setSectionData();
    
      // return () => {
      //   shouldCancel.current = true;
      // };
  }, [section, sectionAvail]);
  useEffect(()=>{
    return () => {
      shouldCancel.current = true;
    };
  },[])
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
      const response = await Axios.get(baseUrl(part));
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
                const filteredResponse = removeNulls(response, a.fieldName);
                // console.log('response length ' + filteredResponse.length);
                a.data = filteredResponse;
                return a;
              }
              return a;
            })
          );
        
        sectionAvailCopy = await getAllSelectedData();

        if(shouldCancel.current){
          return false;
        }
   
        setSectionAvail(sectionAvailCopy);
  
        // set tiny text box to <find selected section>.data.<last>
        const selectedSection = sectionAvailCopy.find((s) => s.selected);
    
        setTinyTextAttr(selectedSection.fieldName);
        setTinyTextData(selectedSection.data[selectedSection.data.length - 1]);
        setShouldUpdate(false);
    
      };
      
      if (shouldUpdate ) {
        await getDataForEachSelectedCheckbox();
      }

    })();
  }, [sectionAvail, shouldUpdate]);

  const handleTextBox = (data, selectedAttribute) => {
    if (!data || !selectedAttribute) return;
    setTinyTextData(data);
    setTinyTextAttr(selectedAttribute);
  };

  const renderLineGraph = () => {
    if (!sectionAvail || !sectionAvail.length) {
      console.log("no");
      return
    };
    return (
      <LineGraphCheckBoxes
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

    // Should check if already have the data first
    const haveData = (name) => {
      const checkThis = sectionAvail.filter((s) => s.fieldName === name)[0];
      return checkThis && checkThis.data.length ? false : true;
    };
    const needToGetData = haveData(name);

    if (needToGetData ) {

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

          {tinyTextAttr && tinyTextData ? (
            <GraphTinyTextBox
              data={tinyTextData}
              attributeForBoxTitle={tinyTextAttr}
              attributeForDate={sectionAvail.xAxisAttribute}
            />
          ) : (
            <div
              style={{
                background: 'var(--white)',
                borderRadius: '0.4rem',
                height: '8rem',
              }}
            ></div>
          )}

          <div className={classes.graphSectionBtnGroupWrap}>
            {renderCheckButtons()}
          </div>
        </div>
        <div className={classes.profileStatsGraphMain}>{renderLineGraph()}</div>
      </div>
    </>
  );
};

export default GraphSectionCheckBoxes;
