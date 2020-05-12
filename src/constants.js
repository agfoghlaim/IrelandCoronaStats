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
    }
  ]
};
