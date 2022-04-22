import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InputContainer, { INPUT_TEXT } from "../../generic/form/InputContainer";

export class GroupForm extends Component {
  state = {
    name: "",
    alias: "",
    aliases: ["", ""],
    check_date: "",
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

  addAlias = () => {
    this.setState({ aliases: [...this.state.aliases, ""] });
  };

  addGroup = () => {
    const { name, alias, check_date } = this.state;
    const { type } = this.props;
    const video = { name, alias, type, check_date: check_date + "T00:00" };
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
                type={INPUT_TEXT}
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
              <div className="w-1/5 btn" onClick={this.addGroup}>
                CREATE
              </div>
            </div>
            <div className="w-full">
              {aliases.map((alias, i) => (
                <InputContainer
                  label={`Alias ${i + 1}`}
                  type={INPUT_TEXT}
                  key={i}
                  value={alias}
                  onChange={this.onChangeAlias(i)}
                ></InputContainer>
              ))}
              <div className="w-1/12 btn" onClick={this.addAlias}>
                +
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
