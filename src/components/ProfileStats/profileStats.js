// See here: https://opendata-geohive.hub.arcgis.com/datasets/d8eb52d56273413b84b0187a4e9117be_0/data?geometry=-18.252%2C51.131%2C2.138%2C55.708&page=4

// Seems to be most complete dataset

// below from here https://www.arcgis.com/home/item.html?id=d8eb52d56273413b84b0187a4e9117be
// This feature service contains the up to date Covid-19 Daily Statistics as well as the Profile of Covid-19 Daily Statistics for Ireland, as reported by the Health Surveillance Protection Centre.
// The Covid-19 Daily Statistics are updated on a daily basis, with the latest record reporting the counts recorded at 1pm the same day.
// The further breakdown of these counts (age, gender, transmission, etc.) is part of a Daily Statistics Profile of Covid-19, an analysis that utilises the data that dates back to 12am two days previous to help identify patterns and trends.

// The primary Date applies to the following fields:
// ConfirmedCovidCases,
// TotalConfirmedCovidCases,
// ConfirmedCovidDeaths,
// TotalCovidDeaths,
// ConfirmedCovidRecovered,
// TotalCovidRecovered.

// The StatisticProfileDate applies to the following fields:
// CovidCasesConfirmed,
// HospitalisedCovidCases,
// RequiringICUCovidCases,
// Male,
// Female,
// Unknown,
// Aged1,
// Aged1to4,
// Aged5to14,
// Aged15to24,
// Aged25to34,
// Aged35to44,
// Aged45to54,
// Aged55to64,
// Aged65up,
// CommunityTransmission,
// CloseContact,
// TravelAbroad,
// UnderInvestigation.


import React, { useEffect, useState, useCallback } from 'react';
import Layout from '../layout';
import classes from './profileStats.module.css';
import axios from 'axios';
import TextGeneric from './TextSections/textGeneric';
// import ProfileStatsGraph from './Graphs/profileStatsGraph';
import GraphSection from './GraphSections/graphSection';

const sections = [
  {
    name: 'transmissionType',
    sectionName: 'Transmission Type',
    avail: [
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
    ]
  },
  { name:  'hospitalisations',
    sectionName: 'Hospitalisations',
    avail: [
      {
        name: 'Hospitalised',
        urlPart: `StatisticsProfileDate,HospitalisedCovidCases`,
        fieldName: 'HospitalisedCovidCases',
      },
      {
        name: 'Requiring ICU',
        urlPart: `StatisticsProfileDate,RequiringICUCovidCases`,
        fieldName: 'RequiringICUCovidCases',
      }
    ]
  },
  { name: 'ageProfiles',
    sectionName: 'Age Profiles',
    avail: [
      {
        name: 'Aged 1',
        urlPart: `StatisticsProfileDate,Aged1`,
        fieldName: 'Aged1',
      },
      {
        name: 'Aged 1 to 4',
        urlPart: `StatisticsProfileDate,Aged1to4`,
        fieldName: 'Aged1to4',
      },
      {
        name: 'Aged 5 to 14',
        urlPart: `StatisticsProfileDate,Aged5to14`,
        fieldName: 'Aged5to14',
      },
      {
        name: 'Aged 15 to 24',
        urlPart: `StatisticsProfileDate,Aged15to24`,
        fieldName: 'Aged15to24',
      },
      {
        name: 'Aged 25 to 34',
        urlPart: `StatisticsProfileDate,Aged25to34`,
        fieldName: 'Aged25to34',
      },
      {
        name: 'Aged 35 to 44',
        urlPart: `StatisticsProfileDate,Aged35to44`,
        fieldName: 'Aged35to44',
      },
      {
        name: 'Aged 45 to 54',
        urlPart: `StatisticsProfileDate,Aged45to54`,
        fieldName: 'Aged45to54',
      },
      {
        name: 'Aged 55 to 64',
        urlPart: `StatisticsProfileDate,Aged55to64`,
        fieldName: 'Aged55to64',
      },
      {
        name: 'Aged 65 and up',
        urlPart: `StatisticsProfileDate,Aged65up`,
        fieldName: 'Aged65up',
      }
    ]
  },

]


const primaryDateKeys = [
  'Date',
  'ConfirmedCovidCases',
  'TotalConfirmedCovidCases',
  'ConfirmedCovidDeaths',
  'TotalCovidDeaths',
  'ConfirmedCovidRecovered',
  'TotalCovidRecovered',
];

const secondaryDateKeys = [
  'StatisticsProfileDate',
  'CovidCasesConfirmed',
  'HospitalisedCovidCases',
  'RequiringICUCovidCases',
  'Male',
  'Female',
  'Unknown',
  'Aged1',
  'Aged1to4',
  'Aged5to14',
  'Aged15to24',
  'Aged25to34',
  'Aged35to44',
  'Aged45to54',
  'Aged55to64',
  'Aged65up',
  'CommunityTransmission',
  'CloseContact',
  'TravelAbroad',
  'UnderInvestigation',
];

const profileStatsUrlPrimaryDateOnly = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=Date,ConfirmedCovidCases,TotalConfirmedCovidCases,ConfirmedCovidDeaths,TotalCovidDeaths,ConfirmedCovidRecovered,TotalCovidRecovered&outSR=4326&f=json`;

const profileStatsUrlSecondaryDateOnly = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=StatisticsProfileDate,CovidCasesConfirmed,Female,Male,RequiringICUCovidCases,HospitalisedCovidCases,Unknown,Aged35to44,CommunityTransmission,Aged45to54,Aged1,Aged1to4,Aged5to14,Aged15to24,Aged25to34,Aged65up,Aged55to64,CloseContact,TravelAbroad,UnderInvestigation&outSR=4326&f=json`;

const profileStatsUrlEverything = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json`;

const ProfileStats = () => {
  const [allStats, setAllStats] = useState([]);
  const [statsForText, setStatsForText] = useState([]);
  const [primaryDateData, setPrimaryDateData] = useState([]);
  const [secondaryDateData, setSecondaryDateData] = useState([]);

  // this doesnt work for numbers eg. aged45to54
  const helper_camelCaseToText = (text) => {
    const space = text.replace(/([A-Z])/g, ' $1');
    const ans = space.charAt(0).toUpperCase() + space.slice(1);
    return ans.trim();
  };

  const convertAttributesToArrayOfObjsWithDiaplayName = (rawData) => {
    const ans = rawData.map((day) => {
      let attributes = [];
      for (const [key, value] of Object.entries(day.attributes)) {
        const display = helper_camelCaseToText(key);
        attributes.push({ name: key, value: value, display: display });
      }
      return attributes;
    });
    // console.log(ans);
    setStatsForText(ans);
  };

  const getProfileStats = async () => {
    try {
      const response = await axios.get(profileStatsUrlEverything);
      console.log(response.data.features)
      return response.data.features;
    } catch (e) {
      console.log('profile stats error', e);
    }
  };

  useEffect(() => {
    (async () => {
      const stats = await getProfileStats();
      setAllStats(stats);
      convertAttributesToArrayOfObjsWithDiaplayName(stats);
      //   getPrimaryDateData();
      // getSecondaryDateData();
    })();
  }, []);

  useEffect(() => {
    // see comment @ top, there's two lots of data. I'm just getting it all in one call for now and splitting it below in get<Whatever>DateData()
    const getPrimaryDateData = () => {
      const copy = statsForText;
      const ans = copy.map((stat) => {
        return stat.filter((d) => {
          return primaryDateKeys.includes(d.name);
        });
      });

      setPrimaryDateData(ans);
    };

    const getSecondaryDateData = () => {
      const copy = statsForText;
      const ans = copy.map((stat) => {
        return stat.filter((d) => {
          return secondaryDateKeys.includes(d.name);
        });
      });

      setSecondaryDateData(ans);
    };
    getPrimaryDateData();
    getSecondaryDateData();
  }, [statsForText]);

  return (
    <Layout>
      {/* <div className={classes.profileStatsGraphWrap}>
        <GraphSection />
      </div> */}
        {
          sections.map( section => (
            <GraphSection section={section} initTitle={section.avail[0].name} initName={section.avail[0].fieldName} />
          ))
        }
        
      

      <div className={classes.profileStatsTextWrap}>
        <TextGeneric
          title="Daily Cases"
          attributeForTitle={'Date'}
          data={primaryDateData}
        />
      </div>
      <div className={classes.profileStatsTextWrap}>
        <TextGeneric
          title="Profile Statistics"
          attributeForTitle={'StatisticsProfileDate'}
          data={secondaryDateData}
        />
      </div>
    </Layout>
  );
};

export default ProfileStats;
