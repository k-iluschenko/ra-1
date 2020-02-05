// Проверка Eslint//
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import CatalogSideBarBrand from './CatalogSideBarBrand.js';
import CatalogSideBarColor from './CatalogSideBarColor.js';
import CatalogSideBarHeelSize from './CatalogSideBarHeelSize.js';
import CatalogSideBarReason from './CatalogSideBarReason.js';
import CatalogSideBarSeason from './CatalogSideBarSeason.js';
import CatalogSideBarSize from './CatalogSideBarSize.js';
import CatalogSideBarType from './CatalogSideBarType.js';
import CatalogSideBarPrice from './CatalogSideBarPrice.js';

class CatalogSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setFilters: {
        type: '',
        color: '',
        season: '',
        reason: '',
        discounted: false,
        size: [],
        heelSize: [],
        minPrice: 0,
        maxPrice: 60000,
        brand: '',
      },
    };
  }

  static get propTypes() {
    return {
      type: PropTypes.instanceOf(Array),
      color: PropTypes.instanceOf(Array),
      heelSize: PropTypes.instanceOf(Array),
      reason: PropTypes.instanceOf(Array),
      season: PropTypes.instanceOf(Array),
      size: PropTypes.instanceOf(Array),
      brand: PropTypes.instanceOf(Array),
      discounted: PropTypes.bool,
      minPrice: PropTypes.number,
      maxPrice: PropTypes.number,
      updateData: PropTypes.func.isRequired
    };
  }

  static get defaultProps() {
    return {
      type: [],
      color: [],
      season: [],
      reason: [],
      discounted: false,
      size: [],
      heelSize: [],
      minPrice: 0,
      maxPrice: 60000,
      brand: [],
    };
  }


  componentWillMount() {
    // console.log('componentWillReceiveProps', this.state);
    this.setState({ setFilters: this.props.setFilters });
    this.setState({ filters: this.props.filters });
  }

  componentWillReceiveProps(newProps) {
    // console.log('componentWillReceiveProps', this.state);
    this.setState({ setFilters: newProps.setFilters });
    this.setState({ filters: newProps.filters });
  }

  componentWillUnmount(){
    this.clearFilters()
  }

  // обновление стэйта
  updateData = (filter, data) => { // название и значение
    const filterState = this.state.setFilters;
    filterState[filter] = data; // записываем в объект значение.
    this.setState({ setFilters: filterState });
    this.props.updateData(this.state.setFilters);
  }

  // очистка фильтра
  clearFilters = () => {
    const filterState = this.state.setFilters;
    for (const key in filterState) {
      filterState[key] = '';
    }
    filterState.minPrice = 0;
    filterState.maxPrice = 60000;
    this.setState({ setFilters: filterState });
    this.props.updateData(this.state.setFilters);
    Array.from(document.querySelectorAll('.filter-active')).forEach(elem => elem.classList.remove('filter-active'));
    Array.from(document.querySelectorAll('.list-filter :checked')).forEach(elem => elem.checked = false);
  }

  // изменения блока через ref
  opener = (event, ref) => {
    const elem = event.currentTarget;
    if (elem.classList.contains('opener-down')) {
      elem.classList.remove('opener-down');
      elem.classList.add('opener-up');
      ref.classList.add('filter-hidden');
      return null;
    }
    if (elem.classList.contains('opener-up')) {
      elem.classList.remove('opener-up');
      elem.classList.add('opener-down');
      ref.classList.remove('filter-hidden');
      return null;
    }
  }

  render() {
    return (
      <section className="sidebar">
        <CatalogSideBarType
          type={this.props.type}
          updateFilter={this.updateData}
          setType={this.props.setFilters.type}
        />
        <div className="separator-150 separator-150-1" />
        <CatalogSideBarPrice
          minPrice={this.props.minPrice}
          maxPrice={this.props.maxPrice}
          updateFilter={this.updateData}
          opener={this.opener}
        />
        <div className="separator-150 separator-150-2" />
        <CatalogSideBarColor
          color={this.props.color}
          updateFilter={this.updateData}
          opener={this.opener}
        />
        <div className="separator-150 separator-150-3" />
        <CatalogSideBarSize
          size={this.props.size}
          updateFilter={this.updateData}
          opener={this.opener}
        />
        <div className="separator-150 separator-150-4" />
        <CatalogSideBarHeelSize
          heelSize={this.props.heelSize}
          updateFilter={this.updateData}
          opener={this.opener}
        />
        <div className="separator-150 separator-150-5" />
        <CatalogSideBarReason
          reason={this.props.reason}
          updateFilter={this.updateData}
          opener={this.opener}
          setReason={this.props.setFilters.reason}
        />
        <div className="separator-150 separator-150-6" />
        <CatalogSideBarSeason
          season={this.props.season}
          updateFilter={this.updateData}
          opener={this.opener}
          setSeason={this.props.setFilters.season}
        />
        <div className="separator-150 separator-150-7" />
        <CatalogSideBarBrand brand={this.props.brand} updateFilter={this.updateData} />
        <section className="sidebar__division">
          <div className="drop-down">
            <NavLink to="#" onClick={this.clearFilters}>
              <span className="drop-down-icon" />
              Сбросить
            </NavLink>
          </div>
        </section>
      </section>
    );
  }
}

export default CatalogSideBar;
