import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import DailyPage from './components/DailyPage/dailyPage';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import Counties from './components/Counties/counties';
import Contact from './components/Contact/contact';
import AltStats from './components/AltStats/altStats';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
          <Route exact path="/" component={DailyPage} />
          <Route exact path="/counties" component={Counties} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/stats" component={AltStats} />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
