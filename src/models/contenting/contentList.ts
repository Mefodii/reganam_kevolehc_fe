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
    type ContentListAM = ContentListSM;
    type ContentListPureDM = ContentListAM & {
      id: number;
      content_watcher: null;
      consumed: boolean;
    };
    // TODO: (L) - need a distinction between a received object from DB and sended object to DB for an update
    //  e.g. consumed property is read only in DB. In group model: videos are also readonly
    type ContentListDM = ContentListPureDM & {
      content_watcher: number | null;
    };
    type ContentListProps = CreateProps | UpdateProps<ContentListDM>;
  }
}

class ContentListModel extends BaseModel<
  Model.ContentListProps,
  Model.ContentListSM,
  Model.ContentListAM,
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

  toAPIState(state: Model.ContentListSM): Model.ContentListSM {
    return {
      id: state.id,
      name: state.name,
      category: state.category,
      migration_position: state.migration_position,
    };
  }

  toDBState(
    state: Model.ContentListSM,
    dbState: Model.ContentListDM
  ): Model.ContentListDM {
    return {
      ...this.toAPIState(state),
      id: dbState.id,
      content_watcher: dbState.content_watcher,
      consumed: dbState.consumed,
    };
  }
  equals(o1: Model.ContentListDM, o2: Model.ContentListDM): boolean {
    if (o1?.name !== o2?.name) return false;
    // TODO: (L) - proper implementation for the model
    return true;
  }
}

export const contentList = new ContentListModel();
