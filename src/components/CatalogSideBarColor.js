/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { activeFilter } from '../js/script.js';

class CatalogSideBarColor extends Component {
  componentWillMount() {
    this.colorClass(this.props.color);
  }

  componentWillReceiveProps(newProps) {
    this.colorClass(newProps.color);
  }

  getRef = node => {
    this.elem = node;
  };

  setFilter(event, filter) {
    activeFilter(event);
    this.props.updateFilter('color', filter);
  }

  colorClass = item => {
    let color = '';
    switch (item) {
      case 'Черный':
        color = 'black';
        break;
      case 'Бежевый':
        color = 'beige';
        break;
      case 'Серый':
        color = 'gray';
        break;
      case 'Бардо':
        color = 'bardo';
        break;
      case 'Белый':
        color = 'white';
        break;
      case 'Прозрачный':
        color = 'transparent';
        break;
      case 'Синий':
        color = 'darkblue';
        break;
      case 'Красный':
        color = 'red';
        break;
      case 'Темно-салатовый':
        color = 'darkgreen';
        break;
      case 'Фиолетовый':
        color = 'purple';
        break;
      case 'Беж':
        color = 'beige2';
        break;
      case 'Оранжевый':
        color = 'orange';
        break;
      case 'Металлик':
        color = 'metalic';
        break;
      case 'Разноцветные':
        color = 'colorful';
        break;
      case 'Коричневый':
        color = 'brown';
        break;
      case 'Серебряный':
        color = 'silver';
        break;
      case 'Черно-белый':
        color = 'blackandwhite';
        break;
      case 'Розовый':
        color = 'pink';
        break;
      default:
        color = '';
    }
    return color;
  };

  listColor(listColor) {
    if (!listColor) return null;
    return listColor.map((color, i) => (
      <li
        key={i}
        onClick={event => {
          this.setFilter(event, color);
        }}
      >
        <NavLink to="#">
          <div className={`color ${this.colorClass(color)}`} />
          <span className="color-name">{color}</span>
        </NavLink>
      </li>
    ));
  }

  render() {
    return (
      <section className="sidebar__division">
        <div className="sidebar__color sidebar__filter">
          <div className="sidebar__division-title">
            <h3>Цвет</h3>
            <div
              className="opener-down"
              onClick={event => {
                this.props.opener(event, this.elem);
              }}
            />
          </div>
          <ul ref={this.getRef}>{this.listColor(this.props.color)}</ul>
        </div>
      </section>
    );
  }
}

export default CatalogSideBarColor;
