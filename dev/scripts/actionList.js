import React from 'react';
import firebase from './firebase';

class ActionList extends React.Component {
  handleClick(actionID, actionName) {
    // Set the database reference
    const logRef = firebase.database().ref('users/dylanon/log');
    // Push timestamp, action id, and action name to log in firebase
    const timestamp = new Date();
    logRef.push({
      actionName: actionName,
      actionID: actionID,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    });
    // Change last completed to 'Just now'
  }

  handleDelete(e) {
    e.preventDefault();
    const deleteID = e.target.getAttribute('data-delete');
    const deleteRef = firebase.database().ref(`users/dylanon/actions/${deleteID}`)
    deleteRef.remove();
  }

  render() {
    return (
      <div>
        <h2>Actions</h2>
        <ul>
          {this.props.storedActions.map(action => {
            return (
              <li key={action.key}>
                <p>{action.name} | <span>{action.description}</span></p>
                <p>Last completed: Yesterday at 7:20am</p>
                <a href="#" id="log-action" onClick={() => {this.handleClick(action.key, action.name)}}>Complete Action (add to log)</a> | 
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