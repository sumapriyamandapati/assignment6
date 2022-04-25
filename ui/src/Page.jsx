
import 'babel-polyfill';
import React, { Component } from 'react';
import '../public/css/app.css';
import { NavLink } from 'react-router-dom';
import {
    Navbar, Nav, NavItem, NavDropdown,
    MenuItem, Glyphicon, Tooltip, OverlayTrigger,
    Grid,
  } from 'react-bootstrap';
  import { LinkContainer } from 'react-router-bootstrap';

import Contents from './Contents.jsx';


class NavBar extends Component {
    render() {
        return (
            <Navbar fluid>
            <Navbar.Header>
            <Navbar.Brand>My Company Inventory</Navbar.Brand>
            </Navbar.Header>
            <Nav>
            <LinkContainer exact to="/">
            <NavItem>Home</NavItem>
            </LinkContainer>
            <LinkContainer to="/products">
            <NavItem>Product List</NavItem>
            </LinkContainer>
            </Nav>
            </Navbar>
            // <nav>
            //     <NavLink exact to="/">Home</NavLink>
            //     {' | '}
            //     <NavLink exact to="/#/products">Product List</NavLink>
            // </nav>
        );
    }
}
class Footer extends Component{
    render(){
        return (
            <small>
              
            </small>
          );
    }
}
export default class Page extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <Grid fluid>
                <Contents />
                </Grid>
                <Footer/>
            </div>
        );
    }
}