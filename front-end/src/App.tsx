import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import Footer from './layout/Footer/Footer'
import Header from './layout/Header/Header'
import Main from './layout/Main/Main'
// import Background from './components/Background/Background'

const App: React.FC = () => {

  return (
    <div className="app container p-0">
      <div className="row">
      {/* <Background /> */}
      <Router>
        <Header />
        <Main />
        <Footer />
      </Router>
      </div>
    </div>
  );
};

export default App
