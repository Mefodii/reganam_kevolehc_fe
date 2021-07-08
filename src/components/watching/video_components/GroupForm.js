import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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

  addGroup = () => {
    const { name, alias } = this.state;
    const { type } = this.props;
    const video = { name, alias, type };
    this.props.submit(video);
  };

  render() {
    const { name, aliases } = this.state;

    return (
      <div className="w-full p-6">
        <div className="text-xl uppercase font-bold m-4 text-center">
          Create Group
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  videoTypes: state.info.videoTypes,
});

export default connect(mapStateToProps, {})(GroupForm);
