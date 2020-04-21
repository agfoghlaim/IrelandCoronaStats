import React, { useState, useEffect, useCallback } from 'react';
import classes from './countyTime.module.css';
import Layout from '../layout';
import axios from 'axios';
import ErrorComp from '../../UI/error';
// import LineGraph from './LineGraph/lineGraph';
import Section from './Sections/section';

const sections = [
  {
    name: 'Counties Time',
    sectionName: 'Counties',
    allData: [],
    selectedCounty: [],
    avail: [
      {
        name: 'Total Number of Cases',
        fieldName: 'ConfirmedCovidCases',
        yAxisAttribute: 'CountyName',
        xAxisDescription: 'Number of Confirmed Cases',
        selected: true,
        color: 'var(--purple)',
        data: [],
      },
      {
        name: 'Cases per 100,000',
        fieldName: 'PopulationProportionCovidCases',
        yAxisAttribute: 'CountyName',
        xAxisDescription: 'Cases per 100,000 of Population',
        selected: false,
        color: 'var(--green)',
        data: [],
      },
      // {
      //   name: 'Population (2016)',
      //   fieldName: 'PopulationCensus16',
      //   yAxisAttribute: 'CountyName',
      //   xAxisDescription: 'Population 2016',
      //   selected: false,
      //   color: 'var(--orange)',
      //   data: [],
      // },
    ],
  },
];

const uriAllCounties = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&resultRecordCount=26&orderByFields=TimeStampDate%20DESC&f=json`;

const oneCountyAllResults = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIrelandOpenData/FeatureServer/0/query?where=CountyName='Galway'&1%3D1&outFields=*&f=json`;

// resp.data.features.length = 1274
const allCountiesAllResults = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json`;

// resp.data.features.length = 728
const allCountiesAllResultsConfirmedCasesMoreThanZero = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIrelandOpenData/FeatureServer/0/query?where=ConfirmedCovidCases>0&1%3D1&outFields=CountyName,PopulationCensus16,ConfirmedCovidCases,PopulationProportionCovidCases,FID,TimeStampDate&returnGeometry=false&outSR=4326&f=json`;

// TODO return gemoetry = false
const getCountyCases = (data) => {
  const cases = data.map((d) => {
    return {
      CountyName: d.attributes.CountyName,
      ConfirmedCovidCases: d.attributes.ConfirmedCovidCases,
      FID: d.attributes.FID,
      PopulationProportionCovidCases:
        d.attributes.PopulationProportionCovidCases,
      PopulationCensus16: d.attributes.PopulationCensus16,
      TimeStamp: d.attributes.TimeStampDate,
    };
  });
  return cases;
};

const CountiesTime = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [newVersionOfSections, setNewVersionOfSections] = useState(sections);

  const sortIntoArraysBy = (data, field) => {
    // data in = [{galway},{galway},{longford}]
    // want data out = [[{galway},{galway}],[{longford}]]
    const usedCountyNames = [];
    const newData = [];
    data.forEach((d) => {
      // new county
      if (!usedCountyNames.includes(d[field])) {
        usedCountyNames.push(d[field]);
        newData.push([d]);
      } else {
        // already in array county
        // find county in array of arrays and push new one in
        const correctArray = newData.filter((n) => n[0][field] === d[field])[0];
        correctArray.push(d);
      }
    });
    // console.log(newData);
    return newData;
  };

  // All time data for all counties
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await axios.get(
          allCountiesAllResultsConfirmedCasesMoreThanZero
        );
        const withoutNestedAttributes = getCountyCases(response.data.features);
        const nestedArrayPerCounty = sortIntoArraysBy(
          withoutNestedAttributes,
          'CountyName'
        );

        sections[0].allData = nestedArrayPerCounty;
        setNewVersionOfSections(sections);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setIsError(true);
      }
    })();
  }, []);

  return (
    <Layout>
      <>
        {!isLoading && newVersionOfSections ? (
          <Section section={sections} newSections={newVersionOfSections} />
        ) : null}
      </>
    </Layout>
  );
};

export default CountiesTime;
