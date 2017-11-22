import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
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
  render() {
    return(
      <div>
        <h2>Create an action</h2>
        <form action="" id="create-action">
          <label htmlFor="new-action-name">Name:</label>
          <input type="text" id="new-action-name"/>
          <label htmlFor="new-action-description">Description (optional):</label>
          <input type="text" id="new-action-description"/>
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
