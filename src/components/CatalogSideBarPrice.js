
import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const Range = Slider.Range;

class CatalogSideBarPrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxPrice: 60000,
      minPrice: 0,
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ minPrice: newProps.minPrice })
    this.setState({ maxPrice: newProps.maxPrice })
  }

  getRef = node => { this.elem = node; }

  onChange = event => {
    this.setState({ minPrice: +event[0] });
    this.setState({ maxPrice: +event[1] });
    this.props.updateFilter('minPrice', +event[0]);
    this.props.updateFilter('maxPrice', +event[1]);
  }

  minPrice = event => {
    this.setState({ minPrice: +event.target.value });
    this.props.updateFilter('minPrice', +event.target.value);
  }

  maxPrice = event => {
    this.setState({ maxPrice: +event.target.value });
    this.props.updateFilter('maxPrice', +event.target.value);
  }

  render() {
    return (
      <section className="sidebar__division">
        <div className="sidebar__price sidebar__filter ">
          <div className="sidebar__division-title">
            <h3>Цена</h3>
            <div className="opener-down" onClick={(event) => { this.props.opener(event, this.elem) }} />
          </div>
          <div className="price-slider" ref={this.getRef}>
            <Range allowCross={false} min={0} max={60000} step={100} defaultValue={[this.state.minPrice, this.state.maxPrice]} value={[this.state.minPrice, this.state.maxPrice]} onChange={event => this.onChange(event)} />
            <div className="counter">
              <input type="text" className="input-1" value={this.state.minPrice} onChange={this.minPrice} />
              <div className="input-separator" />
              <input type="text" className="input-2" value={this.state.maxPrice} onChange={this.maxPrice} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default CatalogSideBarPrice;
