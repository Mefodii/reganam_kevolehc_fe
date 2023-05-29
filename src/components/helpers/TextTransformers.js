import React, { Component } from "react";
import Button from "../generic/buttons/Button";
import TextArea from "../generic/form/TextArea";
import playlistSquareToCurly from "./transformers/playlistSquareToCurly";
import playlistItemNumbering from "./transformers/playlistItemNumbering";
import playlistAddCarret from "./transformers/playlistAddCarret";
import { joinByNewline, splitByNewline } from "../../util/functions";

export class TextTransformers extends Component {
  state = {
    transformer: playlistSquareToCurly,
    inputValue: "",
    outputValue: "",
    isError: false,
  };

  onChange = (e, field) => this.setState({ [field.name]: field.value });
  onKeyDown = (e) => {
    if (e.ctrlKey && e.key === "Enter") {
      this.transform();
    }
  };

  onTransformerClick = (transformer) => this.setState({ transformer });

  transform = () => {
    const { transformer, inputValue } = this.state;
    const result = transformer.run(splitByNewline(inputValue));
    this.setState({ outputValue: joinByNewline(result) });
  };

  render() {
    const { inputValue, outputValue, isError, transformer } = this.state;
    return (
      <div onKeyDown={this.onKeyDown}>
        <div className="border-b-2 border-theme-4 mb-4">
          <div className="mb-4">
            <div className="text-2xl mb-2">
              Txt playlist transformation scripts:
            </div>
            <div className="flex flex-wrap justify-start mb-1">
              <Button
                onClick={() => this.onTransformerClick(playlistSquareToCurly)}
                className={
                  transformer.name === playlistSquareToCurly.name
                    ? "btn-selected"
                    : ""
                }
                tooltip="Transform Square brackets to Curly"
              >
                {"[] -> {}"}
              </Button>
              <Button
                onClick={() => this.onTransformerClick(playlistItemNumbering)}
                className={
                  transformer.name === playlistItemNumbering.name
                    ? "btn-selected"
                    : ""
                }
              >
                Add playlist numbering
              </Button>
              <Button
                onClick={() => this.onTransformerClick(playlistAddCarret)}
                className={
                  transformer.name === playlistAddCarret.name
                    ? "btn-selected"
                    : ""
                }
              >
                {`Add Carret "^"`}
              </Button>
            </div>
          </div>
          <div className="mb-4">
            <div className="text-2xl mb-2">Other scripts:</div>
            <div className="flex flex-wrap justify-start mb-1">
              <Button>{`Nothing yet`}</Button>
            </div>
          </div>
        </div>
        <div className="form-row">
          <TextArea
            containerClassName={isError ? "border border-error-1" : ""}
            label="Input"
            rows={40}
            autoSize={false}
            name="inputValue"
            value={inputValue}
            onChange={this.onChange}
            copy
            paste
          />
          <TextArea
            label="Output"
            name="outputValue"
            rows={40}
            autoSize={false}
            value={outputValue}
            onChange={this.onChange}
            copy
            paste
          />
        </div>
        <div className="form-row">
          <Button onClick={this.transform}>Run</Button>
        </div>
      </div>
    );
  }
}

export default TextTransformers;
