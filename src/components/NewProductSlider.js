import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import HeartIcon from './HeartIcon.js';

class NewProductSlider extends Component {
  constructor(props) {
    super(props);
    this.slide = {
      prev: '',
      active: '',
      next: ''
    }
    this.state = {
      items: {},
      activeItem: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ items: nextProps.newProductItems });
    this.setState({ activeItem: nextProps.newProductItems[nextProps.activeSlide] });
    this.slider(nextProps);

  }
  componentwillMount() {
    this.slider(this.props);
    this.setState({ activeItem: this.props.newProductItems[this.props.activeSlide] });
  }

  slider(props) {
    const activePhoto = document.querySelector('.new-deals__product_active');
    const prevPhoto = document.querySelector('.new-deals__product_first');
    const nextPhoto = document.querySelector('.new-deals__product_last');

    let prev;
    let active;
    let next;
    let price;

    if (!props.newProductItems.length) {
      prev = null;
      active = null;
      next = null;

      this.slide = {
        prev: {
          id: null
        },
        active: {
          id: null,
          title: null,
          brand: null,
          price: null
        },
        next: {
          id: null
        }
      }
    } else {
      prev = props.newProductItems[(props.activeSlide - 1 + props.newProductItems.length) % props.newProductItems.length].images[0]
      active = props.newProductItems[props.activeSlide].images[0]
      next = props.newProductItems[(props.activeSlide + 1) % props.newProductItems.length].images[0]
      price = `${props.newProductItems[props.activeSlide].price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽`;

      this.slide = {
        prev: {
          id: props.newProductItems[(props.activeSlide - 1 + props.newProductItems.length) % props.newProductItems.length].id
        },
        active: {
          id: props.newProductItems[props.activeSlide].id,
          title: props.newProductItems[props.activeSlide].title,
          brand: props.newProductItems[props.activeSlide].brand,
          price: price
        },
        next: {
          id: props.newProductItems[(props.activeSlide + 1) % props.newProductItems.length].id
        }
      }
    }

    prevPhoto.style.backgroundImage = `url(${prev}) `;
    activePhoto.style.backgroundImage = `url(${active}) `;
    nextPhoto.style.backgroundImage = `url(${next}) `;
  }

  render() {
    console.log(this.state.activeItem)
   // if (!this.state.activeItem) return null
    return (
      <div className="wrapper-new-deals__slider">
        <div className="new-deals__slider">
          <div className="new-deals__arrow new-deals__arrow_left arrow" onClick={this.props.onClickPrev}></div>
          <div className="new-deals__product new-deals__product_first">
            <NavLink to={`/products/${this.slide.prev.id}`}></NavLink>
          </div>
          <div className="new-deals__product new-deals__product_active">
            <NavLink to={`/products/${this.slide.active.id}`}></NavLink>
            <HeartIcon id={this.state.activeItem.id}  item={this.state.activeItem} />
          </div>
          <div className="new-deals__product new-deals__product_last" >
            <NavLink to={`/products/${this.slide.next.id}`}></NavLink>
          </div>
          <div className="new-deals__arrow new-deals__arrow_right arrow" onClick={this.props.onClickNext}></div>
        </div>
        <div className="new-deals__product-info">
          <NavLink to={`/products/${this.slide.active.id}`} className="h3">{this.slide.active.title}</NavLink>
          <p>Производитель: <span>{this.slide.active.brand}</span></p>
          <h3 className="h3">{this.slide.active.price}</h3>
        </div>
      </div>
    );
  }
}

export default NewProductSlider;