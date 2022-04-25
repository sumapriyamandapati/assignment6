/* globals React */
/* eslint "react/jsx-no-undef": "off" */

import 'babel-polyfill';
import React, { Component } from 'react';
import '../public/css/app.css';
import ReactDOM from 'react-dom';
import URLSearchParams from 'url-search-params';
import { Route } from 'react-router-dom';
import { Panel } from 'react-bootstrap';


import ProductFilter from './ProductFilter.jsx';
import ProductTable from './ProductTable.jsx';
import ProductAdd from './ProductAdd.jsx';
import graphQLFetch from './graphQLFetch.js';
//import ProductDetail from './ProductDetail.jsx';


export default class ProductList extends Component {
    constructor() {
        console.log("test message23")
        super();
        this.state = { products: [] };
        this.createProduct = this.createProduct.bind(this);
        this.closeProduct = this.closeProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }
    componentDidMount() {
        console.log("test message3")
        this.loadData();
    }
    componentDidUpdate(prevProps) {
        const { location: { search: prevSearch } } = prevProps;
        const { location: { search } } = this.props;
        if (prevSearch !== search) {
          this.loadData();
        }
      }
    async loadData() {
        const { location: { search } } = this.props;
    const params = new URLSearchParams(search);
    const vars = {};
    if (params.get('status')) vars.status = params.get('status');

    const effortMin = parseInt(params.get('effortMin'), 10);
    if (!Number.isNaN(effortMin)) vars.effortMin = effortMin;
    const effortMax = parseInt(params.get('effortMax'), 10);
    if (!Number.isNaN(effortMax)) vars.effortMax = effortMax;
    const query = `query ProductList(
        $status: StatusType
        $effortMin: Int
        $effortMax: Int
        ) {
            ProductList(
                status: $status
                effortMin: $effortMin
                effortMax: $effortMax
                ) {
                    Product_id
                    status
                    Product_name
                    Category
                    Price
                    Image
                    }
         }`;
        const data = await graphQLFetch(query, vars);
        console.log(data);
        if (data) {
            this.setState({ products: data.ProductList });
        }
    }
    async createProduct(product) {
        console.log("test message")
        const query = `mutation ProductAdd($product: ProductInputs!){
      ProductAdd(product: $product)  {
        Product_id
        status
        Product_name
        Category
        Price
        Image
      }
    }`;
        const data = await graphQLFetch(query, { product });
        if (data) {
            this.loadData();
        }
    }

    async closeProduct(index) {
        const query = `mutation ProductClose($Product_id: Int!) {
          ProductUpdate(Product_id: $Product_id, changes: { status: Closed }) {
            Product_id
            status
            Product_name
            Category
            Price
            Image
          }
        }`;
        const { products } = this.state;
        const data = await graphQLFetch(query, { Product_id: products[index].Product_id });
        if (data) {
          this.setState((prevState) => {
            const newList = [...prevState.products];
            newList[index] = data.ProductUpdate;
            return { products: newList };
          });
        } else {
          this.loadData();
        }
      }

      async deleteProduct(index) {
        const query = `mutation productDelete($Product_id: Int!) {
        productDelete(Product_id: $Product_id)
        }`;
        console.log("in delete")
        const { products } = this.state;
        const { location: { pathname, search }, history } = this.props;
        const { Product_id } = products[index];
        const data = await graphQLFetch(query, { Product_id });
        if (data && data.productDelete) {
        this.setState((prevState) => {
        const newList = [...prevState.products];
        if (pathname === `/products/${Product_id}`) {
        history.push({ pathname: '/products', search });
        }
        newList.splice(index, 1);
        return { products: newList };
        });
        } else {
        this.loadData();
        }
        }


    render() {
        console.log("test message1")
        // const { products } = this.state;
        // const { match } = this.props;
        return (
            <div className="container">
                <React.Fragment>
                    <ProductFilter />
                    <hr />
                    <div className="table">
                        <ProductTable products={this.state.products} closeProduct={this.closeProduct} deleteProduct={this.deleteProduct}/>
                    </div>
                    <hr />
                    <ProductAdd createProduct={this.createProduct} />
                    <hr />
                    {/* <Route path={`${match.path}/:id`} component={ProductDetail} /> */}
                </React.Fragment>
            </div>
        );
    }
}