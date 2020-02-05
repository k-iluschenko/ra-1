import React, { Component } from 'react';

class CatalogSideBarHeelSize extends Component {
  constructor(props) {
    super(props);
    this.arrHeelSize = [];
  }

  getRef = node => { this.elem = node; }

  setFilter(event, heelSize) {
    if (event.target.checked) {
      this.arrHeelSize.push(heelSize);
    } else {
      this.arrHeelSize.map((item, i) => (heelSize === item ? this.arrHeelSize.splice(i, 1) : ''));
    }
    this.props.updateFilter('heelSize', this.arrHeelSize);
  }

  listOne(listSize) {
    if (!listSize) return null;
    return listSize.map((heelSize, i) => {
      if (i % 2 === 0) {
        return (
          <li key={i} onClick={event => { this.setFilter(event, heelSize) }}>
            <label>
              <input type="checkbox" className="checkbox" name={`checkbox-${heelSize}`} />
              <span className="checkbox-custom" />
              <span className="label">{heelSize}</span>
            </label>
          </li>
        );
      }
    });
  }

  listTwo(listSize) {
    if (!listSize) return null;
    return listSize.map((heelSize, i) => {
      if (i % 2 === 1) {
        return (
          <li key={i} onClick={(event) => { this.setFilter(event, heelSize) }}>
            <label>
              <input type="checkbox" className="checkbox" name={`checkbox-${heelSize}`} />
              <span className="checkbox-custom" />
              <span className="label">{heelSize}</span>
            </label>
          </li>
        );
      }
    });
  }

  render() {
    return (
      <section className="sidebar__division">
        <div className="sidebar__heel-height sidebar__filter-sizes">
          <div className="sidebar__division-title">
            <h3>Размер каблука</h3>
            <div className="opener-up" onClick={event => { this.props.opener(event, this.elem) }}/>
          </div>
          <ul ref={this.getRef} className="filter-hidden">
            <div className="list-1 list-filter">
              {this.listOne(this.props.heelSize)}
            </div>
            <div className="list-2 list-filter">
              {this.listTwo(this.props.heelSize)}
            </div>
          </ul>
        </div>
      </section>
    );
  }
}

export default CatalogSideBarHeelSize;
