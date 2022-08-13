import React from "react";

export const withForm = (WrappedComponent, ModelClass) => {
  return class extends React.Component {
    model = new ModelClass();
    updateModel = (data) => this.model.updateModel(data);

    state = this.model.getInitialState(this.props);
    resetState = () => this.setState(this.model.getInitialState(this.props));
    loadState = () => this.setState(this.model.toState(this.props));
    updateState = (updatedState) => this.setState(updatedState);
    onFieldChange = (e, field) => this.setState({ [field.name]: field.value });

    setErrors = (formErrors) => this.setState({ formErrors });

    validate = () => {
      const obj = this.model.toModel(this.state, this.props);
      const [isValid, error] = this.model.validate(this.state, this.props);
      this.setErrors(error);

      let equals = undefined;
      if (isValid) {
        equals = !this.hasFormChanged();
      }

      return [obj, isValid, equals];
    };

    hasFormChanged = () => !this.model.equals(this.state, this.props);

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
          updateModel={this.updateModel}
        />
      );
    }
  };
};
