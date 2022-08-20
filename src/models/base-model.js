class BaseModel {
  init = (props) => {
    console.error(
      `Function ${this.init.name} not implemented for ${this.constructor.name}`
    );
  };

  getInitialState = (props) => {
    console.error(
      `Function ${this.getInitialState.name} not implemented for ${this.constructor.name}`
    );
    return {};
  };

  toState = (props) => {
    console.error(
      `Function ${this.toState.name} not implemented for ${this.constructor.name}`
    );
    return {};
  };

  buildState = (props) => {
    // This function intention is to decide which function to call getInitialState / toState
    // Depending on props received after init.
    console.error(
      `Function ${this.buildState.name} not implemented for ${this.constructor.name}`
    );
    return {};
  };

  toModel = (state, props) => {
    console.error(
      `Function ${this.toModel.name} not implemented for ${this.constructor.name}`
    );
    return {};
  };

  validate = (state, props) => {
    const model = this.toModel(state, props);
    let error = {};
    let isValid = true;

    console.error(
      `Function ${this.validate.name} not implemented for ${this.constructor.name}`
    );

    return [model, isValid, error];
  };

  equals = (state, props) => {
    console.error(
      `Function ${this.equals.name} not implemented for ${this.constructor.name}`
    );
    return undefined;
  };
}

export default BaseModel;
