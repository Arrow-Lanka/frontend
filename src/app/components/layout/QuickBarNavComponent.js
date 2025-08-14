import React, { Component } from "react";

class QuickBarNavComponent extends Component {
  constructor(props) {
    super(props);

    this.openQuickMenu = this.openQuickMenu.bind(this);
    this.closeQuickMenu = this.closeQuickMenu.bind(this);
  }
  render() {
    return (
      <div>
        <aside
          id="quickActionBar"
          onMouseLeave={this.closeQuickMenu}
          onMouseOver={this.openQuickMenu}
          className="quickAction1"
        >
          <a href="#">
            <img
              src={require("../../assets/images/icons/Group 290.png")}
              className="quickIcon"
            />
          </a>
          <a href="#">
            <img
              src={require("../../assets/images/icons/Group 291.png")}
              className="quickIcon"
            />
          </a>
          <a href="#">
            <img
              src={require("../../assets/images/icons/Group 292.png")}
              className="quickIcon"
            />
          </a>
          <a href="#">
            <img
              // src={require("../../../assets/icons/Group 293.png")}
              className="quickIcon"
            />
          </a>
          <a href="#">
            <img
              src={require("../../assets/images/icons/Group 294.png")}
              className="quickIcon"
            />
          </a>
          <a href="#">
            <img
              src={require("../../assets/images/icons/Group 295.png")}
              className="quickIcon"
            />
          </a>
          <a href="#">
            <img
              src={require("../../assets/images/icons/Group 296.png")}
              className="quickIcon"
            />
          </a>
        </aside>

        <div
          id="QuickActionButton"
          onMouseOver={this.openQuickMenu}
          onMouseLeave={this.closeQuickMenu}
          className="quickActionButton"
        >
          {/* <div img src="icons/Group 290.png" className="quickAction">  */}
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-sliders icon-position"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"
            />
          </svg>
        </div>
      </div>
    );
  }
  openQuickMenu() {
    document.getElementById("QuickActionButton").style.right = "50px";
    document.getElementById("quickActionBar").style.display = "block";
  }

  closeQuickMenu() {
    document.getElementById("QuickActionButton").style.right = "23px";
    document.getElementById("quickActionBar").style.display = "none";
  }
}

export default QuickBarNavComponent;
