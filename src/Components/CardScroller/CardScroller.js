import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./CardScroller.scss";

function CardScroller({ childArray }) {
  const [cardNumber, setCardNumber] = useState(0);

  const [cardsInDisplay, setCardsInDisplay] = useState([0, 1]);

  useEffect(() => {
    console.log(cardsInDisplay);
  }, [cardsInDisplay]);

  return (
    <div className="CardScrollerWrapper">
      <div className="CardScrollerWrapper__CardHolder">
        {cardsInDisplay.map((itemIndex) => childArray[itemIndex])}
      </div>
      <div className="CardScrollerWrapper__controls">
        <span
          onClick={() => {
            const currentCardNumber = cardNumber - 1 >= 0 ? cardNumber - 1 : 0;
            setCardNumber(currentCardNumber);
            setCardsInDisplay(
              currentCardNumber === 0
                ? [0, 1]
                : [
                    currentCardNumber - 1,
                    currentCardNumber,
                    currentCardNumber + 1,
                  ]
            );
          }}
        >
          &lt;
        </span>
        <span
          onClick={() => {
            const numberOfCards =
              childArray.length !== undefined ? childArray.length - 1 : 0;
            const currentCardNumber =
              cardNumber + 1 < numberOfCards ? cardNumber + 1 : numberOfCards;
            setCardNumber(currentCardNumber);
            setCardsInDisplay(
              currentCardNumber < numberOfCards
                ? [
                    currentCardNumber - 1,
                    currentCardNumber,
                    currentCardNumber + 1,
                  ]
                : [numberOfCards - 1, numberOfCards]
            );
          }}
        >
          &gt;
        </span>
      </div>
    </div>
  );
}

CardScroller.propTypes = {
  childArray: PropTypes.node.isRequired,
};

CardScroller.defaultProps = {};

export default CardScroller;
