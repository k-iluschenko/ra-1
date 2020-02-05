/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { Component } from 'react';
import ViewedSlider from './ViewedSlider.js';
import CatalogSideBar from './CatalogSideBar.js';
import CatalogList from './CatalogList.js';
import PathCatalog from './PathCatalog.js';

import '../css/style-catalogue.css';

class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {},
      setFilters: {
        type: '',
        color: '',
        season: '',
        reason: '',
        discounted: false,
        categoryId: '',
        size: [],
        heelSize: [],
        minPrice: 0,
        maxPrice: 60000,
        brand: '',
      },
      sortBy: 'price',
      updatePrices: false,
    };
  }

  componentWillMount() {
    this.setState({ setFilters: this.props.setFilters });
    this.setState({ filters: this.props.filters });
  }

  componentWillReceiveProps(newProps) {
    this.setState({ setFilters: newProps.setFilters });
    this.setState({ filters: newProps.filters });
  }

  updateData = value => {
    const filterState = this.state.setFilters;
    if (typeof value === 'object') {
      for (const key in value) {
        filterState[key] = value[key];
      }
      this.setState({ setFilters: filterState });
    } else {
      this.setState({ sortBy: value });
    }
  };

  render() {
    return (
      <main className="product-catalogue clearfix">
        <PathCatalog {...this.props} />
        <CatalogSideBar
          updateData={this.updateData}
          deleteData={this.deleteData}
          type={this.state.filters.type}
          color={this.state.filters.color}
          size={this.state.filters.sizes}
          heelSize={this.state.filters.heelSize}
          reason={this.state.filters.reason}
          season={this.state.filters.season}
          brand={this.state.filters.brand}
          minPrice={this.state.setFilters.minPrice}
          maxPrice={this.state.setFilters.maxPrice}
          setFilters={this.state.setFilters}
        />
        <CatalogList
          {...this.props}
          {...this.state}
          updateSort={this.updateData}
          setFilters={this.props.setFilters}
        />
        <ViewedSlider {...this.props} {...this.state} />
      </main>
    );
  }
}

export default Catalog;
