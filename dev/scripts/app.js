import React from 'react';
import ReactDOM from 'react-dom';
import firebase from './firebase';
import {actionsRef} from './firebase'
import Header from './header';
import CreateActionForm from './createActionForm';
import ActionList from './actionList';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      actions: []
    }
  }

  componentDidMount() {
    // Create a database reference to the actions list
    // const actionsRef = firebase.database().ref('users/dylanon/actions');
    // Load actions from firebase
    actionsRef.on('value', (snapshot) => {
      const actions = snapshot.val();
      const newState = [];
      // Store the actions in a staging array
      for (let action in actions) {
        newState.push({
          key: action,
          name: actions[action].actionName,
          description: actions[action].actionDescription
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
          <CreateActionForm />
          <ActionList storedActions={this.state.actions} />
        </main>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
