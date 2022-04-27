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
    const { value, placeholder, options: rawOptions, disabled } = this.props;
    const options = this.prepareOptions(rawOptions);
    const currentValue = value?.toString() || placeholder;
    const isSelected = this.isOptionSelected(options, currentValue);

    return (
      <div
        className={`relative option click-transition group ${
          isSelected && OPTION_SELECTED
        }`}
      >
        <div>{currentValue}</div>
        {!disabled && (
          <div
            className="w-full absolute rounded-sm shadow-md border
  bg-secondary border-tertiary origin-top
  transform scale-0 duration-300 ease-in-out group-hover:scale-100 z-10 overflow-y-auto max-h-52"
          >
            {options.map(({ key, value }) => {
              return (
                <div
                  className="p-1 text-center truncate hover:bg-tertiary"
                  key={key}
                  onClick={this.onOptionClick(key, value)}
                >
                  {value}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default Select;
