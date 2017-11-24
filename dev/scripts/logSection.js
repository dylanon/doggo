import React from 'react';
import moment from 'moment';

class LogSection extends React.Component {
    render() {
        const date = this.props.date;
        const logArray = this.props.log;

        // Create today's heading
        const dateHeading = moment(date).format("MMMM Do, YYYY")

        // Grab only today's logs
        const todaysLogs = logArray.filter((entry) => {
            return entry.date === date;
        })

        return (
            <div>
                <h3>{dateHeading}</h3>
                <ul>
                    {todaysLogs.map((entry) => {
                        return <LogItem entry={entry}/>
                    })}
                </ul>
            </div>
        )
    }
}

const LogItem = (props) => {
    const entry = props.entry;
    return (
        <li key={entry.logID}>
            <p>You completed: {entry.actionName}</p>
            <p>{moment(entry.timestamp).format('h:mm a')}</p>
        </li>
    )
}

export default LogSection;