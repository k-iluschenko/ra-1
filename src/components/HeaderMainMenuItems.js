import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class HeaderMainMenuItems extends Component {
  // очистка фильтра
  clearFilters = filters => {
    for (const key in filters) {
      filters[key] = '';
    }
    filters.minPrice = 0;
    filters.maxPrice = 60000;
  }

  handleMenuClick(categoriesId) {
    const filterState = this.props.setFilters;
    this.clearFilters(filterState);
    this.props.update('categoriesId', `${categoriesId}`);
    if (this.props.search) {
      this.props.update('search', '');
    }
  }

  render() {
    if (!this.props.categories.length) return null;

    return this.props.categories.map(item => (
      <li key={item.id} className="main-menu__item">
        <NavLink to="/catalog" data-catalog={`${item.id}`} onClick={() => this.handleMenuClick(item.id)}>{item.title}</NavLink>
      </li>
    ));
  }
}

export default HeaderMainMenuItems;
