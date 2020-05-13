import React, { useEffect, useState } from 'react';
import classes from './summary.module.css';
import SectionWrapSimple from '../../UI/Sections/SectionWrapSimple/sectionWrapSimple';
import SummaryBox from './summaryBox';
import * as d3 from 'd3';

const Summary = ({ stats }) => {
  const getLastestDailyStats = (data) => {
    const datesOnly = data.map((d) => d.attributes.Date);

    const newestDate = Math.max(...datesOnly);

    const ans = data.filter((d) => d.attributes.Date === newestDate);

    return ans[0];
  };

  const [latest, setLatest] = useState();

  useEffect(() => {
    if (stats.length) {
      const latestDailyStats = getLastestDailyStats(stats);
      setLatest(latestDailyStats.attributes);
    }
  }, [stats]);

  const xExtent = d3.extent(stats, (d) => d.attributes.Date);

  const xScale = d3
    .scaleTime()
    .domain([xExtent[0], xExtent[1]])
    .range([0, 200]);

  const yExtent = d3.extent(stats, (d) => d.attributes.ConfirmedCovidCases);

  const yScale = d3
    .scaleLog()
    // .scaleSymlog() accepts values below zero but causes more trouble than it's worth
    .domain(yExtent)
    .clamp(true)
    .range([100, 0])
    .nice();

  const niceStats = stats.map((s) => {
    return {
      ConfirmedCovidCases: s.attributes.ConfirmedCovidCases,
      Date: s.attributes.Date,
      ConfirmedCovidDeaths: s.attributes.ConfirmedCovidDeaths,
      ConfirmedCovidRecovered: s.attributes.ConfirmedCovidRecovered,
      HospitalisedCovidCases: s.attributes.HospitalisedCovidCases,
      RequiringICUCovidCases: s.attributes.RequiringICUCovidCases,
      HealthcareWorkersCovidCases: s.attributes.HealthcareWorkersCovidCases,
      ClustersNotified: s.attributes.ClustersNotified,
    };
  });

  const infoStats = [
    {
      title: 'Total Confirmed Cases',
      fieldName: 'TotalConfirmedCovidCases',
      yesterdayFieldName: 'ConfirmedCovidCases', //from latest
      svgLineFieldName: 'ConfirmedCovidCases',
      dateField: 'Date',
    },
    {
      title: 'Confirmed Recovered',
      fieldName: 'ConfirmedCovidRecovered',
      yesterdayFieldName: undefined, //from latest
      svgLineFieldName: 'ConfirmedCovidRecovered',
      dateField: 'Date',
    },
    {
      title: 'Total Confirmed Deaths',
      fieldName: 'TotalCovidDeaths',
      yesterdayFieldName: 'ConfirmedCovidDeaths', //from latest
      svgLineFieldName: 'ConfirmedCovidDeaths',
      dateField: 'Date',
    },
    {
      title: 'Total Hospitalised',
      fieldName: 'HospitalisedCovidCases',
      yesterdayFieldName: undefined, //from latest
      svgLineFieldName: 'HospitalisedCovidCases',
      dateField: 'StatisticsProfileDate',
    },
    {
      title: 'Total ICU',
      fieldName: 'RequiringICUCovidCases',
      yesterdayFieldName: undefined, //from latest
      svgLineFieldName: 'RequiringICUCovidCases',
      dateField: 'StatisticsProfileDate',
    },

    {
      title: 'Total Healthcare Workers Cases',
      fieldName: 'HealthcareWorkersCovidCases',
      yesterdayFieldName: undefined, //from latest
      svgLineFieldName: 'HealthcareWorkersCovidCases',
      dateField: 'StatisticsProfileDate',
    },
    {
      title: 'Clusters',
      fieldName: 'ClustersNotified',
      yesterdayFieldName: undefined, //from latest
      svgLineFieldName: 'ClustersNotified',
      dateField: 'StatisticsProfileDate',
    },
  ];
  const temp = () => {};

  return (
    <SectionWrapSimple>
      {latest ? (
        <div className={classes.summaryWrap}>
          <div className={classes.summaryInfoWrap}>
            {infoStats.map((info) => (
              <SummaryBox
                key={info.fieldName}
                niceStats={niceStats}
                xScale={xScale}
                yScale={yScale}
                temp={temp}
                fieldName={info.fieldName}
                yesterdayFieldName={info.yesterdayFieldName}
                latest={latest}
                text={info.title}
                dateField={info.dateField}
                svgLineFieldName={info.svgLineFieldName}
              />
            ))}
          </div>
          <span
            style={{
              color: 'var(--gray)',
              fontSize: '0.7rem',
              fontWeight: 'normal',
            }}
          >
            *Latest daily figures
            <br />
            Last Updated: {new Date(latest.Date).toString().substring(0, 15)}
          </span>
        </div>
      ) : (
        '  Loading...'
      )}
    </SectionWrapSimple>
  );
};

export default Summary;
