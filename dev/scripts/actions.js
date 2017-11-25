import React from 'react';
import ActionForm from './actionForm';
import ActionList from './actionList';

const Actions = (props) => {
    return (
        <div>
            <ActionForm userID={props.userID} />
            <ActionList userID={props.userID} storedActions={props.storedActions} />
        </div>
    )
}

export default Actions;