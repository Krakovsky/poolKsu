import React, { useState, useCallback, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Avatar } from 'antd';
import Media from 'react-media';
import { UserOutlined } from '@ant-design/icons';
import { ReactSVG } from 'react-svg';

import './Header.scss';
import logo from '../../media/logo.svg';
import burger from '../../media/menu.svg';
import close from '../../media/close.svg';
import { menu } from '../../constants';
import { LoginModal } from '../../containers';

let Header = ({ isAuthenticated }) => {
  const [visible, setVisible] = useState(false);
  const [isOpen, setMenu] = useState(false);

  const toggleMenu = () => {
    const wasMenuOpen = isOpen ? false : true;

    setMenu(wasMenuOpen);
  };

  const renderLinks = useCallback(() => menu.map((item, key) => (
    <NavLink key={key} exact activeClassName="active" className="Header__link" to={item.path}>{item.title}</NavLink>
  )), []);

  const handleClick = useCallback((event) => (
    event.target.className === 'Header__btn' || event.target.className === 'Header__link' ? toggleMenu() : null
  ), []);

  const renderCabinetLink = () => (
    isAuthenticated
      ? (
        <NavLink activeClassName="active" className="Header__btn" to="/cabinet">
          <Button type="primary">Кабiнет</Button>
        </NavLink>
      )
      : <Button type="primary" onClick={() => setVisible(true)} className="Header__btn">Кабiнет</Button>
  );

  return (
    <>
      <header className="Header">
        <NavLink to="/" className="Header__logo"><img src={logo} alt="logo" /></NavLink>
        <Media queries={{
          tablet: "(max-width: 1024px)",
          large: "(min-width: 1025px)"
        }}>
          {matches => (
            <>
              {matches.tablet && (
                <>
                  <ReactSVG onClick={toggleMenu} className="Header__burger" src={burger} />
                  {isOpen
                    ? (
                      <div onClick={handleClick} className="Header__menu">
                        <ReactSVG onClick={toggleMenu} className="Header__close" src={close} />
                        {renderCabinetLink()}
                        {renderLinks()}
                      </div>
                    )
                    : null
                  }
                </>
              )}
              {matches.large && (
                <>
                  <div style={{ display: 'flex' }}>{renderLinks()}</div>
                  {renderCabinetLink()}
                </>
              )}
            </>
          )}
        </Media>
      </header>
      <LoginModal visible={visible} setVisible={setVisible} />
    </>
  );
};

export default Header;
