import React from 'react';
import './App.css';
import Layout from './components/layout';
import Daily from './components/Daily/daily';
import Header from './components/Header/header';
import ProfileStats from './components/ProfileStats/profileStats';
import Counties from './components/Counties/counties';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Layout>
          <Route exact path="/" component={Daily} />
          <Route exact path="/stats" component={ProfileStats} />
          <Route exact path="/counties" component={Counties} />
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
