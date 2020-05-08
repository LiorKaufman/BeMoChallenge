import React, { useEffect } from 'react';

// style
import './App.css';
import './resources/css/navbar.css';
import './resources/css/Login.css';
import './resources/css/Editpage.css';

// redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

// react router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// components
import Home from './components/Home';
import Navbar from './components/Navbar';
import Contact from './components/Contact';
import TextEditor from './components/TextEditor';
import Login from './components/auth/Login';
import EditPage from './components/EditPage';

// helpers
import setAuthToken from './helpers/setAuthToken';

function App() {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <div id='wrapper'>
        <Router>
          <>
            <div id='hwrap'>
              <Navbar />
            </div>
            <div className='box'></div>
            <Route exact path='/' component={Home} />

            <Switch>
              <React.Fragment>
                <Route exact path='/login' component={Login} />
                <Route exact path='/editing' component={EditPage} />
                <Route exact path='/contact' component={Contact} />
              </React.Fragment>
            </Switch>
          </>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
