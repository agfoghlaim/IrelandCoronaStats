// Shows one attribute at a time on it's own scale
import React, { useState, useEffect, useCallback } from 'react';
import classes from './graphSection.module.css';
import Axios from 'axios';
import LineGraph from './lineGraph';
import GraphTinyTextBox from './graphTinyTextBox';

const GraphSection = ({
  section,
  initName,
  initTitle,
  totalConfirmedCovidCases,
}) => {
  // Buttons - select one
  const [selectedGraphName, setSelectedGraphName] = useState(initName);
  const [selectedGraphTitle, setSelectedGraphTitle] = useState(initTitle);
  const [selectedGraphData, setSelectedGraphData] = useState([]);

  const [testIdeaAttr, setTestIdeaAttr] = useState('');
  const [testIdeaData, setTestIdeaData] = useState();

  const baseUrl = (specificUrlPart) =>
    `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=${specificUrlPart}&outSR=4326&f=json`;

  const getSelectedGraph = useCallback(() => {
    const ans = section.avail.filter(
      (a) => a.fieldName === selectedGraphName
    )[0];

    return ans.urlPart;
  }, [selectedGraphName, section.avail]);

  useEffect(() => {
    (async () => {
      const specificUrlPart = getSelectedGraph();
      const response = await Axios.get(baseUrl(specificUrlPart));

      const filterOutNullValues = (resp) => {
        const filtered = resp.filter((r) => {
          return r.attributes[selectedGraphName] !== null;
        });
        return filtered;
      };

      const filteredResponse = filterOutNullValues(response.data.features); // some
      setSelectedGraphData(filteredResponse);
    })();
  }, [selectedGraphName, getSelectedGraph, totalConfirmedCovidCases]);

  const handleTextBox = (d) => {
    setTestIdeaData(d);
    setTestIdeaAttr(selectedGraphName);
  };

  const renderLineGraph = () => {
    return selectedGraphData && selectedGraphData.length ? (
      <LineGraph
    
        data={selectedGraphData}
        name={selectedGraphName}
        title={selectedGraphTitle}
        handleTextBox={handleTextBox}
      />
    ) : (
      'loading...'
    );
  };

  const selectGraphDataName = (fieldName, title) => {
    setSelectedGraphName(fieldName);
    setSelectedGraphTitle(title);
  };

  const renderButtons = () => {
    return section.avail.map((a) => (
      <button key={a.fieldName} onClick={() => selectGraphDataName(a.fieldName, a.name)}>
        {a.name}
      </button>
    ));
  };

  return (
    <div className={classes.profileStatsGraphWrap}>
      <div className={classes.profileStatsGraphLeft}>
        <div className={classes.sectionHeader}>
          <h3>
            {section.sectionName} <br />
            <small>- graphSectionComponent</small>
          </h3>
        </div>

        {testIdeaAttr && testIdeaData ? (
          <GraphTinyTextBox
            data={testIdeaData}
            attributeForBoxTitle={testIdeaAttr}
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
          {renderButtons()}
        </div>
      </div>
      <div className={classes.profileStatsGraphMain}>{renderLineGraph()}</div>
    </div>
  );
};

export default GraphSection;
