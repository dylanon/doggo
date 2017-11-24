import React from 'react';
import firebase from 'firebase';
import moment from 'moment';
import LogSection from './logSection';

class Log extends React.Component {
    constructor() {
        super();
        this.state = {
            log: [],
            filterBy: '-KzfUEHo07K0M6aqceIi',
        }
    }

    componentDidMount() {
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
        // Get the array of log items
        let logArray = Array.from(this.state.log);
        // If there is an action to filter by, filter only those that match the action ID
        if (this.state.filterBy.length > 0) {
            logArray = logArray.filter((entry) => {
                return entry.actionID === this.state.filterBy;
            });
        }
        // Store each unique calendar date
        const uniqueDates = [];
        logArray.forEach((entry) => {
            if (uniqueDates.includes(entry.date) === false) {
                uniqueDates.push(entry.date);
            }
        });
        // Display the markup
        return (
            <div>
                <h2>Log</h2>
                {/* Map over the array of unique dates, display a section for each */}
                {uniqueDates.map((date) => {
                    return <LogSection key={date} date={date} log={logArray}/>
                })}
            </div>
        )
    }
}

export default Log;