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

  handleDelete(actionID) {
    const deleteID = actionID;
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
    let content;
    if (this.props.storedActions.length > 0) {
      content = (
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
                <p className="last-completed">Last completed: <span className="text-accent">{lastCompletedString}</span></p>
                <div className="delete-control">
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.handleDelete(action.key);
                    }} aria-label="Delete this action permanently" title="Delete permanently"><i className="fa fa-times" aria-hidden="true"></i></a>
                </div>
                <p className="action-instruction">Tap to complete</p>
              </li>
            )
          })}
        </ul>
      )
    } else {
      content = (
        <div>
          <p>You haven't created any dog care actions to track yet.</p>
          <p>You can track anything you want! For example:</p>
          <ul>
            <li>Feeding</li>
            <li>Brushing (teeth or fur!)</li>
            <li>Nail trimming</li>
            <li>Veterinary check-ups</li>
            <li>Medication doses</li>
            <li>Treats :)</li>
          </ul>
          <p>You can also add a descriptions with info you need to remember (e.g. for an action called <strong>Feed Me</strong>, you could specify <em>125g, twice daily</em>.</p>
          <p>Create some actions above, and they'll appear here!</p>
        </div>
      )
    }
    return (
      <div>
        <h2>Actions</h2>
        {content}
      </div>
    )
  }
}

export default ActionList;