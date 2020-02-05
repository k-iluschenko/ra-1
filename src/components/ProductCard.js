import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import ProductCardSlider from './ProductCardSlider.js';

class ProductCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedSize: 0, // выбранный размер
      isSelectedSize: false, // размер выбран?
      quantity: 1, // выбрано количество товара
      activeImg: '', // активный слайд
      className: '', //
      classNameButton: 'in-basket_disabled', // стиль для "В корзину"
      inFavourites: '', // в избранном 
      price: 0, // цена
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({ activeImg: nextProps.productItemsInfo.images[0] });
    this.setState({
      className: this.classNameToFavorites(nextProps.productItemsInfo),
    });
    this.setState({ price: nextProps.productItemsInfo.price });
    this.setState({ quantity: 1 });
  }

  componentDidUpdate() {
    this.addToProductViewed();
  }

  // Количество товара
  changeQuantity = () => event => {
    const quantity = event.currentTarget.textContent;
    const { price } = this.props.productItemsInfo;
    if (quantity === '+') { return this.setState({ quantity: this.state.quantity + 1 }); }
    if (this.state.quantity === 1) return null;
    if (quantity === '-') { return this.setState({ quantity: this.state.quantity - 1 }); }
  };

  // Выбор размера
  chooseSize = size => event => {
    event.preventDefault();
    this.setState({ selectedSize: size });
    this.setState({ isSelectedSize: true });
  };

  onClickImg = props => event => {
    // event.preventDefault();
    if (!props) return null;
    this.setState({ activeImg: props.url });
  };

  isFavorites = props => event => {
    event.preventDefault();
    if (localStorage.favorites === undefined) {
      // Если нет localStorage.favorites, то создаем его.
      localStorage.setItem('favorites', JSON.stringify([props]));
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

      /*       if (this.props.updateState) {
        this.props.updateState(arr); // обновляем state для страницы избранное
      } */
    }
  };

  goToTop = () => {
    document.documentElement.scrollTop = 0;
  };

  // Получаем товар из корзины
  productAddBasket = value => {
    const basket = this.props.productsInBasket;
    if (!Object.keys(basket).length) return value;
    const arrID = basket.filter(item => item.id === value.id);
    if (arrID.length) {
      const arrSize = arrID.find(item => item.id === value.id && item.size === value.size);
      if (arrSize) {
        arrSize.amount += value.amount;
        return arrSize;
      }
      return value;
    }
    return value;
  };

  createBascket = event => {
    event.preventDefault();
    this.goToTop();
    // если нет localStorage
    if (localStorage.cartId === undefined) {
      localStorage.setItem('cartId', JSON.stringify(''));
    }
    const cartId = JSON.parse(localStorage.cartId);
    const cart = {
      id: this.props.productItemsInfo.id,
      size: this.state.selectedSize,
      amount: this.state.quantity,
    };
    const newCart = this.productAddBasket(cart);
    fetch(`${this.props.url}/cart/${cartId}`, {
      body: JSON.stringify(newCart),
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res.status === 'ok') return res;
      })
      .then(basketId => {
        localStorage.setItem('cartId', JSON.stringify(basketId.data.id));
       // this.props.update('inBasket', cart);
       this.props.onClickHandlerAddBasket(cart);
      });
  };

  classNameToButton() {
    return this.state.isSelectedSize
      ? 'in-basket in-basket-click'
      : 'in-basket in-basket_disabled';
  }

  classNameToFavorites(props) {
    if (localStorage.favorites === undefined) {
      // если нет localStorage,
      localStorage.setItem('favorites', JSON.stringify([])); // то создаем пустой
    }
    const arrFavorites = JSON.parse(localStorage.favorites); // разбираем JSON в массив
    const favorItem = arrFavorites.find(({ id }) => +props.id === +id); // поиск нужного id в массиве
    const className = favorItem ? 'favourite favorites' : 'favourite'; // если нужный id найден, то задаем класс
    const fav = favorItem ? 'В избранном' : 'В избранное';
    this.setState({ inFavourites: fav });
    return className;
  }

  // Вывод размеров
  size() {
    const { sizes } = this.props.productItemsInfo;
    return sizes.map(({ size, available }) => {
      //   console.log(size, available)
      if (available) {
        return (
          <li
            key={size}
            className={this.state.selectedSize === size ? 'active' : ''}
          >
            <NavLink to="#" onClick={this.chooseSize(size)}>
              {size}
            </NavLink>
          </li>
        );
      }
      return null;
    });
  }

  // Сумма товара
  summa() {
    return this.state.price * this.state.quantity;
  }

  // Наличие товара
  inStock() {
    const { sizes } = this.props.productItemsInfo; // размеры товара
    const selectSize = sizes.filter(
      ({ size }) => this.state.selectedSize === size,
    ); // выбираем размер
    if (!selectSize.length) return 'Размер не выбран';
    if (!selectSize[0].available) return 'Отсутствует';
    return 'В наличии';
  }

  // Добавление товара в "просмотренные"
  addToProductViewed() {
    if (localStorage.viewedItems === undefined) {
      // Если нет localStorage.viewedItems, то создаем его.
      localStorage.setItem(
        'viewedItems',
        JSON.stringify([this.props.productItemsInfo]),
      );
    } else {
      const arr = JSON.parse(localStorage.viewedItems); // разбираем JSON
      const { id } = this.props.productItemsInfo; // id товара

      let isItNewProduct = true; // принимаем, что товар не просматривался
      for (let i = 0; i < arr.length; i++) {
        // перебираем массив
        if (arr[i].id === id) {
          // если id присутствует в массиве
          isItNewProduct = false; // то товар уже смотрели
        }
      }
      if (isItNewProduct) arr.unshift(this.props.productItemsInfo); // если товар не просмотренный, то добавляем его в массив
      if (arr.length > 10) {
        arr.length = 10;
        // props.items.splice(0, props.items.length - 10)
      }
      localStorage.setItem('viewedItems', JSON.stringify(arr)); // записываем новые данные в localStorage
    }
    localStorage.setItem('category', this.props.productItemsInfo.categoryId);
  }

  render() {
    if (!this.props.productItemsInfo) return null;
    return (
      <main className="product-card" key={this.props.productItemsInfo.sku}>
        <section className="product-card-content">
          <h2 className="section-name">{this.props.productItemsInfo.type}</h2>
          <section className="product-card-content__main-screen">
            <ProductCardSlider {...this.props} handleClick={this.onClickImg} />
            <div className="main-screen__favourite-product-pic">
              <NavLink to="#">
                <img
                  src={this.state.activeImg}
                  alt={this.props.productItemsInfo.title}
                  width="468px"
                  height="386px"
                />
              </NavLink>
              <NavLink
                to="#"
                className="main-screen__favourite-product-pic__zoom"
              />
            </div>
            <div className="main-screen__product-info">
              <div className="product-info-title">
                <h2>{this.props.productItemsInfo.title}</h2>
                <div className="in-stock">{this.inStock()}</div>
              </div>
              <div className="product-features">
                <table className="features-table">
                  <tbody>
                    <tr>
                      <td className="left-col">Артикул:</td>
                      <td className="right-col">
                        {this.props.productItemsInfo.sku}
                      </td>
                    </tr>
                    <tr>
                      <td className="left-col">Производитель:</td>
                      <td className="right-col">
                        <NavLink to="#">
                          <span className="producer">
                            {this.props.productItemsInfo.brand}
                          </span>
                        </NavLink>
                      </td>
                    </tr>
                    <tr>
                      <td className="left-col">Цвет:</td>
                      <td className="right-col">
                        {this.props.productItemsInfo.color}
                      </td>
                    </tr>
                    <tr>
                      <td className="left-col">Материалы:</td>
                      <td className="right-col">
                        {this.props.productItemsInfo.material}
                      </td>
                    </tr>
                    <tr>
                      <td className="left-col">Сезон:</td>
                      <td className="right-col">
                        {this.props.productItemsInfo.season}
                      </td>
                    </tr>
                    <tr>
                      <td className="left-col">Повод:</td>
                      <td className="right-col">
                        {this.props.productItemsInfo.reason}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="size">Размер</p>
              <ul className="sizes-item">{this.size()}</ul>
              <div className="size-wrapper">
                <NavLink to="#">
                  <span className="size-rule" />
                  <p className="size-table">Таблица размеров</p>
                </NavLink>
              </div>
              <NavLink
                to="#"
                className="in-favourites-wrapper"
                onClick={this.isFavorites(this.props.productItemsInfo)}
              >
                <div className={this.state.className} />
                <p className="in-favourites">{this.state.inFavourites}</p>
              </NavLink>
              <div className="basket-item__quantity">
                <div
                  className="basket-item__quantity-change basket-item-list__quantity-change_minus"
                  onClick={this.changeQuantity()}
                >
                  -
                </div>
                {this.state.quantity}
                <div
                  className="basket-item__quantity-change basket-item-list__quantity-change_plus"
                  onClick={this.changeQuantity()}
                >
                  +
                </div>
              </div>
              <div className="price">
                {this.summa()
                  .toString()
                  .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')}
                {' '}
                ₽
              </div>
              <button
                className={this.classNameToButton()}
                onClick={this.createBascket}
                disabled={!this.state.isSelectedSize}
              >
                В корзину
              </button>
            </div>
          </section>
        </section>
      </main>
    );
  }
}
export default ProductCard;
