import React from 'react';
import './App.css';
import Layout from './components/layout';
import Daily from './components/Daily/daily';
import Breakdown from './components/Breakdown/breakdown';
import Header from './components/Header/header';
import ProfileStats from './components/ProfileStats/profileStats';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
// import Summary from './components/Summary/summary';
// import Summary from './components/Summary/summary';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Layout>
          {/* <Summary /> */}
          <Route exact path="/" component={Daily} />
          {/* <Daily /> */}
          <Route exact path="/stats" component={ProfileStats} />
          {/* <ProfileStats /> */}

          <Breakdown />
          {/* <ChartHooks /> */}
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
