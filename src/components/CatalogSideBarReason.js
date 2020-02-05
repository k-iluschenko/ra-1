/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { activeFilter } from '../js/script.js';

class CatalogSideBarReason extends Component {
  static get propTypes() {
    return {
      reason: PropTypes.instanceOf(Array).isRequired,
      updateFilter: PropTypes.func.isRequired,
    };
  }

  getRef = node => { this.elem = node; }

  setFilter(event, filter) {
    activeFilter(event);
    this.props.updateFilter('reason', filter);
  }

  listReason(listReason) {
    if (!listReason) return null;
    return listReason.map((reason, i) => (
      <li key={i} onClick={(event) => {this.setFilter(event, reason) }}><NavLink to="#">{reason}</NavLink></li>));
  }

  render() {
    return (
      <section className="sidebar__division">
        <div className="sidebar__occasion sidebar__filter">
          <div className="sidebar__division-title">
            <h3>Повод</h3>
            <div className="opener-down" onClick={(event) => { this.props.opener(event, this.elem) }} />
          </div>
          <ul ref={this.getRef}>
            {this.listReason(this.props.reason)}
          </ul>
        </div>
      </section>
    );
  }
}

export default CatalogSideBarReason;
