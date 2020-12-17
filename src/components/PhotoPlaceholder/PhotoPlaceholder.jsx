import React from 'react';

import './PhotoPlaceholder.scss';

const PhotoPlaceholder = ({ source, name, isBig }) => (
  <div className={`PhotoPlaceholder ${isBig ? 'is-big' : ''}`}>
    {source ? <img src={source} alt="user-avatar" /> : name[0]}
  </div>
);

export default PhotoPlaceholder;
