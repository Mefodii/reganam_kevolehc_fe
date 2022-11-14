import React, { Component } from "react";
import PropTypes from "prop-types";

import Button from "../buttons/Button";
import SVGPlus from "../svg/SVGPlus";
import SVGMinus from "../svg/SVGMinus";
import TextArea from "./TextArea";

export class TextAreaArray extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    className: PropTypes.string,
    classNameItem: PropTypes.string,
    labelItem: PropTypes.func,
    nameItem: PropTypes.func,
    valueItem: PropTypes.func,
    addItem: PropTypes.func,
    removeItem: PropTypes.func,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: "",
    classNameItem: "form-row",
    labelItem: (item, i) => `${i + 1}`,
    nameItem: (item, i) => `${i + 1}`,
    valueItem: (item, i) => `${item}`,
    addItem: (items) => [...items, ""],
    removeItem: (items) => {
      if (items.length <= 1) return items;
      return [...items.slice(0, -1)];
    },
  };

  sendChange = (e, items) => {
    const form = {
      name: this.props.name,
      value: items,
    };

    this.props.onChange(e, form);
  };

  onChange = (item, i) => (e, field) => {
    const items = [...this.props.items];
    items[i] = field.value;
    this.sendChange(e, items);
  };

  addItem = () => {
    const items = this.props.addItem(this.props.items);
    this.sendChange(undefined, items);
  };

  removeItem = () => {
    const items = this.props.removeItem(this.props.items);
    this.sendChange(undefined, items);
  };

  render() {
    const { items, labelItem, nameItem, valueItem, className, classNameItem } =
      this.props;

    if (items.length === 0) return <></>;

    return (
      <div className={`${className}`}>
        {items.map((item, i) => {
          const itemField = (
            <TextArea
              label={labelItem(item, i)}
              name={nameItem(item, i)}
              key={i}
              value={valueItem(item, i)}
              onChange={this.onChange(item, i)}
            />
          );

          if (i > 0)
            return (
              <div className={`${classNameItem}`} key={i}>
                {itemField}
              </div>
            );

          return (
            <div className={`${classNameItem} space-x-2 flex-row`} key={i}>
              {itemField}
              <div className="w-10 h-full flex flex-col space-y-1 items-center">
                <Button tooltip="Add Alias" onClick={this.addItem}>
                  <SVGPlus className="w-3 transition-all duration-300" />
                </Button>
                <Button tooltip="Remove Alias" onClick={this.removeItem}>
                  <SVGMinus className="w-3 transition-all duration-300" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default TextAreaArray;
