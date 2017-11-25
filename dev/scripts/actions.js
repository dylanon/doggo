import React from 'react';
import ActionForm from './actionForm';
import ActionList from './actionList';

const Actions = (props) => {
    return (
        <div>
            <ActionForm />
            <ActionList storedActions={props.storedActions} />
        </div>
    )
}

export default Actions;