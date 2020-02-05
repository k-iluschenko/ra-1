import React, { PureComponent } from 'react';
import ProductCard from './ProductCard.js';
import SimilarSlider from './SimilarSlider.js';
import ViewedSlider from './ViewedSlider.js';
import '../css/style-product-card.css';

class Products extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      productItemsInfo: '',
    };
  }

  componentWillMount() {
    console.log('componentWillMount', this.props);
    this.getProduct();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    fetch(`${this.props.url}/products/${nextProps.match.params.id}`)
      .then(response => response.json())
      .then(info => {
        this.setState({ productItemsInfo: info.data });
      });
  }

  getProduct() {
    fetch(`${this.props.url}/products/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(info => {
        this.setState({ productItemsInfo: info.data });
      });
  }

  render() {
    return (
      <div className="wrapper">
        <ProductCard
          url={this.props.url}
          onClickHandlerAddBasket={this.props.onClickHandlerAddBasket}
          productsInBasket={this.props.productsInBasket}
          productItemsInfo={this.state.productItemsInfo // {...this.state} // {...this.props}
          }
          update={this.props.update}
        />
        <ViewedSlider {...this.props} {...this.state} />
        <SimilarSlider type={this.state.productItemsInfo.type} color={this.state.productItemsInfo.color} id={this.state.productItemsInfo.id} url={this.props.url} />
      </div>
    );
  }
}

export default Products;
