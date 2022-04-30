import React, {useEffect} from "react";
import './Products.scss'
import {gql, useQuery} from "@apollo/client";
import {
    IconButton,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Product, useGlobalState} from "../state";
import {useNavigate} from "react-router-dom";
import {Table} from "react-bootstrap";

const GET_ALL_PRODUCTS = gql(`
    query Query {
      getAllProducts {
        id
        Category
        Name
        Price
        Image
      }
    }
`)

export const Products = () => {

    const navigate = useNavigate()
    const [, setIsLoading] = useGlobalState('isLoading')
    const [products, addProducts] = useGlobalState('products')
    const [,setProductInstance] = useGlobalState('productInstance')
    const [, setPage] = useGlobalState('page')
    const { loading, data, refetch } = useQuery(GET_ALL_PRODUCTS);

    useEffect(() => {
        setPage("Home")
    }, [setPage])

    useEffect(() => {
        refetch().then(() => {
            refetch().then(r => addProducts(r.data.getAllProducts))
        })
    }, [addProducts, refetch])

    useEffect(() => {
        setIsLoading(loading)
    }, [loading, setIsLoading])

    useEffect(() => {
        if (data) {
            addProducts(data.getAllProducts)
        }
    }, [addProducts, data])

    function handleClick(location: string, product: Product) {
        setProductInstance({
            id: product.id,
            Name: product.Name,
            Category: product.Category,
            Price: product.Price,
            Image: product.Image
        })
        navigate(location)
    }

    return (
        <div className={"products"}>
            <Table striped={true}>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th/>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product: Product, index: number) => {
                            return (
                                <tr key={index}>
                                    <td>{product.Name}</td>
                                    <td>{product.Price}</td>
                                    <td>{product.Category}</td>
                                    <td>
                                        <img alt={product.Name} src={product.Image} width={100} height={100}/>
                                    </td>
                                    <td>
                                        <div className={"action-buttons"}>
                                            <IconButton color={"primary"} onClick={() => handleClick("edit", product)} >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton color={"error"} onClick={() => handleClick("delete", product)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}
