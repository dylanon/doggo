import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import firebase from './firebase';
import {actionsRef} from './firebase'
import moment from 'moment';
import Header from './header';
import ActionForm from './actionForm';
import ActionList from './actionList';
import Log from './log';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      actions: [],
      log: [],
      filterBy: '',
      filterByName: ''
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

  componentDidMount() {
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
        <Header />
        <main>
          {/* <Switch>

          </Switch> */}
          <ActionForm />
          <ActionList storedActions={this.state.actions} />
          <Log log={this.state.log} filterBy={this.state.filterBy} filterByName={this.state.filterByName} filterLog={this.filterLog} resetFilter={this.resetFilter}/>
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
