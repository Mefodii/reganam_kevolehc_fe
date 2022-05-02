import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import InputContainer, {
  INPUT_TEXTAREA,
  INPUT_CHECKBOX,
  INPUT_SELECT,
  INPUT_NUMBER,
} from "../../generic/form/InputContainer";

import { addGroup, updateGroup, deleteGroup } from "../../../actions/groups";
import { getToday, objectEqualsSimple } from "../../../util/functions";
import { BLANK_VALUE } from "../../../util/constants";

export class GroupForm extends Component {
  static propTypes = {
    edit: PropTypes.bool,
    watchioType: PropTypes.string.isRequired,
    addGroup: PropTypes.func.isRequired,
    updateGroup: PropTypes.func.isRequired,
    deleteGroup: PropTypes.func.isRequired,
    closeForm: PropTypes.func,
  };

  state = {
    name: "",
    aliases: ["", ""],
    airing_status: "",
    single: false,
    status: null,
    watched_date: null,
    rating: null,
    year: null,
    check_date: getToday(),
  };

  propsToState = () => {
    const {
      name,
      check_date,
      airing_status,
      single,
      status,
      watched_date,
      rating,
      year,
    } = this.props.group;

    var aliases = [...this.props.group.aliases];
    while (aliases.length < 2) {
      aliases.push("");
    }

    this.setState({
      name,
      check_date,
      airing_status,
      single,
      status,
      watched_date,
      rating,
      year,
    });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onChangeAlias = (i) => (e) => {
    const newAliases = [...this.state.aliases];
    newAliases[i] = e.target.value;
    this.setState({ aliases: newAliases });
  };

  toggleSingle = (e) => {
    const single = !this.state.single;

    var newState = {};
    if (single) {
      newState = {
        watched_date: getToday(),
        rating: 1,
        year: 2000,
        single,
      };
    } else {
      newState = {
        status: null,
        watched_date: null,
        rating: null,
        year: null,
        single,
      };
    }

    this.setState(newState);
  };

  addAliasFields = (count = 1) => {
    const newAliases = [...Array(count).keys()].map((_) => "");
    this.setState({ aliases: [...this.state.aliases, ...newAliases] });
  };

  removeAliasField = () => {
    this.setState({ aliases: [...this.state.aliases.slice(0, -1)] });
  };

  cleanAliases = (aliases) => {
    return aliases
      .map((alias) => alias.trim())
      .filter((alias) => alias.length > 0);
  };

  hasGroupDataChanged = () => {
    const oldGroup = {
      name: this.props.group.name,
      aliases: this.props.group.aliases,
      check_date: this.props.group.check_date,
      airing_status: this.props.group.airing_status,
      single: this.props.group.single,
      status: this.props.group.status,
      watched_date: this.props.group.watched_date,
      year: this.props.group.year,
      rating: this.props.group.rating,
    };

    const newGroup = {
      name: this.state.name,
      aliases: this.state.aliases,
      check_date: this.state.check_date,
      airing_status: this.state.airing_status,
      single: this.state.single,
      status: this.state.status,
      watched_date: this.state.check_date,
      year: this.state.year,
      rating: this.state.rating,
    };

    return !objectEqualsSimple(oldGroup, newGroup);
  };

  buildGroup = () => {
    var {
      name,
      check_date,
      airing_status,
      single,
      status,
      watched_date,
      year,
      rating,
    } = this.state;
    const { watchioType: type } = this.props;
    const id = this.props.group?.id;

    if (!single) {
      status = null;
      watched_date = null;
      year = null;
      rating = null;
    } else {
      watched_date =
        watched_date && watched_date.length > 0 ? watched_date : null;
    }
    check_date = check_date && check_date.length > 0 ? check_date : null;
    const aliases = this.cleanAliases(this.state.aliases);

    const group = {
      id,
      name,
      type,
      aliases,
      check_date,
      airing_status,
      single,
      status,
      watched_date,
      year,
      rating,
    };
    return group;
  };

  addGroup = () => {
    this.props.addGroup(this.buildGroup(), this.props.watchioType);
  };

  saveChanges = () => {
    if (this.hasGroupDataChanged()) {
      this.props.updateGroup(this.buildGroup(), this.props.watchioType);
    }
    this.props.closeForm();
  };

  deleteGroup = () => {
    this.props.deleteGroup(this.props.group.id, this.props.watchioType);
    this.props.closeForm();
  };

  componentDidMount() {
    if (this.props.edit) this.propsToState();
  }

  render() {
    const {
      name,
      aliases,
      check_date,
      single,
      status,
      airing_status,
      rating,
      watched_date,
      year,
    } = this.state;
    const { hideTitle, edit } = this.props;

    return (
      <Fragment>
        {!hideTitle && (
          <div className="text-xl uppercase font-bold m-4 text-center">
            Create Group
          </div>
        )}

        <div className="flex justify-evenly bg-secondary border-2 border-tertiary rounded-xl shadow-lg w-full">
          <div className="m-4 flex flex-row w-full justify-between space-x-4">
            <div className="w-full space-y-1">
              <InputContainer
                label="Name"
                type={INPUT_TEXTAREA}
                name="name"
                value={name}
                onChange={this.onChange}
              ></InputContainer>
              <div className="flex flex-row w-full justify-between space-x-4 text-center">
                <InputContainer
                  label="Last Check Date"
                  type={INPUT_TEXTAREA}
                  name="check_date"
                  value={check_date || ""}
                  onChange={this.onChange}
                  maxLength={10}
                ></InputContainer>
                <InputContainer
                  label="Airing Status"
                  type={INPUT_SELECT}
                  name="airing_status"
                  placeholder={BLANK_VALUE}
                  value={airing_status}
                  options={this.props.airStatusTypes}
                  onChange={this.onChange}
                ></InputContainer>
                <InputContainer
                  showLabel={false}
                  type={INPUT_CHECKBOX}
                  name="single"
                  text="SINGLE"
                  title="Single group has no child videos"
                  checked={single}
                  onClick={this.toggleSingle}
                ></InputContainer>
              </div>
              <div className="flex flex-row w-full justify-between space-x-4 text-center">
                <InputContainer
                  className={`${single ? "" : "opacity-20"}`}
                  label="Watch status"
                  type={INPUT_SELECT}
                  name="status"
                  placeholder={BLANK_VALUE}
                  value={status || ""}
                  options={this.props.statusTypes}
                  onChange={this.onChange}
                  disabled={!single}
                ></InputContainer>
                <InputContainer
                  className={`${single ? "" : "opacity-20"}`}
                  label="Watch Date"
                  type={INPUT_TEXTAREA}
                  name="watched_date"
                  value={watched_date || ""}
                  onChange={this.onChange}
                  maxLength={10}
                  disabled={!single}
                ></InputContainer>
                <InputContainer
                  className={`${single ? "" : "opacity-20"}`}
                  label="Year"
                  type={INPUT_NUMBER}
                  name="year"
                  value={year || ""}
                  onChange={this.onChange}
                  disabled={!single}
                ></InputContainer>
                <InputContainer
                  className={`${single ? "" : "opacity-20"}`}
                  label="Rating"
                  type={INPUT_NUMBER}
                  name="rating"
                  value={rating || ""}
                  onChange={this.onChange}
                  disabled={!single}
                ></InputContainer>
              </div>

              {!edit && (
                <div
                  className="w-max btn option-selected"
                  onClick={this.addGroup}
                >
                  Add Group
                </div>
              )}

              {edit && (
                <div className="flex space-x-1">
                  <div
                    className={`w-max btn option-selected`}
                    onClick={this.saveChanges}
                  >
                    Save Changes
                  </div>
                  <div className="w-max btn" onClick={this.props.closeForm}>
                    Discard Changes
                  </div>
                </div>
              )}

              {single && edit && (
                <div className="text-yellow-300 overflow-visible">
                  Warning: by choosing SINGLE, all videos under this group will
                  be deleted
                </div>
              )}
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

              <div className="flex justify-between">
                <div className="flex">
                  <div className="w-16 btn" onClick={this.addAliasFields}>
                    +
                  </div>
                  <div className="w-16 btn" onClick={this.removeAliasField}>
                    -
                  </div>
                </div>
                {edit && (
                  <div
                    className="w-max btn bg-pink-900"
                    onClick={this.deleteGroup}
                  >
                    Delete Group
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  statusTypes: state.info.statusTypes,
  airStatusTypes: state.info.airStatusTypes,
});

const mapDispatchToProps = {
  addGroup,
  updateGroup,
  deleteGroup,
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupForm);
