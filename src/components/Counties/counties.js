import React, { useState, useEffect, useCallback } from 'react';
import classes from './counties.module.css';
import Layout from '../layout';
import axios from 'axios';
import Section from './Sections/section';
import ErrorComp from '../../UI/error';
import CountyTime from '../CountyTime/countyTime';

const sections = [
  {
    name: 'Counties',
    sectionName: 'Counties',
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
      {
        name: 'Population (2016)',
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



// uri2 no longer has any date field, endpoint does have the latest for each county only but there's no way I can see to check what date the data refers to.
// const uri2 = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidCountyStatisticsHPSCIreland/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json`;

// try this (see endpoints.txt, #5) - return only 26 results and order by newest first.  'resultRecordCount=26' is dodge? but it's the most foolproof query I can think of. (better than querying for now minus about 3 days). It works to get the latest county info only (including date). Note field names are different (ConfirmedCovidCases vs CovidCases).

// CountiesTime is getting all data anyway so may as well use that
// data here will correspond to
const uriLatestAllCounties = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&resultRecordCount=26&orderByFields=TimeStampDate%20DESC&f=json`;

const Counties = () => {
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [theSections, setTheSections] = useState(sections); // data stored in theSections.avail.data


  // Latest - all counties
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await axios.get(uriLatestAllCounties);
        setData(response.data.features);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setIsError(true);
      }
    })();
  }, []);

  const getCountyCases = useCallback(() => {
    const cases = data.map((d) => {
      return {
        CountyName: d.attributes.CountyName,
        ConfirmedCovidCases: d.attributes.ConfirmedCovidCases,
        // CovidCases: d.attributes.CovidCases,
        FID: d.attributes.FID,
        TimeStamp: d.attributes.TimeStampDate,
        // TimeStamp: d.attributes.TimeStamp,
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
        // TimeStamp: c.attributes.TimeStamp,
        TimeStamp: c.attributes.TimeStampDate,
      };
    });
    return proportion;
  }, [data]);

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
    setTheSections(newSections);
  };

  // Split up by section and put into section.avail.data
  useEffect(() => {
    const cases = getCountyCases();
    putIntoCorrectSection(cases, 'ConfirmedCovidCases');

    const proportion = getCountyProportion();
    putIntoCorrectSection(proportion, 'PopulationProportionCovidCases');

    putIntoCorrectSection(proportion, 'PopulationCensus16');
  }, [data, getCountyProportion, getCountyCases]);

  //=====================HandleSelectOneCounty
  const [selectedCounty, setSelectedCounty] = useState('Galway');
  const [selectedCountyData, setSelectedCountyData] = useState([]);
  const oneCountyAllFieldsUrl = (county) => {
    return `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIrelandOpenData/FeatureServer/0/query?where=CountyName=%27${county}%27&1%3D1&outFields=*&f=json`;
  };

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

      // Eliminate this step with a better query? Could i be bothered?
      const latestEntryForSelectedCounty = getLatestEntryForSelectedCounty(
        response.data.features
      );
      return latestEntryForSelectedCounty;
    };

    (async () => {
      if (selectedCounty) {
        const oneCounty = await getOneCountyInfo(selectedCounty);
        setSelectedCountyData(oneCounty);
        // set it in the section data??
      }
    })();
  }, [selectedCounty]);

  const handleSelectOneCounty = (county) => {
    setSelectedCounty(county);
  };

  //=====================EndHandleSelectOneCounty

  return (
    <Layout>
      <div className={classes.countiesWrap}>
        {isError ? <ErrorComp msg="Could not load data." /> : null}
        {!isLoading && data && data.length
          ? theSections.map((section) => (
              <Section
                handleSelectOneCounty={handleSelectOneCounty}
                selectedCountyData={selectedCountyData}
                key={section.avail[0].fieldName}
                section={section}
                initTitle={section.avail[0].name}
                data={data}
                selectedCountyName={selectedCounty}
              />
            ))
          : 'loading'}
        <CountyTime />
      </div>
    </Layout>
  );
};

export default Counties;
