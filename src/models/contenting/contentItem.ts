import { DownloadStatus } from '../../api/api-utils';
import { BaseModel } from '../generic/model';

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
      content_list: number;
    };
    type ContentItemSM = ContentItemBase & {
      consumed: boolean;
    };
    type ContentItemAM = ContentItemSM;
    type ContentItemDM = ContentItemAM & {
      id: number;
    };
    type ContentItemCreateProps = CreateProps & {
      content_list: number;
      defaultPosition: number;
    };
    type ContentItemProps = ContentItemCreateProps | UpdateProps<ContentItemDM>;
  }
}

class ContentItemModel extends BaseModel<
  Model.ContentItemProps,
  Model.ContentItemSM,
  Model.ContentItemAM,
  Model.ContentItemDM
> {
  mandatoryFields: (keyof Model.ContentItemSM)[] = ['title'];

  getInitialState(props: Model.ContentItemProps): Model.ContentItemSM {
    if (props?.formMode !== 'CREATE') {
      throw new Error(
        'props required in formMode = "CREATE" for `getInitialState` of the video.'
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
      consumed: false,
      content_list: props.content_list,
    };
  }

  toState(dbState: Model.ContentItemDM): Model.ContentItemSM {
    return {
      id: dbState.id,
      item_id: dbState.item_id,
      url: dbState.url,
      title: dbState.title,
      file_name: dbState.file_name,
      position: dbState.position,
      download_status: dbState.download_status,
      published_at: dbState.published_at,
      consumed: dbState.consumed,
      content_list: dbState.content_list,
    };
  }

  toAPIState(state: Model.ContentItemSM): Model.ContentItemAM {
    return {
      id: state.id,
      item_id: state.item_id,
      url: state.url,
      title: state.title,
      file_name: state.file_name,
      position: state.position,
      download_status: state.download_status,
      published_at: state.published_at,
      consumed: state.consumed,
      content_list: state.content_list,
    };
  }

  toDBState(
    state: Model.ContentItemSM,
    dbState: Model.ContentItemDM
  ): Model.ContentItemDM {
    return {
      ...this.toAPIState(state),
      id: dbState.id,
    };
  }

  getDBState(props: Model.ContentItemProps): Model.ContentItemDM {
    if (props.formMode === 'UPDATE') return props.item;
    throw new Error(`getDBState not available for ${props.formMode}`);
  }

  equals(o1: Model.ContentItemDM, o2: Model.ContentItemDM): boolean {
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
  }
}

export const contentItem = new ContentItemModel();
