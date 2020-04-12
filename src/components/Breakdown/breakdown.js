// https://opendata-geohive.hub.arcgis.com/datasets/85a9a285659e40099b2fa63077dbd857_0/data

// CovidDailyStatisticsProfileHPSCIreland gives stats for one day (ie. latest). Doesn't seem to be regurally updated though.
import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../layout';
import axios from 'axios';
import BreakdownChart from './breakdownChart';
import classes from './breakdown.module.css';


// Summary
// const breakdownUrl =
  // 'https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidDailyStatisticsProfileHPSCIreland/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json';

// other endpoint (above) only returns latest data but isn't updated regurally. Use this, it contains data for each day and filter for the newest.
const breakdownUrl = `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=StatisticsProfileDate,CovidCasesConfirmed,HospitalisedCovidCases,RequiringICUCovidCases,Male,Female,Unknown,Aged1,Aged1to4,Aged5to14,Aged15to24,Aged25to34,Aged35to44,Aged45to54,Aged55to64,Aged65up,CommunityTransmission,CloseContact,TravelAbroad,UnderInvestigation,FID&outSR=4326&f=json`;
const Breakdown = () => {
  //const [roi, setRoi] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [breakdown, setBreakdown] = useState([]);
  const [genderBreakdown, setGenderBreakdown] = useState([]);
  const [ageBreakdown, setAgeBreakdown] = useState([]);
  const [transTypeBreakdown, setTransTypeBreakdown] = useState([]);
  const [hospitalisedVsIcuBreakdown, setHospitalisedVsIcuBreakdown] = useState(
    []
  );
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await getBreakdownStats();
        // console.log(data)
        setIsLoading(false);
        setBreakdown(data);
        sortData(data[0]);
      } catch (e) {
        setIsError(true);
      }
    })();
  }, []);
  useEffect(() => {});
  const sortData = (breakdown) => {
    let newArr = [];
    Object.entries(breakdown.attributes).forEach(([key, value]) => {
      if (key === 'Date') return;
      let a = {};
      a.name = `${key}`;
      a.value = value;
      newArr.push(a);
    });

    setGenderBreakdown(byGender(newArr));
    setAgeBreakdown(byAge(newArr));
    setTransTypeBreakdown(byTransmissionType(newArr));
    setHospitalisedVsIcuBreakdown(byHospitalisedVsIcu(newArr));
  };

  const byGender = (data) => {
    return data.filter((d) => ['Male', 'Female', 'Unknown'].includes(d.name));
  };

  const byAge = (data) => {
    return data.filter((d) =>
      [
        'Aged1',
        'Aged15to24',
        'Aged1to',
        'Aged25to34',
        'Aged35to44',
        'Aged45to54',
        'Aged55to64',
        'Aged5to1',
        'Aged65up',
      ].includes(d.name)
    );
  };

  const byTransmissionType = (data) => {
    return data.filter((d) =>
      [
        'CommunityTransmission',
        'CloseContact',
        'TravelAbroad',
        'UnderInvestigation',
      ].includes(d.name)
    );
  };

  const byHospitalisedVsIcu = (data) => {
    return data.filter((d) =>
      ['HospitalisedCovidCases', 'RequiringICUCovidCases'].includes(d.name)
    );
  };

  const getNewestBreakdown = (data) => {
    
    const datesOnly = data.map(d=>d.attributes.StatisticsProfileDate);
   
    const newestDate = Math.max(...datesOnly);

    const ans = data.filter(d=>d.attributes.StatisticsProfileDate === newestDate);

    return ans;
    
  }
  const getBreakdownStats = useCallback(async () => {
    try {
      const response = await axios.get(breakdownUrl);
      const latest = getNewestBreakdown(response.data.features)
      return latest;
    } catch (e) {
      setIsError(true);
      throw new Error('Could not get data', e);
    }
  }, []);

  return (
    <div className={classes.breakdownWrap}>
      {isError ? <p>There was an error.</p> : null}
      {genderBreakdown.length &&
      transTypeBreakdown.length &&
      ageBreakdown.length &&
      hospitalisedVsIcuBreakdown.length &&
      !isLoading &&
      !isError ? (
        <>
          <BreakdownChart
            breakdownData={breakdown}
            chartTitle="Gender"
            breakdown={genderBreakdown}
          />
          <BreakdownChart
            breakdownData={breakdown}
            chartTitle="Transmission Type"
            breakdown={transTypeBreakdown}
          />
          <BreakdownChart
            breakdownData={breakdown}
            chartTitle="Age Breakdown"
            breakdown={ageBreakdown}
          />
          <BreakdownChart
            breakdownData={breakdown}
            chartTitle="Hospital Vs ICU Breakdown - is this right for pie chart??"
            breakdown={hospitalisedVsIcuBreakdown}
          />
        </>
      ) : (
        <p>Loading</p>
      )}

      {/* <ul>
        {breakdown && breakdown.length
          ? breakdown.map((d) => {
              return (
                <div key={d.attributes.Date}>
                  <h2>{new Date(d.attributes.Date).toLocaleString()}</h2>
                  <p>Age 1: {d.attributes.Aged1}</p>
                  <p>15 - 24:: {d.attributes.Aged15to24}</p>
                  <p>25-34: {d.attributes.Aged25to34}</p>
                  <p>35-44: {d.attributes.Aged35to44}</p>
                  <p>45-54: {d.attributes.Aged45to54}</p>
                  <p>Aged55to64: {d.attributes.Aged55to64}</p>
                  <p>Aged5to14: {d.attributes.Aged5to14}</p>
                  <p>Aged65up: {d.attributes.Aged65up}</p>
                  <p>CloseContact: {d.attributes.CloseContact}</p>
                  <p>
                    CommunityTransmission: {d.attributes.CommunityTransmission}
                  </p>
                  <p>Female: {d.attributes.Female}</p>
                  <p>Male: {d.attributes.Male}</p>
                  <p>Unknown: {d.attributes.Unknown}</p>
                  <p>
                    RequiringICUCovidCases:{' '}
                    {d.attributes.RequiringICUCovidCases}
                  </p>
                  <p>
                    TotalConfirmedCovidCases:{' '}
                    {d.attributes.TotalConfirmedCovidCases}
                  </p>
                  <p>TravelAbroad: {d.attributes.TravelAbroad}</p>
                  <p> UnderInvestigation: {d.attributes.UnderInvestigation}</p>
                  <p>
                    HospitalisedCovidCases:{' '}
                    {d.attributes.HospitalisedCovidCases}
                  </p>
                </div>
              );
            })
          : 'oops'}
      </ul> */}
    </div>
  );
};

export default Breakdown;
