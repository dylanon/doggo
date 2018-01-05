import React from 'react';

const Loader = (props) => {
    const styles = {
        margin: 'auto',
        color: 'tomato',
        fontSize: '48px'
    }
    return (
        <div style={styles}>
            <p>Loading...</p>
        </div>
    )
}

export default Loader;