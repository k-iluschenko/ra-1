import React, { Component } from 'react';
import NewProductTitle from './NewProductTitle.js';
import NewProductSlider from './NewProductSlider.js';

class NewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesId: 0, // ID категории
      newProductItems: [], //новинки выбранной категории
      activeSlide: 0 //активный слайд
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.newProductItems.length || this.state.categoriesId || !nextProps.newProductItems) return null;
    this.setState({ newProductItems: nextProps.newProductItems });
  }

  onClickHandlerSetCategory = (id) => (event) => {
    event.preventDefault();
    if (!this.props.newProductItems) return null;
    const categoriesId = id;
    const items = this.props.newProductItems.filter(({ categoryId }) => categoryId === id);
    this.setState({
      newProductItems: items,
      categoriesId: categoriesId,
      activeSlide: 0
    });
  }

  onClickHandlerNextSlider = () => {
    if (!this.state.newProductItems || !this.state.newProductItems[this.state.activeSlide]) return;
    const newActiveSlide = this.state.newProductItems[this.state.activeSlide + 1] ? this.state.activeSlide + 1 : 0;
    this.setState({ activeSlide: newActiveSlide });
  }

  onClickHandlerPrevSlider = () => {
    if (!this.state.newProductItems || !this.state.newProductItems[this.state.activeSlide]) return;
    const newActiveSlide = this.state.newProductItems[this.state.activeSlide - 1] ? this.state.activeSlide - 1 : this.state.newProductItems.length - 1;
    this.setState({ activeSlide: newActiveSlide });
  }

  renderTitleNewItems(categories) {
    if (!categories.length) return null;
    if (!this.props.newProductItems) return null;
    return (
      categories.map(item => {
        const arr = this.props.newProductItems.filter(({ categoryId }) => categoryId === item.id)
        if (!arr.length) return null
        return (
          <NewProductTitle key={item.id} id={item.id} title={item.title} categoriesId={this.state.categoriesId} onClick={this.onClickHandlerSetCategory(item.id)} />
        );
      })
    )
  }

  render() {
    return (
      <section className="new-deals wave-bottom">
        <h2 className="h2">Новинки</h2>
        <div className="new-deals__menu">
          <ul className="new-deals__menu-items">
            {this.renderTitleNewItems(this.props.categories)}
          </ul>
        </div>
        <NewProductSlider {...this.props} {...this.state} onClickNext={this.onClickHandlerNextSlider} onClickPrev={this.onClickHandlerPrevSlider} />
      </section>
    );
  }
}

/* const urlApi = url();
const NewProduct = withData({
  endpoint: `${urlApi}/featured`,
  propName: 'newProductItems'
})(NewProductLoad); */
export default NewProduct;