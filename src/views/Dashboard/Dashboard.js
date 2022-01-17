import React from "react";
// import PropTypes from "prop-types";
import FancyButton from "../../Components/FancyButton/FancyButton";
import { useAuth } from "../../hooks/useAuth";
import "./Dashboard.scss";

function Dashboard(props) {
  const { logout, userState } = useAuth();
  // console.log(userState.GithubUserData.name);
  return (
    <div className="DashboardWrapper">
      <header className="DashboardWrapper__header">
        <FancyButton text="Sign out" onClick={logout} />
        <p>
          Hello,{" "}
          {userState.GoogleUserData.name || userState.GithubUserData.name}
        </p>
      </header>
    </div>
  );
}

Dashboard.propTypes = {
  // bla: PropTypes.string,
};

Dashboard.defaultProps = {
  // bla: 'test',
};

export default Dashboard;
