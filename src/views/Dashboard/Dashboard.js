import React from "react";
// import PropTypes from "prop-types";
import FancyButton from "../../Components/FancyButton/FancyButton";
import { useAuth } from "../../hooks/useAuth";
import "./Dashboard.scss";

function Dashboard(props) {
  const { logout, userState } = useAuth();
  return (
    <div className="DashboardWrapper">
      <FancyButton text="Sign out" onClick={logout} />
      <pre>{JSON.stringify(userState, null, 2)}</pre>
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
