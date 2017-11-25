import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import firebase from './firebase';
import moment from 'moment';
import Header from './header';
import Actions from './actions';
import Log from './log';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      actions: [],
      log: [],
      filterBy: '',
      filterByName: '',
      loggedIn: false,
      userID: ''
    }
    this.filterLog = this.filterLog.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
    this.logIn = this.logIn.bind(this);
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
    firebase.auth().signInWithPopup(provider)
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
    });
  }

  componentDidMount() {
    
    // Define a function to update log in state
    const setLogInState = (logInBoolean, userID) => {
      this.setState({
        loggedIn: logInBoolean,
        userID: userID
      });
    }

    // Listen for changes in auth
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setLogInState(true, user.uid);
      } else {
        setLogInState(false, '');
      }
    });

    // Load actions from firebase
    const actionsRef = firebase.database().ref('users/dylanon/actions');
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
        actions: newState
      });
    });

    // Set the database reference
    const logRef = firebase.database().ref('users/dylanon/log');
    
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
        });
    });
  }

  render() {
    return (
      <div>
        <Header logIn={this.logIn} logOut={this.logOut} loggedIn={this.state.loggedIn}/>
        <main>
          <Switch>
            <Route exact path='/' render={(routeProps) => {
              return (
                <div>
                  {this.state.loggedIn ? (
                    <Actions {...routeProps} storedActions={this.state.actions} /> 
                  ) : (
                    <a href="#" onClick={this.logIn}>Log In</a>
                  )}
                </div>
              )
            }} />
            <Route path='/log' render={(routeProps) => {
              return <Log {...routeProps} log={this.state.log} filterBy={this.state.filterBy} filterByName={this.state.filterByName} filterLog={this.filterLog} resetFilter={this.resetFilter}/>
            }} />
          </Switch>
        </main>
      </div>
    )
  }
}

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('app'));
