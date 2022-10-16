import { getToday } from "../util/functions";
import BaseModel from "./base-model";

class ContentWatcherModel extends BaseModel {
  init = (props) => {
    this.reset();
    if (props.edit) this.setUpdate();
  };

  getInitialState = (props) => ({
    id: null,
    name: "",
    watcher_id: "",
    source_type: null,
    status: null,
    check_date: getToday(),
    download_count: 0,
    file_extension: null,
    content_list: null,
  });

  toState = (props) => {
    const { contentWatcher } = props;
    return {
      id: contentWatcher.id,
      name: contentWatcher.name,
      watcher_id: contentWatcher.watcher_id,
      source_type: contentWatcher.source_type,
      status: contentWatcher.status,
      check_date: contentWatcher.check_date,
      download_count: contentWatcher.download_count,
      file_extension: contentWatcher.file_extension,
      content_list: contentWatcher.content_list,
    };
  };

  buildState = (props) => {
    if (this.isUpdate()) return this.toState(props);
    return this.getInitialState(props);
  };

  toModel = (state, props) => ({
    id: state.id,
    name: state.name,
    watcher_id: state.watcher_id,
    source_type: state.source_type,
    status: state.status,
    check_date: state.check_date,
    download_count: state.download_count,
    file_extension: state.file_extension,
    content_list: state.content_list,
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
    const o2 = props.contentWatcher;

    if (o1?.name !== o2?.name) return false;
    if (o1?.watcher_id !== o2?.watcher_id) return false;
    if (o1?.source_type !== o2?.source_type) return false;
    if (o1?.status !== o2?.status) return false;
    if (o1?.check_date !== o2?.check_date) return false;
    if (o1?.download_count !== o2?.download_count) return false;
    if (o1?.file_extension !== o2?.file_extension) return false;
    if (o1?.content_list !== o2?.content_list) return false;

    return true;
  };
}

export default ContentWatcherModel;
