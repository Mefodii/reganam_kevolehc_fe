import React, { Component } from 'react';
import { DEFAULT_IMAGE } from '../../../util/frontend-urls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faTimes } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoadingOverlay from '../../generic/LoadingOverlay';
import {
  createPoster,
  updatePoster,
  deletePoster,
} from '../../../features/watching/groups/groupsSlice';

export class Poster extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    groupId: PropTypes.number.isRequired,
    watchingType: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    createPoster: PropTypes.func.isRequired,
    updatePoster: PropTypes.func.isRequired,
    deletePoster: PropTypes.func.isRequired,
  };

  state = {
    dragOver: false,
    isLoading: false,
  };

  setLoading = (isLoading, cb) => this.setState({ isLoading }, cb);

  onDragEnter = (e) => {
    this.setState({ dragOver: true });
  };

  onDragLeave = (e) => {
    this.setState({ dragOver: false });
  };

  onDrop = (e) => {
    e.preventDefault();
    const image = e.dataTransfer.files[0];

    if (!image.type.startsWith('image/')) {
      console.error('Unacceptable file type: ', image);
      return;
    }

    this.setLoading(true, () => this.changePoster(image));
    this.setState({ dragOver: false });
  };

  onFileSelect = (e) => {
    const image = e.target.files[0];
    this.changePoster(image);
  };

  changePoster = (image) => {
    if (!image) return;

    const poster = this.props.images[0];
    const { groupId } = this.props;
    // Update poster
    if (poster) {
      this.props
        .updatePoster({ poster, image, groupId })
        .then(() => this.setLoading(false));
      return;
    }

    // Add poster
    if (!poster) {
      this.props
        .createPoster({ image, groupId })
        .then(() => this.setLoading(false));
      return;
    }
  };

  deletePoster = () => {
    const { images, groupId } = this.props;
    const poster = images[0];

    if (poster) this.props.deletePoster({ poster, groupId });
  };

  fileUploadRef = React.createRef();

  openPosterSelector = (e) => {
    this.fileUploadRef.current.click();
  };

  render() {
    const poster = this.props.images[0];
    var imgPath = poster ? poster.image : DEFAULT_IMAGE;

    const { disabled } = this.props;
    const { dragOver, isLoading } = this.state;

    return (
      <div
        className={`relative group
        ${dragOver ? 'border-2 border-active-1 shadow-inner' : ''}
        `}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
      >
        <LoadingOverlay loading={isLoading} />
        {!disabled && (
          <div className='absolute bottom-0 w-full flex justify-center transform opacity-0 group-hover:opacity-100 transition ease-in duration-300'>
            <div className='absolute w-full bg-gray-800 h-full opacity-80'></div>
            <div className='text-active-1/40 z-10 p-1'>
              <FontAwesomeIcon
                icon={faCamera}
                size='lg'
                className='hover:text-active-1 cursor-pointer mx-2'
                onClick={this.openPosterSelector}
              />
              <FontAwesomeIcon
                icon={faTimes}
                size='lg'
                className='hover:text-active-1 cursor-pointer mx-2'
                onClick={this.deletePoster}
              />
            </div>
            <input
              className='hidden'
              type='file'
              id='poster'
              name='poster'
              accept='image/*'
              onChange={this.onFileSelect}
              ref={this.fileUploadRef}
            ></input>
          </div>
        )}
        <img
          src={imgPath}
          alt='Placeholder'
          className='shadow-sm rounded-lg object-center w-60'
          draggable='false'
        />
      </div>
    );
  }
}

export default connect(null, { createPoster, updatePoster, deletePoster })(
  Poster
);
