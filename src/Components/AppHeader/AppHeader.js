import React, { useState } from "react";
// import PropTypes from "prop-types";
import "./AppHeader.scss";

function AppHeader({ children }) {
  const [navState, setNavState] = useState(false);
  return (
    <div className="AppHeaderWrapper">
      <div className="AppHeaderWrapper__logo">
        <a
          href="https://smoky-quartz.netlify.app/"
          className="AppHeaderWrapper__logo--quartz"
        >
          Quartz
        </a>
        <span className="AppHeaderWrapper__logo--cross">x</span>
        <span className="AppHeaderWrapper__logo--genki">Genki</span>
      </div>

      <div className="AppHeaderWrapper__Hamburger">
        <input
          type="checkbox"
          id="NavBarInput"
          onChange={() => {
            setNavState(!navState);
          }}
        />
        <div className="hamButton">
          <label className="HamMenu" htmlFor="NavBarInput">
            <span className="span HL1" />
            <span className="span HL2" />
            <span className="span HL3" />
          </label>
        </div>
      </div>
      <div
        className={`AppHeaderWrapper__Menu ${
          navState ? "AppHeaderWrapper__Menu--open" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}

AppHeader.propTypes = {
  // bla: PropTypes.string,
};

AppHeader.defaultProps = {
  // bla: 'test',
};

export default AppHeader;
