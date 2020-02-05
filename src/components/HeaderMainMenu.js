import React, { Component } from 'react';

import { mainSubmenuVisibility } from '../js/script.js';
import HeaderMainMenuItems from './HeaderMainMenuItems.js';

class HeaderMainMenu extends Component {
  componentDidUpdate() {
    this.mainSubmenu();
  }

  // Вешаем EventListener на пункты меню
  mainSubmenu = () => {
    const mainMenuItems = document.querySelectorAll('.main-menu__item');
    const mainMenu = document.querySelectorAll('.main-menu')[0].parentNode;

    mainMenu.addEventListener('mouseleave', () => {
      if (document.querySelector('.main-menu__item_active')) {
        document.querySelector('.main-menu__item_active').classList.remove('main-menu__item_active');
      }
      document.querySelector('.dropped-menu').classList.remove('dropped-menu_visible');
    });

    for (let item of mainMenuItems) {
      item.addEventListener('mouseenter', mainSubmenuVisibility);
    }
  }

  render() {
    return (
      <nav className="main-menu">
        <div className="wrapper">
          <ul className="main-menu__items">
            <HeaderMainMenuItems {...this.props} />
          </ul>
        </div>
      </nav>
    );
  }
}

export default HeaderMainMenu;
