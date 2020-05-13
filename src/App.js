import React from 'react';
import './App.css';
import Layout from './components/layout';
import DailyPage from './components/DailyPage/dailyPage';
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
   
          <Route exact path="/" component={DailyPage} />
          <Route exact path="/stats" component={ProfileStats} />
          <Route exact path="/counties" component={Counties} />
        
      </div>
    </BrowserRouter>
  );
}

export default App;
