import React from "react";
// import PropTypes from "prop-types";
import FancyButton from "../../Components/FancyButton/FancyButton";
import { useAuth } from "../../hooks/useAuth";
import "./Dashboard.scss";
import { useStoreActions, useStoreState } from "easy-peasy";

function Dashboard() {
  const { logout, userState } = useAuth();
  const decks = useStoreState((state) => state.decks);
  const setCurrentDeck = useStoreActions((action) => action.setCurrentDeck);
  const currentDeck = useStoreState((state) => state.currentDeck);
  console.log(userState);
  return (
    <div className="DashboardWrapper">
      <header className="DashboardWrapper__header">
        <FancyButton text="Sign out" onClick={logout} />
        <p>
          Hello,{" "}
          {userState.GoogleUserData.name || userState.GithubUserData.name}
        </p>
      </header>
      <div className="DashboardWrapper__body">
        {/* {JSON.stringify(currentDeck)} */}
        <div className="DashboardWrapper__deckContainer">
          {decks.map((item, key) => {
            return (
              <a
                href={`/app/flashcard/view/${item.deckId}`}
                className="DashboardWrapper__deckItem"
                key={key}
                onClick={() => {
                  setCurrentDeck(item.deckId);
                }}
              >
                <div className="DashboardWrapper__deckItem--top">
                  <div className="DashboardWrapper__deckItem--item">
                    {item.cards.length} Entries
                  </div>
                  |
                  <div className="DashboardWrapper__deckItem--item">
                    {item.author}
                  </div>
                </div>
                <div className="DashboardWrapper__deckItem--bottom">
                  {item.title}
                </div>
              </a>
            );
          })}
        </div>
      </div>
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
