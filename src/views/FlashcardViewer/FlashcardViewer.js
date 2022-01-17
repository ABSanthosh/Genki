import React from "react";
// import PropTypes from "prop-types";
import { useStoreState } from "easy-peasy";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./FlashcardViewer.scss";

function FlashcardViewer(props) {
  const { deckId } = useParams();
  const currentDeck = useStoreState((state) => state.currentDeck);

  return (
    <div className="FlashcardViewerWrapper">
      {/* <p>{deckId}</p> */}
      {/* <pre>{JSON.stringify(currentDeck, null, 2)}</pre> */}
      <header className="FlashcardViewerWrapper__header">
        <p>{currentDeck.title}</p>
      </header>
      <div className="FlashcardViewerWrapper__container">
        <div className="FlashcardViewerWrapper__item">
          
        </div>
      </div>
    </div>
  );
}

FlashcardViewer.propTypes = {
  // bla: PropTypes.string,
};

FlashcardViewer.defaultProps = {
  // bla: 'test',
};

export default FlashcardViewer;
