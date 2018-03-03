import React from 'react';

class Loading extends React.Component {
    render() {
        return (
            <div>
                <i className="fa fa-spinner fa-pulse"></i>
                Loading...
            </div>
        )
    }
}

export default Loading;