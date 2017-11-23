import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyALWamD34pm4LMj-YUxKDDUHEbBqn-390E",
  authDomain: "doglog-fc202.firebaseapp.com",
  databaseURL: "https://doglog-fc202.firebaseio.com",
  projectId: "doglog-fc202",
  storageBucket: "",
  messagingSenderId: "900360389303"
};
firebase.initializeApp(config);

// Create a database reference to the actions list
const actionsRef = firebase.database().ref('users/dylanon/actions');

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

const Header = () => {
  return (
    <header>
      <h1>dogLog: Dog care tracker</h1>
    </header>
  )
}

class CreateActionForm extends React.Component {
  constructor() {
    super();
    this.state = {
      actionName: '',
      actionDescription: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    console.log(e.target.name);
    const inputName = e.target.name;
    const inputValue = e.target.value;
    this.setState({
      [inputName]: inputValue
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    // Push the new action to firebase
    actionsRef.push({
      actionName: this.state.actionName,
      actionDescription: this.state.actionDescription
    });
    // Clear the inputs
    this.setState({
      actionName: '',
      actionDescription: ''
    });
  }

  render() {
    return(
      <div>
        <h2>Create an action</h2>
        <form action="" id="create-action" onSubmit={this.handleSubmit}>
          <label htmlFor="new-action-name">Action Name:</label>
          <input type="text" id="new-action-name" name="actionName" onChange={this.handleChange} value={this.state.actionName} />
          <label htmlFor="new-action-description">Description (optional):</label>
          <input type="text" id="new-action-description" name="actionDescription" onChange={this.handleChange} value={this.state.actionDescription} />
          <button type="submit">Create</button>
        </form>
      </div>
    )
  }
}

class ActionList extends React.Component {
  render() {
    return (
      <div>
        <h2>Actions</h2>
        <ul>
          {this.props.storedActions.map(action => {
            return (
              <li>
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

ReactDOM.render(<App />, document.getElementById('app'));
