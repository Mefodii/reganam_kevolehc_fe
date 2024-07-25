import { ContentMusic, DownloadStatus } from '../../api/api-utils';
import { getNow } from '../../util/datetime';
import { BaseModel } from '../generic/model';

declare global {
  namespace Model {
    type ContentMusicItemSM = ContentItemBase & {
      type: ContentMusic;
      comment: string;
      parsed: boolean;
      single_track: number | null;
    };
    type ContentMusicItemDM = ContentMusicItemSM & {
      id: number;
      tracks: ContentTrackDM[];
    };
    type ContentMusicItemCreateProps = CreateProps & {
      content_list: number;
      defaultPosition: number;
    };
    type ContentMusicItemProps =
      | ContentMusicItemCreateProps
      | UpdateProps<ContentMusicItemDM>;
  }
}

class ContentMusicItemModel extends BaseModel<
  Model.ContentMusicItemProps,
  Model.ContentMusicItemSM,
  Model.ContentMusicItemDM
> {
  getInitialState(
    props: Model.ContentMusicItemProps
  ): Model.ContentMusicItemSM {
    if (props?.formMode !== 'CREATE') {
      throw new Error(
        'props required in formMode = "CREATE" for `getInitialState` of the contentMusicItem.'
      );
    }
    return {
      id: undefined,
      item_id: '',
      url: '',
      title: '',
      file_name: '',
      position: props.defaultPosition,
      download_status: DownloadStatus.NONE,
      published_at: getNow(),
      type: ContentMusic.UNKNOWN,
      content_list: props.content_list,
      comment: '',
      parsed: false,
      single_track: null,
    };
  }

  toState(dbState: Model.ContentMusicItemDM): Model.ContentMusicItemSM {
    return {
      id: dbState.id,
      item_id: dbState.item_id,
      url: dbState.url,
      title: dbState.title,
      file_name: dbState.file_name,
      position: dbState.position,
      download_status: dbState.download_status,
      published_at: dbState.published_at,
      type: dbState.type,
      content_list: dbState.content_list,
      comment: dbState.comment,
      parsed: dbState.parsed,
      single_track: this.isSingle(dbState) ? dbState.tracks[0].track!.id : null,
    };
  }

  toDBState(
    state: Model.ContentMusicItemSM,
    dbState: Model.ContentMusicItemDM
  ): Model.ContentMusicItemDM {
    return {
      ...state,
      id: dbState.id,
      tracks: dbState.tracks,
      single_track: state.single_track,
    };
  }

  equals(o1: Model.ContentMusicItemDM, o2: Model.ContentMusicItemDM): boolean {
    if (o1?.item_id !== o2?.item_id) return false;
    if (o1?.url !== o2?.url) return false;
    if (o1?.title !== o2?.title) return false;
    if (o1?.file_name !== o2?.file_name) return false;
    if (o1?.position !== o2?.position) return false;
    if (o1?.download_status !== o2?.download_status) return false;
    if (o1?.published_at !== o2?.published_at) return false;
    if (o1?.type !== o2?.type) return false;
    if (o1?.content_list !== o2?.content_list) return false;
    if (o1?.comment !== o2?.comment) return false;
    if (o1?.parsed !== o2?.parsed) return false;

    return true;
  }

  isPlaylist<T extends Model.ContentMusicItemSM>(item: T): boolean {
    return item.type === ContentMusic.PLAYLIST;
  }

  isSingle<T extends Model.ContentMusicItemSM>(item: T): boolean {
    return item.type === ContentMusic.SINGLE;
  }

  isNotMusic<T extends Model.ContentMusicItemSM>(item: T): boolean {
    return item.type === ContentMusic.NOT_MUSIC;
  }

  isUnknown<T extends Model.ContentMusicItemSM>(item: T): boolean {
    return item.type === ContentMusic.UNKNOWN;
  }
}

export const contentMusicItem = new ContentMusicItemModel();
