import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      actions: []
    }
    this.addAction = this.addAction.bind(this);
  }

  addAction(name, description) {
    console.log('adding action', name, description);
    const tempState = Array.from(this.state.actions);
    tempState.push({
      name: name,
      description: description
    });
    this.setState({
      actions: tempState
    });
  }

  render() {
    return (
      <div>
        <Header />
        <main>
          <CreateActionForm addAction={this.addAction}/>
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
    this.props.addAction(this.state.actionName, this.state.actionDescription);
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
