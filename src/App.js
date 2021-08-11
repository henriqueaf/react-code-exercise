import React, { useEffect } from 'react';
import logo from './logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListContainer from './components/List/container';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

// you should feel free to reorganize the code however you see fit
// including creating additional folders/files and organizing your
// components however you would like.

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">React Programming Exercise</h1>
      </header>
      <section className="container">
        <Router>
          <Switch>
            <Redirect from='/react-code-exercise' to='/' />
            <Route exact path={['/', '/:encryptedFilterParams']} component={ListContainer} />
          </Switch>
        </Router>
      </section>
    </div>
  );
}

export default App;
