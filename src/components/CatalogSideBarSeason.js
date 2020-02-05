/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { activeFilter } from '../js/script.js';

class CatalogSideBarSeason extends Component {
  static get propTypes() {
    return {
      season: PropTypes.instanceOf(Array).isRequired,
      updateFilter: PropTypes.func.isRequired,
    };
  }

  getRef = node => { this.elem = node; }

  setFilter(event, filter) {
    activeFilter(event);
    this.props.updateFilter('season', filter);
  }

  listSeason(listSeason) {
    if (!listSeason) return null;
    return listSeason.map((season, i) => (
      <li key={i} onClick={(event) => { this.setFilter(event, season) }}><NavLink to="#">{season}</NavLink></li>));
  }

  render() {
    return (
      <section className="sidebar__division">
        <div className="sidebar__occasion sidebar__filter">
          <div className="sidebar__division-title">
            <h3>Сезон</h3>
            <div className="opener-up" onClick={(event) => { this.props.opener(event, this.elem) }} />
          </div>
          <ul className="filter-hidden" ref={this.getRef}>
            {this.listSeason(this.props.season)}
          </ul>
        </div>
      </section>

    );
  }
}

export default CatalogSideBarSeason;
