import { ContentMusic, DownloadStatus } from '../../api/api-utils';
import { BaseModel } from '../generic/model';

declare global {
  namespace Model {
    type ContentMusicItemSM = ContentItemBase & {
      type: ContentMusic;
      comment: string;
      parsed: boolean;
    };
    type ContentMusicItemAM = ContentMusicItemSM;
    type ContentMusicItemDM = ContentMusicItemAM & {
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
  Model.ContentMusicItemAM,
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
      published_at: '',
      type: ContentMusic.NOT_MUSIC,
      content_list: props.content_list,
      comment: '',
      parsed: false,
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
    };
  }

  toAPIState(state: Model.ContentMusicItemSM): Model.ContentMusicItemSM {
    return {
      id: state.id,
      item_id: state.item_id,
      url: state.url,
      title: state.title,
      file_name: state.file_name,
      position: state.position,
      download_status: state.download_status,
      published_at: state.published_at,
      type: state.type,
      content_list: state.content_list,
      comment: state.comment,
      parsed: state.parsed,
    };
  }

  toDBState(
    state: Model.ContentMusicItemSM,
    dbState: Model.ContentMusicItemDM
  ): Model.ContentMusicItemDM {
    return {
      ...this.toAPIState(state),
      id: dbState.id,
      tracks: dbState.tracks,
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
}

export const contentMusicItem = new ContentMusicItemModel();
