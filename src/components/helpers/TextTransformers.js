import React, { Component } from "react";
import Button from "../generic/buttons/Button";
import TextArea from "../generic/form/TextArea";
import playlistSquareToCurly from "./transformers/playlistSquareToCurly";
import playlistItemNumbering from "./transformers/playlistItemNumbering";

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
    this.state.inputValue.split("\n");

    // this.setState({ artist: name }, () => {
    //   const year = date.slice(-4);
    //   const month = date.slice(3, 5);
    //   const day = date.slice(0, 2);

    //   const txtName = `-> Name: ${name}`;
    //   const txtDate = `-> Date: ${year}.${month}.${day}`;

    //   const txtArray = [txtName, txtDate, UNDERLINE, ...trackList];
    //   const txtValue = txtArray.reduce((val, line) => `${val}${line}\n`, "");
    //   this.setState({ txtValue });
    // });
  };

  // transformExcelLines = (tracks) => {
  //   let trackList = [];

  //   let checked = true;
  //   tracks.forEach((line) => {
  //     if (line === SEPARATOR) {
  //       checked = false;
  //     }

  //     if (line !== SEPARATOR && line.length > 0) {
  //       trackList.push(this.parseTrack(line, checked));
  //     }
  //   });

  //   trackList.sort((a, b) => a.slice(6).localeCompare(b.slice(6)));
  //   return trackList;
  // };

  render() {
    const { inputValue, outputValue, isError, transformer } = this.state;
    return (
      <div onKeyDown={this.onKeyDown}>
        <div className="border-b-2 border-theme-4 mb-4">
          <div className="text-2xl mb-2">Transformation scripts:</div>
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
              Transform
            </Button>
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
