import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./FlipCard.scss";

function FlipCard({ front, back, className, reset }) {
  const [isFlipped, setFlipped] = useState(false);

  // To reset flip state
  useEffect(() => {
    setFlipped(false);
  }, [reset]);

  return (
    <div className={`FlipCardWrapper ${className}`}>
      <div
        className={`FlipCardWrapper__item ${
          isFlipped ? "FlipCardWrapper__item--flip" : ""
        }`}
        onClick={() => setFlipped(!isFlipped)}
      >
        <div className="FlipCardWrapper__item--front">
          <div className="FlipCardWrapper__item--content">{front}</div>
        </div>
        <div className="FlipCardWrapper__item--back">
          <div className="FlipCardWrapper__item--content">{back}</div>
        </div>
      </div>
    </div>
  );
}

FlipCard.propTypes = {
  front: PropTypes.string,
  back: PropTypes.string,
  className: PropTypes.string,
};

FlipCard.defaultProps = {
  front: "front",
  back: "back",
  className: "",
};

export default FlipCard;
