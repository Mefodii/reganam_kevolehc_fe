import { ContentCategory } from '../../api/api-utils';
import { BaseModel } from '../generic/model';

declare global {
  namespace Model {
    type ContentListSM = {
      id?: number;
      name: string;
      category: ContentCategory;
      migration_position: number;
    };
    type ContentListPureDM = ContentListSM & {
      id: number;
      content_watcher: null;
      consumed: boolean;
      items_count: number;
    };
    // TODO: (L) - need a distinction between a received object from DB and sended object to DB for an update
    //  e.g. consumed property is read only in DB. In group model: videos are also readonly
    type ContentListDM = ContentListPureDM & {
      content_watcher: number | null;
    };
    type ContentListUpdateProps = UpdateProps<ContentListDM> & {
      scope: Redux.Scope;
    };
    type ContentListProps = CreateProps | ContentListUpdateProps;
  }
}

class ContentListModel extends BaseModel<
  Model.ContentListProps,
  Model.ContentListSM,
  Model.ContentListDM
> {
  mandatoryFields: (keyof Model.ContentListSM)[] = ['name'];

  getInitialState(): Model.ContentListSM {
    return {
      id: undefined,
      name: '',
      category: ContentCategory.OTHER,
      migration_position: 0,
    };
  }

  toState(dbState: Model.ContentListDM): Model.ContentListSM {
    return {
      id: dbState.id,
      name: dbState.name,
      category: dbState.category,
      migration_position: dbState.migration_position,
    };
  }

  toDBState(
    state: Model.ContentListSM,
    dbState: Model.ContentListDM
  ): Model.ContentListDM {
    return {
      ...state,
      id: dbState.id,
      content_watcher: dbState.content_watcher,
      consumed: dbState.consumed,
      items_count: dbState.items_count,
    };
  }
  equals(o1: Model.ContentListDM, o2: Model.ContentListDM): boolean {
    if (o1?.name !== o2?.name) return false;
    if (o1?.category !== o2?.category) return false;
    if (o1?.migration_position !== o2?.migration_position) return false;
    return true;
  }

  isMusic<T extends Model.ContentListSM>(contentList: T): boolean {
    return contentList.category === ContentCategory.MUSIC;
  }
}

export const contentList = new ContentListModel();
