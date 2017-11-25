import React from 'react';
import LogSection from './logSection';

class Log extends React.Component {
    render() {
        // Get the array of log items
        let logArray = Array.from(this.props.log);
        // If there is an action to filter by, filter only those that match the action ID
        if (this.props.filterBy.length > 0) {
            logArray = logArray.filter((entry) => {
                return entry.actionID === this.props.filterBy;
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
        if (this.props.filterBy.length > 0) {
            logHeading = logHeading + `: ${this.props.filterByName}`;
        }
        // Display the markup
        return (
            <div>
                <h2>{logHeading}</h2>
                {/* If the log has been filtered, show a link to reset */}
                {this.props.filterBy.length > 0 &&
                    <a href="#" onClick={this.props.resetFilter}>Display all actions</a>
                }
                {/* Map over the array of unique dates, display a section for each */}
                {uniqueDates.map((date) => {
                    return <LogSection key={date} date={date} log={logArray} userID={this.props.userID} filterFunction={this.props.filterLog} filterBy={this.props.filterBy}/>
                })}
            </div>
        )
    }
}

export default Log;