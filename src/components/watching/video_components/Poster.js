import React, { Component } from "react";
import { DEFAULT_IMAGE } from "../../../util/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faTimes } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Poster extends Component {
  static propTypes = {
    groupId: PropTypes.number.isRequired,
    images: PropTypes.array.isRequired,
    addPoster: PropTypes.func.isRequired,
    deletePoster: PropTypes.func.isRequired,
  };

  posterSelected = (e) => {
    const image = e.target.files[0];
    const oldImage = this.props.images[0];
    // Update poster
    if (image && oldImage) {
      return;
    }
    // Add poster
    if (image && !oldImage) {
      this.props.addPoster(image, this.props.groupId);
      return;
    }
  };

  deletePoster = () => {
    const poster = this.props.images[0];
    if (poster) this.props.deletePoster(poster.id, this.props.groupId);
  };

  fileUploadRef = React.createRef();

  openPosterSelector = (e) => {
    this.fileUploadRef.current.click();
  };

  render() {
    const poster = this.props.images[0];
    var imgPath = poster ? poster.image : DEFAULT_IMAGE;

    return (
      <div className="w-60 relative group h-auto">
        <div className="absolute bottom-0 w-full flex justify-center transform opacity-0 group-hover:opacity-100 transition ease-in duration-300">
          <div className="absolute w-full bg-gray-800 h-full opacity-80"></div>
          <div className="text-purple-400 z-10 p-1">
            <FontAwesomeIcon
              icon={faCamera}
              size="lg"
              className="hover:text-purple-300 cursor-pointer mx-2"
              onClick={this.openPosterSelector}
            />
            <FontAwesomeIcon
              icon={faTimes}
              size="lg"
              className="hover:text-purple-300 cursor-pointer mx-2"
              onClick={this.deletePoster}
            />
          </div>
          <input
            className="hidden"
            type="file"
            id="poster"
            name="poster"
            accept="image/*"
            onChange={this.posterSelected}
            ref={this.fileUploadRef}
          ></input>
        </div>
        <img
          src={imgPath}
          alt="Placeholder"
          className="shadow-sm rounded-lg object-center"
        />
      </div>
    );
  }
}

export default connect(null, null)(Poster);
