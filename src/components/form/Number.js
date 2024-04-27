import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SVGArrow } from '../svg';
import InputContainer from './InputContainer';

class Number extends Component {
  static propTypes = {
    error: PropTypes.string,
    label: PropTypes.string,
    containerClassName: PropTypes.string,
    //
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.number,
    minmax: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func,
    disabled: PropTypes.bool,
    autoComplete: PropTypes.string,
    hideArrows: PropTypes.bool,
    simple: PropTypes.bool,
  };

  static defaultProps = {
    autoComplete: 'off',
    minmax: [undefined, undefined],
  };

  state = {
    focus: false,
  };

  onArrowClick = (e, i) => {
    e.target.name = this.props.name;

    const value = this.getValueOrZero(this.props.value) + i;
    e.target.valueAsNumber = value;
    e.target.value = value;
    this.onChange(e);
  };

  isNoValue = (value) => value === undefined || value === null || value === '';
  getValueOrZero = (value) => (this.isNoValue(value) ? 0 : value);

  onChange = (e) => {
    const { name, value, valueAsNumber } = e.target;
    if (this.isValid(e.target.value)) {
      const form = {
        name,
        value: this.isNoValue(value) ? null : valueAsNumber,
      };
      this.props.onChange(e, form);
    }
  };

  isValid = (value) => {
    if (this.isNoValue(value)) return true;

    if (isNaN(value)) return false;

    const intValue = parseInt(value);
    const [min, max] = this.props.minmax;
    if (!isNaN(min) && intValue < min) {
      return false;
    }

    if (!isNaN(max) && intValue > max) {
      return false;
    }

    return true;
  };

  onFocus = () => this.setState({ focus: true });
  onBlur = () => this.setState({ focus: false });

  renderArrows = () => {
    return (
      <div
        className={`flex flex-col justify-center absolute right-2 h-full top-0 space-y-1 ${
          this.state.focus ? 'scale-100' : 'scale-0'
        } group-hover:scale-100 ease-in duration-100`}
      >
        <div onClick={(e) => this.onArrowClick(e, 1)}>
          <SVGArrow className='w-3 -rotate-90 simple-clickable'></SVGArrow>
        </div>
        <div onClick={(e) => this.onArrowClick(e, -1)}>
          <SVGArrow className='w-3 rotate-90 simple-clickable'></SVGArrow>
        </div>
      </div>
    );
  };

  renderInput = () => {
    const value = this.isNoValue(this.props.value) ? '' : this.props.value;
    return (
      <div className='group' onFocus={this.onFocus} onBlur={this.onBlur}>
        <input
          className={`input-text text-center input-border-placeholder ${this.props.className}`}
          type='number'
          name={this.props.name}
          onChange={this.onChange}
          onKeyDown={this.props.onKeyDown}
          value={value}
          disabled={this.props.disabled}
          autoComplete={this.props.autoComplete}
          ref={this.props.innerRef}
        />
        {!this.props.hideArrows && !this.props.disabled && this.renderArrows()}
      </div>
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
  <Number innerRef={ref} {...props} />
));
