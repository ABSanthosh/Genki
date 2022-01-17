import React, { useState } from "react";
import PropTypes from "prop-types";
import "./FlipCard.scss";

function FlipCard({ front, back }) {
  const [isFlipped, setFlipped] = useState(false);
  return (
    <div className="FlipCardWrapper">
      <div
        className={`FlipCardWrapper__item ${
          isFlipped ? "FlipCardWrapper__item--flip" : ""
        }`}
        onClick={() => setFlipped(!isFlipped)}
      >
        <div className="FlipCardWrapper__item--front">{front}</div>
        <div className="FlipCardWrapper__item--back">{back}</div>
      </div>
    </div>
  );
}

FlipCard.propTypes = {
  front: PropTypes.string,
  back: PropTypes.string,
};

FlipCard.defaultProps = {
  front: "front",
  back: "back",
};

export default FlipCard;
