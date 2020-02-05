import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Pagination extends Component {
  // вывод количества страниц
  setPage() {
    const arr = []; // пустой массив для нумерации страниц
    for (let i = 0; i < this.props.pages; i++) {
      arr.push(i); // заполняем массив номерами страниц
    }
    const link = this.props.location.search ? this.props.location.search : '#'; // формируем ссылку
    return arr.map((item, i) => {
      if (++i === this.props.page) {
        return <li className="active" key={i} onClick={this.props.getPage(i)}><NavLink to={`${link}`}>{i}</NavLink></li>;
      }
      return <li className="" key={i} onClick={this.props.getPage(i)}><NavLink to={`${link}`}>{i}</NavLink></li>;
    });
  }

  // отображение стрелки назад
  angleBack() {
    if (this.props.page <= 1) return 'hidden';
    return '';
  }

  // отображение стрелки вперед
  angleForward() {
    if (this.props.page >= this.props.pages) return 'hidden';
    return '';
  }

  render() {
    return (
      <div className="product-catalogue__pagination">
        <div className="page-nav-wrapper">
          <div className={`angle-back ${this.angleBack()}`} onClick={this.props.getPage(this.props.page - 1)}><NavLink to="#"></NavLink></div>
          <ul>
            {this.setPage()}
          </ul>
          <div className={`angle-forward ${this.angleForward()}`} onClick={this.props.getPage(this.props.page + 1)}><NavLink to="#"></NavLink></div>
        </div>
      </div>
    );
  }
}

export default Pagination;
