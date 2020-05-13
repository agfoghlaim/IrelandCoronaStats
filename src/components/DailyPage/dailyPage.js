import React from 'react';
import Layout from '../layout';
import Summary from '../Summary/summary';
import ExtraInfo from './ExtraInfo/extraInfo';
import DailyGraphs from '../DailyGraphs/dailyGraphs';

const DailyPage = () => (
  <Layout>
    <Summary />
    <DailyGraphs />
    <ExtraInfo />
  </Layout>
);

export default DailyPage;
