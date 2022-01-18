function editCardMetaData(field, value, editData, setEditData) {
  const currentOldData = editData;
  if (currentOldData[field]) {
    currentOldData[field] = value;
    console.log(currentOldData, field, value);
  }
  setEditData(currentOldData);
}

function deleteCard(id, editData, setEditData) {
  const newCards = editData.cards.filter((card) => card.id !== id);
  setEditData({
    ...editData,
    cards: newCards,
  });
}

function editCardData(id, field, value, editData, setEditData) {
  const editedCard = editData.cards.find((card) => card.id === id);
  if (editedCard) {
    editedCard[field] = value;
  }

  setEditData({
    ...editData,
    cards: editData.cards,
  });
}
function addNewCard(editData,setEditData) {
    const newCard = {
      id: editData.cards.length + 1,
      front: "",
      back: "",
    };
    setEditData({
      ...editData,
      cards: [...editData.cards, newCard],
    });
  }

export { editCardMetaData, deleteCard, editCardData, addNewCard };
