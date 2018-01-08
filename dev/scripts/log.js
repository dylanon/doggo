import React from 'react';
import LogSection from './logSection';
import { Link } from 'react-router-dom';

class Log extends React.Component {
    componentWillUnmount() {
        // Clear log filter so it's unfiltered when we return
        this.props.filterLog('', '');
    }

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
        let logHeading = 'History';
        if (this.props.filterBy.length > 0) {
            logHeading = logHeading + `: ${this.props.filterByName}`;
        }
        //
        let content;
        if (this.props.log.length > 0) {
            content = (
                <div>
                    {/* Map over the array of unique dates, display a section for each */}
                    {uniqueDates.map((date) => {
                        return <LogSection key={date} date={date} log={logArray} userID={this.props.userID} filterFunction={this.props.filterLog} filterBy={this.props.filterBy}/>
                    })}
                </div>
            );
        } else {
            let isFiltered = false;
            if (this.props.filterBy.length > 0) {
                isFiltered = true;
            }
            content = (
                <div className="no-log-instructions">
                    <p className="no-log-instructions__text--highlight">Oops! Looks like you haven't completed {isFiltered ? 'this action' : 'any actions'} yet.</p>
                    <p className="no-log-instructions__text">Go to your <Link to='/'>Actions </Link> to complete {isFiltered ? 'it' : 'one'}.</p>
                </div>
            )
        }
        // Display the markup
        return (
            <div className="log-container">
                <h2>{logHeading}</h2>
                {/* If the log has been filtered, show a link to reset */}
                {this.props.filterBy.length > 0 &&
                    <a href="#" onClick={this.props.resetFilter}>View full history (all actions)</a>
                }
                {content}
            </div>
        )
    }
}

export default Log;