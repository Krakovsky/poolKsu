import React, { useEffect, useState } from 'react';
import { Tabs, Modal } from 'antd';
import { connect } from 'react-redux';
import { ReactSVG } from 'react-svg';

import './Booking.scss';
import { getRoads as getRoadsAction } from '../../redux/modules/pool';
import check from '../../media/check.svg';
import SubscribeForm from '../SubscribeForm/SubscribeForm';
import BookingTrack from '../BookingTrack/BookingTrack';
import disallowSvg from '../../media/prohibition.svg';

const { TabPane } = Tabs;

const Booking = ({ getRoads, roads }) => {
  const [track, setTrack] = useState(null);
  const [isBooked, setBooked] = useState(false);

  useEffect(() => {
    // getRoads();
  }, [getRoads])

  const setTrackToState = number => {
    setTrack(number);
  }

  const onCancel = () => {
    setTrack(false);
    setTimeout(() => setBooked(false), 200)
  }

  return (
    <div className="Booking">
      <div className="Booking__roads">
        {roads.map(item => (
          <div
            key={item.id}
            role="button"
            onClick={item.isBusy ? null : () => setTrackToState(item.number)}
            className={`Booking__road ${item.isBusy ? 'Booking__road--busy' : ''}`}
          >
            {item.isBusy ? <ReactSVG className="Booking__road-disallow" src={disallowSvg} /> : item.number}
          </div>
        ))}
      </div>
      <Modal
        maskStyle={{ transition: 'none' }}
        title="Basic Modal"
        visible={track}
        onCancel={onCancel}
        footer={null}
        title={null}
        width={623}
        getContainer=".Booking"
      >
        {isBooked
          ? (
            <div className="Booking__success">
              <img src={check} alt="check" />
              Доріжку було успішно заброньовано
            </div>
          )
          : (
            <Tabs defaultActiveKey="1">
              <TabPane tab="Разове бронювання" key="1">
                <BookingTrack setBooked={setBooked} setTrack={setTrack} track={track} />
              </TabPane>
              <TabPane tab="Абонемент" key="2">
                <SubscribeForm setBooked={setBooked} />
              </TabPane>
            </Tabs>
          )
        }
      </Modal>
    </div>
  )
};

export default connect(
  ({ pool }) => ({ roads: pool.roads }),
  {
    getRoads: getRoadsAction,
  }
)(Booking);
