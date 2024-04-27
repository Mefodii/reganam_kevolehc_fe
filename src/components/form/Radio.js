import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputContainer from './InputContainer';

class Radio extends Component {
  static propTypes = {
    error: PropTypes.string,
    label: PropTypes.string,
    containerClassName: PropTypes.string,
    //
    className: PropTypes.string,
    optionClassName: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
    options: PropTypes.array.isRequired,
    optionDisplay: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    deselect: PropTypes.bool,
  };

  select = (option) => (e) => {
    e.target.name = this.props.name;
    e.target.value = option;
    this.onChange(e);
  };

  deselect = () => (e) => {
    e.target.name = this.props.name;
    e.target.value = null;
    this.onChange(e);
  };

  isOptionSelected = (option) => {
    return this.props.value === option;
  };

  onChange = (e) => {
    const form = {
      name: e.target.name,
      value: e.target.value,
    };

    this.props.onChange(e, form);
  };

  renderInput() {
    const {
      optionDisplay = (option) => option,
      disabled,
      deselect,
    } = this.props;

    return (
      <div className={`${this.props.className}`}>
        {this.props.options.map((option, i) => {
          const isSelected = this.isOptionSelected(option);
          const onClick = isSelected
            ? deselect
              ? this.deselect()
              : null
            : this.select(option);

          return (
            <div
              key={i}
              className={`option-radio
                ${isSelected && 'option-selected'}
                ${disabled && 'option-disabled'}
                ${this.props.optionClassName}
                `}
              onClick={disabled ? null : onClick}
              ref={this.props.innerRef}
            >
              {optionDisplay(option)}
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    if (this.props.simple) return this.renderInput();

    return (
      <InputContainer
        label={this.props.label}
        error={this.props.error}
        className={this.props.containerClassName}
      >
        {this.renderInput()}
      </InputContainer>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <Radio innerRef={ref} {...props} />
));
