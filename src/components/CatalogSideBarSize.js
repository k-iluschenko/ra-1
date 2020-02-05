import React, { Component } from 'react';

class CatalogSideBarSize extends Component {
  constructor(props) {
    super(props);
    this.arrSize = [];
  }

  getRef = node => { this.elem = node; }

  setFilter(event, size) {
    if (event.target.checked) {
      this.arrSize.push(size);
    } else {
      this.arrSize.map((foudSize, i) => (size === foudSize ? this.arrSize.splice(i, 1) : ''));
    }
    this.props.updateFilter('size', this.arrSize);
  }

  listSizeOne(listSize) {
    if (!listSize) return null;
    return listSize.map((size, i) => {
      if (i % 2 === 0) {
        return (
          <li key={i} onClick={event => { this.setFilter(event, size) }}>
            <label>
              <input type="checkbox" className="checkbox" name={`checkbox-${size}`} />
              <span className="checkbox-custom" />
              <span className="label">{size}</span>
            </label>
          </li>
        );
      }
    });
  }

  listSizeTwo(listSize) {
    if (!listSize) return null;
    return listSize.map((size, i) => {
      if (i % 2 === 1) {
        return (
          <li key={i} onClick={(event) => { this.setFilter(event, size) }}>
            <label>
              <input type="checkbox" className="checkbox" name={`checkbox-${size}`} />
              <span className="checkbox-custom" />
              <span className="label">{size}</span>
            </label>
          </li>
        );
      }
    });
  }

  render() {
    return (
      <section className="sidebar__division">
        <div className="sidebar__size sidebar__filter-sizes">
          <div className="sidebar__division-title">
            <h3>Размер</h3>
            <div className="opener-down" onClick={(event) => { this.props.opener(event, this.elem) }} />
          </div>
          <ul ref={this.getRef}>
            <div className="list-1 list-filter">
              {this.listSizeOne(this.props.size)}
            </div>
            <div className="list-2 list-filter">
              {this.listSizeTwo(this.props.size)}
            </div>
          </ul>
        </div>
      </section>
    );
  }
}

export default CatalogSideBarSize;
