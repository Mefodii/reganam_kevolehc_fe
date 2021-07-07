import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addAnimeGroup } from "../../../actions/anime";
import { addSerialGroup } from "../../../actions/serials";
import { addMovieGroup } from "../../../actions/movies";

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

  addGroup = (e) => {
    const { name, alias } = this.state;
    const video = { name, alias };

    const { anime, serial, movie } = this.props.videoTypes;
    if (this.props.type === anime) this.props.addAnimeGroup(video);
    if (this.props.type === serial) this.props.addSerialGroup(video);
    if (this.props.type === movie) this.props.addMovieGroup(video);
  };

  render() {
    const { name, aliases } = this.state;

    return (
      <div className="w-full p-6">
        <div className="text-xl uppercase font-bold m-4 text-center">
          Create Group
        </div>
        <form className="flex justify-evenly bg-secondary border-2 border-tertiary rounded-xl shadow-lg w-full">
          <div>
            <div>
              <label>Name</label>
              <div>
                <input
                  placeholder="Name"
                  type="text"
                  name="name"
                  onChange={this.onChange}
                  value={name}
                />
              </div>
            </div>
            <div>
              <label>Alias</label>
              {aliases.map((alias, i) => (
                <div key={i}>
                  <input
                    placeholder="Aliases (>;< separated)"
                    type="text"
                    name="alias"
                    onChange={this.onChange}
                    value={alias}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <div>
              <div onClick={this.addGroup}>Submit</div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  videoTypes: state.info.videoTypes,
});

export default connect(mapStateToProps, {
  addAnimeGroup,
  addMovieGroup,
  addSerialGroup,
})(GroupForm);
