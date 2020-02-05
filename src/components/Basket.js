import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Basket extends Component {
  constructor(props) {
    super(props);
    this.inBasketItems = [];
    this.state = {
      items: [],
      //    itemsInBasket: [],
      //     cartId: '',
    };
  }

  componentWillMount() {
    if (localStorage.cartId === undefined) return;
    const cartId = JSON.parse(localStorage.cartId);
    this.setState({ cartId });
  }

  componentDidMount() {
  }

  componentWillReceiveProps(newProps) {
    this.setState({ items: newProps.items });
    /*   if (localStorage.cartId !== undefined) {
      const cartId = JSON.parse(localStorage.cartId);
      this.setState({ cartId });
    }
    this.getProduct();

    console.log('newProps', newProps.quantity)
    console.log('newProps', this.state.items.length)
    if (this.state.items.length !== newProps.quantity) {
      this.props.getQuantity(this.state.items.length);
    } */
  }

  setOrdering(state) {
    const itemsInBasket = this.state.items;
    this.props.update('itemsInBasket', itemsInBasket);
  }

  items(items) {
    if (!items || !items.length) return null;
    return items.map(item => {
      const sum = +item.price * +item.amount;
      const qt = item.amount > 1 ? `, ${item.amount} шт` : '';
      return <div className="product-list__item" key={item.id * item.size}>
          <NavLink to={`/products/${item.id}`} className="product-list__pic">
            <img src={`${item.images}`} alt={`${item.title}`} />
          </NavLink>
          <NavLink to={`/products/${item.id}`} className="product-list__product">
            {item.title} (размер: {item.size}){qt}
          </NavLink>
          <div className="product-list__fill" />
          <div className="product-list__price">
            {sum}
            <i className="fa fa-rub" aria-hidden="true" />
          </div>
          <div className="product-list__delete" onClick={this.props.deletProductInBasket(item.id, item.size)}>
            <i className="fa fa-times" aria-hidden="true" />
          </div>
        </div>;
    });
  }

  render() {
    if (!this.state.items || !this.state.items.length) {
      return (
        <div className="hidden-panel__basket basket-dropped">
          <div className="basket-dropped__title">
            В корзине пока ничего нет. Не знаете с чего начать? Посмотрите наши
            новинки!
          </div>
        </div>
      );
    }
    return (
      <div className="hidden-panel__basket basket-dropped">
        <div className="basket-dropped__title">В вашей корзине:</div>
        <div className="basket-dropped__product-list product-list">
          {this.items(this.state.items)}
        </div>
        <div onClick={() => this.setOrdering(this.state)}>
          <NavLink className="basket-dropped__order-button" to="/ordering">
            Оформить заказ
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Basket;
