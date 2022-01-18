import { useStoreActions } from "easy-peasy";
import React, { useState } from "react";
import ContentEditable from "react-contenteditable";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import FancyButton from "../../Components/FancyButton/FancyButton";
import { useAuth } from "../../hooks/useAuth";
import { addNewCard, deleteCard, editCardData } from "../../Utils/CardActions";
// import PropTypes from 'prop-types';
import "./AddDeck.scss";

function AddDeck(props) {
  const { userState } = useAuth();
  const { id } = useParams();

  function newDeckInit() {
    const newDeck = {
      id: "",
      title: "",
      author: userState.GoogleUserData.name || userState.GithubUserData.name,
      description: "",
      cards: [
        {
          id: 1,
          front: "",
          back: "",
        },
        {
          id: 2,
          front: "",
          back: "",
        },
      ],
    };
    return newDeck;
  }

  const [editData, setEditData] = useState(newDeckInit());
  // const updateDeck = useStoreActions((action) => action.updateDeck);
  const addNewDeck = useStoreActions((action) => action.addNewDeck);

  function editCardMetaData(field, value) {
    const currentOldData = editData;
    // if (currentOldData[field]) {
    currentOldData[field] = value;
    console.log(currentOldData, field, value);
    // }
    setEditData(currentOldData);
  }

  let history = useHistory();

  return (
    <div className="AddDeckWrapper">
      <header className="CardEditorWrapper__header">
        <p>
          Add {">"} {id}
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
                addNewDeck(editData);
                history.push("/app/dashboard");
              }}
            >
              Add deck
            </button>
          </div>
        </div>

        <div className="CardEditorWrapper__subContainer">
          {editData.cards.map((item, index) => (
            <div key={index} className="CardEditorWrapper__editableItem">
              <div className="CardEditorWrapper__editableItem--top">
                {index + 1}
                <FancyButton
                  text={"Delete"}
                  onClick={() => deleteCard(item.id, editData, setEditData)}
                />
              </div>
              <div className="CardEditorWrapper__editableItem--bottom">
                <div className="CardEditorWrapper__editableItem--termBox">
                  <ContentEditable
                    className="CardEditorWrapper__editableItem--termInput"
                    html={item.front}
                    onChange={(e) => {
                      editCardData(
                        item.id,
                        "front",
                        e.target.value,
                        editData,
                        setEditData
                      );
                    }}
                  />
                  TERM
                </div>
                <div className="CardEditorWrapper__editableItem--definitionBox">
                  <ContentEditable
                    className="CardEditorWrapper__editableItem--definitionInput"
                    html={item.back}
                    onChange={(e) => {
                      editCardData(
                        item.id,
                        "back",
                        e.target.value,
                        editData,
                        setEditData
                      );
                    }}
                  />
                  DEFINITION
                </div>
              </div>
            </div>
          ))}

          <FancyButton
            text={"Add Card"}
            onClick={() => {
              addNewCard(editData, setEditData);
            }}
          />
        </div>
      </div>
    </div>
  );
}

AddDeck.propTypes = {
  // bla: PropTypes.string,
};

AddDeck.defaultProps = {
  // bla: 'test',
};

export default AddDeck;
