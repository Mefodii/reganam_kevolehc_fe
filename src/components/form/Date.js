import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getToday } from '../../util/functions';

import { SVGCalendar } from '../svg';
import InputContainer from './InputContainer';

class Date extends Component {
  static propTypes = {
    error: PropTypes.string,
    label: PropTypes.string,
    containerClassName: PropTypes.string,
    //
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    maxLength: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func,
    autoComplete: PropTypes.string,
    disabled: PropTypes.bool,
    simple: PropTypes.bool,
  };

  static defaultProps = {
    autoComplete: 'off',
    maxLength: 10,
    // TODO: dateFormat props (yyyy-mm-dd)
  };

  setToday = (e) => {
    e.target.name = this.props.name;
    e.target.value = getToday();

    const form = {
      name: e.target.name,
      value: e.target.value,
    };
    this.props.onChange(e, form);
  };

  isNoValue = (value) => value === undefined || value === null || value === '';
  getValueOrNull = (value) => (this.isNoValue(value) ? null : value);

  onChange = (e) => {
    const form = {
      name: e.target.name,
      value: this.getValueOrNull(e.target.value),
    };

    this.props.onChange(e, form);
  };

  renderInput = () => {
    const value = this.isNoValue(this.props.value) ? '' : this.props.value;

    return (
      <>
        <input
          className={`input-text input-border-placeholder ${this.props.className}`}
          type='text'
          name={this.props.name}
          value={value}
          maxLength={this.props.maxLength}
          onChange={this.onChange}
          onKeyDown={this.props.onKeyDown}
          disabled={this.props.disabled}
          autoComplete={this.props.autoComplete}
          ref={this.props.innerRef}
        />
        <div
          className={`absolute right-2 top-1 ${
            this.props.disabled ? 'hidden' : ''
          }`}
          onClick={this.setToday}
        >
          <SVGCalendar className='w-6 simple-clickable'></SVGCalendar>
        </div>
      </>
    );
  };

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
  <Date innerRef={ref} {...props} />
));
