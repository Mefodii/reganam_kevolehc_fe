import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { BLANK_VALUE } from "../../../util/constants";

import Poster from "./Poster";
import SVGPencil from "../../generic/svg/SVGPencil";
import GroupForm from "./GroupForm";
import VideoList from "./VideoList";

export class GroupItem extends Component {
  static propTypes = {
    group: PropTypes.object.isRequired,
    watchioType: PropTypes.string.isRequired,
  };

  state = {
    edit: false,
  };

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };

  render() {
    const { edit } = this.state;
    const { watchioType } = this.props;
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

    return (
      <div className="m-5 p-2 border-2 shadow-2xl rounded-xl bg-secondary border-tertiary">
        <div className="flex my-2">
          <Poster
            images={images}
            groupId={id}
            disabled={!edit}
            watchioType={watchioType}
          ></Poster>
          <div className="mx-5 p-2 border-2 shadow-2xl rounded-xl bg-secondary border-tertiary w-full h-min">
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
                  <div className="w-1/2 break-all">
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
                  <div className="flex w-1/2 space-x-2 px-3 text-center">
                    <div className={`w-full ${!single && "invisible"}`}>
                      <div className="text-xs">Status</div>
                      <div className="font-bold">{status}</div>
                    </div>
                    <div className={`w-full ${!single && "invisible"}`}>
                      <div className="text-xs">Watched Date</div>
                      <div className="font-bold">
                        {watched_date || BLANK_VALUE}
                      </div>
                    </div>
                    <div className={`w-full ${!single && "invisible"}`}>
                      <div className="text-xs">Year</div>
                      <div className="font-bold">{year}</div>
                    </div>
                    <div className={`w-full ${!single && "invisible"}`}>
                      <div className="text-xs">Rating</div>
                      <div className="font-bold">{rating} / 10</div>
                    </div>
                    <div className="w-full">
                      <div className="text-xs">Airing Status</div>
                      <div className="font-bold">{airing_status}</div>
                    </div>
                    <div className="w-full">
                      <div className="text-xs">Check Date</div>
                      <div className="font-bold">
                        {check_date || BLANK_VALUE}
                      </div>
                    </div>
                  </div>
                  <div onClick={this.toggleEdit}>
                    <SVGPencil className="w-7 wiggling-clickable"></SVGPencil>
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

export default connect(null, null)(GroupItem);
