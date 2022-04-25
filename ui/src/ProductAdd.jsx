/* globals React PropTypes */

import 'babel-polyfill';
import React, { Component } from 'react';
import '../public/css/app.css';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Button,Form,ControlLabel,FormControl,FormGroup,Col,Alert,Panel} from 'react-bootstrap';

export default class ProductAdd extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        console.log("test message121212")
        e.preventDefault();
        const form = document.forms.productAdd;
        console.log(form.Price.value);
        const product = {
            Product_id: 0,
            status: "New",
            Product_name: form.Product_name.value,
            Category: form.Category.value,
            Price: form.Price.valueAsNumber,
            Image: form.Image.value,
        }
        //const temp = product.Image;
        this.props.createProduct(product);
        form.Product_name.value = "";
        form.Category.value = "Shirts";
        form.Price.value = 0;
        form.Image.value = "";
    }
    render() {
        return (
            <div className="form">


<React.Fragment>
    <Panel>
        <Panel.Heading>
            <Panel.Title toggle>Add product to Inventory</Panel.Title>
        </Panel.Heading>

        <Panel.Body collapsible>
            <div className="form">
                <Form name="productAdd" onSubmit={this.handleSubmit} className="main">
                        <input type="text" name="Product_name" placeholder="Product_name" />
                        <select name="Category" className="select" placeholder="Category">
                            <option value="Shirts">Shirts</option>
                            <option value="Jeans">Jeans</option>
                            <option value="Jackets">Jackets</option>
                            <option value="Sweaters">Sweaters</option>
                            <option value="Accessories">Accessories</option>
                        </select>
                        <div className="dollar"> <input type="number" name="Price" placeholder="Price" /></div>
                        <input type="text" name="Image" placeholder="Image" />
                        <Button bsStyle="primary">Add Product</Button>
                    </Form>
                </div>
        </Panel.Body>
    </Panel>
 </React.Fragment>

                
            </div>
        );
    }
}

ProductAdd.propTypes = {
    createProduct: PropTypes.func.isRequired,
  };