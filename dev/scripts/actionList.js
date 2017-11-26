import React from 'react';
import firebase from './firebase';
import moment from 'moment';

class ActionList extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.setLastCompleted = this.setLastCompleted.bind(this);
  }

  handleClick(actionID, actionName) {
    // Set the database reference
    const logRef = firebase.database().ref(`users/${this.props.userID}/log`);
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
    e.stopPropagation();
    const deleteID = e.target.getAttribute('data-delete');
    const deleteRef = firebase.database().ref(`users/${this.props.userID}/actions/${deleteID}`)
    deleteRef.remove();
  }

  setLastCompleted(actionID, latestTimestamp) {
    const thisActionRef = firebase.database().ref(`users/${this.props.userID}/actions/${actionID}`);
    thisActionRef.update({
      lastCompleted: latestTimestamp
    });
  }

  render() {
    return (
      <div>
        <h2>Actions</h2>
        <ul className="action-list">
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
              <li key={action.key} className="action-card" 
                onClick={(e) => {
                  e.preventDefault();
                  this.handleClick(action.key, action.name)
                }}>
                <h3>{action.name}</h3>
                <p className="action-description">{action.description}</p>
                <p className="last-completed">Last completed: {lastCompletedString}</p>
                <a href="#" class="delete-action" data-delete={action.key} onClick={this.handleDelete}>X</a>
                <p className="action-instruction">Tap to complete</p>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default ActionList;