import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class PathFavorites extends Component {
  render() {
    return (
      <div className="site-path">
        <ul className="site-path__items">
          <li className="site-path__item"><NavLink to="/">Главная</NavLink></li>
          <li className="site-path__item"><NavLink to={`${this.props.location.pathname}`}>Избранное</NavLink></li>
        </ul>
      </div>
    );
  }
}

export default PathFavorites;
