import React, { Component } from 'react';
import NotFoundPage from './NotFoundPage.js';

class OrderAccepted extends Component {

  setPayment = paid => {
    let payment = '';
    switch (paid) {
      case 'offlineCard':
        payment = 'Картой курьеру';
        break;
      case 'offlineCash':
        payment = 'Наличными курьеру';
        break;
      default:
        payment = 'Картой онлайн';
    }
    return payment;
  }

  proceed() {
    this.props.history.push('/catalog');
    document.documentElement.scrollTop = 0;
  }

  render() {
    if (!this.props.client) {
      return (
        <div className="not-found">
          <NotFoundPage />
        </div>
      );
    }
    console.log(this.props.client);
    return (
      <section className="order-done">
        <h2 className="order-done__title order-process__title">
          Заказ принят, спасибо!
        </h2>
        <div className="order-done__information order-info">
          <div className="order-info__item order-info__item_summ">
            <h3>Сумма заказа:</h3>
            <p>
              {this.props.totalСost}
              <i className="fa fa-rub" aria-hidden="true" />
            </p>
          </div>
          <div className="order-info__item order-info__item_pay-form">
            <h3>Способ оплаты:</h3>
            <p>{this.setPayment(this.props.client.info.paymentType)}</p>
          </div>
          <div className="order-info__item order-info__item_customer-name">
            <h3>Имя клиента:</h3>
            <p>{this.props.client.info.name}</p>
          </div>
          <div className="order-info__item order-info__item_adress">
            <h3>Адрес доставки:</h3>
            <p>{this.props.client.info.address}</p>
          </div>
          <div className="order-info__item order-info__item_phone">
            <h3>Телефон:</h3>
            <p>{this.props.client.info.phone}</p>
          </div>
        </div>
        <p className="order-done__notice">
          Данные о заказе отправлены на адрес
          <span>notbosaanymore@gmail.com. </span>
        </p>
        <button
          className="order-done__continue"
          type="submit"
          onClick={() => this.proceed()}
        >
          продолжить покупки
        </button>
      </section>
    );
  }
}

export default OrderAccepted;
