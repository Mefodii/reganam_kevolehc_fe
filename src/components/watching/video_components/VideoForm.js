import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import InputContainer, {
  INPUT_NUMBER,
  INPUT_SELECT,
  INPUT_TEXTAREA,
} from "../../generic/form/InputContainer";

export class VideoForm extends Component {
  state = {
    name: "",
    aliases: ["", ""],
    year: null,
    status: "",
    order: 1,
    episodes: 1,
    rating: 1,
  };

  static propTypes = {
    statusTypes: PropTypes.array.isRequired,
    groupId: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    submit: PropTypes.func.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onChangeAlias = (i) => (e) => {
    const newAliases = [...this.state.aliases];
    newAliases[i] = e.target.value;
    this.setState({ aliases: newAliases });
  };

  addAliasFields = (count = 1) => {
    const newAliases = [...Array(count).keys()].map((_) => "");
    this.setState({ aliases: [...this.state.aliases, ...newAliases] });
  };

  removeAliasField = () => {
    this.setState({ aliases: [...this.state.aliases.slice(0, -1)] });
  };

  addVideo = () => {
    const { name, year, status, order, episodes, rating } = this.state;
    const { type, groupId } = this.props;

    const aliases = this.state.aliases
      .map((alias) => alias.trim())
      .filter((alias) => alias.length > 0);

    const video = {
      name,
      type,
      group: groupId,
      aliases,
      year,
      status,
      order,
      episodes,
      rating,
    };
    this.props.submit(video, groupId);
  };

  render() {
    const { name, aliases, year, status, order, episodes, rating } = this.state;

    return (
      <div className="">
        <div className="text-xl uppercase font-bold m-4 text-center">
          Add Video
        </div>
        <div className="flex justify-evenly bg-secondary border-2 border-tertiary rounded-xl shadow-lg w-full">
          <div className="m-4 flex flex-row w-full justify-between space-x-4">
            <div className="w-full">
              <InputContainer
                label="Name *"
                type={INPUT_TEXTAREA}
                name="name"
                value={name}
                onChange={this.onChange}
              ></InputContainer>

              <div className="flex flex-row w-full justify-between space-x-4">
                <div className="flex flex-row w-full justify-between space-x-4">
                  <InputContainer
                    label="Year"
                    type={INPUT_NUMBER}
                    name="year"
                    value={year || ""}
                    onChange={this.onChange}
                  ></InputContainer>
                  <InputContainer
                    label="Order"
                    type={INPUT_NUMBER}
                    name="order"
                    value={order}
                    onChange={this.onChange}
                  ></InputContainer>
                  <InputContainer
                    label="Episodes"
                    type={INPUT_NUMBER}
                    name="episodes"
                    value={episodes}
                    onChange={this.onChange}
                  ></InputContainer>
                  <InputContainer
                    label="Rating"
                    type={INPUT_NUMBER}
                    name="rating"
                    value={rating}
                    onChange={this.onChange}
                  ></InputContainer>
                </div>
                <div className="w-full text-center">
                  <InputContainer
                    label="Watch status *"
                    type={INPUT_SELECT}
                    name="status"
                    placeholder="Select a status"
                    value={status}
                    options={this.props.statusTypes}
                    onChange={this.onChange}
                  ></InputContainer>
                </div>
              </div>

              <div className="w-max btn" onClick={this.addVideo}>
                Add Video
              </div>
            </div>
            <div className="w-1/2">
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
                <div className="w-16 btn" onClick={this.addAliasFields}>
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

export default connect(mapStateToProps, {})(VideoForm);
