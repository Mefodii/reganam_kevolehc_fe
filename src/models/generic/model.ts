import { validateMandatoryFields } from '../../util/functions';

export class BaseModel<P extends Model.ModelProps<D>, S, A, D> {
  mandatoryFields: (keyof S)[] = [];

  getInitialState(props?: P): S {
    throw new Error('getInitialState not implemented');
  }

  toState(dbState: D): S {
    throw new Error('toState not implemented');
  }

  buildState(props: P): S {
    if (props.formMode === 'UPDATE') {
      return this.toState(props.item);
    }
    return this.getInitialState(props);
  }

  toAPIState(state: S): A {
    throw new Error('toAPIState not implemented');
  }

  toDBState(state: S, dbState: D): D {
    throw new Error('toDBState not implemented');
  }

  getDBState(props: P): D {
    if (props.formMode === 'UPDATE') {
      return props.item;
    }
    throw new Error(`getDBState not available for ${props.formMode}`);
  }

  validateCreate(state: S): [A, boolean, Partial<S>] {
    const [isValid, error] = validateMandatoryFields(
      state,
      this.mandatoryFields
    );
    const apiState = this.toAPIState(state);
    return [apiState, isValid, error];
  }

  validateUpdate(state: S, dbState: D): [D, boolean, boolean, Partial<S>] {
    const [isValid, error] = validateMandatoryFields(
      state,
      this.mandatoryFields
    );
    const newState = this.toDBState(state, dbState);
    const equals = isValid && this.equals(newState, dbState);
    return [newState, equals, isValid, error];
  }

  equals(o1: D, o2: D): boolean {
    throw new Error('equals not implemented');
  }
}
