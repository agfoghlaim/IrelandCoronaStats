import React from 'react';
import './App.css';
import DailyPage from './components/DailyPage/dailyPage';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import ProfileStats from './components/ProfileStats/profileStats';
import Counties from './components/Counties/counties';
import Contact from './components/Contact/contact';

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
          <Route exact path="/contact" component={Contact} />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
