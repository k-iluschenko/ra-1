import React, { Component } from 'react';
import Sorting from './Sorting.js';
import Pagination from './Pagination.js';
import Item from './Item.js';

class CatalogList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesTitle: '',
      products: [],
      goods: 0,
      pages: 1,
      page: 1,
      type: '',
      search: ''
    };
  }

  componentWillMount() {
    this.categoriesTitle(this.props.categories);
  }

  componentDidMount() {
    this.loadCatalog(this.state.page);
  }

  componentWillReceiveProps(newProps) {
    this.loadCatalog(this.state.page, newProps);
    this.setState({search: this.props.search})
  }
  componentWillUnmount() {
   /*  if (this.props.search) {
      this.props.update('search', '');
    } */
  }

  // обновление стэйта
  updateData = (sortBy, data) => {
    // название и значение
    this.setState({ sortBy: data });
    this.props.updateSort(data);
  };

  getPage = page => event => {
    event.preventDefault();
    this.setState({ page });
    this.loadCatalog(page);
  };

  queryString = filters => {
    const stringArr = [];
    if (!filters) return null;
    if (typeof filters !== 'object') return null;

    for (const key in filters) {
      if (!filters[key]) continue;
      if (filters[key] === '') continue;
      if (filters[key].length === 0) continue;
      if (Array.isArray(filters[key])) {
        filters[key].forEach(value => {
          stringArr.push(`${key}[]=${value}`);
        });
        continue;
      }
      console.log(key, filters[key]);
      if (typeof filters[key] === "string") {
      let newStr = filters[key].replace(/[(&)]+/gi, '%26')
  stringArr.push(`${key}=${newStr}`);
      }
     
     else {
        stringArr.push(`${key}=${filters[key]}`);
      }
    }
    return stringArr.join('&');
  };

  declOfNum = (number, titles) => {
    // Склонение числительных
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  };

  loadCatalog(page, props = this.props) {
    let query = '';

    if (props.search === undefined || props.search === '') {
      if (this.props.categoriesId) {
        query += `categoryId=${this.props.categoriesId}`;
      }
    } else {
      query += `&search=${props.search}`;
    }

    if (page !== undefined) {
      query += `&page=${page}`;
    }
    if (props.sortBy !== undefined) {
      query += `&sortBy=${props.sortBy}`;
    }

    query += `&${this.queryString(this.props.setFilters)}`;

    console.log(query);
    fetch(`${this.props.url}/products/?${query}`)
      .then(res => res.json())
      .then(res => (res.status === 'ok' ? res : new Error(res.status)))
      .then(data => {
        this.setState({
          products: data.data,
          goods: data.goods,
          pages: data.pages,
          page: data.page,
        });
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  categoriesTitle(categories) {
    if (this.props.categoriesId === -1) {
      return this.setState({
        categoriesTitle: `Результат поиска "${this.props.search}" `,
      });
    }
    if (this.props.categoriesId === 0) {
      if (this.props.search) {
        this.props.update('search', undefined);
      }
      return this.setState({ categoriesTitle: 'Весь каталог ' });
    }
    for (const key of categories) {
      if (key.id === +this.props.categoriesId) {
        this.setState({ categoriesTitle: key.title });
      }
    }
  }

  render() {
    return (
      <section className="product-catalogue-content">
        <section className="product-catalogue__head">
          <div className="product-catalogue__section-title">
            <h2 className="section-name">{this.state.categoriesTitle}</h2>
            <span className="amount">
              {this.state.goods}{' '}
              {this.declOfNum(this.state.goods, ['товар', 'товара', 'товаров'])}
            </span>
          </div>
          <Sorting updateSort={this.updateData} sortBy={this.props.sortBy} />
        </section>
        <section className="product-catalogue__item-list">
          <Item {...this.props} {...this.state} />
        </section>
        <Pagination
          location={this.props.location}
          page={this.state.page}
          pages={this.state.pages}
          getPage={this.getPage}
        />
      </section>
    );
  }
}

export default CatalogList;
