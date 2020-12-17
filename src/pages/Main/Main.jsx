import React, { useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import moment from 'moment';
import { ConfigProvider } from 'antd';
import ukUA from 'antd/es/locale/uk_UA';
import 'moment/locale/uk';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';

import Admin from '../Admin/Admin';
import history from '../../utils/history.js';
import { Header } from '../../components';
import { Booking } from '../../containers';
import About from '../About/About';
import Contacts from '../Contacts/Contacts';
import Gallery from '../Gallery/Gallery';
import Schedule from '../Schedule/Schedule';
import Cabinet from '../Cabinet/Cabinet';
import NotFound from '../NotFound/NotFound';
import './Main.scss';
import { validateToken as validateTokenAction } from '../../redux/modules/auth';

moment.locale('uk');

const routes = [
  { path: '/', exact: true, name: 'Home', Component: Booking },
  { path: '/admin', exact: true, name: 'Admin', Component: Admin },
  { path: '/about', exact: true, name: 'About', Component: About },
  { path: '/contacts', exact: true, name: 'Contacts', Component: Contacts },
  { path: '/gallery', exact: true, name: 'Gallery', Component: Gallery },
  { path: '/timetable', exact: true, name: 'Schedule', Component: Schedule },
  { path: '/cabinet', exact: true, name: 'Cabinet', Component: Cabinet },
  { path: '*', exact: false, name: 'NotFound', Component: NotFound },
];

const Main = ({ validateToken, isAuthenticated }) => {
  useEffect(() => {
    validateToken();
  }, []);

  return (
    <ConfigProvider locale={ukUA}>
      <Router history={history}>
        <div className="Main">
          <Header isAuthenticated={isAuthenticated} />
          <div className="Main__container">
            <Route
              render={({ location }) => (
                <TransitionGroup>
                  <CSSTransition
                    key={location.key}
                    timeout={450}
                    classNames="fade"
                  >
                    <Switch location={location}>
                      {routes.map(({ path, Component, exact }) => (
                        <Route key={path} exact={exact} path={path}><Component /></Route>
                      ))}
                    </Switch>
                  </CSSTransition>
                </TransitionGroup>
              )}
            />
          </div>
        </div>
      </Router>
    </ConfigProvider>
  );
};

export default connect(
  ({ auth }) => ({ isAuthenticated: auth.isAuthenticated }),
  { validateToken: validateTokenAction }
)(Main);
