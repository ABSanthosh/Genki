import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import { useStoreActions, useStoreRehydrated, useStoreState } from "easy-peasy";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./FlashcardViewer.scss";
import CardScroller from "../../Components/CardScroller/CardScroller";

function FlashcardViewer(props) {
  const { id } = useParams();
  const currentDeck = useStoreState((state) => state.currentDeck);
  const setCurrentDeck = useStoreActions((action) => action.setCurrentDeck);

  useEffect(() => {
    if (currentDeck === null) {
      setCurrentDeck(id);
    }
  }, [currentDeck, id, setCurrentDeck]);

  const isRehydrated = useStoreRehydrated();
  console.log(isRehydrated, currentDeck);
  return (
    <>
      {isRehydrated ? (
        <div className="FlashcardViewerWrapper">
          <header className="FlashcardViewerWrapper__header">
            <p>{currentDeck.title}</p>
          </header>
          <div className="FlashcardViewerWrapper__container">
            <CardScroller />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

FlashcardViewer.propTypes = {
  // bla: PropTypes.string,
};

FlashcardViewer.defaultProps = {
  // bla: 'test',
};

export default FlashcardViewer;
