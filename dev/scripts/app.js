import React from 'react';
import ReactDOM from 'react-dom';
import firebase from './firebase';
import {actionsRef} from './firebase'
import Header from './header';
import ActionForm from './actionForm';
import ActionList from './actionList';
import Log from './log';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      actions: []
    }
  }

  componentDidMount() {
    // Load actions from firebase
    actionsRef.on('value', (snapshot) => {
      const actions = snapshot.val();
      const newState = [];
      // Store the actions in a staging array
      for (let action in actions) {
        newState.push({
          key: action,
          name: actions[action].actionName,
          description: actions[action].actionDescription,
          lastCompleted: actions[action].lastCompleted
        });
      }
      // Update the state
      this.setState({
        actions: newState
      });
    });
  }

  render() {
    return (
      <div>
        <Header />
        <main>
          <ActionForm />
          <ActionList storedActions={this.state.actions} />
          <Log />
        </main>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
