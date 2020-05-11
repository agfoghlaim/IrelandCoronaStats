import React, { useState, useEffect, useRef, useCallback } from 'react';
import classes from './section.module.css';

import LineGraph from '../LineGraph/lineGraph';
import TextBox from '../TextBox/textBox';
import ErrorComp from '../../../UI/error';
import {
  removeNulls,
  removeFromNestedAttributes,
  successfullyGotDataForEachSelectedAttr,
  getOne
} from './section-util';


const Section = ({ section }) => {
  const [sectionAvail, setSectionAvail] = useState(section.avail);
  const [shouldUpdate, setShouldUpdate] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const shouldCancel = useRef(false);

  const getDataForEachSelected = useCallback(async (attr) => {
    if (attr.selected && !attr.data.length) {
      const features = await getOne(attr.urlPart);
      if (features) {
        // data is from the beginning of records but first few weeks are all null for Profile Stats
        const filtered = removeNulls(features, attr.fieldName);
        const flattened = removeFromNestedAttributes(filtered);
        attr.data = flattened;
        return attr;
      }
    }
    return attr; // always return a but check error below
  }, []);

  useEffect(() => {
    (async () => {
      const getDataForEachSelectedCheckbox = async () => {
        let sectionAvailCopy = sectionAvail;

        sectionAvailCopy = await Promise.all(
          sectionAvailCopy.map(getDataForEachSelected)
        );

        if (shouldCancel.current) return false;

        return successfullyGotDataForEachSelectedAttr(sectionAvailCopy)
          ? sectionAvailCopy
          : false;
      };

      if (shouldUpdate) {
        setIsLoading(true);
        const ans = await getDataForEachSelectedCheckbox();

        if (!ans) setIsError(true);

        if (ans) {
          setSectionAvail(ans);
          const selectedSection = ans.find((s) => s.selected);

          // default date to latest - first time only!
          if(!selectedDate) {
            setSelectedDate(
              selectedSection.data[selectedSection.data.length - 1][
                selectedSection.xAxisAttribute
              ]
            );
          }
          setShouldUpdate(false);
        }
        setIsLoading(false);
      }
    })();
  }, [shouldUpdate, sectionAvail, getDataForEachSelected, isError, selectedDate]);

  const handleTextBox = (data, dateFieldName) => {

    if (!data || !dateFieldName) return;
    setSelectedDate(data[dateFieldName]);
  };

  const renderLineGraph = () => {
    if (!sectionAvail || !sectionAvail.length) {
      return;
    }
    return (
      <LineGraph
        theData={sectionAvail}
        yAxisLabel={section.yAxisLabel}
        handleTextBox={handleTextBox}
      />
    );
  };

  const handleSelectData = (e) => {
    if (isLoading) return;
    const name = e.target.name;
    const sectionUpdate = sectionAvail.map((a) => {
      if (a.fieldName === name) {
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

    if (needToGetData && !isLoading) {
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

  const getDataOnSelectedDate = () => {
    const selected = sectionAvail.filter((d) => d.selected);

    const onlyOnDate = selected.map((s) => {
      const newData = s.data.filter((d) => {
        return d[s.xAxisAttribute] === selectedDate;
      });
      s.selectedData = newData;
      return s;
    }, []);

    return onlyOnDate;
  };

  return (
    <>
      {isError ? (
        <ErrorComp msg="Could not load data." />
      ) : (
        <div className={classes.profileStatsGraphWrap}>
          <div className={classes.profileStatsGraphLeft}>
            <div className={classes.sectionHeader}>
              <h3>{section.sectionName}</h3>
            </div>

            {selectedDate && sectionAvail ? (
              <TextBox
                loading={isLoading}
                selectedDate={selectedDate}
                selectedDateData={getDataOnSelectedDate()}
              />
            ) : null}

            <div className={classes.graphSectionBtnGroupWrap}>
              {renderCheckButtons()}
            </div>
          </div>
          <div className={classes.profileStatsGraphMain}>
          <div className={classes.sectionHeader}>
              {/* <h3>{section.sectionName}</h3> */}
            </div>
            {renderLineGraph()}
          </div>
        </div>
      )}
    </>
  );
};

export default Section;
