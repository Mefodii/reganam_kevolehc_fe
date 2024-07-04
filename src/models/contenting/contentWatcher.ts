import { getToday } from '../../util/datetime';
import {
  ContentCategory,
  ContentWatcherExtension,
  ContentWatcherQuality,
  ContentWatcherSource,
  ContentWatcherStatus,
} from '../../api/api-utils';
import { BaseModel } from '../generic/model';

declare global {
  namespace Model {
    type ContentWatcherSM = {
      id?: number;
      name: string;
      category: ContentCategory;
      watcher_id: string;
      source_type: ContentWatcherSource;
      status: ContentWatcherStatus;
      download: boolean;
      video_quality: ContentWatcherQuality;
      check_date: string;
      file_extension: ContentWatcherExtension | '';
      content_list?: number;
      // TODO: (M) - migration position should be part of state (Django will handle update in List object)
    };
    type ContentWatcherDM = ContentWatcherSM & {
      id: number;
      content_list: number;
      migration_position: number;
      items_count: number;
      consumed: boolean;
    };
    type ContentWatcherUpdateProps = UpdateProps<ContentWatcherDM> & {
      scope: Redux.Scope;
    };
    type ContentWatcherProps = CreateProps | ContentWatcherUpdateProps;
  }
}

class ContentWatcherModel extends BaseModel<
  Model.ContentWatcherProps,
  Model.ContentWatcherSM,
  Model.ContentWatcherDM
> {
  mandatoryFields: (keyof Model.ContentWatcherSM)[] = [
    'source_type',
    'status',
    'file_extension',
  ];

  getInitialState(props: Model.ContentWatcherProps): Model.ContentWatcherSM {
    return {
      id: undefined,
      name: '',
      category: ContentCategory.OTHER,
      watcher_id: '',
      source_type: ContentWatcherSource.OTHER,
      status: ContentWatcherStatus.NONE,
      download: false,
      video_quality: ContentWatcherQuality.DEFAULT,
      check_date: getToday(),
      file_extension: '',
      content_list: undefined,
    };
  }

  toState(dbState: Model.ContentWatcherDM): Model.ContentWatcherSM {
    return {
      id: dbState.id,
      name: dbState.name,
      category: dbState.category,
      watcher_id: dbState.watcher_id,
      source_type: dbState.source_type,
      status: dbState.status,
      download: dbState.download,
      video_quality: dbState.video_quality,
      check_date: dbState.check_date,
      file_extension: dbState.file_extension,
      content_list: dbState.content_list,
    };
  }

  toDBState(
    state: Model.ContentWatcherSM,
    dbState: Model.ContentWatcherDM
  ): Model.ContentWatcherDM {
    return {
      ...state,
      id: dbState.id,
      content_list: dbState.content_list,
      migration_position: dbState.migration_position,
      items_count: dbState.items_count,
      consumed: dbState.consumed,
    };
  }

  equals(o1: Model.ContentWatcherDM, o2: Model.ContentWatcherDM): boolean {
    if (o1?.name !== o2?.name) return false;
    if (o1?.category !== o2?.category) return false;
    if (o1?.watcher_id !== o2?.watcher_id) return false;
    if (o1?.source_type !== o2?.source_type) return false;
    if (o1?.status !== o2?.status) return false;
    if (o1?.download !== o2?.download) return false;
    if (o1?.video_quality !== o2?.video_quality) return false;
    if (o1?.check_date !== o2?.check_date) return false;
    if (o1?.file_extension !== o2?.file_extension) return false;
    if (o1?.content_list !== o2?.content_list) return false;

    return true;
  }

  isMusic<T extends Model.ContentWatcherSM>(contentWatcher: T): boolean {
    return contentWatcher.category === ContentCategory.MUSIC;
  }
}

export const contentWatcher = new ContentWatcherModel();
