import React, { Component } from "react";
import Button from "../generic/buttons/Button";
import TextArea from "../generic/form/TextArea";

const SEPARATOR = "<SEPARATOR>";
const UNDERLINE =
  "________________________________________________________________________________________________________________________________________________________________";
const WITH_COMMENT = false;

export class TransExcelToTxt extends Component {
  state = {
    artist: "",
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
    const [name, date, ...tracks] = excelLines;

    this.setState({ artist: name }, () => {
      const year = date.slice(-4);
      const month = date.slice(3, 5);
      const day = date.slice(0, 2);

      const txtName = `-> Name: ${name}`;
      const txtDate = `-> Date: ${year}.${month}.${day}`;
      const trackList = this.transformExcelLines(tracks);

      const txtArray = [txtName, txtDate, UNDERLINE, ...trackList];
      const txtValue = txtArray.reduce((val, line) => `${val}${line}\n`, "");
      this.setState({ txtValue });
    });
  };

  transformExcelLines = (tracks) => {
    let trackList = [];

    let checked = true;
    tracks.forEach((line) => {
      if (line === SEPARATOR) {
        checked = false;
      }

      if (line !== SEPARATOR && line.length > 0) {
        trackList.push(this.parseTrack(line, checked));
      }
    });

    trackList.sort((a, b) => a.slice(6).localeCompare(b.slice(6)));
    return trackList;
  };

  parseTrack = (line, checked) => {
    const head = `  [${checked ? "X" : "-"}] ${this.state.artist} - ${line}`;
    if (!WITH_COMMENT) return head;

    let tail;
    if (head.length < 119) tail = " ".repeat(119 - head.length) + "# -";
    else tail = " # -";

    return `${head}${tail}`;
  };

  render() {
    const { excelValue, txtValue } = this.state;
    return (
      <div onKeyDown={this.onKeyDown}>
        <div className="form-row">
          <TextArea
            containerClassName="w-1/2"
            label="Excel"
            rows={40}
            autoSize={false}
            name="excelValue"
            value={excelValue}
            onChange={this.onChange}
          />
          <TextArea
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
