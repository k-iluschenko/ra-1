import React, { Component } from 'react';

class ToFavorites extends Component {
  componentWillReceiveProps(newProps) {
    this.toFavorites(newProps);
  }

  addToFavorites = props => (event) => {
    if (localStorage.favorites === undefined) { // Если нет localStorage.favorites, то создаем его.
      localStorage.setItem('favorites', JSON.stringify([props.activeProduct]));
      event.currentTarget.classList.add('chosen');
    } else {
      const arr = JSON.parse(localStorage.favorites); // разбираем JSON
      const { id } = props.activeProduct; // id товара
      let isItFavoriteProduct = true; // принимаем, что товара нет в избранном

      for (let i = 0; i < arr.length; i++) { // перебираем массив
        if (arr[i].id === id) { // если id присутствует в массиве
          arr.splice(arr.map(item => item.id).indexOf(props.activeProduct.id), 1);
          event.currentTarget.classList.remove('chosen');
          isItFavoriteProduct = false; // то товар уже в избранном
        }
      }
      if (isItFavoriteProduct) {
        event.currentTarget.classList.add('chosen');
        arr.push(props.activeProduct); // добавляем товар в массив
      }
      localStorage.setItem('favorites', JSON.stringify(arr)); // записываем новые данные в localStorage
    }
  }

  toFavorites(props) {
    console.log(props);
    if (localStorage.favorites === undefined) return null;
    const arrFavorites = JSON.parse(localStorage.favorites); // разбираем JSON
    const { id } = props.activeProduct; // id товара
    const newarr = Array.from(arrFavorites).filter(({ idFav }) => idFav === props.activeProduct.id);
    if (newarr.length) {
      newarr[0].id === id // если id присутствует в массиве
        ? document.getElementsByClassName(`${props.nameClassStyle}`)[0].classList.add('chosen')
        : '';
    } else {
      document.getElementsByClassName(`${props.nameClassStyle}`)[0].classList.remove('chosen');
    }
  }

  render() {
    if (!this.props.nameClassStyle) return null;
    return (
      <div className={`${this.props.nameClassStyle}`} onClick={this.addToFavorites(this.props)}>
        <p />
      </div>
    );
  }
}
export default ToFavorites;
