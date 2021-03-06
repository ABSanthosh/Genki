import React, { useState } from "react";
// import PropTypes from "prop-types";
import FlipCard from "../FlipCard/FlipCard";
import "./CardScroller.scss";
import { useStoreState } from "easy-peasy";

function CardScroller() {
  const [cardNumber, setCardNumber] = useState(0);
  const [cardsInDisplay, setCardsInDisplay] = useState([-1, 0, 1]);

  const currentDeck = useStoreState((state) => state.currentDeck);
  const childArray = currentDeck.cards.map((item, index) => (
    <FlipCard
      key={item.id}
      reset={index === cardNumber}
      front={item.front}
      back={item.back}
    />
  ));
  const placeFillerCard = <FlipCard className="CardScrollerWrapper__empty" />;
  const numberOfCards =
    childArray.length !== undefined ? childArray.length - 1 : 0;

  const nextCard = () => {
    const currentCardNumber =
      cardNumber + 1 < numberOfCards ? cardNumber + 1 : numberOfCards;
    setCardNumber(currentCardNumber);
    setCardsInDisplay(
      currentCardNumber < numberOfCards
        ? [currentCardNumber - 1, currentCardNumber, currentCardNumber + 1]
        : [numberOfCards - 1, numberOfCards, -1]
    );
  };

  const prevCard = () => {
    const currentCardNumber = cardNumber - 1 >= 0 ? cardNumber - 1 : 0;
    setCardNumber(currentCardNumber);
    setCardsInDisplay(
      currentCardNumber === 0
        ? [-1, 0, 1]
        : [currentCardNumber - 1, currentCardNumber, currentCardNumber + 1]
    );
  };

  return (
    <div className="CardScrollerWrapper">
      <div className="CardScrollerWrapper__CardHolder">
        {cardsInDisplay[0] !== -1
          ? childArray[cardsInDisplay[0]]
          : placeFillerCard}
        {childArray[cardsInDisplay[1]]}
        {cardsInDisplay[2] !== -1
          ? childArray[cardsInDisplay[2]]
          : placeFillerCard}
      </div>
      <div className="CardScrollerWrapper__controls">
        <span onClick={() => prevCard()}>&lt;</span>
        <span className="CardScrollerWrapper__controls--count">
          {cardNumber + 1}/{childArray.length}
        </span>
        <span onClick={() => nextCard()}>&gt;</span>
      </div>
    </div>
  );
}

CardScroller.propTypes = {};

CardScroller.defaultProps = {};

export default CardScroller;
