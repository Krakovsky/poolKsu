import React, { useState } from 'react';
import { Tabs, Button, Modal } from 'antd';
import { ReactSVG } from 'react-svg';

import './Schedule.scss';
import check from '../../media/check.svg';
import { SubscribeForm } from '../../containers';
import weekend from '../../media/weekend.svg';

const { TabPane } = Tabs;

const Schedule = () => {
  const [isBooked, setBooked] = useState(false);
  const [isBuy, setBuy] = useState(false);

  return (
    <div className="Schedule Page">
      <div className="Title">Розклад</div>
      <div className="Container">
        <h3 className="Schedule__title">Вартість абонементу:</h3>
        <ul>
          <li>за 1 місяць (8 відвідувань) - 600 грн. 00 к.</li>
          <li>за 1 місяць (12 відвідувань) - 900 грн. 00 к.</li>
          <li>за 1 рік (101 відвідування) - 4600 грн. 00 к.</li>
          <li>за 1 рік (152 відвідування) - 6 900 грн. 00 к.</li>
          <li>за 1 рік (354 відвідування) - 15 600 грн. 00 к.</li>
        </ul>
        <Button onClick={() => setBuy(true)} type="primary">Придбати абонемент</Button>
        <Modal
          maskStyle={{ transition: 'none' }}
          title="Basic Modal"
          visible={isBuy}
          onCancel={() => setBuy(false)}
          footer={null}
          title={null}
          width={623}
          getContainer=".Schedule"
        >
          {isBooked
            ? (
              <div className="Booking__success">
                <img src={check} alt="check" />
                Доріжку було успішно заброньовано
              </div>
            )
            : (
              <SubscribeForm setBooked={setBooked} />
            )
          }
        </Modal>
        <Tabs animated={false} defaultActiveKey="1" centered>
          <TabPane tab="понеділок" key="1">
            <div className="Schedule__items">
              <div className="Schedule__item">
                <div className="Schedule__item-title">Абонемент</div>
                <div className="Schedule__item-time">7.00-9.00</div>
              </div>
              <div className="Schedule__item">
                <div className="Schedule__item-title">Факультет фізичного виховання та спорту</div>
                <div className="Schedule__item-time">9.00-10.00</div>
              </div>
              <div className="Schedule__item">
                <div className="Schedule__item-title">Школа плавання</div>
                <div className="Schedule__item-time">16.00-20.00</div>
              </div>
              <div className="Schedule__item">
                <div className="Schedule__item-title">Абонемент</div>
                <div className="Schedule__item-time">20.00-22.00</div>
              </div>
            </div>
          </TabPane>
          <TabPane tab="вівторок" key="2">
            <div className="Schedule__items">
              <div className="Schedule__item">
                <div className="Schedule__item-title">Абонемент</div>
                <div className="Schedule__item-time">8.00-9.00</div>
              </div>
              <div className="Schedule__item">
                <div className="Schedule__item-title">Факультет фізичного виховання та спорту</div>
                <div className="Schedule__item-time">9.00-10.00</div>
              </div>
              <div className="Schedule__item">
                <div className="Schedule__item-title">Абонемент</div>
                <div className="Schedule__item-time">10.00-12.00</div>
              </div>
              <div className="Schedule__item">
                <div className="Schedule__item-title">Факультети</div>
                <div className="Schedule__item-time">12.00-13.00</div>
              </div>
              <div className="Schedule__item">
                <div className="Schedule__item-title">Викладачі та співробітники університету</div>
                <div className="Schedule__item-time">13.00-14.30</div>
              </div>
              <div className="Schedule__item">
                <div className="Schedule__item-title">Школа плавання</div>
                <div className="Schedule__item-time">16.30-20.30</div>
              </div>
              <div className="Schedule__item">
                <div className="Schedule__item-title">Абонемент</div>
                <div className="Schedule__item-time">20.30-22.00</div>
              </div>
            </div>
          </TabPane>
          <TabPane tab="середа" key="3">
            <div className="Schedule__items">
              <div className="Schedule__item">
                <div className="Schedule__item-title">Абонемент</div>
                <div className="Schedule__item-time">7.00-9.00</div>
              </div>
              <div className="Schedule__item">
                <div className="Schedule__item-title">Факультет фізичного виховання та спорту</div>
                <div className="Schedule__item-time">9.00-10.00</div>
              </div>
              <div className="Schedule__item">
                <div className="Schedule__item-title">Факультети</div>
                <div className="Schedule__item-time">10.00-11.00</div>
              </div>
              <div className="Schedule__item">
                <div className="Schedule__item-title">Абонемент</div>
                <div className="Schedule__item-time">11.00-14.00</div>
              </div>
              <div className="Schedule__item">
                <div className="Schedule__item-title">Діти з обмеженими можливостями</div>
                <div className="Schedule__item-time">14.00-15.00</div>
              </div>
              <div className="Schedule__item">
                <div className="Schedule__item-title">Абонемент</div>
                <div className="Schedule__item-time">15.00-16.00</div>
              </div>
              <div className="Schedule__item">
                <div className="Schedule__item-title">Школа плавання</div>
                <div className="Schedule__item-time">16.00-20.00</div>
              </div>
              <div className="Schedule__item">
                <div className="Schedule__item-title">Абонемент</div>
                <div className="Schedule__item-time">20.00-22.00</div>
              </div>
            </div>
          </TabPane>
          <TabPane tab="четвер" key="4">
            <div className="Schedule__items">
              <div className="Schedule__item">
                <div className="Schedule__item-title">Абонемент</div>
                <div className="Schedule__item-time">7.00-9.00</div>
              </div>
              <div className="Schedule__item">
                <div className="Schedule__item-title">Факультет фізичного виховання та спорту</div>
                <div className="Schedule__item-time">9.00-10.00</div>
              </div>
              <div className="Schedule__item">
                <div className="Schedule__item-title">Факультети</div>
                <div className="Schedule__item-time">10.00-11.00</div>
              </div>
              <div className="Schedule__item">
                <div className="Schedule__item-title">Абонемент</div>
                <div className="Schedule__item-time">11.00-15.30</div>
              </div>
              <div className="Schedule__item">
                <div className="Schedule__item-title">Тренер Середенко С.А.</div>
                <div className="Schedule__item-time">15.30-16.30</div>
              </div>
              <div className="Schedule__item">
                <div className="Schedule__item-title">Школа плавання</div>
                <div className="Schedule__item-time">16.30-20.30</div>
              </div>
              <div className="Schedule__item">
                <div className="Schedule__item-title">Абонемент</div>
                <div className="Schedule__item-time">20.30-22.00</div>
              </div>
            </div>
          </TabPane>
          <TabPane tab="п’ятниця" key="5">
            <div className="Schedule__items">
              <div className="Schedule__item">
                <div className="Schedule__item-title">Абонемент</div>
                <div className="Schedule__item-time">8.00-9.00</div>
              </div>
              <div className="Schedule__item">
                <div className="Schedule__item-title">Факультет фізичного виховання та спорту</div>
                <div className="Schedule__item-time">9.00-10.00</div>
              </div>
              <div className="Schedule__item">
                <div className="Schedule__item-title">Абонемент</div>
                <div className="Schedule__item-time">10.00-12.00</div>
              </div>
              <div className="Schedule__item">
                <div className="Schedule__item-title">Факультети</div>
                <div className="Schedule__item-time">12.00-13.00</div>
              </div>
              <div className="Schedule__item">
                <div className="Schedule__item-title">Викладачі та співробітники університету</div>
                <div className="Schedule__item-time">13.00-15.00</div>
              </div>
              <div className="Schedule__item">
                <div className="Schedule__item-title">Абонемент</div>
                <div className="Schedule__item-time">15.00-16.00</div>
              </div>
              <div className="Schedule__item">
                <div className="Schedule__item-title">Школа плавання</div>
                <div className="Schedule__item-time">16.00-20.00</div>
              </div>
              <div className="Schedule__item">
                <div className="Schedule__item-title">Абонемент</div>
                <div className="Schedule__item-time">20.00-22.00</div>
              </div>
            </div>
          </TabPane>
          <TabPane tab="субота" key="6">
            <div className="Schedule__week">
              <ReactSVG src={weekend} />
              Сьогоднi басейн зачинений
            </div>
          </TabPane>
          <TabPane tab="неділя" key="7">
            <div className="Schedule__week">
              <ReactSVG src={weekend} />
              Сьогоднi басейн зачинений
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Schedule;
