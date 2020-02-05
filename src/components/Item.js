// Компонент отрисовки товара в каталоге и избранном

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import HeartIcon from './HeartIcon.js';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ items: newProps.products });
  }

  render() {
    if (!this.state.items) return null;
    return this.state.items.map(item => (
      <div key={item.id} className="product-item">
        <NavLink
          className="item-list__item-card item"
          to={`/products/${item.id}`}
          onClick={() => this.props.update('id', `${item.id}`)}
        >
          <div className="item-pic">
            <img className="item-pic" src={item.images[0]} alt={item.title} />
            <div className="arrow arrow_left" />
            <div className="arrow arrow_right" />
          </div>
          <div className="item-desc">
            <h4 className="item-name">{item.title}</h4>
            <p className="item-producer">
              Производитель:
              <span className="producer">{item.brand}</span>
            </p>
            <p className="item-price">{item.price}</p>
            <div className="sizes">
              {/* <p className="sizes__title">Размеры в наличии:</p>
      <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p> */}
            </div>
          </div>
        </NavLink>
        <HeartIcon id={item.id} item={item} {...this.props} />
      </div>
    ));
  }
}

export default Item;
