// See here: https://opendata-geohive.hub.arcgis.com/datasets/d8eb52d56273413b84b0187a4e9117be_0/data?geometry=-18.252%2C51.131%2C2.138%2C55.708&page=4

// Seems to be most complete dataset

// below from here https://www.arcgis.com/home/item.html?id=d8eb52d56273413b84b0187a4e9117be
// This feature service contains the up to date Covid-19 Daily Statistics as well as the Profile of Covid-19 Daily Statistics for Ireland, as reported by the Health Surveillance Protection Centre.
// The Covid-19 Daily Statistics are updated on a daily basis, with the latest record reporting the counts recorded at 1pm the same day.
// The further breakdown of these counts (age, gender, transmission, etc.) is part of a Daily Statistics Profile of Covid-19, an analysis that utilises the data that dates back to 12am two days previous to help identify patterns and trends.

// The primary Date applies to the following fields:
// CovidCasesConfirmed,
// TotalCovidCasesConfirmed,
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

import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import classes from './profileStats.module.css';
import axios from 'axios';
// import Summary from './Summary/summary';
import TextGeneric from './TextSections/textGeneric';
// import ProfileStatsGraph from './Graphs/profileStatsGraph';
import GraphSection from './GraphSections/graphSection';
import GraphSectionCheckBoxes from './GraphSections/graphSectionCheckBoxes';
import Breakdown from '../Breakdown/breakdown';
import Error from '../../UI/error';

const sections = [
  {
    name: 'transmissionType',
    sectionName: 'Transmission Type',
    avail: [
      {
        name: 'Community Transmission',
        urlPart: `StatisticsProfileDate,CommunityTransmission,CovidCasesConfirmed`,
        fieldName: 'CommunityTransmission',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: true,
        color: 'var(--purple)',
        data: [],
      },
      {
        name: 'Under Investigation',
        urlPart: `StatisticsProfileDate,UnderInvestigation,CovidCasesConfirmed`,
        fieldName: 'UnderInvestigation',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'var(--orange)',
        data: [],
      },
      {
        name: 'Close Contact',
        urlPart: `StatisticsProfileDate,CloseContact,CovidCasesConfirmed`,
        fieldName: 'CloseContact',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'var(--blue)',
        data: [],
      },
      {
        name: 'Travel Abroad',
        urlPart: `StatisticsProfileDate,TravelAbroad,CovidCasesConfirmed`,
        fieldName: 'TravelAbroad',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'var(--yellow)',
        data: [],
      },
      {
        name: 'Total Cases',
        urlPart: `StatisticsProfileDate,CovidCasesConfirmed`,
        fieldName: 'CovidCasesConfirmed',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'var(--black)',
        data: [],
      },
    ],
  },
  {
    name: 'hospitalisations',
    sectionName: 'Hospitalisations',
    avail: [
      {
        name: 'Hospitalised',
        urlPart: `StatisticsProfileDate,HospitalisedCovidCases,CovidCasesConfirmed`,
        fieldName: 'HospitalisedCovidCases',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: true,
        color: 'var(--purple)',
        data: [],
      },
      {
        name: 'Requiring ICU',
        urlPart: `StatisticsProfileDate,RequiringICUCovidCases,CovidCasesConfirmed`,
        fieldName: 'RequiringICUCovidCases',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'var(--green)',
        data: [],
      },

      {
        name: 'Total Cases',
        urlPart: `StatisticsProfileDate,CovidCasesConfirmed`,
        fieldName: 'CovidCasesConfirmed',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'var(--black)',
        data: [],
      },
    ],
  },
  {
    name: 'genderProfile',
    sectionName: 'Gender Profiles',
    avail: [
      {
        name: 'Female',
        urlPart: `StatisticsProfileDate,Female`,
        fieldName: 'Female',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: true,
        color: 'var(--purple)',
        data: [],
      },
      {
        name: 'Male',
        urlPart: `StatisticsProfileDate,Male`,
        fieldName: 'Male',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'var(--green)',
        data: [],
      },
      {
        name: 'Unknown',
        urlPart: `StatisticsProfileDate,Unknown`,
        fieldName: 'Unknown',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'var(--blue)',
        data: [],
      },
      {
        name: 'Total Cases',
        urlPart: `StatisticsProfileDate,CovidCasesConfirmed`,
        fieldName: 'CovidCasesConfirmed',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'var(--black)',
        data: [],
      },
    ],
  },
  {
    name: 'ageProfiles',
    sectionName: 'Age Profiles',
    avail: [
      {
        name: 'Aged 65 and up',
        urlPart: `StatisticsProfileDate,Aged65up,CovidCasesConfirmed`,
        fieldName: 'Aged65up',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: true,
        color: 'pink',
        data: [],
      },
      {
        name: 'Aged 55 to 64',
        urlPart: `StatisticsProfileDate,Aged55to64,CovidCasesConfirmed`,
        fieldName: 'Aged55to64',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'var(--purple)',
        data: [],
      },
      {
        name: 'Aged 45 to 54',
        urlPart: `StatisticsProfileDate,Aged45to54,CovidCasesConfirmed`,
        fieldName: 'Aged45to54',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'blue',
        data: [],
      },
      {
        name: 'Aged 35 to 44',
        urlPart: `StatisticsProfileDate,Aged35to44,CovidCasesConfirmed`,
        fieldName: 'Aged35to44',
        xAxisAttribute: 'StatisticsProfileDate',
        color: 'violet',
        selected: false,
        data: [],
      },
      {
        name: 'Aged 25 to 34',
        urlPart: `StatisticsProfileDate,Aged25to34,CovidCasesConfirmed`,
        fieldName: 'Aged25to34',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'darkgreen',
        data: [],
      },
      {
        name: 'Aged 15 to 24',
        urlPart: `StatisticsProfileDate,Aged15to24,CovidCasesConfirmed`,
        fieldName: 'Aged15to24',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'var(--yellow)',
        data: [],
      },
      {
        name: 'Aged 5 to 14',
        urlPart: `StatisticsProfileDate,Aged5to14,CovidCasesConfirmed`,
        fieldName: 'Aged5to14',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'var(--green)',
        data: [],
      },
      {
        name: 'Aged 1 to 4',
        urlPart: `StatisticsProfileDate,Aged1to4,CovidCasesConfirmed`,
        fieldName: 'Aged1to4',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'var(--orange)',
        data: [],
      },
      {
        name: 'Aged 1',
        urlPart: `StatisticsProfileDate,Aged1,CovidCasesConfirmed`,
        fieldName: 'Aged1',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'var(--purple)',
        data: [],
      },
      {
        name: 'Total Cases',
        urlPart: `StatisticsProfileDate,CovidCasesConfirmed`,
        fieldName: 'CovidCasesConfirmed',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'var(--black)',
        data: [],
      },
    ],
  },
  {
    name: 'dailyTest',
    sectionName: 'Daily Data',
    avail: [
      {
        name: 'Daily Cases',
        urlPart: `Date,ConfirmedCovidCases`,
        fieldName: 'ConfirmedCovidCases',
        xAxisAttribute: 'Date',
        selected: true,
        color: 'var(--purple)',
        data: [],
      },
      {
        name: 'Total Cases',
        urlPart: `Date,TotalConfirmedCovidCases`,
        fieldName: 'TotalConfirmedCovidCases',
        xAxisAttribute: 'Date',
        selected: false,
        color: 'var(--black)',
        data: [],
      },
      {
        name: 'Daily Deaths',
        urlPart: `Date,ConfirmedCovidDeaths`,
        fieldName: 'ConfirmedCovidDeaths',
        xAxisAttribute: 'Date',
        selected: false,
        color: 'var(--green)',
        data: [],
      },
      {
        name: 'Total Deaths',
        urlPart: `Date,TotalCovidDeaths`,
        fieldName: 'TotalCovidDeaths',
        xAxisAttribute: 'Date',
        selected: false,
        color: 'var(--blue)',
        data: [],
      },
      {
        name: 'Daily Recovered',
        urlPart: `Date,ConfirmedCovidRecovered`,
        fieldName: 'ConfirmedCovidRecovered',
        xAxisAttribute: 'Date',
        selected: false,
        color: 'var(--yellow)',
        data: [],
      },
      {
        name: 'Total Recovered',
        urlPart: `Date,TotalCovidRecovered`,
        fieldName: 'TotalCovidRecovered',
        xAxisAttribute: 'Date',
        selected: false,
        color: 'var(--orange)',
        data: [],
      },
    ],
  },
];
// CovidCasesConfirmed,
// TotalCovidCasesConfirmed,
// ConfirmedCovidDeaths,
// TotalCovidDeaths,
// ConfirmedCovidRecovered,
// TotalCovidRecovered.
const primaryDateKeys = [
  'Date',
  'CovidCasesConfirmed',
  'TotalCovidCasesConfirmed',
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

// const profileStatsUrlPrimaryDateOnly = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=Date,CovidCasesConfirmed,TotalCovidCasesConfirmed,ConfirmedCovidDeaths,TotalCovidDeaths,ConfirmedCovidRecovered,TotalCovidRecovered&outSR=4326&f=json`;

// const profileStatsUrlSecondaryDateOnly = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=StatisticsProfileDate,CovidCasesConfirmed,Female,Male,RequiringICUCovidCases,HospitalisedCovidCases,Unknown,Aged35to44,CommunityTransmission,Aged45to54,Aged1,Aged1to4,Aged5to14,Aged15to24,Aged25to34,Aged65up,Aged55to64,CloseContact,TravelAbroad,UnderInvestigation&outSR=4326&f=json`;

const profileStatsUrlEverything = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json`;

const ProfileStats = () => {
  const [statsForText, setStatsForText] = useState([]);
  const [primaryDateData, setPrimaryDateData] = useState([]);
  const [secondaryDateData, setSecondaryDateData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
  
      setIsError(false);
      setIsLoading(true);
      const response = await axios.get(profileStatsUrlEverything);
      return response.data.features;
    } catch (e) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const stats = await getProfileStats();

      if (!isError && stats && stats.length) {
        convertAttributesToArrayOfObjsWithDiaplayName(stats);
      }
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
      {isError ? <Error msg="Could not load data." /> : null}
      {/* <Summary stats={statsForText} /> */}
      {sections.map((section) => (
        <GraphSectionCheckBoxes
          key={section.avail[0].fieldName}
          section={section}
          initTitle={section.avail[0].name}
        />
      ))}
      {/* {sections.map((section) => (
        <GraphSection
          key={section.avail[0].fieldName}
          section={section}
          initTitle={section.avail[0].name}
          initName={section.avail[0].fieldName}
        />
      ))} */}

      {/* <div className={classes.profileStatsTextWrap}>
        <TextGeneric
          title="Daily Cases"
          attributeForTitle={'Date'}
          data={primaryDateData}
        />
      </div> */}
      <div className={classes.profileStatsTextWrap}>
        <TextGeneric
          title="Profile Statistics"
          attributeForTitle={'StatisticsProfileDate'}
          data={secondaryDateData}
        />
      </div>
      <Breakdown />
    </Layout>
  );
};

export default ProfileStats;
