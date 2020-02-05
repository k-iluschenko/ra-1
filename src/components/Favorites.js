// Страница избранное
import React, { Component } from 'react';
import Pagination from './Pagination.js';
import Sorting from './Sorting.js';
import PathFavorites from './PathFavorites.js';
import Item from './Item.js';
import '../css/style-favorite.css';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [], // Все товары в избранном
      favoritesOnPages: [], // Товары на странице
      itemOnPage: 12, // Количество товара на странице
      pages: 1, // Общее количество страниц
      page: 1, // Активная страница
      isChahge: false, // Было ли изменение
    };
  }

  componentWillMount() {
    if (localStorage.favorites === undefined) return null;
    this.setState({ favorites: JSON.parse(localStorage.favorites) });// избранные товары из localStorage
  }

  componentDidMount() {
    if (localStorage.favorites === undefined) return null;
    this.setState({ favorites: JSON.parse(localStorage.favorites) }); // избранные товары из localStorage
    this.setState({ pages: Math.ceil(this.state.favorites.length / this.state.itemOnPage) }); // общее количество страниц
    this.setItemsOnPages(this.state.page);
  }


  componentDidUpdate() {
    if (this.state.isChahge) { // если были изменения
      this.setState({ isChahge: false });
      this.setState({ pages: Math.ceil(this.state.favorites.length / this.state.itemOnPage) }); // пересчитываем общее количество страниц
      this.setItemsOnPages(this.state.page);
    }
  }

  // Товары на странице
  setItemsOnPages(page) {
    const arr = []; // массив для товаров на странице
    for (let i = (page - 1) * this.state.itemOnPage; i < (page * this.state.itemOnPage) && i < this.state.favorites.length; i++) {
      arr.push(this.state.favorites[i]); // добавляем товары в массив
    }
    this.setState({ favoritesOnPages: arr });
    if (this.state.favorites.length === 12 && arr.length === 0) { // если всего избранных товаров 12 и товаров на странице 0
      this.setState({ page: 1 }); // записываем в стэйт, что это первая страница
      this.setItemsOnPages(1);
    }
  }

  // Выбранная страница
  getPage = page => event => {
    event.preventDefault();
    this.setState({ page });
    if (page < 1) page = 1;
    if (page > this.state.pages) page = this.state.pages;
    this.setItemsOnPages(page);
  }

  // Склонение числительных
  declOfNum = (number, titles) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  }

  onClickHandler = () => (fav, change) => {
    this.setState({ favorites: fav, isChahge: change });
  }

  render() {
    return (
      <div className="wrapper wrapper_favorite">
        <PathFavorites {...this.props} />
        <main className="product-catalogue product-catalogue_favorite">
          <section className="product-catalogue__head product-catalogue__head_favorite">
            <div className="product-catalogue__section-title">
              <h2 className="section-name">В вашем избранном</h2>
              <span className="amount amount_favorite">
                {this.state.favorites.length} {this.declOfNum(this.state.favorites.length, ['товар', 'товара', 'товаров'])}
              </span>
            </div>
            <Sorting />
          </section>
          <section className="product-catalogue__item-list product-catalogue__item-list_favorite">
            <Item
              products={this.state.favoritesOnPages}
              updateState={this.onClickHandler()}
              {...this.props}
              {...this.state}
            />
          </section>
          <Pagination
            location={this.props.location}
            page={this.state.page}
            pages={this.state.pages}
            getPage={this.getPage}
          />
        </main>
      </div>
    );
  }
}

export default Favorites;
