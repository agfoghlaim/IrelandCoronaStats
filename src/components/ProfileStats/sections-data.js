export  const sections = [
  {
    name: 'transmissionType',
    sectionName: 'Transmission Type',
    description:
      'This data is part of a Daily Statistic Profile of Covid-19 made available by the Health Protection Surveillance Center. New data is released each evening and dates back to 12am two days previously.',
    allUrl: `StatisticsProfileDate,CommunityTransmission,UnderInvestigation,CloseContact,CovidCasesConfirmed,TravelAbroad`,
    xAxisAttribute: 'StatisticsProfileDate',
    yAxisLabel: '#Cases',
    avail: [
      {
        name: 'Community Transmission',
        urlPart: `StatisticsProfileDate,CommunityTransmission`,
        fieldName: 'CommunityTransmission',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: true,
        color: 'var(--purple)',
        data: [],
      },
      {
        name: 'Under Investigation',
        urlPart: `StatisticsProfileDate,UnderInvestigation`,
        fieldName: 'UnderInvestigation',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'var(--orange)',
        data: [],
      },
      {
        name: 'Close Contact',
        urlPart: `StatisticsProfileDate,CloseContact`,
        fieldName: 'CloseContact',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'var(--blue)',
        data: [],
      },
      {
        name: 'Travel Abroad',
        urlPart: `StatisticsProfileDate,TravelAbroad`,
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
        urlPart: `StatisticsProfileDate,HospitalisedCovidCases`,
        fieldName: 'HospitalisedCovidCases',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: true,
        color: 'var(--purple)',
        data: [],
      },
      {
        name: 'Requiring ICU',
        urlPart: `StatisticsProfileDate,RequiringICUCovidCases`,
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
        selected: false,
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
        selected: false,
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