import React, { useEffect } from 'react';

// style
import './App.css';

// react router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// redux
import { Provider } from 'react-redux';

// components
import Home from './components/Home';
import Navbar from './components/Navbar';
import Contact from './components/Contact';

function App() {
  return (
    <div className='App'>
      <Router>
        <>
          <Navbar />
          <Route exact path='/' component={Home} />

          <Switch>
            <React.Fragment>
              <Route exact path='/contact' component={Contact} />
            </React.Fragment>
          </Switch>
        </>
      </Router>
    </div>
  );
}

export default App;
