class AliasModel {
  updateModel = (data) => {};

  getInitialState = () => [""];

  toState = (aliases) => {
    var result = [...aliases];
    while (result.length < 1) {
      result.push("");
    }

    return result;
  };

  toModel = (aliases) =>
    aliases.map((alias) => alias.trim()).filter((alias) => alias.length > 0);

  validate = (state, props) => {
    const isValid = true;
    const error = {};

    return [isValid, error];
  };

  equals = (o1, o2) => {
    if (o1.length !== o2.length) return false;

    for (let i = 0; i < o1.length; i++) {
      if (o1[i] !== o2[i]) return false;
    }

    return true;
  };

  addAlias = (aliases) => [...aliases, ""];

  deleteAlias = (aliases) => [...aliases.slice(0, -1)];
}

export default AliasModel;
