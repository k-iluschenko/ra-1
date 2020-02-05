import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { isNumber } from 'util';

class PathCatalog extends Component {
  path() {
    if (!this.props.setFilters) return null;
    const filters = this.props.setFilters;
    for (const key in filters) {
      if (isNumber(filters[key])) continue;
      if (filters[key] !== '') {
        return <li className="site-path__item"><span>{filters[key]}</span></li>;
      }
    }
  }

  render() {
    const { categoriesId } = this.props;
    const category = this.props.categories.find(({ id }) => id === +categoriesId) || {};
    if (!categoriesId) {
      category.title = 'Весь каталог';
    }
    if (categoriesId === -1) {
      category.title = 'Поиск';
    }
    return (

      <div className="site-path">
        <ul className="site-path__items">
          <li className="site-path__item"><NavLink to="/">Главная</NavLink></li>
          <li className="site-path__item"><NavLink to={`${this.props.location.pathname}${this.props.location.search}`}>{category.title}</NavLink></li>
          {this.path()}
        </ul>
      </div>
    );
  }
}

export default PathCatalog;
