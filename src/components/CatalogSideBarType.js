import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { activeFilter } from '../js/script.js';

class CatalogSideBarType extends Component {
  static get propTypes() {
    return {
      type: PropTypes.instanceOf(Array).isRequired,
      updateFilter: PropTypes.func.isRequired,
    };
  }

  setFilter(event, filter) {
    activeFilter(event);
    this.props.updateFilter('type', filter);
  }

  // изменения блока через DOM
  opener = event => {
    const elem = event.currentTarget;
    if (elem.classList.contains('opener-down')) {
      elem.classList.remove('opener-down');
      elem.classList.add('opener-up');
      elem.parentNode.nextSibling.classList.add('filter-hidden');
      return null;
    }
    if (elem.classList.contains('opener-up')) {
      elem.classList.remove('opener-up');
      elem.classList.add('opener-down');
      elem.parentNode.nextSibling.classList.remove('filter-hidden');
      return null;
    }
  }

  listType(listType) {
    if (!listType) return null;
    return listType.map((type, i) => (
      type !== this.props.setType
        ? <li key={i} onClick={(event) => { this.setFilter(event, type) }}><NavLink to="#">{type}</NavLink></li>
        : <li key={i} className="filter-active" onClick={(event) => { this.setFilter(event, type) }}><NavLink to="#">{type}</NavLink></li>
    ));
  }

  render() {
    return (
      <section className="sidebar__division">
        <div className="sidebar__catalogue-list sidebar__filter">
          <div className="sidebar__division-title">
            <h3>Каталог</h3>
            <div className="opener-down" onClick={(event) => this.opener(event)} />
          </div>
          <ul>
            {this.listType(this.props.type)}
          </ul>
        </div>
      </section>
    );
  }
}

export default CatalogSideBarType;
