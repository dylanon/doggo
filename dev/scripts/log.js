import React from 'react';
import firebase from 'firebase';
import moment from 'moment';
import LogSection from './logSection';

class Log extends React.Component {
    constructor() {
        super();
        this.state = {
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
        // Build the log heading text
        let logHeading = 'Log';
        if (this.state.filterBy.length > 0) {
            logHeading = logHeading + `: ${this.state.filterByName}`;
        }
        // Display the markup
        return (
            <div>
                <h2>{logHeading}</h2>
                {/* If the log has been filtered, show a link to reset */}
                {this.state.filterBy.length > 0 &&
                    <a href="#" onClick={this.resetFilter}>Display all actions</a>
                }
                {/* Map over the array of unique dates, display a section for each */}
                {uniqueDates.map((date) => {
                    return <LogSection key={date} date={date} log={logArray} filterFunction={this.filterLog} filterBy={this.state.filterBy}/>
                })}
            </div>
        )
    }
}

export default Log;