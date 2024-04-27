import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getTextFromClipboard, saveToClipboard } from '../../util/functions';

import InputContainer from './InputContainer';
import { SVGClipboardDocEmpty, SVGClipboardDoc } from '../svg';

class TextArea extends Component {
  static propTypes = {
    error: PropTypes.string,
    label: PropTypes.string,
    containerClassName: PropTypes.string,
    //
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    maxLength: PropTypes.number,
    rows: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func,
    autoComplete: PropTypes.string,
    disabled: PropTypes.bool,
    simple: PropTypes.bool,
    autoSize: PropTypes.bool,
    copy: PropTypes.bool,
    paste: PropTypes.bool,
    textMono: PropTypes.bool,
  };

  static defaultProps = {
    autoComplete: 'off',
    rows: 1,
    autoSize: true,
    copy: false,
    paste: false,
    textMono: false,
  };

  textAreaRef = React.createRef();

  onChange = (e) => {
    const form = {
      name: e.target.name,
      value: e.target.value,
    };

    this.props.onChange(e, form);
  };

  copyToClipboard = () => {
    saveToClipboard(this.props.value);
  };

  pasteFromClipboard = (e) => {
    getTextFromClipboard().then((value) => {
      const form = {
        name: this.props.name,
        value,
      };

      this.props.onChange(e, form);
    });
  };

  autoSize = () => {
    if (!this.props.autoSize) return;

    this.textAreaRef.current.style.height = `inherit`;
    this.textAreaRef.current.style.height = `${this.textAreaRef.current.scrollHeight}px`;
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value) this.autoSize();
  }

  componentDidMount() {
    this.autoSize();
  }

  renderInput() {
    const { copy, paste } = this.props;
    return (
      <>
        <textarea
          className={`input-text resize-none
          ${this.props.autoSize ? 'overflow-hidden' : ''}
          ${this.props.textMono ? 'mono-font' : ''}
          ${this.props.className}
          `}
          type='textarea'
          name={this.props.name}
          value={this.props.value}
          rows={this.props.rows}
          maxLength={this.props.maxLength}
          onChange={this.onChange}
          onKeyDown={this.props.onKeyDown}
          autoComplete={this.props.autoComplete}
          disabled={this.props.disabled}
          ref={this.textAreaRef}
        />
        <div
          className={`absolute right-2 top-2 flex space-x-1 ${
            copy || paste ? '' : 'hidden'
          }`}
        >
          {copy && (
            <div onClick={this.copyToClipboard}>
              <SVGClipboardDocEmpty className='w-4 simple-clickable' />
            </div>
          )}
          {paste && (
            <div onClick={this.pasteFromClipboard}>
              <SVGClipboardDoc className='w-4 simple-clickable' />
            </div>
          )}
        </div>
      </>
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

export default TextArea;
