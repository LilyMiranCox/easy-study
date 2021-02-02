import React, { Component } from 'react';

class OnOffSwitch extends Component {
    render() {
        return (
          <label className="switch">
              <input type="checkbox" onClick={this.props.onClick}/>
              <span className="slider round"></span>
          </label>
        );
    }
}

export default OnOffSwitch;
