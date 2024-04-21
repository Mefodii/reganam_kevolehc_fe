import { WATCHING_STATUS_FINISHED } from '../util/constants';
import {
  getToday,
  isWatchingFinished,
  isWatchingQueue,
} from '../util/functions';
import AliasModel from './alias';
import BaseModel from './base-model';
import LinkModel from './link';

class GroupModel extends BaseModel {
  constructor() {
    super();
    this.aliasModel = new AliasModel(AliasModel.GROUP);
    this.linkModel = new LinkModel(LinkModel.GROUP);
  }

  init = (props) => {
    this.reset();
    if (props.edit) this.setUpdate();
    this.setSingle(props.single);
    this.aliasModel.init(props);
    this.linkModel.init(props);
  };

  getInitialState = (props) => ({
    id: null,
    name: '',
    aliases: this.aliasModel.getInitialState(),
    links: this.linkModel.getInitialState(),
    airing_status: null,
    single: this.isSingle(),
    status: null,
    watched_date: this.isSingle() ? getToday() : null,
    rating: 0,
    year: 0,
    check_date: getToday(),
  });

  toState = (props) => {
    const { group } = props;
    return {
      id: group.id,
      name: group.name,
      aliases: this.aliasModel.toState(props),
      links: this.linkModel.toState(props),
      check_date: group.check_date,
      airing_status: group.airing_status,
      single: group.single,
      status: group.status,
      watched_date: group.watched_date,
      rating: group.rating,
      year: group.year,
    };
  };

  buildState = (props) => {
    if (this.isUpdate()) return this.toState(props);
    return this.getInitialState(props);
  };

  toModel = (state, props) => ({
    id: state.id,
    type: props.watchingType,
    name: state.name,
    aliases: this.aliasModel.toModel(state, props),
    links: this.linkModel.toModel(state, props),
    check_date: state.check_date,
    airing_status: state.airing_status,
    single: state.single,
    status: state.status,
    watched_date: state.watched_date,
    year: state.year,
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
    const o2 = props.group;

    if (o1?.name !== o2?.name) return false;
    if (o1?.check_date !== o2?.check_date) return false;
    if (o1?.airing_status !== o2?.airing_status) return false;
    if (o1?.single !== o2?.single) return false;
    if (o1?.status !== o2?.status) return false;
    if (o1?.watched_date !== o2?.watched_date) return false;
    if (o1?.year !== o2?.year) return false;
    if (o1?.rating !== o2?.rating) return false;
    if (!this.aliasModel.equals(state, props)) return false;
    if (!this.linkModel.equals(state, props)) return false;

    return true;
  };

  addAlias = (aliases) => this.aliasModel.addAlias(aliases);
  deleteAlias = (aliases) => this.aliasModel.deleteAlias(aliases);

  addLink = (links) => this.linkModel.addLink(links);
  deleteLink = (links) => this.linkModel.deleteLink(links);

  isSingle = () => this.single;
  setSingle = (single) => (this.single = single);

  static isInQueue = (group) => {
    return isWatchingQueue(group.status);
  };

  static isFinished = (group) => {
    return isWatchingFinished(group.status);
  };

  static setFinished = (group) => ({
    ...group,
    status: WATCHING_STATUS_FINISHED,
    watched_date: getToday(),
  });
}

export default GroupModel;
