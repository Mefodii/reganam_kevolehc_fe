import { validateMandatoryFields } from '../../util/functions';

export class SimpleModel<S> {
  mandatoryFields: (keyof S)[] = [];

  getInitialState(): S {
    throw new Error('getInitialState not implemented');
  }

  toState(originalState: S): S {
    throw new Error('toState not implemented');
  }

  buildState(originalState?: S): S {
    if (originalState) return this.toState(originalState);
    return this.getInitialState();
  }

  validate(state: S, originalState: S): [S, boolean, boolean, Partial<S>] {
    const [isValid, error] = validateMandatoryFields(
      state,
      this.mandatoryFields
    );
    const newState: S | undefined = this.toState(state);
    const equals = isValid && this.equals(newState, originalState);

    return [newState, equals, isValid, error];
  }

  equals(o1: S, o2: S): boolean {
    throw new Error('equals not implemented');
  }
}

export class BaseModel<P extends Model.ModelProps<D>, S, D> {
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

  toDBState(state: S, dbState: D): D {
    throw new Error('toDBState not implemented');
  }

  getDBState(props: P): D {
    if (props.formMode === 'UPDATE') {
      return props.item;
    }
    throw new Error(`getDBState not available for ${props.formMode}`);
  }

  validateCreate(state: S): [S, boolean, Partial<S>] {
    const [isValid, error] = validateMandatoryFields(
      state,
      this.mandatoryFields
    );
    return [state, isValid, error];
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
