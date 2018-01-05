import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import firebase from './firebase';
import moment from 'moment';
import PublicHome from './publicHome';
import Loader from './loader';
import Header from './header';
import Actions from './actions';
import Log from './log';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      authLoaded: false,
      actions: [],
      actionsLoaded: false,
      log: [],
      logLoaded: false,
      filterBy: '',
      filterByName: '',
      loggedIn: false,
      userID: '',
      navToggleClass: ''
    }
    this.filterLog = this.filterLog.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
  }

  filterLog(actionID, actionName) {
    this.setState({
        filterBy: actionID,
        filterByName: actionName
    });
  }

  resetFilter(e) {
    e.preventDefault();
    this.filterLog('');
  }

  logIn(e) {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider)
    .then((result) => {
      this.setState({
        loggedIn: true,
        userID: result.user.uid
      });
    });
  }

  logOut(e) {
    e.preventDefault();
    firebase.auth().signOut()
    .then(function() {
      console.log('sign out successful');
      // Refresh the browser from its cache
      document.location.reload(false);
    });
  }

  toggleNav() {
    if (this.state.navToggleClass.length > 1) {
      this.setState({
        navToggleClass: ''
      });
    } else {
      this.setState({
        navToggleClass: 'nav-active'
      });
    }
  }

  componentDidMount() {
    
    // Define a function to update log in state
    const setLogInState = (logInBoolean, userID) => {
      this.setState({
        loggedIn: logInBoolean,
        userID: userID,
        authLoaded: true
      });
    }
    
    const loadActions = () => {
      // Load actions from firebase
      const actionsRef = firebase.database().ref(`users/${this.state.userID}/actions`);
      actionsRef.on('value', (snapshot) => {
        const actions = snapshot.val();
        const newState = [];
        // Store the actions in a staging array
        for (let action in actions) {
          newState.push({
            key: action,
            name: actions[action].actionName,
            description: actions[action].actionDescription,
            lastCompleted: actions[action].lastCompleted
          });
        }
        // Update the state
        this.setState({
          actions: newState,
          actionsLoaded: true
        });
      }, (error) => {
        console.log('Could not retrieve actions.', error); 
      });
    }

    const loadLog = () => {
      // Set the database reference
      const logRef = firebase.database().ref(`users/${this.state.userID}/log`);
      
      // Load log data and listen for changes
      logRef.on('value', (snapshot) => {
          const retrievedLog = snapshot.val();
          const tempLog = [];
          for (let item in retrievedLog) {
              const logItem = {
                  logID: item,
                  actionID: retrievedLog[item].actionID,
                  actionName: retrievedLog[item].actionName,
                  timestamp: retrievedLog[item].timestamp,
                  date: moment(retrievedLog[item].timestamp).format('YYYY-MM-DD')
              }
              tempLog.push(logItem);
          }
  
          // Sort by timestamp (reverse chronological order)
          tempLog.sort((a, b) => b.timestamp - a.timestamp);
  
          // Update the state
          this.setState({
              log: tempLog,
              logLoaded: true
          });
      }, (error) => {
        console.log('Could not retrieve history.', error);
      });
    }

    // Listen for changes in auth
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setLogInState(true, user.uid);
        loadActions();
        loadLog();
      } else {
        setLogInState(false, '');
      }
    }, (error) => {
      console.log('Auth error.', error);
    });

  }

  render() {
    // Track if Firebase data has been loaded
    let dataLoaded;
    if (this.state.actionsLoaded && this.state.logLoaded) {
      dataLoaded = true;
    } else {
      dataLoaded = false;
    }

    // Build the content
    let content;
    if (this.state.authLoaded && this.state.loggedIn && dataLoaded) {
      // Show the logged in view with app data
      content = (
        <main>
          <div className="wrapper">
            <Switch>
              <Route exact path='/' render={(routeProps) => {
                return <Actions {...routeProps} userID={this.state.userID} storedActions={this.state.actions} /> 
              }} />
              <Route path='/history' render={(routeProps) => {
                return <Log {...routeProps} userID={this.state.userID} log={this.state.log} filterBy={this.state.filterBy} filterByName={this.state.filterByName} filterLog={this.filterLog} resetFilter={this.resetFilter} />
              }} />
            </Switch>
          </div>
        </main>
      );
    } else if (this.state.authLoaded && !this.state.loggedIn) {
      // Show the public home page
      content = <PublicHome logIn={this.logIn} />;
    } else {
      // Show the loader while we wait
      content = (
        <main className='main-loading'>
          <Loader />
        </main>
      )
    }

    return (
      <BrowserRouter>
        <div className="app-wrapper">
          <Header logIn={this.logIn} logOut={this.logOut} loggedIn={this.state.loggedIn} toggleNav={this.toggleNav} navToggleClass={this.state.navToggleClass} />
          {content}
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App /> , document.getElementById('app'));
