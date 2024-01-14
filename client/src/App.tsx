import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import Footer from './components/Footer/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <MainContent />
        <Footer />
      </div>
    </Router>
  );
};

export default App;