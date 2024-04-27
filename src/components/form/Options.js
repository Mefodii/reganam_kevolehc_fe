import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Options extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    className: PropTypes.string,
    optionClassName: PropTypes.string,
    options: PropTypes.array.isRequired,
    optionDisplay: PropTypes.func,
    onClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: '',
    optionClassName: '',
    optionDisplay: (option, i) => option,
  };

  onClick = (option, i) => (e) => {
    this.props.onClick(e, option, i);
  };

  render() {
    const { options, optionDisplay, className, optionClassName, show } =
      this.props;

    return (
      <div
        className={`option-dropdown-container ${
          show ? 'scale-100' : 'scale-0'
        } ${className}`}
      >
        {options.map((option, i) => {
          return (
            <div
              className={`option-dropdown-item ${optionClassName}`}
              key={i}
              onClick={this.onClick(option, i)}
            >
              {optionDisplay(option, i)}
            </div>
          );
        })}
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <Options innerRef={ref} {...props} />
));
