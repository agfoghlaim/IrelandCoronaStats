import React from 'react';
import './App.css';
import Layout from './components/layout';
import Daily from './components/Daily/daily';
import Breakdown from './components/Breakdown/breakdown';
import Header from './components/Header/header';
import ProfileStats from './components/ProfileStats/profileStats';
// import Summary from './components/Summary/summary';
// import Summary from './components/Summary/summary';

function App() {
  return (
    <div className="App">
      <Header />
      <Layout>
        {/* <Summary /> */}
        <Daily />
        <ProfileStats />
        
        <Breakdown />
        {/* <ChartHooks /> */}
      </Layout>
    </div>
  );
}

export default App;
