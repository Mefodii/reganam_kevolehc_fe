import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InputContainer, {
  INPUT_TEXT,
  INPUT_TEXTAREA,
} from "../../generic/form/InputContainer";

import { getToday } from "../../../util/functions";

export class GroupForm extends Component {
  state = {
    name: "",
    alias: "",
    aliases: ["", ""],
    check_date: getToday(),
  };

  static propTypes = {
    type: PropTypes.string.isRequired,
    submit: PropTypes.func.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onChangeAlias = (i) => (e) => {
    const newAliases = [...this.state.aliases];
    newAliases[i] = e.target.value;
    this.setState({ aliases: newAliases });
  };

  addAliasField = () => {
    this.setState({ aliases: [...this.state.aliases, ""] });
  };

  removeAliasField = () => {
    this.setState({ aliases: [...this.state.aliases.slice(0, -1)] });
  };

  addGroup = () => {
    const { name, check_date } = this.state;
    const { type } = this.props;
    const aliases = this.state.aliases
      .map((alias) => alias.trim())
      .filter((alias) => alias.length > 0);
    const video = { name, aliases, type, check_date };
    this.props.submit(video);
  };

  render() {
    const { name, aliases, check_date } = this.state;

    return (
      <div className="w-full p-6">
        <div className="text-xl uppercase font-bold m-4 text-center">
          Create Group
        </div>
        <div className="flex justify-evenly bg-secondary border-2 border-tertiary rounded-xl shadow-lg w-full">
          <div className="m-4 flex flex-row w-full justify-between space-x-4">
            <div className="w-full">
              <InputContainer
                label="Name"
                type={INPUT_TEXTAREA}
                name="name"
                value={name}
                onChange={this.onChange}
              ></InputContainer>
              <InputContainer
                label="Last Check Date"
                type={INPUT_TEXT}
                name="check_date"
                value={check_date}
                onChange={this.onChange}
              ></InputContainer>
              <div className="w-max btn" onClick={this.addGroup}>
                CREATE GROUP
              </div>
            </div>
            <div className="w-full">
              {aliases.map((alias, i) => (
                <InputContainer
                  label={`Alias ${i + 1}`}
                  type={INPUT_TEXTAREA}
                  key={i}
                  value={alias}
                  onChange={this.onChangeAlias(i)}
                ></InputContainer>
              ))}
              <div className="flex">
                <div className="w-16 btn" onClick={this.addAliasField}>
                  +
                </div>
                <div className="w-16 btn" onClick={this.removeAliasField}>
                  -
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  videoTypes: state.info.videoTypes,
});

export default connect(mapStateToProps, {})(GroupForm);
