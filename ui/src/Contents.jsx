
import 'babel-polyfill';
import React, { Component } from 'react';
import '../public/css/app.css';
import ReactDOM from 'react-dom';
import { Switch, Route, Redirect } from 'react-router-dom';

import ProductList from './ProductList.jsx';
import ProductReport from './ProductReport.jsx';
import ProductEdit from './ProductEdit.jsx';

const NotFound = () => <h1>Page Not Found</h1>;

export default class Contents extends Component  {
    render() {
  return (
    <Switch>
      <Redirect exact from="/" to="/products" />
      <Route path="/products" component={ProductList} />
      <Route path="/edit/:Product_id" component={ProductEdit} />
      <Route component={NotFound} />
    </Switch>
  );
}
}