import React, { Component } from "react";

class Dashboard extends Component {
  render() {
    return (
      <div className="flex grow">
        <div className="sticky left-0 p-1 w-52 bg-theme-1 shadow-2xl">
          <div className="p-3 cursor-pointer nav-link">
            Transform Excel song list to txt
          </div>
          <div className="p-3 cursor-pointer nav-link">Helper 2</div>
          <div className="p-3 cursor-pointer nav-link">Helper 3</div>
          <div className="p-3 cursor-pointer nav-link">Helper 4</div>
          <div className="p-3 cursor-pointer nav-link">Helper 5</div>
          <div className="p-3 cursor-pointer nav-link">Helper 6</div>
          <div className="p-3 cursor-pointer nav-link">Helper 7</div>
        </div>
        <div className="py-5 px-10 bg-theme-2 w-full">Content</div>
      </div>
    );
  }
}

export default Dashboard;
