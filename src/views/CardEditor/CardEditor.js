import { useStoreActions, useStoreRehydrated, useStoreState } from "easy-peasy";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
// import PropTypes from 'prop-types';
import "./CardEditor.scss";

function CardEditor() {
  const { action, deckId } = useParams();
  const isRehydrated = useStoreRehydrated();

  const currentDeck = useStoreState((state) => state.currentDeck);
  const setCurrentDeck = useStoreActions((action) => action.setCurrentDeck);
  console.log(currentDeck);
  useEffect(() => {
    if (currentDeck === null) {
      setCurrentDeck(deckId);
    }
  }, [currentDeck, deckId, setCurrentDeck]);

  return (
    <>
      {isRehydrated ? (
        <div className="CardEditorWrapper">
          <header className="FlashcardViewerWrapper__header">
            <p>
              {action} {">"} {deckId}
            </p>
          </header>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

CardEditor.propTypes = {
  // bla: PropTypes.string,
};

CardEditor.defaultProps = {
  // bla: 'test',
};

export default CardEditor;
