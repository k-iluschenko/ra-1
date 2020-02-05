import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Subscribe from './Subscribe.js';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <section className="subscribe">
          <Subscribe {...this.props} />
        </section>
        <div className="footer__bottom">
          <div className="wrapper">
            <div className="footer__menus">
              <div className="footer__menu footer__menu_about">О магазине
              <ul>
                  <li><NavLink to="/">BosaNoga</NavLink></li>
                  <li><NavLink to="/404">Новости</NavLink></li>
                  <li><NavLink to="/404">Пресса</NavLink></li>
                </ul>
              </div>
              <div className="footer__menu footer__menu_collection">Коллекции
              <ul>
                  <li><NavLink to="/catalog">Обувь</NavLink></li>
                  <li><NavLink to="/404">Аксессуары</NavLink></li>
                  <li><NavLink to="/404">Для дома</NavLink></li>
                </ul>
              </div>
              <div className="footer__menu footer__menu_help">Помощь
              <ul>
                  <li><NavLink to="/404">Как купить?</NavLink></li>
                  <li><NavLink to="/404">Возврат</NavLink></li>
                  <li><NavLink to="/404">Контакты</NavLink></li>
                </ul>
              </div>
            </div>
            <div className="footer__info">
              <h3 className="footer__info_title">Принимаем к оплате:</h3>
              <div className="footer__paid-systems">
                <div className="footer__paid footer__paid_paypal"></div>
                <div className="footer__paid footer__paid_master-card"></div>
                <div className="footer__paid footer__paid_visa"></div>
                <div className="footer__paid footer__paid_yandex"></div>
                <div className="footer__paid footer__paid_webmoney"></div>
                <div className="footer__paid footer__paid_qiwi"></div>
              </div>
              <div className="footer__social-links">
                <h3 className="footer__social-links_title">Мы в соц.сетях:</h3>
                <div className="footer__social-link footer__social-link_twitter"></div>
                <div className="footer__social-link footer__social-link_vk"></div>
              </div>
              <div className="footer__copyright">2009-2018 © BosaNoga.ru — модный интернет-магазин обуви<br /> и аксессуаров. Все права защищены. Доставка по всей России!</div>
            </div>
            <div className="footer__contacts"><NavLink className="footer__phone" to="tel:+7-495-790-35-03">+7 495 79 03 5 03</NavLink>
              <p className="footer__phone_text">Ежедневно: с 09-00 до 21-00</p><NavLink className="footer__email" to="mailto:office@bosanoga.ru">office@bosanoga.ru</NavLink>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
