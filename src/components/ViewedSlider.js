import React, { Component } from 'react';
import ViewedItem from './ViewedItem.js';

class ViewedSlider extends Component {
  constructor(props) {
    super(props);
    this.slide = [];
    this.arr = [];
    this.state = {
      items: [],
      index: 0
    };
  }

  componentDidMount() {
    this.getViewItems();
  }

  componentDidUpdate(prevProps, prevState) {
    if (localStorage.viewedItems) {
      const viewedGoodsIds = JSON.parse(localStorage.viewedItems).map(item => item.id);
      const isGoodsInState = viewedGoodsIds
        .every(id => prevState.items.some(item => item.id === id));
      if (!isGoodsInState) {
        this.getViewItems();
        this.slider(this.state);
      }
    }

    if (this.state.items.length < 6) {
      const arrow = document.querySelectorAll('.overlooked-slider__arrow');
      Array.from(arrow).forEach(item => item.classList.add('hidden'))
    } else {
      const arrow = document.querySelectorAll('.overlooked-slider__arrow');
      Array.from(arrow).forEach(item => item.classList.remove('hidden'))
    }
  }

  getViewItems() {
    if (localStorage.viewedItems !== undefined) {
      this.setState({ items: JSON.parse(localStorage.viewedItems) });
      this.setState({ index: 0 });
      this.slider(this.state);
    }
  }

  slider(props) {
    if (props.items.length) {
      this.slide = props.items.map(item => ({
        id: item.id,
        img: item.images[0]
      }));
      this.slide.length = this.slide.length < 5 ? 5 : this.slide.length
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
    if (localStorage.viewedItems === undefined) return null;
    return (
      <section className="product-card__overlooked-slider clearfix">
        <h3>Вы смотрели:</h3>
        <div className="overlooked-slider">
          <div className="overlooked-slider__arrow overlooked-slider__arrow_left arrow"
               onClick={ this.onClickHandlerPrevSlider }></div>
          <ViewedItem item={ this.slide[this.state.index % this.slide.length] }/>
          <ViewedItem item={ this.slide[(this.state.index + 1) % this.slide.length] }/>
          <ViewedItem item={ this.slide[(this.state.index + 2) % this.slide.length] }/>
          <ViewedItem item={ this.slide[(this.state.index + 3) % this.slide.length] }/>
          <ViewedItem item={ this.slide[(this.state.index + 4) % this.slide.length] }/>

          <div className="overlooked-slider__arrow overlooked-slider__arrow_right arrow"
               onClick={ this.onClickHandlerNextSlider }></div>
        </div>
      </section>
    );
  }
}

export default ViewedSlider;
