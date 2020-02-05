import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import sliderImg from '../img/slider.jpg';
import slider180Img from '../img/slider180deg.jpeg';


import { slider, sliderStop } from '../js/slider.js';

class Slider extends Component {
  componentDidMount() {
    this.initSlider();
  }

  componentWillUnmount() {
    // остановка анимации слайдера
    sliderStop();
  }

  initSlider = () => {
    const f = document.querySelector('.slider__pictures');
    const a = f.getElementsByClassName('slider__image');
    const button = f.getElementsByClassName('slider__circles')[0].getElementsByClassName('slider__circle');
    const arrows = f.getElementsByClassName('slider__arrow');
    slider(f, a, button, '4000', '1000', arrows);
  }

  render() {
    return (
      <section className="slider">
        <div className="wrapper">
          <div className="slider__pictures">
            <NavLink className="slider__image" to="/">
              <img src={sliderImg} alt="slide" />
            </NavLink>
            <NavLink className="slider__image" to="/">
              <img src={slider180Img} alt="slide" />
            </NavLink>
            <NavLink className="slider__image" to="/">
              <img src={sliderImg} alt="slide" />
            </NavLink>
            <NavLink className="slider__image" to="/">
              <img src={slider180Img} alt="slide" />
            </NavLink>
            <div className="arrow slider__arrow slider__arrow_left" />
            <div className="arrow slider__arrow slider__arrow_right" />
            <div className="slider__circles">
              <button className="slider__circle" value="0"  />
              <button className="slider__circle" value="1"  />
              <button className="slider__circle" value="2"  />
              <button className="slider__circle" value="3"  />
            </div>
            <h2 className="h2">К весне готовы!</h2>
          </div>
        </div>
      </section>
    );
  }
}

export default Slider;
