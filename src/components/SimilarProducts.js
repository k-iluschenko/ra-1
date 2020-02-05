import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class SimilarProducts extends Component {
  // Прокрутка
  goToTop = () => {
    document.documentElement.scrollTop = 200;
  }

  render() {
    if (!this.props.item) return null;
    if (!this.props.item.id) return null;
    return (
      <div
        className="similar-products-slider__item-list__item-card item"
        onClick={this.goToTop}
      >
        <div className="similar-products-slider__item">
          <NavLink to={`/products/${this.props.item.id}`}>
            <img
              src={this.props.item.img}
              className="similar-products-slider__item-pic"
              alt={`${this.props.item.title}`}
            />
          </NavLink>
        </div>
        <div className="similar-products-slider__item-desc">
          <h4 className="similar-products-slider__item-name">
            {this.props.item.title}
          </h4>
          <p className="similar-products-slider__item-producer">
            Производитель:{' '}
            <span className="producer">{this.props.item.brand}</span>
          </p>
          <p className="similar-products-slider__item-price">
            {this.props.item.price}
          </p>
        </div>
      </div>
    );
  }
}

export default SimilarProducts;
