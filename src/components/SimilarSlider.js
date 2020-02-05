import React, { Component } from 'react';
import SimilarProducts from './SimilarProducts.js';

class SimilarSlider extends Component {
  constructor(props) {
    super(props);
    this.slide = []; // массив слайдов
    this.state = {
      items: [], // список товаров
      index: 0, // индекс слайда
    };
  }

  componentWillMount() {
    this.slider(this.state);
  }

  componentDidMount() {
    this.loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.loadData(nextProps);
  }

  componentDidUpdate() {
    this.slider(this.state);

    if (this.state.items.length < 4) {
      // скрываем стрелочки навигации
      const arrow = document.querySelectorAll(
        '.similar-products-slider__arrow',
      );
      Array.from(arrow).forEach(item => item.classList.add('hidden'));
    } else {
      const arrow = document.querySelectorAll(
        '.similar-products-slider__arrow',
      );
      Array.from(arrow).forEach(item => item.classList.remove('hidden'));
    }
  }

  slider = props => {
    // console.log(props)
    this.slide = [
      { id: null, img: null, title: null, brand: null, price: null },
      { id: null, img: null, title: null, brand: null, price: null },
      { id: null, img: null, title: null, brand: null, price: null },
    ];
    // убираем из массива "похожие товары", товар, который показан на странице
    for (let i = 0; i < props.items.length; i++) {
      if (props.items[i].id === this.props.id) {
        props.items.splice(i, 1);
      }
    }
    if (!props.items.length) {
      this.slide = [
        { id: null, img: null, title: null, brand: null, price: null },
        { id: null, img: null, title: null, brand: null, price: null },
        { id: null, img: null, title: null, brand: null, price: null },
      ];
    } else {
      for (let i = 0; i < props.items.length; i++) {
        this.slide[i] = {
          id: props.items[i].id,
          img: props.items[i].images[0],
          title: props.items[i].title,
          brand: props.items[i].brand,
          price: `${props.items[i].price
            .toString()
            .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽`,
        };
      }
    }
  };

  onClickHandlerNextSlider = () => {
    let step = this.state.index + 1;
    if (this.state.index === this.state.items.length - 1) {
      step = 0;
    }
    this.setState({ index: step });
  };

  onClickHandlerPrevSlider = () => {
    let step = this.state.index - 1;
    if (!this.state.index) {
      step = this.state.items.length - 1;
    }
    this.setState({ index: step });
  };

  loadData(props) {
    // получаем данные
    fetch(`${this.props.url}/products?type=${props.type}&color=${props.color}`)
      .then(res => res.json())
      .then(res => (res.status === 'ok' ? res : new Error(res.status)))
      .then(info => {
        this.setState({ items: info.data });
      })
      .then(() => this.slider(this.state))
      .catch(error => {
        console.log('error', error);
      });
  }

  render() {
    this.slider(this.state);
    if (!this.state.items.length) return null; // если похожих товаров нет, блок не показываем.
    return (
      <section className="product-card__similar-products-slider">
        <h3>Похожие товары:</h3>
        <div className="similar-products-slider">
          <div
            className="similar-products-slider__arrow similar-products-slider__arrow_left arrow"
            onClick={this.onClickHandlerPrevSlider}
          />
          <SimilarProducts
            item={this.slide[this.state.index % this.slide.length]}
          />
          <SimilarProducts
            item={this.slide[(this.state.index + 1) % this.slide.length]}
          />
          <SimilarProducts
            item={this.slide[(this.state.index + 2) % this.slide.length]}
          />
          <div
            className="similar-products-slider__arrow similar-products-slider__arrow_right arrow"
            onClick={this.onClickHandlerNextSlider}
          />
        </div>
      </section>
    );
  }
}

export default SimilarSlider;
