import React, { PureComponent } from 'react';
//import { Link } from 'react-router-dom';
class CardProductSlider extends PureComponent {
  constructor(props) {
    super(props);
    this.slideImg = []; // массив ссылок на изображенния для слайдера
  }

  componentWillReceiveProps(nextProps) {
    this.slider(nextProps);
  }

  componentDidMount() {
    this.slider(this.props);
  }

  slider(props) {
    this.slideImg = [];
    const img = props.productItemsInfo.images;
    for (let i = 0; i < img.length; i++) {
      this.slideImg[i] = {
        id: i,
        url: img[i],
      };
      this.setState({ slideImg: this.slideImg });
    }
  }

  renderArrowUp() {
    if (this.slideImg.length < 4) return null; //если изображений меньше 3х стрелки прокрутки слайдера не показываем
    return (
      <div className="favourite-product-slider__arrow favourite-product-slider__arrow_up arrow-up" />
    );
  }

  renderSlide(props) {
    const style = props ? { backgroundImage: `url(${props.url})` } : null;
    return (
      <div
        style={style}
        className="favourite-product-slider__item"
        onMouseEnter={this.props.handleClick(props)}
      >
        {
          //   <Link to="#"></Link>
        }
      </div>
    );
  }

  renderArrowDown() {
    if (this.slideImg.length < 4) return null; //если изображений меньше 3х стрелки прокрутки слайдера не показываем
    return (
      <div className="favourite-product-slider__arrow favourite-product-slider__arrow_down arrow-down" />
    );
  }

  render() {
    return (
      <section className="main-screen__favourite-product-slider">
        <div className="favourite-product-slider">
          {this.renderArrowUp()}
          {this.renderSlide(this.slideImg[0])}
          {this.renderSlide(this.slideImg[1])}
          {this.renderSlide(this.slideImg[2])}
          {this.renderArrowDown()}
        </div>
      </section>
    );
  }
}
export default CardProductSlider;