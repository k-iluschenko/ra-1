import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class ViewedItem extends Component {
  
  //Прокрутка
  goToTop() {
    document.documentElement.scrollTop = 240;
  }

  render() {
    if (!this.props.item) return null
    if (!this.props.item.id) return null

    return (
      <div className="overlooked-slider__item" style={{ backgroundImage: `url(${this.props.item.img})` }} onClick={this.goToTop.bind(this)} >
        <NavLink to={`/products/${this.props.item.id}`}></NavLink>
      </div>
    );
  }
}

export default ViewedItem;
