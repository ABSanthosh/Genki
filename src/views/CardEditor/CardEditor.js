import { useStoreActions, useStoreRehydrated, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
// import PropTypes from 'prop-types';
import "./CardEditor.scss";

function CardEditor() {
  const { action, id } = useParams();
  const isRehydrated = useStoreRehydrated();

  const currentDeck = useStoreState((state) => state.currentDeck);
  const setCurrentDeck = useStoreActions((action) => action.setCurrentDeck);
  const updateDeck = useStoreActions((action) => action.updateDeck);

  const [editData, setEditData] = useState(currentDeck);

  useEffect(() => {
    if (currentDeck === null) {
      setCurrentDeck(id);
    }
  }, [currentDeck, id, setCurrentDeck]);

  useEffect(() => {
    setEditData(currentDeck);
  }, [currentDeck]);

  function editCard(id, field, value) {
    const editedCard = editData.cards.find((card) => card.id === id);
    if (editedCard) {
      editedCard[field] = value;
    }

    setEditData({
      ...editData,
      cards: editData.cards,
    });
  }

  function editCardMetaData(field, value) {
    const currentOldData = editData;
    if (currentOldData[field]) {
      currentOldData[field] = value;
      console.log(currentOldData, field, value);
    }
    setEditData(currentOldData);
  }

  return (
    <>
      {isRehydrated ? (
        <div className="CardEditorWrapper">
          <header className="CardEditorWrapper__header">
            <p>
              {action} {">"} {id}
            </p>
          </header>
          <div className="CardEditorWrapper__container">
            <div className="CardEditorWrapper__subHeader">
              <div className="CardEditorWrapper__subHeader--left">
                <h2>Card Meta Data</h2>
                <div className="CardEditorWrapper__subHeader--titleBox">
                  <ContentEditable
                    html={editData.title}
                    className="CardEditorWrapper__subHeader--titleInput"
                    onChange={(e) => {
                      editCardMetaData("title", e.target.value);
                    }}
                  />
                  Title
                </div>
                <div className="CardEditorWrapper__subHeader--descBox">
                  <ContentEditable
                    html={editData.description}
                    className="CardEditorWrapper__subHeader--descInput"
                    onChange={(e) => {
                      editCardMetaData("description", e.target.value);
                    }}
                  />
                  Description
                </div>
              </div>
              <div className="CardEditorWrapper__subHeader--right">
                <button
                  className="CardEditorWrapper__subHeader--saveData"
                  onClick={() => {
                    updateDeck(editData);
                  }}
                >
                  Save
                </button>
              </div>
            </div>
            <div className="CardEditorWrapper__subContainer">
              {editData.cards.map((item, index) => (
                <div key={index} className="CardEditorWrapper__editableItem">
                  <div className="CardEditorWrapper__editableItem--top">
                    {index + 1}
                  </div>
                  <div className="CardEditorWrapper__editableItem--bottom">
                    <div className="CardEditorWrapper__editableItem--termBox">
                      <ContentEditable
                        className="CardEditorWrapper__editableItem--termInput"
                        html={item.front}
                        onChange={(e) => {
                          editCard(item.id, "front", e.target.value);
                        }}
                      />
                      TERM
                    </div>
                    <div className="CardEditorWrapper__editableItem--definitionBox">
                      <ContentEditable
                        className="CardEditorWrapper__editableItem--definitionInput"
                        html={item.back}
                        onChange={(e) => {
                          editCard(item.id, "back", e.target.value);
                        }}
                      />
                      DEFINITION
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
