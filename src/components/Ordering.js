import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { headerHiddenPanelBasketVisibility } from '../js/script.js';
import OrderForm from './OrderForm.js';

import '../css/style-order.css';

class Ordering extends Component {
  constructor(props) {
    super(props);
    this.totalСost = [];
    this.state = {
      totalСost: 0,
      itemsInBasket: undefined,
      cartId: '',
      client: {
        name: '',
        phone: '',
        address: '',
        paymentType: '',
      },
    };
  }

  componentWillMount() {
    console.log('componentWillMount');
    if (localStorage.cartId) {
      this.setState({
        cartId: JSON.parse(localStorage.cartId),
      });
    }
    this.setState({ itemsInBasket: this.props.itemsInBasket });
  }

  componentDidMount() {
    console.log('componentDidMount');
    console.log(this.totalСost);
    if (this.totalСost.length) {
      const total = this.totalСost.reduce(this.reducer);
      this.setState({ totalСost: total });
    }
  }

  componentWillReceiveProps(newProps) {
    console.log('componentWillReceiveProps', newProps);
  }

  createBascket = (item, amount) => {
    console.log('createBascket', item);
    const cartId = JSON.parse(localStorage.cartId);
    const cart = { id: item.id, size: item.size, amount: item.amount };
    console.log(cart);
    console.log(amount);

    fetch(`${this.props.url}/cart/${cartId}`, {
      body: JSON.stringify(cart),
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.status === 404) {
          console.log('404');
          localStorage.removeItem('cartId');
          this.setState({ cartId: '' });
          this.setState({ itemsInBasket: undefined });
          this.setState({ totalСost: 0 });
          this.props.update('inBasket', false);
        }
        return res;
      })
      .then(res => (res.status === 200 ? res : new Error(res)))
      .then(res => res.json())
      .then(res => {
        if (res.status === 'ok') return res;
      })
      .then(basketId => {
        localStorage.setItem('cartId', JSON.stringify(basketId.data.id));
        return basketId;
      })
      .then(basketId => this.props.update('inBasket', true))
      .catch(error => console.log('error', error));
  };

  // Количество товара
  changeQuantity = item => event => {
    const quantity = event.currentTarget.textContent;
    if (quantity === '+') {
      return this.createBascket(item, item.amount++);
    }
    if (item.amount < 1) {
      item.amount = 0;
      return this.createBascket(item, item.amount);
    }
    if (quantity === '-') {
      return this.createBascket(item, item.amount--);
    }
  };

  reducer = (accumulator, currentValue) => accumulator + currentValue;

  updateState = event => {
    const { name } = event.currentTarget;
    const { value } = event.currentTarget;
    const { client } = this.state;
    client[name] = value;
    this.setState({ client });
  };

  sendOrder = event => {
    event.preventDefault();
    // console.log('Заказ принят', this.state);
    const cartOrder = {
      name: this.state.client.name,
      phone: this.state.client.phone,
      address: this.state.client.address,
      paymentType: this.state.client.paymentType,
      cart: this.state.cartId,
    };
    // console.log(cartOrder);

    fetch(`${this.props.url}/order`, {
      body: JSON.stringify(cartOrder),
      credentials: 'same-origin',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(res => (res.status === 'ok' ? res : new Error(res.status)))
      .then(order => {
        localStorage.removeItem('cartId');
        this.setState({ orders: order.data });
        this.props.update('client', order.data);
        this.props.update('totalСost', this.state.totalСost);
        return order;
      })
      .then(res => this.props.history.push('/order-accepted'))
      .catch(error => {
        console.log('error', error);
      });
  };

  item(items) {
    if (!items) return null;
    return items.map((item, index) => {
      if (!item.amount) return null;

      this.totalСost.push(item.price * item.amount);

      return (
        <div className="basket-item" key={item.id * item.size}>
          <div className="basket-item__pic">
            <img src={item.images} alt={`${item.title}`} />
          </div>
          <div className="basket-item__product">
            <div className="basket-item__product-name">
              <NavLink to={`/products/${item.id}`}>{item.title}</NavLink>
            </div>
            <div className="basket-item__product-features">
              <div className="basket-item__size">
                Размер: <span>{item.size}</span>
              </div>
              <div className="basket-item__producer">
                Производитель: <span>{item.brand}</span>
              </div>
              <div className="basket-item__color">
                Цвет: <span>{item.color}</span>
              </div>
            </div>
          </div>
          <div className="basket-item__quantity">
            <div
              className="basket-item__quantity-change basket-item-list__quantity-change_minus"
              onClick={this.changeQuantity(item)}
            >
              -
            </div>
            {item.amount}
            <div
              className="basket-item__quantity-change basket-item-list__quantity-change_plus"
              onClick={this.changeQuantity(item)}
            >
              +
            </div>
          </div>
          <div className="basket-item__price">
            {item.price * item.amount}{' '}
            <i className="fa fa-rub" aria-hidden="true" />
          </div>
        </div>
      );
    });
  }

  render() {
    console.log('render');
    return (
      <div className="wrapper order-wrapper">
        <div className="site-path">
          <ul className="site-path__items">
            <li className="site-path__item">
              <NavLink to="/">Главная</NavLink>
            </li>
            <li className="site-path__item">
              <NavLink to="#" onClick={headerHiddenPanelBasketVisibility}>
                Корзина
              </NavLink>
            </li>
            <li className="site-path__item">
              <NavLink to="#">Оформление заказа</NavLink>
            </li>
          </ul>
        </div>
        <section className="order-process">
          <h2 className="order-process__title">Оформление заказа</h2>
          <div className="order-process__basket order-basket">
            <div className="order-basket__title">в вашей корзине:</div>
            <div className="order-basket__item-list">
              {this.item(this.state.itemsInBasket)}
            </div>
            <div className="order-basket__summ">
              Итого:
              <span>
                {' '}
                {this.state.totalСost}{' '}
                <i className="fa fa-rub" aria-hidden="true" />
              </span>
            </div>
          </div>
          <OrderForm
            sendOrder={this.sendOrder}
            updateState={this.updateState}
            client={this.state.client}
            {...this.props}
          />
        </section>
      </div>
    );
  }
}

export default Ordering;
