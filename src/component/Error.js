import React from 'react'

class Error extends React.Component {
    render() {
        const {data} = this.props;
        return (
            <div id="error-message"><p>{this.props.data}</p></div>
        );
    }
}

export default Error