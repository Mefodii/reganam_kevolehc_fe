import React, { Component } from "react";
import { DEFAULT_IMAGE } from "../../../util/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faTimes } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addPoster, deletePoster } from "../../../actions/posters";

export class Poster extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    groupId: PropTypes.number.isRequired,
    watchioType: PropTypes.string.isRequired,
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
      const { groupId, watchioType } = this.props;
      this.props.addPoster(image, groupId, watchioType);
      return;
    }
  };

  deletePoster = () => {
    const { images, groupId, watchioType } = this.props;
    const poster = images[0];

    if (poster) this.props.deletePoster(poster.id, groupId, watchioType);
  };

  fileUploadRef = React.createRef();

  openPosterSelector = (e) => {
    this.fileUploadRef.current.click();
  };

  render() {
    const poster = this.props.images[0];
    var imgPath = poster ? poster.image : DEFAULT_IMAGE;

    const { disabled } = this.props;

    return (
      <div className="relative group">
        {!disabled && (
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
        )}
        <img
          src={imgPath}
          alt="Placeholder"
          className="shadow-sm rounded-lg object-center w-60"
        />
      </div>
    );
  }
}

export default connect(null, { addPoster, deletePoster })(Poster);
