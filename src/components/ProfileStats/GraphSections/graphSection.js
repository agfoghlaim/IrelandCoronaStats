import React, { useState, useEffect, useCallback } from 'react';
import classes from './graphSection.module.css';
import Axios from 'axios';
import LineGraph from './lineGraph';
// import GraphTextBox from './graphTextBox';
import GraphTinyTextBox from './graphTinyTextBox';

const avail = [
  {
    name: 'Community Transmission',
    urlPart: `StatisticsProfileDate,CommunityTransmission`,
    fieldName: 'CommunityTransmission',
  },
  {
    name: 'Under Investigation',
    urlPart: `StatisticsProfileDate,UnderInvestigation`,
    fieldName: 'UnderInvestigation',
  },
  {
    name: 'Close Contact',
    urlPart: `StatisticsProfileDate,CloseContact`,
    fieldName: 'CloseContact',
  },
  {
    name: 'Travel Abroad',
    urlPart: `StatisticsProfileDate,TravelAbroad`,
    fieldName: 'TravelAbroad',
  },
];

// const sections = [
//   {
//     name: 'transmissionType',
//     sectionName: 'Transmission Type',
//     avail: [
//       {
//         name: 'Community Transmission',
//         urlPart: `StatisticsProfileDate,CommunityTransmission`,
//         fieldName: 'CommunityTransmission',
//       },
//       {
//         name: 'Under Investigation',
//         urlPart: `StatisticsProfileDate,UnderInvestigation`,
//         fieldName: 'UnderInvestigation',
//       },
//       {
//         name: 'Close Contact',
//         urlPart: `StatisticsProfileDate,CloseContact`,
//         fieldName: 'CloseContact',
//       },
//       {
//         name: 'Travel Abroad',
//         urlPart: `StatisticsProfileDate,TravelAbroad`,
//         fieldName: 'TravelAbroad',
//       },
//     ]
//   },
//   { name:  'hospitalisations',
//     sectionName: 'Hospitalisations',
//     avail: [
//       {
//         name: 'Hospitalised',
//         urlPart: `StatisticsProfileDate,HospitalisedCovidCases`,
//         fieldName: 'HospitalisedCovidCases',
//       },
//       {
//         name: 'Requiring ICU',
//         urlPart: `StatisticsProfileDate,RequiringICUCovidCases`,
//         fieldName: 'RequiringICUCovidCases',
//       }
//     ]
//   },
//   { name: 'ageProfiles',
//     sectionName: 'Age Profiles',
//     avail: [
//       {
//         name: 'Aged 1',
//         urlPart: `StatisticsProfileDate,Aged1`,
//         fieldName: 'Aged1',
//       },
//       {
//         name: 'Aged 1 to 4',
//         urlPart: `StatisticsProfileDate,Aged1to4`,
//         fieldName: 'Aged1to4',
//       },
//       {
//         name: 'Aged 5 to 14',
//         urlPart: `StatisticsProfileDate,Aged5to14`,
//         fieldName: 'Aged5to14',
//       },
//       {
//         name: 'Aged 15 to 24',
//         urlPart: `StatisticsProfileDate,Aged15to24`,
//         fieldName: 'Aged15to24',
//       },
//       {
//         name: 'Aged 25 to 34',
//         urlPart: `StatisticsProfileDate,Aged25to34`,
//         fieldName: 'Aged25to34',
//       },
//       {
//         name: 'Aged 35 to 44',
//         urlPart: `StatisticsProfileDate,Aged35to44`,
//         fieldName: 'Aged35to44',
//       },
//       {
//         name: 'Aged 45 to 54',
//         urlPart: `StatisticsProfileDate,Aged45to54`,
//         fieldName: 'Aged45to54',
//       },
//       {
//         name: 'Aged 55 to 64',
//         urlPart: `StatisticsProfileDate,Aged55to64`,
//         fieldName: 'Aged55to64',
//       },
//       {
//         name: 'Aged 65 and up',
//         urlPart: `StatisticsProfileDate,Aged65up`,
//         fieldName: 'Aged65up',
//       }
//     ]
//   },

// ]

const GraphSection = ({section, initName, initTitle}) => {
  // const [availableGraphs, setAvailableGraphs] = useState(avail);
  const [selectedGraphName, setSelectedGraphName] = useState(initName);
  const [selectedGraphTitle, setSelectedGraphTitle] = useState(initTitle);
  
  const [selectedGraphData, setSelectedGraphData] = useState([]);
  
  const[testIdeaAttr, setTestIdeaAttr] = useState('');
  const[testIdeaData, setTestIdeaData] = useState()


  const baseUrl = (specificUrlPart) =>
    `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=${specificUrlPart}&outSR=4326&f=json`;

  const getSelectedGraph = useCallback(() => {
    const ans = section.avail.filter((a) => a.fieldName === selectedGraphName)[0];

    return ans.urlPart;
  },[selectedGraphName, section.avail]);

  const selectGraphDataName = (fieldName, title) => {
 
    setSelectedGraphName(fieldName);
    setSelectedGraphTitle(title);
  };

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

      const filteredResponse = filterOutNullValues(response.data.features); // some data not available until 15th March

      setSelectedGraphData(filteredResponse);
    })();
  }, [selectedGraphName, getSelectedGraph]);

  const handleTextBox = (x,y,d) =>{
    console.log(x,y,d)
    setTestIdeaData(d);
    setTestIdeaAttr(selectedGraphName)
  }

  const renderLineGraph = () =>
    selectedGraphData && selectedGraphData.length ? (
      <LineGraph data={selectedGraphData} name={selectedGraphName} title={selectedGraphTitle} handleTextBox={handleTextBox} />
    ) : (
      'loading...'
    );

  const renderButtons = () =>
    section.avail.map((a) => (
      <button onClick={() => selectGraphDataName(a.fieldName, a.name)}>{a.name}</button>
    ));

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
        {
          testIdeaAttr && testIdeaData ? (
            <GraphTinyTextBox 
          data={testIdeaData}
          attributeForBoxTitle={testIdeaAttr}
        />
          ) : <div style={{background: 'var(--white)', borderRadius: '0.4rem', height: '8rem'}}></div>
        }
        
        <div className={classes.graphSectionBtnGroupWrap}>{renderButtons()}</div>
      </div>
      <div className={classes.profileStatsGraphMain}>{renderLineGraph()}</div>
    </div>
   
  );
};

export default GraphSection;
