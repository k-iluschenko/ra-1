import React, { Component } from 'react';

class Subscribe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendForm: false //не заполнена форма
    };
  }

  onSubmit = (event) => {
    event.preventDefault();
    let subscribe = '';
    const radio = document.subscribeForm.subscribe;
    for (let i = 0; i < radio.length; i++) {
      if (radio[i].checked) {
        subscribe = radio[i].value;
        this.setState({ sendForm: true });
      }
    }
    
    this.props.history.push(`?subscribe=${subscribe}`);
  }

  render() {
    if (!this.state.sendForm) {
      return (
        <div className="subscribe__wrapper">
          <h2 className="subscribe__title">подписаться на рассылку выгодных предложений</h2>
          <form onSubmit={this.onSubmit} className="subscribe__radios" action="" name='subscribeForm'>
            <label className="subscribe__radio_label">
              <input className="subscribe__radio" type="radio" name="subscribe" value="women" />
              <div className="subscribe__radio_text">Женское</div>
            </label>
            <label className="subscribe__radio_label">
              <input className="subscribe__radio" type="radio" name="subscribe" value="men" />
              <div className="subscribe__radio_text">Мужское</div>
            </label>
            <label className="subscribe__radio_label">
              <input className="subscribe__radio" type="radio" name="subscribe" value="both" required/>
              <div className="subscribe__radio_text">Всё</div>
            </label>
            <input className="subscribe__email" type="email" placeholder="Ваш e-mail" required />
            <input className="subscribe__submit" type="submit" value="ПОДПИСАТЬСЯ" />
          </form>
        </div>
      )
    }
    else {
      return (
        <div className="subscribe__wrapper">
          <h2 className="subscribe__title">подписаться на рассылку выгодных предложений</h2>
          Подписка оформлена! Спасибо!
         </div>
      )
    }
  }
}

export default Subscribe;