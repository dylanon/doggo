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
                    return <LogItem key={entry.logID} entry={entry} filterFunction={props.filterFunction} filterBy={props.filterBy}/>
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
    }

    handleClick(e) {
        e.preventDefault();
        this.props.filterFunction(this.props.entry.actionID, this.props.entry.actionName);
    }

    handleDelete(e) {
        e.preventDefault();
        const logID = this.props.entry.logID;
        const deleteRef = firebase.database().ref(`users/dylanon/log/${logID}`)
        deleteRef.remove();
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