import 'babel-polyfill';
import React, { Component } from 'react';
import '../public/css/app.css';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';


import graphQLFetch from './graphQLFetch.js';
import ProductList from './ProductList.jsx';
import Page from './Page.jsx';



const element = (
    <Router>
      <Page />
    </Router>
  );
ReactDOM.render(element, document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
  }
