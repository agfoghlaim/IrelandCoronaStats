export const dailyGraphsStore = {
  description:
      '',
  allSliceData: [],
  graphs: [
  {
    name: 'DailyAlt',
    id: 1,
    sectionName: 'Daily Cases',
    description:
      '5 day average is average of current days new confirmed cases and 4 previous days.',
    xAxisLabel: '# cases',
    xAxisAttribute: 'Date',
    selectedAttributeNames: ['ConfirmedCovidCases'],
    selectedDate: '',
    selectedDateData: [],
    all: [],
    avail: [
      {
        name: 'New Cases',
        fieldName: 'ConfirmedCovidCases',
        xAxisDescription: 'Number of Confirmed Cases',
        xAxisAttribute: 'Date',
        selected: true,
        color: 'var(--covidPurple)',
        attrData: [],
      },
      {
        name: 'New Cases (5 day avg)',
        fieldName: 'AverageConfirmedCases',
        xAxisAttribute: 'Date',
        xAxisDescription: 'AverageConfirmedCases',
        selected: false,
        color: 'var(--covidOrange)',
        attrData: [],
      },
      {
        name: 'Total Cases',
        fieldName: 'TotalConfirmedCovidCases',
        xAxisDescription: 'Total Number of Confirmed Cases',
        xAxisAttribute: 'Date',
        selected: false,
        color: 'var(--white)',
        attrData: [],
      },
    ],
  },
  {
    name: 'DailyAlt',
    id: 2,
    sectionName: 'Daily Cases (Percentage Change)',
    description:
      'Percentage Change calculated as (V2 - V1) x 100 / V1. 5 day average is average of current day and 4 previous days. ',
    xAxisLabel: '% change',
    xAxisAttribute: 'Date',
    selectedAttributeNames: ['percentageDailyChange'],
    selectedDate: '',
    selectedDateData: [],
    all: [],
    avail: [
      {
        name: 'New Cases (% change)',
        fieldName: 'percentageDailyChange',
        xAxisAttribute: 'Date',
        xAxisDescription: '% Daily Change (newCases)',
        selected: true,
        color: 'var(--covidBlue)',
        attrData: [],
      },
      {
        name: 'New Cases (% change) 5 day avg',
        fieldName: 'percentageDailyChange5DayAverage',
        xAxisDescription: 'percentageDailyChange5DayAverage',
        xAxisAttribute: 'Date',
        selected: false,
        color: 'var(--covidPurple)',
        attrData: [],
      },
    ],
  },
  {
    name: 'DailyAlt',
    id: 3,
    sectionName: 'Deaths',
    description: '',
    xAxisLabel: '# deaths',
    xAxisAttribute: 'Date',
    selectedAttributeNames: ['ConfirmedCovidDeaths'],
    selectedDate: '',
    selectedDateData: [],
    all: [],
    avail: [
      {
        name: 'New Deaths',
        fieldName: 'ConfirmedCovidDeaths',
        xAxisDescription: 'Number of Deaths',
        xAxisAttribute: 'Date',
        selected: true,
        color: 'var(--white)',
        attrData: [],
      },

      {
        name: 'Total Deaths',
        fieldName: 'TotalCovidDeaths',
        xAxisDescription: 'Total Number of Deaths',
        xAxisAttribute: 'Date',
        selected: false,
        color: 'var(--covidOrange)',
        attrData: [],
      },
    ],
  },
  ],
}