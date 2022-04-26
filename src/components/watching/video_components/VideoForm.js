import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class VideoForm extends Component {
  state = {
    name: "",
    aliases: ["", ""],
  };

  static propTypes = {
    groupId: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    submit: PropTypes.func.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  addVideo = () => {
    const { name, aliases } = this.state;
    const { type, groupId } = this.props;
    const video = { name, type, group: groupId, aliases };
    this.props.submit(video, groupId);
  };

  render() {
    const { name } = this.state;

    return (
      <div className="w-full p-6">
        <div className="text-xl uppercase font-bold m-4 text-center">
          Add Video
        </div>
        <div className="flex justify-evenly bg-secondary border-2 border-tertiary rounded-xl shadow-lg w-full">
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
          </div>
          <div>
            <div>
              <div onClick={this.addVideo}>Submit</div>
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
