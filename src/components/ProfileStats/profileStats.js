import React, { useState } from 'react';
import Layout from '../layout';
import Section from './Sections/section';
import Breakdown from '../Breakdown/breakdown';
import Intro from './Intro/intro.js';
const sections = [
  {
    name: 'transmissionType',
    sectionName: 'Transmission Type',
    description:
      'This data is part of a Daily Statistic Profile of Covid-19 made available by the Health Protection Surveillance Center. New data is released each evening and dates back to 12am two days previously.',
    allUrl: `StatisticsProfileDate,CommunityTransmission,UnderInvestigation,CloseContact,CovidCasesConfirmed,TravelAbroad`,
    yAxisLabel: '#Cases',
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
        name: 'Analysis based on #cases',
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
    description:
      'This data is part of a Daily Statistic Profile of Covid-19 made available by the Health Protection Surveillance Center.',
    yAxisLabel: '#Cases Hospitalised',
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
        name: 'Analysis based on #cases',
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
    name: 'genderProfiles',
    sectionName: 'Gender Profiles',
    description:
      'This data is part of a Daily Statistic Profile of Covid-19 made available by the Health Protection Surveillance Center.',
    yAxisLabel: '#Cases',
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
        name: 'Analysis based on #cases',
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
    sectionName: 'Age Profiles - Cases',
    description:
      'This data is part of a Daily Statistic Profile of Covid-19 made available by the Health Protection Surveillance Center.',
    yAxisLabel: '#Cases in Age Group',
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
        name: 'Analysis based on #cases',
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
    name: 'dailyData',
    sectionName: 'Daily Data',
    description:
      'This data is part of a Daily Statistic of Covid-19 made available by the Health Protection Surveillance Center. Daily Statistics are updated each evening, with the latest record reporting the counts recorded at 1pm the same day.',
    yAxisLabel: '#Cases',
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
  {
    name: 'hospitalisedAgeProfiles',
    sectionName: 'Age Profiles - Hospitalised',
    description:
      'This data is part of a Daily Statistic Profile of Covid-19 made available by the Health Protection Surveillance Center.',
    yAxisLabel: '#Hospitalised in Age Group',
    avail: [
      {
        name: 'Hospitalised Aged 65 and up',
        urlPart: `StatisticsProfileDate,Aged65up,CovidCasesConfirmed,HospitalisedAged65up`,
        fieldName: 'HospitalisedAged65up',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: true,
        color: 'pink',
        data: [],
      },
      {
        name: 'Hospitalised Aged 55 to 64',
        urlPart: `StatisticsProfileDate,Aged55to64,HospitalisedAged55to64, CovidCasesConfirmed`,
        fieldName: 'HospitalisedAged55to64',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'var(--purple)',
        data: [],
      },
      {
        name: 'Hospitalised Aged 45 to 54',
        urlPart: `StatisticsProfileDate,Aged45to54,HospitalisedAged45to54, CovidCasesConfirmed`,
        fieldName: 'HospitalisedAged45to54',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'blue',
        data: [],
      },
      {
        name: 'Hospitalised Aged 35 to 44',
        urlPart: `StatisticsProfileDate,Aged35to44,HospitalisedAged35to44,CovidCasesConfirmed`,
        fieldName: 'HospitalisedAged35to44',
        xAxisAttribute: 'StatisticsProfileDate',
        color: 'violet',
        selected: false,
        data: [],
      },
      {
        name: 'Hospitalised Aged 25 to 34',
        urlPart: `StatisticsProfileDate,Aged25to34,HospitalisedAged25to34,CovidCasesConfirmed`,
        fieldName: 'HospitalisedAged25to34',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'darkgreen',
        data: [],
      },
      {
        name: 'Hospitalised Aged 15 to 24',
        urlPart: `StatisticsProfileDate,Aged15to24,HospitalisedAged15to24,CovidCasesConfirmed`,
        fieldName: 'HospitalisedAged15to24',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'var(--yellow)',
        data: [],
      },
      {
        name: 'Hospitalised Aged 5 to 14',
        urlPart: `StatisticsProfileDate,Aged5to14,HospitalisedAged5to14,CovidCasesConfirmed`,
        fieldName: 'HospitalisedAged5to14',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'var(--green)',
        data: [],
      },
      {
        name: 'Hospitalised Aged 5',
        urlPart: `StatisticsProfileDate,Aged1to4,HospitalisedAged5,CovidCasesConfirmed`,
        fieldName: 'HospitalisedAged5',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'var(--orange)',
        data: [],
      },
      {
        name: 'Total Hospitalised',
        urlPart: `StatisticsProfileDate,HospitalisedCovidCases,CovidCasesConfirmed`,
        fieldName: 'HospitalisedCovidCases',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: true,
        color: 'var(--blue)',
        data: [],
      },
      {
        name: 'Total Requiring ICU',
        urlPart: `StatisticsProfileDate,RequiringICUCovidCases,CovidCasesConfirmed`,
        fieldName: 'RequiringICUCovidCases',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'var(--green)',
        data: [],
      },
      {
        name: 'Analysis based on #cases',
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
    name: 'hospitalisedAndCasesAgeProfiles',
    sectionName: 'Age Profiles - Hospitalised & Cases',
    description:
      'This data is part of a Daily Statistic Profile of Covid-19 made available by the Health Protection Surveillance Center.',
    yAxisLabel: '#Cases vs #Hospitalised in Age Group',
    avail: [
      {
        name: 'Aged 65 and up (Hospitalised)',
        urlPart: `StatisticsProfileDate,CovidCasesConfirmed,HospitalisedAged65up`,
        fieldName: 'HospitalisedAged65up',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: true,
        color: 'pink',
        data: [],
      },
      {
        name: 'Aged 65 and up (Cases)',
        urlPart: `StatisticsProfileDate,Aged65up,CovidCasesConfirmed`,
        fieldName: 'Aged65up',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: true,
        color: 'pink',
        data: [],
      },
      {
        name: 'Aged 55 to 64 (Hospitalised)',
        urlPart: `StatisticsProfileDate,HospitalisedAged55to64, CovidCasesConfirmed`,
        fieldName: 'HospitalisedAged55to64',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'var(--purple)',
        data: [],
      },
      {
        name: 'Aged 55 to 64 (Cases)',
        urlPart: `StatisticsProfileDate,Aged55to64,CovidCasesConfirmed`,
        fieldName: 'Aged55to64',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'var(--purple)',
        data: [],
      },
      {
        name: 'Aged 45 to 54 (Hospitalised)',
        urlPart: `StatisticsProfileDate,HospitalisedAged45to54, CovidCasesConfirmed`,
        fieldName: 'HospitalisedAged45to54',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'blue',
        data: [],
      },
      {
        name: 'Aged 45 to 54 (Cases)',
        urlPart: `StatisticsProfileDate,Aged45to54,CovidCasesConfirmed`,
        fieldName: 'Aged45to54',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'blue',
        data: [],
      },
      {
        name: 'Aged 35 to 44 (Hospitalised) ',
        urlPart: `StatisticsProfileDate,HospitalisedAged35to44,CovidCasesConfirmed`,
        fieldName: 'HospitalisedAged35to44',
        xAxisAttribute: 'StatisticsProfileDate',
        color: 'violet',
        selected: false,
        data: [],
      },
      {
        name: 'Aged 35 to 44 (Cases)',
        urlPart: `StatisticsProfileDate,Aged35to44,CovidCasesConfirmed`,
        fieldName: 'Aged35to44',
        xAxisAttribute: 'StatisticsProfileDate',
        color: 'violet',
        selected: false,
        data: [],
      },
      {
        name: 'Aged 25 to 34 (Hospitalised)',
        urlPart: `StatisticsProfileDate,HospitalisedAged25to34,CovidCasesConfirmed`,
        fieldName: 'HospitalisedAged25to34',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'darkgreen',
        data: [],
      },
      {
        name: 'Aged 25 to 34 (Cases)',
        urlPart: `StatisticsProfileDate,Aged25to34,CovidCasesConfirmed`,
        fieldName: 'Aged25to34',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'darkgreen',
        data: [],
      },
      {
        name: 'Aged 15 to 24 (Hospitalised)',
        urlPart: `StatisticsProfileDate,HospitalisedAged15to24,CovidCasesConfirmed`,
        fieldName: 'HospitalisedAged15to24',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'var(--yellow)',
        data: [],
      },
      {
        name: 'Aged 15 to 24 (Cases)',
        urlPart: `StatisticsProfileDate,Aged15to24,CovidCasesConfirmed`,
        fieldName: 'Aged15to24',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'var(--yellow)',
        data: [],
      },
      {
        name: 'Aged 5 to 14 (Hospitalised)',
        urlPart: `StatisticsProfileDate,HospitalisedAged5to14,CovidCasesConfirmed`,
        fieldName: 'HospitalisedAged5to14',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'var(--green)',
        data: [],
      },
      {
        name: 'Aged 5 (Hospitalised)',
        urlPart: `StatisticsProfileDate,HospitalisedAged5,CovidCasesConfirmed`,
        fieldName: 'HospitalisedAged5',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'var(--orange)',
        data: [],
      },
      {
        name: 'Aged 1 to 4 (Cases)',
        urlPart: `StatisticsProfileDate,Aged1to4,CovidCasesConfirmed`,
        fieldName: 'Aged1to4',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'var(--orange)',
        data: [],
      },
      {
        name: 'Analysis based on #cases',
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
    name: 'clusters',
    sectionName: 'Clusters Notified',
    description:
      'This data is part of a Daily Statistic Profile of Covid-19 made available by the Health Protection Surveillance Center.',
    yAxisLabel: '# Clusters Notified',
    avail: [
      {
        name: 'Clusters',
        urlPart: `StatisticsProfileDate,ClustersNotified,CovidCasesConfirmed`,
        fieldName: 'ClustersNotified',
        xAxisAttribute: 'StatisticsProfileDate',
        yAxisLabel: '# Clusters Notified',
        selected: true,
        color: 'pink',
        data: [],
      },
      // {
      //   name: 'Analysis based on #cases',
      //   urlPart: `StatisticsProfileDate,CovidCasesConfirmed`,
      //   fieldName: 'CovidCasesConfirmed',
      //   xAxisAttribute: 'StatisticsProfileDate',
      //   selected: false,
      //   color: 'var(--black)',
      //   data: [],
      // },
    ],
  },
  {
    name: 'medianAge',
    sectionName: 'Median Age',
    description:
      'This data is part of a Daily Statistic Profile of Covid-19 made available by the Health Protection Surveillance Center.',
    yAxisLabel: '# Median age of Cases',
    avail: [
      {
        name: 'Median Age',
        urlPart: `StatisticsProfileDate,Median_Age,CovidCasesConfirmed`,
        fieldName: 'Median_Age',
        xAxisAttribute: 'StatisticsProfileDate',

        selected: true,
        color: 'var(--purple)',
        data: [],
      },
      // {
      //   name: 'Analysis based on #cases',
      //   urlPart: `StatisticsProfileDate,CovidCasesConfirmed`,
      //   fieldName: 'CovidCasesConfirmed',
      //   xAxisAttribute: 'StatisticsProfileDate',
      //   selected: false,
      //   color: 'var(--black)',
      //   data: [],
      // },
    ],
  },
];

const ProfileStats = () => {
  const initAvailableGraphs = () =>
    sections.map((s, i) => {
      return {
        name: s.name,
        sectionName: s.sectionName,
        description: s.description,
        selected: i === 0 ? true : false,
      };
    });

  const [allAvailableGraphs, setAllAvailableGraphs] = useState(
    initAvailableGraphs()
  );

  const handleSelectGraph = (name) => {
    const newAvailGraphs = allAvailableGraphs.map((graph) => {
      return {
        ...graph,
        selected: graph.name === name ? true : false,
      };
    });
    setAllAvailableGraphs(newAvailGraphs);
  };

  const selectedGraphName = () =>
    allAvailableGraphs.filter((graph) => graph.selected)[0].name;
  console.log(selectedGraphName());
  console.log(allAvailableGraphs);
  return (
    <Layout>
      <Intro
        handleSelectGraph={handleSelectGraph}
        allAvailableGraphs={allAvailableGraphs}
        h1="Graphs"
        desc="Select graph below."
        p="This data is part of a Daily Statistic Profile of Covid-19 made available by the Health Protection Surveillance Center. New data is released each evening and dates back to 12am two days previously."
      />

      {sections.map((section) =>
        section.name === selectedGraphName() ? (
          <Section
            key={section.avail[0].fieldName}
            section={section}
            initTitle={section.avail[0].name}
          />
        ) : null
      )}
      <Breakdown />
    </Layout>
  );
};

// const ProfileStats = () => (
//   <Layout>
//     {sections.map((section) => (
//       <Section
//         key={section.avail[0].fieldName}
//         section={section}
//         initTitle={section.avail[0].name}
//       />
//     ))}
//     <Breakdown />
//   </Layout>
// );

export default ProfileStats;
