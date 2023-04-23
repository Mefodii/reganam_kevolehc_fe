import React, { Component } from "react";
import TransExcelToTxt from "./TransExcelToTxt";
import TextTransformers from "./TextTransformers";
import SidepanelElement from "../generic/sidepanel/SidepanelElement";

class Dashboard extends Component {
  state = {
    helper: <TextTransformers />,
  };

  setHelper = (helper) => {
    this.setState({ helper });
  };

  render() {
    const { helper } = this.state;
    return (
      <div className="flex grow">
        <div className="side-panel">
          <SidepanelElement
            isSelected={helper.type.name === "TextTransformers"}
            onClick={() => this.setHelper(<TextTransformers />)}
          >
            Different text Transformers
          </SidepanelElement>

          <SidepanelElement
            isSelected={helper.type.name === "TransExcelToTxt"}
            onClick={() => this.setHelper(<TransExcelToTxt />)}
          >
            Transform Excel song list to txt
          </SidepanelElement>
        </div>
        <div className="py-5 px-10 bg-theme-2 w-full">{helper}</div>
      </div>
    );
  }
}

export default Dashboard;
