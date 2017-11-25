import React from 'react';
import firebase from './firebase';

class ActionForm extends React.Component {
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
        const inputName = e.target.name;
        const inputValue = e.target.value;
        this.setState({
        [inputName]: inputValue
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        // Push the new action to firebase
        const actionsRef = firebase.database().ref('users/dylanon/actions');
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

export default ActionForm;