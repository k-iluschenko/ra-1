/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class CatalogSideBarBrand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brandValue: ''
    };
  }

  onChangeSearchValue = event => {
    this.setState({ brandValue: event.target.value });
  }

  onSubmit = event => {
    event.preventDefault();
    this.setState({ brandValue: event.target.elements[0].value });
    this.props.updateFilter('brand', this.state.brandValue);
  }

  render() {
    return (
      <section className="sidebar__division">
        <div className="sidebar__brand">
          <h3>Бренд</h3>
          <form className="brand-search" action="#" onSubmit={this.onSubmit}>
            <input type="search" className="brand-search" id="brand-search" placeholder="Бренд" onChange={this.onChangeSearchValue} value={this.state.brandValue} />
            <i className="submit" aria-hidden="true" onClick={() => this.props.updateFilter('brand', this.state.brandValue)}></i>
          </form>
        </div>
        <label>
          <input type="checkbox" className="checkbox" name="checkbox-disc" onChange={event => this.props.updateFilter('discounted', event.target.checked)} />
          <span className="checkbox-discount" />
          <span className="text-discount">Со скидкой</span>
        </label>
        <div className="separator-240" />
      </section>
    );
  }
}

export default CatalogSideBarBrand;
