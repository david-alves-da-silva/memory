import React from 'react';

const FRONT = 'card_front';
const BACK = 'card_back';
const ICON = 'icon';

const Card = ({ id, icon, flipped, onClick }) => {
  const cardClass = flipped ? 'card flip' : 'card';

  return (
    <div id={id} className={cardClass} data-icon={icon} onClick={onClick}>
      <div className={FRONT}>
        <img
          className={ICON}
          src={`${process.env.PUBLIC_URL}/assets/images/${icon}.png`}
          alt={icon}
        />
      </div>
      <div className={BACK}>{'<  >'}</div>
    </div>
  );
};

export default Card;
