import React, { Component } from 'react';

class Sorting extends Component {
  sortBy = (event) => {
    this.props.updateSort('sortBy', event.currentTarget.value);
  }

  render() {
    return (
      <div className="product-catalogue__sort-by">
        <p className="sort-by">Сортировать</p>
        <select onChange={event => this.sortBy(event)} value={this.props.sortBy}  id="sorting" name="">
          <option value="price">по цене</option>
          <option value="popularity">по популярности</option>
        </select>
      </div>
    );
  }
}

export default Sorting;
