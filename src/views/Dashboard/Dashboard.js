import React from "react";
import FancyButton from "../../Components/FancyButton/FancyButton";
import { useAuth } from "../../hooks/useAuth";
import "./Dashboard.scss";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AppHeader from "../../Components/AppHeader/AppHeader";

function Dashboard() {
  const { logout, userState } = useAuth();
  const decks = useStoreState((state) => state.decks);
  const setCurrentDeck = useStoreActions((action) => action.setCurrentDeck);
  let history = useHistory();

  return (
    <div className="DashboardWrapper">
      <AppHeader isQuartz={false}>
        <p>
          Hello,{" "}
          {userState.GoogleUserData.name || userState.GithubUserData.name}
        </p>
        <FancyButton text="Sign out" onClick={logout} />
      </AppHeader>
      <div className="DashboardWrapper__body">
        <div className="DashboardWrapper__deckContainer">
          {decks.map((item, key) => {
            return (
              <div className="DashboardWrapper__deckItem" key={key}>
                <div className="DashboardWrapper__deckItem--top">
                  <div className="DashboardWrapper__deckItem--item">
                    {item.cards.length} Entries
                  </div>
                  |
                  <div className="DashboardWrapper__deckItem--item">
                    {item.author}
                  </div>
                  <a
                    href={`/app/flashcard/edit/${item.id}`}
                    className="DashboardWrapper__deckItem--rightItem"
                    onClick={() => {
                      setCurrentDeck(item.id);
                    }}
                  >
                    Edit
                  </a>
                  <a
                    href={`/app/flashcard/view/${item.id}`}
                    className="DashboardWrapper__deckItem--rightItem"
                    onClick={() => {
                      setCurrentDeck(item.id);
                    }}
                  >
                    Open Deck
                  </a>
                </div>
                <div className="DashboardWrapper__deckItem--bottom">
                  {item.title}
                </div>
              </div>
            );
          })}

          <FancyButton
            text={`Add new deck`}
            onClick={() => history.push("/app/flashcard/add/newDeck")}
          />
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;
