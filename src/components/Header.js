import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import HeaderMainMenu from './HeaderMainMenu.js';
import DroppedMenu from './DroppedMenu.js';
import HeaderTopMenu from './HeaderTopMenu.js';
import Basket from './Basket.js';
import logotype from '../img/header-logo.png';
import {
  headerHiddenPanelProfileVisibility,
  headerHiddenPanelBasketVisibility,
  headerMainSearchVisibility,
} from '../js/script.js';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // categories: [],
      search: '',
      // foundItems: '',
      quantity: 0,
      items: [],
      cartId: '',
    };
    this.styleBascket = {
      display: 'block',
    };
    this.styleBascketNone = {
      display: 'none',
    };
  }

  componentWillReceiveProps(newProps) {
    if (localStorage.cartId !== undefined) {
      const cartId = JSON.parse(localStorage.cartId);
      console.log('componentWillReceiveProps', cartId);
      this.setState({ cartId });
    }
    this.getProduct();
  }

  onChangeSearchValue = event => {
    this.setState({ search: event.target.value });
  };

  getProduct = () => {
    const cartId =
      localStorage.cartId === undefined
        ? null //this.state.cartId
        : JSON.parse(localStorage.cartId);
    if (!cartId) {
      this.setState({ items: [], quantity: 0 });
      return null;
    }

    fetch(`${this.props.url}/cart/${cartId}`)
      .then(res => res.json())
      .then(res => (res.status === 'ok' ? res : new Error(res.status)))
      .then(data => this.getItems(data.data.products))
      .catch(error => {
        console.log('error', error);
      });
  };

  getItems(items) {
    this.setState({ items });
    this.setState({ quantity: items.length });
    items.map(item => {
      fetch(`${this.props.url}/products/${item.id}`)
        .then(response => response.json())
        .then(res => {
          items.map(item => {
            const img = res.data.images[0];
            if (item.id === res.data.id) {
              item.title = res.data.title;
              item.images = img;
              item.price = res.data.price;
              item.total = res.data.price * item.amount;
              item.brand = res.data.brand;
              item.color = res.data.color;
            }
            return null;
          });
          this.setState({ itemsInBasket: items });
        });
      return null;
    });
  }

  deletProductInBasket = (id, size) => event => {
    this.props.update('productsInBasket', []);
    const cartId = JSON.parse(localStorage.cartId);
    const cart = {
      id,
      size,
      amount: 0,
    };

    fetch(`${this.props.url}/cart/${cartId}`, {
      body: JSON.stringify(cart),
      credentials: 'same-origin',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (res.status === 404) {
          localStorage.removeItem('cartId');
          this.setState({ cartId: '' });
          this.setState({ items: [] });
          this.setState({ quantity: this.state.items.length });
        }
        return res;
      })
      .then(res => res.json())
      .then(res => (res.status === 'ok' ? res : new Error(res.status)))
      .then(basketId => {
        localStorage.setItem('cartId', JSON.stringify(basketId.data.id));
      })
      .then(res => this.getProduct())
      .catch(error => {
        console.log('error', error);
      });
  };

  onSubmit = event => {
                        event.preventDefault();
                        this.props.history.push(`/catalog`); //?search=${this.state.search}
                        this.props.update('search', `${event.target.elements[0].value}`);
                        this.props.update('categoriesId', -1);
                        this.setState({ search: '' });
                      };

  style() {
    const style = this.state.quantity
      ? this.styleBascket
      : this.styleBascketNone;
    // console.log(style);
    return style;
  }

  render() {
    //this.style();
    return (
      <header className="header">
        <HeaderTopMenu />
        <div className="header-main">
          <div className="header-main__wrapper wrapper">
            <div className="header-main__phone">
              <NavLink to="tel:+7-495-790-35-03">+7 495 79 03 5 03</NavLink>
              <p>Ежедневно: с 09-00 до 21-00</p>
            </div>
            <div className="header-main__logo">
              <NavLink to="/">
                <h1>
                  <img src={logotype} alt="logotype" />
                </h1>
              </NavLink>
              <p>Обувь и аксессуары для всей семьи</p>
            </div>
            <div className="header-main__profile">
              <div className="header-main__pics">
                <div
                  className="header-main__pic header-main__pic_search"
                  onClick={headerMainSearchVisibility}
                />
                <div className="header-main__pic_border" />
                <div
                  className="header-main__pic header-main__pic_profile"
                  onClick={headerHiddenPanelProfileVisibility}
                >
                  <div className="header-main__pic_profile_menu" />
                </div>
                <div className="header-main__pic_border" />
                <div
                  className="header-main__pic header-main__pic_basket"
                  onClick={headerHiddenPanelBasketVisibility}
                >
                  <div
                    style={this.style()}
                    className="header-main__pic_basket_full"
                  >
                    {this.state.quantity}
                  </div>
                  <div className="header-main__pic_basket_menu" />
                </div>
              </div>
              <form
                onSubmit={this.onSubmit}
                className="header-main__search"
                action="#"
              >
                <input
                  placeholder="Поиск"
                  onChange={this.onChangeSearchValue}
                  value={this.state.search}
                />
                <i className="fa fa-search" aria-hidden="true" />
              </form>
            </div>
          </div>
          <div className="header-main__hidden-panel hidden-panel">
            <div className="hidden-panel__profile">
              <NavLink to="/">Личный кабинет</NavLink>
              <NavLink to="/favorites">
                <i className="fa fa-heart-o" aria-hidden="true" />
                Избранное
              </NavLink>
              <NavLink to="/">Выйти</NavLink>
            </div>
            <Basket
              items={this.state.items}
              deletProductInBasket={this.deletProductInBasket}
              update={this.props.update}
            />
          </div>
        </div>
        <div className="wrapper-menu">
          <HeaderMainMenu
            {...this.props}
            categories={this.props.categories}
            update={this.props.update}
          />
          <DroppedMenu
            {...this.props}
            filters={this.props.filters}
            update={this.props.update}
          />
        </div>
      </header>
    );
  }
}

export default Header;
