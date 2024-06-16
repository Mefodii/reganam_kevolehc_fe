import { validateMandatoryFields } from '../../util/functions';
import { getToday } from '../../util/datetime';
import {
  ContentCategory,
  ContentWatcherExtension,
  ContentWatcherQuality,
  ContentWatcherSource,
  ContentWatcherStatus,
} from '../../api/api-utils';

declare global {
  namespace Model {
    type ContentWatcherSM = {
      id?: number;
      name: string;
      category?: ContentCategory;
      watcher_id: string;
      source_type?: ContentWatcherSource;
      status?: ContentWatcherStatus;
      download: boolean;
      video_quality: ContentWatcherQuality | null;
      check_date: string;
      items_count: number;
      file_extension?: ContentWatcherExtension;
      content_list?: number;
    };
    type ContentWatcherAM = ContentWatcherSM & {
      category: ContentCategory;
      source_type: ContentWatcherSource;
      status: ContentWatcherStatus;
      file_extension: ContentWatcherExtension;
    };
    type ContentWatcherDM = ContentWatcherAM & {
      id: number;
      content_list: number;
      migration_position: number;
    };
    type ContentWatcherCreateProps = {
      formMode: 'CREATE';
    };
    type ContentWatcherUpdateProps = {
      contentWatcher: ContentWatcherDM;
      formMode: 'UPDATE';
      scope: Redux.Scope;
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
      isMusic: <T extends ContentWatcherSM>(contentWatcher: T) => boolean;
    };
  }
}

export const contentWatcher: Model.ContentWatcherModel = {
  mandatoryFields: ['source_type', 'status', 'file_extension'],
  getInitialState: () => ({
    id: undefined,
    name: '',
    category: undefined,
    watcher_id: '',
    source_type: undefined,
    status: undefined,
    download: false,
    video_quality: null,
    check_date: getToday(),
    items_count: 0,
    file_extension: undefined,
    content_list: undefined,
  }),
  toState: (contentWatcher) => {
    return {
      id: contentWatcher.id,
      name: contentWatcher.name,
      category: contentWatcher.category,
      watcher_id: contentWatcher.watcher_id,
      source_type: contentWatcher.source_type,
      status: contentWatcher.status,
      download: contentWatcher.download,
      video_quality: contentWatcher.video_quality,
      check_date: contentWatcher.check_date,
      items_count: contentWatcher.items_count,
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
    category: state.category!,
    watcher_id: state.watcher_id,
    source_type: state.source_type!,
    status: state.status!,
    download: state.download,
    video_quality:
      state.video_quality === undefined ? null : state.video_quality,
    check_date: state.check_date,
    items_count: state.items_count,
    file_extension: state.file_extension!,
    content_list: state.content_list,
  }),
  toDBState(state, dbState) {
    return {
      ...this.toAPIState(state),
      id: dbState.id,
      content_list: dbState.content_list,
      migration_position: dbState.migration_position,
    };
  },
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
    if (o1?.category !== o2?.category) return false;
    if (o1?.watcher_id !== o2?.watcher_id) return false;
    if (o1?.source_type !== o2?.source_type) return false;
    if (o1?.status !== o2?.status) return false;
    if (o1?.download !== o2?.download) return false;
    if (o1?.video_quality !== o2?.video_quality) return false;
    if (o1?.check_date !== o2?.check_date) return false;
    if (o1?.items_count !== o2?.items_count) return false;
    if (o1?.file_extension !== o2?.file_extension) return false;
    if (o1?.content_list !== o2?.content_list) return false;

    return true;
  },
  isMusic(contentWatcher) {
    return contentWatcher.category === ContentCategory.MUSIC;
  },
};
