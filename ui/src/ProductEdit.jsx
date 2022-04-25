

import 'babel-polyfill';
// import React, { Component } from 'react';
import '../public/css/app.css';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import graphQLFetch from './graphQLFetch.js';

export default class ProductEdit extends Component {
  constructor() {
    console.log("In constr productedit")
    super();
    this.state = {
      product: {},
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }
  componentDidUpdate(prevProps) {
    const { match: { params: { Product_id: prevId } } } = prevProps;
    const { match: { params: { Product_id } } } = this.props;
    if (Product_id !== prevId) {
      this.loadData();
    }
  }
  onChange(event) {
    const { name, value } = event.target;
    this.setState(prevState => ({
      product: { ...prevState.product, [name]: value },
    }));
  }
  async handleSubmit(e) {
    console.log("in handle submit")
    e.preventDefault();
    const { product } = this.state;
    console.log(this.state); // eslint-disable-line no-console
    //if (Object.keys(invalidFields).length !== 0) return;
    console.log("in handle submit1")
    const query = `mutation ProductUpdate(
      $Product_id: Int!
      $changes: ProductUpdateInputs!) {
      ProductUpdate(Product_id: $Product_id
        changes: $changes) {
        status
        Product_name
        Category
        Price
        Image
      }
    }`;
    const { Product_id, ...changes } = product;
    console.log(changes)
    console.log(Product_id)
    const data = await graphQLFetch(query,{Product_id, changes});
    console.log(data)
    if (data) {
      this.setState({ product: data.ProductUpdate });
      alert('Updated product successfully'); // eslint-disable-line no-alert
    }
    console.log("in handle submit7")
  }
  async loadData() {
    console.log("in load edit")
    const query = `query product($Product_id: Int!) {
          product(Product_id: $Product_id) {
                    Product_id
                    status
                    Product_name
                    Category
                    Price
                    Image
                  }
                }`;

    const { match: { params: { Product_id } } } = this.props;
    const data = await graphQLFetch(query, { Product_id });
    console.log(data)
    if (data) {
      console.log("in if")
      const { product } = data;
      
      product.Product_name = product.Product_name != null ? product.Product_name.toString() : '';
      product.Category = product.Category ? product.Category : '';
      this.setState({ product });
    } else {
      console.log("in else")
      this.setState({ product: {} });
    }
  }

  render() {
    console.log("in render edit")
    const { product: { Product_id } } = this.state;
    const { match: { params: { Product_id: propsId } } } = this.props;
    console.log(this.props)
    if (Product_id == null) {
      if (propsId != null) {
        return <h3>{`product with ID ${propsId} updated`}</h3>;
      }
      return null;
    }
    const { product: { Product_name, status } } = this.state;
    const { product: { Category, Price, Image } } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <h3>{`Editing product: ${Product_id}`}</h3>
        <table>
          <tbody>
            <tr>
              <td>Created:</td>
            </tr>
            <tr>
              <td>Status:</td>
              <td>
                <select name="status" value={status} onChange={this.onChange}>
                  <option value="New">New</option>
                  <option value="Assigned">Assigned</option>
                  <option value="Fixed">Fixed</option>
                  <option value="Closed">Closed</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Product_name:</td>
              <td>
                <input
                  name="Product_name"
                  value={Product_name}
                  onChange={this.onChange}
                />
              </td>
            </tr>
            <tr>
              <td>Category:</td>
              <td>
                <select name="Category" value={Category} onChange={this.onChange}>
                  <option value="Shirts">Shirts</option>
                  <option value="Jeans">Jeans</option>
                  <option value="Jackets">Jackets</option>
                  <option value="Sweaters">Sweaters</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Price:</td>
              <td>
                <input
                  name="Price"
                  value={Price}
                  onChange={this.onChange}
                />
              </td>
            </tr>
            <tr>
              <td>Image:</td>
              <td>
                <input
                  name="Image"
                  value={Image}
                  onChange={this.onChange}
                />
              </td>
            </tr>
            <tr>
              <td />
              <td><button type="submit">Submit</button></td>
            </tr>
          </tbody>
        </table>
        <Link to={`/edit/${Product_id - 1}`}>Prev</Link>
        {' | '}
        <Link to={`/edit/${Product_id + 1}`}>Next</Link>
      </form>
    );
  }
}


