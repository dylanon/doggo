import React from 'react';
import firebase from './firebase';
import moment from 'moment';

const LogSection = (props) => {
    const date = props.date;
    const logArray = props.log;

    // Create today's heading
    const dateHeading = moment(date).format("MMMM Do, YYYY");

    // Grab only today's logs
    const todaysLogs = logArray.filter((entry) => {
        return entry.date === date;
    })

    return (
        <div>
            <h3>{dateHeading}</h3>
            <ul>
                {todaysLogs.map((entry) => {
                    return <LogItem key={entry.logID} entry={entry} userID={props.userID} filterFunction={props.filterFunction} filterBy={props.filterBy}/>
                })}
            </ul>
        </div>
    )
}

class LogItem extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.updateLastCompleted = this.updateLastCompleted.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.filterFunction(this.props.entry.actionID, this.props.entry.actionName);
    }

    handleDelete(e) {
        e.preventDefault();
        // Set up variables
        const logID = this.props.entry.logID;
        const entryRef = firebase.database().ref(`users/${this.props.userID}/log/${logID}`);
        // Delete the log entry
        entryRef.remove()
        .then(() => {
            this.updateLastCompleted();
        });
    }

    updateLastCompleted() {
        // Updates 'Last Completed' field of the related action
        // (in case the most recent log entry was deleted)
        // Set up variables
        const actionID = this.props.entry.actionID;
        const logRef = firebase.database().ref(`users/${this.props.userID}/log`);
        // Get the last log entry in the database that matches the action ID and store the timestamp
        logRef.orderByChild('actionID').equalTo(actionID).limitToLast(1).once('value', (snapshot) => {
            const snapshotObject = snapshot.val();
            let lastCompleted = 0;
            // Unwrap an object nested within an object
            for (let property in snapshotObject) {
                lastCompleted = snapshotObject[property].timestamp;
            }
            // Update the 'Last Completed' time of the related action in the database
            firebase.database().ref(`users/${this.props.userID}/actions/${actionID}`).update({
                lastCompleted: lastCompleted
            });
        });
    }

    render() {
        const entry = this.props.entry;
        return (
            <li>
                <p>You completed: {entry.actionName}</p>
                <p>{moment(entry.timestamp).format('h:mm a')}</p>
                {this.props.filterBy.length === 0 &&
                    <p><a href="#" onClick={this.handleClick}>View log for this action only</a></p>
                }
                <p><a href="#" onClick={this.handleDelete}>(Delete this entry)</a></p>
            </li>
        )
    }
}

export default LogSection;