import React from 'react';
import Layout from '../layout';
import GraphSectionCheckBoxes from './GraphSections/graphSectionCheckBoxes';
import Breakdown from '../Breakdown/breakdown';

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

const ProfileStats = () => (
  <Layout>
    {sections.map((section) => (
      <GraphSectionCheckBoxes
        key={section.avail[0].fieldName}
        section={section}
        initTitle={section.avail[0].name}
      />
    ))}

    <Breakdown />
  </Layout>
);

export default ProfileStats;
