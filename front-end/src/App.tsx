import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import Footer from './layout/Footer/Footer'
import Header from './layout/Header/Header'
import Main from './layout/Main/Main'
// import Background from './components/Background/Background'

const App: React.FC = () => {

  return (
    <div className="app container g-0 p-0">
      <div className="row w-100 g-0">
      {/* <Background /> */}
        <Router>
          <div className="col-12 sticky-top">
            <Header />
          </div>
          <div className="col-12 g-0">
            <Main />
          </div>
          <div className="col-12">
            <Footer />
          </div>
      </Router>
      </div>
    </div>
  );
};

export default App
