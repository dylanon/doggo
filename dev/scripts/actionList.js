import React from 'react';

class ActionList extends React.Component {
    render() {
      return (
        <div>
          <h2>Actions</h2>
          <ul>
            {this.props.storedActions.map(action => {
              return (
                <li key={action.key}>
                  <p>{action.name} | <span>{action.description}</span></p>
                  <p>Last completed: Yesterday at 7:20am</p>
                </li>
              )
            })}
          </ul>
        </div>
      )
    }
}

export default ActionList;