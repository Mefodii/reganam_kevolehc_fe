import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InputContainer, {
  INPUT_TEXTAREA,
  INPUT_CHECKBOX,
  INPUT_SELECT,
} from "../../generic/form/InputContainer";

import { getToday } from "../../../util/functions";

export class GroupForm extends Component {
  state = {
    name: "",
    aliases: ["", ""],
    single: false,
    status: "",
    check_date: getToday(),
  };

  static propTypes = {
    type: PropTypes.string.isRequired,
    submit: PropTypes.func.isRequired,
    statusTypes: PropTypes.array.isRequired,
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
    const { name, check_date, single, status } = this.state;
    const { type } = this.props;
    const aliases = this.state.aliases
      .map((alias) => alias.trim())
      .filter((alias) => alias.length > 0);

    const video = {
      name,
      aliases,
      type,
      check_date,
      status: single ? status : null,
      single,
    };
    this.props.submit(video);
    this.setState({ aliases });
  };

  render() {
    const { name, aliases, check_date, single, status } = this.state;

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
                type={INPUT_TEXTAREA}
                name="check_date"
                value={check_date}
                onChange={this.onChange}
                maxLength={10}
              ></InputContainer>
              <div className="flex flex-row w-full justify-between space-x-4 text-center">
                <InputContainer
                  type={INPUT_CHECKBOX}
                  name="single"
                  text="STANDALONE"
                  label="Standalone group has no child videos"
                  checked={single}
                  onClick={this.onChange}
                ></InputContainer>
                <InputContainer
                  label="Watch status (only when standalone group)"
                  type={INPUT_SELECT}
                  name="status"
                  placeholder="Select a status"
                  value={status}
                  options={this.props.statusTypes}
                  onChange={this.onChange}
                  disabled={!single}
                ></InputContainer>
              </div>
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

  statusTypes: state.info.statusTypes,
});

export default connect(mapStateToProps, {})(GroupForm);
