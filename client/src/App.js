import React, { useEffect } from 'react';

// style
import './App.css';
import './resources/css/navbar.css';

// react router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// components
import Home from './components/Home';
import Navbar from './components/Navbar';
import Contact from './components/Contact';
import TextEditor from './components/TextEditor';

function App() {
  return (
    <div id='wrapper'>
      <Router>
        <>
          <div id='hwrap'>
            <Navbar />
          </div>
          <Route exact path='/' component={Home} />

          <Switch>
            <React.Fragment>
              <Route exact path='/editing' component={TextEditor} />
              <Route exact path='/contact' component={Contact} />
            </React.Fragment>
          </Switch>
        </>
      </Router>
    </div>
  );
}

export default App;
