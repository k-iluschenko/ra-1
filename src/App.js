import React, { Component } from 'react';
import { Router } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Header from './components/Header.js';
import NotFoundPage from './components/NotFoundPage.js';

import Footer from './components/Footer.js';
import MainPage from './components/MainPage.js';
import Catalog from './components/Catalog.js';
import Favorites from './components/Favorites.js';
import Products from './components/Products.js';
import Ordering from './components/Ordering.js';
import OrderAccepted from './components/OrderAccepted.js';
import withData from './components/withData.js';

import './css/style.css';
import './css/my-style.css';

import url from './components/url.js';

const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });

class AppLoad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: urlApi, // ссылка на API
      categories: [], // список катерогий товара с сервера
      categoriesId: 0, // ID категории
      inBasket: undefined, // Товар добавили в корзину
      productsInBasket: {},
      filters: {}, // Фильтры
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
    };
  }

  componentWillMount() {
    this.getFilters();
    this.getBasket();
  }

  componentWillReceiveProps(nextProps) {
    if (
      !this.state.categories.length ||
      !this.state.categoriesId ||
      nextProps.categories
    ) {
      this.setState({ categories: nextProps.categories });
    }
  }

  getFilters() {
    fetch(`${urlApi}/filters`)
      .then(res => (res.status === 200 ? res : new Error(res)))
      .then(res => res.json())
      .then(data => this.setState({ filters: data.data }))
      .catch(error => console.log('error', error));
  }

  getBasket = () => {
    const cartId = localStorage.cartId === undefined ? '' : JSON.parse(localStorage.cartId);
    if (!cartId) {
      this.setState({ items: [], quantity: 0 });
      return null;
    }
    fetch(`${urlApi}/cart/${cartId}`)
      .then(res => res.json())
      .then(res => (res.status === 'ok' ? res : new Error(res.status)))
      .then(data => this.setState({ productsInBasket: data.data.products }))
      .catch(error => {
        console.log('error', error);
      });
  }

  onClickHandler = (title, value) => {
    this.setState({ [title]: value });
  };

  onClickHandlerAddBasket = value => {
    this.getBasket();
   // console.log('onClickHandlerAddBasket', value);
    const basket = this.state.productsInBasket;
   // console.log('onClickHandlerAddBasket--basket', basket);
    if (Object.keys(basket).length) {
      //const arrID = basket.filter(item => item.id === value.id);
      //const arrSize = arrID.filter(item => item.size === value.size);
      // basket.push(value);
      const arrSize = basket.find(item => item.id === value.id && item.size === value.size);
    //  console.log('onClickHandlerAddBasket--arr', arrSize);
      arrSize.amount += value.amount;
    //  console.log('onClickHandlerAddBasket', basket);
      this.setState({ productsInBasket: arrSize });
    }
  };

  render() {
    return <Router history={history}>
        <div className="container">
          <div className="loading">Loading&#8230;</div>
          <Header categories={this.state.categories} categoriesId={this.state.categoriesId} filters={this.state.filters} setFilters={this.state.setFilters} inBasket={this.state.inBasket} update={this.onClickHandler} url={this.state.url} history={history} search={this.state.search}/>
          <Switch>
            <Route path="/catalog" component={props => <Catalog {...this.props} {...props} {...this.state} update={this.onClickHandler} getProduct={this.getProduct} />} />
            <Route path="/favorites" component={props => <Favorites {...this.props} {...props} {...this.state} update={this.onClickHandler} />} />
          <Route path="/products/:id" component={props => <Products {...props} productsInBasket={this.state.productsInBasket} onClickHandlerAddBasket={this.onClickHandlerAddBasket} update={this.onClickHandler // {...this.state} //{...this.props}
                  } url={this.state.url} />} />
            <Route path="/ordering" component={props => <Ordering {...this.props} {...props} {...this.state} update={this.onClickHandler} url={this.state.url} />} />
            <Route path="/order-accepted" component={props => <OrderAccepted {...this.props} {...props} {...this.state} update={this.onClickHandler} client={this.state.client} />} />
            <Route path="/404" component={() => <NotFoundPage />} />
            <Route path="/" component={props => <MainPage {...this.props} {...props} {...this.state} />} />
          </Switch>
          <Footer history={history} />
        </div>
      </Router>;
  }
}

// Получаем первоначальные данные
const urlApi = url(); // Ссылка на API
const App = withData(
  `${urlApi}/categories`, // Получаем список категорий
  'categories', // записываем данные в пропс
)(AppLoad); // вызываем компонент

export default App;
