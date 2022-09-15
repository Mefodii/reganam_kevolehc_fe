import React, { Component } from "react";
import Button from "../generic/buttons/Button";
import Textarea from "../generic/form/Textarea";

const SEPARATOR = "<SEPARATOR>";

export class TransExcelToTxt extends Component {
  state = {
    excelValue: "",
    txtValue: "",
  };

  onChange = (e, field) => this.setState({ [field.name]: field.value });
  onKeyDown = (e) => {
    if (e.ctrlKey && e.key === "Enter") {
      this.transform();
    }
  };

  transform = () => {
    const excelLines = this.state.excelValue.split("\n");
    let txtLines = [];

    let checked = true;
    excelLines.forEach((line) => {
      if (line === SEPARATOR) {
        checked = false;
      } else {
        txtLines.push(this.parseLine(line, checked));
      }
    });

    const txtValue = txtLines.reduce((val, line) => `${val}${line}\n`, "");
    this.setState({ txtValue });
  };

  parseLine = (line, checked) => {
    // TODO
    return `${checked}-${line}`;
  };

  render() {
    const { excelValue, txtValue } = this.state;
    return (
      <div onKeyDown={this.onKeyDown}>
        <div className="form-row">
          <Textarea
            label="Excel"
            rows={40}
            autoSize={false}
            name="excelValue"
            value={excelValue}
            onChange={this.onChange}
          />
          <Textarea
            label="Text"
            name="txtValue"
            rows={40}
            autoSize={false}
            value={txtValue}
            onChange={this.onChange}
          />
        </div>
        <div className="form-row">
          <Button onClick={this.transform}>Transform</Button>
        </div>
      </div>
    );
  }
}

export default TransExcelToTxt;
