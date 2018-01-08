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
        <ul className="no-actions-instructions__container">
          <li className="no-actions-instructions__card">
            <div className="no-actions-instructions__content">
              <p className="no-actions-instructions__text--highlight">You haven't created any dog care actions to track yet.</p>
              <p className="no-actions-instructions__text">Create some actions above, and they'll appear here!</p>
            </div>
          </li>
          <li className="no-actions-instructions__card">
            <div className="no-actions-instructions__content">
              <p className="no-actions-instructions__text">Some examples:</p>
              <ul className="no-actions-instructions__list fa-ul">
                <li className="no-actions-instructions__list-item">
                  <i className="fa-li fa fa-paw"></i>Feeding
                </li>
                <li className="no-actions-instructions__list-item">
                  <i className="fa-li fa fa-paw"></i>Brushing (teeth or fur!)
                </li>
                <li className="no-actions-instructions__list-item">
                  <i className="fa-li fa fa-paw"></i>Nail trimming
                </li>
                <li className="no-actions-instructions__list-item">
                  <i className="fa-li fa fa-paw"></i> Veterinary check-ups
                </li>
                <li className="no-actions-instructions__list-item">
                  <i className="fa-li fa fa-paw"></i>Medication doses
                </li>
                <li className="no-actions-instructions__list-item">
                  <i className="fa-li fa fa-paw"></i>Treats :)
                </li>
              </ul>
            </div>
          </li>
          <li className="no-actions-instructions__card">
            <div className="no-actions-instructions__content">
              <p className="no-actions-instructions__text">Track anything you want!</p>
              <p className="no-actions-instructions__text">Add descriptions with info you need to remember</p>
              <p className="no-actions-instructions__text">(e.g. for an action called <strong>Feed Me</strong>, you could specify <em>125g, twice daily</em>.</p>
            </div>
          </li>
        </ul>
      )
    }
    return (
      <div>
        <h2>My Actions</h2>
        {content}
      </div>
    )
  }
}

export default ActionList;