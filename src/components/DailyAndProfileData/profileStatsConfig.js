export const profileStatsStore = {
  description:
      'This data is part of a Daily Statistic Profile of Covid-19 made available by the Health Protection Surveillance Center. New data is released each evening and dates back to 12am two days previously.',
  allSliceData: [],
  graphs: [
  {
    name: 'transmissionType',
    id: 1,
    sectionName: 'Transmission Type',
    description: '',
    xAxisLabel: '#Cases',
    xAxisAttribute: 'StatisticsProfileDate',
    selectedAttributeNames: ['CommunityTransmission'],
    selectedDate: '',
    selectedDateData: [],
    all: [],
    avail: [
      {
        name: 'Community Transmission',
        fieldName: 'CommunityTransmission',
        xAxisDescription: '#Cases',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: true,
        color: 'var(--covidGreen)',
        attrData: [],
      },
      {
        name: 'Close Contact',
        fieldName: 'CloseContact',
        xAxisDescription: '#Cases',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'var(--blue)',
        attrData: [],
      },
      {
        name: 'Travel Abroad',
        fieldName: 'TravelAbroad',
        xAxisDescription: '#Cases',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'var(--covidYellow)',
        attrData: [],
      },
      {
        name: 'Under Investigation',
        fieldName: 'UnderInvestigation',
        xAxisDescription: '#Cases',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'var(--orange)',
        attrData: [],
      },
      {
        name: 'Analysis based on #cases',
        fieldName: 'CovidCasesConfirmed',
        xAxisDescription: '#Cases',
        xAxisAttribute: 'StatisticsProfileDate',
        selected: false,
        color: 'var(--white)',
        attrData: [],
      },
    ],
  },
  {
    name: 'hospitalisations',
    id: 2,
    sectionName: 'Hospitalisations',
    description:'',
    xAxisLabel: '#Cases Hospitalised',
    xAxisAttribute: 'StatisticsProfileDate',
    selectedAttributeNames: ['HospitalisedCovidCases'],
    selectedDate: '',
    selectedDateData: [],
    all: [],
    avail: [
      {
        name: 'Hospitalised',
        fieldName: 'HospitalisedCovidCases',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Cases Hospitalised',
        selected: true,
        color: 'var(--covidYellow)',
        attrData: [],
      },
      {
        name: 'Requiring ICU',
        fieldName: 'RequiringICUCovidCases',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Cases Hospitalised',
        selected: false,
        color: 'var(--covidGreen)',
        attrData: [],
      },

      {
        name: 'Analysis based on #cases',
        fieldName: 'CovidCasesConfirmed',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Cases Hospitalised',
        selected: false,
        color: 'var(--white)',
        attrData: [],
      },
    ],
  },
  {
    name: 'genderProfiles',
    id: 3,
    sectionName: 'Gender Profiles',
    description: '',
    xAxisLabel: '# Cases',
    xAxisAttribute: 'StatisticsProfileDate',
    selectedAttributeNames: ['Female'],
    selectedDate: '',
    selectedDateData: [],
    all: [],
    avail: [
      {
        name: 'Female',
        fieldName: 'Female',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '# Cases',
        selected: true,
        color: 'var(--covidYellow)',
        attrData: [],
      },
      {
        name: 'Male',
        fieldName: 'Male',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '# Cases',
        selected: false,
        color: 'var(--covidGreen)',
        attrData: [],
      },
      {
        name: 'Unknown',
        fieldName: 'Unknown',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '# Cases',
        selected: false,
        color: 'var(--blue)',
        attrData: [],
      },
      {
        name: 'Analysis based on #cases',
        fieldName: 'CovidCasesConfirmed',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '# Cases',
        selected: false,
        color: 'var(--white)',
        attrData: [],
      },
    ],
  },
  {
    name: 'ageProfiles',
    id: 4,
    sectionName: 'Age Profiles',
    description: '',
    xAxisLabel: '#Cases in Age Group',
    xAxisAttribute: 'StatisticsProfileDate',
    selectedAttributeNames: ['Aged65up'],
    selectedDate: '',
    selectedDateData: [],
    all: [],
    avail: [
      {
        name: 'Aged 65 and up',
        fieldName: 'Aged65up',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Cases in Age Group',
        selected: true,
        color: 'var(--covidPink)',
        attrData: [],
      },
      {
        name: 'Aged 55 to 64',
        fieldName: 'Aged55to64',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Cases in Age Group',
        selected: false,
        color: 'var(--purple)',
        attrData: [],
      },
      {
        name: 'Aged 45 to 54',
        fieldName: 'Aged45to54',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Cases in Age Group',
        selected: false,
        color: 'var(--blue)',
        attrData: [],
      },
      {
        name: 'Aged 35 to 44',
        fieldName: 'Aged35to44',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Cases in Age Group',
        color: 'var(--covidPurple)',
        attrData: [],
        selected: false,
      },
      {
        name: 'Aged 25 to 34',
        fieldName: 'Aged25to34',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Cases in Age Group',
        selected: false,
        color: 'var(--covidGreen)',
        attrData: [],
      },
      {
        name: 'Aged 15 to 24',
        fieldName: 'Aged15to24',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Cases in Age Group',
        selected: false,
        color: 'var(--covidYellow)',
        attrData: [],
      },
      {
        name: 'Aged 5 to 14',
        fieldName: 'Aged5to14',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Cases in Age Group',
        selected: false,
        color: 'var(--covidGreen)',
        attrData: [],
      },
      {
        name: 'Aged 1 to 4',
        fieldName: 'Aged1to4',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Cases in Age Group',
        selected: false,
        color: 'var(--orange)',
        attrData: [],
      },
      {
        name: 'Aged 1',
        fieldName: 'Aged1',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Cases in Age Group',
        selected: false,
        color: 'var(--covidOrange)',
        attrData: [],
      },
      {
        name: 'Analysis based on #cases',
        fieldName: 'CovidCasesConfirmed',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Cases in Age Group',
        selected: false,
        color: 'var(--white)',
        attrData: [],
      },
    ],
  },
  {
    name: 'hospitalisedAgeProfiles',
    id: 5,
    sectionName: 'Age Profiles (Hospitalised)',
    description: '',
    xAxisLabel: '#Hospitalised in Age Group',
    xAxisAttribute: 'StatisticsProfileDate',
    selectedAttributeNames: ['HospitalisedAged65up'],
    selectedDate: '',
    selectedDateData: [],
    all: [],
    avail: [
      {
        name: 'Hospitalised Aged 65 and up',
        fieldName: 'HospitalisedAged65up',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Hospitalised in Age Group',
        selected: true,
        color: 'var(--covidPink)',
        attrData: [],
      },
      {
        name: 'Hospitalised Aged 55 to 64',
        fieldName: 'HospitalisedAged55to64',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Hospitalised in Age Group',
        selected: false,
        color: 'var(--purple)',
        attrData: [],
      },
      {
        name: 'Hospitalised Aged 45 to 54',
        fieldName: 'HospitalisedAged45to54',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Hospitalised in Age Group',
        selected: false,
        color: 'var(--covidBlue)',
        attrData: [],
      },
      {
        name: 'Hospitalised Aged 35 to 44',
        fieldName: 'HospitalisedAged35to44',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Hospitalised in Age Group',
        color: 'var(--covidPurple)',
        attrData: [],
        selected: false,
      },
      {
        name: 'Hospitalised Aged 25 to 34',
        fieldName: 'HospitalisedAged25to34',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Hospitalised in Age Group',
        selected: false,
        color: 'var(--covidGreen)',
        attrData: [],
      },
      {
        name: 'Hospitalised Aged 15 to 24',
        fieldName: 'HospitalisedAged15to24',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Hospitalised in Age Group',
        selected: false,
        color: 'var(--covidYellow)',
        attrData: [],
      },
      {
        name: 'Hospitalised Aged 5 to 14',
        fieldName: 'HospitalisedAged5to14',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Hospitalised in Age Group',
        selected: false,
        color: 'var(--covidGreen)',
        attrData: [],
      },
      {
        name: 'Hospitalised Aged 5',
        fieldName: 'HospitalisedAged5',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Hospitalised in Age Group',
        selected: false,
        color: 'var(--orange)',
        attrData: [],
      },
      {
        name: 'Total Hospitalised',
        fieldName: 'HospitalisedCovidCases',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Hospitalised in Age Group',
        selected: false,
        color: 'var(--covidOrange)',
        attrData: [],
      },
      {
        name: 'Total Requiring ICU',
        fieldName: 'RequiringICUCovidCases',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Hospitalised in Age Group',
        selected: false,
        color: 'var(--covidYellow)',
        attrData: [],
      },
      {
        name: 'Analysis based on #cases',
        fieldName: 'CovidCasesConfirmed',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Hospitalised in Age Group',
        selected: false,
        color: 'var(--white)',
        attrData: [],
      },
    ],
  },
  {
    name: 'hospitalisedAndCasesAgeProfiles',
    id: 6,
    sectionName: 'Age Profiles (Hospitalised Vs Cases)',
    description: '',
    xAxisLabel: '#Cases vs #Hospitalised in Age Group',
    xAxisAttribute: 'StatisticsProfileDate',
    selectedAttributeNames: ['HospitalisedAged65up'],
    selectedDate: '',
    selectedDateData: [],
    all: [],
    avail: [
      {
        name: 'Aged 65 and up (Hospitalised)',
        fieldName: 'HospitalisedAged65up',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Cases vs #Hospitalised in Age Group',
        selected: true,
        color: 'var(--covidPink)',
        attrData: [],
      },
      {
        name: 'Aged 65 and up (Cases)',
        fieldName: 'Aged65up',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Cases vs #Hospitalised in Age Group',
        selected: false,
        useDifferentShape: true,
        color: 'var(--covidPink)',
        attrData: [],
      },
      {
        name: 'Aged 55 to 64 (Hospitalised)',
        fieldName: 'HospitalisedAged55to64',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Cases vs #Hospitalised in Age Group',
        selected: false,
        color: 'var(--purple)',
        attrData: [],
      },
      {
        name: 'Aged 55 to 64 (Cases)',
        fieldName: 'Aged55to64',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Cases vs #Hospitalised in Age Group',
        selected: false,
        useDifferentShape: true,
        color: 'var(--purple)',
        attrData: [],
      },
      {
        name: 'Aged 45 to 54 (Hospitalised)',
        fieldName: 'HospitalisedAged45to54',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Cases vs #Hospitalised in Age Group',
        selected: false,
        color: 'var(--blue)',
        attrData: [],
      },
      {
        name: 'Aged 45 to 54 (Cases)',
        fieldName: 'Aged45to54',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Cases vs #Hospitalised in Age Group',
        selected: false,
        useDifferentShape: true,
        color: 'var(--blue)',
        attrData: [],
      },
      {
        name: 'Aged 35 to 44 (Hospitalised) ',
        fieldName: 'HospitalisedAged35to44',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Cases vs #Hospitalised in Age Group',
        color: 'var(--covidPurple)',
        attrData: [],
        selected: false,
      },
      {
        name: 'Aged 35 to 44 (Cases)',
        fieldName: 'Aged35to44',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Cases vs #Hospitalised in Age Group',
        color: 'var(--covidPurple)',
        attrData: [],
        selected: false,
        useDifferentShape: true,
      },
      {
        name: 'Aged 25 to 34 (Hospitalised)',
        fieldName: 'HospitalisedAged25to34',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Cases vs #Hospitalised in Age Group',
        selected: false,
        color: 'var(--covidGreen)',
        attrData: [],
      },
      {
        name: 'Aged 25 to 34 (Cases)',
        fieldName: 'Aged25to34',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Cases vs #Hospitalised in Age Group',
        selected: false,
        useDifferentShape: true,
        color: 'var(--covidGreen)',
        attrData: [],
      },
      {
        name: 'Aged 15 to 24 (Hospitalised)',
        fieldName: 'HospitalisedAged15to24',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Cases vs #Hospitalised in Age Group',
        selected: false,
        color: 'var(--covidYellow)',
        attrData: [],
      },
      {
        name: 'Aged 15 to 24 (Cases)',
        fieldName: 'Aged15to24',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Cases vs #Hospitalised in Age Group',
        selected: false,
        useDifferentShape: true,
        color: 'var(--covidYellow)',
        attrData: [],
      },
      {
        name: 'Aged 5 to 14 (Hospitalised)',
        fieldName: 'HospitalisedAged5to14',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Cases vs #Hospitalised in Age Group',
        selected: false,
        color: 'var(--covidGreen)',
        attrData: [],
      },
      {
        name: 'Aged 5 (Hospitalised)',
        fieldName: 'HospitalisedAged5',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Cases vs #Hospitalised in Age Group',
        selected: false,
        color: 'var(--orange)',
        attrData: [],
      },
      {
        name: 'Aged 1 to 4 (Cases)',
        fieldName: 'Aged1to4',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Cases vs #Hospitalised in Age Group',
        selected: false,
        color: 'var(--orange)',
        attrData: [],
      },
      {
        name: 'Analysis based on #cases',
        fieldName: 'CovidCasesConfirmed',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '#Cases vs #Hospitalised in Age Group',
        selected: false,
        color: 'var(--white)',
        attrData: [],
      },
    ],
  },
  {
    name: 'clusters',
    id: 7,
    sectionName: 'Clusters',
    description: '',
    xAxisLabel: '# Clusters Notified',
    xAxisAttribute: 'StatisticsProfileDate',
    selectedAttributeNames: ['ClustersNotified'],
    selectedDate: '',
    selectedDateData: [],
    all: [],
    avail: [
      {
        name: 'Clusters',
        fieldName: 'ClustersNotified',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '# Clusters Notified',
        selected: true,
        color: 'var(--covidYellow)',
        attrData: [],
      },
    ],
  },
  {
    name: 'medianAge',
    id: 8,
    sectionName: 'Median Age',
    description: '',
    xAxisLabel: '# Median age of Cases',
    xAxisAttribute: 'StatisticsProfileDate',
    selectedAttributeNames: ['Median_Age'],
    selectedDate: '',
    selectedDateData: [],
    all: [],
    avail: [
      {
        name: 'Median Age',
        fieldName: 'Median_Age',
        xAxisAttribute: 'StatisticsProfileDate',
        xAxisDescription: '# Median age of Cases',
        selected: true,
        color: 'var(--covidYellow)',
        attrData: [],
      },
     
    ],
  },
  ],
}