import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import Footer from './components/Footer/Footer';
import "./App.css"

const App: React.FC = () => {
  return (
    <Router>
      <div className='app-container'>
        <Header />
        <div className="main-content">
          <MainContent />
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;