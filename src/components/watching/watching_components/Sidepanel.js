import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  openGroupModal,
  openWatchingFilterModal,
} from '../../../actions/modal';
import CompactButton from '../../generic/buttons/CompactButton';
import SVGFilter from '../../generic/svg/SVGFilter';
import SVGPlusCircle from '../../generic/svg/SVGPlusCircle';
import {
  selectAnimeType,
  selectMovieType,
} from '../../../features/watching/info/infoSlice';

export class Sidepanel extends Component {
  static propTypes = {
    watchingType: PropTypes.string.isRequired,
    movieType: PropTypes.string.isRequired,
    openGroupModal: PropTypes.func.isRequired,
    openWatchingFilterModal: PropTypes.func.isRequired,
  };

  state = {
    isMouseIn: false,
  };

  mouseEvent = (isMouseIn) => (e) => this.setState({ isMouseIn });

  openGroupModal = () => {
    const watchingType = this.props.watchingType;
    const single = watchingType === this.props.movieType;
    const edit = false;
    const withToggle = !edit && watchingType === this.props.animeType;

    this.props.openGroupModal({ watchingType, single, edit, withToggle });
  };

  openWatchingFilterModal = () => {
    this.props.openWatchingFilterModal();
  };

  render() {
    const { isMouseIn } = this.state;
    return (
      <div
        className={`fixed top-64 bg-theme-3/40 border border-theme-2 rounded-3xl shadow-2xl
        transition-all ease-in duration-150 group
        ${!isMouseIn && '-left-5'}
        ${isMouseIn && '-left-2'}
        `}
        onMouseEnter={this.mouseEvent(true)}
        onMouseLeave={this.mouseEvent(false)}
      >
        <div className='divide-y-2 divide-theme-2 m-2'>
          <CompactButton text='Add Group' onClick={this.openGroupModal}>
            <SVGPlusCircle className='w-6 transition-all duration-150' />
          </CompactButton>
          <CompactButton text='Filters' onClick={this.openWatchingFilterModal}>
            <SVGFilter className='w-6 transition-all duration-150' />
          </CompactButton>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  movieType: selectMovieType(state),
  animeType: selectAnimeType(state),
});

const mapDispatchToProps = { openGroupModal, openWatchingFilterModal };

export default connect(mapStateToProps, mapDispatchToProps)(Sidepanel);
