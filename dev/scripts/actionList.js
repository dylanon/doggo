import React from 'react';
import firebase from './firebase';
import moment from 'moment';

class ActionList extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(actionID, actionName) {
    // Set the database reference
    const logRef = firebase.database().ref('users/dylanon/log');
    // Push timestamp, action id, and action name to log in firebase
    const timestamp = moment().valueOf();
    logRef.push({
      actionName: actionName,
      actionID: actionID,
      timestamp: timestamp
    });
    // Change last completed to 'Just now'
    this.setLastCompleted(actionID, timestamp);
  }

  handleDelete(e) {
    e.preventDefault();
    const deleteID = e.target.getAttribute('data-delete');
    const deleteRef = firebase.database().ref(`users/dylanon/actions/${deleteID}`)
    deleteRef.remove();
  }

  setLastCompleted(actionID, latestTimestamp) {
    const thisActionRef = firebase.database().ref(`users/dylanon/actions/${actionID}`);
    thisActionRef.update({
      lastCompleted: latestTimestamp
    });
  }

  render() {
    return (
      <div>
        <h2>Actions</h2>
        <ul>
          {this.props.storedActions.map(action => {
            // Generate the 'last completed' text
            let lastCompletedString = '';
            if (action.lastCompleted) {
              lastCompletedString = moment(action.lastCompleted).fromNow();
            } else {
              lastCompletedString = 'Never';
            }
            // Generate the markup
            return (
              <li key={action.key}>
                <p>{action.name} | <span>{action.description}</span></p>
                <p>Last completed: {lastCompletedString}</p>
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  this.handleClick(action.key, action.name)
                  }}>Complete Action (add to log)</a> | 
                <a href="#" id="delete-action" data-delete={action.key} onClick={this.handleDelete}>(Delete)</a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default ActionList;