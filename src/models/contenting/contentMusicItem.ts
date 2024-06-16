import { ContentMusic } from '../../api/api-utils';
import { validateMandatoryFields } from '../../util/functions';

declare global {
  namespace Model {
    type ContentMusicItemSM = ContentItemBase & {
      type?: ContentMusic;
      content_list: number;
    };
    type ContentMusicItemAM = ContentMusicItemSM & {
      type: ContentMusic;
    };
    type ContentMusicItemDM = ContentMusicItemAM & {
      id: number;
      tracks: ContentTrackDM[];
    };
    type ContentMusicItemCreateProps = {
      content_list: number;
      formMode: 'CREATE';
    };
    type ContentMusicItemUpdateProps = {
      contentMusicItem: ContentMusicItemDM;
      formMode: 'UPDATE';
    };
    type ContentMusicItemProps =
      | ContentMusicItemCreateProps
      | ContentMusicItemUpdateProps;
    type ContentMusicItemModel = Worker<
      ContentMusicItemProps,
      ContentMusicItemSM,
      ContentMusicItemAM,
      ContentMusicItemDM
    > & {
      mandatoryFields: string[];
      isSingle: <T extends ContentMusicItemSM>(item: T) => boolean;
      isPlaylist: <T extends ContentMusicItemSM>(item: T) => boolean;
      isNotMusic: <T extends ContentMusicItemSM>(item: T) => boolean;
    };
  }
}

export const contentMusicItem: Model.ContentMusicItemModel = {
  mandatoryFields: [], // TODO
  getInitialState: (props) => {
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
      position: 0,
      download_status: undefined,
      published_at: undefined,
      type: undefined,
      content_list: props.content_list,
    };
  },
  toState: (item) => {
    return {
      id: item.id,
      item_id: item.item_id,
      url: item.url,
      title: item.title,
      file_name: item.file_name,
      position: item.position,
      download_status: item.download_status,
      published_at: item.published_at,
      type: item.type,
      content_list: item.content_list,
    };
  },
  buildState(props) {
    if (props.formMode === 'UPDATE')
      return this.toState(props.contentMusicItem);
    return this.getInitialState(props);
  },
  toAPIState: (state) => ({
    id: state.id,
    item_id: state.item_id,
    url: state.url,
    title: state.title,
    file_name: state.file_name,
    position: state.position,
    download_status: state.download_status,
    published_at: state.published_at,
    type: state.type!,
    content_list: state.content_list,
  }),
  toDBState: (state, dbState) => ({
    id: dbState.id,
    item_id: state.item_id,
    url: state.url,
    title: state.title,
    file_name: state.file_name,
    position: state.position,
    download_status: state.download_status,
    published_at: state.published_at,
    type: state.type!,
    content_list: state.content_list,
    tracks: dbState.tracks,
  }),
  getDBState: (props) => {
    if (props.formMode === 'UPDATE') return props.contentMusicItem;
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
    if (o1?.item_id !== o2?.item_id) return false;
    if (o1?.url !== o2?.url) return false;
    if (o1?.title !== o2?.title) return false;
    if (o1?.file_name !== o2?.file_name) return false;
    if (o1?.position !== o2?.position) return false;
    if (o1?.download_status !== o2?.download_status) return false;
    if (o1?.published_at !== o2?.published_at) return false;
    if (o1?.type !== o2?.type) return false;
    if (o1?.content_list !== o2?.content_list) return false;

    return true;
  },
  isPlaylist(item) {
    return item.type === ContentMusic.PLAYLIST;
  },
  isSingle(item) {
    return item.type === ContentMusic.SINGLE;
  },
  isNotMusic(item) {
    return item.type === ContentMusic.NOT_MUSIC;
  },
};
