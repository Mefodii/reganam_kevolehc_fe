import { Component } from "react";
import PropTypes from "prop-types";

export class Select extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    value: PropTypes.any,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    valueAttrName: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  state = {
    isSelected: false,
    currentValue: "",
  };

  onOptionClick = (value) => (e) => {
    e.target.name = this.props.name;
    e.target.value = value;
    this.props.onChange(e);
  };

  refresh = () =>
    this.setState({
      isSelected: this.isOptionSelected(this.props.options, this.props.value),
      currentValue: this.props.value || this.props.placeholder,
    });

  isOptionSelected = (options, value) =>
    options.find((option) => option === value);

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.options !== this.props.options) {
      this.refresh();
    }

    if (prevProps.value !== this.props.value) {
      this.refresh();
    }
  };

  componentDidMount = () => {
    this.refresh();
  };

  render() {
    const { options, disabled, valueAttrName } = this.props;
    const { currentValue, isSelected } = this.state;

    return (
      <div
        className={`relative option click-transition group ${
          isSelected && "option-selected"
        }`}
      >
        <div>{currentValue}</div>
        {!disabled && (
          <div
            className="w-full absolute rounded-sm shadow-md border bg-secondary border-tertiary origin-top
                      transform scale-0 duration-300 ease-in-out group-hover:scale-100 z-10 overflow-y-auto max-h-52"
          >
            {options.map((option, i) => {
              const value = valueAttrName ? option[valueAttrName] : option;
              return (
                <div
                  className="p-1 text-center truncate hover:bg-tertiary"
                  key={i}
                  onClick={this.onOptionClick(option)}
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
