import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { BLANK_VALUE } from "../../../util/constants";

import Poster from "./Poster";
import SVGPencil from "../../generic/svg/SVGPencil";
import VideoList from "./VideoList";
import SVGCheck from "../../generic/svg/SVGCheck";
import { updateGroup } from "../../../actions/groups";
import { isWatchioFinished, promptNumber } from "../../../util/functions";
import { openGroupModal, openVideoModal } from "../../../actions/modal";
import GroupModel from "../../../models/group";
import SVGPlus from "../../generic/svg/SVGPlus";

export class GroupItem extends Component {
  static propTypes = {
    group: PropTypes.object.isRequired,
    watchioType: PropTypes.string.isRequired,
    showPoster: PropTypes.bool.isRequired,
    updateGroup: PropTypes.func.isRequired,
    openGroupModal: PropTypes.func.isRequired,
    openVideoModal: PropTypes.func.isRequired,
  };

  openEdit = () => {
    const { group, watchioType } = this.props;
    const { single } = group;
    const edit = true;

    this.props.openGroupModal({ watchioType, single, edit, group });
  };

  openVideoModal = () => {
    const { watchioType, group } = this.props;
    const { id: groupId, videos } = group;

    const defaultOrder = videos.length > 0 ? videos.at(-1).order + 1 : 1;
    const edit = false;
    this.props.openVideoModal({ watchioType, groupId, defaultOrder, edit });
  };

  setFinised = () => {
    const rating = promptNumber("Set group rating");
    if (rating === undefined) {
      return;
    }

    const group = {
      ...GroupModel.setFinished(this.props.group),
      rating,
    };
    this.props.updateGroup(group, this.props.watchioType);
  };

  render() {
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
              watchioType={watchioType}
            ></Poster>
          </div>
          <div className="watchio-element mx-5 z-10 h-full relative overflow-visible">
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
                  {single && (
                    <>
                      <div className="w-24 m-1">
                        <div className="text-xs">Status</div>
                        <div className="font-bold">{status}</div>
                      </div>
                      <div className="w-24 m-1">
                        <div className="text-xs">
                          {status || "Watched "} Date
                        </div>
                        <div className="font-bold">
                          {watched_date || BLANK_VALUE}
                        </div>
                      </div>
                      <div className="w-24 m-1">
                        <div className="text-xs">Year</div>
                        <div className="font-bold">{year}</div>
                      </div>
                      <div className="w-24 m-1">
                        <div className="text-xs">Rating</div>
                        <div className="font-bold">{rating} / 10</div>
                      </div>
                    </>
                  )}

                  {!single && (
                    <>
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
                    </>
                  )}
                </div>
                <div>
                  <div onClick={this.openEdit}>
                    <SVGPencil className="w-6 wiggling-clickable" />
                  </div>
                  {!isWatchioFinished(status) && single && (
                    <div onClick={this.setFinised}>
                      <SVGCheck className="w-6 wiggling-clickable" />
                    </div>
                  )}
                  {!single && (
                    <div onClick={this.openVideoModal}>
                      <SVGPlus className="w-6 wiggling-clickable" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {!single && (
              <VideoList
                videos={videos}
                watchioType={watchioType}
                groupId={id}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { updateGroup, openGroupModal, openVideoModal })(
  GroupItem
);
