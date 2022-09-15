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
        <div className="sticky left-0 p-1 w-52 bg-theme-1 shadow-2xl">
          <div
            className="p-3 cursor-pointer nav-link"
            onClick={() => this.setHelper(<TransExcelToTxt />)}
          >
            Transform Excel song list to txt
          </div>
          <div className="p-3 cursor-pointer nav-link">Helper 2</div>
          <div className="p-3 cursor-pointer nav-link">Helper 3</div>
          <div className="p-3 cursor-pointer nav-link">Helper 4</div>
          <div className="p-3 cursor-pointer nav-link">Helper 5</div>
          <div className="p-3 cursor-pointer nav-link">Helper 6</div>
          <div className="p-3 cursor-pointer nav-link">Helper 7</div>
        </div>
        <div className="py-5 px-10 bg-theme-2 w-full">{helper}</div>
      </div>
    );
  }
}

export default Dashboard;
