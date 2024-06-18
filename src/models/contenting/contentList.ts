import { validateMandatoryFields } from '../../util/functions';

declare global {
  namespace Model {
    type ContentListSM = {
      id?: number;
      name: string;
      category?: string;
      migration_position: number;
    };
    type ContentListAM = ContentListSM & {
      category: string;
    };
    type ContentListPureDM = ContentListAM & {
      id: number;
      content_watcher: null;
    };
    type ContentListDM = ContentListPureDM & {
      content_watcher: number | null;
    };
    type ContentListCreateProps = {
      formMode: 'CREATE';
    };
    type ContentListUpdateProps = {
      contentList: ContentListDM;
      formMode: 'UPDATE';
    };
    type ContentListProps = ContentListCreateProps | ContentListUpdateProps;
    type ContentListModel = Worker<
      ContentListProps,
      ContentListSM,
      ContentListAM,
      ContentListDM
    > & {
      mandatoryFields: string[];
    };
  }
}

export const contentList: Model.ContentListModel = {
  mandatoryFields: ['name'],
  getInitialState: () => ({
    id: undefined,
    name: '',
    category: undefined,
    migration_position: 0,
  }),
  toState: (contentList) => {
    return {
      id: contentList.id,
      name: contentList.name,
      category: contentList.category,
      migration_position: contentList.migration_position,
    };
  },
  buildState(props) {
    if (props.formMode === 'UPDATE') return this.toState(props.contentList);
    return this.getInitialState(props);
  },
  toAPIState: (state) => ({
    id: state.id,
    name: state.name,
    category: state.category!,
    migration_position: state.migration_position,
  }),
  toDBState: (state, dbState) => ({
    id: dbState.id,
    name: state.name,
    category: state.category!,
    content_watcher: dbState.content_watcher,
    migration_position: state.migration_position,
  }),
  getDBState: (props) => {
    if (props.formMode === 'UPDATE') return props.contentList;
    throw new Error(`getDBState not available for ${props.formMode}`);
  },
  validateCreate(state) {
    let isValid = true;
    let error: Partial<Model.ContentListSM> = {};
    [isValid, error] = validateMandatoryFields(state, this.mandatoryFields);

    const apiState = this.toAPIState(state);
    return [apiState, isValid, error];
  },
  validateUpdate(state, dbState) {
    let isValid = true;
    let error: Partial<Model.ContentListSM> = {};
    [isValid, error] = validateMandatoryFields(state, this.mandatoryFields);

    const newState = this.toDBState(state, dbState);
    const equals = isValid && this.equals(newState, dbState);
    return [newState, equals, isValid, error];
  },
  equals(o1, o2) {
    if (o1?.name !== o2?.name) return false;
    // TODO: (L) - proper implementation for the model
    return true;
  },
};
