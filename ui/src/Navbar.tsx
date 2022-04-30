import React from 'react';
import {useGlobalState} from "./state";
import {Button, Container, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export const ProductNavBar = () => {

    const navigate = useNavigate();
    const [page] = useGlobalState('page')

    return (
        <Navbar>
            <Container>
                <Navbar.Brand onClick={() => navigate("/")} className={"pointer"}>Products</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    {
                        page === 'Home' ? (
                            <Navbar.Text>
                                <Button onClick={() => navigate("add")}>Add new product</Button>
                            </Navbar.Text>
                        ) : (
                            <Navbar.Text>
                                <Button onClick={() => navigate("/")}>Back</Button>
                            </Navbar.Text>
                        )
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
