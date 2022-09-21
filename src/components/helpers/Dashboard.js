import React, { Component } from "react";
import TransExcelToTxt from "./TransExcelToTxt";

class Dashboard extends Component {
  state = {
    helper: <TransExcelToTxt />,
  };

  setHelper = (helper) => {
    this.setState({ helper });
  };

  render() {
    const { helper } = this.state;
    return (
      <div className="flex grow">
        <div className="side-panel">
          <div
            className="side-panel-el side-panel-el-active"
            onClick={() => this.setHelper(<TransExcelToTxt />)}
          >
            Transform Excel song list to txt
          </div>
        </div>
        <div className="py-5 px-10 bg-theme-2 w-full">{helper}</div>
      </div>
    );
  }
}

export default Dashboard;
