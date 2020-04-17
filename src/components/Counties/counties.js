import React, { useState, useEffect, useCallback } from 'react';
import classes from './counties.module.css';
import Layout from '../layout';
import axios from 'axios';
import Section from './Sections/section';

/* There's two apis, what is the difference?

1. NO cors
NAME = CovidCountyStatisticsHPSCIreland 
INFO = https://opendata-geohive.hub.arcgis.com/datasets/07b8a45b715d4e4eb4ad39fc44c4bd06_0/geoservice?geometry=-13.504%2C52.290%2C-2.353%2C54.580
ALL DATA URI = https://opendata-geohive.hub.arcgis.com/datasets/07b8a45b715d4e4eb4ad39fc44c4bd06_0/geoservice?geometry=-13.504%2C52.290%2C-2.353%2C54.580

2. 
ALL DATA URI =  https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json

*/
const oneCountyAllFieldsUrl_NOT_WORKING = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIrelandOpenData/FeatureServer/0/query?where=CountyName=%27Clare%27&1%3D1&outFields=*&f=json`;

// https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIrelandOpenData/FeatureServer/0/query?where=CountyName='Clare'&1%3D1&outFields=*&f=json

const sections = [
  {
    name: 'Counties',
    sectionName: 'Counties',
    avail: [
      {
        name: 'Total Number of Cases',
        // urlPart: `StatisticsProfileDate,HospitalisedCovidCases,CovidCasesConfirmed`,
        fieldName: 'ConfirmedCovidCases',
        yAxisAttribute: 'CountyName',
        xAxisDescription: 'Number of Confirmed Cases',
        selected: true,
        color: 'var(--purple)',
        data: [],
      },
      {
        name: 'Cases per 100,000',
        // urlPart: `StatisticsProfileDate,RequiringICUCovidCases,CovidCasesConfirmed`,
        fieldName: 'PopulationProportionCovidCases',
        yAxisAttribute: 'CountyName',
        xAxisDescription: 'Cases per 100,000 of Population',
        selected: false,
        color: 'var(--green)',
        data: [],
      },
      {
        name: 'Population (2016)',
        // urlPart: `StatisticsProfileDate,RequiringICUCovidCases,CovidCasesConfirmed`,
        fieldName: 'PopulationCensus16',
        yAxisAttribute: 'CountyName',
        xAxisDescription: 'Population 2016',
        selected: false,
        color: 'var(--orange)',
        data: [],
      },
    ],
  },
];

//returning all, not just latest
// const uri2 = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json`;
const uri2 = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidCountyStatisticsHPSCIreland/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json`;
const Counties = () => {
  const [data, setData] = useState([]);
  const [countyCases, setCountyCases] = useState([]);
  const [countyProportion, setCountyProportion] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [theSections, setTheSections] = useState(sections);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(uri2);
        // console.log(response);
        setData(response.data.features);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    })();
  }, []);

  const getCountyCases = useCallback(() => {

    const cases = data.map((d) => {
      return {
        CountyName: d.attributes.CountyName,
        ConfirmedCovidCases: d.attributes.CovidCases,
        // CovidCases: d.attributes.CovidCases,
        FID: d.attributes.FID,
        TimeStamp: d.attributes.TimeStamp,
      };
    });
    return cases;
  }, [data]);

  const getCountyProportion = useCallback(() => {
    const proportion = data.map((c) => {
      return {
        FID: c.attributes.FID,
        CountyName: c.attributes.CountyName,
        PopulationProportionCovidCases:
          c.attributes.PopulationProportionCovidCases,
        PopulationCensus16: c.attributes.PopulationCensus16,
        TimeStamp: c.attributes.TimeStamp,
      };
    });
    return proportion;
  }, [data]);

  // too dangerous!!?
  const putIntoCorrectSection = (data, fieldName) => {
    let newSections = sections.map((section) => {
      const toUpdate = section.avail.map((a) => {
        if (a.fieldName === fieldName) {
          a.data = data;
        }
        return a;
      });
      section.avail = toUpdate;
      return section;
    });
    // console.log(newSections);
    setTheSections(newSections);
  };

  useEffect(() => {
    const cases = getCountyCases();
    putIntoCorrectSection(cases, 'ConfirmedCovidCases');

    const proportion = getCountyProportion();
    putIntoCorrectSection(proportion, 'PopulationProportionCovidCases');
    putIntoCorrectSection(proportion, 'PopulationCensus16');
    setCountyCases(cases);
    setCountyProportion(proportion);
  }, [data, getCountyProportion, getCountyCases]);

  //=====================HandleSelectOneCounty
  const [selectedCounty, setSelectedCounty] = useState('Galway');
  const [selectedCountyData, setSelectedCountyData] = useState([]);
  const oneCountyAllFieldsUrl = (county) => {
    return `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIrelandOpenData/FeatureServer/0/query?where=CountyName=%27${county}%27&1%3D1&outFields=*&f=json`;
  };

  // const oneCountyAllFieldsUrl = (county) => {
  //   return `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidCountyStatisticsHPSCIreland/FeatureServer/0/query?where=CountyName=${county}&1%3D1&outFields=*&outSR=4326&f=json`;
  // };
  // const oneCountyAllFields =  `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidCountyStatisticsHPSCIreland/FeatureServer/0/query?where=CountyName='Clare'&1%3D1&outFields=*&outSR=4326&f=json`

  const getLatestEntryForSelectedCounty = (data) => {
    const dates = data.map((d) => d.attributes.TimeStampDate);

    const latestDate = Math.max(...dates.map((d) => d));
    const latestData = data.filter(
      (d) => d.attributes.TimeStampDate === latestDate
    );

    return latestData;
  };
  useEffect(() => {
    const getOneCountyInfo = async () => {
      const response = await axios.get(oneCountyAllFieldsUrl(selectedCounty));
     // console.log(response);

      // because endpoint changed:
      const latestEntryForSelectedCounty = getLatestEntryForSelectedCounty(
        response.data.features
      );
      return latestEntryForSelectedCounty;
      // return response.data.features;
    };
    (async () => {
      if (selectedCounty) {
        const oneCounty = await getOneCountyInfo(selectedCounty);
        // console.log(oneCounty);
        setSelectedCountyData(oneCounty);
      }
    })();
  }, [selectedCounty]);
  const handleSelectOneCounty = (county) => {
    console.log('select ', county);
    setSelectedCounty(county);
  };
  //=====================EndHandleSelectOneCounty
  return (
    <Layout>
      <div className={classes.countiesWrap}>
        {!isLoading && data && data.length
          ? theSections.map((section) => (
              <Section
                handleSelectOneCounty={handleSelectOneCounty}
                selectedCountyData={selectedCountyData}
                key={section.avail[0].fieldName}
                section={section}
                initTitle={section.avail[0].name}
                cases={countyCases}
                proportion={countyProportion}
                data={data}
                selectedCountyName={selectedCounty}
              />
            ))
          : 'loading'}
      </div>
    </Layout>
  );
};

export default Counties;
