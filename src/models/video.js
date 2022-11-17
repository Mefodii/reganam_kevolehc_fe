import { WATCHIO_STATUS_FINISHED } from "../util/constants";
import { getToday, isWatchioFinished, isWatchioQueue } from "../util/functions";
import AliasModel from "./alias";
import BaseModel from "./base-model";
import LinkModel from "./link";

class VideoModel extends BaseModel {
  constructor() {
    super();
    this.aliasModel = new AliasModel(AliasModel.VIDEO);
    this.linkModel = new LinkModel(LinkModel.VIDEO);
  }

  init = (props) => {
    this.reset();
    if (props.edit) this.setUpdate();
    this.aliasModel.init(props);
  };

  getInitialState = (props) => ({
    id: null,
    name: "",
    comment: "",
    aliases: this.aliasModel.getInitialState(),
    links: this.linkModel.getInitialState(),
    status: null,
    watched_date: getToday(),
    year: 0,
    order: props.defaultOrder ? props.defaultOrder : 1,
    current_episode: 0,
    episodes: 1,
    rating: 0,
  });

  toState = (props) => {
    const { video } = props;
    return {
      id: video.id,
      name: video.name,
      comment: video.comment,
      aliases: this.aliasModel.toState(props),
      links: this.linkModel.toState(props),
      year: video.year,
      status: video.status,
      order: video.order,
      current_episode: video.current_episode,
      episodes: video.episodes,
      rating: video.rating,
      watched_date: video.watched_date,
    };
  };

  buildState = (props) => {
    if (this.isUpdate()) return this.toState(props);
    return this.getInitialState(props);
  };

  toModel = (state, props) => ({
    id: state.id,
    type: props.watchioType,
    group: props.groupId,
    name: state.name,
    comment: state.comment,
    aliases: this.aliasModel.toModel(state, props),
    links: this.linkModel.toModel(state, props),
    year: state.year,
    status: state.status,
    watched_date: state.watched_date,
    order: state.order,
    current_episode: state.current_episode,
    episodes: state.episodes,
    rating: state.rating,
  });

  validate = (state, props) => {
    const model = this.toModel(state, props);
    const isValid = true;
    const error = {};

    // TODO

    return [model, isValid, error];
  };

  equals = (state, props) => {
    const o1 = this.toModel(state, props);
    const o2 = props.video;

    if (o1?.name !== o2?.name) return false;
    if (o1?.comment !== o2?.comment) return false;
    if (o1?.year !== o2?.year) return false;
    if (o1?.status !== o2?.status) return false;
    if (o1?.watched_date !== o2?.watched_date) return false;
    if (o1?.order !== o2?.order) return false;
    if (o1?.current_episode !== o2?.current_episode) return false;
    if (o1?.episodes !== o2?.episodes) return false;
    if (o1?.rating !== o2?.rating) return false;
    if (!this.aliasModel.equals(state, props)) return false;
    if (!this.linkModel.equals(state, props)) return false;

    return true;
  };

  addAlias = (aliases) => this.aliasModel.addAlias(aliases);
  deleteAlias = (aliases) => this.aliasModel.deleteAlias(aliases);

  addLink = (links) => this.linkModel.addLink(links);
  deleteLink = (links) => this.linkModel.deleteLink(links);

  static isInQueue = (video) => {
    return isWatchioQueue(video.status);
  };

  static isFinished = (video) => {
    return isWatchioFinished(video.status);
  };

  static setFinished = (video) => ({
    ...video,
    status: WATCHIO_STATUS_FINISHED,
    current_episode: video.episodes,
    watched_date: getToday(),
  });
}

export default VideoModel;
