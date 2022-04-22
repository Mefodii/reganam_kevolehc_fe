import { Component } from "react";

import { OPTION_SELECTED } from "../../../util/constants";
import { isObject } from "../../../util/functions";

export class Select extends Component {
  onOptionClick = (value) => (e) => {
    e.target.name = this.props.name;
    e.target.value = value;
    this.props.onChange(e);
  };

  prepareOptions = (rawOptions) => {
    return rawOptions.map((option) => {
      if (isObject(option))
        return { key: option.key.toString(), value: option.value.toString() };
      return { key: option.toString(), value: option.toString() };
    });
  };

  isOptionSelected = (options, value) =>
    options.find((option) => option.value === value);

  render() {
    const { value, placeholder, options: rawOptions } = this.props;
    const options = this.prepareOptions(rawOptions);
    const currentValue = value?.toString() || placeholder;
    const isSelected = this.isOptionSelected(options, currentValue);

    return (
      <div
        className={`relative option click-transition group ${
          isSelected && OPTION_SELECTED
        }`}
      >
        <div className="hover:text-purple-800 dark:hover:text-purple-300">
          {currentValue}
        </div>
        <div className="w-full option-dropdown-container z-10 overflow-y-auto max-h-52">
          {options.map(({ key, value }) => {
            return (
              <div
                className="p-1 text-center truncate option-dropdown-item"
                key={key}
                onClick={this.onOptionClick(key, value)}
              >
                {value}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Select;
