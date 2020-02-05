import React, { Component } from 'react';
import ViewedItem from './ViewedItem.js'

class ViewedSlider extends Component {
  constructor(props) {
    super(props);
    this.slide = [];
    this.arr = [];
    this.state = {
      items: [],
      index: 0
    }
  }

  componentWillMount() {
    if (localStorage.viewedItems === undefined) return null
    this.setState({ items: JSON.parse(localStorage.viewedItems) });
    this.slider(this.state);
  }

  componentWillReceiveProps(newProps) {
    if (localStorage.viewedItems === undefined) return null
    this.setState({ items: JSON.parse(localStorage.viewedItems) });
    this.setState({index: 0}) //при добавлении нового товара, слайдер показываем сначала 
    this.slider(this.state);
  }

  componentDidUpdate() {
    this.slider(this.state);

    
    if (this.state.items.length < 6) {
      const arrow = document.querySelectorAll('.overlooked-slider__arrow');
      Array.from(arrow).forEach(item => item.classList.add('hidden'))
    }
    else {
      const arrow = document.querySelectorAll('.overlooked-slider__arrow');
      Array.from(arrow).forEach(item => item.classList.remove('hidden'))
    }
  }

  slider(props) {
    this.slide = [
      { id: null, img: null, title: null, brand: null, price: null },
      { id: null, img: null, title: null, brand: null, price: null },
      { id: null, img: null, title: null, brand: null, price: null },
      { id: null, img: null, title: null, brand: null, price: null },
      { id: null, img: null, title: null, brand: null, price: null }
    ]
    if (!props.items.length) {
      this.slide = [
        { id: null, img: null, title: null, brand: null, price: null },
        { id: null, img: null, title: null, brand: null, price: null },
        { id: null, img: null, title: null, brand: null, price: null },
        { id: null, img: null, title: null, brand: null, price: null },
        { id: null, img: null, title: null, brand: null, price: null }
      ]
    } else {

      for (let i = 0; i < props.items.length; i++) {
          if (!props.items[i]) return null
        this.slide[i] =
          {
            id: props.items[i].id,
            img: props.items[i].images[0]
          }
      }
    }
  }

  onClickHandlerNextSlider = () => {
    let step = this.state.index + 1;
    if (this.state.index === this.state.items.length - 1) {
      step = 0;
    }
    this.setState({ index: step })
  }

  onClickHandlerPrevSlider = () => {
    let step = this.state.index - 1;
    if (!this.state.index) {
      step = this.state.items.length - 1;
    }
    this.setState({ index: step })
  }

  render() {
    if (localStorage.viewedItems === undefined) return null //если просмотренных товаров нет, блок не показываем.


    return (
      <section className="product-card__overlooked-slider clearfix">
        <h3>Вы смотрели:</h3>
        <div className="overlooked-slider">
          <div className="overlooked-slider__arrow overlooked-slider__arrow_left arrow" onClick={this.onClickHandlerPrevSlider}></div>
          <ViewedItem item={this.slide[this.state.index % this.slide.length]} />
          <ViewedItem item={this.slide[(this.state.index + 1) % this.slide.length]} />
          <ViewedItem item={this.slide[(this.state.index + 2) % this.slide.length]} />
          <ViewedItem item={this.slide[(this.state.index + 3) % this.slide.length]} />
          <ViewedItem item={this.slide[(this.state.index + 4) % this.slide.length]} />

          <div className="overlooked-slider__arrow overlooked-slider__arrow_right arrow" onClick={this.onClickHandlerNextSlider}></div>
        </div>
      </section>
    );
  }
}

export default ViewedSlider;
