import React from 'react';

class PublicHome extends React.Component {
    render() {
        return (
            <main className="public-main">
                <button onClick={this.props.logIn}>Sign in with Google <i className="fa fa-paw"></i></button>
            </main>
        )
    }
}

export default PublicHome;