import React from "react";
import ReactDOM from "react-dom";
import './index.scss';

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider
} from "@apollo/client";
import {HashRouter, Route, Routes} from "react-router-dom";
import {ProductNavBar} from "./Navbar";
import {Products} from "./products/Products";
import {AddProduct} from "./products/AddProduct";
import {EditProduct} from "./products/EditProduct";
import {DeleteProduct} from "./products/DeleteProduct";

const client = new ApolloClient({
    uri: process.env.API_SERVER,
    cache: new InMemoryCache()
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <HashRouter>
                <div className={"container"}>
                    <ProductNavBar />
                    <Routes>
                        <Route path={"/"} element={<Products/>}/>
                        <Route path={"/add"} element={<AddProduct />}/>
                        <Route path={"/edit"} element={<EditProduct />}/>
                        <Route path={"/delete"} element={<DeleteProduct />}/>
                    </Routes>
                </div>
            </HashRouter>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById("app")
);
