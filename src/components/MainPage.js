// Правка по Eslint
import React from 'react';
import MainPageSlider from './MainPageSlider.js';
import NewProduct from './NewProduct.js';
import MainPageSalesAndNews from './MainPageSalesAndNews.js';
import MainPageAboutUs from './MainPageAboutUs.js';
import withData from './withData.js';

const NewProductLoad = withData(({ url }) => `${url}/featured`, 'newProductItems')(NewProduct);

const MainPage = props => (
  <main>
    <MainPageSlider />
    <NewProductLoad url={props.url} {...props} />
    <MainPageSalesAndNews />
    <MainPageAboutUs />
  </main>
);

export default MainPage;
