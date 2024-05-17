declare global {
  namespace Model {
    type Link = string[];
    type LinkModel = SimpleWorker<Link> & {
      addLink: (links: Link) => Link;
      deleteLink: (links: Link) => Link;
    };
  }
}

export const link: Model.LinkModel = {
  getInitialState: () => [''],
  toState: (originalState) =>
    originalState.length > 0 ? [...originalState] : [''],
  buildState(originalState) {
    if (originalState) return this.toState(originalState);
    return this.getInitialState();
  },
  validate(state) {
    let isValid = true;
    let error: Model.Link = [];

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
  addLink: (links) => [...links, ''],
  deleteLink: (links) => (links.length <= 1 ? links : [...links.slice(0, -1)]),
};
