import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import { useStoreActions, useStoreRehydrated, useStoreState } from "easy-peasy";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./FlashcardViewer.scss";
import FlipCard from "../../Components/FlipCard/FlipCard";
import CardScroller from "../../Components/CardScroller/CardScroller";

function FlashcardViewer(props) {
  const { deckId } = useParams();
  const currentDeck = useStoreState((state) => state.currentDeck);
  const setCurrentDeck = useStoreActions((action) => action.setCurrentDeck);

  useEffect(() => {
    if (currentDeck === null) {
      setCurrentDeck(deckId);
    }
  }, [currentDeck, deckId, setCurrentDeck]);

  const isRehydrated = useStoreRehydrated();
  const childArray = isRehydrated
    ? currentDeck.cards.map((item, index) => (
        <FlipCard key={item.id} front={item.front} back={item.back} />
      ))
    : [];

  console.log(isRehydrated, currentDeck);
  return (
    <>
      {isRehydrated ? (
        <div className="FlashcardViewerWrapper">
          {/* <p>{deckId}</p> */}
          {/* <pre>{JSON.stringify(currentDeck, null, 2)}</pre> */}
          <header className="FlashcardViewerWrapper__header">
            <p>{currentDeck.title}</p>
          </header>
          <div className="FlashcardViewerWrapper__container">
            <CardScroller childArray={childArray} />
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
