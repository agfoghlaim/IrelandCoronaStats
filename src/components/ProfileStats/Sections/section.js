import React, { useState, useEffect, useRef, useMemo } from 'react';
import classes from './section.module.css';
import axios from 'axios';
import LineGraph from '../LineGraph/lineGraph';
import TextBox from '../TextBox/textBox';
import ErrorComp from '../../../UI/error';

const removeNulls = (resp, fieldName) => {
  const noNulls = resp.filter((m) => {
    for (const i in m.attributes) {
      return m.attributes[fieldName] !== null;
    }
  });
  return noNulls;
};

const removeFromNestedAttributes = (data) => {
  return data.map((d) => {
    let obj = {};
    for (const key in d.attributes) {
      obj[key] = d.attributes[key];
    }
    return obj;
  });
};

const baseUrl = (specificUrlPart) =>
  `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=${specificUrlPart}&outSR=4326&f=json`;

const Section = ({ section }) => {
  // console.log(section)
  // const [sectionData, setSectionData] = useState(section);
  const [sectionAvail, setSectionAvail] = useState(section.avail);
  const [shouldUpdate, setShouldUpdate] = useState(true);
  const [tinyTextAttr, setTinyTextAttr] = useState('');
  const [tinyTextData, setTinyTextData] = useState();
  const [tinyTextSelectedDate, setTinyTextSelectedDate] = useState('');
  const [isError, setIsError] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // console.log(sectionAvail)
  const shouldCancel = useRef(false);

  const getOne = async (part) => {
    try {
      setIsError(false);
      const response = await axios.get(baseUrl(part));
      return response.data.features;
    } catch (e) {
      setIsError(true);
      return false;
    }
  };

  // const temp = useMemo(
  //   () => sectionAvail.filter((a) => a.selected).map((b) => b.fieldName),
  //   [sectionAvail]
  // );

  useEffect(() => {
    (async () => {
      const getDataForEachSelectedCheckbox = async () => {
        // console.log('getting...');
        let sectionAvailCopy = sectionAvail;

        const getAllSelectedData = async () =>
          await Promise.all(
            sectionAvailCopy.map(async (a) => {
              if (a.selected && !a.data.length) {
                // Is it always the case that if avail.data !== [] then we don't need to update...? I think so
                const features = await getOne(a.urlPart);
                if (features) {
                  // data is from the beginning of records but first few weeks are all null for Profile Stats
                  const filteredFeatures = removeNulls(features, a.fieldName);
                  const removedFromAttributesObj = removeFromNestedAttributes(
                    filteredFeatures
                  );
                  a.data = removedFromAttributesObj;
                  // a.data = filteredFeatures;
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
        // console.log(selectedSection.data[selectedSection.data.length - 1].StatisticsProfileDate)
        setTinyTextSelectedDate(
          selectedSection.data[selectedSection.data.length - 1]
            .StatisticsProfileDate
        );

        setShouldUpdate(false);
      };
      // console.log('shouldUpdate: ', shouldUpdate);
      if (shouldUpdate) {
        await getDataForEachSelectedCheckbox();
      }
    })();
  }, [shouldUpdate, sectionAvail]);

  const handleTextBox = (data, dateFieldName) => {
    if (!data || !dateFieldName) return;
    // const dateToSelect = data[dateFieldName];
    setTinyTextSelectedDate(data[dateFieldName]);
    setTinyTextData(data);
    setTinyTextAttr(dateFieldName);
  };
  const renderLineGraph = () => {
    if (!sectionAvail || !sectionAvail.length) {
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
        console.log('switch ' + a.fieldName + ' to ' + !a.selected);
        a.selected = !a.selected;
      }
      return a;
    });
    console.log(sectionUpdate)
    setSectionAvail(sectionUpdate);

    // temp try to get selected attr names (like Daily version of Textbox),
    const tempSelectedAttrNames = sectionAvail
      .filter((a) => a.selected)
      .map((b) => b.fieldName);
    // console.log(sectionAvail,tempSelectedAttrNames)

    // Check if already have the data first
    const haveData = (name) => {
      // console.log('have ', name, ' ?');
      const checkThis = sectionAvail.filter((s) => s.fieldName === name)[0];
      return checkThis && checkThis.data.length ? false : true;
    };
    const needToGetData = haveData(name);

    if (needToGetData) {
      setShouldUpdate(true);
    }
  };

  const renderCheckButtons = () => {
    console.log("rendering.......", sectionAvail)
    return sectionAvail.map((a) => (
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


  const getDataOnSelectedDate = () => {
    // console.log(tinyTextData)
    const selected = sectionAvail.filter((d) => d.selected);
    const selectedDate = tinyTextData['StatisticsProfileDate'];
    const onlyOnDate = selected.map((s) => {
      const newData = s.data.filter((d) => {
        return (
          // d[attributeForDate] === data[attributeForDate]
          d['StatisticsProfileDate'] === selectedDate
        );
      });
      s.selectedData = newData;
      return s;
    }, []);
    // console.log(onlyOnDate)
    return onlyOnDate;
  };

  return (
    <>
      {isError ? <ErrorComp msg="Could not load data." /> : null}
      {/* { !isLoading ? ( */}
      <div className={classes.profileStatsGraphWrap}>
        <div className={classes.profileStatsGraphLeft}>
          <div className={classes.sectionHeader}>
            <h3>{section.sectionName}</h3>
            {/* <p>{section.description}</p> */}
          </div>

          {tinyTextAttr &&
          tinyTextData &&
          tinyTextData.StatisticsProfileDate &&
          tinyTextSelectedDate  ? (
            <TextBox
              //  avail={sectionAvail}
              availableData={sectionAvail}
              // tryThisSelectedAttributeNames={temp}
              // attributeForDate={sectionAvail.xAxisAttribute}
              data={tinyTextData} // should be just selected Date
              section={section}
              AselectedDate={tinyTextSelectedDate}
              selectedDateData={getDataOnSelectedDate()}
              xAxisAttribute={sectionAvail.xAxisAttribute}
            />
          ) : null}

          <div className={classes.graphSectionBtnGroupWrap}>
            {renderCheckButtons()}
          </div>
        </div>
        <div className={classes.profileStatsGraphMain}>{renderLineGraph()}</div>
      </div>
      {/* 
      ) : 'Loading...'} */}
    </>
  );
};

export default Section;
