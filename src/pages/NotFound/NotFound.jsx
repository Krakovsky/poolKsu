import React from 'react';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import errorSvg from '../../media/404.svg';
import './NotFound.scss';

const NotFound = () => (
  <div className="NotFound">
    <ReactSVG src={errorSvg} />
    <div className="NotFound__title">Сторінка відсутня!</div>
    <Link to='/'><Button type="primary">На головну</Button></Link>
  </div>
);

export default NotFound;