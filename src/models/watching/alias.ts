declare global {
  namespace Model {
    type Alias = string[];
    type AliasModel = SimpleWorker<Alias> & {
      addAlias: (links: Alias) => Alias;
      deleteAlias: (links: Alias) => Alias;
    };
  }
}

export const alias: Model.AliasModel = {
  getInitialState: () => [''],
  toState: (props) => (props.length > 0 ? [...props] : ['']),
  buildState() {
    return this.getInitialState();
  },
  validate(state) {
    let isValid = true;
    let error: Model.Alias = [];

    // TODO - do validations

    const newState = this.toState(state);
    return [newState, isValid, error];
  },
  equals(o1, o2) {
    if (o1.length !== o2.length) return false;

    for (let i = 0; i < o1.length; i++) {
      if (o1[i] !== o2[i]) return false;
    }

    return true;
  },
  addAlias: (aliass) => [...aliass, ''],
  deleteAlias: (aliass) =>
    aliass.length <= 1 ? aliass : [...aliass.slice(0, -1)],
};
