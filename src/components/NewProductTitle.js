import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class NewProductTitle extends Component {
  render() {
    const activeClassName = this.props.categoriesId === this.props.id ? 'new-deals__menu-item_active' : '';
    return (
      <li key={this.props.id} className={`new-deals__menu-item ${activeClassName}`}>
        <NavLink onClick={this.props.onClick} to={`/`}>{this.props.title}</NavLink>
      </li>
    );
  }
}

export default NewProductTitle;