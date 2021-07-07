import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addAnimeGroup } from "../../../actions/anime";
import { getSerialGroups } from "../../../actions/serials";
import { addMovieGroup } from "../../../actions/movies";

export class VideoForm extends Component {
  state = {
    name: "",
    alias: "",
    year: "",
    type: "",
    status: "",
  };

  static propTypes = {
    videoTypes: PropTypes.object.isRequired,
    statusTypes: PropTypes.array.isRequired,
    addAnimeGroup: PropTypes.func.isRequired,
    addMovieGroup: PropTypes.func.isRequired,
    getSerialGroups: PropTypes.func.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { name, alias, year, type, status } = this.state;
    const video = { name, alias, year, type, status };
    console.log(video);

    if (type === this.props.videoTypes.anime) this.props.addAnimeGroup(video);
    if (type === this.props.videoTypes.serial)
      this.props.getSerialGroups(video);
    if (type === this.props.videoTypes.movie) this.props.addMovieGroup(video);
  };

  render() {
    const { name, alias, year } = this.state;

    return (
      <div className="text-gray-100 w-full flex flex-col items-center">
        <h2 className="text-xl uppercase font-bold m-4">Add Video</h2>
        <form
          className="flex justify-evenly bg-gray-800 rounded-xl shadow-lg w-10/12"
          onSubmit={this.onSubmit}
        >
          <div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Name</label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  placeholder="Name"
                  type="text"
                  name="name"
                  onChange={this.onChange}
                  value={name}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Alias</label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  placeholder="Aliases (>;< separated)"
                  type="text"
                  name="alias"
                  onChange={this.onChange}
                  value={alias}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Year</label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="number"
                  name="year"
                  onChange={this.onChange}
                  value={year}
                />
              </div>
            </div>
          </div>
          <fieldset className="form-group">
            <div className="row">
              <legend className="col-form-label col-sm-2 pt-0">Type</legend>
              <div className="col-sm-10">
                {Object.entries(this.props.videoTypes).map(
                  ([video_key, video_type]) => (
                    <div className="form-check" key={video_key}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="type"
                        value={video_type}
                        onChange={this.onChange}
                      />
                      <label className="form-check-label" htmlFor="gridRadios1">
                        {video_type}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>
          </fieldset>
          <fieldset>
            <div>
              <legend>Status</legend>
              <div>
                {this.props.statusTypes.map((status) => (
                  <div key={status}>
                    <input
                      type="radio"
                      name="status"
                      value={status}
                      onChange={this.onChange}
                    />
                    <label htmlFor="gridRadios1">{status}</label>
                  </div>
                ))}
              </div>
            </div>
          </fieldset>
          <div>
            <div>
              <button type="submit">Submit</button>{" "}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  videoTypes: state.info.videoTypes,
  statusTypes: state.info.statusTypes,
});

export default connect(mapStateToProps, {
  addAnimeGroup,
  addMovieGroup,
  getSerialGroups,
})(VideoForm);
