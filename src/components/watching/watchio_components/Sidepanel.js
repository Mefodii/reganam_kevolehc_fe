import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { openGroupModal, openWatchioFilterModal } from "../../../actions/modal";
import CompactButton from "../../generic/buttons/CompactButton";
import SVGFilter from "../../generic/svg/SVGFilter";
import SVGPlusCircle from "../../generic/svg/SVGPlusCircle";

export class Sidepanel extends Component {
  static propTypes = {
    watchioType: PropTypes.string.isRequired,
    movieType: PropTypes.string.isRequired,
    openGroupModal: PropTypes.func.isRequired,
    openWatchioFilterModal: PropTypes.func.isRequired,
  };

  state = {
    isMouseIn: false,
  };

  mouseEvent = (isMouseIn) => (e) => this.setState({ isMouseIn });

  openGroupModal = () => {
    const watchioType = this.props.watchioType;
    const single = watchioType === this.props.movieType;
    const edit = false;
    const withToggle = !edit && watchioType === this.props.animeType;

    this.props.openGroupModal({ watchioType, single, edit, withToggle });
  };

  openWatchioFilterModal = () => {
    this.props.openWatchioFilterModal();
  };

  render() {
    const { isMouseIn } = this.state;
    return (
      <div
        className={`fixed top-64 bg-theme-3/40 border border-theme-2 rounded-3xl shadow-2xl
        transition-all ease-in duration-150 group
        ${!isMouseIn && "-left-5"}
        ${isMouseIn && "-left-2"}
        `}
        onMouseEnter={this.mouseEvent(true)}
        onMouseLeave={this.mouseEvent(false)}
      >
        <div className="divide-y-2 divide-theme-2 m-2">
          <CompactButton text="Add Group" onClick={this.openGroupModal}>
            <SVGPlusCircle className="w-6 transition-all duration-150" />
          </CompactButton>
          <CompactButton text="Filters" onClick={this.openWatchioFilterModal}>
            <SVGFilter className="w-6 transition-all duration-150" />
          </CompactButton>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  movieType: state.info.watchioTypes.movie,
  animeType: state.info.watchioTypes.anime,
});

const mapDispatchToProps = { openGroupModal, openWatchioFilterModal };

export default connect(mapStateToProps, mapDispatchToProps)(Sidepanel);
