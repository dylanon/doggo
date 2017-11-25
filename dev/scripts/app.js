import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import firebase from './firebase';
import {actionsRef} from './firebase'
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
      loggedIn: false
    }
    this.filterLog = this.filterLog.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
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
    firebase.auth().signInWithRedirect(provider);
    // firebase.auth().signInWithPopup(provider).then(function(result) {
    //   // This gives you a Google Access Token. You can use it to access the Google API.
    //   var token = result.credential.accessToken;
    //   // The signed-in user info.
    //   var user = result.user;
    //   // ...
    //   console.log(`signed in`);
    //   console.log(user);
    // }).catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // The email of the user's account used.
    //   var email = error.email;
    //   // The firebase.auth.AuthCredential type that was used.
    //   var credential = error.credential;
    //   // ...
    // });
  }

  logOut(e) {
    e.preventDefault();
    firebase.auth().signOut().then(function() {
      console.log('sign out successful');
    }).catch(function(error) {
      console.log('oops - signing out did not go so well. try again.');
    });
  }

  componentDidMount() {
    // // Get sign-in info after redirect
    // firebase.auth().getRedirectResult().then(function(result) {
    //   if (result.credential) {
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     var token = result.credential.accessToken;
    //     // ...
    //   }
    //   // The signed-in user info.
    //   var user = result.user;
    // }).catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // The email of the user's account used.
    //   var email = error.email;
    //   // The firebase.auth.AuthCredential type that was used.
    //   var credential = error.credential;
    //   // ...
    // });
    
    // Define a function to update log in state
    const setLogInState = (logInBoolean) => {
      this.setState({
        loggedIn: logInBoolean
      });
      if (this.state.loggedIn) {
        console.log('user is logged in');
      }
    }

    // Listen for changes in auth
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setLogInState(true);
      } else {
        setLogInState(false);
      }
    });

    // Load actions from firebase
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
        <Header logIn={this.logIn} logOut={this.logOut} />
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
