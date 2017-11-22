import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      actions: []
    }
  }
  render() {
    return (
      <div>
        <Header />
        <main>
          <CreateActionForm />
          <ActionList />
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
    console.log('clicked');
  }

  render() {
    return(
      <div>
        <h2>Create an action</h2>
        <form action="" id="create-action" onSubmit={this.handleSubmit}>
          <label htmlFor="new-action-name">Action Name:</label>
          <input type="text" id="new-action-name" name="actionName" onChange={this.handleChange} />
          <label htmlFor="new-action-description">Description (optional):</label>
          <input type="text" id="new-action-description" name="actionDescription" onChange={this.handleChange} />
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
          <li>Some actions</li>
          <li>Some actions</li>
          <li>Some actions</li>
          <li>Some actions</li>
          <li>Some actions</li>
        </ul>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
