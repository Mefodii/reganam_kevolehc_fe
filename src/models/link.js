import BaseModel from "./base-model";

class LinkModel extends BaseModel {
  static GROUP = "GROUP";
  static VIDEO = "VIDEO";

  constructor(type) {
    super(type);
    if (!type) console.error(`Type is required for ${this.constructor.name}`);
  }

  init = (props) => {};

  getInitialState = () => [""];

  getLinks = (props) => {
    if (this.isGroup()) return props.group.links;
    if (this.isVideo()) return props.video.links;
  };

  toState = (props) => {
    const links = this.getLinks(props);
    var result = [...links];
    while (result.length < 1) {
      result.push("");
    }

    return result;
  };

  buildState = (props) => {
    return this.getInitialState();
  };

  toModel = (state, props) => {
    return state.links
      .map((link) => link.trim())
      .filter((link) => link.length > 0);
  };

  validate = (state, props) => {
    const model = this.toModel(state, props);
    const isValid = true;
    const error = {};

    // TODO

    return [model, isValid, error];
  };

  equals = (state, props) => {
    const o1 = this.toModel(state, props);
    const o2 = this.getLinks(props);

    if (o1.length !== o2.length) return false;

    for (let i = 0; i < o1.length; i++) {
      if (o1[i] !== o2[i]) return false;
    }

    return true;
  };

  addLink = (links) => [...links, ""];

  deleteLink = (links) => [...links.slice(0, -1)];

  isGroup = () => this.mode === LinkModel.GROUP;
  isVideo = () => this.mode === LinkModel.VIDEO;
}

export default LinkModel;
