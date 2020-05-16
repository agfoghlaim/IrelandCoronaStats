export const COUNTIES = {
  ONE_DAY: 86400000,
  uriLatestAllCounties: `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=CountyName,PopulationCensus16,ConfirmedCovidCases,PopulationProportionCovidCases,FID,TimeStampDate&outSR=4326&resultRecordCount=26&orderByFields=TimeStampDate%20DESC&returnGeometry=false&f=json`,

  allCountiesAllResultsConfirmedCasesMoreThanZero: `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIrelandOpenData/FeatureServer/0/query?where=ConfirmedCovidCases>0&1%3D1&outFields=CountyName,PopulationCensus16,ConfirmedCovidCases,PopulationProportionCovidCases,FID,TimeStampDate&returnGeometry=false&outSR=4326&f=json`,

  PROVINCES: [
    {
      name: 'connaught',
      counties: [
        { name: 'Mayo', reg: 'MO' },
        { name: 'Galway', reg: 'G' },
        { name: 'Sligo', reg: 'SO' },
        { name: 'Leitrim', reg: 'LM' },
        { name: 'Roscommon', reg: 'RN' },
      ],
    },
    {
      name: 'ulster',
      counties: [
        { name: 'Donegal', reg: 'DL' },
        { name: 'Monaghan', reg: 'MN' },
        { name: 'Cavan', reg: 'CN' },
      ],
    },
    {
      name: 'leinster',
      counties: [
        { name: 'Longford', reg: 'LD' },
        { name: 'Westmeath', reg: 'WH' },
        { name: 'Louth', reg: 'LH' },
        { name: 'Meath', reg: 'MH' },
        { name: 'Dublin', reg: 'D' },
        { name: 'Wicklow', reg: 'WW' },
        { name: 'Wexford', reg: 'WX' },
        { name: 'Kilkenny', reg: 'KK' },
        { name: 'Carlow', reg: 'CW' },
        { name: 'Kildare', reg: 'KE' },
        { name: 'Laois', reg: 'LS' },
        { name: 'Offaly', reg: 'OY' },
      ],
    },
    {
      name: 'munster',
      counties: [
        { name: 'Cork', reg: 'C' },
        { name: 'Kerry', reg: 'KY' },
        { name: 'Limerick', reg: 'L' },
        { name: 'Clare', reg: 'CE' },
        { name: 'Tipperary', reg: 'T' },
        { name: 'Waterford', reg: 'W' },
      ],
    },
  ],
};

export const SUMMARY = {
  dailyStatsSoFarUrl: `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=ConfirmedCovidCases,Date,ConfirmedCovidDeaths,TotalCovidDeaths,ConfirmedCovidRecovered,TotalConfirmedCovidCases,HospitalisedCovidCases,RequiringICUCovidCases,HealthcareWorkersCovidCases,ClustersNotified,StatisticsProfileDate&outSR=4326&f=json`,

  infoStats: [
    {
      title: 'Confirmed Cases',
      shortTitle: '# Cases',
      fieldName: 'TotalConfirmedCovidCases',
      yesterdayFieldName: 'ConfirmedCovidCases', //from latest
      svgLineFieldName: 'ConfirmedCovidCases',
      dateField: 'Date',
    },
    {
      title: 'Confirmed Recovered',
      shortTitle: '# Recovered',
      fieldName: 'ConfirmedCovidRecovered',
      yesterdayFieldName: undefined, //from latest
      svgLineFieldName: 'ConfirmedCovidRecovered',
      dateField: 'Date',
    },
    {
      title: 'Confirmed Deaths',
      shortTitle: '# Deaths',
      fieldName: 'TotalCovidDeaths',
      yesterdayFieldName: 'ConfirmedCovidDeaths', //from latest
      svgLineFieldName: 'ConfirmedCovidDeaths',
      dateField: 'Date',
    },
    {
      title: 'Hospitalised',
      shortTitle: '# Hospitalised',
      fieldName: 'HospitalisedCovidCases',
      yesterdayFieldName: undefined, //from latest
      svgLineFieldName: 'HospitalisedCovidCases',
      dateField: 'StatisticsProfileDate',
    },
    {
      title: '# ICU',
      shortTitle: '# in ICU',
      fieldName: 'RequiringICUCovidCases',
      yesterdayFieldName: undefined, //from latest
      svgLineFieldName: 'RequiringICUCovidCases',
      dateField: 'StatisticsProfileDate',
    },

    {
      title: 'Healthcare Workers Cases',
      shortTitle: '# Healthcare Workers',
      fieldName: 'HealthcareWorkersCovidCases',
      yesterdayFieldName: undefined, //from latest
      svgLineFieldName: 'HealthcareWorkersCovidCases',
      dateField: 'StatisticsProfileDate',
    },
    {
      title: 'Clusters',
      shortTitle: '# Clusters',
      fieldName: 'ClustersNotified',
      yesterdayFieldName: undefined, //from latest
      svgLineFieldName: 'ClustersNotified',
      dateField: 'StatisticsProfileDate',
    },
  ],
};

export const ALTSTATS = {
  profileStatsUrl: `https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=StatisticsProfileDate,CovidCasesConfirmed,HospitalisedCovidCases,RequiringICUCovidCases,HealthcareWorkersCovidCases,ClustersNotified,HospitalisedAged5,HospitalisedAged5to14,HospitalisedAged15to24,HospitalisedAged25to34,HospitalisedAged35to44,HospitalisedAged45to54,HospitalisedAged55to64,HospitalisedAged65up,Male,Female,Unknown,Aged1,Aged1to4,Aged5to14,Aged15to24,Aged25to34,Aged35to44,Aged45to54,Aged55to64,Aged65up,Median_Age,CommunityTransmission,CloseContact,TravelAbroad,UnderInvestigation,FID&returnGeometry=false&outSR=4326&f=json`
}
