/* globals React */

import 'babel-polyfill';
import React, { Component } from 'react';
import '../public/css/app.css';
import ReactDOM from 'react-dom';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
//import {Table} from 'react-bootstrap';
import {Button, Glyphicon, Tooltip, OverlayTrigger} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
// import React from 'react';

// class ProductRow extends Component {
//     render() {
//         const product = this.props.product;
const ProductRow = withRouter(({
    product, location: { search }, closeProduct, deleteProduct, index,})=>{
        const selectLocation = { pathname: `/products/${product.Product_id}`, search };
        const editTooltip = (
            <Tooltip id="close-tooltip" placement="top">Edit Product</Tooltip>
          );
        const closeTooltip = (
            <Tooltip id="close-tooltip" placement="top">Close Product</Tooltip>
          );
          const deleteTooltip = (
            <Tooltip id="delete-tooltip" placement="top">Delete Product</Tooltip>
          );

          function onClose(e) {
            e.preventDefault();
            closeProduct(index);
          }
        
          function onDelete(e) {
            e.preventDefault();
            deleteProduct(index);
          }
        const tableRow=(
            <tr>
                <td>{product.Product_id}</td>
                <td>{product.Product_name}</td>
                <td>{product.Category}</td>
                <td>${product.Price}</td>
                <td><a href={product.Image} target="_blank"><u>View</u></a></td>
                <td>
                <LinkContainer to={`/edit/${product.Product_id}`}>
                <OverlayTrigger delayShow={1000} overlay={editTooltip}>
                    <Button bsSize="xsmall" bsStyle="primary">
                    <Glyphicon glyph="edit" />
                    </Button>
                </OverlayTrigger>
                </LinkContainer>
                
                {/* <td><Link to={`/edit/${product.Product_id}`}>Edit</Link></td> */}
                {' | '}
                <OverlayTrigger delayShow={1000} overlay={closeTooltip}>
                <Button bsSize="xsmall" bsStyle="primary" onClick={onClose}>
                    <Glyphicon glyph="remove" />
                </Button>
                </OverlayTrigger>
                {' '}
                <OverlayTrigger delayShow={1000} overlay={deleteTooltip}>
                <Button bsSize="xsmall" bsStyle="primary" onClick={onDelete}>
                <Glyphicon glyph="trash" />
                </Button>
                </OverlayTrigger>
                
                </td>
            </tr>
        );
        return (
            <LinkContainer to={selectLocation}>
              {tableRow}
            </LinkContainer>
        );
    });


    export default function ProductTable({ products, closeProduct, deleteProduct }) {
    
        const productRows = products.map((product, index) => (
            <ProductRow
              key={product.Product_id}
              product={product}
              closeProduct={closeProduct}
              deleteProduct={deleteProduct}
              index={index}
            />
          ));
        return (
          <React.Fragment>
            <Table bordered condensed hover responsive>
                <thead>
                    <tr>
                        <th>Product_id</th>
                        <th>Product_name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {productRows}
                </tbody>
            </Table>
          </React.Fragment>
        );
    }
