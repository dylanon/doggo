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
                log: tempLog
            });
        });
    }

    render() {
        return (
            <div>
                <h2>Log</h2>
                <ul>
                    <li>You completed: </li>
                    <li>You completed: </li>
                    <li>You completed: </li>
                </ul>
            </div>
        )
    }
}

export default Log;