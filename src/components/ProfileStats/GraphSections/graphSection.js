import React, { useState, useEffect, useCallback } from 'react';
import classes from './graphSection.module.css';
import Axios from 'axios';
import LineGraph from './lineGraph';
// import GraphTextBox from './graphTextBox';
import GraphTinyTextBox from './graphTinyTextBox';
import { findRenderedDOMComponentWithTag } from 'react-dom/test-utils';

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

  // Checkboxes - select many
  const [selectedGraphNames, setSelectedGraphNames] = useState([initName]);
  const [selectedGraphTitles, setSelectedGraphTitles] = useState([initTitle]);
  const [selectedGraphDatas, setSelectedGraphDatas] = useState([]);

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

  // Buttons
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

  const getSelectedGraphs = useCallback(
    (selected) => {
      const ans = section.avail.filter((a) => a.fieldName === selected)[0];

      return ans.urlPart;
    },
    [selectedGraphName, section.avail]
  );
  // Checkboxes
  useEffect(() => {
    (async () => {
      const specificUrlParts = selectedGraphNames.map((selected) =>
        getSelectedGraphs(selected)
      );

      const filterOutNullValues = (resp) => {
      
        const filtered = resp.filter((r) => {
//  console.log(selectedGraphNames)
         return selectedGraphNames.map(selectedGraphName=>{
         
            return r.attributes[selectedGraphName] !== null;
         })
    
        });

        return filtered;
      };
      let getAll = async () => {
        return await Promise.all(specificUrlParts.map((item) => getOne(item)));
      };
      const getOne = async (part) => {
        const response = await Axios.get(baseUrl(part));
        return response.data.features;
      };

      const all = await getAll();

      // console.log(all);

      const getDataForEachSelectedCheckbox = async () => {
        specificUrlParts.map(async (part) => {
          const response = await getOne(part);
    
          const filteredResponse = filterOutNullValues(response); 
  
         const newSelectedGraphDatas = [...selectedGraphDatas, filteredResponse]
   
          setSelectedGraphDatas(newSelectedGraphDatas);
         
        });
      };
      await getDataForEachSelectedCheckbox();;

    })();
  }, [selectedGraphNames, getSelectedGraphs, totalConfirmedCovidCases]);

  const handleTextBox = (x, y, d) => {
    console.log(x, y, d);
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

  // Buttons
  const selectGraphDataName = (fieldName, title) => {
    setSelectedGraphName(fieldName);
    setSelectedGraphTitle(title);
  };

  // Checkboxes
  const selectGraphDataNames = (name, title) => {
    const names = [...selectedGraphNames, name];
    const titles = [...selectedGraphTitles, title];
    setSelectedGraphNames(names);
    setSelectedGraphTitles(titles);
  };

  const renderButtons = () => {
    return section.avail.map((a) => (
      <button onClick={() => selectGraphDataName(a.fieldName, a.name)}>
        {a.name}
      </button>
    ));
  };

  const handleCheckBox = (e) => {
    console.log('checkbox', e.target.name);
    selectGraphDataNames(e.target.name, e.target.id);
  };
  const renderCheckBoxes = () => {
    return section.avail.map((a) => (
      <label key={a.fieldName}>
        {a.name}
        <input
          type="checkbox"
          id={a.name}
          name={a.fieldName}
          checked={false}
          onChange={(e) => handleCheckBox(e)}
        />
      </label>
    ));
  };
  return (
    <div className={classes.profileStatsGraphWrap}>
      <div className={classes.profileStatsGraphLeft}>
        <div className={classes.sectionHeader}>
          <h3>{section.sectionName}</h3>
        </div>

        {/* <GraphTextBox
          data={selectedGraphData}
          attributeForBoxTitle={selectedGraphName}
        /> */}
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
          {renderCheckBoxes()}
        </div>
      </div>
      <div className={classes.profileStatsGraphMain}>{renderLineGraph()}</div>
    </div>
  );
};

export default GraphSection;
