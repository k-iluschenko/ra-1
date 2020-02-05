// Иконка "Сердце" (избранное)
import React, { Component } from 'react';

class HeartIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      className: '',
    };
  }

  componentWillMount() {
    if (this.props.item) {
      this.setState({ className: this.classNameToFavorites(this.props.item) });
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ className: this.classNameToFavorites(newProps) });
  }

  isFavorites = props => event => {
    event.preventDefault();
    if (localStorage.favorites === undefined) {
      // Если нет localStorage.favorites, то создаем его.
      localStorage.setItem('favorites', JSON.stringify([props])); // создаем localStorage.localStorage
    } else {
      const arr = JSON.parse(localStorage.favorites); // разбираем JSON
      let isItFavoriteProduct = true; // принимаем, что товара надо добавить в избранное
      for (let i = 0; i < arr.length; i++) {
        // перебираем массив
        if (arr[i].id === props.id) {
          // если id присутствует в массиве
          arr.splice(arr.map(item => item.id).indexOf(props.id), 1); // убираем товар из избранного
          isItFavoriteProduct = false;
        }
      }
      if (isItFavoriteProduct) {
        arr.unshift(props); // добавляем товар в массив
      }
      localStorage.setItem('favorites', JSON.stringify(arr)); // записываем новые данные в localStorage
      this.setState({ className: this.classNameToFavorites(props) }); // класс для "сердечка"
      // console.log(this.props.update)
      // console.log(arr)
      if (this.props.updateState) {
        this.props.updateState(arr, true); // обновляем state для страницы избранное
      }
    }
  };

  classNameToFavorites(props) {
    if (localStorage.favorites === undefined) {
      // если нет localStorage,
      localStorage.setItem('favorites', JSON.stringify([])); // то создаем пустой
    }
    const arrFavorites = JSON.parse(localStorage.favorites); // разбираем JSON в массив
    const favorItem = arrFavorites.find(({ id }) => +props.id === +id); // поиск нужного id в массиве
    let className = favorItem
      ? 'product-catalogue__product_favorite-chosen'
      : 'product-catalogue__product_favorite'; // если нужный id найден, то задаем класс
    if (!this.props.match) {
      // класс для слайдера "Новинки"
      return favorItem
        ? 'new-deals__product_favorite favorites'
        : 'new-deals__product_favorite';
    }
    if (this.props.match.url === '/favorites') {
      // класс для страницы "Избранное"
      className = 'product-catalogue__product_favorite';
    }
    return className;
  }

  render() {
    return (
      <div
        className={this.state.className}
        onClick={this.isFavorites(this.props.item)}
      >
        <p />
      </div>
    );
  }
}
export default HeartIcon;
