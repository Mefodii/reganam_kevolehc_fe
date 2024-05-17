class BaseModel {
  static CREATE_MODE = 'CREATE_MODE';
  static UPDATE_MODE = 'UPDATE_MODE';
  static DELETE_MODE = 'DELETE_MODE';

  constructor(mode) {
    this.mode = mode;
  }

  init = (props) => {
    console.error(
      `Function <init> not implemented for ${this.constructor.name}`
    );
  };

  getInitialState = (props) => {
    console.error(
      `Function <getInitialState> not implemented for ${this.constructor.name}`
    );
    return {};
  };

  toState = (props) => {
    console.error(
      `Function <toState> not implemented for ${this.constructor.name}`
    );
    return {};
  };

  buildState = (props) => {
    // This function intention is to decide which function to call getInitialState / toState
    // Depending on props received after init.
    console.error(
      `Function <buildState> not implemented for ${this.constructor.name}`
    );
    return {};
  };

  toModel = (state, props) => {
    console.error(
      `Function <toModel> not implemented for ${this.constructor.name}`
    );
    return {};
  };

  validate = (state, props) => {
    const model = this.toModel(state, props);
    let error = {};
    let isValid = true;

    console.error(
      `Function <validate> not implemented for ${this.constructor.name}`
    );

    return [model, isValid, error];
  };

  equals = (state, props) => {
    console.error(
      `Function <equals> not implemented for ${this.constructor.name}`
    );
    return undefined;
  };

  reset = () => (this.mode = undefined);

  isCreate = () => this.mode === BaseModel.CREATE_MODE;
  setCreate = () => (this.mode = BaseModel.CREATE_MODE);

  isUpdate = () => this.mode === BaseModel.UPDATE_MODE;
  setUpdate = () => (this.mode = BaseModel.UPDATE_MODE);

  isDelete = () => this.mode === BaseModel.DELETE_MODE;
  setDelete = () => (this.mode = BaseModel.DELETE_MODE);
}

export default BaseModel;
