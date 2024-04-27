import React, { Component } from 'react';

import { isEmpty } from 'lodash';

class InputContainer extends Component {
  render() {
    const { label, error, className = '' } = this.props;
    const hasLabel = !isEmpty(label);

    return (
      <div className={`w-full ${className}`}>
        <div
          className={`input-container 
          ${!hasLabel && 'input-container-no-label'} 
          ${error && 'ring-error'}`}
        >
          {hasLabel && <div className='input-label'>{label}</div>}
          {this.props.children}
        </div>
        <div className='input-error'>{error}</div>
      </div>
    );
  }
}

export default InputContainer;
