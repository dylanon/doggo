import React from 'react';
import firebase from 'firebase';
import moment from 'moment';

class Log extends React.Component {
    constructor() {
        super();
        this.state = {
            log: [],
            dates: []
        }
    }

    componentDidMount() {
        // Set the database reference
        const logRef = firebase.database().ref('users/dylanon/log');
        // Load log data and listen for changes
        logRef.orderByChild('timestamp').on('value', (snapshot) => {
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

            // Order reverse chronologically
            tempLog.reverse();

            // Store each unique calendar date
            const uniqueDates = [];
            tempLog.forEach((entry) => {
                if (uniqueDates.includes(entry.date) === false) {
                    uniqueDates.push(entry.date);
                }
            });

            // Update the state
            this.setState({
                log: tempLog,
                dates: uniqueDates
            });
        });
    }

    render() {
        return (
            <div>
                <h2>Log</h2>
                <ul>
                    {this.state.log.map((entry) => {
                        const timestamp = moment(entry.timestamp);
                        const humanTime = timestamp.format("dddd, MMMM Do YYYY, h:mm a");
                        return (
                            <li key={entry.logID}>
                                <p>You completed: {entry.actionName}</p>
                                <p>{humanTime}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default Log;