import React, { useEffect, useState } from 'react';
import { Tabs, Modal, Button } from 'antd';
import { connect } from 'react-redux';
import { ReactSVG } from 'react-svg';
import moment from 'moment';

import './Booking.scss';
import { getRoadsByObject as getRoadsByObjectAction, getRoads as getRoadsAction } from '../../redux/modules/calendar';
import arrow from '../../media/arrow.svg';
import SubscribeForm from '../SubscribeForm/SubscribeForm';
import BookingTrack from '../BookingTrack/BookingTrack';
import { Loader } from '../../components';

const { TabPane } = Tabs;

const Booking = ({ getRoads, roads, getRoadsByObject, groupedRoads, loading, isAuthenticated, me }) => {
  const [track, setTrack] = useState(null);
  const [trackId, setTrackId] = useState(null);
  const [time, setTime] = useState(null);
  const [date, setDate] = useState(moment());

  useEffect(() => {
    getRoads();
  }, [])

  useEffect(() => {
    const selectedDatePlusOneDay = moment(date).add(1, 'd').format('YYYY-MM-DD');

    getRoadsByObject({
      from: date.format('YYYY-MM-DD'),
      to: selectedDatePlusOneDay
    });
  }, [date])

  const setTrackToState = (number, item, roadId) => {
    setTrack(number + 1);
    setTrackId({ id: item.id, roadId });
    setTime(`${item.dateStartDummyString} - ${item.dateEndDummyString}`);
  }

  const onCancel = () => setTrack(false);

  const onChangeDate = (isPrev) => {
    if (isPrev) {
      const prevDate = moment(date).subtract(1, 'd');

      return setDate(prevDate);
    }

    const nextDate = moment(date).add(1, 'd');

    setDate(nextDate);
  };

  return (
    <Loader loading={loading}>
      <div className="Booking">
        <div className="Booking__date">
          <ReactSVG onClick={() => onChangeDate(true)} className="Booking__arrow Booking__arrow--left" src={arrow} />
          <p>{date.format('DD.MM.YYYY')}</p>
          <ReactSVG onClick={() => onChangeDate(false)} className="Booking__arrow" src={arrow} />
        </div>
        <div className="Booking__roads">
          {roads.length
            ? roads.map((road, index) => (
              <div key={index} className="Booking__road">
                <div className="Booking__number">{index + 1}</div>
                {Object.keys(groupedRoads).length
                  ? groupedRoads[road.id].map(item => (
                    <Button
                      key={item.id}
                      onClick={() => setTrackToState(index, item, road.id)}
                      disabled={item.status === 3 ? true : false}
                      type="primary"
                    >
                      {item.dateStartDummyString} - {item.dateEndDummyString}
                    </Button>
                  ))
                  : null
                }
              </div>
            ))
            : null
          }
        </div>
        <Modal
          maskStyle={{ transition: 'none' }}
          visible={track}
          onCancel={onCancel}
          footer={null}
          title={null}
          width={623}
          getContainer=".Booking"
        >
          {isAuthenticated
            ? (
              <Tabs defaultActiveKey="1">
                <TabPane tab="Разове бронювання" key="1">
                  <BookingTrack
                    date={date.format('DD.MM.YYYY')}
                    time={time}
                    trackId={trackId?.id}
                    roadId={trackId?.roadId}
                    setTrack={setTrack}
                    track={track}
                    me={me}
                  />
                </TabPane>
                <TabPane tab="Абонемент" key="2">
                  <SubscribeForm me={me} trackId={trackId} />
                </TabPane>
              </Tabs>
            )
            : (
              <div className="Booking__auth-text">
                Для бронювання потрiбна авторизацiя
              </div>
            )}
        </Modal>
      </div>
    </Loader>
  )
};

export default connect(
  ({ calendar, auth }) => ({
    roads: calendar.roads,
    groupedRoads: calendar.groupedRoads,
    loading: calendar.loading,
    me: auth.me,
    isAuthenticated: auth.isAuthenticated
  }),
  {
    getRoads: getRoadsAction,
    getRoadsByObject: getRoadsByObjectAction,
  }
)(Booking);
