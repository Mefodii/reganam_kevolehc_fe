import { WATCHIO_STATUS_FINISHED } from "../util/constants";
import { getToday } from "../util/functions";
import AliasModel from "./alias";

class GroupModel {
  constructor(data = { edit: false, single: false }) {
    this.aliasModel = new AliasModel();

    const { edit, single } = data;
    this.edit = edit;
    this.single = single;
  }

  updateModel = (data) => {
    const { edit, single } = data;
    if (edit !== undefined) this.edit = edit;
    if (single !== undefined) this.single = single;
  };

  getInitialState = () => ({
    id: null,
    name: "",
    aliases: this.aliasModel.getInitialState(),
    airing_status: null,
    single: this.single,
    status: null,
    watched_date: this.single ? getToday() : null,
    rating: 0,
    year: 0,
    check_date: getToday(),
  });

  toState = (props) => {
    const { group } = props;
    return {
      id: group.id,
      name: group.name,
      aliases: this.aliasModel.toState(group.aliases),
      check_date: group.check_date,
      airing_status: group.airing_status,
      single: group.single,
      status: group.status,
      watched_date: group.watched_date,
      rating: group.rating,
      year: group.year,
    };
  };

  toModel = (state, props) => ({
    id: state.id,
    type: props.watchioType,
    name: state.name,
    aliases: this.aliasModel.toModel(state.aliases),
    check_date: state.check_date,
    airing_status: state.airing_status,
    single: state.single,
    status: state.status,
    watched_date: state.watched_date,
    year: state.year,
    rating: state.rating,
  });

  validate = (state, props) => {
    const isValid = true;
    const error = {};

    return [isValid, error];
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
    if (!this.aliasModel.equals(o1.aliases, o2.aliases)) return false;

    return true;
  };

  addAlias = (aliases) => this.aliasModel.addAlias(aliases);

  deleteAlias = (aliases) => this.aliasModel.deleteAlias(aliases);

  static setFinished = (group) => ({
    ...group,
    status: WATCHIO_STATUS_FINISHED,
    watched_date: getToday(),
  });
}

export default GroupModel;
