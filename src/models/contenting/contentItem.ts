import { DownloadStatus } from '../../api/api-utils';
import { validateMandatoryFields } from '../../util/functions';

declare global {
  namespace Model {
    type ContentItemBase = {
      id?: number;
      item_id: string;
      url: string;
      title: string;
      file_name: string;
      position: number;
      download_status: DownloadStatus;
      published_at: string;
    };
    type ContentItemSM = ContentItemBase & {
      consumed: boolean;
    };
    type ContentItemAM = ContentItemSM;
    type ContentItemDM = ContentItemAM & {
      id: number;
      content_list: number;
    };
    type ContentItemCreateProps = {
      formMode: 'CREATE';
    };
    type ContentItemUpdateProps = {
      contentItem: ContentItemDM;
      formMode: 'UPDATE';
    };
    type ContentItemProps = ContentItemCreateProps | ContentItemUpdateProps;
    type ContentItemModel = Worker<
      ContentItemProps,
      ContentItemSM,
      ContentItemAM,
      ContentItemDM
    > & {
      mandatoryFields: string[];
      asDnDDetails: (item: ContentItemDM) => DragAndDrop.ContentItemDetails;
    };
  }
}

export const contentItem: Model.ContentItemModel = {
  mandatoryFields: [],
  getInitialState: () => ({
    id: undefined,
    item_id: '',
    url: '',
    title: '',
    file_name: '',
    position: 0,
    download_status: DownloadStatus.NONE,
    published_at: '',
    consumed: false,
  }),
  toState: (contentWatcher) => {
    return {
      id: contentWatcher.id,
      item_id: contentWatcher.item_id,
      url: contentWatcher.url,
      title: contentWatcher.title,
      file_name: contentWatcher.file_name,
      position: contentWatcher.position,
      download_status: contentWatcher.download_status,
      published_at: contentWatcher.published_at,
      consumed: contentWatcher.consumed,
    };
  },
  buildState(props) {
    if (props.formMode === 'UPDATE') return this.toState(props.contentItem);
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
    consumed: state.consumed,
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
    consumed: state.consumed,
    content_list: dbState.content_list,
  }),
  getDBState: (props) => {
    if (props.formMode === 'UPDATE') return props.contentItem;
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
    if (o1?.consumed !== o2?.consumed) return false;
    if (o1?.content_list !== o2?.content_list) return false;

    return true;
  },
  asDnDDetails(item) {
    return {
      type: 'CONTENT_ITEM',
      item,
      accessGroup: item.content_list,
    };
  },
};
