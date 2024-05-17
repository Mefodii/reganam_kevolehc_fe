import { validateMandatoryFields } from '../../util/functions';

declare global {
  namespace Model {
    type ContentListSM = {
      id?: number;
      name: string;
    };
    type ContentListAM = ContentListSM;
    type ContentListDM = ContentListAM & {
      id: number;
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

export const ContentList: Model.ContentListModel = {
  mandatoryFields: ['name'],
  getInitialState: () => ({
    id: undefined,
    name: '',
  }),
  toState: (contentList) => {
    return {
      id: contentList.id,
      name: contentList.name,
    };
  },
  buildState(props) {
    if (props.formMode === 'UPDATE') return this.toState(props.contentList);
    return this.getInitialState(props);
  },
  toAPIState: (state) => ({
    id: state.id,
    name: state.name,
  }),
  toDBState: (state, dbState) => ({
    id: dbState.id,
    name: state.name,
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
    return true;
  },
};
