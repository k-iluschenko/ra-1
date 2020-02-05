import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class HeaderTopMenu extends Component {
  render() {
    return (
      <div className="top-menu">
        <div className="wrapper">
          <ul className="top-menu__items">
            <li className="top-menu__item">
              <NavLink to="/404">Возврат</NavLink>
            </li>
            <li className="top-menu__item">
              <NavLink to="/404">Доставка и оплата</NavLink>
            </li>
            <li className="top-menu__item">
              <NavLink to="/404">О магазине</NavLink>
            </li>
            <li className="top-menu__item">
              <NavLink to="/404">Контакты</NavLink>
            </li>
            <li className="top-menu__item">
              <NavLink to="/404">Новости</NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default HeaderTopMenu;
