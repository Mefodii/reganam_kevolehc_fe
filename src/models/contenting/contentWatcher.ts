import { getToday, validateMandatoryFields } from '../../util/functions';

declare global {
  namespace Model {
    type ContentWatcherSM = {
      id?: number;
      name: string;
      watcher_id: string;
      source_type?: string;
      status?: string;
      check_date: string;
      download_count: number;
      file_extension?: string;
      content_list?: number;
    };
    type ContentWatcherAM = ContentWatcherSM & {
      source_type: string;
      status: string;
      file_extension: string;
    };
    type ContentWatcherDM = ContentWatcherAM & {
      id: number;
      content_list: number;
    };
    type ContentWatcherCreateProps = {
      formMode: 'CREATE';
    };
    type ContentWatcherUpdateProps = {
      contentWatcher: ContentWatcherDM;
      formMode: 'UPDATE';
    };
    type ContentWatcherProps =
      | ContentWatcherCreateProps
      | ContentWatcherUpdateProps;
    type ContentWatcherModel = Worker<
      ContentWatcherProps,
      ContentWatcherSM,
      ContentWatcherAM,
      ContentWatcherDM
    > & {
      mandatoryFields: string[];
    };
  }
}

export const contentWatcher: Model.ContentWatcherModel = {
  mandatoryFields: ['source_type', 'status', 'file_extension'],
  getInitialState: () => ({
    id: undefined,
    name: '',
    watcher_id: '',
    source_type: undefined,
    status: undefined,
    check_date: getToday(),
    download_count: 0,
    file_extension: undefined,
    content_list: undefined,
  }),
  toState: (contentWatcher) => {
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
  },
  buildState(props) {
    if (props.formMode === 'UPDATE') return this.toState(props.contentWatcher);
    return this.getInitialState(props);
  },
  toAPIState: (state) => ({
    id: state.id,
    name: state.name,
    watcher_id: state.watcher_id,
    source_type: state.source_type!,
    status: state.status!,
    check_date: state.check_date,
    download_count: state.download_count,
    file_extension: state.file_extension!,
    content_list: state.content_list,
  }),
  toDBState: (state, dbState) => ({
    id: dbState.id,
    name: state.name,
    watcher_id: state.watcher_id,
    source_type: state.source_type!,
    status: state.status!,
    check_date: state.check_date,
    download_count: state.download_count,
    file_extension: state.file_extension!,
    content_list: dbState.content_list,
  }),
  getDBState: (props) => {
    if (props.formMode === 'UPDATE') return props.contentWatcher;
    throw new Error(`getDBState not available for ${props.formMode}`);
  },
  validateCreate(state) {
    let isValid = true;
    let error: Partial<Model.ContentWatcherSM> = {};
    [isValid, error] = validateMandatoryFields(state, this.mandatoryFields);

    const apiState = this.toAPIState(state);
    return [apiState, isValid, error];
  },
  validateUpdate(state, dbState) {
    let isValid = true;
    let error: Partial<Model.ContentWatcherSM> = {};
    [isValid, error] = validateMandatoryFields(state, this.mandatoryFields);

    const newState = this.toDBState(state, dbState);
    const equals = isValid && this.equals(newState, dbState);
    return [newState, equals, isValid, error];
  },
  equals(o1, o2) {
    if (o1?.name !== o2?.name) return false;
    if (o1?.watcher_id !== o2?.watcher_id) return false;
    if (o1?.source_type !== o2?.source_type) return false;
    if (o1?.status !== o2?.status) return false;
    if (o1?.check_date !== o2?.check_date) return false;
    if (o1?.download_count !== o2?.download_count) return false;
    if (o1?.file_extension !== o2?.file_extension) return false;
    if (o1?.content_list !== o2?.content_list) return false;

    return true;
  },
};
