import React from "react";
import BaseModel from "../../models/base-model";

export const withForm = (WrappedComponent, modelObj = new BaseModel()) => {
  return class extends React.Component {
    model = modelObj;

    state = this.model.getInitialState(this.props);
    resetState = () => this.setState(this.model.getInitialState(this.props));
    loadState = () => this.setState(this.model.toState(this.props));
    updateState = (updatedState, cb) => this.setState(updatedState, cb);
    onFieldChange = (e, field, cb) =>
      this.setState({ [field.name]: field.value }, cb);

    setErrors = (formErrors) => this.setState({ formErrors });

    validate = () => {
      const [obj, isValid, error] = this.model.validate(this.state, this.props);
      this.setErrors(error);

      let equals = undefined;
      if (isValid) {
        equals = !this.hasFormChanged();
      }

      return [obj, isValid, equals];
    };

    hasFormChanged = () => !this.model.equals(this.state, this.props);

    componentDidMount = () => {
      this.model.init(this.props);
      this.updateState(this.model.buildState(this.props));
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          resetFormState={this.resetState}
          loadFormState={this.loadState}
          updateFormState={this.updateState}
          onFieldChange={this.onFieldChange}
          validateForm={this.validate}
          hasFormChanged={this.hasFormChanged}
          formState={this.state}
          model={this.model}
        />
      );
    }
  };
};
