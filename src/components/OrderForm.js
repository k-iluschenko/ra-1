import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isForm: false, // форма заполнена?
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.client.name !== ''
      && newProps.client.phone !== ''
      && newProps.client.address !== ''
      && newProps.client.paymentType !== '') {
      this.setState({ isForm: true });
    }
  }

  classNameToButton() {
    return this.state.isForm ? '' : 'order-process__form-submit_disabled';
  }

  render() {
    return (
      <div className="order-process__confirmed">
        <form onSubmit={this.props.sendOrder} action="#">
          <div className="order-process__delivery">
            <h3 className="h3">кому и куда доставить?</h3>
            <div className="order-process__delivery-form">
              <label className="order-process__delivery-label">
                <div className="order-process__delivery-text">Имя</div>
                <input className="order-process__delivery-input" type="text" name="name" placeholder="Представьтесь, пожалуйста"
                  onChange={this.props.updateState} />
              </label>
              <label className="order-process__delivery-label">
                <div className="order-process__delivery-text">Телефон</div>
                <input className="order-process__delivery-input" type="tel" name="phone" placeholder="Номер в любом формате"
                  onChange={this.props.updateState} />
              </label>
              <label className="order-process__delivery-label">
                <div className="order-process__delivery-text">Адрес</div>
                <input className="order-process__delivery-input order-process__delivery-input_adress" type="text" name="address" placeholder="Ваша покупка будет доставлена по этому адресу"
                  onChange={this.props.updateState} />
              </label>
            </div>
            <p>Все поля обязательны для заполнения. Наш оператор свяжется с вами для уточнения деталей заказа.</p>
          </div>
          <div className="order-process__paid">
            <h3 className="h3">хотите оплатить онлайн или курьеру при получении?</h3>
            <div className="order-process__paid-form">
              <label className="order-process__paid-label">
                <input className="order-process__paid-radio" type="radio" name="paymentType" value="onlineCard" onChange={this.props.updateState} />
                <span className="order-process__paid-text">Картой онлайн</span>
              </label>
              <label className="order-process__paid-label">
                <input className="order-process__paid-radio" type="radio" name="paymentType" value="offlineCard" onChange={this.props.updateState} />
                <span className="order-process__paid-text">Картой курьеру</span>
              </label>
              <label className="order-process__paid-label">
                <input className="order-process__paid-radio" type="radio" name="paymentType" value="offlineCash" onChange={this.props.updateState} />
                <span className="order-process__paid-text">Наличными курьеру</span>
              </label>
            </div>
          </div>
          <button className={`order-process__form-submit order-process__form-submit_click ${this.classNameToButton()}`} disabled={!this.state.isForm}>Подтвердить заказ</button>
        </form>
      </div>
    );
  }
}

export default OrderForm;
