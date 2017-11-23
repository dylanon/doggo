import React from 'react';
import firebase from 'firebase';

class Log extends React.Component {
    constructor() {
        super();
        this.state = {
            log: []
        }
    }

    componentDidMount() {
        // Set the database reference
        const logRef = firebase.database().ref('users/dylanon/log');
        logRef.orderByChild('timestamp').on('value', (snapshot) => {
            const retrievedLog = snapshot.val();
            const tempLog = [];
            for (let item in retrievedLog) {
                const logItem = {
                    logID: item,
                    actionID: retrievedLog[item].actionID,
                    actionName: retrievedLog[item].actionName,
                    timestamp: retrievedLog[item].timestamp
                }
                tempLog.push(logItem);
            }

            this.setState({
                log: tempLog.reverse()
            });
        });
    }

    render() {
        return (
            <div>
                <h2>Log</h2>
                <ul>
                    {this.state.log.map((entry) => {
                        const timestamp = new Date(entry.timestamp);
                        const humanTime = (timestamp.getMonth() + 1) + '/' + timestamp.getDate() + '/' + timestamp.getFullYear();
                        return (
                            <li>
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