import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from "shards-react";

class MenuBar extends React.Component {
    render() {
        return (
            <Navbar type="dark" theme="dark" expand="md">
                <NavbarBrand href="/">NBA Game Time</NavbarBrand>
                <Nav navbar>
                    <NavItem>
                        <NavLink active href="/home">
                            Home
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}

export default MenuBar
