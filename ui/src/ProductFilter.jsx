/* globals React */
/* eslint "react/prefer-stateless-function": "off" */

import 'babel-polyfill';
import React, { Component } from 'react';
import '../public/css/app.css';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import URLSearchParams from 'url-search-params';
import { Link } from 'react-router-dom';
import { Label } from 'react-bootstrap';

class ProductFilter extends Component  {
    constructor({ location: { search } }) {
        super();
        const params = new URLSearchParams(search);
        this.state = {
        status: params.get('status') || '',
        effortMin: params.get('effortMin') || '',
        effortMax: params.get('effortMax') || '',
        changed: false,
        };

        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeEffortMin = this.onChangeEffortMin.bind(this);
        this.onChangeEffortMax = this.onChangeEffortMax.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.showOriginalFilter = this.showOriginalFilter.bind(this);
        }

        componentDidUpdate(prevProps) {
            const { location: { search: prevSearch } } = prevProps;
            const { location: { search } } = this.props;
            if (prevSearch !== search) {
              this.showOriginalFilter();
            }
          }
          onChangeStatus(e) {
            this.setState({ status: e.target.value, changed: true });
          }
          onChangeEffortMin(e) {
            const effortString = e.target.value;
            if (effortString.match(/^\d*$/)) {
            this.setState({ effortMin: e.target.value, changed: true });
            }
            }
            onChangeEffortMax(e) {
              const effortString = e.target.value;
              if (effortString.match(/^\d*$/)) {
                this.setState({ effortMax: e.target.value, changed: true });
              }
            }
          showOriginalFilter() {
            const { location: { search } } = this.props;
            const params = new URLSearchParams(search);
            this.setState({
              status: params.get('status') || '',
              effortMin: params.get('effortMin') || '',
              effortMax: params.get('effortMax') || '',
              changed: false,
            });
          }

          applyFilter() {
            const { status, effortMin, effortMax} = this.state;
            const { history } = this.props;
            const params = new URLSearchParams();
            if (status) params.set('status', status);
            if (effortMin) params.set('effortMin', effortMin);
            if (effortMax) params.set('effortMax', effortMax);
            const search = params.toString() ? `?${params.toString()}` : '';
            history.push({ pathname: '/products', search });
          }
    
    render() {
        const { status, changed } = this.state;
        const { effortMin, effortMax } = this.state;
        return (
        <div>
            <h1><Label>My Company Inventory</Label></h1>
        </div>
      );
    }
  }

export default withRouter(ProductFilter);
