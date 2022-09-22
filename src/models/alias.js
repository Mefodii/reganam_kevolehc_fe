import BaseModel from "./base-model";

class AliasModel extends BaseModel {
  static GROUP = "GROUP";
  static VIDEO = "VIDEO";

  constructor(type) {
    super(type);
    if (!type) console.error(`Type is required for ${this.constructor.name}`);
  }

  init = (props) => {};

  getInitialState = () => [""];

  getAliases = (props) => {
    if (this.isGroup()) return props.group.aliases;
    if (this.isVideo()) return props.video.aliases;
  };

  toState = (props) => {
    const aliases = this.getAliases(props);
    var result = [...aliases];
    while (result.length < 1) {
      result.push("");
    }

    return result;
  };

  buildState = (props) => {
    return this.getInitialState();
  };

  toModel = (state, props) => {
    return state.aliases
      .map((alias) => alias.trim())
      .filter((alias) => alias.length > 0);
  };

  validate = (state, props) => {
    const model = this.toModel(state, props);
    const isValid = true;
    const error = {};

    return [model, isValid, error];
  };

  equals = (state, props) => {
    const o1 = this.toModel(state, props);
    const o2 = this.getAliases(props);

    if (o1.length !== o2.length) return false;

    for (let i = 0; i < o1.length; i++) {
      if (o1[i] !== o2[i]) return false;
    }

    return true;
  };

  addAlias = (aliases) => [...aliases, ""];

  deleteAlias = (aliases) => [...aliases.slice(0, -1)];

  isGroup = () => this.mode === AliasModel.GROUP;
  isVideo = () => this.mode === AliasModel.VIDEO;
}

export default AliasModel;
