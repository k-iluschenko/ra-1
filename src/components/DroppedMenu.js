import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class DroppedMenu extends Component {
  setFilters(title, filter) {
    this.getCategoryId();
    const filterState = this.props.setFilters;
    this.clearFilters(filterState);
    filterState[title] = filter;
    this.props.update('setFilters', filterState);
  }

  getCategoryId() {
    const mainMenuItems = document.querySelectorAll('.main-menu__item');
    for (let item of mainMenuItems) {
      if (item.classList.contains('main-menu__item_active')) {
        this.props.update('categoriesId', item.firstChild.dataset.catalog);
      }
    }
  }

  // очистка фильтра
  clearFilters = filters => {
    for (const key in filters) {
      filters[key] = '';
    }
    filters.minPrice = 0;
    filters.maxPrice = 60000;
  }

  listFilter(title, listFilter) {
    if (!listFilter) return null;
    return listFilter.map((filter, i) =>
      //  if (i >= 12) { return null; }
      <li key={i} className="dropped-menu__item" onClick={() => this.setFilters(title, filter)}><NavLink to="/catalog">{filter}</NavLink></li>);
  }

  render() {
    return (
      <div className="dropped-menu">
        <div className="wrapper">
          <div className="dropped-menu__lists">
            <h3 className="dropped-menu__list-title">Повод:</h3>
            <ul className="dropped-menu__list">
              {this.listFilter('reason', this.props.filters.reason)}
            </ul>
          </div>
          <div className="dropped-menu__lists">
            <h3 className="dropped-menu__list-title">Категории:</h3>
            <ul className="dropped-menu__list">
              {this.listFilter('type', this.props.filters.type)}
            </ul>
          </div>
          <div className="dropped-menu__lists">
            <h3 className="dropped-menu__list-title">Сезон:</h3>
            <ul className="dropped-menu__list">
              {this.listFilter('season', this.props.filters.season)}
            </ul>
          </div>
          <div className="dropped-menu__lists dropped-menu__lists_three-coloumns">
            <h3 className="dropped-menu__list-title">Бренды:</h3>
            <ul className="dropped-menu__list">
              {this.listFilter('brand', this.props.filters.brand)}
              {/*  <li className="dropped-menu__item">
                <NavLink to="/catalog">Все</NavLink>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default DroppedMenu;
