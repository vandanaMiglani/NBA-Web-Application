import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from "shards-react";

class MenuBarHomePage extends React.Component {
    render() {
        return (
            <Navbar type="dark" theme="dark" expand="md">
                <NavbarBrand href="/">NBA Game Time</NavbarBrand>
            </Navbar>
        )
    }
}

export default MenuBarHomePage
