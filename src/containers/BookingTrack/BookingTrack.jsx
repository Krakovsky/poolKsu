import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';

import { bookTrack as bookTrackAction } from '../../redux/modules/calendar';

let BookingTrack = ({ track, setTrack, time, bookTrack, trackId, date, roadId, me }) => {
  const onSubmit = (event) => {
    event.preventDefault();

    bookTrack(trackId, roadId);
    setTrack(null);
  };

  return (
    <form onSubmit={onSubmit} className="Booking__form">
      <div className="Booking__form-container">
        <div className="Booking__form-wrap">
          <div className="Booking__form-label">IМ'Я ТА ПРIЗВИЩЕ</div>
          <div className="Booking__form-value">{`${me?.firstName} ${me?.lastName}`}</div>
        </div>
        <div className="Booking__form-wrap">
          <div className="Booking__form-label">ТЕЛЕФОН</div>
          <div className="Booking__form-value">{me?.phoneNumber}</div>
        </div>
        <div className="Booking__form-wrap">
          <div className="Booking__form-label">ДАТА</div>
          <div className="Booking__form-value">{date}</div>
        </div>
        <div className="Booking__form-wrap Booking__form-wrap--flex">
          <div>
            <div className="Booking__form-label">ДОРІЖКА</div>
            <div className="Booking__form-value">{track}</div>
          </div>
          <div>
            <div className="Booking__form-label">ЧАС</div>
            <div className="Booking__form-value">{time}</div>
          </div>
        </div>
      </div>
      <Button className="btn" htmlType="submit">ЗАБРОНЮВАТИ</Button>
    </form>
  );
};

export default connect(null, { bookTrack: bookTrackAction })(BookingTrack);
