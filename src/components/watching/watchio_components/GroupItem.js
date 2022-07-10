import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { BLANK_VALUE } from "../../../util/constants";

import Poster from "./Poster";
import SVGPencil from "../../generic/svg/SVGPencil";
import GroupForm from "./GroupForm";
import VideoList from "./VideoList";
import SVGCheck from "../../generic/svg/SVGCheck";
import { isFinished, setGroupFinished } from "../util/functions";
import { updateGroup } from "../../../actions/groups";

export class GroupItem extends Component {
  static propTypes = {
    group: PropTypes.object.isRequired,
    watchioType: PropTypes.string.isRequired,
    showPoster: PropTypes.bool.isRequired,
    updateGroup: PropTypes.func.isRequired,
  };

  state = {
    edit: false,
  };

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };

  setFinised = () => {
    const rating = prompt("Set group rating");
    if (isNaN(rating)) {
      alert(`${rating} is not a number`);
      return;
    }

    const group = {
      ...setGroupFinished(this.props.group),
      rating: parseInt(rating),
    };
    this.props.updateGroup(group, this.props.watchioType);
  };

  render() {
    const { edit } = this.state;
    const { watchioType, showPoster } = this.props;
    const {
      id,
      name,
      aliases,
      check_date,
      airing_status,
      status,
      images,
      single,
      watched_date,
      year,
      rating,
      videos,
    } = this.props.group;

    const poster = images[0];

    return (
      <div className="watchio-element relative">
        {poster && (
          <div className="absolute w-full h-full opacity-10 overflow-hidden right-0 top-0 rounded-xl">
            <img
              src={poster.image}
              alt="Placeholder"
              className="w-full absolute rounded-lg -top-220 right-0"
            />
          </div>
        )}
        <div className="flex my-2 ">
          <div className={`min-w-60 ${showPoster ? "" : "hidden"}`}>
            <Poster
              images={images}
              groupId={id}
              disabled={!edit}
              watchioType={watchioType}
            ></Poster>
          </div>
          <div className="watchio-element mx-5 z-10 h-full relative overflow-visible">
            {edit ? (
              <GroupForm
                watchioType={watchioType}
                closeForm={this.toggleEdit}
                group={this.props.group}
                hideTitle
                edit
              ></GroupForm>
            ) : (
              <div className="ml-2 group">
                <div className="flex justify-between">
                  <div className="simple-font w-full break-all">
                    <div className="text-3xl font-bold">{name}</div>
                    {aliases.length > 0 && (
                      <div className="mt-3">
                        <div className="text-xs">Alias:</div>
                        <div>
                          {aliases.map((alias, i) => (
                            <div key={i}>{" - " + alias}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap 2xl:flex-nowrap px-3 justify-end text-center">
                    <div className={`w-24 m-1 ${!single && "invisible"}`}>
                      <div className="text-xs">Status</div>
                      <div className="font-bold">{status}</div>
                    </div>
                    <div className={`w-24 m-1 ${!single && "invisible"}`}>
                      <div className="text-xs">{status || "Watched "} Date</div>
                      <div className="font-bold">
                        {watched_date || BLANK_VALUE}
                      </div>
                    </div>
                    <div className={`w-24 m-1 ${!single && "invisible"}`}>
                      <div className="text-xs">Year</div>
                      <div className="font-bold">{year}</div>
                    </div>
                    <div className={`w-24 m-1 ${!single && "invisible"}`}>
                      <div className="text-xs">Rating</div>
                      <div className="font-bold">{rating} / 10</div>
                    </div>
                    <div className="w-24 m-1">
                      <div className="text-xs">Airing Status</div>
                      <div className="font-bold">{airing_status}</div>
                    </div>
                    <div className="w-24 m-1">
                      <div className="text-xs">Check Date</div>
                      <div className="font-bold">
                        {check_date || BLANK_VALUE}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div onClick={this.toggleEdit}>
                      <SVGPencil className="w-7 wiggling-clickable"></SVGPencil>
                    </div>
                    {!isFinished(status) && single && (
                      <div onClick={this.setFinised}>
                        <SVGCheck className="w-7 wiggling-clickable"></SVGCheck>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {!edit && !single && (
              <VideoList
                videos={videos}
                watchioType={watchioType}
                groupId={id}
              ></VideoList>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { updateGroup })(GroupItem);
